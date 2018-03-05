import { ObjectSchema } from "../ObjectSchema";
import { DocumentCreatedDetails } from "./DocumentCreatedDetails";
import { EventMessage } from "./EventMessage";
export interface DocumentCreated extends EventMessage {
    details: DocumentCreatedDetails;
}
export interface DocumentCreatedConstant {
    SCHEMA: ObjectSchema;
}
export declare const DocumentCreated: DocumentCreatedConstant;
export default DocumentCreated;
