import { Document } from "../Document/Document";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { Resource } from "../Resource/Resource";
export interface DocumentCreatedDetails extends Resource {
    createdDocuments: Document[];
}
export interface DocumentCreatedDetailsFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const DocumentCreatedDetails: DocumentCreatedDetailsFactory;
