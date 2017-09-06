import { Class as RDFNode } from "../RDF/Node";
export declare enum STOMPEvents {
    CHILD_CREATED = "c.c",
    ACCESS_POINT_CREATED = "a.c",
    DOCUMENT_CREATED = "*.c",
    DOCUMENT_MODIFIED = "d.m",
    DOCUMENT_DELETED = "d.d",
    MEMBER_ADDED = "m.a",
    MEMBER_REMOVED = "m.r",
}
export interface RealTimeService {
    on(eventType: STOMPEvents | string, uriPattern: string, callback: (data: RDFNode) => void): void;
    off(eventType: STOMPEvents | string, uriPattern: string, callback: (data: RDFNode) => void): void;
    one(eventType: STOMPEvents | string, uriPattern: string, callback: (data: RDFNode) => void): void;
    onDocumentCreated(uriPattern: string, callback: (data: RDFNode) => void): void;
    onChildCreated(uriPattern: string, callback: (data: RDFNode) => void): void;
    onAccessPointCreated(uriPattern: string, callback: (data: RDFNode) => void): void;
    onDocumentModified(uriPattern: string, callback: (data: RDFNode) => void): void;
    onDocumentDeleted(uriPattern: string, callback: (data: RDFNode) => void): void;
    onMemberAdded(uriPattern: string, callback: (data: RDFNode) => void): void;
    onMemberRemoved(uriPattern: string, callback: (data: RDFNode) => void): void;
}
export interface RealTimeDocument {
    on(eventType: STOMPEvents | string, callback: (data: RDFNode) => void): void;
    off(eventType: STOMPEvents | string, callback: (data: RDFNode) => void): void;
    one(eventType: STOMPEvents | string, callback: (data: RDFNode) => void): void;
    onDocumentCreated(callback: (data: RDFNode) => void): void;
    onChildCreated(callback: (data: RDFNode) => void): void;
    onAccessPointCreated(callback: (data: RDFNode) => void): void;
    onDocumentModified(callback: (data: RDFNode) => void): void;
    onDocumentDeleted(callback: (data: RDFNode) => void): void;
    onMemberAdded(callback: (data: RDFNode) => void): void;
    onMemberRemoved(callback: (data: RDFNode) => void): void;
}
