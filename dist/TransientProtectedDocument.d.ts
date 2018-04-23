import { TransientDocument } from "./Document";
import { ObjectSchema } from "./ObjectSchema";
export interface TransientProtectedDocument extends TransientDocument {
}
export interface TransientProtectedDocumentFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const TransientProtectedDocument: TransientProtectedDocumentFactory;
