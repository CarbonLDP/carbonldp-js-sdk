/// <reference path="./../typings/tsd.d.ts" />

import * as NS from "./NS";
import Documents from "./Documents";
import Context from "./Context";
import * as RDF from "./RDF";
import * as LDP from "./LDP";
import * as Utils from "./Utils";

export interface Resource extends RDF.Resource.Class {
	rootContainer:string;
}

export const RDF_CLASS:string = NS.CS.Class.Application;

export const DEFINITION:Map<string, RDF.PropertyDescription> = <any> Utils.M.from( {
	"rootContainer": {
		"uri": NS.CS.Predicate.rootContainer,
		"multi": false,
		"literal": false,
	},
} );

export class Class extends Context {
	private resource:Resource;
	private base:string;

	constructor( parentContext:Context, resource:Resource ) {
		super();

		this.parentContext = parentContext;
		this.resource = resource;

		this.base = this.getBase( this.resource );
	}

	resolve( uri:string ):string {
		if ( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		let finalURI:string = this.parentContext.resolve( this.base );
		return RDF.URI.Util.resolve( finalURI, uri );
	}

	private getBase( resource:Resource ):string {
		let rootContainerURI:string = RDF.URI.Util.removeProtocol( resource.rootContainer );
		let parentBase:string = RDF.URI.Util.removeProtocol( this.parentContext.resolve( "" ) );
		if ( Utils.S.startsWith( rootContainerURI, parentBase ) ) rootContainerURI = rootContainerURI.substr( parentBase.length, rootContainerURI.length );
		return rootContainerURI;
	}
}

export class Factory extends RDF.AbstractInjector<Resource> {
	constructor() {
		super( RDF_CLASS, [ LDP.RDFSource.injector ] );
	}

	hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "rootContainer" )
		);
	}

	is( object:Object ):boolean {
		return (
			super.is( object ) &&
			this.hasClassProperties( object )
		);
	}


	protected injectBehavior<T extends RDF.Resource.Class>( resource:T ):( T & Resource ) {
		RDF.Resource.Factory.injectDescriptions( resource, DEFINITION );
		return <any> resource;
	}
}

export let factory:Factory = new Factory();

export default Class;
