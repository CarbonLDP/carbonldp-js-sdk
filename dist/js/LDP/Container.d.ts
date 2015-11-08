/// <reference path="../../typings/es6/es6.d.ts" />
import * as RDF from './../RDF';
import * as RDFSource from './RDFSource';
interface Container extends RDFSource.Class {
    memberOfRelation: string;
    hasMemberRelation: string;
}
declare class Factory extends RDFSource.Factory {
    is(object: Object): boolean;
    from(resource: RDF.Node.Class): Container;
    from(resources: RDF.Node.Class[]): Container[];
    protected hasRDFClass(resource: RDF.Resource.Class): boolean;
    protected hasClassProperties(resource: RDF.Node.Class): boolean;
    protected injectBehaviour(resource: RDF.Resource.Class): Container;
}
declare var factory: Factory;
export { Container as Class, Factory, factory };
