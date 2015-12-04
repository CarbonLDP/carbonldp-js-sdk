import * as Document from "./Document";
import * as RDF from "./RDF";
export interface Class extends RDF.Resource.Class {
    document: Document.Class;
}
export declare class Factory {
    hasClassProperties(resource: RDF.Resource.Class): boolean;
    from<T extends Object>(nodes: T[], document: Document.Class): (T & Class)[];
    from<T extends Object>(node: T, document: Document.Class): (T & Class);
    protected singleFrom<T extends Object>(node: T, document: Document.Class): (T & Class);
    protected injectBehavior<T extends RDF.Resource.Class>(object: T, document: Document.Class): (T & Class);
}
export declare var factory: Factory;
export declare class Util {
    static generateID(): string;
}
export default Class;
