import { ObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
import { CS } from "../Vocabularies/CS";
export interface UsernameAndPasswordCredentials extends Resource {
    username?: string;
    password?: string;
}
export interface UsernameAndPasswordCredentialsFactory {
    TYPE: CS["UsernameAndPasswordCredentials"];
    SCHEMA: ObjectSchema;
    create(username?: string, password?: string): UsernameAndPasswordCredentials;
    createFrom<T extends object>(object: T, username?: string, password?: string): T & UsernameAndPasswordCredentials;
}
export declare const UsernameAndPasswordCredentials: UsernameAndPasswordCredentialsFactory;
