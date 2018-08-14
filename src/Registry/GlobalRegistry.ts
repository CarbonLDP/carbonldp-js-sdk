import { GlobalContext } from "../Context/GlobalContext";

import { BaseGeneralRegistry } from "../GeneralRegistry/BaseGeneralRegistry";
import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { ModelFactory } from "../Model/ModelFactory";

import { RegisteredPointer } from "./RegisteredPointer";


export interface BaseGlobalRegistry {
	context:GlobalContext;
}


export interface GlobalRegistry extends GeneralRegistry<RegisteredPointer> {
	context:GlobalContext;
	registry:undefined;
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
		const baseObject:T & BaseGlobalRegistry & BaseGeneralRegistry = Object.assign( object, {
			__modelDecorator: RegisteredPointer,
		} );

		// FIXME
		return GeneralRegistry.createFrom( baseObject as any );
	},
};
