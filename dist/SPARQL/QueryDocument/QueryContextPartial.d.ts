import { AbstractContext } from "../../AbstractContext";
import { DigestedObjectSchema } from "../../ObjectSchema";
import { Pointer } from "../../Pointer";
import { PersistedResource } from "../../Resource";
import { QueryContext } from "./QueryContext";
export declare class QueryContextPartial extends QueryContext {
    private readonly _resource;
    constructor(resource: PersistedResource, context?: AbstractContext<Pointer, any>);
    getSchemaFor(object: object, path?: string): DigestedObjectSchema;
}
