import { ModelDecorator } from "./ModelDecorator";
import { TransientNamedFragment } from "./TransientNamedFragment";
import { Document } from "./Document";
import { Fragment } from "./Fragment";


export interface NamedFragment extends Fragment, TransientNamedFragment {
	_document:Document;
}


export interface NamedFragmentFactory extends ModelDecorator<NamedFragment> {
	isDecorated( object:object ):object is NamedFragment;

	decorate<T extends object>( object:T ):T & NamedFragment;
}

export const NamedFragment:NamedFragmentFactory = {
	isDecorated( object:object ):object is NamedFragment {
		// Fallback to `Fragment.isDecorated` since it has not own properties
		return Fragment.isDecorated( object );
	},

	decorate<T extends object>( object:T ):T & NamedFragment {
		if( NamedFragment.isDecorated( object ) ) return object;

		const fragment:T & TransientNamedFragment = TransientNamedFragment.decorate( object );
		return Fragment.decorate( fragment );
	},
};
