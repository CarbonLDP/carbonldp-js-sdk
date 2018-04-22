import { Document } from "../Document";
import { Fragment } from "../Fragment";
import {
	TransientNamedFragment,
	TransientNamedFragmentFactory,
} from "./TransientNamedFragment";


export interface NamedFragment extends Fragment, TransientNamedFragment {
	_document:Document;
}


export interface NamedFragmentFactory extends TransientNamedFragmentFactory {
	isDecorated( object:object ):object is NamedFragment;

	decorate<T extends object>( object:T ):T & NamedFragment;
}

export const NamedFragment:NamedFragmentFactory = {
	isDecorated( object:object ):object is NamedFragment {
		return Fragment.isDecorated( object );
	},

	is( value:any ):value is NamedFragment {
		return TransientNamedFragment.is( value );
	},

	decorate<T extends object>( object:T ):T & NamedFragment {
		if( NamedFragment.isDecorated( object ) ) return object;

		const fragment:T & TransientNamedFragment = TransientNamedFragment.decorate( object );
		return Fragment.decorate( fragment );
	},

	create: TransientNamedFragment.create,
	createFrom: TransientNamedFragment.createFrom,
};
