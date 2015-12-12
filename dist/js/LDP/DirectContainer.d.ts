import * as RDF from "./../RDF";
import * as AccessPoint from "./AccessPoint";
export declare const RDF_CLASS: string;
export interface Class extends AccessPoint.Class {
}
export declare class Injector extends RDF.AbstractInjector<Class> {
    constructor();
    hasClassProperties(resource: Object): boolean;
    is(object: Object): boolean;
}
export declare let injector: Injector;
export default Class;
