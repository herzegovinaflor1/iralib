import Persistent from "../../src/decorators/Persistent"
import {NamedQuery, NativeQuery} from "../../src/decorators/Queries"

@Persistent()
export class BrokenUserRepository<T> {

    @NativeQuery("zxczxczx")
    getBrokenQuery(): Promise<T> {
        return new Promise(function () {
        })
    }

    @NativeQuery("SELECT * FROM test WHERE id = ?")
    findByMissedParameter(): Promise<T> {
        return new Promise(function () {
        })
    }

    outOfQueryContext(id: number, lang: string): Promise<T> {
        return new Promise(function () {
        })
    }

    @NativeQuery("SELECT * FROM test WHERE id = ?id AND lang = ?lang AND lang LIKE ?lang")
    findByIdAndLangWithTheSameNamedParameters(): Promise<T> {
        return new Promise(function () {
        })
    }

    @NamedQuery("qweqweqwe")
    getBrokenNamedQuery(): Promise<T> {
        return new Promise(function () {
        })
    }

}