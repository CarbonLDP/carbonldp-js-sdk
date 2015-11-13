import * as RDF from "./../RDF";
export declare const RDF_CLASS: string;
export declare const DEFINITION: Map<string, RDF.PropertyDescription>;
export interface Class extends RDF.Resource.Class {
    key: string;
    expirationDate: Date;
}
export declare class Factory extends RDF.Resource.Factory {
    from(object: Array<Object>): Class[];
    from(object: Object): Class;
    hasRDFClass(resource: RDF.Resource.Class): boolean;
    protected hasClassProperties(resource: RDF.Node.Class): boolean;
    protected injectBehavior(node: Object): Class;
}
export declare let factory: Factory;
export default Class;
