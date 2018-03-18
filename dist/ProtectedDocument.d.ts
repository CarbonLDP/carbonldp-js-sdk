import { Document } from "./Document";
import { ObjectSchema } from "./ObjectSchema";
export interface ProtectedDocument extends Document {
}
export interface ProtectedDocumentFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const ProtectedDocument: ProtectedDocumentFactory;
export default ProtectedDocument;
