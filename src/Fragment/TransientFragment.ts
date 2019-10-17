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
 * Constant with the factory, decorator and/or utils for a {@link TransientFragment} object.
 */
export const TransientFragment:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link TransientFragment}.
	 */
	PROTOTYPE: TransientFragmentFactory["PROTOTYPE"];

	/**
	 * Checks if the TransientFragment has the decorated properties and methods from its prototype.
	 */
	isDecorated( object:object): object is TransientFragment;

	/**
	 * Returns true when the value provided is considered to be a {@link TransientFragment}.
	 */
	is( value:any ):value is TransientFragment;

	/**
	 * Defines the TransientFragment's prototype properties and methods to the document TransientFragment.
	 */
	decorate<T extends object>( object:T &  BaseTransientFragment ):T & TransientFragment;

	/**
	 * Creates a {@link TransientFragment} with the provided data.
	 */
	create<T extends object>( data:T & BaseTransientFragment ):T & TransientFragment;

	/**
	 * Creates a {@link TransientFragment} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseTransientFragment ):T & TransientFragment;
} = {
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
