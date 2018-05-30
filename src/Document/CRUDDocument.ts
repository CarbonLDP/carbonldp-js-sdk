import {
	AccessPoint,
	BaseAccessPoint,
	TransientAccessPoint,
} from "../AccessPoint";
import { ModelDecorator } from "../core";
import {
	IllegalActionError,
	IllegalArgumentError
} from "../Errors";
import {
	Fragment,
	TransientFragment
} from "../Fragment";
import { FreeResources } from "../FreeResources";
import {
	GETOptions,
	Header,
	RequestOptions,
	RequestService,
	RequestUtils,
	Response,
} from "../HTTP";
import { BadResponseError } from "../HTTP/Errors";
import {
	JSONLDCompacter,
	JSONLDParser,
} from "../JSONLD";
import { ResponseMetadata, } from "../LDP";
import { DeltaCreator } from "../LDPatch";
import { DigestedObjectSchema } from "../ObjectSchema";
import { Pointer } from "../Pointer";
import { ProtectedDocument } from "../ProtectedDocument";
import {
	RDFDocument,
	RDFDocumentParser,
	RDFNode,
	URI,
} from "../RDF";
import { DocumentsRegistry } from "../Registry";
import { PersistedResource } from "../Resource";
import {
	isObject,
	isString,
	PickSelfProps,
	promiseMethod,
} from "../Utils";
import { LDP } from "../Vocabularies";
import { BasePersistedDocument } from "./BasePersistedDocument";
import { Document } from "./Document";
import { TransientDocument } from "./TransientDocument";


export interface CRUDDocument extends BasePersistedDocument {
	get<T extends object>( requestOptions?:GETOptions ):Promise<T & Document>;
	get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & Document>;

	resolve<T extends object>( requestOptions?:GETOptions ):Promise<T & Document>;


	exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;


	create<T extends object>( children:T[], requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument)[]>;
	create<T extends object>( children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument)[]>;
	create<T extends object>( child:T, requestOptions?:RequestOptions ):Promise<T & ProtectedDocument>;
	create<T extends object>( child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & ProtectedDocument>;
	create<T extends object>( uri:string, children:T[], requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument)[]>;
	create<T extends object>( uri:string, children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument)[]>;
	create<T extends object>( uri:string, child:T, requestOptions?:RequestOptions ):Promise<T & ProtectedDocument>;
	create<T extends object>( uri:string, child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & ProtectedDocument>;

	createAndRetrieve<T extends object>( children:T[], requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument)[]>;
	createAndRetrieve<T extends object>( children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument)[]>;
	createAndRetrieve<T extends object>( child:T, requestOptions?:RequestOptions ):Promise<T & ProtectedDocument>;
	createAndRetrieve<T extends object>( child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & ProtectedDocument>;
	createAndRetrieve<T extends object>( uri:string, children:T[], requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument)[]>;
	createAndRetrieve<T extends object>( uri:string, children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument)[]>;
	createAndRetrieve<T extends object>( uri:string, child:T, requestOptions?:RequestOptions ):Promise<T & ProtectedDocument>;
	createAndRetrieve<T extends object>( uri:string, child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & ProtectedDocument>;


	createAccessPoint<T extends object>( accessPoint:T & BaseAccessPoint, requestOptions?:RequestOptions ):Promise<T & AccessPoint>;
	createAccessPoint<T extends object>( accessPoint:T & BaseAccessPoint, slug?:string, requestOptions?:RequestOptions ):Promise<T & AccessPoint>;
	createAccessPoint<T extends object>( uri:string, accessPoint:T & BaseAccessPoint, requestOptions?:RequestOptions ):Promise<T & AccessPoint>;
	createAccessPoint<T extends object>( uri:string, accessPoint:T & BaseAccessPoint, slug?:string, requestOptions?:RequestOptions ):Promise<T & AccessPoint>;

	createAccessPointAndRetrieve<T extends object>( accessPoint:T & BaseAccessPoint, requestOptions?:RequestOptions ):Promise<T & AccessPoint>;
	createAccessPointAndRetrieve<T extends object>( accessPoint:T & BaseAccessPoint, slug?:string, requestOptions?:RequestOptions ):Promise<T & AccessPoint>;
	createAccessPointAndRetrieve<T extends object>( uri:string, accessPoint:T & BaseAccessPoint, requestOptions?:RequestOptions ):Promise<T & AccessPoint>;
	createAccessPointAndRetrieve<T extends object>( uri:string, accessPoint:T & BaseAccessPoint, slug?:string, requestOptions?:RequestOptions ):Promise<T & AccessPoint>;

	createAccessPoints<T extends object>( accessPoints:(T & BaseAccessPoint)[], requestOptions?:RequestOptions ):Promise<(T & AccessPoint)[]>;
	createAccessPoints<T extends object>( accessPoints:(T & BaseAccessPoint)[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & AccessPoint)[]>;
	createAccessPoints<T extends object>( uri:string, accessPoints:(T & BaseAccessPoint)[], requestOptions?:RequestOptions ):Promise<(T & AccessPoint)[]>;
	createAccessPoints<T extends object>( uri:string, accessPoints:(T & BaseAccessPoint)[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & AccessPoint)[]>;

	createAccessPointsAndRetrieve<T extends object>( accessPoints:(T & BaseAccessPoint)[], requestOptions?:RequestOptions ):Promise<(T & AccessPoint)[]>;
	createAccessPointsAndRetrieve<T extends object>( accessPoints:(T & BaseAccessPoint)[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & AccessPoint)[]>;
	createAccessPointsAndRetrieve<T extends object>( uri:string, accessPoints:(T & BaseAccessPoint)[], requestOptions?:RequestOptions ):Promise<(T & AccessPoint)[]>;
	createAccessPointsAndRetrieve<T extends object>( uri:string, accessPoints:(T & BaseAccessPoint)[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & AccessPoint)[]>;


	refresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;

	save<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;

	saveAndRefresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;


	delete( requestOptions?:RequestOptions ):Promise<void>;
	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}


function getTargetID( uri:string, response:Response ):string {
	const locationHeader:Header = response.getHeader( "Content-Location" );
	if( ! locationHeader ) return uri;

	if( locationHeader.values.length !== 1 ) throw new BadResponseError( "The response must contain one Content-Location header.", response );
	const locationString:string = "" + locationHeader;

	if( ! locationString ) throw new BadResponseError( `The response doesn't contain a valid 'Content-Location' header.`, response );
	return locationString;
}

function parseRDFDocument<T extends object>( registry:DocumentsRegistry, rdfDocument:RDFDocument, eTag:string ):T & Document {
	const resource:T & Document = new JSONLDCompacter( registry )
		.compactDocument<T>( rdfDocument );

	resource._eTag = eTag;
	resource._resolved = true;

	return resource;
}

function addAuthentication( registry:DocumentsRegistry, requestOptions:RequestOptions ):void {
	if( ! registry._context || ! registry._context.auth ) return;
	registry._context.auth.addAuthentication( requestOptions );
}

function setDefaultRequestOptions( registry:DocumentsRegistry, requestOptions:RequestOptions, interactionModel?:string ):RequestOptions {
	addAuthentication( registry, requestOptions );

	if( interactionModel ) RequestUtils.setPreferredInteractionModel( interactionModel, requestOptions );
	RequestUtils.setAcceptHeader( "application/ld+json", requestOptions );

	return requestOptions;
}

function getRegistry( repository:CRUDDocument ):DocumentsRegistry {
	if( repository._registry ) return repository._registry;
	throw new IllegalActionError( `"${ repository.id }" doesn't support CRUD requests.` );
}


function getFullResource<T extends object>( this:void, registry:DocumentsRegistry, uri:string, requestOptions:GETOptions ):T & Document | Promise<T & Document> {
	if( registry.hasPointer( uri ) ) {
		const resource:T & Document = registry.getPointer( uri ) as any;
		if( resource.isResolved() ) {
			if( ! requestOptions.ensureLatest ) return resource;
			RequestUtils.setIfNoneMatchHeader( resource._eTag, requestOptions );
		}
	}

	setDefaultRequestOptions( registry, requestOptions, LDP.RDFSource );

	return RequestService
		.get( uri, requestOptions, new RDFDocumentParser() )
		.then<T & Document>( ( [ rdfDocuments, response ]:[ RDFDocument[], Response ] ) => {
			uri = getTargetID( uri, response );

			const rdfDocument:RDFDocument | undefined = rdfDocuments.find( node => node[ "@id" ] === uri );
			if( ! rdfDocument ) throw new BadResponseError( "No document was returned.", response );

			const eTag:string = response.getETag();
			return parseRDFDocument<T>( registry, rdfDocument, eTag );
		} )
		.catch( registry._parseErrorFromResponse.bind( registry ) )
		;
}


function applyResponseMetadata( registry:DocumentsRegistry, freeNodes:RDFNode[] ):void {
	if( ! freeNodes.length ) return;
	const freeResources:FreeResources = registry._parseFreeNodes( freeNodes );
	const responseMetadata:ResponseMetadata = freeResources.getPointers().find( ResponseMetadata.is );

	for( const documentMetadata of responseMetadata.documentsMetadata ) {
		const resource:Document = documentMetadata.relatedDocument;
		for( const { entryKey, entryValue } of documentMetadata.bNodesMap.entries ) {
			const originalBNode:TransientFragment = resource.getPointer( entryKey.id, true );
			resource.removePointer( entryKey.id );

			originalBNode.id = entryValue.id;
			resource._register( originalBNode );
		}
	}
}

function applyResponseRepresentation<T extends Pointer>( registry:DocumentsRegistry, resource:T, response:Response ):T | Promise<T> {
	if( response.status === 204 || ! response.data ) return resource;

	return new JSONLDParser()
		.parse( response.data )
		.then<T>( ( expandedResult:object[] ) => {
			const freeNodes:RDFNode[] = RDFNode.getFreeNodes( expandedResult );
			applyResponseMetadata( registry, freeNodes );

			const preferenceHeader:Header = response.getHeader( "Preference-Applied" );
			if( preferenceHeader === null || preferenceHeader.toString() !== "return=representation" ) return resource;

			const rdfDocument:RDFDocument | undefined = RDFDocument
				.getDocuments( expandedResult )
				.find( node => node[ "@id" ] === resource.id );
			if( ! rdfDocument ) throw new BadResponseError( "No document was returned.", response );

			return parseRDFDocument<T>( registry, rdfDocument, response.getETag() );
		} );
}


function persistResource<T extends object>( registry:DocumentsRegistry, parentURI:string, slug:string, resource:Pointer, requestOptions:RequestOptions ):Promise<T & ProtectedDocument> {
	RequestUtils.setContentTypeHeader( "application/ld+json", requestOptions );

	if( resource.id && ! URI.isBaseOf( parentURI, resource.id ) ) {
		return Promise.reject( new IllegalArgumentError( "The document's URI is not relative to the parentURI specified" ) );
	}

	if( resource[ "__CarbonLDP_persisting__" ] ) return Promise.reject( new IllegalArgumentError( "The document is already being persisted." ) );
	Object.defineProperty( resource, "__CarbonLDP_persisting__", { configurable: true, enumerable: false, writable: false, value: true } );

	resource._registry = registry;
	const body:string = JSON.stringify( resource );

	if( ! ! slug ) RequestUtils.setSlug( slug, requestOptions );

	return RequestService
		.post( parentURI, body, requestOptions )
		.then( ( response:Response ) => {
			delete resource[ "__CarbonLDP_persisting__" ];

			let locationHeader:Header = response.getHeader( "Location" );
			if( locationHeader === null || locationHeader.values.length < 1 ) throw new BadResponseError( "The response is missing a Location header.", response );
			if( locationHeader.values.length !== 1 ) throw new BadResponseError( "The response contains more than one Location header.", response );

			resource.id = locationHeader.values[ 0 ].toString();
			registry._register( resource );

			const persistedDocument:T & ProtectedDocument = ProtectedDocument
				.decorate( resource as T );

			persistedDocument
				.getFragments()
				.forEach( Fragment.decorate );

			return applyResponseRepresentation( registry, persistedDocument, response );
		} )
		.catch( ( error ) => {
			delete resource[ "__CarbonLDP_persisting__" ];
			return registry._parseErrorFromResponse( error );
		} );
}


function persistChild<T extends object>( registry:DocumentsRegistry, parentURI:string, requestOptions:RequestOptions, child?:T, slug?:string ):Promise<T & ProtectedDocument> {
	if( PersistedResource.is( child ) ) throw new IllegalArgumentError( "The child provided has already been persisted." );

	let childDocument:T & TransientDocument;
	if( TransientDocument.is( child ) ) {
		childDocument = child;
		childDocument._normalize();
	} else {
		if( ! child ) child = {} as T;
		childDocument = TransientDocument.createFrom<T>( child );
	}

	setDefaultRequestOptions( registry, requestOptions, LDP.Container );
	return persistResource<T>( registry, parentURI, slug, childDocument, requestOptions );
}

function createChildren<T extends object>( retrievalType:"minimal" | "representation", repository:CRUDDocument, uriOrChildren?:string | T | T[], childrenOrSlugsOrOptions?:T | T[] | string | string[] | RequestOptions, slugsOrOptions?:string | string[] | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument) | (T & ProtectedDocument)[]> {
	return promiseMethod<(T & ProtectedDocument) | (T & ProtectedDocument)[]>( () => {
		const registry:DocumentsRegistry = getRegistry( repository );

		requestOptions = RequestUtils.isOptions( childrenOrSlugsOrOptions ) ?
			childrenOrSlugsOrOptions :
			RequestUtils.isOptions( slugsOrOptions ) ?
				slugsOrOptions :
				requestOptions ? requestOptions : {}
		;

		const uri:string | undefined = isString( uriOrChildren ) ? uriOrChildren : void 0;
		const url:string = RequestUtils.getRequestURLFor( registry, repository, uri );

		const slugs:string[] | string | null = isString( childrenOrSlugsOrOptions ) ?
			childrenOrSlugsOrOptions :
			isString( slugsOrOptions ) || Array.isArray( slugsOrOptions ) ?
				slugsOrOptions :
				Array.isArray( childrenOrSlugsOrOptions ) && Array.isArray( uriOrChildren ) ?
					childrenOrSlugsOrOptions as string[] :
					null
		;

		const children:T[] | T = Array.isArray( uriOrChildren ) || isObject( uriOrChildren ) ?
			uriOrChildren :
			childrenOrSlugsOrOptions as T[] | T
		;

		RequestUtils.setPreferredRetrieval( retrievalType, requestOptions );

		if( ! Array.isArray( slugs ) && ! Array.isArray( children ) )
			return persistChild<T>( registry, url, requestOptions, children, slugs );


		const slugsLength:number | undefined = Array.isArray( slugs ) ? slugs.length : 0;
		const childrenLength:number | undefined = Array.isArray( children ) ? children.length : 0;
		const total:number = Math.max( slugsLength, childrenLength );

		const promises:Promise<T & ProtectedDocument>[] = Array( total );
		for( let index:number = 0; index < total; ++ index ) {
			const cloneOptions:RequestOptions = RequestUtils.cloneOptions( requestOptions );

			const child:T | undefined = index < childrenLength ? children[ index ] : void 0;
			const slug:string | undefined = index < slugsLength ? slugs[ index ] : void 0;

			promises[ index ] = persistChild<T>( registry, url, cloneOptions, child, slug );
		}

		return Promise.all( promises );
	} );
}


function persistAccessPoint<T extends object>( registry:DocumentsRegistry, documentURI:string, requestOptions:RequestOptions, accessPoint:T & BaseAccessPoint, slug?:string ):Promise<T & AccessPoint> {
	if( PersistedResource.is( accessPoint ) ) throw new IllegalArgumentError( "The access-point provided has already been persisted." );

	let accessPointDocument:T & TransientAccessPoint;
	if( TransientAccessPoint.is( accessPoint ) ) {
		accessPointDocument = accessPoint;
		accessPointDocument._normalize();
	} else {
		accessPointDocument = TransientAccessPoint.createFrom<T>( accessPoint );
	}

	if( ! accessPointDocument.membershipResource ) accessPointDocument.membershipResource = registry.getPointer( documentURI );
	else if( accessPointDocument.membershipResource.id !== documentURI ) throw new IllegalArgumentError( "The endpoint URI must be the same as the accessPoint's membershipResource." );

	setDefaultRequestOptions( registry, requestOptions, LDP.RDFSource );
	return persistResource<T & AccessPoint>( registry, documentURI, slug, accessPointDocument, requestOptions );
}

function createAccessPoint<T extends object>( retrievalType:"minimal" | "representation", repository:CRUDDocument, uriOrAccessPoint:string | (T & BaseAccessPoint), accessPointOrSlugOrRequestOptions?:(T & BaseAccessPoint) | string | RequestOptions, slugOrRequestOptions?:string | RequestOptions, requestOptions:RequestOptions = {} ):Promise<T & AccessPoint> {
	return promiseMethod( () => {
		const registry:DocumentsRegistry = getRegistry( repository );

		const uri:string | undefined = isString( uriOrAccessPoint ) ? uriOrAccessPoint : void 0;
		const url:string = RequestUtils.getRequestURLFor( registry, repository, uri );

		const accessPoint:T & BaseAccessPoint = isObject( uriOrAccessPoint ) ? uriOrAccessPoint :
			accessPointOrSlugOrRequestOptions as T & BaseAccessPoint;

		const slug:string | undefined = isString( accessPointOrSlugOrRequestOptions ) ? accessPointOrSlugOrRequestOptions :
			isString( slugOrRequestOptions ) ? slugOrRequestOptions : void 0;

		requestOptions = RequestUtils.isOptions( accessPointOrSlugOrRequestOptions ) ? accessPointOrSlugOrRequestOptions :
			isObject( slugOrRequestOptions ) ? slugOrRequestOptions : requestOptions;

		RequestUtils.setPreferredRetrieval( retrievalType, requestOptions );

		return persistAccessPoint( registry, url, requestOptions, accessPoint, slug );
	} );
}

function createAccessPoints<T extends object>( retrievalType:"minimal" | "representation", repository:CRUDDocument, uriOrAccessPoints:string | (T & BaseAccessPoint)[], accessPointOrSlugsOrRequestOptions?:(T & BaseAccessPoint)[] | string[] | RequestOptions, slugsOrRequestOptions?:string[] | RequestOptions, requestOptions:RequestOptions = {} ):Promise<(T & AccessPoint)[]> {
	return promiseMethod( () => {
		const registry:DocumentsRegistry = getRegistry( repository );

		const uri:string | undefined = isString( uriOrAccessPoints ) ? uriOrAccessPoints : void 0;
		const url:string = RequestUtils.getRequestURLFor( registry, repository, uri );

		const accessPoints:(T & BaseAccessPoint)[] = Array.isArray( uriOrAccessPoints ) ? uriOrAccessPoints :
			accessPointOrSlugsOrRequestOptions as (T & BaseAccessPoint)[];

		const slugs:string[] | undefined = Array.isArray( accessPointOrSlugsOrRequestOptions ) && accessPointOrSlugsOrRequestOptions !== accessPoints ?
			accessPointOrSlugsOrRequestOptions as string[] :
			Array.isArray( slugsOrRequestOptions ) ? slugsOrRequestOptions : void 0;

		requestOptions = RequestUtils.isOptions( accessPointOrSlugsOrRequestOptions ) ? accessPointOrSlugsOrRequestOptions :
			isObject( slugsOrRequestOptions ) && slugsOrRequestOptions !== slugs ? slugsOrRequestOptions as RequestOptions : requestOptions;

		RequestUtils.setPreferredRetrieval( retrievalType, requestOptions );

		const slugsLength:number | undefined = Array.isArray( slugs ) ? slugs.length : 0;
		const total:number = accessPoints.length;

		const promises:Promise<T & AccessPoint>[] = Array( total );
		for( let index:number = 0; index < total; ++ index ) {
			const cloneOptions:RequestOptions = RequestUtils.cloneOptions( requestOptions );
			const slug:string | undefined = index < slugsLength ? slugs[ index ] : void 0;

			promises[ index ] = persistAccessPoint<T>( registry, url, cloneOptions, accessPoints[ index ], slug );
		}

		return Promise.all( promises );
	} );
}


function refreshResource<T extends CRUDDocument>( registry:DocumentsRegistry, resource:T, requestOptions:RequestOptions ):Promise<T & CRUDDocument> {
	const url:string = RequestUtils.getRequestURLFor( registry, resource );

	setDefaultRequestOptions( registry, requestOptions, LDP.RDFSource );
	RequestUtils.setIfNoneMatchHeader( resource._eTag, requestOptions );

	return RequestService
		.get( url, requestOptions, new RDFDocumentParser() )
		.then( ( [ rdfDocuments, response ]:[ RDFDocument[], Response ] ) => {
			if( response === null ) return resource;

			const rdfDocument:RDFDocument | undefined = rdfDocuments.find( node => node[ "@id" ] === url );
			if( rdfDocument === null ) throw new BadResponseError( "No document was returned.", response );

			const eTag:string = response.getETag();
			return parseRDFDocument<T & CRUDDocument>( registry, rdfDocument, eTag );
		} )
		.catch<T & CRUDDocument>( ( response:Response ) => {
			if( response.status === 304 ) return resource;

			return resource._registry._parseErrorFromResponse( response );
		} );
}

function addResourcePatch( registry:DocumentsRegistry, deltaCreator:DeltaCreator, pointer:Pointer, current:object, snapshot:object ):void {
	const schema:DigestedObjectSchema = registry.getSchemaFor( pointer );
	deltaCreator.addResource( schema, pointer.id, snapshot, current );
}

function sendPatch<T extends CRUDDocument>( registry:DocumentsRegistry, resource:T, requestOptions:RequestOptions ):Promise<T> {
	const url:string = RequestUtils.getRequestURLFor( registry, resource );

	if( ! resource.isDirty() ) return Promise.resolve( resource );
	resource._normalize();

	setDefaultRequestOptions( registry, requestOptions );
	RequestUtils.setContentTypeHeader( "text/ldpatch", requestOptions );
	RequestUtils.setIfMatchHeader( resource._eTag, requestOptions );


	const deltaCreator:DeltaCreator = new DeltaCreator( resource._registry.jsonldConverter );

	// Document resource
	addResourcePatch( registry, deltaCreator, resource, resource, resource._snapshot );

	// Current fragments
	resource
		.getPointers( true )
		.forEach( pointer => {
			const snapshot:object = PersistedResource.is( pointer ) ? pointer._snapshot : {};
			addResourcePatch( registry, deltaCreator, pointer, pointer, snapshot );
		} )
	;

	// Deleted fragments
	resource._savedFragments
		.filter( pointer => ! resource.hasPointer( pointer.id ) )
		.forEach( pointer => {
			addResourcePatch( registry, deltaCreator, pointer, {}, pointer._snapshot );
		} )
	;


	const body:string = deltaCreator.getPatch();

	return RequestService
		.patch( url, body, requestOptions )
		.then( ( response:Response ) => {
			return applyResponseRepresentation<T>( registry, resource, response );
		} )
		.catch( registry._parseErrorFromResponse.bind( resource ) )
		;
}


const PROTOTYPE:PickSelfProps<CRUDDocument, BasePersistedDocument> = {
	get<T extends object>( this:CRUDDocument, uriOrOptions:string | GETOptions, requestOptions?:RequestOptions ):Promise<T & Document> {
		return promiseMethod( () => {
			const registry:DocumentsRegistry = getRegistry( this );

			const uri:string | undefined = isString( uriOrOptions ) ? uriOrOptions : void 0;
			const url:string = RequestUtils.getRequestURLFor( registry, this, uri );

			requestOptions = isObject( uriOrOptions ) ? uriOrOptions :
				requestOptions ? requestOptions : {};

			return getFullResource<T>( registry, url, requestOptions );
		} );
	},

	resolve<T extends object>( this:CRUDDocument, requestOptions:GETOptions = {} ):Promise<T & Document> {
		return promiseMethod( () => {
			const registry:DocumentsRegistry = getRegistry( this );

			const url:string = RequestUtils.getRequestURLFor( registry, this );
			return getFullResource<T>( registry, url, requestOptions );
		} );
	},


	exists( this:CRUDDocument, uri:string, requestOptions:RequestOptions = {} ):Promise<boolean> {
		return promiseMethod( () => {
			const registry:DocumentsRegistry = getRegistry( this );

			const url:string = RequestUtils.getRequestURLFor( registry, this, uri );
			setDefaultRequestOptions( registry, requestOptions, LDP.RDFSource );

			return RequestService
				.head( url, requestOptions )
				.then( () => true )
				.catch<boolean>( ( response:Response ) => {
					if( response.status === 404 ) return false;
					return registry._parseErrorFromResponse( response );
				} );
		} );
	},


	create<T extends object>( this:CRUDDocument, uriOrChildren?:string | T | T[], childrenOrSlugsOrOptions?:T | T[] | string | string[] | RequestOptions, slugsOrOptions?:string | string[] | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & ProtectedDocument) | (T & ProtectedDocument)[]> {
		return createChildren( "minimal", this, uriOrChildren, childrenOrSlugsOrOptions, slugsOrOptions, requestOptions );
	},

	createAndRetrieve<T extends object>( this:CRUDDocument, uriOrChildren?:string | T | T[], childrenOrSlugsOrOptions?:T | T[] | string | string[] | RequestOptions, slugsOrOptions?:string | string[] | RequestOptions, requestOptions:RequestOptions = {} ):Promise<(T & ProtectedDocument) | (T & ProtectedDocument)[]> {
		return createChildren( "representation", this, uriOrChildren, childrenOrSlugsOrOptions, slugsOrOptions, requestOptions );
	},


	createAccessPoint<T extends object>( this:CRUDDocument, uriOrAccessPoint:string | (T & BaseAccessPoint), accessPointOrSlugOrRequestOptions?:(T & BaseAccessPoint) | string | RequestOptions, slugOrRequestOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<T & AccessPoint> {
		return createAccessPoint( "minimal", this, uriOrAccessPoint, accessPointOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions );
	},

	createAccessPointAndRetrieve<T extends object>( this:CRUDDocument, uriOrAccessPoint:string | (T & BaseAccessPoint), accessPointOrSlugOrRequestOptions?:(T & BaseAccessPoint) | string | RequestOptions, slugOrRequestOptions?:string | RequestOptions, requestOptions?:RequestOptions ):Promise<T & AccessPoint> {
		return createAccessPoint( "representation", this, uriOrAccessPoint, accessPointOrSlugOrRequestOptions, slugOrRequestOptions, requestOptions );
	},

	createAccessPoints<T extends object>( this:CRUDDocument, uriOrAccessPoints:string | (T & BaseAccessPoint)[], accessPointsOrSlugsOrRequestOptions?:(T & BaseAccessPoint)[] | string[] | RequestOptions, slugsOrRequestOptions?:string[] | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & AccessPoint)[]> {
		return createAccessPoints( "minimal", this, uriOrAccessPoints, accessPointsOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions );
	},

	createAccessPointsAndRetrieve<T extends object>( this:CRUDDocument, uriOrAccessPoints:string | (T & BaseAccessPoint)[], accessPointsOrSlugsOrRequestOptions?:(T & BaseAccessPoint)[] | string[] | RequestOptions, slugsOrRequestOptions?:string[] | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & AccessPoint)[]> {
		return createAccessPoints( "representation", this, uriOrAccessPoints, accessPointsOrSlugsOrRequestOptions, slugsOrRequestOptions, requestOptions );
	},


	refresh<T extends object>( this:T & Document, requestOptions:RequestOptions = {} ):Promise<T & Document> {
		return promiseMethod( () => {
			if( ! PersistedResource.is( this ) ) throw new IllegalArgumentError( "The resource isn't a persisted resource." );
			const registry:DocumentsRegistry = getRegistry( this );

			return refreshResource<T & Document>( registry, this, requestOptions );
		} );
	},

	save<T extends object>( this:T & Document, requestOptions:RequestOptions = {} ):Promise<T & Document> {
		return promiseMethod( () => {
			if( ! PersistedResource.is( this ) ) throw new IllegalArgumentError( "The resource isn't a persisted resource." );
			const registry:DocumentsRegistry = getRegistry( this );

			RequestUtils.setPreferredRetrieval( "minimal", requestOptions );
			return sendPatch<T & Document>( registry, this, requestOptions );
		} );
	},

	saveAndRefresh<T extends object>( this:T & Document, requestOptions:RequestOptions = {} ):Promise<T & Document> {
		return promiseMethod( () => {
			if( ! PersistedResource.is( this ) ) throw new IllegalArgumentError( "The resource isn't a persisted resource." );
			const registry:DocumentsRegistry = getRegistry( this );

			RequestUtils.setPreferredRetrieval( "representation", requestOptions );
			return sendPatch<T & Document>( registry, this, requestOptions );
		} );
	},


	delete( this:CRUDDocument, uriOrOptions:string | RequestOptions, requestOptions:RequestOptions = {} ):Promise<void> {
		return promiseMethod( () => {
			const registry:DocumentsRegistry = getRegistry( this );

			const uri:string | undefined = isString( uriOrOptions ) ? uriOrOptions : void 0;
			const url:string = RequestUtils.getRequestURLFor( registry, this, uri );

			setDefaultRequestOptions( registry, requestOptions, LDP.RDFSource );

			return RequestService
				.delete( url, requestOptions )
				.then( () => {
					this._registry.removePointer( url );
				} )
				.catch( this._registry._parseErrorFromResponse.bind( this ) )
				;
		} );
	},
};

export interface CRUDDocumentFactory {
	PROTOTYPE:PickSelfProps<CRUDDocument, BasePersistedDocument>;

	isDecorated( object:object ):object is CRUDDocument;

	decorate<T extends object>( object:T ):T & CRUDDocument;


	is( value:any ):value is CRUDDocument;
}

export const CRUDDocument:CRUDDocumentFactory = {
	PROTOTYPE,

	isDecorated( object:object ):object is CRUDDocument {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object )
			;
	},

	decorate<T extends object>( object:T ):T & CRUDDocument {
		if( CRUDDocument.isDecorated( object ) ) return object;

		const resource:T & BasePersistedDocument = ModelDecorator
			.decorateMultiple( object, BasePersistedDocument );

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},


	is( value:any ):value is CRUDDocument {
		return isObject( value )
			&& BasePersistedDocument.is( value )
			&& CRUDDocument.isDecorated( value )
			;
	},
};
