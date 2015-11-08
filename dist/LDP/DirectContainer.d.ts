/// <reference path="../../typings/es6/es6.d.ts" />
import * as RDF from './../RDF';
import * as AccessPoint from './AccessPoint';
interface DirectContainer extends AccessPoint.Class {
}
declare class Factory extends AccessPoint.Factory {
    is(object: Object): boolean;
    from(resource: RDF.Node.Class): DirectContainer;
    from(resources: RDF.Node.Class[]): DirectContainer[];
    protected hasRDFClass(resource: RDF.Resource.Class): boolean;
    protected hasClassProperties(resource: RDF.Node.Class): boolean;
    protected injectBehaviour(resource: AccessPoint.Class): DirectContainer;
}
declare var factory: Factory;
export { DirectContainer as Class, Factory, factory };
