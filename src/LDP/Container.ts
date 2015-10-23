/// <reference path="../../typings/es6/es6.d.ts" />

import * as NS from './../NS';
import * as RDF from './../RDF';
import * as RDFSource from './RDFSource';
import * as Utils from './../Utils';

const RDFClass:string = NS.LDP.Class.Container;

interface Container extends RDFSource.Class {
	memberOfRelation:string;
	hasMemberRelation:string;
}

const Definition:Map<string, RDF.PropertyDescription> = <any> Utils.M.from( {
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

class Factory extends RDFSource.Factory {
	is( object:Object ):boolean {
		//@formatter:off
		return (
			super.is( object ) &&
			this.hasRDFClass( <RDFSource.Class> object ) &&
			this.hasClassProperties( <RDFSource.Class> object )
		);
		//@formatter:on
	}

	from( resource:RDF.Node.Class ):Container;
	from( resources:RDF.Node.Class[] ):Container[];
	from( resourceOrResources:any ):any {
		var superResult:(RDFSource.Class | RDFSource.Class[]) = super.from( resourceOrResources );
		var resources:RDFSource.Class[] = Utils.isArray( superResult ) ? <RDFSource.Class[]> superResult : <RDFSource.Class[]> [ superResult ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:RDFSource.Class = resources[ i ];
			if ( ! this.hasClassProperties( resource ) ) this.injectBehaviour( resource );
		}

		if ( Utils.isArray( resourceOrResources ) ) return <Container[]> resources;
		else return <Container> resources[ 0 ];
	}

	protected hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( RDFClass ) !== - 1 ||
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

	protected injectBehaviour( resource:RDF.Resource.Class ):Container {
		RDF.Resource.Factory.injectDescriptions( resource, Definition );
		return <Container> resource;
	}
}

var factory = new Factory();

//@formatter:off
export {
	Container as Class,
	Factory,
	factory
};
//@formatter:on