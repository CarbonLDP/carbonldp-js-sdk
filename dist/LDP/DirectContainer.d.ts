import * as Container from "./Container";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";
export declare const RDF_CLASS: string;
export interface Class extends Container.Class {
    membershipResource: Pointer.Class;
}
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
    static hasRDFClass(resource: Resource.Class): boolean;
    static hasRDFClass(expandedObject: Object): boolean;
    static is(object: Object): boolean;
    static create(membershipResource: Pointer.Class, hasMemberRelation: string | Pointer.Class, memberOfRelation?: string | Pointer.Class): Class;
    static createFrom<T extends Object>(object: T, membershipResource: Pointer.Class, hasMemberRelation: string | Pointer.Class, memberOfRelation?: string | Pointer.Class): T & Class;
}
export default Class;
