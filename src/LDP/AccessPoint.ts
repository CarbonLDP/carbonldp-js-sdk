/// <reference path="../../typings/es6/es6.d.ts" />

import * as NS from './../NS';
import * as RDF from './../RDF';
import * as Container from './Container';
import * as Utils from './../Utils';

const RDFClass:string = NS.C.Class.AccessPoint;

interface AccessPoint extends Container.Class {
	membershipResource:string;
}

const Definition:Map<string, RDF.PropertyDescription> = <any> Utils.M.from( {
	"membershipResource": {
		"uri": NS.LDP.Predicate.membershipResource,
		"multi": false,
		"literal": false
	}
} );

class Factory extends Container.Factory {
	is( object:Object ):boolean {
		//@formatter:off
		return (
			super.is( object ) &&
			this.hasRDFClass( <Container.Class> object ) &&
			this.hasClassProperties( <Container.Class> object )
		);
		//@formatter:on
	}

	from( resource:RDF.Node.Class ):AccessPoint;
	from( resources:RDF.Node.Class[] ):AccessPoint[];
	from( resourceOrResources:any ):any {
		var superResult:(Container.Class | Container.Class[]) = super.from( resourceOrResources );
		var resources:Container.Class[] = Utils.isArray( superResult ) ? <Container.Class[]> superResult : <Container.Class[]> [ superResult ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:Container.Class = resources[ i ];
			if ( ! this.hasClassProperties( resource ) ) this.injectBehaviour( resource );
		}

		if ( Utils.isArray( resourceOrResources ) ) return <AccessPoint[]> resources;
		else return <AccessPoint> resources[ 0 ];
	}

	protected hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( RDFClass ) !== - 1
		);
	}

	protected hasClassProperties( resource:RDF.Node.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "membershipResource" )
		);
	}

	protected injectBehaviour( resource:Container.Class ):AccessPoint {
		RDF.Resource.Factory.injectDescriptions( resource, Definition );
		return <AccessPoint> resource;
	}
}

var factory = new Factory();

//@formatter:off
export {
	AccessPoint as Class,
	Factory,
	factory
};
//@formatter:on