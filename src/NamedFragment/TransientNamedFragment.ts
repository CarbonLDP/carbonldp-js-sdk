import { TransientFragment } from "../Fragment";
import { URI } from "../RDF";
import { isObject } from "../Utils";
import { BaseNamedFragment } from "./BaseNamedFragment";

export interface TransientNamedFragment extends TransientFragment {
	slug:string;
}


export interface TransientNamedFragmentFactory {
	isDecorated( object:object ):object is TransientNamedFragment;

	is( value:any ):value is TransientNamedFragment;


	create<T extends object>( base:T & BaseNamedFragment ):T & TransientNamedFragment;

	createFrom<T extends object>( object:T & BaseNamedFragment ):T & TransientNamedFragment;

	decorate<T extends object>( object:T ):T & TransientNamedFragment;
}

export const TransientNamedFragment:TransientNamedFragmentFactory = {
	isDecorated( object:object ):object is TransientNamedFragment {
		return isObject( object ) &&
			object.hasOwnProperty( "slug" ) && ! object.propertyIsEnumerable( "slug" )
			;
	},

	is( value:any ):value is TransientNamedFragment {
		return TransientFragment.is( value )
			&& TransientNamedFragment.isDecorated( value )
			;
	},

	create<T extends object>( data:T & BaseNamedFragment ):T & TransientNamedFragment {
		const copy:T & BaseNamedFragment = Object.assign( {}, data );
		return TransientNamedFragment.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseNamedFragment ):T & TransientNamedFragment {
		object.id = object._document.id + "#" + object.slug;
		return TransientNamedFragment.decorate( object );
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
