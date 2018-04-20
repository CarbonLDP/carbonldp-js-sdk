import { TransientFragment } from "./TransientFragment";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import {
	DigestedObjectSchema,
	ObjectSchemaUtils,
} from "./ObjectSchema";
import { Document } from "./Document";
import { PersistedResource } from "./PersistedResource";
import { URI } from "./RDF/URI";
import {
	addTypeInResource,
	hasTypeInResource,
	removeTypeInResource,
} from "./TransientResource";
import { isObject } from "./Utils";

export interface Fragment extends PersistedResource, TransientFragment {
	_document:Document;

	addType( type:string ):void;

	hasType( type:string ):boolean;

	removeType( type:string ):void;
}


export interface FragmentFactory extends ModelFactory<Fragment>, ModelDecorator<Fragment> {
	isDecorated( object:object ):object is Fragment;

	is( object:object ):object is Fragment;


	decorate<T extends object>( object:T ):T & Fragment;

	create( document:Document, id?:string ):Fragment;

	createFrom<T extends object>( object:T, document:Document, id?:string ):T & Fragment;
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

	is( object:object ):object is Fragment {
		return TransientFragment.is( object ) &&
			PersistedResource.isDecorated( object ) &&
			Fragment.isDecorated( object )
			;
	},


	decorate<T extends object>( object:T ):T & Fragment {
		if( Fragment.isDecorated( object ) ) return object;

		TransientFragment.decorate( object );
		PersistedResource.decorate( object );

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

	create( document:Document, id?:string ):Fragment {
		return Fragment.createFrom( {}, document, id );
	},

	createFrom<T extends object>( object:T, document:Document, id?:string ):T & Fragment {
		const fragment:T & Fragment = Fragment.decorate( object );

		fragment._document = document;
		if( id ) fragment.id = id;

		return fragment;
	},

};
