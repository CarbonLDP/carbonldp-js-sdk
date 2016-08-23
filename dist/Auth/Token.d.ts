import Credentials from "./Credentials";
import * as ObjectSchema from "./../ObjectSchema";
import * as PersistedAgent from "./PersistedAgent";
import * as Resource from "./../Resource";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Resource.Class, Credentials {
    key: string;
    expirationTime: Date;
    agent: PersistedAgent.Class;
}
export declare class Factory {
    static is(value: any): boolean;
    static hasClassProperties(object: Object): boolean;
    static hasRequiredValues(object: Object): boolean;
    static decorate<T extends Object>(object: T): T & Class;
}
export default Class;
