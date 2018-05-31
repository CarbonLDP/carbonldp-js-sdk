import { TransientDocument } from "../../Document";
import { Documents } from "../../Documents";
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
    decorate<T extends object>(object: T, documents?: Documents): T & TransientUser;
    create(data: BaseUser): TransientUser;
    createFrom<T extends BaseUser>(object: T): T & TransientUser;
}
export declare const TransientUser: TransientUserFactory;
