import { CS } from "../Vocabularies";
import { ObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { LDAPCredentials } from "./LDAPCredentials";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
export interface CredentialsSet {
    user: Pointer;
    credentials: (UsernameAndPasswordCredentials | LDAPCredentials)[];
}
export interface CredentialsSetFactory {
    TYPE: CS["CredentialsSet"];
    SCHEMA: ObjectSchema;
}
export declare const CredentialsSet: CredentialsSetFactory;
