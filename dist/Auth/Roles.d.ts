import { Context } from "../Context";
import { RequestOptions } from "../HTTP/Request";
import { Pointer } from "../Pointer";
import * as PersistedRole from "./PersistedRole";
import { User } from "./User";
import * as Role from "./Role";
export declare class Class {
    private context;
    constructor(context: Context);
    createChild<T extends object>(parentRole: string | Pointer, role: T & Role.Class, requestOptions?: RequestOptions): Promise<T & PersistedRole.Class>;
    createChild<T extends object>(parentRole: string | Pointer, role: T & Role.Class, slug?: string, requestOptions?: RequestOptions): Promise<T & PersistedRole.Class>;
    get<T>(roleURI: string, requestOptions?: RequestOptions): Promise<T & PersistedRole.Class>;
    getUsers<T>(roleURI: string, requestOptions?: RequestOptions): Promise<(T & User)[]>;
    addUser(roleURI: string, user: Pointer | string, requestOptions?: RequestOptions): Promise<void>;
    addUsers(roleURI: string, users: (Pointer | string)[], requestOptions?: RequestOptions): Promise<void>;
    removeUser(roleURI: string, user: Pointer | string, requestOptions?: RequestOptions): Promise<void>;
    removeUsers(roleURI: string, users: (Pointer | string)[], requestOptions?: RequestOptions): Promise<void>;
    private resolveURI(relativeURI);
    private getUsersAccessPoint(roleURI);
    private getContainerURI();
}
export default Class;
