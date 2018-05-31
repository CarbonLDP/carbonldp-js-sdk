import { ModelDecorator } from "../core";
import {
	IDAlreadyInUseError,
	IllegalArgumentError,
} from "../Errors";
import {
	Pointer,
	PointerLibrary,
	PointerValidator,
} from "../Pointer";
import {
	isObject,
	PickSelfProps
} from "../Utils";


export interface Registry<M extends Pointer> extends PointerLibrary, PointerValidator {
	_registry:Registry<any> | undefined;

	readonly _resourcesMap:Map<string, M>;


	inScope( idOrPointer:string | Pointer ):boolean;
	inScope( idOrPointer:string | Pointer, local:true ):boolean;


	hasPointer( id:string ):boolean;
	hasPointer( id:string, local:true ):boolean;

	getPointer( id:string ):Pointer;
	getPointer( id:string, local:true ):M;

	getPointers():Pointer[];
	getPointers( local:true ):M[];

	removePointer( idOrPointer:string | Pointer ):boolean;
	removePointer( idOrPointer:string | Pointer, local:true ):boolean;


	_getLocalID( id:string ):string;

	_register<T extends object>( base:T & { id:string } ):T & M;
}


const PROTOTYPE:PickSelfProps<Registry<Pointer>, {}> = {
	get _resourcesMap():Map<string, Pointer> { return new Map(); },

	_registry: void 0,


	inScope( this:Registry<Pointer>, idOrPointer:string | Pointer, local?:true ):boolean {
		try {
			const id:string = Pointer.getID( idOrPointer );
			this._getLocalID( id );
			return true;
		} catch {
			if( local === true || ! this._registry ) return false;
			return this._registry.inScope( idOrPointer );
		}
	},


	hasPointer( this:Registry<Pointer>, id:string, local?:true ):boolean {
		if( this.inScope( id, true ) ) {
			const localID:string = this._getLocalID( id );
			if( this._resourcesMap.has( localID ) ) return true;
		}

		if( local === true || ! this._registry ) return false;
		return this._registry.hasPointer( id );
	},

	getPointer( this:Registry<Pointer>, id:string, local?:true ):Pointer {
		if( ! this.inScope( id, true ) ) {
			if( local === true || ! this._registry ) throw new IllegalArgumentError( `"${ id }" is out of scope.` );
			return this._registry.getPointer( id );
		}

		const localID:string = this._getLocalID( id );
		if( this._resourcesMap.has( localID ) ) return this._resourcesMap.get( localID );

		if( local !== true && this._registry && this._registry.hasPointer( id ) )
			return this._registry.getPointer( id );

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

		if( this.inScope( id, true ) ) {
			const localID:string = this._getLocalID( id );
			if( this._resourcesMap.delete( localID ) ) return true;
		}

		if( local === true || ! this._registry ) return false;
		return this._registry.removePointer( idOrPointer );
	},


	_getLocalID( this:Registry<Pointer>, id:string ):string {
		throw new IllegalArgumentError( `"${ id }" is out of scope.` );
	},

	_register<T extends object>( this:Registry<Pointer>, base:T & { id:string } ):T & Pointer {
		if( ! base.id ) throw new IllegalArgumentError( "The resource ID is required." );

		const localID:string = this._getLocalID( base.id );
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
};
