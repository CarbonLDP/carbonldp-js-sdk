import * as ObjectSchema from "./../ObjectSchema";
import { Pointer } from "./../Pointer";
import { Resource } from "./../Resource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.ObjectSchema;
export interface Class extends Resource {
    targetMembers: Pointer[];
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static create(targetMembers: Pointer[]): Class;
}
export default Class;
