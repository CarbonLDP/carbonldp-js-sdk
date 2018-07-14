import { DocumentsRegistry } from "../DocumentsRegistry/DocumentsRegistry";
import { DocumentsRepository } from "../DocumentsRepository/DocumentsRepository";

import { Fragment } from "../Fragment/Fragment";

import { GETOptions, RequestOptions } from "../HTTP/Request";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelSchema } from "../Model/ModelSchema";
import { ModelTypeGuard, } from "../Model/ModelTypeGuard";

import { QueryDocumentBuilder } from "../QueryDocuments/QueryDocumentBuilder";

import { RegisteredPointer } from "../Registry/RegisteredPointer";

import { isObject } from "../Utils";

import { C } from "../Vocabularies/C";
import { LDP } from "../Vocabularies/LDP";
import { XSD } from "../Vocabularies/XSD";

import { BaseDocument } from "./BaseDocument";

import { EventEmitterDocumentTrait } from "./Traits/EventEmitterDocumentTrait";
import { QueryableDocumentTrait } from "./Traits/QueryableDocumentTrait";
import { SPARQLDocumentTrait } from "./Traits/SPARQLDocumentTrait";

import { TransientDocument } from "./TransientDocument";


export interface BaseResolvableDocument {
	$registry:DocumentsRegistry;
	$repository:DocumentsRepository;
}

export interface Document extends SPARQLDocumentTrait, EventEmitterDocumentTrait, QueryableDocumentTrait {
	$registry:DocumentsRegistry;
	$repository:DocumentsRepository;


	__modelDecorator:ModelDecorator<Fragment>;
	__resourcesMap:Map<string, Fragment>;
	__savedFragments:Fragment[];


	created?:Date;
	modified?:Date;
	accessPoints?:Document[];
	contains?:Document[];


	getPointer( id:string ):RegisteredPointer;
	getPointer( id:string, local:true ):Fragment;

	getPointers():RegisteredPointer[];
	getPointers( local:true ):Fragment[];


	_syncSavedFragments():void;

	getFragment<T extends object>( id:string ):(T & Fragment) | null;

	getFragments():Fragment[];

	createFragment<T extends object>( object:T, id?:string ):T & Fragment;
	createFragment( slug?:string ):Fragment;

	removeFragment( slugOrFragment:string | Fragment ):boolean;


	get<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	resolve<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	resolve<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	resolve<T extends object>( document:Document, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;


	exists( requestOptions?:RequestOptions ):Promise<boolean>;
	exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;


	refresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;
	refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	save<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;
	save<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	saveAndRefresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;
	saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	delete( requestOptions?:RequestOptions ):Promise<void>;
	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}


type ForcedMembers = {
	__resourcesMap:Map<string, Fragment>;


	getPointer( id:string ):RegisteredPointer;
	getPointer( id:string, local:true ):Fragment;

	getPointers():RegisteredPointer[];
	getPointers( local:true ):Fragment[];


	getFragment<T extends object>( id:string ):(T & Fragment) | null;

	getFragments():Fragment[];

	createFragment<T extends object>( object:T, id?:string ):T & Fragment;
	createFragment( slug?:string ):Fragment;

	removeFragment( slugOrFragment:string | Fragment ):boolean;
};

export type DocumentFactory =
	& ModelSchema<C[ "Document" ]>
	& ModelPrototype<Document, SPARQLDocumentTrait & EventEmitterDocumentTrait & QueryableDocumentTrait>
	& ModelDecorator<Document, BaseResolvableDocument>
	& ModelTypeGuard<Document>
	& ModelFactory<TransientDocument, BaseDocument>
	;

export const Document:DocumentFactory = {
	TYPE: C.Document,
	SCHEMA: {
		"contains": {
			"@id": LDP.contains,
			"@container": "@set",
			"@type": "@id",
		},
		"members": {
			"@id": LDP.member,
			"@container": "@set",
			"@type": "@id",
		},
		"membershipResource": {
			"@id": LDP.membershipResource,
			"@type": "@id",
		},
		"isMemberOfRelation": {
			"@id": LDP.isMemberOfRelation,
			"@type": "@id",
		},
		"hasMemberRelation": {
			"@id": LDP.hasMemberRelation,
			"@type": "@id",
		},
		"insertedContentRelation": {
			"@id": LDP.insertedContentRelation,
			"@type": "@id",
		},
		"created": {
			"@id": C.created,
			"@type": XSD.dateTime,
		},
		"modified": {
			"@id": C.modified,
			"@type": XSD.dateTime,
		},
		"defaultInteractionModel": {
			"@id": C.defaultInteractionModel,
			"@type": "@id",
		},
		"accessPoints": {
			"@id": C.accessPoint,
			"@type": "@id",
			"@container": "@set",
		},
	},

	PROTOTYPE: {
		get __savedFragments():Fragment[] { return []; },

		_syncSavedFragments( this:Document ):void {
			this.__savedFragments = Array
				.from( this.__resourcesMap.values() )
				.map( Fragment.decorate )
			;

			this.__savedFragments
				.forEach( fragment => fragment._syncSnapshot() )
			;
		},
	},


	isDecorated( object:object ):object is Document {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( Document.PROTOTYPE, object )
			;
	},

	is( object:object ):object is Document {
		return TransientDocument.is( object )
			&& SPARQLDocumentTrait.isDecorated( object )
			&& EventEmitterDocumentTrait.isDecorated( object )
			&& QueryableDocumentTrait.isDecorated( object )
			&& Document.isDecorated( object )
			;
	},


	decorate<T extends BaseResolvableDocument>( object:T ):T & Document {
		if( Document.isDecorated( object ) ) return object;

		type ForcedT = T & ForcedMembers & { __modelDecorator:ModelDecorator<Fragment> };
		const base:ForcedT = Object.assign( object as T & ForcedMembers, {
			__modelDecorator: Fragment,
		} );

		const target:ForcedT & SPARQLDocumentTrait & EventEmitterDocumentTrait & QueryableDocumentTrait = ModelDecorator
			.decorateMultiple( base, SPARQLDocumentTrait, EventEmitterDocumentTrait, QueryableDocumentTrait );

		return ModelDecorator
			.definePropertiesFrom( Document.PROTOTYPE, target );
	},


	create: TransientDocument.create,
	createFrom: TransientDocument.createFrom,
};
