/// <reference path="../../typings/es6/es6.d.ts" />

import * as NS from "./../NS";
import * as RDF from "./../RDF";
import * as Container from "./Container";
import * as Utils from "./../Utils";

const RDF_CLASS:string = NS.LDP.Class.BasicContainer;

export interface Class extends Container.Class {

}

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
		let sources:(Container.Class | Container.Class[]) = super.from( resourceOrResources );
		let resources:Container.Class[] = Utils.isArray( sources ) ? <Container.Class[]> sources : <Container.Class[]> [ sources ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:Container.Class = resources[ i ];
			if ( ! this.hasClassProperties( resource ) ) this.injectBehaviour( resource );
		}

		if ( Utils.isArray( resourceOrResources ) ) return <Class> resources[ 0 ];
		return <Class[]> resources;
	}

	protected hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( NS.LDP.Class.BasicContainer ) !== - 1
		);
	}

	protected hasClassProperties( resource:RDF.Node.Class ):boolean {
		return true;
	}

	protected injectBehaviour( resource:Container.Class ):Class {
		return <Class> resource;
	}
}

export let factory:Factory = new Factory();

export default Class;
