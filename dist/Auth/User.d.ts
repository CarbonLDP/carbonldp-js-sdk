import { TransientDocument } from "../TransientDocument";
import { TransientFragment } from "../TransientFragment";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies/CS";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
export interface UserBase {
    name?: string;
    credentials: UsernameAndPasswordCredentials;
}
export interface User extends TransientDocument {
    name?: string;
    credentials?: TransientFragment & UsernameAndPasswordCredentials;
    updateCredentials(username?: string, password?: string): TransientFragment & UsernameAndPasswordCredentials;
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
