/// <reference path="../../typings/es6/es6.d.ts" />

import * as NS from './../NS';
import * as RDF from './../RDF';
import * as AccessPoint from './AccessPoint';
import * as Utils from './../Utils';

const RDFClass:string = NS.LDP.Class.DirectContainer;

interface DirectContainer extends AccessPoint.Class {

}

class Factory extends AccessPoint.Factory {
	is( object:Object ):boolean {
		//@formatter:off
		return (
			super.is( object ) &&
			this.hasRDFClass( <AccessPoint.Class> object ) &&
			this.hasClassProperties( <AccessPoint.Class> object )
		);
		//@formatter:on
	}

	from( resource:RDF.Node.Class ):DirectContainer;
	from( resources:RDF.Node.Class[] ):DirectContainer[];
	from( resourceOrResources:any ):any {
		var sources:(AccessPoint.Class | AccessPoint.Class[]) = super.from( resourceOrResources );
		var resources:AccessPoint.Class[] = Utils.isArray( sources ) ? <AccessPoint.Class[]> sources : <AccessPoint.Class[]> [ sources ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:AccessPoint.Class = resources[ i ];
			if ( ! this.hasClassProperties( resource ) ) this.injectBehaviour( resource );
		}

		if ( Utils.isArray( resourceOrResources ) ) return <DirectContainer[]> resources;
		else return <DirectContainer> resources[ 0 ];
	}

	protected hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( RDFClass ) !== - 1
		);
	}

	protected hasClassProperties( resource:RDF.Node.Class ):boolean {
		return true;
	}

	protected injectBehaviour( resource:AccessPoint.Class ):DirectContainer {
		return <DirectContainer> resource;
	}
}

var factory = new Factory();

//@formatter:off
export {
	DirectContainer as Class,
	Factory,
	factory
};
//@formatter:on