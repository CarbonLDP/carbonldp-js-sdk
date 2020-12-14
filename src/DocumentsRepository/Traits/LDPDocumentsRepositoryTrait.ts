import { DocumentsContext } from "../../Context/DocumentsContext";

import { Document } from "../../Document/Document";
import { TransientDocument } from "../../Document/TransientDocument";

import { IllegalArgumentError } from "../../Errors/IllegalArgumentError";

import { Fragment } from "../../Fragment/Fragment";

import { FreeResources } from "../../FreeResources/FreeResources";

import { HTTPError } from "../../HTTP/Errors/HTTPError";
import { BadResponseError } from "../../HTTP/Errors/ServerErrors/BadResponseError";

import { Header } from "../../HTTP/Header";
import { GETOptions, RequestOptions, RequestService, RequestUtils } from "../../HTTP/Request";
import { Response } from "../../HTTP/Response";

import { JSONLDParser } from "../../JSONLD/JSONLDParser";

import { AddMemberAction } from "../../LDP/AddMemberAction";
import { Map } from "../../LDP/Map";
import { RemoveMemberAction } from "../../LDP/RemoveMemberAction";
import { ResponseMetadata } from "../../LDP/ResponseMetadata";

import { DeltaCreator } from "../../LDPatch/DeltaCreator";

import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";

import { DigestedObjectSchema } from "../../ObjectSchema/DigestedObjectSchema";

import { Pointer } from "../../Pointer/Pointer";

import { RDFDocument } from "../../RDF/Document";
import { RDFNode } from "../../RDF/Node";

import { $Registry, Registry } from "../../Registry/Registry";
import { ResolvablePointer } from "../../Repository/ResolvablePointer";

import { isString } from "../../Utils";

import { C } from "../../Vocabularies/C";
import { LDP } from "../../Vocabularies/LDP";

import { BaseDocumentsRepository } from "../BaseDocumentsRepository";
import { _getErrorResponseParserFn } from "../Utils";

import { HTTPRepositoryTrait } from "./HTTPRepositoryTrait";


/**
 * Trait of a {@link DocumentsRepository} with methods for LDP related requests.
 */
export interface LDPDocumentsRepositoryTrait extends HTTPRepositoryTrait<Document> {
	/**
	 * Context from where the repository is created.
	 */
	readonly context:DocumentsContext;

	/**
	 * Retrieves the entire document of the URI specified.
	 * @param uri URI of the document to be retrieved.
	 * @param requestOptions Customizable options for the request.
	 */
	get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & Document>;

	/**
	 * Resolves the entire document of the URI specified.
	 * @param document Document to be resolved.
	 * @param requestOptions Customizable options for the request.
	 */
	resolve<T extends object>( document:Document, requestOptions?:GETOptions ):Promise<T & Document>;


	/**
	 * Persists multiple objects as children of the document of the specified URI.
	 * @param uri URI of the document where to create the children.
	 * @param children Objects to be persisted.
	 * @param requestOptions Customizable options for the request.
	 */
	create<T extends object>( uri:string, children:T[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Persists multiple objects as children of the document of the specified URI.
	 * @param uri URI of the document where to create the children.
	 * @param children Objects to be persisted.
	 * @param slugs Suggested slugs for every child URI of the {@param children} provided. The slug will be assigned in the order they are provided.
	 * @param requestOptions Customizable options for the request.
	 */
	create<T extends object>( uri:string, children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Persists the object as a child of the document of the specified URI.
	 * @param uri URI of the document where to create the child.
	 * @param child Object to be persisted.
	 * @param requestOptions Customizable options for the request.
	 */
	create<T extends object>( uri:string, child:T, requestOptions?:RequestOptions ):Promise<T & Document>;
	/**
	 * Persists the object as a child of the document of the specified URI.
	 * @param uri URI of the document where to create the child.
	 * @param child Object to be persisted.
	 * @param slug Suggested slug for the child URI.
	 * @param requestOptions Customizable options for the request.
	 */
	create<T extends object>( uri:string, child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & Document>;

	/**
	 * Persists multiple objects as children of the document of the specified URI and retrieves the updated data from the server.
	 * @param uri URI of the document where to create the children.
	 * @param children Objects to be persisted.
	 * @param requestOptions Customizable options for the request.
	 */
	createAndRetrieve<T extends object>( uri:string, children:T[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Persists multiple objects as children of the document of the specified URI and retrieves the updated data from the server.
	 * @param uri URI of the document where to create the children.
	 * @param children Objects to be persisted.
	 * @param slugs Suggested slugs for every child URI of the {@param children} provided. The slug will be assigned in the order they are provided.
	 * @param requestOptions Customizable options for the request.
	 */
	createAndRetrieve<T extends object>( uri:string, children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Persists the object as a child of the document of the specified URI and retrieves the updated data from the server.
	 * @param uri URI of the document where to create the child.
	 * @param child Object to be persisted.
	 * @param requestOptions Customizable options for the request.
	 */
	createAndRetrieve<T extends object>( uri:string, child:T, requestOptions?:RequestOptions ):Promise<T & Document>;
	/**
	 * Persists the object as a child of the document of the specified URI and retrieves the updated data from the server.
	 * @param uri URI of the document where to create the child.
	 * @param child Object to be persisted.
	 * @param slug Suggested slug for the child URI.
	 * @param requestOptions Customizable options for the request.
	 */
	createAndRetrieve<T extends object>( uri:string, child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & Document>;


	/**
	 * Refreshes with the latest data of the specified document.
	 * @param document The document to be refreshed.
	 * @param requestOptions Customizable options for the request.
	 */
	refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	/**
	 * Saves the changes of the specified document.
	 * @param document The document to be saved.
	 * @param requestOptions Customizable options for the request.
	 */
	save<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	/**
	 * Saves the changes of the specified document and retrieves its latest changes.
	 * @param document The resource to saved and refreshed.
	 * @param requestOptions Customizable options for the request.
	 */
	saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	/**
	 * Deletes the document of the specified URI.
	 * @param uri URI of the document to be deleted.
	 * @param requestOptions Customizable options for the request.
	 */
	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;


	/**
	 * Adds the provided resource as member of the document of the specified URI.
	 * @param uri URI of the document to add the member.
	 * @param member Resource to be added as member.
	 * @param requestOptions Customizable options for the request.
	 */
	addMember( uri:string, member:(string | Pointer), requestOptions?:RequestOptions ):Promise<void>;

	/**
	 * Adds the provided resources as members of the document of the specified URI.
	 * @param uri URI of the document to add the members.
	 * @param members Resources to be added as members.
	 * @param requestOptions Customizable options for the request.
	 */
	addMembers( uri:string, members:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;


	/**
	 * Removes the provided resource as member of the document of the specified URI.
	 * @param uri URI of the document to remove the member.
	 * @param member Resource to be removed as member.
	 * @param requestOptions Customizable options for the request.
	 */
	removeMember( uri:string, member:(string | Pointer), requestOptions?:RequestOptions ):Promise<void>;

	/**
	 * Removes the provided resources as members of the document of the specified URI.
	 * IF no {@param members} is provided all the members of the specified document will be removed.
	 * @param uri URI of the document to remove the members.
	 * @param members Resources to be removed as members.
	 * @param requestOptions Customizable options for the request.
	 */
	removeMembers( uri:string, members?:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;
	/**
	 * Removes all the members of the document of the specified URI.
	 * @param uri URI of the document to remove its members.
	 * @param requestOptions Customizable options for the request.
	 */
	removeMembers( uri:string, requestOptions?:RequestOptions ):Promise<void>;


	/**
	 * Override method to parse the data that is a JSON-LD Document into the {@link Document} model.
	 * @see {@link HTTPRepositoryTrait._parseResponseData}
	 */
	_parseResponseData<T extends object>( response:Response, id:string ):Promise<T & Document>;
}


const __JSONLD_PARSER:JSONLDParser = new JSONLDParser();

function __setDefaultRequestOptions( requestOptions:RequestOptions, interactionModel?:string ):void {
	if( interactionModel ) RequestUtils.setPreferredInteractionModel( interactionModel, requestOptions );
	RequestUtils.setAcceptHeader( "application/ld+json", requestOptions );
}

function __getTargetID( id:string, response:Response ):string {
	const locationHeader:Header | null = response.getHeader( "Content-Location" );
	if( !locationHeader ) return id;

	if( locationHeader.values.length !== 1 ) throw new BadResponseError( "The response must contain one Content-Location header.", response );
	const locationString:string = "" + locationHeader;

	if( !locationString ) throw new BadResponseError( `The response doesn't contain a valid 'Content-Location' header.`, response );
	return locationString;
}

function __getErrorResponseParserFnFrom( repository:LDPDocumentsRepositoryTrait ):( error:HTTPError | Error ) => Promise<never> {
	return _getErrorResponseParserFn( repository.context.registry );
}


function __changeNodesID( resource:$Registry, map:Map<Pointer, Pointer> ):void {
	map
		.entries
		.forEach( ( { entryKey, entryValue } ) => {
			const node:Pointer = resource
				.$getPointer( entryKey.$id, true );

			resource.$removePointer( entryKey.$id );

			node.$id = entryValue.$id;
			resource.$_addPointer( node );
		} )
	;
}

function __applyResponseMetadata( repository:LDPDocumentsRepositoryTrait, freeNodes:RDFNode[] ):void {
	if( !freeNodes.length ) return;
	const freeResources:FreeResources = FreeResources.parseFreeNodes( repository.context.registry, freeNodes );

	const responseMetadata:ResponseMetadata | undefined = freeResources
		.getPointers( true )
		.find( ResponseMetadata.is )
	;

	if( !responseMetadata ) return;

	responseMetadata
		.documentsMetadata!
		.forEach( metadata => __changeNodesID( metadata.relatedDocument, metadata.bNodesMap ) )
	;
}

function __applyResponseRepresentation<T extends object>( repository:LDPDocumentsRepositoryTrait, resource:Document, response:Response ):(T & Document) | Promise<T & Document> {
	if( response.status === 204 || !response.data ) return resource as T & Document;

	return __JSONLD_PARSER
		.parse( response.data )
		.then( ( expandedResult:object[] ) => {
			const freeNodes:RDFNode[] = RDFDocument.getFreeNodes( expandedResult );
			__applyResponseMetadata( repository, freeNodes );

			const preferenceHeader:Header | null = response.getHeader( "Preference-Applied" );
			if( preferenceHeader === null || !preferenceHeader.hasValue( "return=representation" ) ) return resource as T & Document;

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

function __createChild<T extends object>( this:void, repository:LDPDocumentsRepositoryTrait, parentURI:string, requestOptions:RequestOptions, child:T, slug?:string ):Promise<T & Document> {
	if( ResolvablePointer.is( child ) ) throw new IllegalArgumentError( "Cannot persist an already resolvable pointer." );

	const transient:T & TransientDocument = TransientDocument.is( child ) ?
		child : TransientDocument.decorate( child );

	transient.$_normalize();

	transient.$registry = repository.context.registry;
	const body:string = JSON.stringify( transient );

	if( !!slug ) RequestUtils.setSlug( slug, requestOptions );

	Object.defineProperty( transient, "__CarbonLDP_persisting__", { configurable: true, value: true } );
	return RequestService
		.post( parentURI, body, requestOptions )
		.then( ( response:Response ) => {
			delete transient[ "__CarbonLDP_persisting__" ];

			const locationHeader:Header | null = response.getHeader( "Location" );
			if( locationHeader === null || locationHeader.values.length < 1 ) throw new BadResponseError( "The response is missing a Location header.", response );
			if( locationHeader.values.length !== 1 ) throw new BadResponseError( "The response contains more than one Location header.", response );
			transient.$id = locationHeader.values[ 0 ].toString();

			const document:T & Document = repository.context.registry._addPointer( transient );
			document
				.$getFragments()
				.forEach( document.$__modelDecorator.decorate );

			return __applyResponseRepresentation<T>( repository, document, response );
		} )
		.catch( ( error ) => {
			delete transient[ "__CarbonLDP_persisting__" ];
			return __getErrorResponseParserFnFrom( repository )( error );
		} );
}

function __createChildren<T extends object>( this:void, retrievalType:"minimal" | "representation", repository:LDPDocumentsRepositoryTrait, uri:string, children:T | T[], slugsOrOptions?:string | string[] | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document) | (T & Document)[]> {
	if( !repository.context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );
	const url:string = repository.context.getObjectSchema().resolveURI( uri, { base: true } );

	requestOptions = RequestUtils.isOptions( slugsOrOptions ) ?
		slugsOrOptions :
		requestOptions ? requestOptions : {}
	;

	const slugs:string[] | string | null = isString( slugsOrOptions ) || Array.isArray( slugsOrOptions ) ?
		slugsOrOptions : null
	;

	__setDefaultRequestOptions( requestOptions, LDP.Container );
	RequestUtils.setPreferredRetrieval( retrievalType, requestOptions );
	RequestUtils.setContentTypeHeader( "application/ld+json", requestOptions );


	if( !Array.isArray( children ) ) {
		if( __isInvalidChild( children ) ) return Promise.reject( new IllegalArgumentError( `The object is already a resolvable pointer.` ) );
		if( __isPersistingChild( children ) ) return Promise.reject( new IllegalArgumentError( `The object is already being persisted.` ) );

		return __createChild<T>( repository, url, requestOptions, children, slugs ? slugs.toString() : undefined );
	}


	const invalidChild:number = children
		.findIndex( child => __isInvalidChild( child ) );
	if( invalidChild !== - 1 ) return Promise.reject( new IllegalArgumentError( `The object in "${ invalidChild }" is already a resolvable pointer.` ) );

	const persistingChild:number = children
		.findIndex( child => __isPersistingChild( child ) );
	if( persistingChild !== - 1 ) return Promise.reject( new IllegalArgumentError( `The object in "${ persistingChild }" is already being persisted.` ) );

	const promises:Promise<T & Document>[] = children.map( ( child, index ) => {
		const cloneOptions:RequestOptions = RequestUtils.cloneOptions( requestOptions! );

		const slug:string | undefined = slugs && index < slugs.length ? slugs[ index ] : void 0;
		return __createChild<T>( repository, url, cloneOptions, child, slug );
	} );
	return Promise.all( promises );
}


function __sendPatch<T extends object>( this:void, repository:LDPDocumentsRepositoryTrait, document:Document, requestOptions:RequestOptions ):Promise<T & Document> {
	if( !ResolvablePointer.is( document ) ) return Promise.reject( new IllegalArgumentError( "The document isn't a resolvable pointer." ) );

	if( !repository.context.registry.inScope( document.$id ) ) return Promise.reject( new IllegalArgumentError( `"${ document.$id }" is out of scope.` ) );
	const url:string = repository.context.getObjectSchema().resolveURI( document.$id, { base: true } );

	if( !document.$isDirty() ) return Promise.resolve( document as T & Document );

	document.$_normalize();

	__setDefaultRequestOptions( requestOptions );
	RequestUtils.setContentTypeHeader( "text/ldpatch", requestOptions );
	RequestUtils.setIfMatchHeader( document.$eTag!, requestOptions );


	const deltaCreator:DeltaCreator = new DeltaCreator( repository.context );

	// Document resource
	deltaCreator.addResource( document.$id, document.$_snapshot, document );

	// Current fragments
	document
		.$getPointers( true )
		.forEach( ( pointer:ResolvablePointer ) => {
			deltaCreator.addResource( pointer.$id, pointer.$_snapshot, pointer );
		} )
	;

	// Deleted fragments
	document.$__savedFragments
		.filter( pointer => !document.$hasPointer( pointer.$id ) )
		.forEach( pointer => {
			deltaCreator.addResource( pointer.$id, pointer.$_snapshot, {} );
		} )
	;


	const body:string = deltaCreator.getPatch();

	return RequestService
		.patch( url, body, requestOptions )
		.then( ( response:Response ) => {
			return __applyResponseRepresentation<T>( repository, document, response );
		} )
		.catch( __getErrorResponseParserFnFrom( repository ) )
		;
}


function __parseMembers( registry:Registry, pointers:(string | Pointer)[] ):Pointer[] {
	return pointers
		.map( pointer => {
			if( isString( pointer ) ) return registry.getPointer( pointer );
			if( Pointer.is( pointer ) ) return pointer;
		} )
		.filter( ( pointer ):pointer is Pointer => !!pointer )
		;
}

function __sendAddAction( this:void, repository:LDPDocumentsRepositoryTrait, uri:string, members:(string | Pointer)[], requestOptions:RequestOptions = {} ):Promise<void> {
	if( !repository.context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );
	const url:string = repository.context.getObjectSchema().resolveURI( uri, { base: true } );

	__setDefaultRequestOptions( requestOptions, LDP.Container );
	RequestUtils.setContentTypeHeader( "application/ld+json", requestOptions );

	const freeResources:FreeResources = FreeResources.createFrom( { registry: repository.context.registry } );

	const targetMembers:Pointer[] = __parseMembers( repository.context.registry, members );
	freeResources._addPointer( AddMemberAction.createFrom( { targetMembers } ) );

	const body:string = JSON.stringify( freeResources );

	return RequestService
		.put( url, body, requestOptions )
		.then( () => {} )
		.catch( __getErrorResponseParserFnFrom( repository ) )
		;
}

function __sendRemoveAction( this:void, repository:LDPDocumentsRepositoryTrait, uri:string, members:(string | Pointer)[], requestOptions:RequestOptions = {} ):Promise<void> {
	if( !repository.context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );
	const url:string = repository.context.getObjectSchema().resolveURI( uri, { base: true } );

	__setDefaultRequestOptions( requestOptions, LDP.Container );
	RequestUtils.setContentTypeHeader( "application/ld+json", requestOptions );
	RequestUtils.setRetrievalPreferences( {
		include: [ C.PreferSelectedMembershipTriples ],
		omit: [ C.PreferMembershipTriples ],
	}, requestOptions );

	const freeResources:FreeResources = FreeResources.createFrom( { registry: repository.context.registry } );

	const targetMembers:Pointer[] = __parseMembers( repository.context.registry, members );
	freeResources._addPointer( RemoveMemberAction.createFrom( { targetMembers } ) );

	const body:string = JSON.stringify( freeResources );

	return RequestService
		.delete( url, body, requestOptions )
		.then( () => {} )
		.catch( __getErrorResponseParserFnFrom( repository ) )
		;
}

function __sendRemoveAll( this:void, repository:LDPDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions = {} ):Promise<void> {
	if( !repository.context.registry.inScope( uri, true ) ) return Promise.reject( new IllegalArgumentError( `"${ uri }" is out of scope.` ) );
	const url:string = repository.context.getObjectSchema().resolveURI( uri, { base: true } );

	__setDefaultRequestOptions( requestOptions, LDP.Container );
	RequestUtils.setRetrievalPreferences( {
		include: [
			C.PreferMembershipTriples,
		],
		omit: [
			C.PreferMembershipResources,
			C.PreferContainmentTriples,
			C.PreferContainmentResources,
			C.PreferContainer,
		],
	}, requestOptions );

	return RequestService
		.delete( url, requestOptions )
		.then( () => {} )
		.catch( __getErrorResponseParserFnFrom( repository ) )
		;
}

export type OverriddenMembers =
	| "get"
	| "refresh"
	| "exists"
	| "execute"
	| "save"
	| "saveAndRefresh"
	| "delete"
	| "_parseResponseData"
	;

/**
 * Factory, decorator and utils for {@link LDPDocumentsRepositoryTrait}.
 */
export type LDPDocumentsRepositoryTraitFactory =
	& ModelPrototype<LDPDocumentsRepositoryTrait, HTTPRepositoryTrait, OverriddenMembers>
	& ModelDecorator<LDPDocumentsRepositoryTrait, BaseDocumentsRepository>
	;

/**
 * Constant with the factory, decorator and/or utils for a {@link LDPDocumentsRepositoryTrait} object.
 */
export const LDPDocumentsRepositoryTrait:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link LDPDocumentsRepositoryTrait}.
	 */
	PROTOTYPE:LDPDocumentsRepositoryTraitFactory["PROTOTYPE"];

	/**
	 * Returns true if the object is decorated with the specific properties and methods of a {@link LDPDocumentsRepositoryTrait}.
	 */
	isDecorated( object:object ):object is LDPDocumentsRepositoryTrait

	/**
	 * Decorates the object with the properties and methods from the {@link LDPDocumentsRepositoryTrait} prototype.
	 */
	decorate<T extends BaseDocumentsRepository>( object:T ):T & LDPDocumentsRepositoryTrait;
} = <LDPDocumentsRepositoryTraitFactory> {
	PROTOTYPE: {
		get<T extends object>( this:LDPDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions = {} ):Promise<T & Document> {
			__setDefaultRequestOptions( requestOptions, LDP.RDFSource );

			return HTTPRepositoryTrait.PROTOTYPE
				.get.call<HTTPRepositoryTrait, [ string, RequestOptions?], Promise<T & Document>>( this, uri, requestOptions )
				.catch( __getErrorResponseParserFnFrom( this ) );
		},

		exists( this:LDPDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions = {} ):Promise<boolean> {
			__setDefaultRequestOptions( requestOptions, LDP.RDFSource );

			return HTTPRepositoryTrait.PROTOTYPE
				.exists.call( this, uri, requestOptions )
				.catch( __getErrorResponseParserFnFrom( this ) );
		},

		execute( this:LDPDocumentsRepositoryTrait, uri:string, requestOptions:RequestOptions = {} ):Promise<JSON> {
			__setDefaultRequestOptions( requestOptions, LDP.ExecutableQuery );

			return HTTPRepositoryTrait.PROTOTYPE
				.execute.call( this, uri, requestOptions )
				.catch( __getErrorResponseParserFnFrom( this ) );
		},


		create<T extends object>( this:LDPDocumentsRepositoryTrait, uri:string, children:T | T[], slugsOrOptions?:string | string[] | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document) | (T & Document)[]> {
			return __createChildren<T>( "minimal", this, uri, children, slugsOrOptions, requestOptions );
		},

		createAndRetrieve<T extends object>( this:LDPDocumentsRepositoryTrait, uri:string, children:T | T[], slugsOrOptions?:string | string[] | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document) | (T & Document)[]> {
			return __createChildren<T>( "representation", this, uri, children, slugsOrOptions, requestOptions );
		},


		refresh<T extends object>( this:LDPDocumentsRepositoryTrait, document:Document, requestOptions:RequestOptions = {} ):Promise<T & Document> {
			__setDefaultRequestOptions( requestOptions, LDP.RDFSource );
			RequestUtils.setIfNoneMatchHeader( document.$eTag!, requestOptions );

			return HTTPRepositoryTrait.PROTOTYPE
				.refresh.call<HTTPRepositoryTrait, [ Document, RequestOptions?], Promise<T & Document>>( this, document, requestOptions )
				.catch( __getErrorResponseParserFnFrom( this ) )
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
			__setDefaultRequestOptions( requestOptions, LDP.RDFSource );

			return HTTPRepositoryTrait.PROTOTYPE
				.delete.call( this, uri, requestOptions )
				.catch( __getErrorResponseParserFnFrom( this ) )
				;
		},


		addMember( this:LDPDocumentsRepositoryTrait, uri:string, member:string | Pointer, requestOptions?:RequestOptions ):Promise<void> {
			return __sendAddAction( this, uri, [ member ], requestOptions );
		},

		addMembers( this:LDPDocumentsRepositoryTrait, uri:string, members:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void> {
			return __sendAddAction( this, uri, members, requestOptions );
		},


		removeMember( this:LDPDocumentsRepositoryTrait, uri:string, member:string | Pointer, requestOptions?:RequestOptions ):Promise<void> {
			return __sendRemoveAction( this, uri, [ member ], requestOptions );
		},

		removeMembers( this:LDPDocumentsRepositoryTrait, uri:string, membersOrOptions?:(string | Pointer)[] | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			if( Array.isArray( membersOrOptions ) ) return __sendRemoveAction( this, uri, membersOrOptions, requestOptions );
			return __sendRemoveAll( this, uri, membersOrOptions || requestOptions );
		},


		_parseResponseData<T extends object>( this:LDPDocumentsRepositoryTrait, response:Response, id:string ):Promise<T & Document> {
			return __JSONLD_PARSER
				.parse( response.data )
				.then( ( rdfNodes:object[] ) => {
					const rdfDocuments:RDFDocument[] = RDFDocument
						.getDocuments( rdfNodes );

					id = __getTargetID( id, response );
					const rdfDocument:RDFDocument | undefined = rdfDocuments.find( doc => doc[ "@id" ] === id );

					if( !rdfDocument ) throw new BadResponseError( `No document "${ id }" was returned.`, response );
					const document:T & Document = this.context.registry.register( id ) as T & Document;

					const previousFragments:Set<string> = new Set();
					document
						.$getPointers( true )
						.forEach( pointer => previousFragments.add( pointer.$id ) );

					// Update all elements data
					const elements:(Document | Fragment)[] = rdfDocument[ "@graph" ].map( node => {
						const target:Document | Fragment = document.$getPointer( node[ "@id" ] ) as Document | Fragment;

						const schema:DigestedObjectSchema = this.context.registry.getSchemaFor( node );
						this.context.jsonldConverter.update( target, node, schema, document );

						// Remove updated fragments
						if( "$document" in target ) previousFragments.delete( target.$id );

						return target;
					} );

					// Delete not updated fragments
					previousFragments
						.forEach( pointer => document.$removePointer( pointer ) );

					// Finish elements after all compactions
					elements.forEach( element => {
						element.$_syncSnapshot();
						this.context.registry.decorate( element );
					} );

					document.$eTag = response.getETag();
					document.$_resolved = true;

					return document;
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
};
