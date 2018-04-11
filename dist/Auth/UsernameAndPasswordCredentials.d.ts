import { VolatileResource } from "../LDP";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies/CS";
export interface UsernameAndPasswordCredentialsBase {
    username: string;
    password: string;
}
export interface UsernameAndPasswordCredentials extends VolatileResource {
    username?: string;
    password?: string;
}
export interface UsernameAndPasswordCredentialsFactory {
    TYPE: CS["UsernameAndPasswordCredentials"];
    SCHEMA: ObjectSchema;
    create(data: UsernameAndPasswordCredentialsBase): UsernameAndPasswordCredentials;
    createFrom<T extends UsernameAndPasswordCredentialsBase>(object: T): T & UsernameAndPasswordCredentials;
}
export declare const UsernameAndPasswordCredentials: UsernameAndPasswordCredentialsFactory;
