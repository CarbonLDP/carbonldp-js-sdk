import Documents from "./Documents";
import { PointerLibrary, PointerValidator } from "./Pointer";
import { Resource } from "./Resource";
export interface Class extends PointerLibrary, PointerValidator {
    _documents: Documents;
    _resourcesIndex: Map<string, Resource>;
    hasResource(id: string): boolean;
    getResource(id: string): Resource;
    getResources(): Resource[];
    getPointer(id: string): Resource;
    createResource(id?: string): Resource;
    createResourceFrom<T>(object: T, id?: string): Resource & T;
    toJSON(): string;
}
export declare class Factory {
    static hasClassProperties(object: Object): boolean;
    static create(documents: Documents): Class;
    static createFrom<T extends Object>(object: T, documents: Documents): T & Class;
    static decorate<T extends Object>(object: T): T & Class;
}
export default Class;
