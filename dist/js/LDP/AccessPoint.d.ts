import * as RDF from "./../RDF";
import * as Container from "./Container";
export declare const RDF_CLASS: string;
export interface Class extends Container.Class {
    membershipResource: string;
}
export declare const DEFINITION: Map<string, RDF.PropertyDescription>;
export declare class Injector extends RDF.AbstractInjector<Class> {
    constructor();
    hasClassProperties(resource: Object): boolean;
    is(object: Object): boolean;
    protected injectBehavior<T extends Container.Class>(resource: T): (T & Class);
}
export declare let injector: Injector;
export default Class;
