import { Documents } from "../Documents";
import { ProtectedDocument } from "../ProtectedDocument";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
export interface User extends ProtectedDocument {
    name?: string;
    credentials?: UsernameAndPasswordCredentials;
}
export interface UserFactory {
    is(value: any): value is User;
    decorate<T extends object>(object: T, documents: Documents): User & T;
}
export declare const User: UserFactory;
