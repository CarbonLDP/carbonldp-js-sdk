import { DirectContainer } from "./LDP/DirectContainer";
import { ModelFactory } from "./ModelFactory";
import { Pointer } from "./Pointer";
import { C } from "./Vocabularies/C";


export interface AccessPointBase {
	hasMemberRelation:string | Pointer;
	isMemberOfRelation?:string | Pointer;
	insertedContentRelation?:string | Pointer;
}

export interface AccessPoint extends DirectContainer {
	hasMemberRelation:Pointer;
	isMemberOfRelation?:Pointer;
	insertedContentRelation?:Pointer;
}


export interface AccessPointConstant extends ModelFactory<AccessPoint> {
	TYPE:string;

	is( object:object ):object is AccessPoint;


	create( membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):AccessPoint;

	createFrom<T extends object>( object:T, membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):T & AccessPoint;
}

export const AccessPoint:AccessPointConstant = {
	TYPE: C.AccessPoint,

	is( object:object ):object is AccessPoint {
		return DirectContainer.is( object );
	},

	create( membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):AccessPoint {
		return AccessPoint.createFrom( {}, membershipResource, hasMemberRelation, isMemberOfRelation );
	},

	createFrom<T extends object>( object:T, membershipResource:Pointer, hasMemberRelation:string | Pointer, isMemberOfRelation?:string | Pointer ):T & AccessPoint {
		return <any> DirectContainer.createFrom<T>( object, membershipResource, hasMemberRelation, isMemberOfRelation );
	},
};

export default AccessPoint;
