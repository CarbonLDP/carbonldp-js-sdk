import * as LDP from "./LDP";
import * as Pointer from "./Pointer";
export declare const RDF_CLASS: string;
export interface Class {
    hasMemberRelation: string | Pointer.Class;
    memberOfRelation?: string | Pointer.Class;
    insertedContentRelation?: string | Pointer.Class;
}
export interface DocumentClass extends LDP.DirectContainer.Class {
    membershipResource: Pointer.Class;
    hasMemberRelation: Pointer.Class;
    insertedContentRelation?: Pointer.Class;
}
export declare class Factory {
    static is(object: Object): boolean;
    static create(membershipResource: Pointer.Class, hasMemberRelation: string | Pointer.Class, memberOfRelation?: string | Pointer.Class): DocumentClass;
    static createFrom<T extends Object>(object: T, membershipResource: Pointer.Class, hasMemberRelation: string | Pointer.Class, memberOfRelation?: string | Pointer.Class): T & DocumentClass;
}
export default Class;
