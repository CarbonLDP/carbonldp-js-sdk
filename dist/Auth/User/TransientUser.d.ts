import { TransientDocument } from "../../Document";
import { CS } from "../../Vocabularies";
import { UsernameAndPasswordCredentials } from "../UsernameAndPasswordCredentials";
import { BaseUser } from "./BaseUser";
export interface TransientUser extends TransientDocument {
    name?: string;
    credentials?: UsernameAndPasswordCredentials;
    updateCredentials(username?: string, password?: string): UsernameAndPasswordCredentials;
}
export interface TransientUserFactory {
    TYPE: CS["User"];
    isDecorated(object: object): object is TransientUser;
    is(value: any): value is TransientUser;
    decorate<T extends object>(object: T): T & TransientUser;
    create<T extends object>(data: T & BaseUser): T & TransientUser;
    createFrom<T extends object>(object: T & BaseUser): T & TransientUser;
}
export declare const TransientUser: TransientUserFactory;
