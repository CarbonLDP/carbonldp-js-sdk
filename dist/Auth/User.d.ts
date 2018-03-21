import { Document } from "../Document";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies/CS";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
export interface User extends Document {
    name?: string;
    enabled?: boolean;
    disabled?: boolean;
    credentials?: UsernameAndPasswordCredentials;
    setCredentials(email?: string, password?: string): UsernameAndPasswordCredentials;
}
export interface UserFactory {
    TYPE: CS["User"];
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is User;
    is(value: any): value is User;
    decorate<T extends object>(object: T): T & User;
    create(disabled?: boolean): User;
    createFrom<T extends object>(object: T, disabled?: boolean): T & User;
}
export declare const User: UserFactory;
