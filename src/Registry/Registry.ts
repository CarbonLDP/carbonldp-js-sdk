import { Context } from "../Context";
import { ModelDecorator } from "../core";
import {
	IDAlreadyInUseError,
	IllegalStateError,
	IllegalArgumentError,
} from "../Errors";
import { ObjectSchemaUtils } from "../ObjectSchema";
import {
	Pointer,
	PointerLibrary,
	PointerValidator,
} from "../Pointer";
import {
	isObject,
	PickSelfProps
} from "../Utils";


export interface BaseRegistry<M extends Pointer> {
	_context?:Context;
	_registry?:Registry<any>;

	_model:ModelDecorator<M>;
}


export interface Registry<M extends Pointer> extends PointerLibrary, PointerValidator {
	_context:Context | undefined;
	_registry:Registry<any> | undefined;

	readonly _resourcesMap:Map<string, M>;


	inScope( idOrPointer:string | Pointer ):boolean;


	hasPointer( id:string ):boolean;
	hasPointer( id:string, local:true ):boolean;

	getPointer( id:string ):Pointer;
	getPointer( id:string, local:true ):M;

	getPointers():Pointer[];
	getPointers( local:true ):M[];

	removePointer( idOrPointer:string | Pointer ):boolean;
	removePointer( idOrPointer:string | Pointer, local:true ):boolean;


	_getLocalID( id:string ):string | null;

	_register<T extends object>( base:T & { id:string } ):T & M;
}


const PROTOTYPE:PickSelfProps<Registry<Pointer>, {}> = {
	get _resourcesMap():Map<string, Pointer> { return new Map(); },

	_context: void 0,
	_registry: void 0,


	inScope( this:Registry<Pointer>, idOrPointer:string | Pointer ):boolean {
		try {
			const id:string = Pointer.getID( idOrPointer );
			return this._getLocalID( id ) !== null;
		} catch {
			return false;
		}
	},


	hasPointer( this:Registry<Pointer>, id:string, local?:true ):boolean {
		if( ! this.inScope( id ) ) {
			if( local === true || ! this._registry ) return false;
			return this._registry.hasPointer( id );
		}

		const localID:string = this._getLocalID( id );
		return this._resourcesMap.has( localID );
	},

	getPointer( this:Registry<Pointer>, id:string, local?:true ):Pointer {
		if( ! this.inScope( id ) ) {
			if( local === true || ! this._registry ) throw new IllegalArgumentError( `"${ id }" is outside scope.` );
			return this._registry.getPointer( id );
		}

		const localID:string = this._getLocalID( id );
		if( this._resourcesMap.has( localID ) ) return this._resourcesMap.get( localID );

		return this._register( { id } );
	},

	getPointers( this:Registry<Pointer>, local?:true ):Pointer[] {
		const pointers:Pointer[] = Array.from( this._resourcesMap.values() );
		if( local === true || ! this._registry ) return pointers;

		return [
			...this._registry.getPointers(),
			...pointers,
		];
	},

	removePointer( this:Registry<Pointer>, idOrPointer:string | Pointer, local?:true ):boolean {
		const id:string = Pointer.getID( idOrPointer );

		if( ! this.inScope( id ) ) {
			if( local === true || ! this._registry ) return false;
			return this._registry.removePointer( idOrPointer );
		}

		const localID:string = this._getLocalID( id );
		return this._resourcesMap.delete( localID );
	},


	_getLocalID( this:Registry<Pointer>, id:string ):string | null {
		if( ! this._context ) return id;
		return ObjectSchemaUtils.resolveURI( id, this._context.getObjectSchema() );
	},

	_register<T extends object>( this:Registry<Pointer>, base:T & { id:string } ):T & Pointer {
		if( ! base.id ) throw new IllegalArgumentError( "The resource ID is required." );

		const localID:string = this._getLocalID( base.id );

		if( localID === null ) throw new IllegalArgumentError( `"${ base.id }" is outside scope.` );
		if( this._resourcesMap.has( localID ) ) throw new IDAlreadyInUseError( `"${ base.id }" is already being used.` );

		const resource:T & Pointer = Pointer.decorate( base );
		resource._registry = this;

		this._resourcesMap.set( localID, resource );
		return resource;
	},
};


export interface RegistryFactory {
	PROTOTYPE:PickSelfProps<Registry<Pointer>, {}>;

	isDecorated( object:object ):object is Registry<any>;

	decorate<T extends object>( object:T ):T & Registry<any>;


	create<T extends object, M extends Pointer>( base:T & BaseRegistry<M> ):T & Registry<M>;
}

export const Registry:RegistryFactory = {
	PROTOTYPE,

	isDecorated( object:object ):object is Registry<any> {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object )
			;
	},

	decorate<T extends object>( object:T ):T & Registry<any> {
		if( Registry.isDecorated( object ) ) return object;

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, object );
	},

	create<T extends object, M extends Pointer>( base:T & BaseRegistry<M> ):T & Registry<M> {
		const copy:T & BaseRegistry<M> = Object.assign( {}, base );
		return Registry.decorate( copy );
	},
};
