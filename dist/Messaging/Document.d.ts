import * as RDFNode from "../RDF/Node";
import * as ServiceAwareDocument from "../ServiceAwareDocument";
import { Event } from "./Event";
export interface Class extends ServiceAwareDocument.Class {
    on(event: Event | string, onEvent: (data: RDFNode.Class[]) => void, onError: (error: Error) => void): void;
    off(event: Event | string, onEvent: (data: RDFNode.Class[]) => void, onError: (error: Error) => void): void;
    one(event: Event | string, onEvent: (data: RDFNode.Class[]) => void, onError: (error: Error) => void): void;
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
    static decorate<T extends ServiceAwareDocument.Class>(object: T): T & Class;
}
export default Class;
