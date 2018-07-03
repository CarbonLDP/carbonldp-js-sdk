import {
	ModelDecorator,
	ModelFactory,
} from "./core";
import { JSONLDConverter } from "./JSONLD";
import { DigestedObjectSchema } from "./ObjectSchema";
import { Pointer } from "./Pointer";
import {
	RDFNode,
	URI,
} from "./RDF";
import {
	Registry,
	RegistryService,
} from "./Registry";
import { TransientResource } from "./Resource";
import {
	isObject,
	PickSelfProps
} from "./Utils";


export interface BaseFreeResources {
	_registry:RegistryService<Pointer, any>;
}


export interface FreeResources extends Registry<TransientResource> {
	$parentRegistry:RegistryService<Pointer, any> | undefined;


	__getLocalID( id:string ):string;

	_addPointer<T extends object>( base:T & { id?:string } ):T & TransientResource;


	toJSON():RDFNode[];
}

type OverloadedProps =
	| "$parentRegistry"
	| "__getLocalID"
	| "_addPointer"
	;

const PROTOTYPE:PickSelfProps<FreeResources, Registry<TransientResource>, OverloadedProps> = {
	$parentRegistry: void 0,


	__getLocalID( this:FreeResources, id:string ):string {
		if( URI.isBNodeID( id ) ) return id;
		return Registry.PROTOTYPE.__getLocalID.call( this, id );
	},

	_addPointer<T extends object>( this:FreeResources, base:T & { id?:string } ):T & TransientResource {
		if( ! base.id ) base.id = URI.generateBNodeID();
		const pointer:T & Pointer = Registry.PROTOTYPE._addPointer.call( this, base );

		return TransientResource.decorate( pointer );
	},


	toJSON( this:FreeResources ):RDFNode[] {
		const generalSchema:DigestedObjectSchema = this.$parentRegistry ?
			this.$parentRegistry.getGeneralSchema() : new DigestedObjectSchema();
		const jsonldConverter:JSONLDConverter = this.$parentRegistry ?
			this.$parentRegistry.jsonldConverter : new JSONLDConverter();

		return this
			.getPointers( true )
			.map( resource => {
				const resourceSchema:DigestedObjectSchema = this.$parentRegistry ?
					this.$parentRegistry.getSchemaFor( resource ) : generalSchema;

				return jsonldConverter.expand( resource, generalSchema, resourceSchema );
			} )
			;
	},
};


export interface FreeResourcesFactory extends ModelFactory<FreeResources>, ModelDecorator<FreeResources, BaseFreeResources> {
	PROTOTYPE:PickSelfProps<FreeResources,
		Registry<TransientResource>,
		| "$parentRegistry"
		| "__getLocalID"
		| "_addPointer">;


	is( value:any ):value is FreeResources;

	isDecorated( object:object ):object is FreeResources;


	create<T extends object>( data:T & BaseFreeResources ):T & FreeResources;

	createFrom<T extends object>( object:T & BaseFreeResources ):T & FreeResources;

	decorate<T extends object>( object:T ):T & FreeResources;
}

export const FreeResources:FreeResourcesFactory = {
	PROTOTYPE,


	is( value:any ):value is FreeResources {
		return Registry.isDecorated( value )
			&& FreeResources.isDecorated( value )
			;
	},

	isDecorated( object:object ):object is FreeResources {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object )
			;
	},


	create<T extends object>( data:T & BaseFreeResources ):T & FreeResources {
		const copy:T & BaseFreeResources = Object.assign( {}, data );
		return FreeResources.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseFreeResources ):T & FreeResources {
		return FreeResources.decorate( object );
	},

	decorate<T extends object>( object:T ):T & FreeResources {
		if( FreeResources.isDecorated( object ) ) return object;

		const resource:T & Registry<TransientResource> = Registry.decorate( object );
		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},
};

