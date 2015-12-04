import * as Document from "./Document";
import * as Fragment from "./Fragment";
export interface Class extends Fragment.Class {
    slug: string;
}
export declare class Factory extends Fragment.Factory {
    hasClassProperties(resource: Fragment.Class): boolean;
    from<T extends Object>(nodes: T[], document: Document.Class): (T & Class)[];
    from<T extends Object>(node: T, document: Document.Class): (T & Class);
    protected singleFrom<T extends Object>(node: T, document: Document.Class): (T & Class);
    protected injectBehavior<T extends Fragment.Class>(fragment: T, document: Document.Class): (T & Class);
}
export declare var factory: Factory;
export default Class;
