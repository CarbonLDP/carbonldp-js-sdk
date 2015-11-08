/// <reference path="../../typings/es6/es6.d.ts" />
import * as RDF from './../RDF';
import * as Container from './Container';
export interface Class extends Container.Class {
}
export declare class Factory extends Container.Factory {
    is(object: Object): boolean;
    from(resource: RDF.Node.Class): Class;
    from(resources: RDF.Node.Class[]): Class[];
    protected hasRDFClass(resource: RDF.Resource.Class): boolean;
    protected hasClassProperties(resource: RDF.Node.Class): boolean;
    protected injectBehaviour(resource: Container.Class): Class;
}
export declare var factory: Factory;
