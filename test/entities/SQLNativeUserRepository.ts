import Persistent from "../../src/decorators/Persistent"
import {NativeQuery} from "../../src/decorators/Queries"
import {NamedArguments} from "../../src/types/IraModels";

@Persistent()
export class SQLNativeUserRepository {

    @NativeQuery("SELECT * FROM test LIMIT 3")
    findAllWithLimit3(): any {
        return new Promise(() => {
        })
    }

    @NativeQuery("SELECT * FROM test WHERE id IN (?)")
    findAllWithInOperation(ids: number[]): any {
        return new Promise(() => {
        })
    }

    @NativeQuery("SELECT * FROM test WHERE creation_date = ?")
    findAllByDate(date: Date): any {
        return new Promise(() => {
        })
    }

    @NativeQuery("SELECT * FROM test WHERE id = ?")
    findById(id: number): any {
        return new Promise(() => {
        })
    }

    @NativeQuery("SELECT * FROM test WHERE id = ? AND lang = ?")
    findByIdAndLang(id: number, lang: string): any {
        return new Promise(() => {
        })
    }

    @NativeQuery("SELECT * FROM test WHERE id = ?id AND lang = ?lang")
    findByIdAndLangByNamedParameters(parameters: NamedArguments): any {
        return new Promise(() => {
        })
    }

    @NativeQuery("SELECT * FROM test WHERE id = ?id AND lang = ?lang AND lang LIKE ?lang")
    findByIdAndLangWithTheSameNamedParameters(parameters: NamedArguments): any {
        return new Promise(() => {
        })
    }

    @NativeQuery("SELECT * FROM test WHERE id IN (?args)")
    findAllWithParametersAndInOperation(parameters: NamedArguments): any {
        return new Promise(() => {
        })
    }

}