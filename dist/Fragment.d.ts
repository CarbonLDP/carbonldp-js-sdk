import { Document } from "./Document";
import { Resource } from "./Resource";
export interface Class extends Resource {
    document: Document;
}
export declare class Factory {
    static hasClassProperties(resource: Object): boolean;
    static create(id: string, document: Document): Class;
    static create(document: Document): Class;
    static createFrom<T extends Object>(object: T, id: string, document: Document): T & Class;
    static createFrom<T extends Object>(object: T, document: Document): T & Class;
}
export default Class;
