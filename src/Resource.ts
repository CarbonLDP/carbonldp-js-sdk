import * as Document from "./Document";
import * as Errors from "./Errors";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Utils from "./Utils";

export interface Class extends Pointer.Class {
	_id:string;

	types:string[];
}

function hasType( type:string ):boolean {
	return this.types.indexOf( type ) !== -1;
}

export class Factory {
	hasClassProperties( resource:Object ):boolean {
		return (
			Utils.hasPropertyDefined( resource, "_id" ) &&
			Utils.hasPropertyDefined( resource, "id" ) &&
			Utils.hasPropertyDefined( resource, "types" ) &&

			Utils.hasPropertyDefined( resource, "resolve" )
		);
	}

	create( id:string = null, types:string[] = null ):Class {
		return this.createFrom( {}, id, types );
	}

	createFrom<T extends Object>( object:T, id:string = null, types:string[] = null ):T & Class {
		id = !! id ? id : "";
		types = !! types ? types : [];

		let resource:Class = this.decorate( object );
		resource.id = id;
		resource.types = types;

		return <any> resource;
	}

	decorate<T extends Object>( object:T ):T & Class {
		if( this.hasClassProperties( object ) ) return <any> object;

		Object.defineProperties( object, {
			"_id": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: "",
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
			"types": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: [],
			},
			"resolve": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: function():Promise<void> {
					return new Promise( ( resolve:( result:any ) => void, reject:( error:any ) => void ):any => {
						return this;
					});
				},
			},
		} );

		return <any> object;
	}
}

export let factory:Factory = new Factory();
