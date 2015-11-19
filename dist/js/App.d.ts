/// <reference path="../typings/es6/es6.d.ts" />
import Context from "./Context";
import * as RDF from "./RDF";
import * as LDP from "./LDP";
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
export declare class Factory extends LDP.RDFSource.Factory {
    static hasClassProperties(resource: RDF.Node.Class): boolean;
    is(object: Object): boolean;
    from(resource: RDF.Node.Class): Resource;
    from(resources: RDF.Node.Class[]): Resource[];
    protected hasRDFClass(resource: RDF.Resource.Class): boolean;
    protected injectBehaviour(resource: RDF.Resource.Class): Resource;
}
export declare let factory: Factory;
export default Class;
