import * as Document from "./Document";
import * as Errors from "./Errors";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Class extends RDF.Resource.Class {
	document:Document.Class;
}

function externalAnonymousFragmentFilter( propertyURI:string, value:(RDF.Node.Class | RDF.Literal.Class) ):void {
	if( ! RDF.Node.Factory.is( value ) ) return;
	if( ! RDF.URI.Util.isBNodeID( value[ "@id" ] ) ) return;

	if( ! ( "document" in value ) ) throw new Errors.IllegalArgumentError( "The resource provided doesn't belong to a document." );

	let fragment:Class = <any> value;

	if( this.document !== fragment.document ) throw new Errors.IllegalArgumentError( "The anonymous fragment provided belongs to another document. To reference it from another document it needs to be named." );
}

export class Factory {
	hasClassProperties( resource:RDF.Resource.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "document" )
		);
	}

	from<T extends Object>( nodes:T[], document:Document.Class ):( T & Class )[];
	from<T extends Object>( node:T, document:Document.Class ):( T & Class );
	from( nodeOrNodes:any, document:Document.Class ):any {
		if( ! Utils.isArray( nodeOrNodes ) ) return this.singleFrom( nodeOrNodes, document );

		for( let node of nodeOrNodes ) {
			this.singleFrom( node, document );
		}

		return <any> nodeOrNodes;
	}

	protected singleFrom<T extends Object>( node:T, document:Document.Class ):( T & Class ) {
		let resource:( T & RDF.Resource.Class ) = RDF.Resource.factory.from( node );

		if ( ! this.hasClassProperties( resource ) ) this.injectBehavior( resource, document );

		return <any> node;
	}

	protected injectBehavior<T extends RDF.Resource.Class>( object:T, document:Document.Class ):( T & Class ) {
		if( this.hasClassProperties( object ) ) return <any> object;

		object._propertyAddedCallbacks.push( externalAnonymousFragmentFilter );

		Object.defineProperties( object, {
			"document": {
				writable: false,
				enumerable: false,
				value: document,
			},
		} );

		return <any> object;
	}
}

export var factory:Factory = new Factory();

export class Util {
	static generateID():string {
		return "_:" + Utils.UUID.generate();
	}
}

export default Class;
