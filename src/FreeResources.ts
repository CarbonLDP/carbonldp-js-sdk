import { Context } from "./Context";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype,
	ModelTypeGuard,
} from "./Model";
import {
	RDFNode,
	URI,
} from "./RDF";
import {
	GeneralRegistry,
	Registry,
} from "./Registry";
import { Resource } from "./Resource";


export interface BaseFreeResources {
	$registry:GeneralRegistry;
}


export interface FreeResources extends Registry<Resource> {
	$registry:GeneralRegistry;

	_getLocalID( id:string ):string;

	_addPointer<T extends object>( base:T & { id?:string } ):T & Resource;


	toJSON( registryOrKey:Context | string ):RDFNode[];
}


export type OverloadedMembers =
	| "$registry"
	| "_getLocalID"
	| "_addPointer"
	| "__modelDecorator"
	;

export type FreeResourcesFactory =
	& ModelPrototype<FreeResources, Registry, OverloadedMembers>
	& ModelDecorator<FreeResources, BaseFreeResources>
	& ModelTypeGuard<FreeResources>
	& ModelFactory<FreeResources, BaseFreeResources>
	;

export const FreeResources:FreeResourcesFactory = {
	PROTOTYPE: {
		$registry: void 0,

		__modelDecorator: Resource,


		_getLocalID( this:FreeResources, id:string ):string {
			if( URI.isBNodeID( id ) ) return id;
			return Registry.PROTOTYPE._getLocalID.call( this, id );
		},

		_addPointer<T extends object>( this:FreeResources, base:T & { id?:string } ):T & Resource {
			if( ! base.id ) base.id = URI.generateBNodeID();
			return Registry.PROTOTYPE._addPointer.call( this, base );
		},


		toJSON( this:FreeResources, contextOrKey?:Context | string ):RDFNode[] {
			return this
				.getPointers( true )
				.map( resource => resource.toJSON( contextOrKey ) )
				;
		},
	},


	is( value:any ):value is FreeResources {
		return Registry.isDecorated( value )
			&& FreeResources.isDecorated( value )
			;
	},

	isDecorated( object:object ):object is FreeResources {
		return ModelDecorator
			.hasPropertiesFrom( FreeResources.PROTOTYPE, object );
	},


	create<T extends object>( data:T & BaseFreeResources ):T & FreeResources {
		const copy:T & BaseFreeResources = Object.assign( {}, data );
		return FreeResources.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseFreeResources ):T & FreeResources {
		return FreeResources.decorate( object );
	},

	decorate<T extends BaseFreeResources>( object:T ):T & FreeResources {
		if( FreeResources.isDecorated( object ) ) return object;

		const resource:T & Registry<Resource> = ModelDecorator
			.decorateMultiple( object, Registry );

		return ModelDecorator
			.definePropertiesFrom( FreeResources.PROTOTYPE, resource );
	},
};

