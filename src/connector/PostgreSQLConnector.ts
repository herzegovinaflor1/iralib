import {format} from 'sqlstring';
import {IraPersistentConnector, ModelConstructable, QueryAndParametersTuple} from '../types/IraModels';
import {Pool} from "pg";

export default class PostgreSQLConnector implements IraPersistentConnector {

    private _connectorPool: any;

    constructor(postgresqlConfiguration: object) {
        this._connectorPool = new Pool({
            ...postgresqlConfiguration
        })
    }

    getTransactionHandler(queryAndParams: QueryAndParametersTuple) {
        const {query, params} = queryAndParams;
        return new Promise((resolve, reject) => {
            this._connectorPool
                .query("begin")
                .catch((err: any) => {
                    reject({
                        query: query,
                        params: params,
                        ...err
                    })
                })
                .then(() => this._connectorPool.query(format(query, params)))
                .catch((err: any) => {
                    this._connectorPool.query("rollback")
                    reject({
                        query: query,
                        params: params,
                        ...err
                    })
                })
                .then((res: any) => {
                    const {rows} = res
                    resolve(rows)
                })
                .then(() => {
                    return this._connectorPool.query("commit")
                })
                .catch((err: any) => {
                    this._connectorPool.query("rollback")
                    reject(err)
                })
        })
    }

}