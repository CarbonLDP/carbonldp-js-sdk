import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { DocumentMetadata } from "./DocumentMetadata";
import { VolatileResource } from "./VolatileResource";
export interface ResponseMetadata extends VolatileResource {
    documentsMetadata?: DocumentMetadata[];
}
export interface ResponseMetadataFactory extends ModelFactory<ResponseMetadata> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    is(object: object): object is ResponseMetadata;
}
export declare const ResponseMetadata: ResponseMetadataFactory;
export default ResponseMetadata;
