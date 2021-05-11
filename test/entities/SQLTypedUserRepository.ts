import Persistent from "../../src/decorators/Persistent"
import {NativeQuery} from "../../src/decorators/Queries"

@Persistent('./test/queries/sqls.yaml')
export class SQLTypedUserRepository<T> {

    @NativeQuery("SELECT * FROM test LIMIT 3")
    findAllWithLimit3(): Promise<[T]> {
        return new Promise(function () {
        })
    }

    @NativeQuery("SELECT * FROM test WHERE id = ?")
    findById(id: number): Promise<T> {
        return new Promise(function () {
        })
    }

    @NativeQuery("SELECT * FROM test WHERE id = ? AND lang = ?")
    findByIdAndLang(id: number, lang: string): Promise<T> {
        return new Promise(function () {
        })
    }

    @NativeQuery("SELECT * FROM test WHERE id = ?id AND lang = ?lang")
    findByIdAndLangByNamedParameters(parameters: object, parameters2: object): Promise<T> {
        return new Promise(function () {
        })
    }

    @NativeQuery("SELECT * FROM test WHERE id = ?id AND lang = ?lang AND lang LIKE ?lang")
    findByIdAndLangWithTheSameNamedParameters(parameters: object): Promise<T> {
        return new Promise(function () {
        })
    }

}