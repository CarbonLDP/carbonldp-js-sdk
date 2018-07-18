import { Pointer } from "./Pointer";
export interface PointerValidator {
    inScope(idOrPointer: string | Pointer): boolean;
}
