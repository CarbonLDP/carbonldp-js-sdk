import { TransientDocument } from "../Document";
import { CS } from "../Vocabularies";
export interface TransientProtectedDocument extends TransientDocument {
}
export interface TransientProtectedDocumentFactory {
    TYPE: CS["ProtectedDocument"];
}
export declare const TransientProtectedDocument: TransientProtectedDocumentFactory;
