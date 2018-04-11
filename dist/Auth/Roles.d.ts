import { Context } from "../Context";
import { RequestOptions } from "../HTTP/Request";
import { Pointer } from "../Pointer";
import { QueryDocumentBuilder, QueryDocumentsBuilder } from "../SPARQL/QueryDocument";
import * as PersistedRole from "./PersistedRole";
import { PersistedUser } from "./PersistedUser";
export declare type NewRole = {
    name: string;
    description?: string;
};
export declare class Class {
    private context;
    constructor(context: Context);
    createChild<T extends object>(parentRole: string | Pointer, role: T & NewRole, requestOptions?: RequestOptions): Promise<T & PersistedRole.Class>;
    createChild<T extends object>(parentRole: string | Pointer, role: T & NewRole, slug?: string, requestOptions?: RequestOptions): Promise<T & PersistedRole.Class>;
    get<T extends object>(roleURI: string, requestOptions?: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & PersistedRole.Class>;
    get<T extends object>(roleURI: string, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & PersistedRole.Class>;
    getUsers<T extends object>(roleURI: string, requestOptions?: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & PersistedUser)[]>;
    getUsers<T extends object>(roleURI: string, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & PersistedUser)[]>;
    addUser(roleURI: string, user: Pointer | string, requestOptions?: RequestOptions): Promise<void>;
    addUsers(roleURI: string, users: (Pointer | string)[], requestOptions?: RequestOptions): Promise<void>;
    removeUser(roleURI: string, user: Pointer | string, requestOptions?: RequestOptions): Promise<void>;
    removeUsers(roleURI: string, users: (Pointer | string)[], requestOptions?: RequestOptions): Promise<void>;
    private getUsersAccessPoint(roleURI);
    private resolveURI(relativeURI?);
}
export default Class;
