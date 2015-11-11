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
		"literal": false
	}
} );

export class Factory extends Container.Factory {
	is( object:Object ):boolean {
		return (
			super.is( object ) &&
			this.hasRDFClass( <Container.Class> object ) &&
			this.hasClassProperties( <Container.Class> object )
		);
	}

	from( resource:RDF.Node.Class ):Class;
	from( resources:RDF.Node.Class[] ):Class[];
	from( resourceOrResources:any ):any {
		let superResult:(Container.Class | Container.Class[]) = super.from( resourceOrResources );
		let resources:Container.Class[] = Utils.isArray( superResult ) ? <Container.Class[]> superResult : <Container.Class[]> [ superResult ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:Container.Class = resources[ i ];
			if ( ! this.hasClassProperties( resource ) ) this.injectBehaviour( resource );
		}

		if ( ! Utils.isArray( resourceOrResources ) ) return <Class> resources[ 0 ];
		return <Class[]> resources;
	}

	protected hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( RDF_CLASS ) !== - 1
		);
	}

	protected hasClassProperties( resource:RDF.Node.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "membershipResource" )
		);
	}

	protected injectBehaviour( resource:Container.Class ):Class {
		RDF.Resource.Factory.injectDescriptions( resource, DEFINITION );
		return <Class> resource;
	}
}

export let factory:Factory = new Factory();

export default Class;
