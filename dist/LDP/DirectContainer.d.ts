import * as Document from "./../Document";
import * as Pointer from "./../Pointer";
export declare const RDF_CLASS: string;
export interface Class extends Document.Class {
    membershipResource: Pointer.Class;
}
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
    static is(object: Object): boolean;
    static create(membershipResource: Pointer.Class, hasMemberRelation: string | Pointer.Class, isMemberOfRelation?: string | Pointer.Class): Class;
    static createFrom<T extends Object>(object: T, membershipResource: Pointer.Class, hasMemberRelation: string | Pointer.Class, isMemberOfRelation?: string | Pointer.Class): T & Class;
}
export default Class;
