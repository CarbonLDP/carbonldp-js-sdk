import { Document } from "./Document";
import * as Fragment from "./Fragment";
export interface Class extends Fragment.Class {
    slug: string;
}
export declare class Factory {
    static hasClassProperties(object: object): boolean;
    static create(slug: string, document: Document): Class;
    static createFrom<T extends Object>(object: T, slug: string, document: Document): T & Class;
}
export default Class;
