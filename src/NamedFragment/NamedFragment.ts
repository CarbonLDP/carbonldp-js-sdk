import { ModelDecorator } from "../Model";
import { Fragment } from "../Fragment";
import {
	TransientNamedFragment,
	TransientNamedFragmentFactory,
} from "./TransientNamedFragment";


export interface NamedFragment extends Fragment, TransientNamedFragment {
}


export interface NamedFragmentFactory extends TransientNamedFragmentFactory {
	isDecorated( object:object ):object is NamedFragment;

	decorate<T extends object>( object:T ):T & NamedFragment;


	is( value:any ):value is NamedFragment;
}

export const NamedFragment:NamedFragmentFactory = {
	isDecorated( object:object ):object is NamedFragment {
		return TransientNamedFragment.isDecorated( object )
			&& Fragment.isDecorated( object )
			;
	},

	is( value:any ):value is NamedFragment {
		return TransientNamedFragment.is( value )
			&& Fragment.isDecorated( value );
	},

	decorate<T extends object>( object:T ):T & NamedFragment {
		if( NamedFragment.isDecorated( object ) ) return object;

		return ModelDecorator
			.decorateMultiple( object, TransientNamedFragment, Fragment );
	},

	create: TransientNamedFragment.create,
	createFrom: TransientNamedFragment.createFrom,
};
