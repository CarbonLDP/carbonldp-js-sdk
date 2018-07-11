import { TransientDocument } from "../Document/TransientDocument";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { Resource } from "../Resource/Resource";

import { BaseTransientFragment } from "./BaseTransientFragment";


export interface TransientFragment extends Resource {
	$document:TransientDocument;
	$registry:TransientDocument;
}


export type TransientFragmentFactory =
	& ModelPrototype<TransientFragment & BaseTransientFragment, Resource, "$registry">
	& ModelDecorator<TransientFragment, BaseTransientFragment>
	& ModelFactory<TransientFragment, BaseTransientFragment>
	& ModelTypeGuard<TransientFragment>
	;

export const TransientFragment:TransientFragmentFactory = {
	PROTOTYPE: {
		get $registry():TransientDocument {
			throw new IllegalArgumentError( `Property "$registry" is required.` );
		},

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

	decorate<T extends BaseTransientFragment>( object:T ):T & TransientFragment {
		if( TransientFragment.isDecorated( object ) ) return object;

		const target:T & Resource = ModelDecorator
			.decorateMultiple( object, Resource );

		if( ! target.$registry ) delete target.$registry;

		return ModelDecorator
			.definePropertiesFrom( TransientFragment.PROTOTYPE, target );
	},


	is( value:any ):value is TransientFragment {
		return Resource.is( value )
			;
	},

	create<T extends object>( data:T & BaseTransientFragment ):T & TransientFragment {
		const copy:T & BaseTransientFragment = Object.assign( {}, data );
		return TransientFragment.createFrom<T>( copy );
	},

	createFrom<T extends object>( object:T & BaseTransientFragment ):T & TransientFragment {
		return TransientFragment.decorate( object );
	},
};
