import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { DocumentMetadata } from "./DocumentMetadata";
import { VolatileResource } from "./VolatileResource";
export interface ResponseMetadata extends VolatileResource {
    documentsMetadata?: DocumentMetadata[];
}
export interface ResponseMetadataConstant extends ModelFactory<ResponseMetadata> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    is(object: object): object is ResponseMetadata;
}
export declare const ResponseMetadata: ResponseMetadataConstant;
export default ResponseMetadata;
