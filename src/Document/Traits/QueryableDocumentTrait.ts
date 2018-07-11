import { QueryableDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/QueryableDocumentsRepositoryTrait";

import { GETOptions, RequestOptions } from "../../HTTP/Request";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { QueryDocumentBuilder } from "../../QueryDocument/QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "../../QueryDocument/QueryDocumentsBuilder";

import { _parseURIParams } from "../../DocumentsRepository/Utils";

import { Document } from "../Document";
import { LDPDocumentTrait } from "./LDPDocumentTrait";


export interface BaseQueryableDocumentTrait {
	$repository:QueryableDocumentsRepositoryTrait;
}

export interface QueryableDocumentTrait extends LDPDocumentTrait {
	$repository:QueryableDocumentsRepositoryTrait;


	get<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	resolve<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	resolve<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	resolve<T extends object>( document:Document, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;


	getChildren<T extends object>( requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getChildren<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getChildren<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getChildren<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;

	getMembers<T extends object>( requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getMembers<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getMembers<T extends object>( uri:string, requestOptions:RequestOptions, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;
	getMembers<T extends object>( uri:string, queryBuilderFn?:( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder ):Promise<(T & Document)[]>;


	listChildren<T extends object>( requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	listChildren<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;

	listMembers<T extends object>( requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	listMembers<T extends object>( uri:string, requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
}


type QueryDocsBuilderFn = Function & (( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder);

type ForcesOverloadedMembers = {
	get<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	resolve<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	resolve<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	resolve<T extends object>( document:Document, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
};

export type QueryableDocumentTraitFactory =
	& ModelPrototype<QueryableDocumentTrait, LDPDocumentTrait>
	& ModelDecorator<QueryableDocumentTrait, BaseQueryableDocumentTrait>
	;

export const QueryableDocumentTrait:QueryableDocumentTraitFactory = {
	PROTOTYPE: {
		getChildren<T extends object>( this:QueryableDocumentTrait, uriOrQueryBuilderFnOrOptions:string | QueryDocsBuilderFn | RequestOptions, queryBuilderFnOrOptions?:QueryDocsBuilderFn | RequestOptions, queryBuilderFn?:QueryDocsBuilderFn ):Promise<(T & Document)[]> {
			const { _uri, _args } = _parseURIParams( this, uriOrQueryBuilderFnOrOptions, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.getChildren( _uri, ..._args );
		},

		getMembers<T extends object>( this:QueryableDocumentTrait, uriOrQueryBuilderFnOrOptions:string | QueryDocsBuilderFn | RequestOptions, queryBuilderFnOrOptions?:QueryDocsBuilderFn | RequestOptions, queryBuilderFn?:QueryDocsBuilderFn ):Promise<(T & Document)[]> {
			const { _uri, _args } = _parseURIParams( this, uriOrQueryBuilderFnOrOptions, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.getMembers( _uri, ..._args );
		},


		listChildren<T extends object>( this:QueryableDocumentTrait, uriOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document)[]> {
			const { _uri, _args } = _parseURIParams( this, uriOrOptions, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.listChildren( _uri, ..._args );
		},

		listMembers<T extends object>( this:QueryableDocumentTrait, uriOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document)[]> {
			const { _uri, _args } = _parseURIParams( this, uriOrOptions, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.listMembers( _uri, ..._args );
		},
	},


	isDecorated( object:object ):object is QueryableDocumentTrait {
		return ModelDecorator
			.hasPropertiesFrom( QueryableDocumentTrait.PROTOTYPE, object );
	},

	decorate<T extends BaseQueryableDocumentTrait>( object:T ):T & QueryableDocumentTrait {
		if( QueryableDocumentTrait.isDecorated( object ) ) return object;

		type ForcedT = T & ForcesOverloadedMembers;
		const forced:ForcedT = object as ForcedT;

		const target:ForcedT & LDPDocumentTrait = ModelDecorator
			.decorateMultiple( forced, LDPDocumentTrait );

		return ModelDecorator
			.definePropertiesFrom( QueryableDocumentTrait.PROTOTYPE, target );
	},
};
