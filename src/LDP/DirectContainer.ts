import { LDP } from "../Vocabularies/LDP";
import { Document } from "./../Document";
import * as Errors from "./../Errors";
import { Pointer } from "./../Pointer";
import * as Utils from "./../Utils";

export const RDF_CLASS:string = LDP.DirectContainer;

export interface Class extends Document {
	membershipResource:Pointer;
}

export class Factory {
	static hasClassProperties( resource:object ):boolean {
		return Utils.hasPropertyDefined( resource, "membershipResource" )
			;
	}

	static is( object:object ):object is Class {
		return Document.is( object )
			&& object.hasType( RDF_CLASS )
			&& Factory.hasClassProperties( object )
			;
	}

	static create( membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):Class {
		return Factory.createFrom( {}, membershipResource, hasMemberRelation, isMemberOfRelation );
	}

	static createFrom<T extends object>( object:T, membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):T & Class {
		if( Factory.is( object ) ) throw new Errors.IllegalArgumentError( "The base object is already a DirectContainer." );
		if( ! membershipResource ) throw new Errors.IllegalArgumentError( "The property membershipResource cannot be null." );
		if( ! hasMemberRelation ) throw new Errors.IllegalArgumentError( "The property hasMemberRelation cannot be empty." );
		if( ! isMemberOfRelation && Utils.isDefined( isMemberOfRelation ) ) throw new Errors.IllegalArgumentError( "The property isMemberOfRelation cannot be empty." );

		let container:T & Class = <any> object;
		if( ! Document.is( object ) ) container = <any> Document.createFrom( object );

		container.types.push( LDP.Container );
		container.types.push( LDP.DirectContainer );

		container.membershipResource = membershipResource;

		// TODO: Handle properties correctly and validate them
		container.hasMemberRelation = <Pointer> hasMemberRelation;
		container.isMemberOfRelation = <Pointer> isMemberOfRelation;

		return container;
	}
}

export default Class;
