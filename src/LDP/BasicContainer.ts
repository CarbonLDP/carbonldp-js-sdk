/// <reference path="../../typings/es6/es6.d.ts" />

import * as NS from "./../NS";
import * as RDF from "./../RDF";
import * as Container from "./Container";
import * as Utils from "./../Utils";

const RDF_CLASS:string = NS.LDP.Class.BasicContainer;

export interface Class extends Container.Class {

}

export class Injector extends RDF.AbstractInjector<Class> {
	constructor() {
		super( RDF_CLASS, [ Container.injector ] );
	}

	is( object:Object ):boolean {
		return (
			super.is( object ) &&
			this.hasRDFClass( <Container.Class> object ) &&
			this.hasClassProperties( <Container.Class> object )
		);
	}

	hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( NS.LDP.Class.BasicContainer ) !== - 1
		);
	}

	hasClassProperties( resource:RDF.Node.Class ):boolean {
		return true;
	}

	protected injectBehavior<T>( resource:T ):( T & Class ) {
		return <any> resource;
	}
}

export let injector:Injector = new Injector();

export default Class;
