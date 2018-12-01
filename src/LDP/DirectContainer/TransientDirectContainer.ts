import { TransientDocument } from "../../Document/TransientDocument";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";

import { ModelFactory } from "../../Model/ModelFactory";

import { Pointer } from "../../Pointer/Pointer";

import { LDP } from "../../Vocabularies/LDP";

import { BaseDirectContainer } from "./BaseDirectContainer";

/**
 * The in-memory model that represents a `ldp:DirectContainer`.
 */
export interface TransientDirectContainer extends TransientDocument {
	/**
	 * The resource the direct container belongs to.
	 */
	membershipResource?:Pointer;
	/**
	 * The relation the direct container will manage.
	 */
	hasMemberRelation:Pointer;
}


/**
 * Factory, decorator and utils for {@link TransientDirectContainer}.
 */
// TODO: Change to type-alias
export interface TransientDirectContainerFactory extends ModelFactory<TransientDirectContainer> {
	TYPE:LDP[ "DirectContainer" ];

	is( value:any ):value is TransientDirectContainer;


	create<T extends object>( data:T & BaseDirectContainer ):T & TransientDirectContainer;

	createFrom<T extends object>( object:T & BaseDirectContainer ):T & TransientDirectContainer;
}

/**
 * Constant that implements {@link TransientDirectContainerFactory}.
 */
export const TransientDirectContainer:TransientDirectContainerFactory = {
	TYPE: LDP.DirectContainer,

	is( value:any ):value is TransientDirectContainer {
		return TransientDocument.is( value )
			&& value.$hasType( TransientDirectContainer.TYPE )
			&& value.hasOwnProperty( "hasMemberRelation" )
			;
	},

	create<T extends object>( data:T & BaseDirectContainer ):T & TransientDirectContainer {
		const copy:T & BaseDirectContainer = Object.assign( {}, data );
		return TransientDirectContainer.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseDirectContainer ):T & TransientDirectContainer {
		if( TransientDirectContainer.is( object ) ) throw new IllegalArgumentError( "The base object is already a DirectContainer." );

		if( ! object.hasMemberRelation ) throw new IllegalArgumentError( "The property hasMemberRelation is required." );

		const container:T & TransientDirectContainer = TransientDocument.is( object ) ?
			object : TransientDocument.createFrom( object );

		container.$addType( TransientDirectContainer.TYPE );
		// TODO: Handle properties correctly and validate them (hasMemberRelation, isMemberOfRelation)

		return container;
	},
};

