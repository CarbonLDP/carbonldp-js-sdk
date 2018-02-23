import * as ObjectSchema from "./../ObjectSchema";
import { Pointer } from "./../Pointer";
import * as Resource from "./../Resource";
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Resource.Class {
    target: Pointer;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
}
export default Class;
