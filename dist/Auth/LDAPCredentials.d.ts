import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { Resource } from "../Resource";
import { CS } from "../Vocabularies";
export interface LDAPCredentials extends Resource {
    ldapServer: Pointer;
    ldapUserDN: string;
}
export interface LDAPCredentialsFactory {
    TYPE: CS["LDAPCredentials"];
    SCHEMA: ObjectSchema;
}
export declare const LDAPCredentials: LDAPCredentialsFactory;
