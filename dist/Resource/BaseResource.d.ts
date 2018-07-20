import { BasePointer } from "../Pointer/BasePointer";
import { $Registry, Registry } from "../Registry/Registry";
export interface BaseResource extends BasePointer {
    types?: string[];
    $registry?: Registry | $Registry;
}
