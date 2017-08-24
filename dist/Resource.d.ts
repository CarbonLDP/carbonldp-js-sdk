import * as Pointer from "./Pointer";
export interface Class extends Pointer.Class {
    types: string[];
    addType(type: string): void;
    hasType(type: string): boolean;
    removeType(type: string): void;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static is(object: object): object is Class;
    static create(id?: string, types?: string[]): Class;
    static createFrom<T extends Object>(object: T, id?: string, types?: string[]): T & Class;
    static decorate<T extends Object>(object: T): T & Class;
}
export declare class Util {
    static hasType(resource: Object, type: string): boolean;
    static getTypes(resource: Object): string[];
}
export default Class;
