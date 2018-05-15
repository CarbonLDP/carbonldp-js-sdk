import { BlankNode } from "../BlankNode";
import {
	ModelDecorator,
	ModelSchema,
} from "../core";
import { Fragment } from "../Fragment";
import {
	GETOptions,
	RequestOptions
} from "../HTTP";
import { MessagingDocument } from "../Messaging";
import { NamedFragment } from "../NamedFragment";
import { Pointer } from "../Pointer";
import { PersistedResource } from "../Resource";
import { QueryDocumentBuilder } from "../SPARQL/QueryDocument";
import * as Utils from "../Utils";
import {
	isFunction,
	isObject,
	isString,
	PickSelfProps
} from "../Utils";
import {
	C,
	LDP,
	XSD,
} from "../Vocabularies";
import { BaseDocument } from "./BaseDocument";
import { CRUDDocument } from "./CRUDDocument";
import { MembersDocument } from "./MembersDocument";
import { QueryDocumentDocument } from "./QueryDocumentDocument";
import { SPARQLDocument } from "./SPARQLDocument";
import { TransientDocument } from "./TransientDocument";


export interface Document extends CRUDDocument, MembersDocument, SPARQLDocument, MessagingDocument, QueryDocumentDocument {
	created?:Date;
	modified?:Date;
	defaultInteractionModel?:Pointer;
	accessPoints?:Pointer[];
	hasMemberRelation?:Pointer;
	isMemberOfRelation?:Pointer;
	contains?:Pointer[];

	_savedFragments:(BlankNode | NamedFragment)[];
	_syncSavedFragments():void;


	get<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	resolve<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	resolve<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;


	refresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this>;

	save<T extends object>( requestOptions?:RequestOptions ):Promise<T & this>;

	saveAndRefresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this>;
}


type QueryBuilderFn = Function & (( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder);


type OverloadedProps =
	| "get"
	| "resolve"
	| "refresh"
	| "save"
	| "saveAndRefresh"
	| "isDirty"
	| "revert"
	;
const PROTOTYPE:PickSelfProps<Document, CRUDDocument & MembersDocument & SPARQLDocument & MessagingDocument & QueryDocumentDocument, OverloadedProps> = {
	get _savedFragments():Fragment[] { return []; },

	_syncSavedFragments( this:Document ):void {
		this._savedFragments = Utils.ArrayUtils
			.from( this._resourcesMap.values() )
			.map( Fragment.decorate )
		;

		this._savedFragments
			.forEach( fragment => fragment._syncSnapshot() )
		;
	},


	get<T extends object>( this:Document, uriOrOptionsOrQueryBuilderFn:string | GETOptions | QueryBuilderFn, optionsOrQueryBuilderFn?:GETOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<T & Document> {
		const iri:string = isString( uriOrOptionsOrQueryBuilderFn ) ? uriOrOptionsOrQueryBuilderFn : "";

		const requestOptions:GETOptions = isObject( uriOrOptionsOrQueryBuilderFn ) ?
			uriOrOptionsOrQueryBuilderFn : isObject( optionsOrQueryBuilderFn ) ? optionsOrQueryBuilderFn : {};

		queryBuilderFn = isFunction( uriOrOptionsOrQueryBuilderFn ) ? uriOrOptionsOrQueryBuilderFn :
			isFunction( optionsOrQueryBuilderFn ) ? optionsOrQueryBuilderFn : queryBuilderFn;


		if( queryBuilderFn )
			return QueryDocumentDocument.PROTOTYPE
				.get.call( this, iri, requestOptions, queryBuilderFn );


		if( this._registry.hasPointer( iri ) && ! requestOptions.ensureLatest ) {
			const resource:T & Document = this._registry.getPointer( iri ) as any;
			if( resource.isPartial() ) requestOptions.ensureLatest = true;
		}

		return CRUDDocument.PROTOTYPE.get.call( this, uriOrOptionsOrQueryBuilderFn as string, optionsOrQueryBuilderFn as GETOptions );
	},

	resolve<T extends object>( this:Document, optionsOrQueryBuilderFn?:GETOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<T & Document> {
		return this.get( optionsOrQueryBuilderFn, queryBuilderFn );
	},


	refresh<T extends object>( this:Document, requestOptions?:RequestOptions ):Promise<T & Document> {
		if( this.isPartial() )
			return QueryDocumentDocument.PROTOTYPE.refresh.call( this, requestOptions );
		return CRUDDocument.PROTOTYPE.refresh.call( this, requestOptions );
	},

	save<T extends object>( this:Document, requestOptions?:RequestOptions ):Promise<T & Document> {
		if( this.isPartial() )
			return QueryDocumentDocument.PROTOTYPE.save.call( this, requestOptions );
		return CRUDDocument.PROTOTYPE.save.call( this, requestOptions );
	},

	saveAndRefresh<T extends object>( this:Document, requestOptions?:RequestOptions ):Promise<T & Document> {
		if( this.isPartial() )
			return QueryDocumentDocument.PROTOTYPE.saveAndRefresh.call( this, requestOptions );
		return CRUDDocument.PROTOTYPE.saveAndRefresh.call( this, requestOptions );
	},


	isDirty( this:Document ):boolean {
		const isSelfDirty:boolean = PersistedResource.PROTOTYPE.isDirty.call( this );
		if( isSelfDirty ) return true;

		const hasRemovedFragments:boolean = this
			._savedFragments
			.some( fragment => ! this.hasFragment( fragment.id ) );
		if( hasRemovedFragments ) return true;

		const hasNewFragments:boolean = this
			._savedFragments.length !== this._resourcesMap.size;
		if( hasNewFragments ) return true;

		return this
			._savedFragments
			.some( fragment => fragment.isDirty() );
	},

	revert( this:Document ):void {
		PersistedResource.PROTOTYPE.revert.call( this );

		this._resourcesMap.clear();
		this
			._savedFragments
			.forEach( fragment => {
				fragment.revert();

				const localID:string = "slug" in fragment ?
					fragment.slug : fragment.id;

				this._resourcesMap.set( localID, fragment );
			} );
	},
};

export interface DocumentFactory extends ModelSchema, ModelDecorator<Document> {
	PROTOTYPE:PickSelfProps<Document,
		CRUDDocument & MembersDocument & SPARQLDocument & MessagingDocument & QueryDocumentDocument,
		| "get"
		| "resolve"
		| "refresh"
		| "save"
		| "saveAndRefresh"
		| "isDirty"
		| "revert">;

	TYPE:C[ "Document" ];

	is( object:object ):object is Document;

	isDecorated( object:object ):object is Document;


	create<T extends object>( data?:T & BaseDocument ):T & TransientDocument;

	createFrom<T extends object>( object:T & BaseDocument ):T & TransientDocument;

	decorate<T extends object>( object:T ):T & Document;
}

export const Document:DocumentFactory = {
	PROTOTYPE,

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


	isDecorated( object:object ):object is Document {
		return Utils.isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object )
			;
	},

	is( object:object ):object is Document {
		return CRUDDocument.is( object )
			&& MembersDocument.isDecorated( object )
			&& SPARQLDocument.isDecorated( object )
			&& MessagingDocument.isDecorated( object )
			&& QueryDocumentDocument.isDecorated( object )
			&& Document.isDecorated( object )
			;
	},


	decorate<T extends object>( object:T ):T & Document {
		if( Document.isDecorated( object ) ) return object;

		const resource:T
			& CRUDDocument
			& MembersDocument
			& SPARQLDocument
			& MessagingDocument
			& QueryDocumentDocument
			= ModelDecorator
			.decorateMultiple( object,
				CRUDDocument,
				MembersDocument,
				SPARQLDocument,
				MessagingDocument,
				QueryDocumentDocument
			)
		;

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},


	create: TransientDocument.create,
	createFrom: TransientDocument.createFrom,
};
