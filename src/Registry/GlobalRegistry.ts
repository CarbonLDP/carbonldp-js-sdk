import { GlobalContext } from "../Context/GlobalContext";

import { BaseGeneralRegistry } from "../GeneralRegistry/BaseGeneralRegistry";
import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { ModelFactory } from "../Model/ModelFactory";

import { RegisteredPointer } from "./RegisteredPointer";


/**
 * Base properties to create a {@link GlobalRegistry}.
 */
export interface BaseGlobalRegistry {
	/**
	 * Global context where the registry will belong to.
	 */
	context:GlobalContext;
}


export interface GlobalRegistry extends GeneralRegistry<RegisteredPointer> {
	/**
	 * Global context where the registry belongs to.
	 */
	context:GlobalContext;
	/**
	 * Been the global registry, it cannot have a parent registry.
	 */
	registry:undefined;
}


/**
 * Factory, decorator and utils for {@link GlobalRegistry}.
 */
export type GlobalRegistryFactory =
	& ModelFactory<GlobalRegistry, BaseGlobalRegistry>
	;

/**
 * Constant that implements {@link GlobalRegistryFactory}
 */
export const GlobalRegistry:{
	/**
	 * Creates a {@link GlobalRegistry} with the provided data.
	 */
	create<T extends object>( data:T & BaseGlobalRegistry ):T & GlobalRegistry;

	/**
	 * Creates a {@link GlobalRegistry} from the provided GlobalRegistry.
	 */
	createFrom<T extends object>( object:T & BaseGlobalRegistry ):T & GlobalRegistry;
} = {
	create<T extends object>( data:T & BaseGlobalRegistry ):T & GlobalRegistry {
		// FIXME: TS 3.0
		return GlobalRegistry.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseGlobalRegistry ):T & GlobalRegistry {
		const baseObject:T & BaseGlobalRegistry & BaseGeneralRegistry = Object.assign( object, {
			__modelDecorator: RegisteredPointer,
		} );

		// FIXME
		return GeneralRegistry.createFrom( baseObject as any );
	},
};
