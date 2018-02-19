import * as LDP from "./LDP";
import * as NS from "./Vocabularies/index";
import * as Pointer from "./Pointer";

export const RDF_CLASS:string = NS.C.AccessPoint;

export interface Class {
	hasMemberRelation:string | Pointer.Class;
	isMemberOfRelation?:string | Pointer.Class;
	insertedContentRelation?: string | Pointer.Class;
}

export interface DocumentClass extends LDP.DirectContainer.Class {
	hasMemberRelation:Pointer.Class;
	isMemberOfRelation?:Pointer.Class;
	insertedContentRelation?:Pointer.Class;
}

export class Factory {
	static is( object:object ):object is DocumentClass {
		return LDP.DirectContainer.Factory.is( object );
	}

	static create( membershipResource:Pointer.Class, hasMemberRelation:string | Pointer.Class, isMemberOfRelation?:string | Pointer.Class ):DocumentClass {
		return Factory.createFrom( {}, membershipResource, hasMemberRelation, isMemberOfRelation );
	}

	static createFrom<T extends object>( object:T, membershipResource:Pointer.Class, hasMemberRelation:string | Pointer.Class, isMemberOfRelation?:string | Pointer.Class ):T & DocumentClass {
		return <any> LDP.DirectContainer.Factory.createFrom<T>( object, membershipResource, hasMemberRelation, isMemberOfRelation );
	}
}

export default Class;
