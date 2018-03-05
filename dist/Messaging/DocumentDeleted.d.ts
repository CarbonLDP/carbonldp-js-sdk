import { ObjectSchema } from "../ObjectSchema";
import { EventMessage } from "./EventMessage";
export interface DocumentDeleted extends EventMessage {
}
export interface DocumentDeletedConstant {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const DocumentDeleted: DocumentDeletedConstant;
export default DocumentDeleted;
