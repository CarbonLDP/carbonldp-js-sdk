import * as LDP from "./LDP";
import { Pointer } from "./Pointer";
import { C } from "./Vocabularies/C";

export const RDF_CLASS:string = C.AccessPoint;

export interface Class {
	hasMemberRelation:string | Pointer;
	isMemberOfRelation?:string | Pointer;
	insertedContentRelation?:string | Pointer;
}

export interface DocumentClass extends LDP.DirectContainer.Class {
	hasMemberRelation:Pointer;
	isMemberOfRelation?:Pointer;
	insertedContentRelation?:Pointer;
}

export class Factory {
	static is( object:object ):object is DocumentClass {
		return LDP.DirectContainer.Factory.is( object );
	}

	static create( membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):DocumentClass {
		return Factory.createFrom( {}, membershipResource, hasMemberRelation, isMemberOfRelation );
	}

	static createFrom<T extends object>( object:T, membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):T & DocumentClass {
		return <any> LDP.DirectContainer.Factory.createFrom<T>( object, membershipResource, hasMemberRelation, isMemberOfRelation );
	}
}

export default Class;
