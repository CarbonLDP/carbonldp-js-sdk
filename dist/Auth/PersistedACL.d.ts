import { PersistedACE } from "./PersistedACE";
import * as PersistedDocument from "./../PersistedDocument";
import { Pointer } from "./../Pointer";
export interface Class extends PersistedDocument.Class {
    accessTo: Pointer;
    entries?: PersistedACE[];
    inheritableEntries?: PersistedACE[];
    _parsePointer(element: string | Pointer): Pointer;
    grant(subject: string | Pointer, subjectClass: string | Pointer, permission: string | Pointer): void;
    grant(subject: string | Pointer, subjectClass: string | Pointer, permissions: (string | Pointer)[]): void;
    grant(subjects: (string | Pointer)[], subjectClass: string | Pointer, permission: string | Pointer): void;
    grant(subjects: (string | Pointer)[], subjectClass: string | Pointer, permissions: (string | Pointer)[]): void;
    deny(subject: string | Pointer, subjectClass: string | Pointer, permission: string | Pointer): void;
    deny(subject: string | Pointer, subjectClass: string | Pointer, permissions: (string | Pointer)[]): void;
    deny(subjects: (string | Pointer)[], subjectClass: string | Pointer, permission: string | Pointer): void;
    deny(subjects: (string | Pointer)[], subjectClass: string | Pointer, permissions: (string | Pointer)[]): void;
    configureChildInheritance(granting: boolean, subject: string | Pointer, subjectClass: string | Pointer, permission: string | Pointer): void;
    configureChildInheritance(granting: boolean, subject: string | Pointer, subjectClass: string | Pointer, permissions: (string | Pointer)[]): void;
    configureChildInheritance(granting: boolean, subjects: (string | Pointer)[], subjectClass: string | Pointer, permission: string | Pointer): void;
    configureChildInheritance(granting: boolean, subjects: (string | Pointer)[], subjectClass: string | Pointer, permissions: (string | Pointer)[]): void;
    grants(subject: string | Pointer, permission: string | Pointer): boolean;
    denies(subject: string | Pointer, permission: string | Pointer): boolean;
    getChildInheritance(subject: string | Pointer, permissions: string | Pointer): boolean;
    remove(subject: string | Pointer, permission: string | Pointer): void;
    remove(subject: string | Pointer, permissions: (string | Pointer)[]): void;
    removeChildInheritance(subject: string | Pointer, permission: string | Pointer): void;
    removeChildInheritance(subject: string | Pointer, permissions: (string | Pointer)[]): void;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static decorate<T extends PersistedDocument.Class>(document: T): T & Class;
}
export default Class;
