import { TransientDocument } from "../Document/TransientDocument";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { URI } from "../RDF/URI";

import { Resource } from "../Resource/Resource";

import { BaseTransientFragment } from "./BaseTransientFragment";


/**
 * In-memory model that represents a fragment of `c:Document`.
 */
export interface TransientFragment extends Resource {
	/**
	 * The document the fragment belongs to.
	 */
	$document:TransientDocument;
	/**
	 * Registry where the fragment belongs to.
	 */
	$registry:TransientDocument;
}


export type OverriddenMembers =
	| "$registry"
	| "$id"
	| "$slug"
	;

/**
 * Factory, decorator and utils for {@link TransientFragment}.
 */
export type TransientFragmentFactory =
	& ModelPrototype<TransientFragment & BaseTransientFragment, Resource, OverriddenMembers>
	& ModelDecorator<TransientFragment, BaseTransientFragment>
	& ModelFactory<TransientFragment, BaseTransientFragment>
	& ModelTypeGuard<TransientFragment>
	;

/**
 * Constant that implements {@link TransientFragmentFactory}.
 */
export const TransientFragment:TransientFragmentFactory = {
	PROTOTYPE: {
		get $registry():TransientDocument {
			throw new IllegalArgumentError( `Property "$registry" is required.` );
		},


		get $slug():string {
			return URI.generateBNodeID();
		},

		get $id( this:TransientFragment ):string {
			if( URI.isBNodeID( this.$slug ) ) return this.$slug;
			return this.$document.$id + "#" + this.$slug;
		},
		set $id( this:TransientFragment, value:string ) {
			if( URI.isBNodeID( value ) ) this.$slug = value;
			else this.$slug = URI.getFragment( value );
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
		if( ! target.$slug ) delete target.$slug;

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
