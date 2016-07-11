import * as HTTP from "./HTTP";
import * as Utils from "./Utils";
import * as Errors from "./Errors";

export interface Class {
	_id:string;
	_resolved:boolean;

	id:string;
	isResolved():boolean;
	resolve():Promise<[ Class, HTTP.Response.Class ]>;
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
		id = ! ! id ? id : "";

		let pointer:Class = Factory.decorate( {} );
		pointer.id = id;

		return pointer;
	}

	static decorate<T extends Object>( object:T ):Class {
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
					return new Promise( ( resolve:( result:any ) => void, reject:( error:any ) => void ):any => {
						throw new Errors.NotImplementedError( "A simple pointer cannot be resolved by it self." );
					} );
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

	static resolveAll( pointers:Class[] ):Promise<[ Class[], HTTP.Response.Class[] ]> {
		let promises:Promise<[ Class, HTTP.Response.Class ]>[] = pointers.map( ( pointer:Class ) => pointer.resolve() );
		return Promise.all<[ Class, HTTP.Response.Class ]>( promises ).then( ( results:[ Class, HTTP.Response.Class ][] ) => {
			let resolvedPointers:Class[] = results.map( ( result:Array<any> ) => result[ 0 ] );
			let responses:HTTP.Response.Class[] = results.map( ( result:Array<any> ) => result[ 1 ] );

			return [ resolvedPointers, responses ];
		} );
	}
}

export interface Validator {
	inScope( id:string ):boolean;
	inScope( pointer:Class ):boolean;
}

export default Class;
