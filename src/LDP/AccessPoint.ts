/// <reference path="../../typings/es6/es6.d.ts" />

import * as NS from "./../NS";
import * as RDF from "./../RDF";
import * as Container from "./Container";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.C.Class.AccessPoint;

export interface Class extends Container.Class {
	membershipResource:string;
}

export const DEFINITION:Map<string, RDF.PropertyDescription> = <any> Utils.M.from( {
	"membershipResource": {
		"uri": NS.LDP.Predicate.membershipResource,
		"multi": false,
		"literal": false,
	},
} );

export class Injector extends RDF.AbstractInjector<Class> {
	constructor() {
		super( RDF_CLASS, [ Container.injector ] );
	}

	hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "membershipResource" )
		);
	}

	is( object:Object ):boolean {
		return (
			super.is( object ) &&
			this.hasRDFClass( <Container.Class> object ) &&
			this.hasClassProperties( <Container.Class> object )
		);
	}

	protected injectBehavior<T extends Container.Class>( resource:T ):( T & Class ) {
		RDF.Resource.Factory.injectDescriptions( resource, DEFINITION );
		return <any> resource;
	}
}

export let injector:Injector = new Injector();

export default Class;
