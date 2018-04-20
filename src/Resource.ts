import { ModelDecorator } from "./core/ModelDecorator";
import { TransientResource } from "./TransientResource";
import { PartialMetadata } from "./SPARQL/QueryDocument/PartialMetadata";
import * as Utils from "./Utils";

export interface Resource extends TransientResource {
	_snapshot:TransientResource;

	_partialMetadata?:PartialMetadata;


	_syncSnapshot():void;


	isDirty():boolean;

	revert():void;


	isPartial():boolean;
}


export interface ResourceFactory extends ModelDecorator<Resource> {
	isDecorated( object:object ):object is Resource;


	decorate<T extends object>( object:T ):T & Resource;
}


function syncSnapshot( this:Resource ):void {
	this._snapshot = Utils.ObjectUtils.clone( this, { arrays: true } );

	this._snapshot.id = this.id;
	this._snapshot.types = this.types.slice();
}

function isDirty( this:Resource ):boolean {
	if( ! Utils.ObjectUtils.areEqual( this, this._snapshot, { arrays: true } ) ) return true;

	let response:boolean = false;
	if( "id" in this ) response = response || (this._snapshot as TransientResource).id !== this.id;
	if( "types" in this ) response = response || ! Utils.ObjectUtils.areEqual( (this._snapshot as TransientResource).types, this.types );

	return response;
}

function revert( this:Resource ):void {
	for( let key of Object.keys( this ) ) {
		if( ! ( key in this._snapshot ) ) delete this[ key ];
	}

	Utils.ObjectUtils.extend( this, this._snapshot, { arrays: true } );
}

function isPartial( this:Resource ):boolean {
	return ! ! this._partialMetadata;
}

export const Resource:ResourceFactory = {
	isDecorated( object:object ):object is Resource {
		return (
			Utils.hasPropertyDefined( object, "_snapshot" )
			&& Utils.hasFunction( object, "_syncSnapshot" )
			&& Utils.hasFunction( object, "isDirty" )
			&& Utils.hasFunction( object, "isPartial" )
			&& Utils.hasFunction( object, "revert" )
		);
	},

	decorate<T extends object>( object:T ):T & Resource {
		if( Resource.isDecorated( object ) ) return object;

		TransientResource.decorate( object );

		const persistedResource:T & Resource = object as T & Resource;
		Object.defineProperties( persistedResource, {
			"_snapshot": {
				writable: true,
				enumerable: false,
				configurable: true,
				value: {},
			},
			"_syncSnapshot": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: syncSnapshot,
			},

			"_partialMetadata": {
				writable: true,
				enumerable: false,
				configurable: true,
			},

			"isDirty": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: isDirty,
			},
			"revert": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: revert,
			},

			"isPartial": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: isPartial,
			},
		} );

		return persistedResource;
	},
};
