import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
export interface Class extends PersistedDocument.Class {
    name: string;
    agents?: Pointer.Class;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: Object): boolean;
    static decorate<T extends Object>(object: T): T & Class;
}
export default Class;
