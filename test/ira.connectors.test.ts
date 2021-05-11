import { SQLConnectorUserRepository } from "./entities/SQLConnectorUserRepository";
import PostgreSQLConnector from "../src/connector/PostgreSQLConnector";
import MySQLConnector from "../src/connector/MySQLConnector";
import { IraModel } from "../src/types/IraModels";
import PersistentExecutor from "../src/statement_executor/PersistentExecutor";
import {MYSQL_DB_CONNECTION, POSTGRESQL_DB_CONNECTION} from "./connection_db";

const ITERATIONS = 1000;

const postgresConnector = new PostgreSQLConnector(POSTGRESQL_DB_CONNECTION);
const mysqlConnector = new MySQLConnector(MYSQL_DB_CONNECTION);

class UserModel implements IraModel {
    public _id: number = 0;
    public _lang: string = '';

    getId(): number {
        return this._id;
    }

    getLang(): string {
        return this._lang;
    }
}

const postgresUserRepository = PersistentExecutor(new SQLConnectorUserRepository(), postgresConnector);
const mySqlUserRepository = PersistentExecutor(new SQLConnectorUserRepository(), mysqlConnector);

const postgresUserRepositoryTyped = PersistentExecutor(new SQLConnectorUserRepository<UserModel>(), postgresConnector, UserModel);
const mySqlUserRepositoryTyped = PersistentExecutor(new SQLConnectorUserRepository<UserModel>(), mysqlConnector, UserModel);

test('should connect to postgres', () => {
    return postgresUserRepository.checkQuery().then((res: any) => {
        expect(res.length).toEqual(1)
    })
});

test('should connect to mysql', () => {
    return mySqlUserRepository.checkQuery().then((res: any) => {
        expect(res.length).toEqual(1)
    })
})

test('should connect to postgres', () => {
    return postgresUserRepositoryTyped.checkQuery().then((res: [UserModel]) => {
        expect(res.length).toEqual(1);
        expect(res[0] instanceof UserModel).toBeTruthy();
    })
})

test('should connect to mysql', () => {
    return mySqlUserRepositoryTyped.checkQuery().then((res: [UserModel]) => {
        expect(res.length).toEqual(1);
        expect(res[0] instanceof UserModel).toBeTruthy();
    })
})

test('should create 1000 connections to postgres db', async () => {
    expect.assertions(ITERATIONS);
    for (let i = 0; i < ITERATIONS; i++) {
        await postgresUserRepositoryTyped.checkQuery()
        .then((res: [UserModel]) => {
            expect(res[0] instanceof UserModel).toBeTruthy();
        })
    }
})

test('should create 1000 connections to mysql db', async () => {
    expect.assertions(ITERATIONS);
    for (let i = 0; i < ITERATIONS; i++) {
        await mySqlUserRepositoryTyped.checkQuery().then((res: [UserModel]) => {
            expect(res[0] instanceof UserModel).toBeTruthy();
        })
    }
})