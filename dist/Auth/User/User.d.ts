import { ObjectSchema } from "../../ObjectSchema";
import { ProtectedDocument } from "../../ProtectedDocument";
import { CS } from "../../Vocabularies";
import { UsernameAndPasswordCredentials } from "../UsernameAndPasswordCredentials";
import { TransientUserFactory } from "./TransientUser";
export interface User extends ProtectedDocument {
    name?: string;
    credentials?: UsernameAndPasswordCredentials;
    updateCredentials(username?: string, password?: string): UsernameAndPasswordCredentials;
}
export interface UserFactory extends TransientUserFactory {
    TYPE: CS["User"];
    SCHEMA: ObjectSchema;
    is(value: any): value is User;
    isDecorated(object: object): object is User;
    decorate<T extends object>(object: T): User & T;
}
export declare const User: UserFactory;
