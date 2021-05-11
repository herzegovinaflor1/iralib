import MySQLConnector from "./src/connector/MySQLConnector";
import PostgreSQLConnector from "./src/connector/PostgreSQLConnector";
import Persistent from "./src/decorators/Persistent";
import {NamedQuery} from "./src/decorators/Queries";
import {NativeQuery} from "./src/decorators/Queries";
import PersistentExecutor from "./src/statement_executor/PersistentExecutor";
import {NamedArguments} from "./src/types/IraModels";

export type {
    IraModel,
    IraPersistentConnector,
    QueryAndParametersTuple,
    ModelConstructable
} from "./src/types/IraModels";

export {
    Persistent,
    NamedQuery,
    NativeQuery,
    PersistentExecutor,
    PostgreSQLConnector,
    MySQLConnector,
    NamedArguments
}