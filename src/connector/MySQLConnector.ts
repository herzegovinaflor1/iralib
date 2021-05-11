import {IraPersistentConnector, ModelConstructable, QueryAndParametersTuple} from "../types/IraModels";
import {createPool} from "mysql2";

export default class MySQLConnector implements IraPersistentConnector {

    private _connectorPool: any;

    constructor(mysqlConnectionConfiguration: object) {
        this._connectorPool = createPool({
            ...mysqlConnectionConfiguration
        })
    }

    public getTransactionHandler(queryAndParams: QueryAndParametersTuple): Promise<any> {
        return new Promise((resolve, reject) => {
            return this.handleTransaction(queryAndParams, resolve, reject);
        })
    }

    private executeQuery({query, params}: QueryAndParametersTuple, resolve: (arg: any) => void, reject: (arg: any) => void): Promise<any>{
        return new Promise((queryResolve, queryReject) => {
            this._connectorPool.query(query, params, function (err: any, results: any) {
                if (err)
                    queryReject(err)
                else
                    queryResolve(results);
            });
        }).catch((err: any) => {
            this._connectorPool.query("rollback")
            reject({
                query: query,
                params: params,
                ...err
            })
        }).then((result: any) => {
            try {
                resolve(result)
                this._connectorPool.query("commit")
            } catch (e) {
                this._connectorPool.query("rollback")
                reject(e);
            }
        })
    }

    private handleTransaction({query, params}: QueryAndParametersTuple, resolve: (arg: any) => void, reject: (arg: any) => void) : Promise<any> {
        return new Promise((beginResolve, beginReject) => {
            this._connectorPool.query("begin", [], function (err: any, results: unknown) {
                if (err)
                    beginReject(err);
                else
                    beginResolve(results);
            });
        }).catch((err: any) => {
            this._connectorPool.query("rollback")
            reject({
                query: query,
                params: params,
                ...err
            })
        }).then(() => {
            return this.executeQuery({query, params}, resolve, reject)
        })
    }

}