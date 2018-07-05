import { Context } from "../Context";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype
} from "../core";
import {
	Document,
	TransientDocument
} from "../Document";
import { IllegalArgumentError } from "../Errors";
import { FreeResources } from "../FreeResources";
import {
	GETOptions,
	Header,
	RequestOptions,
	RequestService,
	RequestUtils,
	Response
} from "../HTTP";
import {
	BadResponseError,
	HTTPError
} from "../HTTP/Errors";
import {
	JSONLDCompacter,
	JSONLDParser
} from "../JSONLD";
import {
	ErrorResponse,
	Map,
	ResponseMetadata
} from "../LDP";
import { DeltaCreator } from "../LDPatch";
import { Pointer } from "../Pointer";
import {
	RDFDocument,
	RDFDocumentParser,
	RDFNode
} from "../RDF";
import {
	RegisteredPointer,
	Registry
} from "../Registry";
import { isString } from "../Utils";
import { LDP } from "../Vocabularies";
import { BaseDocumentsRepository } from "./BaseDocumentsRepository";
import {
	_getNotInContextMessage,
	_inScope,
	HTTPRepositoryTrait
} from "./HTTPRepositoryTrait";
import { ResolvablePointer } from "./ResolvablePointer";


export interface LDPDocumentsRepositoryTrait extends HTTPRepositoryTrait<Document> {
	$context:Context<Document, Document>;

	get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & Document>;

	resolve<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	create<T extends object>( uri:string, children:T[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	create<T extends object>( uri:string, children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	create<T extends object>( uri:string, child:T, requestOptions?:RequestOptions ):Promise<T & Document>;
	create<T extends object>( uri:string, child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & Document>;

	createAndRetrieve<T extends object>( uri:string, children:T[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	createAndRetrieve<T extends object>( uri:string, children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	createAndRetrieve<T extends object>( uri:string, child:T, requestOptions?:RequestOptions ):Promise<T & Document>;
	createAndRetrieve<T extends object>( uri:string, child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & Document>;


	refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	save<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;


	_parseResponseData<T extends object>( response:Response, id:string ):Promise<T & Document>;
}


const __RDF_DOCUMENT_PARSER:RDFDocumentParser = new RDFDocumentParser();
const __JSONLD_PARSER:JSONLDParser = new JSONLDParser();

export function _addAuthentication( context:Context, requestOptions:RequestOptions ):void {
	if( ! context.auth ) return;
	context.auth.addAuthentication( requestOptions );
}

function __setDefaultRequestOptions( context:Context, requestOptions:RequestOptions, interactionModel?:string ):void {
	_addAuthentication( context, requestOptions );

	if( interactionModel ) RequestUtils.setPreferredInteractionModel( interactionModel, requestOptions );
	RequestUtils.setAcceptHeader( "application/ld+json", requestOptions );
}

function __getTargetID( id:string, response:Response ):string {
	const locationHeader:Header = response.getHeader( "Content-Location" );
	if( ! locationHeader ) return id;

	if( locationHeader.values.length !== 1 ) throw new BadResponseError( "The response must contain one Content-Location header.", response );
	const locationString:string = "" + locationHeader;

	if( ! locationString ) throw new BadResponseError( `The response doesn't contain a valid 'Content-Location' header.`, response );
	return locationString;
}


function __changeNodesID( resource:Registry, map:Map<Pointer, Pointer> ):void {
	map
		.entries
		.forEach( ( { entryKey, entryValue } ) => {
			const node:Pointer = resource
				.getPointer( entryKey.$id, true );

			resource.removePointer( entryKey.$id );

			node.$id = entryValue.$id;
			resource._addPointer( node );
		} )
	;
}

function __applyResponseMetadata( repository:LDPDocumentsRepositoryTrait, freeNodes:RDFNode[] ):void {
	if( ! freeNodes.length ) return;
	const freeResources:FreeResources = repository._parseFreeNodes( freeNodes );

	const responseMetadata:ResponseMetadata = freeResources
		.getPointers( true )
		.find( ResponseMetadata.is )
	;

	responseMetadata
		.documentsMetadata
		.forEach( metadata => __changeNodesID( metadata.relatedDocument, metadata.bNodesMap ) )
	;
}

function __applyResponseRepresentation<T extends object>( repository:LDPDocumentsRepositoryTrait, resource:Document, response:Response ):(T & Document) | Promise<T & Document> {
	if( response.status === 204 || ! response.data ) return resource as T & Document;

	return __JSONLD_PARSER
		.parse( response.data )
		.then( ( expandedResult:object[] ) => {
			const freeNodes:RDFNode[] = RDFNode.getFreeNodes( expandedResult );
			__applyResponseMetadata( repository, freeNodes );

			const preferenceHeader:Header = response.getHeader( "Preference-Applied" );
			if( preferenceHeader === null || preferenceHeader.toString() !== "return=representation" ) return resource as T & Document;

			return repository._parseResponseData<T>( response, resource.$id );
		} )
		;
}


function __isInvalidChild( child:object ):boolean {
	return ResolvablePointer.is( child );
}

function __isPersistingChild( object:object ):boolean {
	return object[ "__CarbonLDP_persisting__" ];
}

function __createChild<T extends object>( repository:LDPDocumentsRepositoryTrait, parentURI:string, requestOptions:RequestOptions, child:T, slug?:string ):Promise<T & Document> {
	if( ResolvablePointer.is( child ) ) throw new IllegalArgumentError( "Cannot persist an already resolvable pointer." );

	const transient:T & TransientDocument = TransientDocument.is( child ) ?
		child : TransientDocument.decorate( child );

	transient._normalize();

	transient.$registry = repository.$context.registry;
	const body:string = JSON.stringify( transient );

	if( ! ! slug ) RequestUtils.setSlug( slug, requestOptions );

	Object.defineProperty( transient, "__CarbonLDP_persisting__", { configurable: true, value: true } );
	return RequestService
		.post( parentURI, body, requestOptions )
		.then( ( response:Response ) => {
			delete transient[ "__CarbonLDP_persisting__" ];

			const locationHeader:Header = response.getHeader( "Location" );
			if( locationHeader === null || locationHeader.values.length < 1 ) throw new BadResponseError( "The response is missing a Location header.", response );
			if( locationHeader.values.length !== 1 ) throw new BadResponseError( "The response contains more than one Location header.", response );
			transient.$id = locationHeader.values[ 0 ].toString();

			const document:T & Document = repository.$context.registry._addPointer( transient );
			document._syncSnapshot();
			document._syncSavedFragments();

			return __applyResponseRepresentation<T>( repository, document, response );
		} )
		.catch( ( error ) => {
			delete transient[ "__CarbonLDP_persisting__" ];
			return repository._parseFailedResponse( error );
		} );
}

function __createChildren<T extends object>( retrievalType:"minimal" | "representation", repository:LDPDocumentsRepositoryTrait, uri:string, children:T | T[], slugsOrOptions?:string | string[] | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document) | (T & Document)[]> {
	const url:string = this.$context.resolve( uri );
	if( _inScope( this, url ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( uri ) ) );

	requestOptions = RequestUtils.isOptions( slugsOrOptions ) ?
		slugsOrOptions :
		requestOptions ? requestOptions : {}
	;

	const slugs:string[] | string | null = isString( slugsOrOptions ) || Array.isArray( slugsOrOptions ) ?
		slugsOrOptions : null
	;

	__setDefaultRequestOptions( repository.$context, requestOptions, LDP.Container );
	RequestUtils.setPreferredRetrieval( retrievalType, requestOptions );
	RequestUtils.setContentTypeHeader( "application/ld+json", requestOptions );


	if( ! Array.isArray( children ) ) {
		if( __isInvalidChild( children ) ) return Promise.reject( new IllegalArgumentError( `The object is an already resolvable pointer.` ) );
		if( __isPersistingChild( children ) ) return Promise.reject( new IllegalArgumentError( `The object is already being persisted.` ) );

		return __createChild<T>( repository, url, requestOptions, children, slugs.toString() );
	}


	const invalidChild:number | undefined = children
		.findIndex( child => __isInvalidChild( child ) );
	if( invalidChild !== void 0 ) return Promise.reject( new IllegalArgumentError( `The object "${ invalidChild }" is an already resolvable pointer.` ) );

	const persistingChild:number | undefined = children
		.findIndex( child => __isPersistingChild( child ) );
	if( persistingChild !== void 0 ) return Promise.reject( new IllegalArgumentError( `The object "${ persistingChild }" is already being persisted.` ) );

	const promises:Promise<T & Document>[] = children.map( ( child, index ) => {
		const cloneOptions:RequestOptions = RequestUtils.cloneOptions( requestOptions );

		const slug:string | undefined = index < slugs.length ? slugs[ index ] : void 0;
		return __createChild<T>( repository, url, cloneOptions, child, slug );
	} );
	return Promise.all( promises );
}


function __sendPatch<T extends object>( repository:LDPDocumentsRepositoryTrait, document:Document, requestOptions:RequestOptions ):Promise<T & Document> {
	if( ! ResolvablePointer.is( document ) ) return Promise.reject( new IllegalArgumentError( "The document isn't a resolvable pointer." ) );

	const url:string = this.$context.resolve( document.$id );
	if( _inScope( this, url ) ) return Promise.reject( new IllegalArgumentError( _getNotInContextMessage( document.$id ) ) );

	if( ! document.isDirty() ) return Promise.resolve( document as T & Document );

	document._normalize();

	__setDefaultRequestOptions( repository.$context, requestOptions );
	RequestUtils.setContentTypeHeader( "text/ldpatch", requestOptions );
	RequestUtils.setIfMatchHeader( document.$eTag, requestOptions );


	const deltaCreator:DeltaCreator = new DeltaCreator( repository.$context );

	// Document resource
	deltaCreator.addResource( document.$id, document._snapshot, document );

	// Current fragments
	// FIXME
	(document as any as Registry<RegisteredPointer & ResolvablePointer>)
		.getPointers( true )
		.forEach( ( pointer:ResolvablePointer ) => {
			deltaCreator.addResource( pointer.$id, pointer._snapshot, pointer );
		} )
	;

	// Deleted fragments
	document._savedFragments
		.filter( pointer => ! document.hasPointer( pointer.$id ) )
		.forEach( pointer => {
			deltaCreator.addResource( pointer.$id, pointer._snapshot, {} );
		} )
	;


	const body:string = deltaCreator.getPatch();

	return RequestService
		.patch( url, body, requestOptions )
		.then( ( response:Response ) => {
			return __applyResponseRepresentation<T>( repository, document, response );
		} )
		.catch( repository._parseFailedResponse.bind( document ) )
		;
}

export type OverloadedMembers =
	| "get"
	| "refresh"
	| "exists"
	| "save"
	| "saveAndRefresh"
	| "delete"
	| "_parseFailedResponse"
	| "_parseResponseData"
	;

export type LDPDocumentsRepositoryTraitFactory =
	& ModelPrototype<LDPDocumentsRepositoryTrait, HTTPRepositoryTrait, OverloadedMembers>
	& ModelDecorator<LDPDocumentsRepositoryTrait, BaseDocumentsRepository>
	& ModelFactory<LDPDocumentsRepositoryTrait, BaseDocumentsRepository>
	;

export const LDPDocumentsRepositoryTrait:LDPDocumentsRepositoryTraitFactory = {
	PROTOTYPE: {
		get<T extends object>( this:LDPDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions = {} ):Promise<T & Document> {
			__setDefaultRequestOptions( this.$context, requestOptions, LDP.RDFSource );

			return HTTPRepositoryTrait.PROTOTYPE
				.get.call( this, uri, requestOptions );
		},

		exists( this:LDPDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions = {} ):Promise<boolean> {
			__setDefaultRequestOptions( this.$context, requestOptions, LDP.RDFSource );

			return HTTPRepositoryTrait.PROTOTYPE
				.exists.call( this, uri, requestOptions );
		},


		create<T extends object>( this:LDPDocumentsRepositoryTrait, uri:string, children:T | T[], slugsOrOptions?:string | string[] | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document) | (T & Document)[]> {
			return __createChildren<T>( "minimal", this, uri, children, slugsOrOptions, requestOptions );
		},

		createAndRetrieve<T extends object>( this:LDPDocumentsRepositoryTrait, uri:string, children:T | T[], slugsOrOptions?:string | string[] | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document) | (T & Document)[]> {
			return __createChildren<T>( "representation", this, uri, children, slugsOrOptions, requestOptions );
		},


		refresh<T extends object>( this:LDPDocumentsRepositoryTrait, document:Document, requestOptions:RequestOptions = {} ):Promise<T & Document> {
			__setDefaultRequestOptions( this.$context, requestOptions, LDP.RDFSource );

			return HTTPRepositoryTrait.PROTOTYPE
				.refresh.call( this, document, requestOptions )
				;
		},

		save<T extends object>( this:LDPDocumentsRepositoryTrait, document:Document, requestOptions:RequestOptions = {} ):Promise<T & Document> {
			RequestUtils.setPreferredRetrieval( "minimal", requestOptions );
			return __sendPatch<T>( this, document, requestOptions );
		},

		saveAndRefresh<T extends object>( this:LDPDocumentsRepositoryTrait, document:Document, requestOptions:RequestOptions = {} ):Promise<T & Document> {
			RequestUtils.setPreferredRetrieval( "representation", requestOptions );
			return __sendPatch<T>( this, document, requestOptions );
		},


		delete( this:LDPDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions = {} ):Promise<void> {
			__setDefaultRequestOptions( this.$context, requestOptions, LDP.RDFSource );
			return HTTPRepositoryTrait.PROTOTYPE
				.delete.call( this, uri, requestOptions );
		},


		_parseFailedResponse( response:Response | Error | null ):Promise<never> {
			if( ! response || response instanceof Error ) return Promise.reject( response );

			HTTPRepositoryTrait.PROTOTYPE
				._parseFailedResponse( response )
				.catch( ( error:HTTPError ) => {
					if( ! response.data ) return Promise.reject( error );

					return new JSONLDParser()
						.parse( response.data )
						.then( ( freeNodes:RDFNode[] ) => {
							const freeResources:FreeResources = this._parseFreeNodes( freeNodes );

							const errorResponses:ErrorResponse[] = freeResources
								.getPointers( true )
								.filter( ErrorResponse.is );

							if( errorResponses.length === 0 ) return Promise.reject( new IllegalArgumentError( "The response string does not contains a c:ErrorResponse." ) );
							if( errorResponses.length > 1 ) return Promise.reject( new IllegalArgumentError( "The response string contains multiple c:ErrorResponse." ) );

							const errorResponse:ErrorResponse = Object.assign( error, errorResponses[ 0 ] );
							error.message = ErrorResponse.getMessage( errorResponse );

							return Promise.reject( error );
						}, () => {
							return Promise.reject( error );
						} );
				} )
			;
		},

		_parseResponseData<T extends object>( this:HTTPRepositoryTrait, response:Response, id:string ):Promise<T & Document> {
			return __RDF_DOCUMENT_PARSER
				.parse( response.data )
				.then( ( rdfDocuments:RDFDocument[] ) => {
					// FIXME
					const documents:(T & Document)[] = new JSONLDCompacter( this as any )
						.compactDocuments( rdfDocuments );

					id = __getTargetID( id, response );
					const target:T & Document | undefined = documents.find( doc => doc.$id === id );

					if( ! target ) throw new BadResponseError( `No document "${ id }" was returned.`, response );
					return target;
				} )
				;
		},
	},


	isDecorated( object:object ):object is LDPDocumentsRepositoryTrait {
		return ModelDecorator
			.hasPropertiesFrom( LDPDocumentsRepositoryTrait.PROTOTYPE, object );
	},

	decorate<T extends BaseDocumentsRepository>( object:T ):T & LDPDocumentsRepositoryTrait {
		if( LDPDocumentsRepositoryTrait.isDecorated( object ) ) return object;

		const target:T & HTTPRepositoryTrait<Document> = ModelDecorator
			.decorateMultiple( object, HTTPRepositoryTrait );

		return ModelDecorator
			.definePropertiesFrom( LDPDocumentsRepositoryTrait.PROTOTYPE, target );
	},


	create<T extends object>( data:T & BaseDocumentsRepository ):T & LDPDocumentsRepositoryTrait {
		// FIXME
		return LDPDocumentsRepositoryTrait.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseDocumentsRepository ):T & LDPDocumentsRepositoryTrait {
		return LDPDocumentsRepositoryTrait.decorate( object );
	},
};
