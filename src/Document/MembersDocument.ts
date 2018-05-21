import { ModelDecorator } from "../core";
import {
	IllegalActionError,
	IllegalArgumentError
} from "../Errors";
import { FreeResources } from "../FreeResources";
import {
	RequestOptions,
	RequestService,
	RequestUtils
} from "../HTTP";
import {
	AddMemberAction,
	RemoveMemberAction
} from "../LDP";
import { Pointer } from "../Pointer";
import { DocumentsRegistry } from "../Registry";
import {
	isObject,
	isString,
	PickSelfProps,
	promiseMethod
} from "../Utils";
import {
	C,
	LDP
} from "../Vocabularies";
import { TransientDocument } from "./TransientDocument";


export interface MembersDocument extends TransientDocument {
	addMember( member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;
	addMember( uri:string, member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;

	addMembers( members:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;
	addMembers( uri:string, members:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;


	removeMember( member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;
	removeMember( uri:string, member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;

	removeMembers( members:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;
	removeMembers( uri:string, members:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;

	removeAllMembers( requestOptions?:RequestOptions ):Promise<void>;
	removeAllMembers( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}


function getRegistry( repository:MembersDocument ):DocumentsRegistry {
	if( repository._registry ) return repository._registry;
	throw new IllegalActionError( `"${ repository.id }" does't support members management requests.` );
}

function setDefaultRequestOptions( registry:DocumentsRegistry, requestOptions:RequestOptions, interactionModel?:string ):RequestOptions {
	registry._context.auth.addAuthentication( requestOptions );

	if( interactionModel ) RequestUtils.setPreferredInteractionModel( interactionModel, requestOptions );
	RequestUtils.setAcceptHeader( "application/ld+json", requestOptions );

	return requestOptions;
}

function parseMembers( registry:DocumentsRegistry, pointers:(string | Pointer)[] ):Pointer[] {
	return pointers.map( pointer => {
		if( isString( pointer ) ) return registry.getPointer( pointer );
		if( Pointer.is( pointer ) ) return pointer;

		throw new IllegalArgumentError( "No valid Pointer or URI provided." );
	} );
}


function sendAddAction( repository:MembersDocument, uri:string | undefined, members:(string | Pointer)[], requestOptions:RequestOptions ):Promise<void> {
	return promiseMethod( () => {
		const registry:DocumentsRegistry = getRegistry( repository );

		const iri:string = registry._requestURLFor( repository, uri );
		const targetMembers:Pointer[] = parseMembers( registry, members );

		setDefaultRequestOptions( registry, requestOptions, LDP.Container );
		RequestUtils.setContentTypeHeader( "application/ld+json", requestOptions );

		const freeResources:FreeResources = FreeResources.createFrom( {
			_registry: registry,
			_context: registry._context,
		} );
		freeResources._register( AddMemberAction.createFrom( { targetMembers } ) );

		const body:string = JSON.stringify( freeResources );

		return RequestService
			.put( iri, body, requestOptions )
			.then( () => {} )
			.catch( registry._parseErrorResponse.bind( registry ) )
			;
	} );
}

function sendRemoveAction( repository:MembersDocument, uri:string | undefined, members:(string | Pointer)[], requestOptions:RequestOptions ):Promise<void> {
	return promiseMethod( () => {
		const registry:DocumentsRegistry = getRegistry( repository );

		const iri:string = registry._requestURLFor( repository, uri );
		const targetMembers:Pointer[] = parseMembers( registry, members );

		setDefaultRequestOptions( registry, requestOptions, LDP.Container );
		RequestUtils.setContentTypeHeader( "application/ld+json", requestOptions );
		RequestUtils.setRetrievalPreferences( {
			include: [ C.PreferSelectedMembershipTriples ],
			omit: [ C.PreferMembershipTriples ],
		}, requestOptions );

		const freeResources:FreeResources = FreeResources.createFrom( {
			_registry: registry,
			_context: registry._context,
		} );
		freeResources._register( RemoveMemberAction.createFrom( { targetMembers } ) );

		const body:string = JSON.stringify( freeResources );

		return RequestService
			.delete( iri, body, requestOptions )
			.then( () => {} )
			.catch( registry._parseErrorResponse.bind( registry ) )
			;
	} );
}


const PROTOTYPE:PickSelfProps<MembersDocument, TransientDocument> = {
	addMember( this:MembersDocument, uriOrMember:string | (Pointer | string), memberOrOptions:(Pointer | string) | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
		requestOptions = isObject( memberOrOptions ) && ! Pointer.is( memberOrOptions ) ?
			memberOrOptions :
			requestOptions;

		const member:(Pointer | string) = memberOrOptions !== requestOptions ?
			memberOrOptions as (Pointer | string) :
			uriOrMember as (Pointer | string);

		const uri:string = member !== uriOrMember ?
			uriOrMember as string :
			"";

		return sendAddAction( this, uri, [ member ], requestOptions );
	},

	addMembers( this:MembersDocument, uriOrMembers:string | (Pointer | string)[], membersOrOptions:(Pointer | string)[] | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
		requestOptions = ! Array.isArray( membersOrOptions ) ?
			membersOrOptions :
			requestOptions;

		const members:(Pointer | string)[] = membersOrOptions !== requestOptions ?
			membersOrOptions as (Pointer | string)[] :
			uriOrMembers as (Pointer | string)[];

		const uri:string = members !== uriOrMembers ?
			uriOrMembers as string :
			"";

		return sendAddAction( this, uri, members, requestOptions );
	},


	removeMember( this:MembersDocument, uriOrMember:string | (Pointer | string), memberOrOptions:(Pointer | string) | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
		requestOptions = isObject( memberOrOptions ) && ! Pointer.is( memberOrOptions ) ?
			memberOrOptions :
			requestOptions ? requestOptions : {};

		const member:(Pointer | string) = memberOrOptions !== requestOptions ?
			memberOrOptions as (Pointer | string) :
			uriOrMember as (Pointer | string);

		const uri:string = member !== uriOrMember ?
			uriOrMember as string :
			"";

		return sendRemoveAction( this, uri, [ member ], requestOptions );
	},

	removeMembers( this:MembersDocument, uriOrMembers:string | (Pointer | string)[], membersOrOptions:(Pointer | string)[] | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
		requestOptions = ! Array.isArray( membersOrOptions ) ?
			membersOrOptions :
			requestOptions ? requestOptions : {};

		const members:(Pointer | string)[] = membersOrOptions !== requestOptions ?
			membersOrOptions as (Pointer | string)[] :
			uriOrMembers as (Pointer | string)[];

		const uri:string = members !== uriOrMembers ?
			uriOrMembers as string :
			"";

		return sendRemoveAction( this, uri, members, requestOptions );
	},


	removeAllMembers( this:MembersDocument, uriOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
		requestOptions = isObject( uriOrOptions ) ? uriOrOptions :
			requestOptions ? requestOptions : {};

		const uri:string = uriOrOptions !== requestOptions ?
			uriOrOptions as string :
			"";

		return promiseMethod( () => {
			const registry:DocumentsRegistry = getRegistry( this );
			const iri:string = registry._requestURLFor( this, uri );

			setDefaultRequestOptions( registry, requestOptions, LDP.Container );
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
				.delete( iri, requestOptions )
				.then( () => {} )
				.catch( registry._parseErrorResponse.bind( registry ) )
				;
		} );
	},
};

export interface MembersDocumentFactory {
	PROTOTYPE:PickSelfProps<MembersDocument, TransientDocument>;


	isDecorated( object:object ):object is MembersDocument;

	decorate<T extends object>( object:T ):T & MembersDocument;
}

export const MembersDocument:MembersDocumentFactory = {
	PROTOTYPE,


	isDecorated( object:object ):object is MembersDocument {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object )
			;
	},

	decorate<T extends object>( object:T ):T & MembersDocument {
		if( MembersDocument.isDecorated( object ) ) return object;

		const resource:T & TransientDocument = ModelDecorator
			.decorateMultiple( object, TransientDocument );

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},
};
