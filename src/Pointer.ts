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
		return ! ! (
			Utils.hasPropertyDefined( object, "_id" ) &&
			Utils.hasPropertyDefined( object, "_resolved" ) &&

			Utils.hasPropertyDefined( object, "id" ) &&
			Utils.hasFunction( object, "isResolved" ) &&
			Utils.hasPropertyDefined( object, "resolve" )
		);
	}

	static is( value:any ):boolean {
		return ! ! (
			Utils.isObject( value ) &&
			Factory.hasClassProperties( value )
		);
	}

	static create( id?:string ):Class {
		return Factory.createFrom( {}, id );
	}

	static createFrom<T extends Object>( object:T, id?:string ):T & Class {
		id = ! ! id ? id : "";

		let pointer:T & Class = Factory.decorate<T>( object );
		pointer.id = id;

		return pointer;
	}

	static decorate<T extends Object>( object:T ):T & Class {
		if( Factory.hasClassProperties( object ) ) return <any> object;

		Object.defineProperties( object, {
			"_id": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: "",
			},
			"_resolved": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: false,
			},
			"id": {
				enumerable: false,
				configurable: true,
				get: function():string {
					if( ! this._id ) return "";
					return this._id;
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

		return <any> object;
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
		return Promise.all<[ T & PersistedDocument.Class, HTTP.Response.Class ]>( promises ).then( ( results:[ T & PersistedDocument.Class, HTTP.Response.Class ][] ) => {
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
