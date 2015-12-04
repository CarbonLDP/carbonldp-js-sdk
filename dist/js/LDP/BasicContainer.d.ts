/// <reference path="../../typings/es6/es6.d.ts" />
import * as RDF from "./../RDF";
import * as Container from "./Container";
export interface Class extends Container.Class {
}
export declare class Injector extends RDF.AbstractInjector<Class> {
    constructor();
    is(object: Object): boolean;
    hasRDFClass(resource: RDF.Resource.Class): boolean;
    hasClassProperties(resource: RDF.Node.Class): boolean;
    protected injectBehaviour<T>(resource: T): (T & Class);
}
export declare let injector: Injector;
export default Class;
