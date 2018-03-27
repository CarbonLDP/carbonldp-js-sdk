import { Document } from "../Document";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies/CS";
import { UsernameAndPasswordCredentials, UsernameAndPasswordCredentialsBase } from "./UsernameAndPasswordCredentials";
export interface UserBase {
    name?: string;
    credentials: UsernameAndPasswordCredentialsBase;
}
export interface User extends Document {
    name?: string;
    credentials?: UsernameAndPasswordCredentials;
    setCredentials(email?: string, password?: string): UsernameAndPasswordCredentials;
}
export interface UserFactory {
    TYPE: CS["User"];
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is User;
    is(value: any): value is User;
    decorate<T extends object>(object: T): T & User;
    create(): User;
    createFrom<T extends object>(object: T): T & User;
}
export declare const User: UserFactory;
