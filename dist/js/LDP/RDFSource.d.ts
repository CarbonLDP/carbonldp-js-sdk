import * as RDF from "./../RDF";
export declare const RDF_CLASS: string;
export interface Class extends RDF.Resource.Class {
}
export declare class Injector extends RDF.AbstractInjector<Class> {
    constructor();
    hasClassProperties(resource: RDF.Node.Class): boolean;
    is(object: Object): boolean;
}
export declare let injector: Injector;
export default Class;
