import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
export interface DocumentCreatedDetails extends Resource {
    createdDocuments: Pointer[];
}
export interface DocumentCreatedDetailsFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const DocumentCreatedDetails: DocumentCreatedDetailsFactory;
