import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { Repository } from "../Repository/Repository";
import { ResolvablePointer } from "../Repository/ResolvablePointer";
import { Context } from "./Context";


export interface GeneralRepository<MODEL extends ResolvablePointer = ResolvablePointer> extends Repository<ResolvablePointer> {
	$context:Context<MODEL & RegisteredPointer, MODEL>;
}
