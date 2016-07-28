import * as LDP from "./LDP";
import * as NS from "./NS";
import * as Pointer from "./Pointer";
import * as Utils from "./Utils";

export const RDF_CLASS:string = NS.C.Class.AccessPoint;

export interface Class {
	hasMemberRelation:string | Pointer.Class;
	isMemberOfRelation?:string | Pointer.Class;
	insertedContentRelation?: string | Pointer.Class;
}

export interface DocumentClass extends LDP.DirectContainer.Class {
	membershipResource:Pointer.Class;
	hasMemberRelation:Pointer.Class;
	insertedContentRelation?:Pointer.Class;
}

export class Factory {
	static is( object:Object ):boolean {
		return LDP.DirectContainer.Factory.is( object );
	}

	static create( membershipResource:Pointer.Class, hasMemberRelation:string | Pointer.Class, isMemberOfRelation?:string | Pointer.Class ):DocumentClass {
		return Factory.createFrom( {}, membershipResource, hasMemberRelation, isMemberOfRelation );
	}

	static createFrom<T extends Object>( object:T, membershipResource:Pointer.Class, hasMemberRelation:string | Pointer.Class, isMemberOfRelation?:string | Pointer.Class ):T & DocumentClass {
		return <any> LDP.DirectContainer.Factory.createFrom<T>( object, membershipResource, hasMemberRelation, isMemberOfRelation );
	}
}

export default Class;
