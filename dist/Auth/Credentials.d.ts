import { Document } from "./../Document";
import * as ObjectSchema from "./../ObjectSchema";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class extends Document {
    email: string;
    password: string;
    enabled?: boolean;
}
export declare class Factory {
    static create(email: string, password: string): Class;
    static createFrom<T extends Object>(object: T, email: string, password: string): T & Class;
}
export default Class;
