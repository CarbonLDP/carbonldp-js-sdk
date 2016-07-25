import * as LDP from "./LDP";
import * as NS from "./NS";
import * as Pointer from "./Pointer";
import * as Utils from "./Utils";

export const RDF_CLASS:string = NS.C.Class.AccessPoint;

export interface Class extends LDP.DirectContainer.Class {
	insertedContentRelation?:Pointer.Class;
}

export class Factory {
	static create( membershipResource:Pointer.Class, hasMemberRelation:string | Pointer.Class, memberOfRelation?:string | Pointer.Class ):Class {
		return Factory.createFrom( {}, membershipResource, hasMemberRelation, memberOfRelation );
	}

	static createFrom<T extends Object>( object:T, membershipResource:Pointer.Class, hasMemberRelation:string | Pointer.Class, memberOfRelation?:string | Pointer.Class ):T & Class {
		return <any> LDP.DirectContainer.Factory.createFrom<T>( object, membershipResource, hasMemberRelation, memberOfRelation );
	}
}

export default Class;
