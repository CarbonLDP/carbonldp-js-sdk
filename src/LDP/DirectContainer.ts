import { Document } from "../Document";
import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { ModelFactory } from "../ModelFactory";
import { Pointer } from "../Pointer";
import { LDP } from "../Vocabularies/LDP";

interface DirectContainerBase {
	membershipResource:Pointer;
	hasMemberRelation:Pointer;
}

export interface DirectContainer extends Document {
	membershipResource:Pointer;
	hasMemberRelation:Pointer;
}


export interface DirectContainerFactory extends ModelFactory<DirectContainer> {
	TYPE:string;

	is( object:object ):object is DirectContainer;


	create( membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):DirectContainer;

	createFrom<T extends object>( object:T, membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):T & DirectContainer;
}

export const DirectContainer:DirectContainerFactory = {
	TYPE: LDP.DirectContainer,

	is( object:object ):object is DirectContainer {
		return Document.is( object )
			&& object.hasType( DirectContainer.TYPE )
			&& object.hasOwnProperty( "membershipResource" )
			;
	},

	create( membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):DirectContainer {
		return DirectContainer.createFrom( {}, membershipResource, hasMemberRelation, isMemberOfRelation );
	},

	createFrom<T extends object>( object:T, membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):T & DirectContainer {
		if( DirectContainer.is( object ) ) throw new IllegalArgumentError( "The base object is already a DirectContainer." );

		if( ! membershipResource ) throw new IllegalArgumentError( "The property membershipResource is required." );
		if( ! hasMemberRelation ) throw new IllegalArgumentError( "The property hasMemberRelation is required." );

		const containerBase:T & DirectContainerBase = Object.assign( object, {
			membershipResource,
			// TODO: Handle properties correctly and validate them
			hasMemberRelation: <Pointer> hasMemberRelation,
		} );

		const container:T & DirectContainer = Document.is( containerBase ) ?
			containerBase : Document.createFrom( containerBase );

		container.addType( DirectContainer.TYPE );

		// TODO: Handle properties correctly and validate them
		if( isMemberOfRelation ) container.isMemberOfRelation = <Pointer> isMemberOfRelation;

		return container;
	},
};

