import { TransientDocument } from "./TransientDocument";
import { ObjectSchema } from "./ObjectSchema";
export interface ProtectedDocument extends TransientDocument {
}
export interface ProtectedDocumentFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const ProtectedDocument: ProtectedDocumentFactory;
