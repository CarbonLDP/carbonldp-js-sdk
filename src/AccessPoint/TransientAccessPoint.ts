import { ModelFactory } from "../core/ModelFactory";
import { TransientDirectContainer } from "../LDP";
import { Pointer } from "../Pointer";
import { C } from "../Vocabularies";
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
		return TransientDirectContainer.createFrom<T>( object );
	},
};
