import { Context } from "../Context/Context";
import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { DigestedObjectSchema } from "../ObjectSchema/DigestedObjectSchema";

import { Pointer } from "../Pointer/Pointer";

import { RDFNode } from "../RDF/Node";
import { URI } from "../RDF/URI";

import { BaseRegistry } from "../Registry/BaseRegistry";
import { Registry } from "../Registry/Registry";

import { Resource } from "../Resource/Resource";

import { BaseFreeResources } from "./BaseFreeResources";


export interface FreeResources extends Registry<Resource> {
	registry:GeneralRegistry<any>;

	_getLocalID( id:string ):string;

	_addPointer<T extends object>( base:T & Partial<Pointer> ):T & Resource;


	toJSON( contextOrKey?:Context | string ):RDFNode[];
}


export type OverriddenMembers =
	| "registry"
	| "_getLocalID"
	| "_addPointer"
	;

export interface FreeResourcesUtils {
	parseFreeNodes( registry:GeneralRegistry<any>, freeNodes:RDFNode[] ):FreeResources;
}

export type FreeResourcesFactory =
	& ModelPrototype<FreeResources, Registry, OverriddenMembers>
	& ModelDecorator<FreeResources, BaseFreeResources>
	& ModelTypeGuard<FreeResources>
	& ModelFactory<FreeResources, BaseFreeResources>
	& FreeResourcesUtils
	;

export const FreeResources:FreeResourcesFactory = {
	PROTOTYPE: {
		registry: void 0,

		_getLocalID( this:FreeResources, id:string ):string {
			if( URI.isBNodeID( id ) ) return id;
			throw new IllegalArgumentError( `"${ id }" is out of scope.` );
		},

		_addPointer<T extends object>( this:FreeResources, base:T & Partial<Pointer> ):T & Resource {
			if( ! base.$id ) base.$id = URI.generateBNodeID();
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

		const base:T & BaseRegistry<Resource> = Object.assign<T, Pick<FreeResources, "__modelDecorator">>( object, {
			__modelDecorator: Resource,
		} );

		const resource:T & Registry<Resource> = ModelDecorator
			.decorateMultiple( base, Registry as ModelDecorator<Registry<Resource>, BaseRegistry> );

		return ModelDecorator
			.definePropertiesFrom( FreeResources.PROTOTYPE, resource );
	},


	parseFreeNodes( this:void, registry:GeneralRegistry<any>, freeNodes:RDFNode[] ):FreeResources {
		const freeResources:FreeResources = FreeResources
			.createFrom( { registry: registry } );

		freeNodes
			.forEach( node => {
				const digestedSchema:DigestedObjectSchema = registry.getSchemaFor( node );

				const target:object = freeResources.getPointer( node[ "@id" ], true );
				registry.context.jsonldConverter.compact( node, target, digestedSchema, freeResources );
			} );

		return freeResources;
	},
};

