import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";


/**
 * Properties to create a {@link FreeResources}.
 */
export interface BaseFreeResources {
	/**
	 * Registry where the {@link FreeResources} scope will be in.
	 */
	registry:GeneralRegistry<any>;
}
