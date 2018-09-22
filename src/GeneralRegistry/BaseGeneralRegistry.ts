import { Context } from "../Context/Context";

import { BaseRegistry } from "../Registry/BaseRegistry";

import { GeneralRegistry } from "./GeneralRegistry";


export interface BaseGeneralRegistry extends BaseRegistry {
	context:Context;
	registry?:GeneralRegistry | undefined;
}
