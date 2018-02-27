import * as HTTP from "../HTTP";
import { Response } from "../HTTP/Response";
import Context from "./../Context";
import { Pointer } from "./../Pointer";
import * as PersistedRole from "./PersistedRole";
import * as PersistedUser from "./PersistedUser";
import * as Role from "./Role";
export declare class Class {
    private context;
    constructor(context: Context);
    createChild<T extends object>(parentRole: string | Pointer, role: T & Role.Class, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedRole.Class, Response]>;
    createChild<T extends object>(parentRole: string | Pointer, role: T & Role.Class, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedRole.Class, Response]>;
    get<T>(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[T & PersistedRole.Class, Response]>;
    getUsers<T>(roleURI: string, requestOptions?: HTTP.Request.Options): Promise<[(T & PersistedUser.Class)[], Response]>;
    addUser(roleURI: string, user: Pointer | string, requestOptions?: HTTP.Request.Options): Promise<Response>;
    addUsers(roleURI: string, users: (Pointer | string)[], requestOptions?: HTTP.Request.Options): Promise<Response>;
    removeUser(roleURI: string, user: Pointer | string, requestOptions?: HTTP.Request.Options): Promise<Response>;
    removeUsers(roleURI: string, users: (Pointer | string)[], requestOptions?: HTTP.Request.Options): Promise<Response>;
    private resolveURI(relativeURI);
    private getUsersAccessPoint(roleURI);
    private getContainerURI();
}
export default Class;
