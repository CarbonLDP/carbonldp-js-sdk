import { Pointer } from "./Pointer";


export interface PointerLibrary {
	$hasPointer( id:string ):boolean;

	$getPointer( id:string ):Pointer;
}
