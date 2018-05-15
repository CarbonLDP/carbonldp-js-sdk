import { Pointer } from "../Pointer";
import { Registry } from "../Registry";
import { TransientResource } from "../Resource";
import { BaseFragment } from "./BaseFragment";


export interface TransientFragment extends TransientResource {
	_registry:Registry<TransientFragment> & Pointer | undefined;
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
		return TransientResource.isDecorated( object )
			;
	},

	is( value:any ):value is TransientFragment {
		return TransientResource.is( value )
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

		return object as T & TransientFragment;
	},
};
