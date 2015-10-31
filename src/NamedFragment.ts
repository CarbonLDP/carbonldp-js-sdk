import * as Document from './Document';
import * as Fragment from './Fragment';
import * as RDF from './RDF';
import * as Utils from './Utils';

interface NamedFragment extends Fragment.Class {
	slug:string
}

interface DocumentHolder extends Object {
	document:Document.Class;
}

class Factory extends Fragment.Factory {
	from( object:Array<Object & DocumentHolder> ):NamedFragment[];
	from( object:Object & DocumentHolder ):NamedFragment;
	from( objects ):any {
		if( ! Utils.isArray( objects ) ) return this.singleFrom( <Object & DocumentHolder>objects );

		for ( let i:number = 0, length:number = objects.length; i < length; i ++ ) {
			let object:(Object & DocumentHolder) = <(Object & DocumentHolder)> objects[ i ];

			this.singleFrom( object );
		}

		return <NamedFragment[]> objects;
	}

	protected singleFrom( object:Object & DocumentHolder ):NamedFragment {
		return this.injectBehavior( object );
	}

	protected injectBehavior( node:(Object & DocumentHolder) ):NamedFragment {
		let fragment = <NamedFragment> super.injectBehavior( node );
		if( this.hasClassProperties( fragment ) ) return fragment;

		Object.defineProperties( fragment, {
			'slug': {
				get: function () {
					return RDF.URI.Util.getFragment( fragment.uri )
				},
				set: function ( slug ) {
					this.uri = this.document.uri + '#' + slug;
				},
				enumerable: false
			}
		} );

		return fragment;
	}

	protected hasClassProperties( resource:Fragment.Class ):boolean {
		return (
			Utils.hasPropertyDefined( resource, 'slug' )
		);
	}
}

let factory:Factory = new Factory();

export default NamedFragment;
export {
	NamedFragment as Class,
	factory,
	Factory
};