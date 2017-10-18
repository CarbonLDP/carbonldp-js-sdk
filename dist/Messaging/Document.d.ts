import * as ServiceAwareDocument from "../ServiceAwareDocument";
import * as Messaging from "./../Messaging";
import { Event } from "./Event";
import * as Message from "./Message";
export interface Class extends ServiceAwareDocument.Class {
    on(event: Event | string, onEvent: (message: Message.Class) => void, onError: (error: Error) => void): void;
    off(event: Event | string, onEvent: (message: Message.Class) => void, onError: (error: Error) => void): void;
    one(event: Event | string, onEvent: (message: Message.Class) => void, onError: (error: Error) => void): void;
    onAccessPointCreated(onEvent: (message: Messaging.AccessPointCreated.Class, onError: (error: Error) => void) => void): void;
    onChildCreated(onEvent: (message: Messaging.ChildCreated.Class, onError: (error: Error) => void) => void): void;
    onDocumentCreated(onEvent: (message: Messaging.DocumentCreated.Class, onError: (error: Error) => void) => void): void;
    onDocumentModified(onEvent: (message: Messaging.DocumentModified.Class, onError: (error: Error) => void) => void): void;
    onDocumentDeleted(onEvent: (message: Messaging.DocumentDeleted.Class, onError: (error: Error) => void) => void): void;
    onMemberAdded(onEvent: (message: Messaging.MemberAdded.Class, onError: (error: Error) => void) => void): void;
    onMemberRemoved(onEvent: (message: Messaging.MemberRemoved.Class, onError: (error: Error) => void) => void): void;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static decorate<T extends ServiceAwareDocument.Class>(object: T): T & Class;
}
export default Class;
