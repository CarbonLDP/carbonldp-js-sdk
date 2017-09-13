import * as DocumentedDocument from "../DocumentedDocument";
import * as RDFNode from "../RDF/Node";
import { Events } from "./Events";
export interface Class extends DocumentedDocument.Class {
    on(eventType: Events | string, onEvent: (data: RDFNode.Class[]) => void, onError: (error: Error) => void): void;
    off(eventType: Events | string, onEvent: (data: RDFNode.Class[]) => void, onError: (error: Error) => void): void;
    one(eventType: Events | string, onEvent: (data: RDFNode.Class[]) => void, onError: (error: Error) => void): void;
    onDocumentCreated(onEvent: (data: RDFNode.Class[], onError: (error: Error) => void) => void): void;
    onChildCreated(onEvent: (data: RDFNode.Class[], onError: (error: Error) => void) => void): void;
    onAccessPointCreated(onEvent: (data: RDFNode.Class[], onError: (error: Error) => void) => void): void;
    onDocumentModified(onEvent: (data: RDFNode.Class[], onError: (error: Error) => void) => void): void;
    onDocumentDeleted(onEvent: (data: RDFNode.Class[], onError: (error: Error) => void) => void): void;
    onMemberAdded(onEvent: (data: RDFNode.Class[], onError: (error: Error) => void) => void): void;
    onMemberRemoved(onEvent: (data: RDFNode.Class[], onError: (error: Error) => void) => void): void;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static decorate<T extends DocumentedDocument.Class>(object: T): T & Class;
}
export default Class;
