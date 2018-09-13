import { DocumentsRegistry } from "../DocumentsRegistry/DocumentsRegistry";
import { DocumentsRepository } from "../DocumentsRepository/DocumentsRepository";

import { Fragment } from "../Fragment/Fragment";

import { GETOptions, RequestOptions } from "../HTTP/Request";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelSchema } from "../Model/ModelSchema";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { QueryDocumentBuilder } from "../QueryDocuments/QueryDocumentBuilder";

import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { $Registry } from "../Registry/Registry";
import { ResolvablePointer } from "../Repository/ResolvablePointer";

import { isObject } from "../Utils";

import { C } from "../Vocabularies/C";
import { LDP } from "../Vocabularies/LDP";
import { XSD } from "../Vocabularies/XSD";

import { BaseDocument } from "./BaseDocument";

import { EventEmitterDocumentTrait } from "./Traits/EventEmitterDocumentTrait";
import { QueryableDocumentTrait } from "./Traits/QueryableDocumentTrait";
import { SPARQLDocumentTrait } from "./Traits/SPARQLDocumentTrait";

import { TransientDocument } from "./TransientDocument";


export interface BaseResolvableDocument extends BaseDocument {
	$registry:DocumentsRegistry;
	$repository:DocumentsRepository;
}

export interface Document extends $Registry<Fragment>, QueryableDocumentTrait, SPARQLDocumentTrait, EventEmitterDocumentTrait {
	$registry:DocumentsRegistry;
	$repository:DocumentsRepository;


	$__modelDecorator:ModelDecorator<Fragment>;
	$__resourcesMap:Map<string, Fragment>;
	$__savedFragments:Fragment[];


	created?:Date;
	modified?:Date;
	accessPoints?:Document[];
	contains?:Document[];


	$getPointer( id:string ):RegisteredPointer;
	$getPointer( id:string, local:true ):Fragment;

	$getPointers():RegisteredPointer[];
	$getPointers( local:true ):Fragment[];


	$_syncSavedFragments():void;

	$getFragment<T extends object>( id:string ):(T & Fragment) | null;

	$getFragments():Fragment[];

	$createFragment<T extends object>( object:T, id?:string ):T & Fragment;
	$createFragment( slug?:string ):Fragment;

	$removeFragment( slugOrFragment:string | Fragment ):boolean;


	$get<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	$get<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	$get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	$get<T extends object>( uri:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	$resolve<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	$resolve<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	$resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	$resolve<T extends object>( document:Document, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;


	$refresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this>;
	$refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	$save<T extends object>( requestOptions?:RequestOptions ):Promise<T & this>;
	$save<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	$saveAndRefresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this>;
	$saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;
}


type ForcedMembers = Pick<Document,
	| "$__resourcesMap"
	| "$getPointer"
	| "$getPointers"
	| "$getFragment"
	| "$getFragments"
	| "$createFragment"
	| "$removeFragment"
	| never >;

export type OverriddenMembers =
	| "$_syncSnapshot"
	| "$isDirty"
	| "$revert"
	;

export type DocumentFactory =
	& ModelSchema<C[ "Document" ]>
	& ModelPrototype<Document, SPARQLDocumentTrait & EventEmitterDocumentTrait & QueryableDocumentTrait, OverriddenMembers>
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
		get $__savedFragments():Fragment[] { return []; },

		$_syncSavedFragments( this:Document ):void {
			this.$__savedFragments = Array
				.from( this.$__resourcesMap.values() );

			this.$__savedFragments
				.forEach( fragment => fragment.$_syncSnapshot() );
		},


		$_syncSnapshot( this:Document ):void {
			ResolvablePointer.PROTOTYPE.$_syncSnapshot.call( this );
			this.$_syncSavedFragments();
		},

		$isDirty( this:Document ):boolean {
			const isSelfDirty:boolean = ResolvablePointer.PROTOTYPE.$isDirty.call( this );
			if( isSelfDirty ) return true;

			const hasRemovedFragments:boolean = this
				.$__savedFragments
				.some( fragment => ! this.$hasFragment( fragment.$id ) );
			if( hasRemovedFragments ) return true;

			const hasNewFragments:boolean = this
				.$__savedFragments.length !== this.$__resourcesMap.size;
			if( hasNewFragments ) return true;

			return this
				.$__savedFragments
				.some( fragment => fragment.$isDirty() );
		},

		$revert( this:Document ):void {
			ResolvablePointer.PROTOTYPE.$revert.call( this );

			this.$__resourcesMap.clear();
			this
				.$__savedFragments
				.forEach( fragment => {
					fragment.$revert();
					this.$__resourcesMap.set( fragment.$slug, fragment );
				} );
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

		type ForcedT = T & ForcedMembers & Pick<Document, "$__modelDecorator">;
		const base:ForcedT = Object.assign( object as T & ForcedMembers, {
			$__modelDecorator: Fragment,
		} );

		const target:ForcedT & SPARQLDocumentTrait & EventEmitterDocumentTrait & QueryableDocumentTrait = ModelDecorator
			.decorateMultiple( base, SPARQLDocumentTrait, EventEmitterDocumentTrait, QueryableDocumentTrait );

		return ModelDecorator
			.definePropertiesFrom( Document.PROTOTYPE, target );
	},


	create: TransientDocument.create,
	createFrom: TransientDocument.createFrom,
};
