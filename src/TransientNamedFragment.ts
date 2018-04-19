import { TransientDocument } from "./TransientDocument";
import { TransientFragment } from "./TransientFragment";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
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
		const id:string = document.id + "#" + slug;
		const fragment:T & TransientFragment = TransientFragment.createFrom( object, document, id );

		return TransientNamedFragment.decorate( fragment );
	},

	decorate<T extends object>( object:T ):T & TransientNamedFragment {
		if( TransientNamedFragment.isDecorated( object ) ) return object;

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
