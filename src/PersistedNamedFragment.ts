import { ModelDecorator } from "./ModelDecorator";
import { NamedFragment } from "./NamedFragment";
import { PersistedDocument } from "./PersistedDocument";
import { PersistedFragment } from "./PersistedFragment";


export interface PersistedNamedFragment extends PersistedFragment, NamedFragment {
	_document:PersistedDocument;
}


export interface PersistedNamedFragmentConstant extends ModelDecorator<PersistedNamedFragment> {
	isDecorated( object:object ):object is PersistedNamedFragment;

	decorate<T extends object>( object:T ):T & PersistedNamedFragment;
}

export const PersistedNamedFragment:PersistedNamedFragmentConstant = {
	isDecorated( object:object ):object is PersistedNamedFragment {
		// Fallback to `PersistedFragment.isDecorated` since it has not own properties
		return PersistedFragment.isDecorated( object );
	},

	decorate<T extends object>( object:T ):T & PersistedNamedFragment {
		if( PersistedNamedFragment.isDecorated( object ) ) return object;

		const fragment:T & NamedFragment = NamedFragment.decorate( object );
		return PersistedFragment.decorate( fragment );
	},
};

export default PersistedNamedFragment;
