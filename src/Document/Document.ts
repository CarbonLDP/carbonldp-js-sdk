import { AccessPoint } from "../AccessPoint/AccessPoint";

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
import { QueryDocumentsBuilder } from "../QueryDocuments/QueryDocumentsBuilder";

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
import { ObjectSchema } from "../ObjectSchema";


/**
 * Required properties for creating a {@link Document} object.
 */
export interface BaseResolvableDocument extends BaseDocument {
	/**
	 * Registry where the created {@link Document} will exist.
	 */
	$registry:DocumentsRegistry;
	/**
	 * Repository where the created {@link Document} can manage its data.
	 */
	$repository:DocumentsRepository;
}


/**
 * Model that represents a `c:Document`.
 */
export interface Document extends $Registry<Fragment>, QueryableDocumentTrait, SPARQLDocumentTrait, EventEmitterDocumentTrait {
	/**
	 * Registry where the document exists.
	 */
	$registry:DocumentsRegistry;
	/**
	 * Repository where the document can manage its data.
	 */
	$repository:DocumentsRepository;


	/**
	 * @see {@ink $Registry.$__modelDecorator}
	 */
	$__modelDecorator:ModelDecorator<Fragment>;
	/**
	 * @see {@link $Registry.$__resourcesMap}
	 */
	$__resourcesMap:Map<string, Fragment>;
	/**
	 * Array with the fragments that has been persisted.
	 */
	$__savedFragments:Fragment[];


	/**
	 * Datetime when the document was persisted.
	 */
	created?:Date;
	/**
	 * Last datetime when the document was modified.
	 */
	modified?:Date;
	/**
	 * Set with the access points of the document.
	 */
	accessPoints?:AccessPoint[];
	/**
	 * Set with the children of the document.
	 */
	contains?:Document[];


	/**
	 * @see {@link $Registry.$getPointer}
	 */
	$getPointer( id:string ):RegisteredPointer;
	$getPointer( id:string, local:true ):Fragment;

	/**
	 * @see {@link $Registry.$getPointers}
	 */
	$getPointers():RegisteredPointer[];
	$getPointers( local:true ):Fragment[];


	/**
	 * Makes all the current fragments in the document as fragments
	 * that has been persisted in the served.
	 */
	$_syncSavedFragments():void;

	/**
	 * @see {@link TransientDocument.$getFragment}
	 */
	$getFragment<T extends object>( id:string ):(T & Fragment) | null;

	/**
	 * @see {@link TransientDocument.$getFragments}
	 */
	$getFragments():Fragment[];

	/**
	 * @see {@link TransientDocument.$createFragment}
	 */
	$createFragment<T extends object>( object:T, id?:string ):T & Fragment;
	$createFragment( slug?:string ):Fragment;

	/**
	 * @see {@link TransientDocument.$removeFragment}
	 */
	$removeFragment( slugOrFragment:string | Fragment ):boolean;


	/**
	 * @see {@link QueryableDocumentTrait.$get}
	 */
	$get<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	$get<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	$get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	$get<T extends object>( uri:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	$get<T extends object>( uris:string[], queryBuilderFn:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	$get<T extends object>( uris:string[], requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	/**
	 * @see {@link QueryableDocumentTrait.$resolve}
	 */
	$resolve<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	$resolve<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	$resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	$resolve<T extends object>( document:Document, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	/**
	 * Checks if the current document exists.
	 * @param requestOptions Customizable options for the request.
	 */
	$exists( requestOptions?:RequestOptions ):Promise<boolean>;
	/**
	 * Checks if the document of the specified URI exists.
	 * @param uri The URI of the document to check its existence.
	 * @param requestOptions Customizable options for the request.
	 */
	$exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;


	/**
	 * Refreshes with the latest data of the current document.
	 * If the document was retrieved partially, only the partial properties will be refreshed.
	 * @param requestOptions Customizable options for the request.
	 */
	$refresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this>;
	/**
	 * Refreshes with the latest data of the specified document.
	 * If the document was retrieved partially, only the partial properties will be refreshed.
	 * @param document The document to be refreshed.
	 * @param requestOptions Customizable options for the request.
	 */
	$refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	/**
	 * Saves the changes of the current document.
	 * @param requestOptions Customizable options for the request.
	 */
	$save<T extends object>( requestOptions?:RequestOptions ):Promise<T & this>;
	/**
	 * Saves the changes of the specified document.
	 * @param document The document to be saved.
	 * @param requestOptions Customizable options for the request.
	 */
	$save<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	/**
	 * Saves the changes of the current document and retrieves its latest changes.
	 * If the document was retrieved partially, only the partial properties will be refreshed.
	 * @param requestOptions Customizable options for the request.
	 */
	$saveAndRefresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this>;
	/**
	 * Saves the changes of the specified document and retrieves its latest changes.
	 * If the document was retrieved partially, only the partial properties will be refreshed.
	 * @param document The resource to saved and refreshed.
	 * @param requestOptions Customizable options for the request.
	 */
	$saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	/**
	 * Deletes the current document.
	 * @param requestOptions Customizable options for the request.
	 */
	$delete( requestOptions?:RequestOptions ):Promise<void>;
	/**
	 * Deletes the document of the specified URI.
	 * @param uri URI of the document to be deleted.
	 * @param requestOptions Customizable options for the request.
	 */
	$delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}


type ForcedMembers = Pick<Document,
	| "$__resourcesMap"
	| "$getPointer"
	| "$getPointers"
	| "$getFragment"
	| "$getFragments"
	| "$createFragment"
	| "$removeFragment"
	| never>;

export type OverriddenMembers =
	| "$_syncSnapshot"
	| "$isDirty"
	| "$revert"
	;

/**
 * Factory, decorator and utils for {@link Document} objects.
 */
export type DocumentFactory =
	& ModelSchema<C[ "Document" ]>
	& ModelPrototype<Document, SPARQLDocumentTrait & EventEmitterDocumentTrait & QueryableDocumentTrait, OverriddenMembers>
	& ModelDecorator<Document, BaseResolvableDocument>
	& ModelTypeGuard<Document>
	& ModelFactory<TransientDocument, BaseDocument>
	;

/**
 * Constant with the factory, decorator and/or utils for a {@link Document} object.
 */
export const Document:{

		/**
		 * Specifies the type of the  object, in this case  'https://carbonldp.com/ns/v1/platform#Document'
		 */
		TYPE: C["Document"];

		/**
		 * Defines the basic schema for the {@link Document}.
		 */
		SCHEMA: ObjectSchema;

		/**
		 * The object with the properties/methods to use in the decoration of a {@link Document}
		 */
		PROTOTYPE: DocumentFactory["PROTOTYPE"];

		/**
		 * Checks if the document has the decorated properties and methods from its prototype.
		 */
		isDecorated( object:object): object is Document;

		/**
		 * Returns true when the value provided is considered to be a {@link Document}.
		 */
		is( object:object ): object is Document;

		/**
		 * Defines the document's prototype properties and methods to the document object.
		 */
		decorate<T extends object>( object:T &  BaseResolvableDocument ):T & Document;

		/**
		 * Creates a {@link Document} with the provided data.
		 */
		create<T extends object>( data?:T & BaseDocument ): T & TransientDocument;

		/**
		 * Creates a {@link Document} from the provided Document.
		 */
		createFrom<T extends object>( object:T & BaseDocument ):T & TransientDocument;
} = {
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
