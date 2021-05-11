import { BrokenUserRepository } from "./entities/BrokenUserRepository";
import PostgreSQLConnector from "../src/connector/PostgreSQLConnector";
import PersistentExecutor from "../src/statement_executor/PersistentExecutor";
import {POSTGRESQL_DB_CONNECTION} from "./connection_db";

const postgresConnector = new PostgreSQLConnector(POSTGRESQL_DB_CONNECTION);

const userRepository = PersistentExecutor(new BrokenUserRepository(), postgresConnector);

test('should throw error with broken query', () => {
    return userRepository.getBrokenQuery()
        .catch((res) => {
            expect(res).toBeTruthy()
        })
})

test('should throw error if method does not have a name query', () => {
    let err: any;
    try {
        userRepository.getBrokenNamedQuery()
    } catch (error) {
        err = error
    }
    if (!err) {
        fail()
    }
})

test('should throw error if method does not have a query', () => {
    let err: any;
    try {
        userRepository.outOfQueryContext(1, '2')
    } catch (error) {
        err = error
    }
    if (!err) {
        fail()
    }
})

test('should throw error if parameter was missed', () => {
    return userRepository.findByMissedParameter()
        .catch((res) => {
            expect(res).toBeTruthy()
        })
})