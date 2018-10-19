import { Document } from "../Document/Document";

import { Pointer } from "../Pointer/Pointer";

import { TransientAccessPoint, TransientAccessPointFactory } from "./TransientAccessPoint";


/**
 * Model that represents and `c:AccessPoint`.
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
 * Constant that implements the {@link AccessPointFactory} interface.
 */
export const AccessPoint:AccessPointFactory = {
	TYPE: TransientAccessPoint.TYPE,

	is: ( value ):value is AccessPoint =>
		TransientAccessPoint.is( value )
		&& Document.is( value )
	,

	create: TransientAccessPoint.create,
	createFrom: TransientAccessPoint.createFrom,
};
