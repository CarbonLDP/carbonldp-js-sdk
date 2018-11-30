import { BasePointer } from "../Pointer/BasePointer";

import { $Repository, Repository } from "./Repository";


/**
 * Base properties to create a {@link ResolvablePointer}.
 */
export interface BaseResolvablePointer extends BasePointer {
	/**
	 * Repository with request methods associated to the resource to create.
	 */
	$repository:Repository | $Repository;
}
