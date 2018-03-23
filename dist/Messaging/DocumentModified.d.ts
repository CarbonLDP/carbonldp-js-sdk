import { ObjectSchema } from "../ObjectSchema";
import { EventMessage } from "./EventMessage";
export interface DocumentModified extends EventMessage {
}
export interface DocumentModifiedFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const DocumentModified: DocumentModifiedFactory;
