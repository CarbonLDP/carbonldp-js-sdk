import { Document } from "../Document/Document";

import { Pointer } from "../Pointer/Pointer";

import { TransientAccessPoint, TransientAccessPointFactory } from "./TransientAccessPoint";
import { BaseAccessPoint } from './BaseAccessPoint';
import { C } from '../Vocabularies/C';


/**
 * Model that represents a `c:AccessPoint`.
 */
export interface AccessPoint extends Document {
	/**
	 * The resource the access point belongs to.
	 */
	membershipResource?:Document;
	/**
	 * The relation the access point manages.
	 */
	hasMemberRelation?:Pointer;
	/**
	 * The optional inverted relation the access point also manages.
	 */
	isMemberOfRelation?:Pointer;
	/**
	 * The inserted content relation the access point have.
	 */
	insertedContentRelation?:Pointer;
}

/**
 * Factory, decorator and utils of a {@link AccessPoint} object.
 */
export interface AccessPointFactory {
	/**
	 * @see {@link TransientAccessPointFactory.TYPE}
	 */
	TYPE:TransientAccessPointFactory[ "TYPE" ];

	/**
	 * @see {@link TransientAccessPointFactory.create}
	 */
	create:TransientAccessPointFactory[ "create" ];

	/**
	 * @see {@link TransientAccessPoint.createFrom}
	 */
	createFrom:TransientAccessPointFactory[ "createFrom" ];

	/**
	 * Returns true if the value provided is considered an {@link AccessPoint}.
	 *
	 * @param value Element to be checked.
	 */
	is( value:any ):value is AccessPoint;
}

/**
 * Constant with the factory, decorator and/or utils for an {@link AccessPoint} object.
 */
export const AccessPoint: {

	/**
	 * Type of the model, in this case: `https://carbonldp.com/ns/v1/platform#AccessPoint`.
	 */
	TYPE: C["AccessPoint"];

	/**
	 * Returns true when the value provided is considered to be an {@link AccessPoint}.
	 */
	is( value:any ):value is AccessPoint;

	/**
	 * Creates a {@link AccessPoint} with the provided data.
	 */
	create<T extends object>( data:T & BaseAccessPoint ): T & TransientAccessPoint;

	/**
	 * Creates a {@link AccessPoint} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseAccessPoint ):T & TransientAccessPoint;
} = <AccessPointFactory> {
	TYPE: TransientAccessPoint.TYPE,

	is: ( value ):value is AccessPoint =>
		TransientAccessPoint.is( value )
		&& Document.is( value )
	,

	create: TransientAccessPoint.create,
	createFrom: TransientAccessPoint.createFrom,
};
