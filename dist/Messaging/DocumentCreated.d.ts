import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { DocumentCreatedDetails } from "./DocumentCreatedDetails";
import { EventMessage } from "./EventMessage";
export interface DocumentCreated extends EventMessage {
    details: DocumentCreatedDetails;
}
export interface DocumentCreatedFactory {
    SCHEMA: ObjectSchema;
}
export declare const DocumentCreated: DocumentCreatedFactory;
