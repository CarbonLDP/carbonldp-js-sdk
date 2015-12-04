import * as Resource from "./Resource";
export declare abstract class AbstractInjector<I> {
    protected _RDF_CLASS: string;
    protected parentInjectors: AbstractInjector<any>[];
    constructor(RDF_CLASS: string, parentInjectors?: AbstractInjector<any>[]);
    RDF_CLASS: string;
    abstract hasClassProperties(resource: Object): boolean;
    hasRDFClass(resource: Resource.Class): boolean;
    is(object: Object): boolean;
    from<T extends Object>(nodes: T[]): (T & I)[];
    from<T extends Object>(node: T): (T & I);
    protected singleFrom<T extends Object>(node: T): (T & I);
    protected injectBehavior<T extends Object>(node: T): (T & I);
}
export default AbstractInjector;
