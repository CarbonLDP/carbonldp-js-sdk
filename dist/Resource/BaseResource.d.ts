import { BasePointer } from "../Pointer/BasePointer";
import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { Registry } from "../Registry/Registry";
export interface BaseResource extends BasePointer {
    types?: string[];
    $registry?: Registry<RegisteredPointer>;
}
