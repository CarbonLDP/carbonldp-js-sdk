import * as Document from "./Document";
import * as Fragment from "./Fragment";
export interface Class extends Fragment.Class {
    slug: string;
}
export declare class Factory {
    static hasClassProperties(resource: Fragment.Class): boolean;
    static create(slug: string, document: Document.Class): Class;
    static createFrom<T extends Object>(object: T, slug: string, document: Document.Class): T & Class;
}
export default Class;
