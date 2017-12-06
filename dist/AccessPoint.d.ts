import * as LDP from "./LDP";
import * as Pointer from "./Pointer";
export declare const RDF_CLASS: string;
export interface Class {
    hasMemberRelation: string | Pointer.Class;
    isMemberOfRelation?: string | Pointer.Class;
    insertedContentRelation?: string | Pointer.Class;
}
export interface DocumentClass extends LDP.DirectContainer.Class {
    hasMemberRelation: Pointer.Class;
    isMemberOfRelation?: Pointer.Class;
    insertedContentRelation?: Pointer.Class;
}
export declare class Factory {
    static is(object: object): object is DocumentClass;
    static create(membershipResource: Pointer.Class, hasMemberRelation: string | Pointer.Class, isMemberOfRelation?: string | Pointer.Class): DocumentClass;
    static createFrom<T extends object>(object: T, membershipResource: Pointer.Class, hasMemberRelation: string | Pointer.Class, isMemberOfRelation?: string | Pointer.Class): T & DocumentClass;
}
export default Class;
