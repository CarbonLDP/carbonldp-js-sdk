/// <reference path="../typings/es6/es6.d.ts" />

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
		"literal": false
	}
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

export class Factory extends LDP.RDFSource.Factory {
	is( object:Object ):boolean {
		return (
			super.is( object ) &&
			Utils.hasPropertyDefined( object, "rootContainer" )
		);
	}

	from( resource:RDF.Node.Class ):Resource;
	from( resources:RDF.Node.Class[] ):Resource[];
	from( resourceOrResources:any ):any {
		let superResult:(RDF.Resource.Class | RDF.Resource.Class[]) = super.from( resourceOrResources );
		let resources:RDF.Resource.Class[] = Utils.isArray( superResult ) ? <RDF.Resource.Class[]> superResult : <RDF.Resource.Class[]> [ superResult ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			let resource:RDF.Resource.Class = resources[ i ];
			if ( ! this.hasClassProperties( resource ) ) this.injectBehaviour( resource );
		}

		if ( Utils.isArray( resourceOrResources ) ) return <Resource[]> resources;
		return <Resource> resources[ 0 ];
	}

	protected hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( RDF_CLASS ) !== - 1
		);
	}

	protected hasClassProperties( resource:RDF.Node.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "memberOfRelation" ) &&
			Utils.hasPropertyDefined( resource, "hasMemberRelation" )
		);
	}

	protected injectBehaviour( resource:RDF.Resource.Class ):Resource {
		RDF.Resource.Factory.injectDescriptions( resource, DEFINITION );

		return <Resource> resource;
	}
}

export let factory:Factory = new Factory();

export default Class;
