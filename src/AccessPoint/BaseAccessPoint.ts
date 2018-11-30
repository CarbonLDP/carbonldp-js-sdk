import { BaseDirectContainer } from "../LDP/DirectContainer";

import { Pointer } from "../Pointer/Pointer";


/**
 * Basic properties to construct a {@link TransientAccessPoint}.
 */
export interface BaseAccessPoint extends BaseDirectContainer {
	/**
	 * The relation the access point will manage.
	 */
	hasMemberRelation:string | Pointer;
	/**
	 * The optional inverted relation the access point will manage.
	 */
	isMemberOfRelation?:string | Pointer;
	/**
	 * The inserted content relation the access point will have.
	 */
	insertedContentRelation?:string | Pointer;
	/**
	 * The parent resource the access point will manage the determined relation.
	 */
	membershipResource?:Pointer;
}
