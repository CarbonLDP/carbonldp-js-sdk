import * as PersistedACE from "./PersistedACE";
import * as PersistedDocument from "./../PersistedDocument";
import * as Pointer from "./../Pointer";
export interface Class extends PersistedDocument.Class {
    accessTo: Pointer.Class;
    entries?: PersistedACE.Class[];
    inheritableEntries?: PersistedACE.Class[];
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static decorate<T extends PersistedDocument.Class>(document: T): T & Class;
}
export default Class;
