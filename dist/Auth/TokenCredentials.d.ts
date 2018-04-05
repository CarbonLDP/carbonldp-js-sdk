import * as ObjectSchema from "./../ObjectSchema";
import { Resource } from "./../Resource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.ObjectSchema;
export interface Class extends Resource {
    key: string;
    expirationTime: Date;
}
export declare class Factory {
    static is(object: object): object is Class;
    static hasClassProperties(object: object): object is Class;
}
export default Class;
