import * as Document from "./Document";
import * as Fragment from "./Fragment";
export interface Class extends Fragment.Class {
    slug: string;
}
export declare class Factory {
    hasClassProperties(resource: Fragment.Class): boolean;
    create(slug: string, document: Document.Class): Class;
    createFrom<T extends Object>(object: T, slug: string, document: Document.Class): T & Class;
}
export declare var factory: Factory;
export default Class;
