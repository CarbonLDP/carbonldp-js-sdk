import * as LDP from "./LDP";
import * as Pointer from "./Pointer";
export declare const RDF_CLASS: string;
export interface Class extends LDP.DirectContainer.Class {
    insertedContentRelation?: Pointer.Class;
}
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
    static create(membershipResource: Pointer.Class, hasMemberRelation: string | Pointer.Class, memberOfRelation?: string | Pointer.Class): Class;
    static createFrom<T extends Object>(object: T, membershipResource: Pointer.Class, hasMemberRelation: string | Pointer.Class, memberOfRelation?: string | Pointer.Class): T & Class;
}
export default Class;
