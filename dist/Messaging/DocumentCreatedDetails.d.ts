import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../TransientResource";
export interface DocumentCreatedDetails extends TransientResource {
    createdDocuments: Pointer[];
}
export interface DocumentCreatedDetailsFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const DocumentCreatedDetails: DocumentCreatedDetailsFactory;
