import { TransientDocument } from "../Document";
import { TransientFragment } from "../Fragment";
import { ObjectSchema } from "../ObjectSchema";
import { CS } from "../Vocabularies/CS";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
export interface UserBase {
    name?: string;
    credentials: UsernameAndPasswordCredentials;
}
export interface TransientUser extends TransientDocument {
    name?: string;
    credentials?: TransientFragment & UsernameAndPasswordCredentials;
    updateCredentials(username?: string, password?: string): TransientFragment & UsernameAndPasswordCredentials;
}
export interface TransientUserFactory {
    TYPE: CS["User"];
    SCHEMA: ObjectSchema;
    isDecorated(object: object): object is TransientUser;
    is(value: any): value is TransientUser;
    decorate<T extends object>(object: T): T & TransientUser;
    create(data: UserBase): TransientUser;
    createFrom<T extends UserBase>(object: T): T & TransientUser;
}
export declare const TransientUser: TransientUserFactory;
