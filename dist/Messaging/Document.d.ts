import { ServiceAwareDocument } from "../ServiceAwareDocument";
import { AccessPointCreated } from "./AccessPointCreated";
import { ChildCreated } from "./ChildCreated";
import { DocumentCreated } from "./DocumentCreated";
import { DocumentDeleted } from "./DocumentDeleted";
import { DocumentModified } from "./DocumentModified";
import { Event } from "./Event";
import { EventMessage } from "./EventMessage";
import { MemberAdded } from "./MemberAdded";
import { MemberRemoved } from "./MemberRemoved";
export interface Class extends ServiceAwareDocument {
    on(event: Event.CHILD_CREATED, onEvent: (message: ChildCreated) => void, onError: (error: Error) => void): void;
    on(event: Event.ACCESS_POINT_CREATED, onEvent: (message: AccessPointCreated) => void, onError: (error: Error) => void): void;
    on(event: Event.DOCUMENT_CREATED, onEvent: (message: DocumentCreated) => void, onError: (error: Error) => void): void;
    on(event: Event.DOCUMENT_MODIFIED, onEvent: (message: DocumentModified) => void, onError: (error: Error) => void): void;
    on(event: Event.DOCUMENT_DELETED, onEvent: (message: DocumentDeleted) => void, onError: (error: Error) => void): void;
    on(event: Event.MEMBER_ADDED, onEvent: (message: MemberAdded) => void, onError: (error: Error) => void): void;
    on(event: Event.MEMBER_REMOVED, onEvent: (message: MemberRemoved) => void, onError: (error: Error) => void): void;
    on(event: Event | string, onEvent: (message: EventMessage) => void, onError: (error: Error) => void): void;
    off(event: Event.CHILD_CREATED, onEvent: (message: ChildCreated) => void, onError: (error: Error) => void): void;
    off(event: Event.ACCESS_POINT_CREATED, onEvent: (message: AccessPointCreated) => void, onError: (error: Error) => void): void;
    off(event: Event.DOCUMENT_CREATED, onEvent: (message: DocumentCreated) => void, onError: (error: Error) => void): void;
    off(event: Event.DOCUMENT_MODIFIED, onEvent: (message: DocumentModified) => void, onError: (error: Error) => void): void;
    off(event: Event.DOCUMENT_DELETED, onEvent: (message: DocumentDeleted) => void, onError: (error: Error) => void): void;
    off(event: Event.MEMBER_ADDED, onEvent: (message: MemberAdded) => void, onError: (error: Error) => void): void;
    off(event: Event.MEMBER_REMOVED, onEvent: (message: MemberRemoved) => void, onError: (error: Error) => void): void;
    off(event: Event | string, onEvent: (message: EventMessage) => void, onError: (error: Error) => void): void;
    one(event: Event.CHILD_CREATED, onEvent: (message: ChildCreated) => void, onError: (error: Error) => void): void;
    one(event: Event.ACCESS_POINT_CREATED, onEvent: (message: AccessPointCreated) => void, onError: (error: Error) => void): void;
    one(event: Event.DOCUMENT_CREATED, onEvent: (message: DocumentCreated) => void, onError: (error: Error) => void): void;
    one(event: Event.DOCUMENT_MODIFIED, onEvent: (message: DocumentModified) => void, onError: (error: Error) => void): void;
    one(event: Event.DOCUMENT_DELETED, onEvent: (message: DocumentDeleted) => void, onError: (error: Error) => void): void;
    one(event: Event.MEMBER_ADDED, onEvent: (message: MemberAdded) => void, onError: (error: Error) => void): void;
    one(event: Event.MEMBER_REMOVED, onEvent: (message: MemberRemoved) => void, onError: (error: Error) => void): void;
    one(event: Event | string, onEvent: (message: EventMessage) => void, onError: (error: Error) => void): void;
    onAccessPointCreated(onEvent: (message: AccessPointCreated) => void, onError: (error: Error) => void): void;
    onChildCreated(onEvent: (message: ChildCreated) => void, onError: (error: Error) => void): void;
    onDocumentCreated(onEvent: (message: DocumentCreated) => void, onError: (error: Error) => void): void;
    onDocumentModified(onEvent: (message: DocumentModified) => void, onError: (error: Error) => void): void;
    onDocumentDeleted(onEvent: (message: DocumentDeleted) => void, onError: (error: Error) => void): void;
    onMemberAdded(onEvent: (message: MemberAdded) => void, onError: (error: Error) => void): void;
    onMemberRemoved(onEvent: (message: MemberRemoved) => void, onError: (error: Error) => void): void;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static decorate<T extends ServiceAwareDocument>(object: T): T & Class;
}
export default Class;
