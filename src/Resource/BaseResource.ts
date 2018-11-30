import { BasePointer } from "../Pointer/BasePointer";

import { $Registry, Registry } from "../Registry/Registry";


/**
 * Base properties for a {@link Resource}.
 */
export interface BaseResource extends BasePointer {
	/**
	 * Types the resource will have.
	 */
	types?:string[];
	/**
	 * Optional associated registry of the resource.
	 */
	$registry?:Registry | $Registry;
}
