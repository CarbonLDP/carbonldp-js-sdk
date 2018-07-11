import { BasePointer } from "../Pointer";
import { RegisteredPointer, Registry } from "../Registry/index";


export interface BaseResource extends BasePointer {
	types?:string[];
	$registry?:Registry<RegisteredPointer>;
}
