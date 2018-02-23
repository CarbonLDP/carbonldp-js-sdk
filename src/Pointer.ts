import { IllegalStateError } from "./Errors";
import * as HTTP from "./HTTP";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import * as PersistedDocument from "./PersistedDocument";
import * as Utils from "./Utils";


export interface Pointer {
	_id:string;
	_resolved:boolean;

	id:string;

	isResolved():boolean;

	resolve<T>():Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]>;
}


export interface PointerLibrary {
	hasPointer( id:string ):boolean;

	getPointer( id:string ):Pointer;
}


export interface PointerValidator {
	inScope( idOrPointer:string | Pointer ):boolean;
}


export interface PointerFactory extends ModelFactory<Pointer>, ModelDecorator<Pointer> {
	isDecorated( object:object ):object is Pointer;

	is( object:object ):object is Pointer;


	create( id?:string ):Pointer;

	createFrom<T extends object>( object:T, id?:string ):T & Pointer;

	decorate<T extends object>( object:T ):T & Pointer;


	areEqual( pointer1:Pointer, pointer2:Pointer ):boolean;

	getIDs( pointers:Pointer[] ):string[];

	resolveAll<T extends object>( pointers:Pointer[] ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class[] ]>;
}


export function isPointerResolved( this:Pointer ):boolean {
	return this._resolved;
}

export function resolveStandalonePointer( this:Pointer ):Promise<[ Pointer, HTTP.Response.Class ]> {
	return Promise.reject( new IllegalStateError( "The pointer has not been assigned to a context." ) );
}

export const Pointer:PointerFactory = {
	isDecorated( object:object ):object is Pointer {
		return (
			Utils.hasPropertyDefined( object, "_id" ) &&
			Utils.hasPropertyDefined( object, "_resolved" ) &&

			Utils.hasPropertyDefined( object, "id" ) &&
			Utils.hasFunction( object, "isResolved" ) &&
			Utils.hasPropertyDefined( object, "resolve" )
		);
	},

	is( object:any ):object is Pointer {
		return (
			Utils.isObject( object ) &&
			Pointer.isDecorated( object )
		);
	},


	create( id?:string ):Pointer {
		return Pointer.createFrom( {}, id );
	},

	createFrom<T extends object>( object:T, id?:string ):T & Pointer {
		const pointer:T & Pointer = Pointer.decorate<T>( object );

		if( id ) pointer.id = id;

		return pointer;
	},

	decorate<T extends object>( object:T ):T & Pointer {
		if( Pointer.isDecorated( object ) ) return object;

		const pointer:T & Pointer = object as T & Pointer;
		Object.defineProperties( pointer, {
			"_id": {
				writable: true,
				configurable: true,
				value: pointer.id || "",
			},
			"_resolved": {
				writable: true,
				configurable: true,
				value: pointer._resolved || false,
			},
			"id": {
				enumerable: false,
				configurable: true,
				get( this:Pointer ):string {
					return this._id;
				},
				set( this:Pointer, value:string ):void {
					this._id = value;
				},
			},
			"isResolved": {
				configurable: true,
				value: isPointerResolved,
			},
			"resolve": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: resolveStandalonePointer,
			},
		} );

		return pointer;
	},


	areEqual( pointer1:Pointer, pointer2:Pointer ):boolean {
		return pointer1.id === pointer2.id;
	},

	getIDs( pointers:Pointer[] ):string[] {
		return pointers
			.map( pointer => pointer.id )
			;
	},

	resolveAll<T extends object>( pointers:Pointer[] ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class[] ]> {
		const promises:Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]>[] = pointers.map( ( pointer:Pointer ) => pointer.resolve<T>() );
		return Promise
			.all<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( promises )
			.then<[ (T & PersistedDocument.Class)[], HTTP.Response.Class[] ]>( ( results:[ T & PersistedDocument.Class, HTTP.Response.Class ][] ) => {
				let resolvedPointers:(T & PersistedDocument.Class)[] = results.map( ( result:[ T & PersistedDocument.Class, HTTP.Response.Class ] ) => result[ 0 ] );
				let responses:HTTP.Response.Class[] = results.map( ( result:[ T & PersistedDocument.Class, HTTP.Response.Class ] ) => result[ 1 ] );

				return [ resolvedPointers, responses ];
			} );
	},
};


export default Pointer;
