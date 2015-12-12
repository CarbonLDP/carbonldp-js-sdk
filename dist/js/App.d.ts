/// <reference path="../typings/tsd.d.ts" />
import Context from "./Context";
import * as RDF from "./RDF";
export interface Resource extends RDF.Resource.Class {
    rootContainer: string;
}
export declare const RDF_CLASS: string;
export declare const DEFINITION: Map<string, RDF.PropertyDescription>;
export declare class Class extends Context {
    private resource;
    private base;
    constructor(parentContext: Context, resource: Resource);
    resolve(uri: string): string;
    private getBase(resource);
}
export declare class Factory extends RDF.AbstractInjector<Resource> {
    constructor();
    hasClassProperties(resource: Object): boolean;
    is(object: Object): boolean;
    protected injectBehavior<T extends RDF.Resource.Class>(resource: T): (T & Resource);
}
export declare let factory: Factory;
export default Class;
