import { BasePointer } from "../Pointer";
import { Registry } from "./Registry";
export interface BaseRegisteredPointer extends BasePointer {
    $registry: Registry;
}
