import * as ServiceAwareDocument from "../ServiceAwareDocument";
import { Event } from "./Event";
import * as Message from "./Message";
export interface Class extends ServiceAwareDocument.Class {
    on(event: Event | string, onEvent: (message: Message.Class) => void, onError: (error: Error) => void): void;
    off(event: Event | string, onEvent: (message: Message.Class) => void, onError: (error: Error) => void): void;
    one(event: Event | string, onEvent: (message: Message.Class) => void, onError: (error: Error) => void): void;
    onDocumentCreated(onEvent: (message: Message.Class, onError: (error: Error) => void) => void): void;
    onChildCreated(onEvent: (message: Message.Class, onError: (error: Error) => void) => void): void;
    onAccessPointCreated(onEvent: (message: Message.Class, onError: (error: Error) => void) => void): void;
    onDocumentModified(onEvent: (message: Message.Class, onError: (error: Error) => void) => void): void;
    onDocumentDeleted(onEvent: (message: Message.Class, onError: (error: Error) => void) => void): void;
    onMemberAdded(onEvent: (message: Message.Class, onError: (error: Error) => void) => void): void;
    onMemberRemoved(onEvent: (message: Message.Class, onError: (error: Error) => void) => void): void;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static decorate<T extends ServiceAwareDocument.Class>(object: T): T & Class;
}
export default Class;
