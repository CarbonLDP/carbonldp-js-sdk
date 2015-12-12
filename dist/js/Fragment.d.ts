import * as Document from "./Document";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
export interface Class extends Pointer.Class {
    document: Document.Class;
}
export declare class Factory {
    hasClassProperties(resource: Object): boolean;
    create(id: string, document: Document.Class): Class;
    create(document: Document.Class): Class;
    createFrom<T extends Object>(object: T, id: string, document: Document.Class): T & Class;
    createFrom<T extends Object>(object: T, document: Document.Class): T & Class;
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
