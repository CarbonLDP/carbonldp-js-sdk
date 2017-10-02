import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Resource.Class {
    target: Pointer.Class;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
}
export default Class;
