import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { EventMessage } from "./EventMessage";
export interface DocumentDeleted extends EventMessage {
}
export interface DocumentDeletedFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const DocumentDeleted: DocumentDeletedFactory;
