import { ModelSchema } from "../../core/ModelSchema";
import { VolatileResource } from "../../LDP";
import { ObjectSchema } from "../../ObjectSchema";
import { Pointer } from "../../Pointer";
export interface QueryMetadata extends VolatileResource {
    target: Pointer;
}
export interface QueryMetadataFactory extends ModelSchema {
    TYPE: string;
    SCHEMA: ObjectSchema;
    is(value: any): value is QueryMetadata;
}
export declare const QueryMetadata: QueryMetadataFactory;
