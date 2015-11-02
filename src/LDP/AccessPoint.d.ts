/// <reference path="../../typings/es6/es6.d.ts" />
import * as RDF from './../RDF';
import * as Container from './Container';
interface AccessPoint extends Container.Class {
    membershipResource: string;
}
declare class Factory extends Container.Factory {
    is(object: Object): boolean;
    from(resource: RDF.Node.Class): AccessPoint;
    from(resources: RDF.Node.Class[]): AccessPoint[];
    protected hasRDFClass(resource: RDF.Resource.Class): boolean;
    protected hasClassProperties(resource: RDF.Node.Class): boolean;
    protected injectBehaviour(resource: Container.Class): AccessPoint;
}
declare var factory: Factory;
export { AccessPoint as Class, Factory, factory };
