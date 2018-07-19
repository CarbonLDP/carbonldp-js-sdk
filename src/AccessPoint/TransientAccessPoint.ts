import { TransientDirectContainer } from "../LDP/DirectContainer/TransientDirectContainer";

import { ModelFactory } from "../Model/ModelFactory";

import { Pointer } from "../Pointer/Pointer";

import { C } from "../Vocabularies/C";

import { BaseAccessPoint } from "./BaseAccessPoint";


export interface TransientAccessPoint extends TransientDirectContainer {
	hasMemberRelation:Pointer;
	isMemberOfRelation?:Pointer;
	insertedContentRelation?:Pointer;
}


export interface TransientAccessPointFactory extends ModelFactory<TransientAccessPoint> {
	TYPE:C[ "AccessPoint" ];

	is( value:any ):value is TransientAccessPoint;


	create<T extends object>( data:T & BaseAccessPoint ):T & TransientAccessPoint;

	createFrom<T extends object>( object:T & BaseAccessPoint ):T & TransientAccessPoint;
}

export const TransientAccessPoint:TransientAccessPointFactory = {
	TYPE: C.AccessPoint,

	is( value:any ):value is TransientAccessPoint {
		return TransientDirectContainer.is( value );
	},

	create<T extends object>( data:T & BaseAccessPoint ):T & TransientAccessPoint {
		const copy:T & BaseAccessPoint = Object.assign( {}, data );
		return TransientAccessPoint.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseAccessPoint ):T & TransientAccessPoint {
		const accessPoint:T & TransientAccessPoint = TransientDirectContainer
			.createFrom<T>( object );

		accessPoint
			.addType( TransientAccessPoint.TYPE );

		return accessPoint;
	},
};
