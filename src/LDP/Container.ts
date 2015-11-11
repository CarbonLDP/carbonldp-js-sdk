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
		"literal": false
	},
	"hasMemberRelation": {
		"uri": NS.LDP.Predicate.hasMemberRelation,
		"multi": false,
		"literal": false
	}
} );

export class Factory extends RDFSource.Factory {
	is( object:Object ):boolean {
		return (
			super.is( object ) &&
			this.hasRDFClass( <RDFSource.Class> object ) &&
			this.hasClassProperties( <RDFSource.Class> object )
		);
	}

	from( resource:RDF.Node.Class ):Class;
	from( resources:RDF.Node.Class[] ):Class[];
	from( resourceOrResources:any ):any {
		let superResult:(RDFSource.Class | RDFSource.Class[]) = super.from( resourceOrResources );
		let resources:RDFSource.Class[] = Utils.isArray( superResult ) ? <RDFSource.Class[]> superResult : <RDFSource.Class[]> [ superResult ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:RDFSource.Class = resources[ i ];
			if ( ! this.hasClassProperties( resource ) ) this.injectBehaviour( resource );
		}

		if ( Utils.isArray( resourceOrResources ) ) return <Class[]> resources;
		return <Class> resources[ 0 ];
	}

	protected hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( RDF_CLASS ) !== - 1 ||
			resource.types.indexOf( NS.LDP.Class.BasicContainer ) !== - 1 ||
			resource.types.indexOf( NS.LDP.Class.DirectContainer ) !== - 1 ||
			resource.types.indexOf( NS.LDP.Class.IndirectContainer ) !== - 1
		);
	}

	protected hasClassProperties( resource:RDF.Node.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "memberOfRelation" ) &&
			Utils.hasPropertyDefined( resource, "hasMemberRelation" )
		);
	}

	protected injectBehaviour( resource:RDF.Resource.Class ):Class {
		RDF.Resource.Factory.injectDescriptions( resource, DEFINITION );
		return <Class> resource;
	}
}

export let factory:Factory = new Factory();

export default Class;
