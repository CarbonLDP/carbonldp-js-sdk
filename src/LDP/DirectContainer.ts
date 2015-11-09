/// <reference path="../../typings/es6/es6.d.ts" />

import * as NS from "./../NS";
import * as RDF from "./../RDF";
import * as AccessPoint from "./AccessPoint";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = NS.LDP.Class.DirectContainer;

export interface Class extends AccessPoint.Class {

}

export class Factory extends AccessPoint.Factory {
	is( object:Object ):boolean {
		return (
			super.is( object ) &&
			this.hasRDFClass( <AccessPoint.Class> object ) &&
			this.hasClassProperties( <AccessPoint.Class> object )
		);
	}

	from( resource:RDF.Node.Class ):Class;
	from( resources:RDF.Node.Class[] ):Class[];
	from( resourceOrResources:any ):any {
		let sources:(AccessPoint.Class | AccessPoint.Class[]) = super.from( resourceOrResources );
		let resources:AccessPoint.Class[] = Utils.isArray( sources ) ? <AccessPoint.Class[]> sources : <AccessPoint.Class[]> [ sources ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:AccessPoint.Class = resources[ i ];
			if ( ! this.hasClassProperties( resource ) ) this.injectBehaviour( resource );
		}

		if ( Utils.isArray( resourceOrResources ) ) return <Class[]> resources;
		return <Class> resources[ 0 ];
	}

	protected hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( RDF_CLASS ) !== - 1
		);
	}

	protected hasClassProperties( resource:RDF.Node.Class ):boolean {
		return true;
	}

	protected injectBehaviour( resource:AccessPoint.Class ):Class {
		return <Class> resource;
	}
}

export let factory:Factory = new Factory();

export default Class;
