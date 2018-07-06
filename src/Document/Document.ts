import {
	ModelDecorator,
	ModelFactory,
	ModelSchema,
} from "../Model";
import {
	GETOptions,
	RequestOptions
} from "../HTTP";
import { MembersDocument } from "../Members";
import { MessagingDocument } from "../Messaging";
import { Pointer } from "../Pointer";
import { DocumentsRegistry } from "../Registry";
import { ResolvablePointer } from "../Repository";
import { PersistedResource } from "../Resource";
import { SPARQLDocument } from "../SPARQL";
import {
	QueryDocumentBuilder,
	QueryDocumentDocument
} from "../SPARQL/QueryDocument";
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
import { TransientDocument } from "./TransientDocument";


export interface Document extends CRUDDocument, MembersDocument, SPARQLDocument, MessagingDocument, QueryDocumentDocument, ResolvablePointer {
	$registry:DocumentsRegistry;

	created?:Date;
	modified?:Date;
	defaultInteractionModel?:Pointer;
	accessPoints?:Pointer[];
	hasMemberRelation?:Pointer;
	isMemberOfRelation?:Pointer;
	contains?:Pointer[];


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

function addEnsureIfPartial( this:void, iri:string, resource:Document, requestOptions:GETOptions ):void {
	if( requestOptions.ensureLatest ) return;
	if( ! resource.$registry || ! resource.$registry.hasPointer( iri, true ) ) return;

	const target:Document = resource.$registry.getPointer( iri, true );
	if( target.isPartial() ) requestOptions.ensureLatest = true;
}


type OverloadedProps =
	| "get"
	| "resolve"
	| "refresh"
	| "save"
	| "saveAndRefresh"
	| "isDirty"
	| "revert"
	;
const PROTOTYPE:PickSelfProps<Document, CRUDDocument & MembersDocument & SPARQLDocument & MessagingDocument & QueryDocumentDocument & ResolvablePointer, OverloadedProps> = {

	get<T extends object>( this:Document, uriOrOptionsOrQueryBuilderFn:string | GETOptions | QueryBuilderFn, optionsOrQueryBuilderFn?:GETOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<T & Document> {
		const iri:string = isString( uriOrOptionsOrQueryBuilderFn ) ? uriOrOptionsOrQueryBuilderFn : this.$id;

		const requestOptions:GETOptions = isObject( uriOrOptionsOrQueryBuilderFn ) ?
			uriOrOptionsOrQueryBuilderFn : isObject( optionsOrQueryBuilderFn ) ? optionsOrQueryBuilderFn : {};

		queryBuilderFn = isFunction( uriOrOptionsOrQueryBuilderFn ) ? uriOrOptionsOrQueryBuilderFn :
			isFunction( optionsOrQueryBuilderFn ) ? optionsOrQueryBuilderFn : queryBuilderFn;


		if( queryBuilderFn )
			return QueryDocumentDocument.PROTOTYPE
				.get.call( this, iri, requestOptions, queryBuilderFn );

		addEnsureIfPartial( iri, this, requestOptions );
		return CRUDDocument.PROTOTYPE.get.call( this, iri, requestOptions );
	},

	resolve<T extends object>( this:Document, optionsOrQueryBuilderFn?:GETOptions | QueryBuilderFn, queryBuilderFn?:QueryBuilderFn ):Promise<T & Document> {
		const requestOptions:GETOptions = isObject( optionsOrQueryBuilderFn ) ?
			optionsOrQueryBuilderFn : {};

		if( isFunction( optionsOrQueryBuilderFn ) ) queryBuilderFn = optionsOrQueryBuilderFn;

		if( queryBuilderFn )
			return QueryDocumentDocument.PROTOTYPE.resolve.call( this, requestOptions, queryBuilderFn );

		addEnsureIfPartial( this.$id, this, requestOptions );
		return CRUDDocument.PROTOTYPE.resolve.call( this, requestOptions );
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
			.some( fragment => ! this.hasFragment( fragment.$id ) );
		if( hasRemovedFragments ) return true;

		const hasNewFragments:boolean = this
			._savedFragments.length !== this.__resourcesMap.size;
		if( hasNewFragments ) return true;

		return this
			._savedFragments
			.some( fragment => fragment.isDirty() );
	},

	revert( this:Document ):void {
		PersistedResource.PROTOTYPE.revert.call( this );

		this.__resourcesMap.clear();
		this
			._savedFragments
			.forEach( fragment => {
				fragment.revert();

				const localID:string = "slug" in fragment ?
					fragment.slug : fragment.$id;

				this.__resourcesMap.set( localID, fragment );
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
