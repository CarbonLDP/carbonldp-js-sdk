import { Document } from "./../Document";
import * as ObjectSchema from "./../ObjectSchema";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.ObjectSchema;
export interface Class extends Document {
    name?: string;
    enabled?: boolean;
    disabled?: boolean;
    credentials?: UsernameAndPasswordCredentials.Class;
    setCredentials(email?: string, password?: string): UsernameAndPasswordCredentials.Class;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static create(disabled?: boolean): Class;
    static createFrom<T extends object>(object: T, disabled?: boolean): T & Class;
    static decorate<T extends object>(object: T): T & Class;
}
export default Class;
