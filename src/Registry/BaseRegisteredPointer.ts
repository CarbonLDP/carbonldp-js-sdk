import { BasePointer } from "../Pointer/BasePointer";

import { $Registry, Registry } from "./Registry";


/**
 * Base properties to create a {@link RegisteredPointer}.
 */
export interface BaseRegisteredPointer extends BasePointer {
	/**
	 * The registry the pointer will belong to.
	 */
	$registry:Registry | $Registry | undefined;
}
