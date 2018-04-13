import { PersistedDocument } from "../PersistedDocument";
import { Pointer } from "../Pointer";
import { PersistedACE } from "./PersistedACE";
import { ModelDecorator } from "../ModelDecorator";
import { Documents } from "../Documents";
export interface PersistedACL extends PersistedDocument {
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
export interface PersistedACLFactory extends ModelDecorator<PersistedACL> {
    isDecorated(object: object): object is PersistedACL;
    decorate<T extends object>(object: T, documents: Documents): T & PersistedACL;
}
export declare const PersistedACL: PersistedACLFactory;
