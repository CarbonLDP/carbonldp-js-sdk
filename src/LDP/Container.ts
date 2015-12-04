/// <reference path="../../typings/es6/es6.d.ts" />

import * as NS from "./../NS";
import * as RDF from "./../RDF";
import * as RDFSource from "./RDFSource";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.LDP.Class.Container;

export interface Class extends RDFSource.Class {
	memberOfRelation:string;
	hasMemberRelation:string;
}

export const DEFINITION:Map<string, RDF.PropertyDescription> = <any> Utils.M.from( {
	"memberOfRelation": {
		"uri": NS.LDP.Predicate.memberOfRelation,
		"multi": false,
		"literal": false,
	},
	"hasMemberRelation": {
		"uri": NS.LDP.Predicate.hasMemberRelation,
		"multi": false,
		"literal": false,
	},
} );

export class Injector extends RDF.AbstractInjector<Class> {
	constructor() {
		super( RDF_CLASS, [ RDFSource.injector ] );
	}

	is( object:Object ):boolean {
		return (
			super.is( object ) &&
			this.hasRDFClass( <RDFSource.Class> object ) &&
			this.hasClassProperties( <RDFSource.Class> object )
		);
	}

	hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( RDF_CLASS ) !== - 1 ||
			resource.types.indexOf( NS.LDP.Class.BasicContainer ) !== - 1 ||
			resource.types.indexOf( NS.LDP.Class.DirectContainer ) !== - 1 ||
			resource.types.indexOf( NS.LDP.Class.IndirectContainer ) !== - 1
		);
	}

	hasClassProperties( resource:RDF.Node.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "memberOfRelation" ) &&
			Utils.hasPropertyDefined( resource, "hasMemberRelation" )
		);
	}


	protected injectBehavior( resource:RDF.Resource.Class ):Class {
		RDF.Resource.Factory.injectDescriptions( resource, DEFINITION );
		return <Class> resource;
	}
}

export let injector:Injector = new Injector();

export default Class;
