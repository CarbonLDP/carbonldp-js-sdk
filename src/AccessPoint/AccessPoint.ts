import { Pointer } from "../Pointer";
import { ProtectedDocument } from "../ProtectedDocument";
import {
	TransientAccessPoint,
	TransientAccessPointFactory,
} from "./TransientAccessPoint";


export interface AccessPoint extends ProtectedDocument {
	membershipResource:Pointer;
	hasMemberRelation:Pointer;
	isMemberOfRelation?:Pointer;
	insertedContentRelation?:Pointer;
}

export interface AccessPointFactory extends TransientAccessPointFactory {
	is( value:any ):value is AccessPoint;
}

export const AccessPoint:AccessPointFactory = {
	TYPE: TransientAccessPoint.TYPE,

	is: ( value ):value is AccessPoint =>
		TransientAccessPoint.is( value )
		&& ProtectedDocument.is( value )
	,

	create: TransientAccessPoint.create,
	createFrom: TransientAccessPoint.createFrom,
};
