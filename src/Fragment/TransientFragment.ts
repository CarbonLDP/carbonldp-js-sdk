import { TransientDocument } from "../Document";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype,
	ModelTypeGuard
} from "../Model";
import { Resource } from "../Resource";
import { BaseFragment } from "./BaseFragment";


export interface TransientFragment extends Resource {
	$document:TransientDocument;
	$registry:TransientDocument;
}


export type TransientFragmentFactory =
	& ModelPrototype<TransientFragment, Resource>
	& ModelDecorator<TransientFragment, BaseFragment>
	& ModelFactory<TransientFragment, BaseFragment>
	& ModelTypeGuard<TransientFragment>
	;

export const TransientFragment:TransientFragmentFactory = {
	PROTOTYPE: {
		get $document( this:TransientFragment ):TransientDocument {
			return this.$registry;
		},
		set $document( this:TransientFragment, document:TransientDocument ) {
			this.$registry = document;
		},
	},


	isDecorated( object:object ):object is TransientFragment {
		return Resource.isDecorated( object )
			;
	},

	decorate<T extends BaseFragment>( object:T ):T & TransientFragment {
		if( TransientFragment.isDecorated( object ) ) return object;

		const target:T & Resource = ModelDecorator
			.decorateMultiple( object, Resource );

		return ModelDecorator
			.definePropertiesFrom( TransientFragment.PROTOTYPE, target );
	},


	is( value:any ):value is TransientFragment {
		return Resource.is( value )
			;
	},

	create<T extends object>( data:T & BaseFragment ):T & TransientFragment {
		const copy:T & BaseFragment = Object.assign( {}, data );
		return TransientFragment.createFrom<T>( copy );
	},

	createFrom<T extends object>( object:T & BaseFragment ):T & TransientFragment {
		return TransientFragment.decorate( object );
	},
};
