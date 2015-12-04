/// <reference path="../../typings/es6/es6.d.ts" />

import * as NS from "./../NS";
import * as RDF from "./../RDF";
import * as AccessPoint from "./AccessPoint";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.LDP.Class.IndirectContainer;

export interface Class extends AccessPoint.Class {
	insertedContentRelation:string;
}

export const DEFINITION:Map<string, RDF.PropertyDescription> = <any> Utils.M.from( {
	"insertedContentRelation": {
		"uri": NS.LDP.Predicate.insertedContentRelation,
		"multi": false,
		"literal": false,
	},
} );

export class Injector extends RDF.AbstractInjector<Class> {
	constructor() {
		super( RDF_CLASS, [ AccessPoint.injector ] );
	}

	hasClassProperties( resource:RDF.Node.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "insertedContentRelation" )
		);
	}

	is( object:Object ):boolean {
		return (
			super.is( object ) &&
			this.hasRDFClass( <AccessPoint.Class> object ) &&
			this.hasClassProperties( <AccessPoint.Class> object )
		);
	}

	protected injectBehavior<T extends AccessPoint.Class>( resource:T ):( T & Class ) {
		RDF.Resource.Factory.injectDescriptions( resource, DEFINITION );
		return <any> resource;
	}
}

export let injector:Injector = new Injector();

export default Class;
