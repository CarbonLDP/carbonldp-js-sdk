import * as Document from "./Document";
import * as Resource from "./Resource";
export interface Class extends Resource.Class {
    document: Document.Class;
}
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
    static create(id: string, document: Document.Class): Class;
    static create(document: Document.Class): Class;
    static createFrom<T extends Object>(object: T, id: string, document: Document.Class): T & Class;
    static createFrom<T extends Object>(object: T, document: Document.Class): T & Class;
}
export default Class;
