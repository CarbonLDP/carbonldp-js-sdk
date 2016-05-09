import Documents from "./Documents";
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

	createResource( id?:string ):Resource.Class;
}

function hasPointer( id:string ):boolean {
	let freeResources:Class = <Class> this;

	if( ! freeResources.inScope( id ) ) {
		return freeResources._documents.hasPointer( id );
	}

	return freeResources.hasResource( id );
}

function getPointer( id:string ):Pointer.Class {
	let freeResources:Class = <Class> this;

	if( ! freeResources.inScope( id ) ) {
		return freeResources._documents.getPointer( id );
	}

	let resource:Resource.Class = freeResources.getResource( id );

	return ! resource ? freeResources.createResource( id ) : resource;
}

function inScope( pointer:Pointer.Class ):boolean;
function inScope( id:string ):boolean;
function inScope( idOrPointer:any ):boolean {
	let id:string = Pointer.Factory.is( idOrPointer ) ? idOrPointer.id : idOrPointer;

	return RDF.URI.Util.isBNodeID( id );
}

function getResource( id:string ):Resource.Class {
	// TODO
}

function getResources():Resource.Class[] {
	// TODO
}

function createResource( id?:string ):Resource.Class {
	// TODO
}

export class Factory {
	static hasClassProperties( value:Object ):boolean {
		return (
			Utils.hasFunction( value, "hasPointer" ) &&
			Utils.hasFunction( value, "getPointer" ) &&

			Utils.hasFunction( value, "inScope" ) &&

			Utils.hasPropertyDefined( value, "_documents" ) &&
			Utils.hasPropertyDefined( value, "_resourcesIndex" ) &&

			Utils.hasFunction( value, "hasResource" ) &&
			Utils.hasFunction( value, "getResource" ) &&
			Utils.hasFunction( value, "getResources" ) &&
			Utils.hasFunction( value, "createResource" )
		);
	}

	static create( documents:Documents ):Class {
		return Factory.createFrom( {}, documents );
	}

	static createFrom<T extends Object>( object:T, documents:Documents ):T & Class {
		let freeResources:FreeResources = Factory.decorate( object );
		freeResources._documents = documents;

		return freeResources;
	}

	static decorate<T extends Object>( object:T ):T & Class {

	}
}

export default Class;