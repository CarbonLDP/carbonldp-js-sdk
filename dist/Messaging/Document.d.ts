import { ServiceAwareDocument } from "../ServiceAwareDocument";
import * as Messaging from "./../Messaging";
import { Event } from "./Event";
import * as Message from "./Message";
export interface Class extends ServiceAwareDocument {
    on(event: Event.CHILD_CREATED, onEvent: (message: Messaging.ChildCreated.Class) => void, onError: (error: Error) => void): void;
    on(event: Event.ACCESS_POINT_CREATED, onEvent: (message: Messaging.AccessPointCreated.Class) => void, onError: (error: Error) => void): void;
    on(event: Event.DOCUMENT_CREATED, onEvent: (message: Messaging.DocumentCreated.Class) => void, onError: (error: Error) => void): void;
    on(event: Event.DOCUMENT_MODIFIED, onEvent: (message: Messaging.DocumentModified.Class) => void, onError: (error: Error) => void): void;
    on(event: Event.DOCUMENT_DELETED, onEvent: (message: Messaging.DocumentDeleted.Class) => void, onError: (error: Error) => void): void;
    on(event: Event.MEMBER_ADDED, onEvent: (message: Messaging.MemberAdded.Class) => void, onError: (error: Error) => void): void;
    on(event: Event.MEMBER_REMOVED, onEvent: (message: Messaging.MemberRemoved.Class) => void, onError: (error: Error) => void): void;
    on(event: Event | string, onEvent: (message: Messaging.Message.Class) => void, onError: (error: Error) => void): void;
    off(event: Event.CHILD_CREATED, onEvent: (message: Messaging.ChildCreated.Class) => void, onError: (error: Error) => void): void;
    off(event: Event.ACCESS_POINT_CREATED, onEvent: (message: Messaging.AccessPointCreated.Class) => void, onError: (error: Error) => void): void;
    off(event: Event.DOCUMENT_CREATED, onEvent: (message: Messaging.DocumentCreated.Class) => void, onError: (error: Error) => void): void;
    off(event: Event.DOCUMENT_MODIFIED, onEvent: (message: Messaging.DocumentModified.Class) => void, onError: (error: Error) => void): void;
    off(event: Event.DOCUMENT_DELETED, onEvent: (message: Messaging.DocumentDeleted.Class) => void, onError: (error: Error) => void): void;
    off(event: Event.MEMBER_ADDED, onEvent: (message: Messaging.MemberAdded.Class) => void, onError: (error: Error) => void): void;
    off(event: Event.MEMBER_REMOVED, onEvent: (message: Messaging.MemberRemoved.Class) => void, onError: (error: Error) => void): void;
    off(event: Event | string, onEvent: (message: Message.Class) => void, onError: (error: Error) => void): void;
    one(event: Event.CHILD_CREATED, onEvent: (message: Messaging.ChildCreated.Class) => void, onError: (error: Error) => void): void;
    one(event: Event.ACCESS_POINT_CREATED, onEvent: (message: Messaging.AccessPointCreated.Class) => void, onError: (error: Error) => void): void;
    one(event: Event.DOCUMENT_CREATED, onEvent: (message: Messaging.DocumentCreated.Class) => void, onError: (error: Error) => void): void;
    one(event: Event.DOCUMENT_MODIFIED, onEvent: (message: Messaging.DocumentModified.Class) => void, onError: (error: Error) => void): void;
    one(event: Event.DOCUMENT_DELETED, onEvent: (message: Messaging.DocumentDeleted.Class) => void, onError: (error: Error) => void): void;
    one(event: Event.MEMBER_ADDED, onEvent: (message: Messaging.MemberAdded.Class) => void, onError: (error: Error) => void): void;
    one(event: Event.MEMBER_REMOVED, onEvent: (message: Messaging.MemberRemoved.Class) => void, onError: (error: Error) => void): void;
    one(event: Event | string, onEvent: (message: Message.Class) => void, onError: (error: Error) => void): void;
    onAccessPointCreated(onEvent: (message: Messaging.AccessPointCreated.Class) => void, onError: (error: Error) => void): void;
    onChildCreated(onEvent: (message: Messaging.ChildCreated.Class) => void, onError: (error: Error) => void): void;
    onDocumentCreated(onEvent: (message: Messaging.DocumentCreated.Class) => void, onError: (error: Error) => void): void;
    onDocumentModified(onEvent: (message: Messaging.DocumentModified.Class) => void, onError: (error: Error) => void): void;
    onDocumentDeleted(onEvent: (message: Messaging.DocumentDeleted.Class) => void, onError: (error: Error) => void): void;
    onMemberAdded(onEvent: (message: Messaging.MemberAdded.Class) => void, onError: (error: Error) => void): void;
    onMemberRemoved(onEvent: (message: Messaging.MemberRemoved.Class) => void, onError: (error: Error) => void): void;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static decorate<T extends ServiceAwareDocument>(object: T): T & Class;
}
export default Class;
