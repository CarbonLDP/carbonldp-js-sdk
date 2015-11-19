import * as RDF from "./../RDF";
export declare const RDF_CLASS: string;
export interface Class extends RDF.Resource.Class {
}
export declare class Factory extends RDF.Resource.Factory {
    static hasClassProperties(resource: RDF.Node.Class): boolean;
    is(object: Object): boolean;
    from(resource: RDF.Node.Class): Class;
    from(resources: RDF.Node.Class[]): Class[];
    protected hasRDFClass(resource: RDF.Resource.Class): boolean;
    protected injectBehaviour(resource: RDF.Resource.Class): Class;
}
export declare let factory: Factory;
export default Class;
