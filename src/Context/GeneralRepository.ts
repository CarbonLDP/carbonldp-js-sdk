import { RegisteredPointer } from "../Registry";
import {
	Repository,
	ResolvablePointer
} from "../Repository";
import { Context } from "./Context";

export interface GeneralRepository<M extends ResolvablePointer = ResolvablePointer> extends Repository<ResolvablePointer> {
	$context:Context<ResolvablePointer & RegisteredPointer, ResolvablePointer>;
}
