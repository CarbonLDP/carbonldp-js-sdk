import * as Pointer from "./Pointer";
export interface Class extends Pointer.Class {
    _id: string;
    types: string[];
}
export declare class Factory {
    hasClassProperties(resource: Object): boolean;
    create(id?: string, types?: string[]): Class;
    createFrom<T extends Object>(object: T, id?: string, types?: string[]): T & Class;
    decorate<T extends Object>(object: T): T & Class;
}
export declare let factory: Factory;
