/// <reference path="./../typings/es6/es6.d.ts" />
import * as RDF from "./RDF";
import * as Utils from "./Utils";

class Modifications {
	add:Map<string, RDF.Value.Class[]>;
	set:Map<string, RDF.Value.Class[]>;
	delete:Map<string, RDF.Value.Class[]>;

	constructor() {
		this.add = new Map<string, RDF.Value.Class[]>();
		this.set = new Map<string, RDF.Value.Class[]>();
		this.delete = new Map<string, RDF.Value.Class[]>();
	}
}

enum ModificationType {
	ADD,
	SET,
	DELETE
}

interface Persisted {
	_dirty:boolean;
	_modifications:Modifications;

	isDirty():boolean;
}

function isDirty():boolean {
	return this._dirty;
}

class Factory {
	static is( object:Object ):boolean {
		return (
			Utils.hasPropertyDefined( object, "_dirty" ) &&
			Utils.hasPropertyDefined( object, "_modifications" ) &&
			Utils.hasFunction( object, "isDirty" )
		);
	}

	static from( object:Object ):Persisted;
	static from( objects:Object[] ):Persisted[];
	static from( objectOrObjects:any ):any {
		let objects:Object[] = Utils.isArray( objectOrObjects ) ? <Object[]>objectOrObjects : [ <Object>objectOrObjects ];
		let values:Persisted[] = [];

		for ( let i:number = 0, length:number = objects.length; i < length; i ++ ) {
			let value:Persisted = <any>objects[ i ];

			if ( ! Factory.is( value ) ) Factory.injectBehaviour( value );

			values.push( value );
		}

		if ( Utils.isArray( objectOrObjects ) ) return values;
		return values[ 0 ];
	}

	private static injectBehaviour( value:Persisted ):Persisted {
		Object.defineProperties( value, {
			"_dirty": {
				writable: true,
				enumerable: false,
				value: false
			},
			"_modifications": {
				writable: false,
				enumerable: false,
				value: new Modifications()
			}
		} );

		value.isDirty = isDirty;

		return value;
	}
}

export {
	Modifications,
	ModificationType,
	Persisted as Class,
	Factory
};
