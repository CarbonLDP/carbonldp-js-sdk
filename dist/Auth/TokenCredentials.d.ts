import * as ObjectSchema from "./../ObjectSchema";
import { Resource } from "../Resource";
import { PersistedUser } from "./PersistedUser";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.ObjectSchema;
export interface Class extends Resource {
    key: string;
    expirationTime: Date;
    user?: PersistedUser;
}
export declare class Factory {
    static is(object: object): object is Class;
    static hasClassProperties(object: object): object is Class;
}
export default Class;
