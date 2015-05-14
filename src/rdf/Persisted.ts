/// <reference path="../../typings/es6/es6.d.ts" />
import * as Value from './Value';
import * as Utils from '../Utils';

class Modifications {
	add:Map<string, Value.Class[]>;
	set:Map<string, Value.Class[]>;
	delete:Map<string, Value.Class[]>;

	constructor() {
		this.add = new Map<string, Value.Class[]>();
		this.set = new Map<string, Value.Class[]>();
		this.delete = new Map<string, Value.Class[]>();
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
		//@formatter:off
		return (
			Utils.hasPropertyDefined( object, '_dirty' ) &&
			Utils.hasPropertyDefined( object, '_modifications' ) &&
			Utils.hasFunction( object, 'isDirty' )
		);
		//@formatter:on
	}

	static from( object:Object ):Persisted;
	static from( objects:Object[] ):Persisted[];
	static from( objectOrObjects:any ):any {
		var objects:Object[] = Utils.isArray( objectOrObjects ) ? <Object[]>objectOrObjects : [ <Object>objectOrObjects ];
		var values:Persisted[] = [];

		for ( var i:number = 0, length:number = objects.length; i < length; i ++ ) {
			var value:Persisted = <any>objects[ i ];

			if ( ! Factory.is( value ) ) Factory.injectBehaviour( value );

			values.push( value );
		}

		if ( Utils.isArray( objectOrObjects ) ) return values;
		else return values[ 0 ];
	}

	private static injectBehaviour( value:Persisted ):Persisted {
		Object.defineProperties( value, {
			'_dirty': {
				writable: true,
				enumerable: false,
				value: false
			},
			'_modifications': {
				writable: false,
				enumerable: false,
				value: new Modifications()
			}
		} );

		value.isDirty = isDirty;

		return value;
	}
}

//@formatter:off
export {
	Modifications,
	ModificationType,
	Persisted as Class,
	Factory
};
//@formatter:on