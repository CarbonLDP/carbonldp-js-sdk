import { Document } from "../Document/Document";

import { Pointer } from "../Pointer/Pointer";

import { TransientAccessPoint, TransientAccessPointFactory } from "./TransientAccessPoint";


export interface AccessPoint extends Document {
	membershipResource:Document;
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
		&& Document.is( value )
	,

	create: TransientAccessPoint.create,
	createFrom: TransientAccessPoint.createFrom,
};
