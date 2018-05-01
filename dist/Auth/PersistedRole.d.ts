import { Documents } from "../Documents";
import { RequestOptions } from "../HTTP/Request";
import { ProtectedDocument } from "../ProtectedDocument";
import { Pointer } from "../Pointer";
import * as Role from "./Role";
import * as Roles from "./Roles";
export interface Class extends ProtectedDocument {
    _roles: Roles.Class;
    name?: string;
    description?: string;
    parentRole?: Pointer;
    childRoles?: Pointer[];
    users?: Pointer[];
    createChild<T extends object>(role: T & Role.Class, requestOptions?: RequestOptions): Promise<T & Class>;
    createChild<T extends object>(role: T & Role.Class, slug?: string, requestOptions?: RequestOptions): Promise<T & Class>;
    getUsers<T>(requestOptions?: RequestOptions): Promise<(T & ProtectedDocument)[]>;
    addUser(user: Pointer | string, requestOptions?: RequestOptions): Promise<void>;
    addUsers(users: (Pointer | string)[], requestOptions?: RequestOptions): Promise<void>;
    removeUser(user: Pointer | string, requestOptions?: RequestOptions): Promise<void>;
    removeUsers(users: (Pointer | string)[], requestOptions?: RequestOptions): Promise<void>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): object is Class;
    static decorate<T extends object>(object: T, documents: Documents): T & Class;
}
export default Class;
