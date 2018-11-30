import { BaseDocument } from "../../Document/BaseDocument";
import { Pointer } from "../../Pointer/Pointer";


/**
 * Base properties for a {@link TransientDirectContainer}.
 */
export interface BaseDirectContainer extends BaseDocument {
	/**
	 * The resource the direct container belongs to.
	 */
	membershipResource?:Pointer;
	/**
	 * The relation the direct container will manage.
	 */
	hasMemberRelation:string | Pointer;
	/**
	 * The optional inverted relation the direct container will manage.
	 */
	isMemberOfRelation?:string | Pointer;
}
