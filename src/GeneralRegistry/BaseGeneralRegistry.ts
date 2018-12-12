import { Context } from "../Context/Context";

import { BaseRegistry } from "../Registry/BaseRegistry";

import { GeneralRegistry } from "./GeneralRegistry";


/**
 * Properties for create a {@link GeneralRegistry}.
 */
export interface BaseGeneralRegistry extends BaseRegistry {
	/**
	 * Context where the registry will belong to.
	 */
	context:Context<any, any>;
	/**
	 * Optional parent registry used to inherit resources and more data.
	 */
	registry?:GeneralRegistry | undefined;
}
