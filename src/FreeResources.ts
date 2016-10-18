import Documents from "./Documents";
import * as Errors from "./Errors";
import JSONLDConverter from "./JSONLD/Converter";
import * as ObjectSchema from "./ObjectSchema";
import * as Pointer from "./Pointer";
import * as RDF from "./RDF";
import * as Resource from "./Resource";
import * as Utils from "./Utils";

export interface Class extends Pointer.Library, Pointer.Validator {
	_documents:Documents;
	_resourcesIndex:Map<string, Resource.Class>;

	hasResource( id:string ):boolean;
	getResource( id:string ):Resource.Class;
	getResources():Resource.Class[];

	getPointer( id:string ):Resource.Class;

	createResource( id?:string ):Resource.Class;
	createResourceFrom<T>( object:T, id?:string ):Resource.Class & T;

	toJSON():string;
}

function hasPointer( id:string ):boolean {
	let freeResources:Class = <Class> this;

	if( ! inLocalScope( id ) ) {
		return freeResources._documents.hasPointer( id );
	}

	return freeResources.hasResource( id );
}

function getPointer( id:string ):Pointer.Class {
	let freeResources:Class = <Class> this;

	if( ! inLocalScope( id ) ) {
		return freeResources._documents.getPointer( id );
	}

	let resource:Resource.Class = freeResources.getResource( id );

	return ! resource ? freeResources.createResource( id ) : resource;
}

function inLocalScope( id:string ):boolean {
	return RDF.URI.Util.isBNodeID( id );
}

function inScope( pointer:Pointer.Class ):boolean;
function inScope( id:string ):boolean;
function inScope( idOrPointer:any ):boolean {
	let freeResources:Class = <Class> this;
	let id:string = Pointer.Factory.is( idOrPointer ) ? idOrPointer.id : idOrPointer;

	return inLocalScope( id ) || freeResources._documents.inScope( id );
}

function hasResource( id:string ):boolean {
	let freeResources:Class = <Class> this;

	return freeResources._resourcesIndex.has( id );
}

function getResource( id:string ):Resource.Class {
	let freeResources:Class = <Class> this;

	return freeResources._resourcesIndex.get( id ) || null;
}

function getResources():Resource.Class[] {
	let freeResources:Class = <Class> this;

	return Utils.A.from( freeResources._resourcesIndex.values() );
}

function createResource( id?:string ):Resource.Class {
	return this.createResourceFrom( {}, id );
}
function createResourceFrom<T extends Object>( object:T, id?:string ):Resource.Class & T {
	let freeResources:Class = <Class> this;

	if( id ) {
		if( ! inLocalScope( id ) ) throw new Errors.IllegalArgumentError( `The id "${ id }" is out of scope.` );
		if( freeResources._resourcesIndex.has( id ) ) throw new Errors.IDAlreadyInUseError( `The id "${ id }" is already in use by another resource.` );
	} else {
		id = RDF.URI.Util.generateBNodeID();
	}

	let resource:Resource.Class & T = Resource.Factory.createFrom<T>( object, id );
	freeResources._resourcesIndex.set( id, resource );

	return resource;
}

function toJSON():string {
	let generalSchema:ObjectSchema.DigestedObjectSchema = this._documents.getGeneralSchema();
	let jsonldConverter:JSONLDConverter = new JSONLDConverter();
	let resources:Resource.Class[] = this.getResources();
	let expandedResources:RDF.Node.Class[] = [];

	for( let resource of resources ) {
		expandedResources.push( jsonldConverter.expand( resource, generalSchema, this._documents.getSchemaFor( resource ) ) );
	}

	return JSON.stringify( expandedResources );
}

export class Factory {
	static hasClassProperties( object:Object ):boolean {
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
	}

	static create( documents:Documents ):Class {
		return Factory.createFrom( {}, documents );
	}

	static createFrom<T extends Object>( object:T, documents:Documents ):T & Class {
		let freeResources:T & Class = Factory.decorate<T>( object );
		freeResources._documents = documents;

		return freeResources;
	}

	static decorate<T extends Object>( object:T ):T & Class {
		if( Factory.hasClassProperties( object ) ) return <any> object;

		Object.defineProperties( object, {
			"_resourcesIndex": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: new Map<string, Resource.Class>(),
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
	}
}

export default Class;
