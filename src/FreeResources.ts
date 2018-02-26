import { Documents } from "./Documents";
import {
	IDAlreadyInUseError,
	IllegalArgumentError,
} from "./Errors";
import * as JSONLDConverter from "./JSONLD/Converter";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import * as ObjectSchema from "./ObjectSchema";
import {
	Pointer,
	PointerLibrary,
	PointerValidator,
} from "./Pointer";
import * as URI from "./RDF/URI";
import * as RDFNode from "./RDF/Node";
import { Resource } from "./Resource";
import * as Utils from "./Utils";

export interface FreeResources extends PointerLibrary, PointerValidator {
	_documents:Documents;
	_resourcesIndex:Map<string, Resource>;

	hasResource( id:string ):boolean;

	getResource( id:string ):Resource;

	getResources():Resource[];

	getPointer( id:string ):Resource;

	createResource( id?:string ):Resource;

	createResourceFrom<T>( object:T, id?:string ):Resource & T;

	toJSON():object;
}


export interface FreeResourcesFactory extends ModelFactory<FreeResources>, ModelDecorator<FreeResources> {
	is( object:object ):object is FreeResources;

	isDecorated( object:object ):object is FreeResources;


	create( documents:Documents ):FreeResources;

	createFrom<T extends object>( object:T, documents:Documents ):T & FreeResources;

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

	let resource:Resource = this.getResource( id );

	return ! resource ? this.createResource( id ) : resource;
}

function inLocalScope( id:string ):boolean {
	return URI.Util.isBNodeID( id );
}

function inScope( this:FreeResources, idOrPointer:string | Pointer ):boolean {
	let id:string = Utils.isString( idOrPointer ) ? idOrPointer : idOrPointer.id;

	return inLocalScope( id ) || this._documents.inScope( id );
}

function hasResource( this:FreeResources, id:string ):boolean {
	return this._resourcesIndex.has( id );
}

function getResource( this:FreeResources, id:string ):Resource {
	return this._resourcesIndex.get( id ) || null;
}

function getResources( this:FreeResources ):Resource[] {
	return Utils.ArrayUtils.from( this._resourcesIndex.values() );
}

function createResource( this:FreeResources, id?:string ):Resource {
	return this.createResourceFrom( {}, id );
}

function createResourceFrom<T extends object>( this:FreeResources, object:T, id?:string ):Resource & T {
	if( id ) {
		if( ! inLocalScope( id ) ) throw new IllegalArgumentError( `The id "${ id }" is out of scope.` );
		if( this._resourcesIndex.has( id ) ) throw new IDAlreadyInUseError( `The id "${ id }" is already in use by another resource.` );
	} else {
		id = URI.Util.generateBNodeID();
	}

	let resource:Resource & T = Resource.createFrom<T>( object, id );
	this._resourcesIndex.set( id, resource );

	return resource;
}

function toJSON( this:FreeResources, key?:string ):RDFNode.Class[] {
	const generalSchema:ObjectSchema.DigestedObjectSchema = this._documents.getGeneralSchema();
	const jsonldConverter:JSONLDConverter.Class = this._documents.jsonldConverter;

	return this
		.getResources()
		.map( resource => {
			const resourceSchema:ObjectSchema.DigestedObjectSchema = this._documents.getSchemaFor( resource );
			return jsonldConverter.expand( resource, generalSchema, resourceSchema );
		} )
		;
}

export const FreeResources:FreeResourcesFactory = {
	is( object:object ):object is FreeResources {
		return FreeResources.isDecorated( object )
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


	create( documents:Documents ):FreeResources {
		return FreeResources.createFrom( {}, documents );
	},

	createFrom<T extends object>( object:T, documents:Documents ):T & FreeResources {
		return FreeResources.decorate<T>( object, documents );
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
				value: new Map<string, Resource>(),
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


export default FreeResources;
