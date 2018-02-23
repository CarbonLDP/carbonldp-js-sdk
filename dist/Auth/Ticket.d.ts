import * as ObjectSchema from "./../ObjectSchema";
import { Pointer } from "./../Pointer";
import * as Resource from "./../Resource";
export declare const TICKETS_CONTAINER: string;
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Resource.Class {
    forURI: Pointer;
    expirationTime: Date;
    ticketKey: string;
}
export declare class Factory {
    static create(uri: string): Class;
    static createFrom<T extends Resource.Class>(object: T, uri: string): Class & T;
}
export default Class;
