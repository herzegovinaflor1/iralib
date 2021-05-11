import PersistentExecutor from "../src/statement_executor/PersistentExecutor";
import { SQLTypedUserRepository } from "./entities/SQLTypedUserRepository";
import PostgreSQLConnector from "../src/connector/PostgreSQLConnector";
import { IraModel } from "../src/types/IraModels";
import {POSTGRESQL_DB_CONNECTION} from "./connection_db";

const postgresConnector = new PostgreSQLConnector(POSTGRESQL_DB_CONNECTION);

class UserModel implements IraModel {
    public _id: number = 0;
    public _lang: string = '';
}

const userRepository = PersistentExecutor(new SQLTypedUserRepository<UserModel>(), postgresConnector, UserModel);

test('should return 3 rows of model instances', () => {
    return userRepository.findAllWithLimit3().then((res: [UserModel]) => {
        expect(res.length).toEqual(3);
        expect(res[0] instanceof UserModel).toBeTruthy();
    })
})