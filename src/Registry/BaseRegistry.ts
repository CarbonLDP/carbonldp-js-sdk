import { ModelDecorator } from "../Model/ModelDecorator";

import { Pointer } from "../Pointer/Pointer";

import { RegisteredPointer } from "./RegisteredPointer";
import { $Registry, Registry } from "./Registry";


/**
 * Base properties to create a {@link Registry}.
 */
export interface BaseRegistry<MODEL extends RegisteredPointer = RegisteredPointer> {
	/**
	 * Parent registry the new registry will have.
	 */
	registry?:Registry | $Registry;

	/**
	 * Decorator object that will personalize the pointers of the registry.
	 */
	__modelDecorator:ModelDecorator<MODEL>;
}

/**
 * Base properties to create a {@link $Registry}.
 */
export interface $BaseRegistry<MODEL extends RegisteredPointer = RegisteredPointer> extends Pointer {
	/**
	 * Parent registry the new registry will have.
	 */
	$registry?:Registry | $Registry;

	/**
	 * Decorator object that will personalize the pointers of the registry.
	 */
	$__modelDecorator:ModelDecorator<MODEL>;
}
