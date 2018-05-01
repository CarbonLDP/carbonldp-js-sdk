import { TransientDocument } from "../Document";
import { IllegalActionError } from "../Errors";
import { TransientResource } from "../Resource";
import { isObject } from "../Utils";
import { BaseFragment } from "./BaseFragment";


export interface TransientFragment extends TransientResource {
	_document:TransientDocument;
}


export interface TransientFragmentFactory {
	isDecorated( object:object ):object is TransientFragment;

	is( value:any ):value is TransientFragment;


	create<T extends object>( data:T & BaseFragment ):T & TransientFragment;

	createFrom<T extends object>( object:T & BaseFragment ):T & TransientFragment;

	decorate<T extends object>( object:T ):T & TransientFragment;
}

export const TransientFragment:TransientFragmentFactory = {
	isDecorated( object:object ):object is TransientFragment {
		return isObject( object )
			&& object.hasOwnProperty( "_document" ) && ! object.propertyIsEnumerable( "_document" )
			;
	},

	is( value:any ):value is TransientFragment {
		return TransientResource.is( value ) &&
			TransientFragment.isDecorated( value )
			;
	},

	create<T extends object>( data:T & BaseFragment ):T & TransientFragment {
		const copy:T & BaseFragment = Object.assign( {}, data );
		return TransientFragment.createFrom<T>( copy );
	},

	createFrom<T extends object>( object:T & BaseFragment ):T & TransientFragment {
		return TransientFragment.decorate<T>( object );
	},

	decorate<T extends object>( object:T ):T & TransientFragment {
		if( TransientFragment.isDecorated( object ) ) return object;

		TransientResource.decorate( object );

		const fragment:T & TransientFragment = object as T & TransientFragment;
		Object.defineProperties( fragment, {
			"_document": {
				writable: true,
				enumerable: false,
				configurable: true,
			},
			"resolve": {
				configurable: true,
				value: resolveFragment,
			},
		} );

		return fragment;
	},
};

function resolveFragment():never {
	throw new IllegalActionError( "A fragment cannot be resolved by itself." );
}
