import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { CS } from "../Vocabularies";
import { LDAPCredentials } from "./LDAPCredentials";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
export interface CredentialSet {
    user: Pointer;
    credentials: (UsernameAndPasswordCredentials | LDAPCredentials)[];
}
export interface CredentialSetFactory {
    TYPE: CS["CredentialSet"];
    SCHEMA: ObjectSchema;
}
export declare const CredentialSet: CredentialSetFactory;
