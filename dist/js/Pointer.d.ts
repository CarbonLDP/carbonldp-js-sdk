import * as HTTP from "./HTTP";
export interface Class {
    _id: string;
    _resolved: boolean;
    id: string;
    isResolved(): boolean;
    resolve(): Promise<[Class, HTTP.Response.Class]>;
}
export interface Library {
    hasPointer(id: string): boolean;
    getPointer(id: string): Class;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(value: any): boolean;
    static create(id: string): Class;
    static decorate<T extends Object>(object: T): Class;
}
export declare class Util {
    static getIDs(pointers: Class[]): string[];
}
export interface Validator {
    inScope(id: string): boolean;
    inScope(pointer: Class): boolean;
}
export default Class;
