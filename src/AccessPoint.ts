import { TransientDirectContainer } from "./LDP/TransientDirectContainer";
import { ModelFactory } from "./ModelFactory";
import { Pointer } from "./Pointer";
import { C } from "./Vocabularies/C";


export interface AccessPointBase {
	hasMemberRelation:string | Pointer;
	isMemberOfRelation?:string | Pointer;
	insertedContentRelation?:string | Pointer;
}

export interface AccessPoint extends TransientDirectContainer {
	hasMemberRelation:Pointer;
	isMemberOfRelation?:Pointer;
	insertedContentRelation?:Pointer;
}


export interface AccessPointFactory extends ModelFactory<AccessPoint> {
	TYPE:string;

	is( object:object ):object is AccessPoint;


	create( membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):AccessPoint;

	createFrom<T extends object>( object:T, membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):T & AccessPoint;
}

export const AccessPoint:AccessPointFactory = {
	TYPE: C.AccessPoint,

	is( object:object ):object is AccessPoint {
		return TransientDirectContainer.is( object );
	},

	create( membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):AccessPoint {
		return AccessPoint.createFrom( {}, membershipResource, hasMemberRelation, isMemberOfRelation );
	},

	createFrom<T extends object>( object:T, membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):T & AccessPoint {
		return <any> TransientDirectContainer.createFrom<T>( object, membershipResource, hasMemberRelation, isMemberOfRelation );
	},
};
