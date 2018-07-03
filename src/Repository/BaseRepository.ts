import { Context } from "../Context";
import { RegisteredPointer } from "../Registry";
import { ResolvablePointer } from "./ResolvablePointer";


export interface BaseRepository<M extends ResolvablePointer = ResolvablePointer> {
	readonly $context:Context<RegisteredPointer & M, M>;
}
