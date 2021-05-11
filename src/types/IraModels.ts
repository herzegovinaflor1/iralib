export type QueryAndParametersTuple = {
    query: string,
    params: any[]
}

export interface ModelConstructable {
    new(): IraModel;
}

export class NamedArguments {

    private readonly _params: NamedParams;

    constructor(params: NamedParams) {
        this._params = params;
    }

    getParams(): NamedParams {
        return this._params;
    }
}

interface IraModel {
}

interface IraPersistentConnector {
    getTransactionHandler(queryAndParams: QueryAndParametersTuple): Promise<any>
}

type NamedParams = {
    [id: string]: any
}

export type {
    IraModel,
    IraPersistentConnector
}