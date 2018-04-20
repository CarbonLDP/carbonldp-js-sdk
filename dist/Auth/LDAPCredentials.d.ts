import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { TransientResource } from "../TransientResource";
import { CS } from "../Vocabularies";
export interface LDAPCredentials extends TransientResource {
    ldapServer: Pointer;
    ldapUserDN: string;
}
export interface LDAPCredentialsFactory {
    TYPE: CS["LDAPCredentials"];
    SCHEMA: ObjectSchema;
}
export declare const LDAPCredentials: LDAPCredentialsFactory;
