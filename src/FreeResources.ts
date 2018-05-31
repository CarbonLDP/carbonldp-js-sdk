import { ModelDecorator } from "./core/ModelDecorator";
import { ModelFactory } from "./core/ModelFactory";
import { Documents } from "./Documents";
import { IDAlreadyInUseError } from "./Errors/IDAlreadyInUseError";
import { IllegalArgumentError } from "./Errors/IllegalArgumentError";
import { JSONLDConverter } from "./JSONLD/Converter";
import { DigestedObjectSchema } from "./ObjectSchema";
import {
	Pointer,
	PointerLibrary,
	PointerValidator,
} from "./Pointer";
import { RDFNode } from "./RDF/Node";
import { URI } from "./RDF/URI";
import { TransientResource } from "./Resource";
import * as Utils from "./Utils";


export interface BaseFreeResources {
	_documents:Documents;
}


export interface FreeResources extends PointerLibrary, PointerValidator {
	_documents:Documents;
	_resourcesIndex:Map<string, TransientResource>;

	hasResource( id:string ):boolean;

	getResource( id:string ):TransientResource;

	getResources():TransientResource[];

	getPointer( id:string ):TransientResource;

	createResource( id?:string ):TransientResource;

	createResourceFrom<T>( object:T, id?:string ):TransientResource & T;

	toJSON():object;
}


export interface FreeResourcesFactory extends ModelFactory<FreeResources>, ModelDecorator<FreeResources> {
	is( value:any ):value is FreeResources;

	isDecorated( object:object ):object is FreeResources;


	create<T extends object>( data:T & BaseFreeResources ):T & FreeResources;

	createFrom<T extends object>( object:T & BaseFreeResources ):T & FreeResources;

	decorate<T extends object>( object:T, documents:Documents ):T & FreeResources;
}


function hasPointer( this:FreeResources, id:string ):boolean {
	if( ! inLocalScope( id ) ) {
		return this._documents.hasPointer( id );
	}

	return this.hasResource( id );
}

function getPointer( this:FreeResources, id:string ):Pointer {
	if( ! inLocalScope( id ) ) {
		return this._documents.getPointer( id );
	}

	let resource:TransientResource = this.getResource( id );

	return ! resource ? this.createResource( id ) : resource;
}

function inLocalScope( id:string ):boolean {
	return URI.isBNodeID( id );
}

function inScope( this:FreeResources, idOrPointer:string | Pointer ):boolean {
	let id:string = Utils.isString( idOrPointer ) ? idOrPointer : idOrPointer.id;

	return inLocalScope( id ) || this._documents.inScope( id );
}

function hasResource( this:FreeResources, id:string ):boolean {
	return this._resourcesIndex.has( id );
}

function getResource( this:FreeResources, id:string ):TransientResource {
	return this._resourcesIndex.get( id ) || null;
}

function getResources( this:FreeResources ):TransientResource[] {
	return Utils.ArrayUtils.from( this._resourcesIndex.values() );
}

function createResource( this:FreeResources, id?:string ):TransientResource {
	return this.createResourceFrom( {}, id );
}

function createResourceFrom<T extends object>( this:FreeResources, object:T, id?:string ):TransientResource & T {
	if( id ) {
		if( ! inLocalScope( id ) ) throw new IllegalArgumentError( `The id "${ id }" is out of scope.` );
		if( this._resourcesIndex.has( id ) ) throw new IDAlreadyInUseError( `The id "${ id }" is already in use by another resource.` );
	} else {
		id = URI.generateBNodeID();
	}

	let resource:TransientResource & T = TransientResource.createFrom<T>( object );
	resource.id = id;

	this._resourcesIndex.set( id, resource );

	return resource;
}

function toJSON( this:FreeResources, key?:string ):RDFNode[] {
	const generalSchema:DigestedObjectSchema = this._documents.getGeneralSchema();
	const jsonldConverter:JSONLDConverter = this._documents.jsonldConverter;

	return this
		.getResources()
		.map( resource => {
			const resourceSchema:DigestedObjectSchema = this._documents.getSchemaFor( resource );
			return jsonldConverter.expand( resource, generalSchema, resourceSchema );
		} )
		;
}

export const FreeResources:FreeResourcesFactory = {
	is( value:any ):value is FreeResources {
		return FreeResources.isDecorated( value )
			;
	},

	isDecorated( object:object ):object is FreeResources {
		return (
			Utils.hasPropertyDefined( object, "_documents" ) &&
			Utils.hasPropertyDefined( object, "_resourcesIndex" ) &&

			Utils.hasFunction( object, "hasResource" ) &&
			Utils.hasFunction( object, "getResource" ) &&
			Utils.hasFunction( object, "getResources" ) &&
			Utils.hasFunction( object, "createResource" ) &&
			Utils.hasFunction( object, "createResourceFrom" ) &&

			Utils.hasFunction( object, "hasPointer" ) &&
			Utils.hasFunction( object, "getPointer" ) &&

			Utils.hasFunction( object, "inScope" ) &&

			Utils.hasFunction( object, "toJSON" )
		);
	},


	create<T extends object>( data:T & BaseFreeResources ):T &FreeResources {
		const copy:T & BaseFreeResources = Object.assign( {}, data );
		return FreeResources.createFrom( copy );
	},

	createFrom<T extends object>( object:T & BaseFreeResources ):T & FreeResources {
		return FreeResources.decorate<T>( object, object._documents );
	},

	decorate<T extends object>( object:T, documents:Documents ):T & FreeResources {
		if( FreeResources.isDecorated( object ) ) return object;

		Object.defineProperties( object, {
			"_documents": {
				configurable: true,
				value: documents,
			},
			"_resourcesIndex": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: new Map<string, TransientResource>(),
			},
			"hasPointer": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: hasPointer,
			},
			"getPointer": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: getPointer,
			},
			"inScope": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: inScope,
			},
			"hasResource": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: hasResource,
			},
			"getResource": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: getResource,
			},
			"getResources": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: getResources,
			},
			"createResource": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: createResource,
			},
			"createResourceFrom": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: createResourceFrom,
			},
			"toJSON": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: toJSON,
			},
		} );

		return <any> object;
	},
};

