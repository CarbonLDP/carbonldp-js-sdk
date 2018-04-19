import { Documents } from "../Documents";
import { ProtectedDocument } from "../ProtectedDocument";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
export interface PersistedUser extends ProtectedDocument {
    name?: string;
    credentials?: UsernameAndPasswordCredentials;
}
export interface PersistedUserFactory {
    is(value: any): value is PersistedUser;
    decorate<T extends object>(object: T, documents: Documents): PersistedUser & T;
}
export declare const PersistedUser: PersistedUserFactory;
