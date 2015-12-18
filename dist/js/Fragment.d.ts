import * as Document from "./Document";
import * as Resource from "./Resource";
export interface Class extends Resource.Class {
    document: Document.Class;
}
export declare class Factory {
    hasClassProperties(resource: Object): boolean;
    create(id: string, document: Document.Class): Class;
    create(document: Document.Class): Class;
    createFrom<T extends Object>(object: T, id: string, document: Document.Class): T & Class;
    createFrom<T extends Object>(object: T, document: Document.Class): T & Class;
}
export declare var factory: Factory;
export declare class Util {
    static generateID(): string;
}
export default Class;
