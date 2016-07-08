import * as Utils from "./Utils";

export interface Class {
	_snapshot:Object;
	_syncSnapshot:() => void;

	isDirty():boolean;
}

function syncSnapshot():void {
	let resource:Class = this;
	resource._snapshot = Utils.O.clone( resource, {arrays: true} );
}

function isDirty():boolean {
	let resource:Class = this;
	return ! Utils.O.areEqual( resource, resource._snapshot, {arrays: true} );
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
		return (
			Utils.hasPropertyDefined( object, "_snapshot" ) &&
			Utils.hasFunction( object, "_syncSnapshot" ) &&
			Utils.hasFunction( object, "isDirty" )
		);
	}

	static decorate<T extends Object>( object:T, snapshot:Object = {} ):T & Class {
		if( Factory.hasClassProperties( object ) ) return <any> object;

		let persistedResource:Class = <any> object;

		Object.defineProperties( persistedResource, {
			"_snapshot": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: snapshot,
			},
			"_syncSnapshot": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: syncSnapshot,
			},

			"isDirty": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: isDirty,
			},
		} );

		return <any> persistedResource;
	}
}

export default Class;
