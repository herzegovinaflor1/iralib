import {METHOD_TO_QUERY, QUERY_NAME_TO_METHOD} from "../types/context/queries";

const ERROR_MESSAGE = "Query is null or empty";

const getObjectAndMethodName = (target: any, propertyKey: string): string => {
    return `${target.constructor.name}.${propertyKey}`;
}

const NativeQuery = (query: string) => {

    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        if (query) {
            const objectAndMethodName = getObjectAndMethodName(target, propertyKey);
            METHOD_TO_QUERY[objectAndMethodName] = query;
            return descriptor;
        }
        throw ERROR_MESSAGE;
    };
}

const NamedQuery = (queryName: string) => {

    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        if (queryName) {
            const objectAndMethodName = getObjectAndMethodName(target, propertyKey);
            QUERY_NAME_TO_METHOD[objectAndMethodName] = queryName;
            return descriptor;
        }
        throw ERROR_MESSAGE;
    };
}

export {NativeQuery, NamedQuery}
