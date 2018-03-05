import { ObjectSchema } from "../ObjectSchema";
import { EventMessage } from "./EventMessage";
export interface DocumentModified extends EventMessage {
}
export interface DocumentModifiedConstant {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const TYPE: string;
export declare const SCHEMA: ObjectSchema;
export declare const DocumentModified: DocumentModifiedConstant;
export default DocumentModified;
