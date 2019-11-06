import { Context } from "../Context/Context";

import { RegisteredPointer } from "../Registry/RegisteredPointer";

import { BaseRepository } from "../Repository/BaseRepository";
import { ResolvablePointer } from "../Repository/ResolvablePointer";


/**
 * Properties for create a {@link GeneralRepository}.
 */
export interface BaseGeneralRepository<MODEL extends ResolvablePointer = ResolvablePointer> extends BaseRepository {
	/**
	 * Context where the repository will belong to.
	 */
	context:Context<MODEL & RegisteredPointer, MODEL>;
}
