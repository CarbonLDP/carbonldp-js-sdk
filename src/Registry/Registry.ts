import { IDAlreadyInUseError, IllegalArgumentError, } from "../Errors";
import { ModelDecorator, ModelFactory, ModelPrototype } from "../Model";
import { Pointer, PointerLibrary, PointerValidator, } from "../Pointer";
import { isObject } from "../Utils";
import { BaseRegisteredPointer } from "./BaseRegisteredPointer";
import { BaseRegistry } from "./BaseRegistry";
import { RegisteredPointer } from "./RegisteredPointer";


export interface Registry<M extends RegisteredPointer = RegisteredPointer> extends PointerLibrary, PointerValidator {
	// TODO: Change to unknown
	readonly $registry:Registry<any> | undefined;

	readonly __modelDecorator:ModelDecorator<M, BaseRegisteredPointer>;
	readonly __resourcesMap:Map<string, M>;


	inScope( idOrPointer:string | Pointer ):boolean;
	inScope( idOrPointer:string | Pointer, local:true ):boolean;


	hasPointer( id:string ):boolean;
	hasPointer( id:string, local:true ):boolean;

	getPointer( id:string ):RegisteredPointer;
	getPointer( id:string, local:true ):M;

	getPointers():RegisteredPointer[];
	getPointers( local:true ):M[];

	removePointer( idOrPointer:string | RegisteredPointer ):boolean;
	removePointer( idOrPointer:string | RegisteredPointer, local:true ):boolean;


	_getLocalID( id:string ):string;

	_addPointer<T extends object>( pointer:T & Pointer ):T & M;
}


export type OverriddenMembers =
	| "$registry"
	;

// TODO: Use unknown
export type RegistryFactory =
	& ModelPrototype<Registry, {}, OverriddenMembers>
	& ModelDecorator<Registry<any>, BaseRegistry>
	& ModelFactory<Registry, BaseRegistry>
	;

export const Registry:RegistryFactory = {
	PROTOTYPE: {
		$registry: void 0,

		get __modelDecorator():ModelDecorator<RegisteredPointer> {
			throw new IllegalArgumentError( `Property "__modelDecorator" is required` );
		},

		get __resourcesMap():Map<string, RegisteredPointer> { return new Map(); },


		inScope( this:Registry, idOrPointer:string | Pointer, local?:true ):boolean {
			try {
				const id:string = Pointer.getID( idOrPointer );
				this._getLocalID( id );
				return true;
			} catch {
				if( local === true || ! this.$registry ) return false;
				return this.$registry.inScope( idOrPointer );
			}
		},


		hasPointer( this:Registry, id:string, local?:true ):boolean {
			if( this.inScope( id, true ) ) {
				const localID:string = this._getLocalID( id );
				if( this.__resourcesMap.has( localID ) ) return true;
			}

			if( local === true || ! this.$registry ) return false;
			return this.$registry.hasPointer( id );
		},

		getPointer( this:Registry, id:string, local?:true ):RegisteredPointer {
			if( ! this.inScope( id, true ) ) {
				if( local === true || ! this.$registry ) throw new IllegalArgumentError( `"${ id }" is out of scope.` );
				return this.$registry.getPointer( id );
			}

			const localID:string = this._getLocalID( id );
			if( this.__resourcesMap.has( localID ) ) return this.__resourcesMap.get( localID );

			if( local !== true && this.$registry && this.$registry.hasPointer( id ) )
				return this.$registry.getPointer( id );

			return this._addPointer( { $id: id } );
		},

		getPointers( this:Registry, local?:true ):RegisteredPointer[] {
			const pointers:RegisteredPointer[] = Array.from( this.__resourcesMap.values() );
			if( local === true || ! this.$registry ) return pointers;

			return [
				...this.$registry.getPointers(),
				...pointers,
			];
		},

		removePointer( this:Registry, idOrPointer:string | RegisteredPointer, local?:true ):boolean {
			const id:string = Pointer.getID( idOrPointer );

			if( this.inScope( id, true ) ) {
				const localID:string = this._getLocalID( id );
				if( this.__resourcesMap.delete( localID ) ) return true;
			}

			if( local === true || ! this.$registry ) return false;
			return this.$registry.removePointer( idOrPointer );
		},


		_addPointer<T extends object>( this:Registry, pointer:T & Pointer ):T & RegisteredPointer {
			if( ! pointer.$id ) throw new IllegalArgumentError( "The pointer $id cannot be empty." );

			const localID:string = this._getLocalID( pointer.$id );
			if( this.__resourcesMap.has( localID ) ) throw new IDAlreadyInUseError( `"${ pointer.$id }" is already being used.` );

			const resource:T & RegisteredPointer = this.__modelDecorator
				.decorate( Object.assign( pointer, {
					$registry: this,
				} ) );

			this.__resourcesMap.set( localID, resource );
			return resource;
		},

		_getLocalID( this:Registry, id:string ):never {
			throw new IllegalArgumentError( `"${ id }" is outside the scope of the registry.` );
		},
	},


	isDecorated( object:object ):object is Registry {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( Registry.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseRegistry>( object:T ):T & Registry {
		if( Registry.isDecorated( object ) ) return object;

		return ModelDecorator
			.definePropertiesFrom( Registry.PROTOTYPE, object );
	},


	create<T extends object>( data:T & BaseRegistry ):T & Registry {
		const copy:T & BaseRegistry = Object.assign( {}, data );
		return Registry.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseRegistry ):T & Registry {
		return Registry.decorate( object );
	},
};
