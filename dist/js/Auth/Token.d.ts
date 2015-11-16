import * as RDF from "./../RDF";
export declare const RDF_CLASS: string;
export declare const DEFINITION: Map<string, RDF.PropertyDescription>;
export interface Class extends RDF.Resource.Class {
    key: string;
    expirationTime: Date;
}
export declare class Factory extends RDF.Resource.Factory {
    static hasClassProperties(resource: RDF.Node.Class): boolean;
    from(object: Array<Object>): Class[];
    from(object: Object): Class;
    hasRDFClass(resource: RDF.Resource.Class): boolean;
    protected injectBehavior(node: Object): Class;
}
export declare let factory: Factory;
export default Class;
