import * as ObjectSchema from "./../ObjectSchema";
import * as Resource from "./../Resource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Resource.Class {
    username: string;
    password: string;
}
export declare class Factory {
    static create(username: string, password: string): Class;
    static createFrom<T extends object>(object: T, username: string, password: string): T & Class;
}
export default Class;
