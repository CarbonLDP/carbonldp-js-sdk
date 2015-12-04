/// <reference path="../../typings/es6/es6.d.ts" />
import * as RDF from "./../RDF";
import * as RDFSource from "./RDFSource";
export declare const RDF_CLASS: string;
export interface Class extends RDFSource.Class {
    memberOfRelation: string;
    hasMemberRelation: string;
}
export declare const DEFINITION: Map<string, RDF.PropertyDescription>;
export declare class Injector extends RDF.AbstractInjector<Class> {
    constructor();
    is(object: Object): boolean;
    hasRDFClass(resource: RDF.Resource.Class): boolean;
    hasClassProperties(resource: RDF.Node.Class): boolean;
    protected injectBehaviour(resource: RDF.Resource.Class): Class;
}
export declare let injector: Injector;
export default Class;
