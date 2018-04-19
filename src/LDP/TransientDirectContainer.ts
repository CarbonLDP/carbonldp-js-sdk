import { TransientDocument } from "../TransientDocument";
import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { ModelFactory } from "../ModelFactory";
import { Pointer } from "../Pointer";
import { LDP } from "../Vocabularies/LDP";

interface DirectContainerBase {
	membershipResource:Pointer;
	hasMemberRelation:Pointer;
}

export interface TransientDirectContainer extends TransientDocument {
	membershipResource:Pointer;
	hasMemberRelation:Pointer;
}


export interface TransientDirectContainerFactory extends ModelFactory<TransientDirectContainer> {
	TYPE:string;

	is( object:object ):object is TransientDirectContainer;


	create( membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):TransientDirectContainer;

	createFrom<T extends object>( object:T, membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):T & TransientDirectContainer;
}

export const TransientDirectContainer:TransientDirectContainerFactory = {
	TYPE: LDP.DirectContainer,

	is( object:object ):object is TransientDirectContainer {
		return TransientDocument.is( object )
			&& object.hasType( TransientDirectContainer.TYPE )
			&& object.hasOwnProperty( "membershipResource" )
			;
	},

	create( membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):TransientDirectContainer {
		return TransientDirectContainer.createFrom( {}, membershipResource, hasMemberRelation, isMemberOfRelation );
	},

	createFrom<T extends object>( object:T, membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):T & TransientDirectContainer {
		if( TransientDirectContainer.is( object ) ) throw new IllegalArgumentError( "The base object is already a DirectContainer." );

		if( ! membershipResource ) throw new IllegalArgumentError( "The property membershipResource is required." );
		if( ! hasMemberRelation ) throw new IllegalArgumentError( "The property hasMemberRelation is required." );

		const containerBase:T & DirectContainerBase = Object.assign( object, {
			membershipResource,
			// TODO: Handle properties correctly and validate them
			hasMemberRelation: <Pointer> hasMemberRelation,
		} );

		const container:T & TransientDirectContainer = TransientDocument.is( containerBase ) ?
			containerBase : TransientDocument.createFrom( containerBase );

		container.addType( TransientDirectContainer.TYPE );

		// TODO: Handle properties correctly and validate them
		if( isMemberOfRelation ) container.isMemberOfRelation = <Pointer> isMemberOfRelation;

		return container;
	},
};

