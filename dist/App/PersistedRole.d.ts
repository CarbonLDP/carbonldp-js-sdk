import * as PersistedRole from "./../Auth/PersistedRole";
import * as Pointer from "./../Pointer";
import * as Roles from "./Roles";
export interface Class extends PersistedRole.Class {
    _roles: Roles.Class;
    parentRole?: Pointer.Class;
    childRoles?: Pointer.Class[];
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends Object>(object: T, roles: Roles.Class): T & Class;
}
export default Class;
