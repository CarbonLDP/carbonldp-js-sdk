import { Document } from "../Document";
import {
	DigestedObjectSchema,
	ObjectSchemaUtils,
} from "../ObjectSchema";
import { URI } from "../RDF";
import {
	addTypeInResource,
	hasTypeInResource,
	removeTypeInResource,
	Resource
} from "../Resource";
import { isObject } from "../Utils";
import {
	TransientFragment,
	TransientFragmentFactory
} from "./TransientFragment";

export interface Fragment extends Resource, TransientFragment {
	_document:Document;

	addType( type:string ):void;

	hasType( type:string ):boolean;

	removeType( type:string ):void;
}


export interface FragmentFactory extends TransientFragmentFactory {
	isDecorated( object:object ):object is Fragment;

	is( value:any ):value is Fragment;


	decorate<T extends object>( object:T ):T & Fragment;
}


function resolveURI( fragment:Fragment, uri:string ):string {
	if( URI.isAbsolute( uri ) ) return uri;

	const schema:DigestedObjectSchema = fragment._document._documents.getGeneralSchema();
	return ObjectSchemaUtils.resolveURI( uri, schema, { vocab: true } );
}

function addTypeInPersistedFragment( this:Fragment, type:string ):void {
	type = resolveURI( this, type );
	return addTypeInResource.call( this, type );
}

function hasTypeInPersistedFragment( this:Fragment, type:string ):void {
	type = resolveURI( this, type );
	return hasTypeInResource.call( this, type );
}

function removeTypeInPersistedFragment( this:Fragment, type:string ):void {
	type = resolveURI( this, type );
	return removeTypeInResource.call( this, type );
}

export const Fragment:FragmentFactory = {
	isDecorated( object:object ):object is Fragment {
		return isObject( object ) &&
			object[ "addType" ] === addTypeInPersistedFragment &&
			object[ "hasType" ] === hasTypeInPersistedFragment &&
			object[ "removeType" ] === removeTypeInPersistedFragment
			;
	},

	is( value:any ):value is Fragment {
		return TransientFragment.is( value ) &&
			Resource.isDecorated( value ) &&
			Fragment.isDecorated( value )
			;
	},


	decorate<T extends object>( object:T ):T & Fragment {
		if( Fragment.isDecorated( object ) ) return object;

		TransientFragment.decorate( object );
		Resource.decorate( object );

		const fragment:T & Fragment = object as T & Fragment;
		Object.defineProperties( object, {
			"addType": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: addTypeInPersistedFragment,
			},
			"hasType": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: hasTypeInPersistedFragment,
			},
			"removeType": {
				writable: false,
				enumerable: false,
				configurable: true,
				value: removeTypeInPersistedFragment,
			},
		} );

		return fragment;
	},

	create: TransientFragment.create,
	createFrom: TransientFragment.createFrom,
};
