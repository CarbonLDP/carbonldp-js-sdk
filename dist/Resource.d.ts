import * as Pointer from "./Pointer";
export interface Class extends Pointer.Class {
    types: string[];
}
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
    static is(object: Object): boolean;
    static create(id?: string, types?: string[]): Class;
    static createFrom<T extends Object>(object: T, id?: string, types?: string[]): T & Class;
    static decorate<T extends Object>(object: T): T & Class;
}
export default Class;
