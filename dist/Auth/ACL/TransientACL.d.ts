import { ModelDecorator } from "../../core/ModelDecorator";
import { TransientDocument } from "../../Document";
import { Pointer } from "../../Pointer";
import { CS } from "../../Vocabularies";
import { TransientACE } from "../ACE";
export interface TransientACL extends TransientDocument {
    accessTo: Pointer;
    entries?: TransientACE[];
    inheritableEntries?: TransientACE[];
    _parsePointer(element: string | Pointer): Pointer;
    grant(subject: string | Pointer, subjectsClass: string | Pointer, permission: string | Pointer): void;
    grant(subject: string | Pointer, subjectsClass: string | Pointer, permissions: (string | Pointer)[]): void;
    grant(subjects: (string | Pointer)[], subjectsClass: string | Pointer, permission: string | Pointer): void;
    grant(subjects: (string | Pointer)[], subjectsClass: string | Pointer, permissions: (string | Pointer)[]): void;
    deny(subject: string | Pointer, subjectsClass: string | Pointer, permission: string | Pointer): void;
    deny(subject: string | Pointer, subjectsClass: string | Pointer, permissions: (string | Pointer)[]): void;
    deny(subjects: (string | Pointer)[], subjectsClass: string | Pointer, permission: string | Pointer): void;
    deny(subjects: (string | Pointer)[], subjectsClass: string | Pointer, permissions: (string | Pointer)[]): void;
    configureChildInheritance(granting: boolean, subject: string | Pointer, subjectsClass: string | Pointer, permission: string | Pointer): void;
    configureChildInheritance(granting: boolean, subject: string | Pointer, subjectsClass: string | Pointer, permissions: (string | Pointer)[]): void;
    configureChildInheritance(granting: boolean, subjects: (string | Pointer)[], subjectsClass: string | Pointer, permission: string | Pointer): void;
    configureChildInheritance(granting: boolean, subjects: (string | Pointer)[], subjectsClass: string | Pointer, permissions: (string | Pointer)[]): void;
    grants(subject: string | Pointer, permission: string | Pointer): boolean;
    denies(subject: string | Pointer, permission: string | Pointer): boolean;
    getChildInheritance(subject: string | Pointer, permissions: string | Pointer): boolean;
    remove(subject: string | Pointer, permission: string | Pointer): void;
    remove(subject: string | Pointer, permissions: (string | Pointer)[]): void;
    removeChildInheritance(subject: string | Pointer, permission: string | Pointer): void;
    removeChildInheritance(subject: string | Pointer, permissions: (string | Pointer)[]): void;
}
export interface TransientACLFactory extends ModelDecorator<TransientACL> {
    TYPE: CS["AccessControlList"];
    isDecorated(object: object): object is TransientACL;
    decorate<T extends object>(object: T): T & TransientACL;
}
export declare const TransientACL: TransientACLFactory;
