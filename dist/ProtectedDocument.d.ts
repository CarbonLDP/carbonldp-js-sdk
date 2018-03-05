import { Document } from "./Document";
import { ObjectSchema } from "./ObjectSchema";
export interface ProtectedDocument extends Document {
}
export interface ProtectedDocumentConstant {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const ProtectedDocument: ProtectedDocumentConstant;
export default ProtectedDocument;
