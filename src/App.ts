/// <reference path="../typings/es6/es6.d.ts" />

import * as CS from './namespaces/CS';
import Documents from './Documents';
import Parent from './Parent';
import Resources from './Resources';
import * as RDF from './RDF';
import * as Utils from './Utils';

interface Resource extends RDF.Resource.Class {
	rootContainer:string;
}

const Definition:Map<string, RDF.PropertyDescription> = <any> Utils.M.from( {
	"rootContainer": {
		"uri": CS.Predicate.rootContainer,
		"multi": false,
		"literal": false
	}
} );

class App extends Parent {
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

class Factory {
	static is( object:Object ):boolean {
		//@formatter:off
		return (
			RDF.Resource.Factory.is( object ) &&
			Utils.hasPropertyDefined( object, "rootContainer" )
		);
		//@formatter:on
	}

	static from( resource:RDF.Node.Class ):Resource;
	static from( resources:RDF.Node.Class[] ):Resource[];
	static from( resourceOrResources:any ):any {
		var resources:RDF.Node.Class[] = Utils.isArray( resourceOrResources ) ? resourceOrResources : [ resourceOrResources ];
		var apps:Resource[] = [];
		for ( let i:number = 0, length:number = resources.length; i < length; i ++ ) {
			var resource:RDF.Node.Class = resources[ i ];
			resource = RDF.Resource.Factory.is( resource ) ? resource : RDF.Resource.Factory.from( resource );

			var app:Resource = <Resource> resource;
			if ( ! Factory.is( app ) ) Factory.injectBehaviour( app );

			apps.push( app );
		}

		if ( Utils.isArray( resourceOrResources ) ) return apps;
		else return apps[ 0 ];
	}

	private static injectBehaviour( resource:Resource ):Resource {
		RDF.Resource.Factory.injectDescriptions( resource, Definition );

		return resource;
	}
}

//@formatter:off
export default App;
export {
	App as Class,
	Resource,
	Factory
};
//@formatter:on