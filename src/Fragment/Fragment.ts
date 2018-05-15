import { Pointer } from "../Pointer";
import { Registry } from "../Registry";
import { PersistedResource } from "../Resource";
import {
	TransientFragment,
	TransientFragmentFactory,
} from "./TransientFragment";


export interface Fragment extends TransientFragment, PersistedResource {
	_registry:Registry<TransientFragment> & Pointer | undefined;
}


export interface FragmentFactory extends TransientFragmentFactory {
	isDecorated( object:object ):object is Fragment;

	is( value:any ):value is Fragment;


	decorate<T extends object>( object:T ):T & Fragment;
}

export const Fragment:FragmentFactory = {
	isDecorated( object:object ):object is Fragment {
		return TransientFragment.isDecorated( object )
			&& PersistedResource.isDecorated( object )
			;
	},

	is( value:any ):value is Fragment {
		return TransientFragment.is( value ) &&
			PersistedResource.isDecorated( value )
			;
	},


	decorate<T extends object>( object:T ):T & Fragment {
		if( Fragment.isDecorated( object ) ) return object;

		TransientFragment.decorate( object );
		PersistedResource.decorate( object );

		return object as T & Fragment;
	},

	create: TransientFragment.create,
	createFrom: TransientFragment.createFrom,
};
