import { ModelDecorator } from "./ModelDecorator";
import { NamedFragment } from "./NamedFragment";
import { Document } from "./Document";
import { Fragment } from "./Fragment";


export interface PersistedNamedFragment extends Fragment, NamedFragment {
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

		const fragment:T & NamedFragment = NamedFragment.decorate( object );
		return Fragment.decorate( fragment );
	},
};
