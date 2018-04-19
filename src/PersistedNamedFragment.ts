import { ModelDecorator } from "./ModelDecorator";
import { TransientNamedFragment } from "./TransientNamedFragment";
import { Document } from "./Document";
import { Fragment } from "./Fragment";


export interface PersistedNamedFragment extends Fragment, TransientNamedFragment {
	_document:Document;
}


export interface PersistedNamedFragmentFactory extends ModelDecorator<PersistedNamedFragment> {
	isDecorated( object:object ):object is PersistedNamedFragment;

	decorate<T extends object>( object:T ):T & PersistedNamedFragment;
}

export const PersistedNamedFragment:PersistedNamedFragmentFactory = {
	isDecorated( object:object ):object is PersistedNamedFragment {
		// Fallback to `PersistedFragment.isDecorated` since it has not own properties
		return Fragment.isDecorated( object );
	},

	decorate<T extends object>( object:T ):T & PersistedNamedFragment {
		if( PersistedNamedFragment.isDecorated( object ) ) return object;

		const fragment:T & TransientNamedFragment = TransientNamedFragment.decorate( object );
		return Fragment.decorate( fragment );
	},
};
