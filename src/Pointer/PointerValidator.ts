import { Pointer } from "./Pointer";


export interface PointerValidator {
	inScope( idOrPointer:string | Pointer ):boolean;
}

export interface $PointerValidator {
	$inScope( idOrPointer:string | Pointer ):boolean;
}
