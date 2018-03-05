import { Fragment } from "./Fragment";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import {
	DigestedObjectSchema,
	ObjectSchemaUtils,
} from "./ObjectSchema";
import { PersistedDocument } from "./PersistedDocument";
import { PersistedResource } from "./PersistedResource";
import { URI } from "./RDF/URI";
import {
	addTypeInResource,
	hasTypeInResource,
	removeTypeInResource,
} from "./Resource";
import { isObject } from "./Utils";

export interface PersistedFragment extends PersistedResource, Fragment {
	_document:PersistedDocument;

	addType( type:string ):void;

	hasType( type:string ):boolean;

	removeType( type:string ):void;
}


export interface PersistedFragmentFactory extends ModelFactory<PersistedFragment>, ModelDecorator<PersistedFragment> {
	isDecorated( object:object ):object is PersistedFragment;

	is( object:object ):object is PersistedFragment;


	decorate<T extends object>( object:T ):T & PersistedFragment;

	create( document:PersistedDocument, id?:string ):PersistedFragment;

	createFrom<T extends object>( object:T, document:PersistedDocument, id?:string ):T & PersistedFragment;
}


function resolveURI( fragment:PersistedFragment, uri:string ):string {
	if( URI.isAbsolute( uri ) ) return uri;

	const schema:DigestedObjectSchema = fragment._document._documents.getGeneralSchema();
	return ObjectSchemaUtils.resolveURI( uri, schema, { vocab: true } );
}

function addTypeInPersistedFragment( this:PersistedFragment, type:string ):void {
	type = resolveURI( this, type );
	return addTypeInResource.call( this, type );
}

function hasTypeInPersistedFragment( this:PersistedFragment, type:string ):void {
	type = resolveURI( this, type );
	return hasTypeInResource.call( this, type );
}

function removeTypeInPersistedFragment( this:PersistedFragment, type:string ):void {
	type = resolveURI( this, type );
	return removeTypeInResource.call( this, type );
}

export const PersistedFragment:PersistedFragmentFactory = {
	isDecorated( object:object ):object is PersistedFragment {
		return isObject( object ) &&
			object[ "addType" ] === addTypeInPersistedFragment &&
			object[ "hasType" ] === hasTypeInPersistedFragment &&
			object[ "removeType" ] === removeTypeInPersistedFragment
			;
	},

	is( object:object ):object is PersistedFragment {
		return Fragment.is( object ) &&
			PersistedResource.isDecorated( object ) &&
			PersistedFragment.isDecorated( object )
			;
	},


	decorate<T extends object>( object:T ):T & PersistedFragment {
		if( PersistedFragment.isDecorated( object ) ) return object;

		Fragment.decorate( object );
		PersistedResource.decorate( object );

		const fragment:T & PersistedFragment = object as T & PersistedFragment;
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

	create( document:PersistedDocument, id?:string ):PersistedFragment {
		return PersistedFragment.createFrom( {}, document, id );
	},

	createFrom<T extends object>( object:T, document:PersistedDocument, id?:string ):T & PersistedFragment {
		const fragment:T & PersistedFragment = PersistedFragment.decorate( object );

		fragment._document = document;
		if( id ) fragment.id = id;

		return fragment;
	},

};

export default PersistedFragment;
