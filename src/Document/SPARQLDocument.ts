import { QueryClause } from "sparqler/clauses";
import { ModelDecorator } from "../core";
import { IllegalActionError } from "../Errors";
import { RequestOptions } from "../HTTP";
import { DigestedObjectSchema } from "../ObjectSchema";
import { DocumentsRegistry } from "../Registry";
import {
	FinishSPARQLSelect,
	SPARQLBuilder,
	SPARQLRawResults,
	SPARQLSelectResults,
	SPARQLService,
} from "../SPARQL";
import {
	isObject,
	PickSelfProps,
	promiseMethod,
} from "../Utils";
import { TransientDocument } from "./TransientDocument";


export interface SPARQLDocument extends TransientDocument {
	executeRawASKQuery( uri:string, askQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLRawResults>;
	executeRawASKQuery( askQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLRawResults>;

	executeASKQuery( uri:string, askQuery:string, requestOptions?:RequestOptions ):Promise<boolean>;
	executeASKQuery( askQuery:string, requestOptions?:RequestOptions ):Promise<boolean>;


	executeRawSELECTQuery( uri:string, selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLRawResults>;
	executeRawSELECTQuery( selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLRawResults>;

	executeSELECTQuery<T extends object>( uri:string, selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>>;
	executeSELECTQuery<T extends object>( selectQuery:string, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>>;


	executeRawCONSTRUCTQuery( uri:string, constructQuery:string, requestOptions?:RequestOptions ):Promise<string>;
	executeRawCONSTRUCTQuery( constructQuery:string, requestOptions?:RequestOptions ):Promise<string>;


	executeRawDESCRIBEQuery( uri:string, describeQuery:string, requestOptions?:RequestOptions ):Promise<string>;
	executeRawDESCRIBEQuery( describeQuery:string, requestOptions?:RequestOptions ):Promise<string>;


	executeUPDATE( uri:string, update:string, requestOptions?:RequestOptions ):Promise<void>;
	executeUPDATE( update:string, requestOptions?:RequestOptions ):Promise<void>;

	sparql( uri?:string ):QueryClause<FinishSPARQLSelect>;
}


function getRegistry( repository:SPARQLDocument ):DocumentsRegistry {
	if( repository._registry ) return repository._registry;
	throw new IllegalActionError( `"${ repository.id }" does't support SPARQL requests.` );
}

function parseParams( resource:SPARQLDocument, uriOrQuery:string, queryOrOptions?:string | RequestOptions, options:RequestOptions = {} ):{ iri:string | undefined, query:string, options:RequestOptions } {
	const registry:DocumentsRegistry = getRegistry( this );

	let iri:string | undefined;
	let query:string = uriOrQuery;

	if( isObject( queryOrOptions ) ) {
		options = queryOrOptions;
	} else if( queryOrOptions !== void 0 ) {
		query = queryOrOptions;
		iri = uriOrQuery;
	}


	iri = registry._resolveIRIFor( resource, iri );
	registry._context.auth.addAuthentication( options );

	return { iri, query, options };
}

const PROTOTYPE:PickSelfProps<SPARQLDocument, TransientDocument> = {
	executeRawASKQuery( this:SPARQLDocument, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<SPARQLRawResults> {
		return promiseMethod( () => {
			const { iri, query, options } = parseParams( this, uriOrQuery, queryOrOptions, requestOptions );

			return SPARQLService
				.executeRawASKQuery( iri, query, options )
				.then( ( [ rawResults ] ) => rawResults )
				.catch( this._registry._parseErrorResponse.bind( this ) );
		} );
	},

	executeASKQuery( this:SPARQLDocument, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<boolean> {
		return promiseMethod( () => {
			const { iri, query, options } = parseParams( this, uriOrQuery, queryOrOptions, requestOptions );

			return SPARQLService
				.executeASKQuery( iri, query, options )
				.then( ( [ rawResults ] ) => rawResults )
				.catch( this._registry._parseErrorResponse.bind( this ) );
		} );
	},


	executeRawSELECTQuery( this:SPARQLDocument, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<SPARQLRawResults> {
		return promiseMethod( () => {
			const { iri, query, options } = parseParams( this, uriOrQuery, queryOrOptions, requestOptions );

			return SPARQLService
				.executeRawSELECTQuery( iri, query, options )
				.then( ( [ rawResults ] ) => rawResults )
				.catch( this._registry._parseErrorResponse.bind( this ) );
		} );
	},

	executeSELECTQuery<T extends object>( this:SPARQLDocument, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>> {
		return promiseMethod( () => {
			const { iri, query, options } = parseParams( this, uriOrQuery, queryOrOptions, requestOptions );

			return SPARQLService
				.executeSELECTQuery<T>( iri, query, this._registry, options )
				.then( ( [ selectResults ] ) => selectResults )
				.catch( this._registry._parseErrorResponse.bind( this ) );
		} );
	},


	executeRawCONSTRUCTQuery( this:SPARQLDocument, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<string> {
		return promiseMethod( () => {
			const { iri, query, options } = parseParams( this, uriOrQuery, queryOrOptions, requestOptions );

			return SPARQLService
				.executeRawCONSTRUCTQuery( iri, query, options )
				.then( ( [ strConstruct ] ) => strConstruct )
				.catch( this._registry._parseErrorResponse.bind( this ) );
		} );
	},


	executeRawDESCRIBEQuery( this:SPARQLDocument, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<string> {
		return promiseMethod( () => {
			const { iri, query, options } = parseParams( this, uriOrQuery, queryOrOptions, requestOptions );

			return SPARQLService
				.executeRawDESCRIBEQuery( iri, query, options )
				.then( ( [ strDescribe ] ) => strDescribe )
				.catch( this._registry._parseErrorResponse.bind( this ) );
		} );
	},


	executeUPDATE( this:SPARQLDocument, uriOrQuery:string, updateOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
		return promiseMethod( () => {
			const { iri, query: update, options } = parseParams( this, uriOrQuery, updateOrOptions, requestOptions );

			return SPARQLService
				.executeUPDATE( iri, update, options )
				.then( () => {} )
				.catch( this._registry._parseErrorResponse.bind( this ) );
		} );
	},


	sparql( this:SPARQLDocument, uri?:string ):QueryClause<FinishSPARQLSelect> {
		const registry:DocumentsRegistry = getRegistry( this );
		const iri:string = registry._resolveIRIFor( this, uri );

		const schema:DigestedObjectSchema = registry.getGeneralSchema();
		let builder:QueryClause<FinishSPARQLSelect> = new SPARQLBuilder( this, iri )
			.base( schema.base )
			.vocab( schema.vocab );

		schema.prefixes.forEach( ( name:string, prefix:string ) => {
			builder = builder.prefix( prefix, name );
		} );

		return builder;
	},
};


export interface SPARQLDocumentFactory {
	PROTOTYPE:PickSelfProps<SPARQLDocument, TransientDocument>;

	isDecorated( object:object ):object is SPARQLDocument;

	decorate<T extends object>( object:T ):T & SPARQLDocument;
}

export const SPARQLDocument:SPARQLDocumentFactory = {
	PROTOTYPE,

	isDecorated( object:object ):object is SPARQLDocument {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object )
			;
	},

	decorate<T extends object>( object:T ):T & SPARQLDocument {
		if( SPARQLDocument.isDecorated( object ) ) return object;

		const resource:T & TransientDocument = ModelDecorator
			.decorateMultiple( object, TransientDocument );

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},
};
