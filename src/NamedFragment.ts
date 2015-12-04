import * as Document from "./Document";
import * as Fragment from "./Fragment";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Class extends Fragment.Class {
	slug:string;
}

export class Factory extends Fragment.Factory {
	hasClassProperties( resource:Fragment.Class ):boolean {
		return (
				Utils.hasPropertyDefined( resource, "slug" )
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
		let fragment:( T & Fragment.Class ) = Fragment.factory.from( node, document );

		if ( ! this.hasClassProperties( fragment ) ) this.injectBehavior( fragment, document );

		return <any> fragment;
	}

	protected injectBehavior<T extends Fragment.Class>( fragment:T, document:Document.Class ):( T & Class ) {
		if( this.hasClassProperties( fragment ) ) return <any> fragment;

		Object.defineProperties( fragment, {
			"slug": {
				get: function ():string {
					return RDF.URI.Util.getFragment( fragment.uri );
				},
				set: function ( slug:string ):void {
					this.uri = this.document.uri + "#" + slug;
				},
				enumerable: false,
			},
		} );

		return <any>fragment;
	}
}

export var factory:Factory = new Factory();

export default Class;
