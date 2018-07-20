import { Pointer } from "./Pointer";
export interface PointerLibrary {
    hasPointer(id: string): boolean;
    getPointer(id: string): Pointer;
}
export interface $PointerLibrary extends Pointer {
    $hasPointer(id: string): boolean;
    $getPointer(id: string): Pointer;
}
export declare function _getPointer(pointerLibrary: PointerLibrary | $PointerLibrary, id: string): Pointer;
