/// <reference path="../typings/es6/es6.d.ts" />
import Parent from "./Parent";
import * as RDF from "./RDF";
import * as LDP from "./LDP";
export interface Resource extends RDF.Resource.Class {
    rootContainer: string;
}
export declare const RDF_CLASS: string;
export declare const DEFINITION: Map<string, RDF.PropertyDescription>;
export declare class Class extends Parent {
    private resource;
    private base;
    constructor(parent: Parent, resource: Resource);
    resolve(uri: string): string;
    private getBase(resource);
}
export declare class Factory extends LDP.RDFSource.Factory {
    is(object: Object): boolean;
    from(resource: RDF.Node.Class): Resource;
    from(resources: RDF.Node.Class[]): Resource[];
    protected hasRDFClass(resource: RDF.Resource.Class): boolean;
    protected hasClassProperties(resource: RDF.Node.Class): boolean;
    protected injectBehaviour(resource: RDF.Resource.Class): Resource;
}
export declare let factory: Factory;
export default Class;
