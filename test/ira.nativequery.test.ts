import PersistentExecutor from "../src/statement_executor/PersistentExecutor";
import {SQLNativeUserRepository} from "./entities/SQLNativeUserRepository";
import PostgreSQLConnector from "../src/connector/PostgreSQLConnector";
import {POSTGRESQL_DB_CONNECTION} from "./connection_db";
import {NamedArguments} from "../src/types/IraModels";

const postgresConnector = new PostgreSQLConnector(POSTGRESQL_DB_CONNECTION);

const userRepository = PersistentExecutor(new SQLNativeUserRepository(), postgresConnector);

test('should return 3 rows', () => {
    return userRepository.findAllWithLimit3().then((res: any) => {
        expect(res.length).toEqual(3)
    })
})

test('should return result by one parameter', () => {
    return userRepository.findById(1).then((res: any) => {
        expect(res.length).toEqual(1)
    })
})

test('should return result by multiple parameters', () => {
    return userRepository.findByIdAndLang(1, 'en').then((res: any) => {
        expect(res.length).toEqual(1)
    })
})

test('should return result by multiple named parameters', () => {
    return userRepository.findByIdAndLangByNamedParameters(new NamedArguments({
        id: 1,
        lang: 'en'
    })).then((res: any) => {
        expect(res.length).toEqual(1)
    })
})

test('should return result by multiple named parameters', () => {
    return userRepository.findByIdAndLangWithTheSameNamedParameters(new NamedArguments({
        id: 1,
        lang: 'en'
    })).then((res: any) => {
        expect(res.length).toEqual(1)
    })
})


test('should return number of rows in', () => {
    return userRepository.findAllWithInOperation([1, 2]).then((res: any) => {
        expect(res.length).toEqual(2)
    })
})

test('should return number of rows in by params', () => {
    return userRepository.findAllWithParametersAndInOperation(new NamedArguments({
        args: [1, 2]
    })).then((res: any) => {
        expect(res.length).toEqual(2)
    })
})

