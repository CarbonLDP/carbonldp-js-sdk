import * as AccessPoint from "./AccessPoint";
import * as ACL from "./Auth/ACL";
import * as HTTP from "./HTTP";
import * as PersistedDocument from "./PersistedDocument";
import * as Pointer from "./Pointer";
export interface Class extends PersistedDocument.Class {
    defaultInteractionModel: Pointer.Class;
    accessPoints: Pointer.Class[];
    accessControlList: Pointer.Class;
    createAccessPoint(accessPoint: AccessPoint.Class, slug?: string, requestOptions?: HTTP.Request.Options): Promise<[Pointer.Class, HTTP.Response.Class]>;
    getACL(requestOptions?: HTTP.Request.Options): Promise<[ACL.Class, HTTP.Response.Class]>;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static decorate<T extends Object>(document: T): T & Class;
}
