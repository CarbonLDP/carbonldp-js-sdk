/// <reference path="./../typings/es6/es6.d.ts" />
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export class Modifications {
	add:Map<string, RDF.Value.Class[]>;
	set:Map<string, RDF.Value.Class[]>;
	delete:Map<string, RDF.Value.Class[]>;

	constructor() {
		this.add = new Map<string, RDF.Value.Class[]>();
		this.set = new Map<string, RDF.Value.Class[]>();
		this.delete = new Map<string, RDF.Value.Class[]>();
	}
}

export enum ModificationType {
	ADD,
	SET,
	DELETE
}

export interface Class {
	_dirty:boolean;
	_modifications:Modifications;

	isDirty():boolean;
}

function isDirty():boolean {
	return this._dirty;
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return (
			Utils.hasPropertyDefined( object, "_dirty" ) &&
			Utils.hasPropertyDefined( object, "_modifications" ) &&
			Utils.hasFunction( object, "isDirty" )
		);
	}

	static is( object:Object ):boolean {
		return (
			Factory.hasClassProperties( object )
		);
	}

	static from<T>( object:T ):T & Class;
	static from<T>( objects:T[] ):(T & Class)[];
	static from<T>( objectOrObjects:any ):any {
		if( ! Utils.isArray( objectOrObjects ) ) return Factory.singleFrom<T>( objectOrObjects );

		for ( let i:number = 0, length:number = objectOrObjects.length; i < length; i ++ ) {
			Factory.singleFrom( objectOrObjects[ i ] );
		}

		return <(T & Class)[]> objectOrObjects;
	}

	private static singleFrom<T>( object:T ):( T & Class ) {
		let persistedResource:( T & Class ) = <any> object;
		if( ! Factory.hasClassProperties( object ) ) persistedResource = this.injectBehavior<T>( persistedResource );
		return persistedResource;
	}

	private static injectBehavior<T>( persistedResource:( T & Class ) ):( T & Class ) {
		Object.defineProperties( persistedResource, {
			"_dirty": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: false
			},
			"_modifications": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: new Modifications()
			},
			"isDirty": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: isDirty
			}
		} );

		return persistedResource;
	}
}

export default Class;
