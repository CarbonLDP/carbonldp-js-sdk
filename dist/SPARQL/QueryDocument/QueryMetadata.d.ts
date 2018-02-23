import * as VolatileResource from "../../LDP/VolatileResource";
import * as ObjectSchema from "../../ObjectSchema";
import { Pointer } from "../../Pointer";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends VolatileResource.Class {
    target: Pointer;
}
export declare class Factory {
    static is(object: object): object is Class;
}
export default Class;
