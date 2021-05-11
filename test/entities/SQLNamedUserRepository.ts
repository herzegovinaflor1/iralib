import Persistent from "../../src/decorators/Persistent"
import {NamedQuery} from "../../src/decorators/Queries"

@Persistent('./test/queries/sqls.yaml')
export class SQLNameUserRepository<T> {

    @NamedQuery("SELECT_ALL_LIMIT_20")
    findAllWithLimit20(): Promise<T> {
        return new Promise(function () {
        })
    }

    @NamedQuery("SELECT_ALL_BY_ID")
    findById(id: number): Promise<T> {
        return new Promise(function () {
        })
    }

    @NamedQuery("SELECT_ALL_BY_ID_AND_LANG")
    findByIdAndLang(id: number, lang: string): Promise<T> {
        return new Promise(function () {
        })
    }
}