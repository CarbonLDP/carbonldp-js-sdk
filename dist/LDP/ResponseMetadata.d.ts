import { ModelFactory } from "../core/ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { DocumentMetadata } from "./DocumentMetadata";
import { VolatileResource } from "./VolatileResource";
import { TokenCredentials } from "../Auth";
export interface ResponseMetadata extends VolatileResource {
    documentsMetadata?: DocumentMetadata[];
    authToken?: TokenCredentials;
}
export interface ResponseMetadataFactory extends ModelFactory<ResponseMetadata> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    is(object: object): object is ResponseMetadata;
}
export declare const ResponseMetadata: ResponseMetadataFactory;
