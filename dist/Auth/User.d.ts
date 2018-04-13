import { Document } from "../Document";
import { Fragment } from "../Fragment";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies/CS";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
export interface UserBase {
    name?: string;
    credentials: UsernameAndPasswordCredentials;
}
export interface User extends Document {
    name?: string;
    credentials?: Fragment & UsernameAndPasswordCredentials;
    updateCredentials(username?: string, password?: string): Fragment & UsernameAndPasswordCredentials;
}
export interface UserFactory {
    TYPE: CS["User"];
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is User;
    is(value: any): value is User;
    decorate<T extends object>(object: T): T & User;
    create(data: UserBase): User;
    createFrom<T extends UserBase>(object: T): T & User;
}
export declare const User: UserFactory;
