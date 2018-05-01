import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../Resource";
export interface DocumentCreatedDetails extends TransientResource {
    createdDocuments: Pointer[];
}
export interface DocumentCreatedDetailsFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const DocumentCreatedDetails: DocumentCreatedDetailsFactory;
