/// <reference path="../../typings/es6/es6.d.ts" />
import * as RDF from './../RDF';
import * as AccessPoint from './AccessPoint';
interface IndirectContainer extends AccessPoint.Class {
    insertedContentRelation: string;
}
declare class Factory extends AccessPoint.Factory {
    is(object: Object): boolean;
    from(resource: RDF.Node.Class): IndirectContainer;
    from(resources: RDF.Node.Class[]): IndirectContainer[];
    protected hasRDFClass(resource: RDF.Resource.Class): boolean;
    protected hasClassProperties(resource: RDF.Node.Class): boolean;
    protected injectBehaviour(resource: AccessPoint.Class): IndirectContainer;
}
declare var factory: Factory;
export { IndirectContainer as Class, Factory, factory };
