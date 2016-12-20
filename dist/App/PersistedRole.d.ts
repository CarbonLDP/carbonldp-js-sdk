import * as PersistedDocument from "./../PersistedDocument";
import * as PersistedRole from "./../Auth/PersistedRole";
import * as Pointer from "./../Pointer";
import * as Roles from "./Roles";
export interface Class extends PersistedRole.Class {
    _roles: Roles.Class;
    parentRole?: Pointer.Class;
    childrenRoles?: Pointer.Class[];
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends PersistedDocument.Class>(object: T, roles: Roles.Class): T & Class;
}
export default Class;
