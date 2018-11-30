import { Pointer } from "./Pointer";


/**
 * Interface with methods to validate pointers.
 */
export interface PointerValidator {
	/**
	 * Returns true if the pointer provided is in the scope of the current service.
	 * @param idOrPointer The ID or pointer to check.
	 */
	inScope( idOrPointer:string | Pointer ):boolean;
}

/**
 * Interface with methods to validate pointers in models.
 */
export interface $PointerValidator {
	/**
	 * Returns true if the pointer provided is in the scope of the current model.
	 * @param idOrPointer The ID or pointer to check.
	 */
	$inScope( idOrPointer:string | Pointer ):boolean;
}
