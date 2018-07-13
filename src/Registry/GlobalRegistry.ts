import { Context } from "../Context";
import { ModelFactory } from "../Model";
import { BaseRegistry } from "./BaseRegistry";
import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";
import { RegisteredPointer } from "./RegisteredPointer";


// FIXME: GlobalContext
export interface BaseGlobalRegistry {
	// $context:GlobalContext;
	$context:Context;
}


export interface GlobalRegistry extends GeneralRegistry<RegisteredPointer> {
	// $context:GlobalContext;
}


export type GlobalRegistryFactory =
	& ModelFactory<GlobalRegistry, BaseGlobalRegistry>
	;

export const GlobalRegistry:GlobalRegistryFactory = {
	create<T extends object>( data:T & BaseGlobalRegistry ):T & GlobalRegistry {
		// FIXME: TS 3.0
		return GlobalRegistry.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseGlobalRegistry ):T & GlobalRegistry {
		const baseObject:T & BaseRegistry = Object.assign( object, {
			__modelDecorator: RegisteredPointer,
		} );

		return GeneralRegistry.createFrom( baseObject );
	},
};
