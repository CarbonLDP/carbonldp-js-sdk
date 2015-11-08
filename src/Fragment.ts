import * as Document from './Document';
import * as Errors from './Errors';
import * as RDF from './RDF';
import * as Utils from './Utils';

export interface Class extends RDF.Resource.Class{
	document:Document.Class;
}

function externalAnonymousFragmentFilter( propertyURI:string, value:(RDF.Node.Class | RDF.Literal.Class) ) {
	if( ! RDF.Node.Factory.is( value ) ) return;
	if( ! RDF.URI.Util.isBNodeID( value[ '@id' ] ) ) return;

	if( ! ( 'document' in value ) ) throw new Errors.IllegalArgumentError( "The resource provided doesn't belong to a document." );

	let fragment:Class = <any> value;

	if( this.document !== fragment.document ) throw new Errors.IllegalArgumentError( "The anonymous fragment provided belongs to another document. To reference it from another document it needs to be named." );
}

export class Factory extends RDF.Resource.Factory {
	from( object:Array<Object & { document:Document.Class }> ):Class[];
	from( object:Object & { document:Document.Class } ):Class;
	from( objects ):any {
		if( ! Utils.isArray( objects ) ) return this.singleFrom( <Object & { document:Document.Class }>objects );

		for ( let i:number = 0, length:number = objects.length; i < length; i ++ ) {
			let object:(Object & { document:Document.Class }) = <(Object & { document:Document.Class })> objects[ i ];

			this.singleFrom( object );
		}

		return <Class[]> objects;
	}

	protected singleFrom( object:Object & { document:Document.Class } ):Class {
		return this.injectBehavior( object );
	}

	protected injectBehavior( object:(Object & { document:Document.Class }) ):Class {
		let fragment = <Class> super.injectBehavior( object );
		if( this.hasClassProperties( fragment ) ) return fragment;

		fragment._propertyAddedCallbacks.push( externalAnonymousFragmentFilter );

		let document:Document.Class = fragment.document;
		delete fragment.document;

		Object.defineProperties( fragment, {
			'document': {
				writable: false,
				enumerable: false,
				value: document
			}
		} );

		return fragment;
	}

	protected hasClassProperties( resource:RDF.Resource.Class ):boolean {
		return false;
	}
}

export var factory:Factory = new Factory();

export class Util {
	static generateID():string {
		return '_:' + Utils.UUID.generate();
	}
}

export default Class;