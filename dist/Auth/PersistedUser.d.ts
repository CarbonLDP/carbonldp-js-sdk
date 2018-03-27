import { Documents } from "../Documents";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
export interface PersistedUser extends PersistedProtectedDocument {
    name?: string;
    credentials?: UsernameAndPasswordCredentials;
}
export interface PersistedUserFactory {
    is(value: any): value is PersistedUser;
    decorate<T extends object>(object: T, documents: Documents): PersistedUser & T;
}
export declare const PersistedUser: PersistedUserFactory;
