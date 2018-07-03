import { QueryClause } from "sparqler/clauses";
import { AbstractContext } from "../AbstractContext";
import { ModelDecorator } from "../core";
import { IllegalActionError } from "../Errors";
import {
	RequestOptions,
	RequestUtils
} from "../HTTP";
import { DigestedObjectSchema } from "../ObjectSchema";
import { RegistryService } from "../Registry";
import { TransientResource } from "../Resource";
import {
	isObject,
	PickSelfProps,
	promiseMethod,
} from "../Utils";
import {
	FinishSPARQLSelect,
	SPARQLBuilder
} from "./Builder";
import { SPARQLRawResults } from "./RawResults";
import { SPARQLSelectResults } from "./SelectResults";
import { SPARQLService } from "./Service";


export interface SPARQLDocument extends TransientResource {
	_registry:RegistryService<SPARQLDocument, AbstractContext<SPARQLDocument, any> | undefined> | undefined;


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


function getRegistry( repository:SPARQLDocument ):RegistryService<SPARQLDocument, AbstractContext<SPARQLDocument> | undefined> {
	if( repository._registry ) return repository._registry;
	throw new IllegalActionError( `"${ repository.$id }" doesn't support SPARQL requests.` );
}

function parseParams( this:void, resource:SPARQLDocument, registry:RegistryService<SPARQLDocument, AbstractContext<SPARQLDocument> | undefined>, uriOrQuery:string, queryOrOptions?:string | RequestOptions, options:RequestOptions = {} ):{ url:string, query:string, options:RequestOptions } {
	let iri:string | undefined;
	let query:string = uriOrQuery;

	if( isObject( queryOrOptions ) ) {
		options = queryOrOptions;
	} else if( queryOrOptions !== void 0 ) {
		query = queryOrOptions;
		iri = uriOrQuery;
	}


	const url:string = RequestUtils.getRequestURLFor( registry, resource, iri );

	if( registry.context && registry.context.auth )
		registry.context.auth.addAuthentication( options );

	return { url, query, options };
}

const PROTOTYPE:PickSelfProps<SPARQLDocument, TransientResource, "_registry"> = {
	_registry: void 0,


	executeRawASKQuery( this:SPARQLDocument, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<SPARQLRawResults> {
		return promiseMethod( () => {
			const registry:RegistryService<SPARQLDocument, AbstractContext<SPARQLDocument> | undefined> = getRegistry( this );
			const { url, query, options } = parseParams( this, registry, uriOrQuery, queryOrOptions, requestOptions );

			return SPARQLService
				.executeRawASKQuery( url, query, options )
				.then( ( [ rawResults ] ) => rawResults )
				.catch( registry._parseFailedResponse.bind( this ) );
		} );
	},

	executeASKQuery( this:SPARQLDocument, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<boolean> {
		return promiseMethod( () => {
			const registry:RegistryService<SPARQLDocument, AbstractContext<SPARQLDocument> | undefined> = getRegistry( this );
			const { url, query, options } = parseParams( this, registry, uriOrQuery, queryOrOptions, requestOptions );

			return SPARQLService
				.executeASKQuery( url, query, options )
				.then( ( [ rawResults ] ) => rawResults )
				.catch( registry._parseFailedResponse.bind( this ) );
		} );
	},


	executeRawSELECTQuery( this:SPARQLDocument, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<SPARQLRawResults> {
		return promiseMethod( () => {
			const registry:RegistryService<SPARQLDocument, AbstractContext<SPARQLDocument> | undefined> = getRegistry( this );
			const { url, query, options } = parseParams( this, registry, uriOrQuery, queryOrOptions, requestOptions );

			return SPARQLService
				.executeRawSELECTQuery( url, query, options )
				.then( ( [ rawResults ] ) => rawResults )
				.catch( registry._parseFailedResponse.bind( this ) );
		} );
	},

	executeSELECTQuery<T extends object>( this:SPARQLDocument, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<SPARQLSelectResults<T>> {
		return promiseMethod( () => {
			const registry:RegistryService<SPARQLDocument, AbstractContext<SPARQLDocument> | undefined> = getRegistry( this );
			const { url, query, options } = parseParams( this, registry, uriOrQuery, queryOrOptions, requestOptions );

			return SPARQLService
				.executeSELECTQuery<T>( url, query, this._registry, options )
				.then( ( [ selectResults ] ) => selectResults )
				.catch( registry._parseFailedResponse.bind( this ) );
		} );
	},


	executeRawCONSTRUCTQuery( this:SPARQLDocument, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<string> {
		return promiseMethod( () => {
			const registry:RegistryService<SPARQLDocument, AbstractContext<SPARQLDocument> | undefined> = getRegistry( this );
			const { url, query, options } = parseParams( this, registry, uriOrQuery, queryOrOptions, requestOptions );

			return SPARQLService
				.executeRawCONSTRUCTQuery( url, query, options )
				.then( ( [ strConstruct ] ) => strConstruct )
				.catch( registry._parseFailedResponse.bind( this ) );
		} );
	},


	executeRawDESCRIBEQuery( this:SPARQLDocument, uriOrQuery:string, queryOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<string> {
		return promiseMethod( () => {
			const registry:RegistryService<SPARQLDocument, AbstractContext<SPARQLDocument> | undefined> = getRegistry( this );
			const { url, query, options } = parseParams( this, registry, uriOrQuery, queryOrOptions, requestOptions );

			return SPARQLService
				.executeRawDESCRIBEQuery( url, query, options )
				.then( ( [ strDescribe ] ) => strDescribe )
				.catch( registry._parseFailedResponse.bind( this ) );
		} );
	},


	executeUPDATE( this:SPARQLDocument, uriOrQuery:string, updateOrOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
		return promiseMethod( () => {
			const registry:RegistryService<SPARQLDocument, AbstractContext<SPARQLDocument> | undefined> = getRegistry( this );
			const { url, query: update, options } = parseParams( this, registry, uriOrQuery, updateOrOptions, requestOptions );

			return SPARQLService
				.executeUPDATE( url, update, options )
				.then( () => {} )
				.catch( registry._parseFailedResponse.bind( this ) );
		} );
	},


	sparql( this:SPARQLDocument, uri?:string ):QueryClause<FinishSPARQLSelect> {
		const registry:RegistryService<SPARQLDocument, AbstractContext<SPARQLDocument> | undefined> = getRegistry( this );
		const iri:string = RequestUtils.getRequestURLFor( registry, this, uri );

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
	PROTOTYPE:PickSelfProps<SPARQLDocument, TransientResource, "_registry">;

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

		const resource:T & TransientResource = ModelDecorator
			.decorateMultiple( object, TransientResource );

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},
};
