import { Context } from "../Context";
import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { Pointer } from "../Pointer";
import * as PersistedRole from "./PersistedRole";
import * as PersistedUser from "./PersistedUser";
import * as Role from "./Role";
export declare class Class {
    private context;
    constructor(context: Context);
    createChild<T extends object>(parentRole: string | Pointer, role: T & Role.Class, requestOptions?: RequestOptions): Promise<[T & PersistedRole.Class, Response]>;
    createChild<T extends object>(parentRole: string | Pointer, role: T & Role.Class, slug?: string, requestOptions?: RequestOptions): Promise<[T & PersistedRole.Class, Response]>;
    get<T>(roleURI: string, requestOptions?: RequestOptions): Promise<[T & PersistedRole.Class, Response]>;
    getUsers<T>(roleURI: string, requestOptions?: RequestOptions): Promise<[(T & PersistedUser.Class)[], Response]>;
    addUser(roleURI: string, user: Pointer | string, requestOptions?: RequestOptions): Promise<Response>;
    addUsers(roleURI: string, users: (Pointer | string)[], requestOptions?: RequestOptions): Promise<Response>;
    removeUser(roleURI: string, user: Pointer | string, requestOptions?: RequestOptions): Promise<Response>;
    removeUsers(roleURI: string, users: (Pointer | string)[], requestOptions?: RequestOptions): Promise<Response>;
    private resolveURI(relativeURI);
    private getUsersAccessPoint(roleURI);
    private getContainerURI();
}
export default Class;
