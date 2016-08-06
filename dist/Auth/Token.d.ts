import * as ObjectSchema from "./../ObjectSchema";
import * as Resource from "./../Resource";
import Credentials from "./Credentials";
import * as PersistedDocument from "./../PersistedDocument";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Resource.Class, Credentials {
    key: string;
    expirationTime: Date;
    agent: PersistedDocument.Class;
}
export declare class Factory {
    static is(value: any): boolean;
    static hasClassProperties(object: Object): boolean;
    static hasRequiredValues(object: Object): boolean;
    static decorate<T extends Object>(object: T): T & Class;
}
export default Class;
