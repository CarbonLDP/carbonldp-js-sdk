import * as Document from './Document';
import * as Errors from './Errors';
import * as RDF from './RDF';
import * as Utils from './Utils';

interface Fragment extends RDF.Resource.Class{
	document:Document.Class;
}

interface DocumentHolder extends Object {
	document:Document.Class;
}

function externalAnonymousFragmentFilter( propertyURI:string, value:(RDF.Node.Class | RDF.Literal.Class) ) {
	if( ! RDF.Node.Factory.is( value ) ) return;
	if( ! RDF.URI.Util.isBNodeID( value[ '@id' ] ) ) return;

	if( ! ( 'document' in value ) ) throw new Errors.IllegalArgumentError( "The resource provided doesn't belong to a document." );

	let fragment:Fragment = <any> value;

	if( this.document !== fragment.document ) throw new Errors.IllegalArgumentError( "The anonymous fragment provided belongs to another document. To reference it from another document it needs to be named." );
}

class Factory extends RDF.Resource.Factory {
	from( object:Array<Object & DocumentHolder> ):Fragment[];
	from( object:Object & DocumentHolder ):Fragment;
	from( objects ):any {
		if( ! Utils.isArray( objects ) ) return this.singleFrom( <Object & DocumentHolder>objects );

		for ( let i:number = 0, length:number = objects.length; i < length; i ++ ) {
			let object:(Object & DocumentHolder) = <(Object & DocumentHolder)> objects[ i ];

			this.singleFrom( object );
		}

		return <Fragment[]> objects;
	}

	protected singleFrom( object:Object & DocumentHolder ):Fragment {
		return this.injectBehavior( object );
	}

	protected injectBehavior( object:(Object & DocumentHolder) ):Fragment {
		let fragment = <Fragment> super.injectBehavior( object );
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

let factory:Factory = new Factory();

class Util {
	static generateID():string {
		return '_:' + Utils.UUID.generate();
	}
}

export default Fragment;

export {
	Fragment as Class,
	factory,
	Factory,
	Util
};