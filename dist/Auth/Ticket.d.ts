import * as ObjectSchema from "./../ObjectSchema";
import { Pointer } from "./../Pointer";
import { Resource } from "./../Resource";
export declare const TICKETS_CONTAINER: string;
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.ObjectSchema;
export interface Class extends Resource {
    forURI: Pointer;
    expirationTime: Date;
    ticketKey: string;
}
export declare class Factory {
    static create(uri: string): Class;
    static createFrom<T extends Resource>(object: T, uri: string): Class & T;
}
export default Class;
