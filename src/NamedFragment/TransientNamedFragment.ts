import { IllegalActionError } from "../Errors";
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
		const slug:string = object.slug;

		const namedFragment:T & TransientNamedFragment = TransientNamedFragment.decorate( object );
		namedFragment.slug = slug;

		return namedFragment;
	},

	decorate<T extends object>( object:T ):T & TransientNamedFragment {
		if( TransientNamedFragment.isDecorated( object ) ) return object;

		TransientFragment.decorate( object );

		const namedFragment:T & TransientNamedFragment = object as T & TransientNamedFragment;
		Object.defineProperties( namedFragment, {
			"id": {
				enumerable: false,
				configurable: true,
				get( this:TransientNamedFragment ):string {
					const registryID:string = this._registry && this._registry.$id || "";
					return registryID + "#" + URI.getFragment( this._id );
				},
				set( this:TransientNamedFragment, value:string ):void {
					const fragment:string | null = URI.getFragment( value );
					if( ! fragment ) throw new IllegalActionError( `Cannot assign "${ value }" as a named fragment ID.` );

					const registryID:string = this._registry && this._registry.$id || "";
					if( ! URI.isBaseOf( registryID, value ) ) throw new IllegalActionError( `"${ value }" it's outside "${ registryID }"'s scope.` );

					this._id = registryID + "#" + fragment;
				},
			},
			"slug": {
				enumerable: false,
				configurable: true,
				get( this:TransientNamedFragment ):string {
					return URI.getFragment( this._id );
				},
				set( this:TransientNamedFragment, value:string ):void {
					const registryID:string = this._registry && this._registry.$id || "";
					this._id = registryID + "#" + value;
				},
			},
		} );

		return namedFragment;
	},
};
