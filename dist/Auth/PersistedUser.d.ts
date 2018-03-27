import { Documents } from "../Documents";
import { RequestOptions } from "../HTTP";
import { PersistedProtectedDocument } from "../PersistedProtectedDocument";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
export interface PersistedUser extends PersistedProtectedDocument {
    name?: string;
    enabled?: boolean;
    disabled?: boolean;
    credentials?: UsernameAndPasswordCredentials;
    enable(requestOptions?: RequestOptions): Promise<PersistedUser>;
    disable(requestOptions?: RequestOptions): Promise<PersistedUser>;
}
export interface PersistedUserFactory {
    isDecorated(value: any): value is PersistedUser;
    is(value: any): value is PersistedUser;
    decorate<T extends object>(object: T, documents: Documents): PersistedUser & T;
}
export declare const PersistedUser: PersistedUserFactory;
export declare function enable(this: PersistedUser, requestOptions?: RequestOptions): Promise<PersistedUser>;
export declare function disable(this: PersistedUser, requestOptions?: RequestOptions): Promise<PersistedUser>;
