import * as Pointer from "./../Pointer";
import * as PersistedRole from "./../Auth/PersistedRole";
export interface Class extends PersistedRole.Class {
    parentRole?: Pointer.Class;
    childRoles?: Pointer.Class[];
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends Object>(object: T): T & Class;
}
export default Class;
