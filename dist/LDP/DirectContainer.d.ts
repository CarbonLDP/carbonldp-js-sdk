import { Document } from "./../Document";
import * as Pointer from "./../Pointer";
export declare const RDF_CLASS: string;
export interface Class extends Document {
    membershipResource: Pointer.Class;
}
export declare class Factory {
    static hasClassProperties(resource: object): boolean;
    static is(object: object): object is Class;
    static create(membershipResource: Pointer.Class, hasMemberRelation: string | Pointer.Class, isMemberOfRelation?: string | Pointer.Class): Class;
    static createFrom<T extends object>(object: T, membershipResource: Pointer.Class, hasMemberRelation: string | Pointer.Class, isMemberOfRelation?: string | Pointer.Class): T & Class;
}
export default Class;
