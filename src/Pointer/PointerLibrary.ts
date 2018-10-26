import { Pointer } from "./Pointer";


/**
 * Interface with methods to manage pointers.
 */
export interface PointerLibrary {
	/**
	 * Returns true if the service has a pointer referenced by the URI provided.
	 * @param id The URI of the pointer to check.
	 */
	hasPointer( id:string ):boolean;

	/**
	 * Returns the pointer referenced by the URI provided.
	 * If none exists, an empty new pointer will be created.
	 * @param id The URI of the pointer to get/create.
	 */
	getPointer( id:string ):Pointer;
}

/**
 * Interface with methods to manage pointers in models.
 */
export interface $PointerLibrary extends Pointer {
	/**
	 * Returns true if the model has a pointer referenced by the URI provided.
	 * @param id The URI of the pointer to check.
	 */
	$hasPointer( id:string ):boolean;

	/**
	 * Returns the pointer referenced by the URI provided.
	 * If none exists, an empty new pointer will be created.
	 * @param id The URI of the pointer to get/create.
	 */
	$getPointer( id:string ):Pointer;
}


/**
 * Returns the pointer references by the URI provided using the specified pointer library.
 * @param pointerLibrary Any type of pointer library from where to get the requested pointer.
 * @param id The URI of the pointer to get/create.
 * @package
 */
export function _getPointer( pointerLibrary:PointerLibrary | $PointerLibrary, id:string ):Pointer {
	return "$id" in pointerLibrary ?
		pointerLibrary.$getPointer( id ) :
		pointerLibrary.getPointer( id );
}
