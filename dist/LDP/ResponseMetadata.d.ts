import { ModelSchema } from "../Model";
import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies";
import { DocumentMetadata } from "./DocumentMetadata";
import { VolatileResource } from "./VolatileResource";
export interface ResponseMetadata extends VolatileResource {
    documentsMetadata?: DocumentMetadata[];
}
export interface ResponseMetadataFactory extends ModelSchema {
    TYPE: C["ResponseMetadata"];
    SCHEMA: ObjectSchema;
    is(object: object): object is ResponseMetadata;
}
export declare const ResponseMetadata: ResponseMetadataFactory;
