import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Resource.Class {
    targetMembers: Pointer.Class[];
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static create(targetMembers: Pointer.Class[]): Class;
}
export default Class;
