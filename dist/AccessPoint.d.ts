import * as LDP from "./LDP";
import { Pointer } from "./Pointer";
export declare const RDF_CLASS: string;
export interface Class {
    hasMemberRelation: string | Pointer;
    isMemberOfRelation?: string | Pointer;
    insertedContentRelation?: string | Pointer;
}
export interface DocumentClass extends LDP.DirectContainer.Class {
    hasMemberRelation: Pointer;
    isMemberOfRelation?: Pointer;
    insertedContentRelation?: Pointer;
}
export declare class Factory {
    static is(object: object): object is DocumentClass;
    static create(membershipResource: Pointer, hasMemberRelation: string | Pointer, isMemberOfRelation?: string | Pointer): DocumentClass;
    static createFrom<T extends object>(object: T, membershipResource: Pointer, hasMemberRelation: string | Pointer, isMemberOfRelation?: string | Pointer): T & DocumentClass;
}
export default Class;
