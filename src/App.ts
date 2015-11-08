/// <reference path="../typings/es6/es6.d.ts" />

import * as NS from './NS';
import Documents from './Documents';
import Parent from './Parent';
import * as RDF from './RDF';
import * as LDP from './LDP';
import * as Utils from './Utils';

export interface Resource extends RDF.Resource.Class {
	rootContainer:string;
}

export const RDFClass:string = NS.CS.Class.Application;

export const Definition:Map<string, RDF.PropertyDescription> = <any> Utils.M.from( {
	"rootContainer": {
		"uri": NS.CS.Predicate.rootContainer,
		"multi": false,
		"literal": false
	}
} );

export class Class extends Parent {
	private resource:Resource;
	private base:string;

	constructor( parent:Parent, resource:Resource ) {
		super();

		this.parent = parent;
		this.resource = resource;

		this.base = this.getBase( this.resource );
	}

	resolve( uri:string ):string {
		if ( RDF.URI.Util.isAbsolute( uri ) ) return uri;

		var finalURI:string = this.parent.resolve( this.base );
		return RDF.URI.Util.resolve( finalURI, uri );
	}

	private getBase( resource:Resource ):string {
		var rootContainerURI = RDF.URI.Util.removeProtocol( resource.rootContainer );
		var parentBase = RDF.URI.Util.removeProtocol( this.parent.resolve( "" ) );
		if ( Utils.S.startsWith( rootContainerURI, parentBase ) ) rootContainerURI = rootContainerURI.substr( parentBase.length, rootContainerURI.length );
		return rootContainerURI;
	}
}

export class Factory extends LDP.RDFSource.Factory {
	is( object:Object ):boolean {
		//@formatter:off
		return (
			super.is( object ) &&
			Utils.hasPropertyDefined( object, "rootContainer" )
		);
		//@formatter:on
	}

	from( resource:RDF.Node.Class ):Resource;
	from( resources:RDF.Node.Class[] ):Resource[];
	from( resourceOrResources:any ):any {
		var superResult:(RDF.Resource.Class | RDF.Resource.Class[]) = super.from( resourceOrResources );
		var resources:RDF.Resource.Class[] = Utils.isArray( superResult ) ? <RDF.Resource.Class[]> superResult : <RDF.Resource.Class[]> [ superResult ];

		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:RDF.Resource.Class = resources[ i ];
			if ( ! this.hasClassProperties( resource ) ) this.injectBehaviour( resource );
		}

		if ( Utils.isArray( resourceOrResources ) ) return <Resource[]> resources;
		else return <Resource> resources[ 0 ];
	}

	protected hasRDFClass( resource:RDF.Resource.Class ):boolean {
		return (
			resource.types.indexOf( RDFClass ) !== - 1
		);
	}

	protected hasClassProperties( resource:RDF.Node.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "memberOfRelation" ) &&
			Utils.hasPropertyDefined( resource, "hasMemberRelation" )
		);
	}

	protected injectBehaviour( resource:RDF.Resource.Class ):Resource {
		RDF.Resource.Factory.injectDescriptions( resource, Definition );

		return <Resource> resource;
	}
}

export var factory = new Factory();

export default Class;