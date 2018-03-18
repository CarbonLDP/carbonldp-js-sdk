import { VolatileResource } from "../../LDP/VolatileResource";
import { ModelFactory } from "../../ModelFactory";
import { ObjectSchema } from "../../ObjectSchema";
import { Pointer } from "../../Pointer";
export interface QueryMetadata extends VolatileResource {
    target: Pointer;
}
export interface QueryMetadataFactory extends ModelFactory<QueryMetadata> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    is(object: object): object is QueryMetadata;
}
export declare const QueryMetadata: QueryMetadataFactory;
export default QueryMetadata;
