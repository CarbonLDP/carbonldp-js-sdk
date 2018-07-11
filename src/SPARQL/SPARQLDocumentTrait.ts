import { QueryClause } from "sparqler/clauses";
import {
	Document,
	TransientDocument
} from "../Document";
import { RequestOptions } from "../HTTP";
import { HTTPResolvableTrait } from "../Repository/HTTPResolvableTrait";
import {
	ModelDecorator,
	ModelPrototype
} from "../Model";
import { URI } from "../RDF";
import { ResolvablePointer } from "../Repository";
import { isObject, } from "../Utils";
import { FinishSPARQLSelect } from "./Builder";
import { SPARQLSelectResults } from "./SelectResults";
import { SPARQLDocumentsRepositoryTrait } from "./SPARQLDocumentsRepositoryTrait";


export interface BaseSPARQLDocumentTrait {
	$repository:SPARQLDocumentsRepositoryTrait;
}

export interface SPARQLDocumentTrait extends TransientDocument, HTTPResolvableTrait<Document> {
	$repository:SPARQLDocumentsRepositoryTrait;

	executeASKQuery( uri:string, askQuery:string, requestOptions?:RequestOptions ):Promise<boolean>;
	executeASKQuery( askQuery:string, requestOptions?:RequestOptions ):Promise<boolean>;

	executeSELECTQuery<T extends object>( uri:string, selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>>;
	executeSELECTQuery<T extends object>( selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>>;

	executeUPDATE( uri:string, update:string, requestOptions?:RequestOptions ):Promise<void>;
	executeUPDATE( update:string, requestOptions?:RequestOptions ):Promise<void>;


	sparql( uri?:string ):QueryClause<FinishSPARQLSelect>;
}


function __parseParams( this:void, resource:SPARQLDocumentTrait, uriOrQuery:string, queryOrOptions?:string | RequestOptions, options?:RequestOptions ):{ uri:string, query:string, options?:RequestOptions } {
	let uri:string = resource.$id;
	let query:string = uriOrQuery;

	if( isObject( queryOrOptions ) ) {
		options = queryOrOptions;
	} else if( queryOrOptions !== void 0 ) {
		query = queryOrOptions;
		uri = URI.resolve( resource.$id, uriOrQuery );
	}


	return { uri, query, options };
}

export type SPARQLDocumentTraitFactory =
	& ModelPrototype<SPARQLDocumentTrait, TransientDocument & ResolvablePointer>
	& ModelDecorator<SPARQLDocumentTrait, BaseSPARQLDocumentTrait>
	;

export const SPARQLDocumentTrait:SPARQLDocumentTraitFactory = {
	PROTOTYPE: {
		executeASKQuery( this:SPARQLDocumentTrait, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<boolean> {
			const { uri, query, options } = __parseParams( this, uriOrQuery, queryOrOptions, requestOptions );
			return this.$repository.executeASKQuery( uri, query, options );
		},

		executeSELECTQuery<T extends object>( this:SPARQLDocumentTrait, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>> {
			const { uri, query, options } = __parseParams( this, uriOrQuery, queryOrOptions, requestOptions );
			return this.$repository.executeSELECTQuery<T>( uri, query, options );
		},

		executeUPDATE( this:SPARQLDocumentTrait, uriOrQuery:string, updateOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { uri, query, options } = __parseParams( this, uriOrQuery, updateOrOptions, requestOptions );
			return this.$repository.executeUPDATE( uri, query, options );
		},


		sparql( this:SPARQLDocumentTrait, uri?:string ):QueryClause<FinishSPARQLSelect> {
			const $uri:string = uri ? URI.resolve( this.$id, uri ) : this.$id;
			return this.$repository.sparql( $uri );
		},
	},

	isDecorated( object:object ):object is SPARQLDocumentTrait {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( SPARQLDocumentTrait.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseSPARQLDocumentTrait>( object:T ):T & SPARQLDocumentTrait {
		if( SPARQLDocumentTrait.isDecorated( object ) ) return object;

		const target:T & TransientDocument & ResolvablePointer = ModelDecorator
			.decorateMultiple( object, TransientDocument, ResolvablePointer );

		return ModelDecorator
			.definePropertiesFrom( SPARQLDocumentTrait.PROTOTYPE, target );
	},
};
