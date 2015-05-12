// TODO: Create a hashing system
class HashMap<K,V> {
	constructor() {
		this.keys = [];
		this.values = [];
	}

	private keys:K[];
	private values:V[];

	isEmpty():boolean {
		return this.keys.length === 0;
	}

	hasKey( key:K ):boolean {
		return this.keys.indexOf( key ) !== - 1;
	}

	hasValue( value:V ):boolean {
		return this.values.indexOf( value ) !== - 1;
	}

	get( key:K ):V {
		return this.getValue( key );
	}

	getValue( key:K ):V {
		var index = this.keys.indexOf( key );
		if ( index === - 1 ) throw new Error( "The key doesn't exist." );
		return this.values[ index ];
	}

	getKeys( value:V ):K[] {
		var keys:K[] = [];
		var index:number = this.values.indexOf( value );
		while ( index !== - 1 ) {
			keys.push( this.keys[ index ] );
			index = this.values.indexOf( value, index + 1 );
		}
		return keys;
	}

	getAllKeys():K[] {
		return this.keys.slice();
	}

	getValues():V[] {
		return this.values.slice();
	}

	size():number {
		return this.keys.length;
	}

	put( key:K, value:V ):void {
		if ( this.hasKey( key ) ) this.remove( key );
		this.keys.push( key );
		this.values.push( value );
	}

	remove( key:K ):void {
		var index = this.keys.indexOf( key );
		if ( index === - 1 ) throw new Error( "The key doesn't exist." );
		this.keys.splice( index, 1 );
		this.values.splice( index, 1 );
	}

	clear():void {
		this.keys = [];
		this.values = [];
	}

	static fromObject( object:Object ):HashMap<string,any> {
		var map:HashMap<string,any> = new HashMap<string,any>();
		for ( var name in object ) {
			if ( object.hasOwnProperty( name ) ) {
				var value = object[ name ];
				map.put( name, value );
			}
		}
		return map;
	}
}
export default HashMap;