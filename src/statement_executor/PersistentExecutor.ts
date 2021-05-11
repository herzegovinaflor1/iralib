import {IraPersistentConnector, ModelConstructable, NamedArguments, QueryAndParametersTuple} from "../types/IraModels";
import {METHOD_TO_QUERY, QUERY_NAME_TO_METHOD, QUERY_NAME_TO_QUERY} from "../types/context/queries";

const TYPE_RESOLVER: { [type: string]: (value: any) => string } = {
    "string": (value) => `\'${value}\'`,
    "number": (value) => value,
    "object": (value) => value
}

export default function PersistentExecutor<T extends object>(obj: T, persistenceConnector: IraPersistentConnector, constructableModel?: ModelConstructable): T {
    return new Proxy<T>(obj, {
        get: function (target: any, property: keyof object, receiver: any) {
            if (target.__proto__[property]) {
                return function () {
                    const queryFromMethod = getQueryStatement(target, property);
                    const queryAndParams = getStatementsWithParameters(queryFromMethod, arguments);
                    return persistenceConnector.getTransactionHandler(queryAndParams)
                        .then((res: any) => {
                            if (constructableModel) {
                                return getAsModel(res, constructableModel);
                            }
                            return res;
                        });
                };
            }
            return Reflect.get(target, property, receiver);
        }
    });
}

const getQueryFromParameters = (query: string, params: IArguments): string => {
    let sql = query;
    const namedArguments = params[0] as NamedArguments;
    Object.entries(namedArguments.getParams()).forEach((value) => {
        const typeResolver = TYPE_RESOLVER[typeof value[1]];
        sql = sql.replace(new RegExp(`\\?${value[0]}`, 'g'), typeResolver(value[1]));
    })
    return sql
}

const isNamedQuery = (params: IArguments): boolean => {
    return params.length === 1 && params[0] instanceof NamedArguments;
}

const getStatementsWithParameters = (query: string, params: IArguments): QueryAndParametersTuple => {
    if (isNamedQuery(params)) {
        return {
            query: getQueryFromParameters(query, params),
            params: []
        };
    }
    return {
        query,
        params: Object.values(params).map((key) => key)
    };
}

const getQueryStatement = (target: any, property: keyof object): string | never => {
    const methodName = `${target.__proto__.constructor.name}.${property}`;
    const queryName = QUERY_NAME_TO_METHOD[methodName];
    const query = QUERY_NAME_TO_QUERY[queryName] || METHOD_TO_QUERY[methodName];
    if (query) {
        return query;
    }
    throw `A query has not been found for the method ${methodName}`;
}

const getAsModel = (rows: any, constructableModel: ModelConstructable): any => {
    const resultSet: any = []
    rows.forEach((element: any) => {
        const model: any = new constructableModel()
        Object.entries(element).forEach((el: any) => {
            if (model[`_${el[0]}`] !== undefined) {
                model[`_${el[0]}`] = el[1]
            }
        })
        resultSet.push(model);
    });
    return resultSet;
}