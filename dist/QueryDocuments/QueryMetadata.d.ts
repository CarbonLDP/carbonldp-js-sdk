import { VolatileResource } from "../LDP/VolatileResource";
import { ModelSchema } from "../Model/ModelSchema";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { QueryablePointer } from "./QueryablePointer";
export interface QueryMetadata extends VolatileResource {
    target: QueryablePointer;
}
export interface QueryMetadataFactory extends ModelSchema {
    TYPE: string;
    SCHEMA: ObjectSchema;
    is(value: any): value is QueryMetadata;
}
export declare const QueryMetadata: QueryMetadataFactory;
