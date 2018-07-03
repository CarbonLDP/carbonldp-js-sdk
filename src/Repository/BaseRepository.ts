import { Context } from "../Context";
import { RegisteredPointer } from "../Registry";
import { ResolvablePointer } from "./ResolvablePointer";


export interface BaseRepository {
	$context:Context<ResolvablePointer & RegisteredPointer>;
}
