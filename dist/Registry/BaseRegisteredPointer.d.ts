import { BasePointer } from "../Pointer/BasePointer";
import { Registry } from "./Registry";
export interface BaseRegisteredPointer extends BasePointer {
    $registry: Registry;
}
