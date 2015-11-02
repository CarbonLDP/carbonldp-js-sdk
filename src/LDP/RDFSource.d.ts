import * as RDF from './../RDF';
interface RDFSource extends RDF.Resource.Class {
}
declare class Factory extends RDF.Resource.Factory {
    is(object: Object): boolean;
    from(resource: RDF.Node.Class): RDFSource;
    from(resources: RDF.Node.Class[]): RDFSource[];
    protected hasRDFClass(resource: RDF.Resource.Class): boolean;
    protected hasClassProperties(resource: RDF.Node.Class): boolean;
    protected injectBehaviour(resource: RDF.Resource.Class): RDFSource;
}
declare var factory: Factory;
export { RDFSource as Class, Factory, factory };
