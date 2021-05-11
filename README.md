# Ira Framework

Hi, it is our first open source library. If you have any comments or objections, please report issues or left recommendations. 
Yes, this framework is similar to Spring Data :)

The goal of framework is to provide a convenient framework to fetch data from a database. To make it possible framework obligates:

  - Keep persistence classes small and readable
  - Get rid of code duplication
  - Use decorators as a imperative logic description

The library is available on https://www.npmjs.com/package/iralib
```javascript
npm i iralib
```

# API

First at all, you need to create a repository class and declare it as `@Persistant()`. The class will be added to persistence context.

To declare a method that executes query have to use the `@NativeQuery()` decorator. The decorator consumes native SQL query.

```javascript
@Persistent()
class UserRepository<T> {

    @NativeQuery("SELECT * FROM table LIMIT 20")
    getInfoFromTable(): Promise<T> {
        return new Promise(() => {})
    }

}
```

Another way to use a native query is to use `@NamedQuery()`. 
To make it possible, you should create `.yaml` file with the mapping **name => query**:

```yaml
GET_INFO_FROM_TABLE:
  SELECT * FROM public.t_faq LIMIT 20
```
```javascript
@Persistent('./queries/sqls.yaml')
class UserRepository<T> {

    @NamedQuery("GET_INFO_FROM_TABLE")
    getInfoFromTable(): Promise<T> {
        return new Promise(() => {})
    }

}
```

### Parameters

There are two ways how you can pass parameters to both `@NamedQuery()` and  `@NativeQuery()`:
  - Use `?` as parameter
  - Use `object with named parameters`

##### Question params:

Question marks are use as placeholders for arguments. The `?` are replaced on function's arguments order. 
If you pass a redundant argument to the function it will be ignored. 
If you miss one, it will be thrown an exception. Type check lies to developer's responsibility. 

```javascript
@NativeQuery("SELECT * FROM public.t_faq WHERE id = ? AND lang = ?")
findByIdAndLang(id: number, lang: string): Promise<T>  {
    return new Promise(() => {})
}
```

##### Named params:

If you pass only argument of **NamedArguments** instance, framework recognizes it as `named params`. 
The `named params` look for naming match. It replaces all named params to arguments. 
If you add a redundant param to object argument it will be ignored. If you miss one, it will be thrown an exception. 
Type check lies to developer's responsibility. 

```javascript
@NativeQuery("SELECT * FROM public.t_faq WHERE id = ?id AND lang = ?lang AND lang LIKE ?lang")
findByIdAndLang(params: NamedArguments): Promise<T>  {
    return new Promise(() => {})
}
```

### Running queries
1. Create a persistent class

    ```javascript
    @Persistent()
    class UserRepository<T> {
    
        @NativeQuery("SELECT * FROM table LIMIT 20")
        getInfoFromTable(): Promise<T> {
            return new Promise(() => {})
        }
    
    }
    ```
   
2. Create a database connector. OOTB connectors are MySQL and PostgreSQL.
PostgreSQL connector consumes pool configuration of **pg** package
MySQL connector consumes pool configuration of **mysql2** package.
    ```javascript
    const postgreConnector = new PostgreSQLConnector(POSTGRESQL_DB_POOL_CONNECTION_CONFIGURATION);
    ```

3. Create instance of your repository:
    ```javascript
    const userRepository = PersistentExecutor(new UserRepository(), postgreConnector);
    ```
4. Look the result :)
    ```javascript
    userRepository.findByIdAndLang(new NamedArguments({
        lang: 'en',
        id: 2
    })).then((resp: any) => console.log(resp));
    ```

```ruby
If there is a need to create an own connector, you can use IraPersistentConnector interface to
come up with a connection logic and a transaction handling. 
```

### Typed result set

The framework supports type binding. If we use a typescript, possibly you want to fetch data as a class. 
It is possible by defining a required model. Notice, such class has to have ***_variable*** field notation. 
Apparently, we consider such variables as private, for this point it is better to make them ***public and initialized***. 
Otherwise, variables won't be visible. Any methods can be declared to obtain the result. 
We agree it is not the best way to bind result to structure, but such idea occurred to ys as an extra non-main feature.

```javascript
class UserModel implements Model {
    public _id: number = 0;
    public _lang: string = '';

    getId(): number {
        return this._id;
    }

    getLang(): string {
        return this._lang;
    }
}
const userRepository = PersistentExecutor(new UserRepository<UserModel>(), client, UserModel);
userRepository.findByIdAndLang(new NamedArguments({
    lang: 'en',
    id: 2
})).then((resp: UserModel) => resp instanceof UserModel ); // => true
```