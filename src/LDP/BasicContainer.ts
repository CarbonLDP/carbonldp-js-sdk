/// <reference path="../../typings/es6/es6.d.ts" />

import * as NS from './../NS';
import * as RDF from './../RDF';
import * as Container from './Container';
import * as Utils from './../Utils';

const RDFClass:string = NS.LDP.Class.BasicContainer;

interface BasicContainer extends Container.Class {

}

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

	from( resource:RDF.Node.Class ):BasicContainer;
	from( resources:RDF.Node.Class[] ):BasicContainer[];
	from( resourceOrResources:any ):any {
		var sources:(Container.Class | Container.Class[]) = super.from( resourceOrResources );
		var resources:Container.Class[] = Utils.isArray( sources ) ? <Container.Class[]> sources : <Container.Class[]> [ sources ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:Container.Class = resources[ i ];
			if ( ! this.hasClassProperties( resource ) ) this.injectBehaviour( resource );
		}

		if ( Utils.isArray( resourceOrResources ) ) return <BasicContainer[]> resources;
		else return <BasicContainer> resources[ 0 ];
	}

	protected hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( NS.LDP.Class.BasicContainer ) !== - 1
		);
	}

	protected hasClassProperties( resource:RDF.Node.Class ):boolean {
		return true;
	}

	protected injectBehaviour( resource:Container.Class ):BasicContainer {
		return <BasicContainer> resource;
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