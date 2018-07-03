import { Pointer } from "../Pointer";
import { Registry } from "./Registry";


export interface RegisteredPointer extends Pointer {
	$registry:Registry<RegisteredPointer>;
}
