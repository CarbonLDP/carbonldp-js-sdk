import { Documents } from "../Documents";
import { RequestOptions } from "../HTTP/Request";
import { ProtectedDocument } from "../ProtectedDocument";
import { Pointer } from "../Pointer";
import { QueryDocumentsBuilder } from "../SPARQL/QueryDocument";
import { User } from "./User";
import { RoleBase } from "./Role";
export interface Class extends ProtectedDocument {
    name?: string;
    description?: string;
    parent?: Pointer;
    children?: Pointer[];
    users?: Pointer[];
    createChild<T extends object>(role: T & RoleBase, slug?: string, requestOptions?: RequestOptions): Promise<T & Class>;
    createChild<T extends object>(role: T & RoleBase, requestOptions?: RequestOptions): Promise<T & Class>;
    getUsers<T>(requestOptions?: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & User)[]>;
    getUsers<T>(queryBuilderFn?: (queryBuilder: QueryDocumentsBuilder) => QueryDocumentsBuilder): Promise<(T & User)[]>;
    addUser(user: Pointer | string, requestOptions?: RequestOptions): Promise<void>;
    addUsers(users: (Pointer | string)[], requestOptions?: RequestOptions): Promise<void>;
    removeUser(user: Pointer | string, requestOptions?: RequestOptions): Promise<void>;
    removeUsers(users: (Pointer | string)[], requestOptions?: RequestOptions): Promise<void>;
}
export declare class Factory {
    static hasClassProperties(object: object): object is Class;
    static is(object: object): object is Class;
    static decorate<T extends object>(object: T, documents: Documents): T & Class;
}
export default Class;
