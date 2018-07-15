import { AbstractContext } from "../Context/AbstractContext";
import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";
import { QueryablePointer } from "./QueryablePointer";
import { QueryContext } from "./QueryContext";
export declare class QueryContextPartial extends QueryContext {
    private readonly _resource;
    constructor(resource: QueryablePointer, context?: AbstractContext<any, any, any>);
    getSchemaFor(object: object, path?: string): DigestedObjectSchema;
}
