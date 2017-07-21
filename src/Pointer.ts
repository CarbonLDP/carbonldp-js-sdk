import * as Errors from "./Errors";
import * as HTTP from "./HTTP";
import * as PersistedDocument from "./PersistedDocument";
import * as Utils from "./Utils";

export interface Class {
	_id:string;
	_resolved:boolean;

	id:string;
	isResolved():boolean;
	resolve<T>():Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]>;
}

export interface Library {
	hasPointer( id:string ):boolean;
	getPointer( id:string ):Class;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return (
			Utils.hasPropertyDefined( object, "_id" ) &&
			Utils.hasPropertyDefined( object, "_resolved" ) &&

			Utils.hasPropertyDefined( object, "id" ) &&
			Utils.hasFunction( object, "isResolved" ) &&
			Utils.hasPropertyDefined( object, "resolve" )
		);
	}

	static is( value:any ):boolean {
		return (
			Utils.isObject( value ) &&
			Factory.hasClassProperties( value )
		);
	}

	static create( id?:string ):Class {
		return Factory.createFrom( {}, id );
	}

	static createFrom<T extends Object>( object:T, id?:string ):T & Class {
		const pointer:T & Class = object as T & Class;
		pointer.id = id || pointer.id;

		return Factory.decorate<T>( pointer );
	}

	static decorate<T extends Object>( object:T ):T & Class {
		const pointer:T & Class = object as T & Class;
		if( Factory.hasClassProperties( object ) ) return pointer;

		Object.defineProperties( pointer, {
			"_id": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: pointer.id,
			},
			"_resolved": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: ! ! (pointer._resolved as boolean | null),
			},
			"id": {
				enumerable: false,
				configurable: true,
				get: function():string {
					if( ! this._id ) return "";
					return this._id || "";
				},
				set: function( value:string ):void {
					this._id = value;
				},
			},
			"isResolved": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: function():boolean {
					return this._resolved;
				},
			},
			"resolve": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: function():Promise<[ Class, HTTP.Response.Class ]> {
					return Promise.reject<any>( new Errors.NotImplementedError( "A simple pointer cannot be resolved by it self." ) );
				},
			},
		} );

		return pointer;
	}
}

export class Util {
	static areEqual( pointer1:Class, pointer2:Class ):boolean {
		return pointer1.id === pointer2.id;
	}

	static getIDs( pointers:Class[] ):string[] {
		let ids:string[] = [];
		for( let pointer of pointers ) {
			ids.push( pointer.id );
		}
		return ids;
	}

	static resolveAll<T>( pointers:Class[] ):Promise<[ (T & PersistedDocument.Class)[], HTTP.Response.Class[] ]> {
		let promises:Promise<[ T & PersistedDocument.Class, HTTP.Response.Class ]>[] = pointers.map( ( pointer:Class ) => pointer.resolve<T>() );
		return Promise.all<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( promises ).then( ( results:[ T & PersistedDocument.Class, HTTP.Response.Class ][] ):[ (T & PersistedDocument.Class)[], HTTP.Response.Class[] ] => {
			let resolvedPointers:(T & PersistedDocument.Class)[] = results.map( ( result:[ T & PersistedDocument.Class, HTTP.Response.Class ] ) => result[ 0 ] );
			let responses:HTTP.Response.Class[] = results.map( ( result:[ T & PersistedDocument.Class, HTTP.Response.Class ] ) => result[ 1 ] );

			return [ resolvedPointers, responses ];
		} );
	}
}

export interface Validator {
	inScope( id:string ):boolean;
	inScope( pointer:Class ):boolean;
}

export default Class;
