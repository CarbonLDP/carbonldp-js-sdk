/// <reference path="../../typings/es6/es6.d.ts" />
import * as RDF from "./../RDF";
import * as RDFSource from "./RDFSource";
export declare const RDF_CLASS: string;
export interface Class extends RDFSource.Class {
    memberOfRelation: string;
    hasMemberRelation: string;
}
export declare const DEFINITION: Map<string, RDF.PropertyDescription>;
export declare class Factory extends RDFSource.Factory {
    is(object: Object): boolean;
    from(resource: RDF.Node.Class): Class;
    from(resources: RDF.Node.Class[]): Class[];
    protected hasRDFClass(resource: RDF.Resource.Class): boolean;
    protected hasClassProperties(resource: RDF.Node.Class): boolean;
    protected injectBehaviour(resource: RDF.Resource.Class): Class;
}
export declare let factory: Factory;
export default Class;
