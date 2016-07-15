import * as HTTP from "./HTTP";
import * as PersistedDocument from "./PersistedDocument";
export interface Class {
    _id: string;
    _resolved: boolean;
    id: string;
    isResolved(): boolean;
    resolve<T extends PersistedDocument.Class>(): Promise<[T, HTTP.Response.Class]>;
}
export interface Library {
    hasPointer(id: string): boolean;
    getPointer(id: string): Class;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(value: any): boolean;
    static create(id?: string): Class;
    static decorate<T extends Object>(object: T): Class;
}
export declare class Util {
    static areEqual(pointer1: Class, pointer2: Class): boolean;
    static getIDs(pointers: Class[]): string[];
    static resolveAll(pointers: Class[]): Promise<[Class[], HTTP.Response.Class[]]>;
}
export interface Validator {
    inScope(id: string): boolean;
    inScope(pointer: Class): boolean;
}
export default Class;
