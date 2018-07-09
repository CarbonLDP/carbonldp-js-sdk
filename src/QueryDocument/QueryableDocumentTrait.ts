import { Document } from "../Document";
import {
	GETOptions,
	RequestOptions
} from "../HTTP";
import { LDPDocumentTrait } from "../LDP/LDPDocumentTrait";
import {
	ModelDecorator,
	ModelPrototype
} from "../Model";
import { URI } from "../RDF";
import {
	isFunction,
	isObject,
	isString
} from "../Utils";
import { QueryableDocumentsRepositoryTrait } from "./QueryableDocumentsRepositoryTrait";
import { QueryDocumentBuilder } from "./QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "./QueryDocumentsBuilder";


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


	refresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;

	save<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;

	saveAndRefresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;


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


type QueryDocBuilderFn = Function & (( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder);
type QueryDocsBuilderFn = Function & (( queryBuilder:QueryDocumentsBuilder ) => QueryDocumentsBuilder);


function __parseGetDocsParams<T extends QueryDocBuilderFn | QueryDocsBuilderFn>( resource:QueryableDocumentTrait, uriOrQueryBuilderFnOrOptions:string | T | RequestOptions, queryBuilderFnOrOptions?:T | RequestOptions, queryBuilderFn?:T ):{ uri:string, options?:RequestOptions, builder?:T } {
	const uri:string | undefined = isString( uriOrQueryBuilderFnOrOptions )
		? URI.resolve( resource.$id, uriOrQueryBuilderFnOrOptions ) : resource.$id;

	const options:RequestOptions = isObject( uriOrQueryBuilderFnOrOptions ) ?
		uriOrQueryBuilderFnOrOptions as RequestOptions : isObject( queryBuilderFnOrOptions ) ?
			queryBuilderFnOrOptions as RequestOptions : {};

	const builder:T = isFunction( uriOrQueryBuilderFnOrOptions ) ?
		uriOrQueryBuilderFnOrOptions : isFunction( queryBuilderFnOrOptions ) ?
			queryBuilderFnOrOptions : queryBuilderFn;

	return { uri, options, builder };
}

function __parseListDocsParams( resource:QueryableDocumentTrait, uriOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):{ uri:string, options?:RequestOptions } {
	const uri:string | undefined = isString( uriOrOptions )
		? URI.resolve( resource.$id, uriOrOptions ) : resource.$id;

	const options:RequestOptions = isObject( uriOrOptions ) ?
		uriOrOptions : isObject( requestOptions ) ?
			requestOptions : {};

	return { uri, options };
}


export type OverloadedMembers =
	| "get"
	| "resolve"
	;

export type QueryableDocumentTraitFactory =
	& ModelPrototype<QueryableDocumentTrait, LDPDocumentTrait, OverloadedMembers>
	& ModelDecorator<QueryableDocumentTrait, BaseQueryableDocumentTrait>
	;

export const QueryableDocumentTrait:QueryableDocumentTraitFactory = {
	PROTOTYPE: {
		get<T extends object>( this:QueryableDocumentTrait, uriOrOptionsOrQueryBuilderFn:string | GETOptions | QueryDocBuilderFn, optionsOrQueryBuilderFn?:GETOptions | QueryDocBuilderFn, queryBuilderFn?:QueryDocBuilderFn ):Promise<T & Document> {
			const { uri, options, builder } = __parseGetDocsParams( this, uriOrOptionsOrQueryBuilderFn, optionsOrQueryBuilderFn, queryBuilderFn );
			return this.$repository.get( uri, options, builder );
		},

		resolve<T extends object>( this:Document, optionsOrQueryBuilderFn?:GETOptions | QueryDocBuilderFn, queryBuilderFn?:QueryDocBuilderFn ):Promise<T & Document> {
			return this.$repository.resolve( this, optionsOrQueryBuilderFn, queryBuilderFn );
		},


		getChildren<T extends object>( this:QueryableDocumentTrait, uriOrQueryBuilderFnOrOptions:string | QueryDocsBuilderFn | RequestOptions, queryBuilderFnOrOptions?:QueryDocsBuilderFn | RequestOptions, queryBuilderFn?:QueryDocsBuilderFn ):Promise<(T & Document)[]> {
			const { uri, options, builder } = __parseGetDocsParams( this, uriOrQueryBuilderFnOrOptions, queryBuilderFnOrOptions, queryBuilderFn );
			return this.$repository.getChildren( uri, options, builder );
		},

		getMembers<T extends object>( this:QueryableDocumentTrait, uriOrQueryBuilderFnOrOptions:string | QueryDocsBuilderFn | RequestOptions, queryBuilderFnOrOptions?:QueryDocsBuilderFn | RequestOptions, queryBuilderFn?:QueryDocsBuilderFn ):Promise<(T & Document)[]> {
			const { uri, options, builder } = __parseGetDocsParams( this, uriOrQueryBuilderFnOrOptions, queryBuilderFnOrOptions, queryBuilderFn );
			return this.$repository.getMembers( uri, options, builder );
		},


		listChildren<T extends object>( this:QueryableDocumentTrait, uriOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document)[]> {
			const { uri, options } = __parseListDocsParams( this, uriOrOptions, requestOptions );
			return this.$repository.listChildren( uri, options );
		},

		listMembers<T extends object>( this:QueryableDocumentTrait, uriOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document)[]> {
			const { uri, options } = __parseListDocsParams( this, uriOrOptions, requestOptions );
			return this.$repository.listMembers( uri, options );
		},
	},


	isDecorated( object:object ):object is QueryableDocumentTrait {
		return ModelDecorator
			.hasPropertiesFrom( QueryableDocumentTrait.PROTOTYPE, object );
	},

	decorate<T extends BaseQueryableDocumentTrait>( object:T ):T & QueryableDocumentTrait {
		if( QueryableDocumentTrait.isDecorated( object ) ) return object;

		const target:T & LDPDocumentTrait = ModelDecorator
			.decorateMultiple( object, LDPDocumentTrait );

		return ModelDecorator
			.definePropertiesFrom( QueryableDocumentTrait.PROTOTYPE, target );
	},
};
