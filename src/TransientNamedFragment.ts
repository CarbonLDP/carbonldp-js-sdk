import { TransientDocument } from "./TransientDocument";
import {
	BaseFragment,
	TransientFragment
} from "./Fragment";
import { ModelDecorator } from "./core/ModelDecorator";
import { ModelFactory } from "./core/ModelFactory";
import { URI } from "./RDF/URI";
import { isObject } from "./Utils";

export interface TransientNamedFragment extends TransientFragment {
	slug:string;
}


export interface TransientNamedFragmentFactory extends ModelFactory<TransientNamedFragment>, ModelDecorator<TransientNamedFragment> {
	isDecorated( object:object ):object is TransientNamedFragment;

	is( object:object ):object is TransientNamedFragment;


	create( document:TransientDocument, slug:string ):TransientNamedFragment;

	createFrom<T extends object>( object:T, document:TransientDocument, slug:string ):T & TransientNamedFragment;

	decorate<T extends object>( object:T ):T & TransientNamedFragment;
}

export const TransientNamedFragment:TransientNamedFragmentFactory = {
	isDecorated( object:object ):object is TransientNamedFragment {
		return isObject( object ) &&
			object.hasOwnProperty( "slug" ) && ! object.propertyIsEnumerable( "slug" )
			;
	},

	is( object:object ):object is TransientNamedFragment {
		return TransientFragment.is( object )
			&& TransientNamedFragment.isDecorated( object )
			;
	},

	create( document:TransientDocument, slug:string ):TransientNamedFragment {
		return this.createFrom( {}, document, slug );
	},

	createFrom<T extends object>( object:T, document:TransientDocument, slug:string ):T & TransientNamedFragment {
		const base:T & BaseFragment = Object.assign( object, {
			_document: document,
			id: document.id + "#" + slug,
		} );

		return TransientNamedFragment.decorate( base );
	},

	decorate<T extends object>( object:T ):T & TransientNamedFragment {
		if( TransientNamedFragment.isDecorated( object ) ) return object;

		TransientFragment.decorate( object );

		const namedFragment:T & TransientNamedFragment = object as T & TransientNamedFragment;
		Object.defineProperties( namedFragment, {
			"slug": {
				enumerable: false,
				configurable: true,
				get( this:TransientNamedFragment ):string {
					return URI.getFragment( this.id );
				},
				set( this:TransientNamedFragment, value:string ):void {
					this.id = this._document.id + "#" + value;
				},
			},
		} );

		return namedFragment;
	},
};
