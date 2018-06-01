import { ModelDecorator } from "../../core/ModelDecorator";
import { ModelSchema } from "../../core/ModelSchema";
import { Document } from "../../Document";
import { Documents } from "../../Documents";
import { ObjectSchema } from "../../ObjectSchema";
import { Pointer } from "../../Pointer";
import { ProtectedDocument } from "../../ProtectedDocument";
import { CS } from "../../Vocabularies";
import { ACE } from "../ACE";
export interface ACL extends Document {
    accessTo?: ProtectedDocument;
    entries?: ACE[];
    inheritableEntries?: ACE[];
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
export interface ACLFactory extends ModelDecorator<ACL>, ModelSchema {
    TYPE: CS["AccessControlList"];
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is ACL;
    decorate<T extends object>(object: T, documents: Documents): T & ACL;
}
export declare const ACL: ACLFactory;
