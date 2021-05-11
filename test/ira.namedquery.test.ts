import PersistentExecutor from "../src/statement_executor/PersistentExecutor";
import { SQLNameUserRepository } from "./entities/SQLNamedUserRepository";
import PostgreSQLConnector from "../src/connector/PostgreSQLConnector";
import {POSTGRESQL_DB_CONNECTION} from "./connection_db";

const postgresConnector = new PostgreSQLConnector(POSTGRESQL_DB_CONNECTION);

const userRepository = PersistentExecutor(new SQLNameUserRepository(), postgresConnector);

test('should return 3 rows', () => {
    return userRepository.findAllWithLimit20().then((res: any) => {
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