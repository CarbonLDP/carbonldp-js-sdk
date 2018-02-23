import * as ObjectSchema from "./../ObjectSchema";
import { Pointer } from "./../Pointer";
import { Resource } from "./../Resource";
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Resource {
    members: Pointer[];
}
export default Class;
