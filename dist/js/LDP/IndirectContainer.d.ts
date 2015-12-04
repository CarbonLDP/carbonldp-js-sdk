/// <reference path="../../typings/es6/es6.d.ts" />
import * as RDF from "./../RDF";
import * as AccessPoint from "./AccessPoint";
export declare const RDF_CLASS: string;
export interface Class extends AccessPoint.Class {
    insertedContentRelation: string;
}
export declare const DEFINITION: Map<string, RDF.PropertyDescription>;
export declare class Injector extends RDF.AbstractInjector<Class> {
    constructor();
    hasClassProperties(resource: RDF.Node.Class): boolean;
    is(object: Object): boolean;
    protected injectBehaviour<T extends AccessPoint.Class>(resource: T): (T & Class);
}
export declare let injector: Injector;
export default Class;
