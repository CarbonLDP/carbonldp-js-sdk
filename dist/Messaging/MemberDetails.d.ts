import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as Resource from "./../Resource";
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Resource.Class {
    members: Pointer.Class[];
}
export default Class;
