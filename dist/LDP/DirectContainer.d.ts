import { Document } from "./../Document";
import { Pointer } from "./../Pointer";
export declare const RDF_CLASS: string;
export interface Class extends Document {
    membershipResource: Pointer;
}
export declare class Factory {
    static hasClassProperties(resource: object): boolean;
    static is(object: object): object is Class;
    static create(membershipResource: Pointer, hasMemberRelation: string | Pointer, isMemberOfRelation?: string | Pointer): Class;
    static createFrom<T extends object>(object: T, membershipResource: Pointer, hasMemberRelation: string | Pointer, isMemberOfRelation?: string | Pointer): T & Class;
}
export default Class;
