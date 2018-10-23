import { Pointer } from "../Pointer/Pointer";

import { BaseResource } from "../Resource/BaseResource";


/**
 * Base configurable properties of a {@link Document}.
 */
export interface BaseDocument extends BaseResource {
	/**
	 * Member relation the document will have.
	 */
	hasMemberRelation?:string | Pointer;
	/**
	 * Optional inverted relation the document will have.
	 */
	isMemberOfRelation?:string | Pointer;
	/**
	 * Inserted relation the document will have.
	 */
	insertedContentRelation?:string | Pointer;
	/**
	 * Default interaction model the document will have when no `Prefer`
	 * interaction header is set in a request.
	 */
	defaultInteractionModel?:string | Pointer;
}
