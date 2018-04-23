import { TokenCredentials } from "../Auth";
import { ModelSchema } from "../core/ModelSchema";
import { ObjectSchema } from "../ObjectSchema";
import { C } from "../Vocabularies";
import { DocumentMetadata } from "./DocumentMetadata";
import { VolatileResource } from "./VolatileResource";
export interface ResponseMetadata extends VolatileResource {
    documentsMetadata?: DocumentMetadata[];
    authToken?: TokenCredentials;
}
export interface ResponseMetadataFactory extends ModelSchema {
    TYPE: C["ResponseMetadata"];
    SCHEMA: ObjectSchema;
    is(object: object): object is ResponseMetadata;
}
export declare const ResponseMetadata: ResponseMetadataFactory;
