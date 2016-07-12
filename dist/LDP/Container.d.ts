import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as RDFSource from "./RDFSource";
import * as Resource from "./../Resource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends RDFSource.Class {
    memberOfRelation?: Pointer.Class;
    hasMemberRelation?: Pointer.Class;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static decorate<T extends Object>(object: T, hasMemberRelation?: string | Pointer.Class, memberOfRelation?: string | Pointer.Class): T & Class;
    static hasRDFClass(resource: Resource.Class): boolean;
    static hasRDFClass(expandedObject: Object): boolean;
}
export default Class;
