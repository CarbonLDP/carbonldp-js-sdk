import { TransientDirectContainer } from "../LDP/DirectContainer/TransientDirectContainer";

import { ModelFactory } from "../Model/ModelFactory";

import { Pointer } from "../Pointer/Pointer";

import { C } from "../Vocabularies/C";

import { BaseAccessPoint } from "./BaseAccessPoint";


/**
 * The in-memory model that represents a `c:AccessPoint`.
 */
export interface TransientAccessPoint extends TransientDirectContainer {
	/**
	 * The relation the access point will manage.
	 */
	hasMemberRelation:Pointer;
	/**
	 * The optional inverted relation the access point will manage.
	 */
	isMemberOfRelation?:Pointer;
	/**
	 * The inserted content relation the access point will have.
	 */
	insertedContentRelation?:Pointer;
}


/**
 * Factory, decorator and utils for {@link TransientAccessPoint} objects.
 */
export interface TransientAccessPointFactory extends ModelFactory<TransientAccessPoint> {
	TYPE:C[ "AccessPoint" ];

	/**
	 * Returns true if the value provided is considered a {@link TransientAccessPoint}.
	 *
	 * @param value
	 */
	is( value:any ):value is TransientAccessPoint;


	/**
	 * Create a {@link TransientAccessPoint} object with the base data specified.
	 *
	 * @param data Data to create the transient access point.
	 */
	create<T extends object>( data:T & BaseAccessPoint ):T & TransientAccessPoint;

	/**
	 * Create a {@link TransientAccessPoint} object from the object specified
	 * containing the base data.
	 *
	 * @param object Object with the base data that will be converted
	 * into an access point.
	 */
	createFrom<T extends object>( object:T & BaseAccessPoint ):T & TransientAccessPoint;
}

/**
 * Constant that implements the {@link TransientAccessPointFactory} interface.
 */
export const TransientAccessPoint:{

	/**
	 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#AccessPoint'
	 */
	TYPE: C["AccessPoint"];

	/**
	 * Returns true when the value provided is considered to be a {@link TransientAccessPoint}.
	 */
	is(value:any):value is TransientAccessPoint;

	/**
	 * Creates a {@link TransientAccessPoint} with the provided data.
	 */
	create<T extends object>( data:T & BaseAccessPoint ): T & TransientAccessPoint;

	/**
	 * Creates a {@link TransientAccessPoint} from the provided Document.
	 */
	createFrom<T extends object>( object:T & BaseAccessPoint ):T & TransientAccessPoint;
} = {
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
			.$addType( TransientAccessPoint.TYPE );

		return accessPoint;
	},
};
