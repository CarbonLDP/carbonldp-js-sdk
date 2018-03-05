import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
export interface DocumentCreatedDetails extends Resource {
    createdDocuments: Pointer[];
}
export interface DocumentCreatedDetailsConstant {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const DocumentCreatedDetails: DocumentCreatedDetailsConstant;
export default DocumentCreatedDetails;
