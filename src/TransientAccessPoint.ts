import { TransientDirectContainer } from "./LDP/TransientDirectContainer";
import { ModelFactory } from "./ModelFactory";
import { Pointer } from "./Pointer";
import { C } from "./Vocabularies/C";


export interface AccessPointBase {
	hasMemberRelation:string | Pointer;
	isMemberOfRelation?:string | Pointer;
	insertedContentRelation?:string | Pointer;
}

export interface TransientAccessPoint extends TransientDirectContainer {
	hasMemberRelation:Pointer;
	isMemberOfRelation?:Pointer;
	insertedContentRelation?:Pointer;
}


export interface TransientAccessPointFactory extends ModelFactory<TransientAccessPoint> {
	TYPE:string;

	is( object:object ):object is TransientAccessPoint;


	create( membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):TransientAccessPoint;

	createFrom<T extends object>( object:T, membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):T & TransientAccessPoint;
}

export const TransientAccessPoint:TransientAccessPointFactory = {
	TYPE: C.AccessPoint,

	is( object:object ):object is TransientAccessPoint {
		return TransientDirectContainer.is( object );
	},

	create( membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):TransientAccessPoint {
		return TransientAccessPoint.createFrom( {}, membershipResource, hasMemberRelation, isMemberOfRelation );
	},

	createFrom<T extends object>( object:T, membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):T & TransientAccessPoint {
		return <any> TransientDirectContainer.createFrom<T>( object, membershipResource, hasMemberRelation, isMemberOfRelation );
	},
};
