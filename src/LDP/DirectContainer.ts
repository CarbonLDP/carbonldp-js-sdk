/// <reference path="../../typings/es6/es6.d.ts" />

import * as NS from "./../NS";
import * as RDF from "./../RDF";
import * as AccessPoint from "./AccessPoint";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.LDP.Class.DirectContainer;

export interface Class extends AccessPoint.Class {

}

export class Injector extends RDF.AbstractInjector<Class> {
	constructor() {
		super( RDF_CLASS, [ AccessPoint.injector ] );
	}

	hasClassProperties( resource:Object ):boolean {
		return true;
	}

	is( object:Object ):boolean {
		return (
			super.is( object ) &&
			this.hasRDFClass( <AccessPoint.Class> object ) &&
			this.hasClassProperties( <AccessPoint.Class> object )
		);
	}
}

export let injector:Injector = new Injector();

export default Class;
