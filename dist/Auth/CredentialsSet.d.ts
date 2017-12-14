import * as ObjectSchema from "./../ObjectSchema";
import * as Pointer from "./../Pointer";
import * as LDAPCredentials from "./LDAPCredentials";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.Class;
export interface Class {
    user: Pointer.Class;
    credentials: (UsernameAndPasswordCredentials.Class | LDAPCredentials.Class)[];
}
export default Class;
