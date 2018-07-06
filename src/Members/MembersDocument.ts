import { AbstractContext } from "../Context/AbstractContext";
import { ModelDecorator } from "../Model";
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
import { Pointer } from "../Pointer";
import { RegistryService } from "../Registry";
import { TransientResource } from "../Resource";
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
import { AddMemberAction } from "./AddMemberAction";
import { RemoveMemberAction } from "./RemoveMemberAction";


export interface MembersDocument extends TransientResource {
	_registry:RegistryService<MembersDocument, AbstractContext<MembersDocument, any> | undefined> | undefined;


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


function getRegistry( repository:MembersDocument ):RegistryService<MembersDocument, AbstractContext<MembersDocument, any> | undefined> {
	if( repository._registry && repository._registry.context ) return repository._registry;
	throw new IllegalActionError( `"${ repository.$id }" doesn't support Members management requests.` );
}

function setDefaultRequestOptions( registry:RegistryService<MembersDocument, AbstractContext<MembersDocument, any> | undefined>, requestOptions:RequestOptions ):RequestOptions {
	if( registry.context && registry.context.auth )
		registry.context.auth.addAuthentication( requestOptions );

	RequestUtils.setPreferredInteractionModel( LDP.Container, requestOptions );
	RequestUtils.setAcceptHeader( "application/ld+json", requestOptions );

	return requestOptions;
}

function parseMembers( registry:RegistryService<Pointer, any>, pointers:(string | Pointer)[] ):Pointer[] {
	return pointers.map( pointer => {
		if( isString( pointer ) ) return registry.getPointer( pointer );
		if( Pointer.is( pointer ) ) return pointer;

		throw new IllegalArgumentError( "No valid Pointer or URI provided." );
	} );
}


function sendAddAction( repository:MembersDocument, uri:string | undefined, members:(string | Pointer)[], requestOptions:RequestOptions = {} ):Promise<void> {
	return promiseMethod( () => {
		const registry:RegistryService<MembersDocument, AbstractContext<MembersDocument, any> | undefined> = getRegistry( repository );

		const url:string = RequestUtils.getRequestURLFor( registry, repository, uri );
		const targetMembers:Pointer[] = parseMembers( registry, members );

		setDefaultRequestOptions( registry, requestOptions );
		RequestUtils.setContentTypeHeader( "application/ld+json", requestOptions );

		const freeResources:FreeResources = FreeResources.createFrom( {
			_registry: registry,
		} );
		freeResources._addPointer( AddMemberAction.createFrom( { targetMembers } ) );

		const body:string = JSON.stringify( freeResources );

		return RequestService
			.put( url, body, requestOptions )
			.then( () => {} )
			.catch( registry._parseFailedResponse.bind( registry ) )
			;
	} );
}

function sendRemoveAction( repository:MembersDocument, uri:string | undefined, members:(string | Pointer)[], requestOptions:RequestOptions = {} ):Promise<void> {
	return promiseMethod( () => {
		const registry:RegistryService<MembersDocument, AbstractContext<MembersDocument, any> | undefined> = getRegistry( repository );

		const url:string = RequestUtils.getRequestURLFor( registry, repository, uri );
		const targetMembers:Pointer[] = parseMembers( registry, members );

		setDefaultRequestOptions( registry, requestOptions );
		RequestUtils.setContentTypeHeader( "application/ld+json", requestOptions );
		RequestUtils.setRetrievalPreferences( {
			include: [ C.PreferSelectedMembershipTriples ],
			omit: [ C.PreferMembershipTriples ],
		}, requestOptions );

		const freeResources:FreeResources = FreeResources.createFrom( {
			_registry: registry,
		} );
		freeResources._addPointer( RemoveMemberAction.createFrom( { targetMembers } ) );

		const body:string = JSON.stringify( freeResources );

		return RequestService
			.delete( url, body, requestOptions )
			.then( () => {} )
			.catch( registry._parseFailedResponse.bind( registry ) )
			;
	} );
}


const PROTOTYPE:PickSelfProps<MembersDocument, TransientResource, "_registry"> = {
	_registry: void 0,


	addMember( this:MembersDocument, uriOrMember:string | (Pointer | string), memberOrOptions?:(Pointer | string) | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
		requestOptions = isObject( memberOrOptions ) && ! Pointer.is( memberOrOptions ) ?
			memberOrOptions :
			requestOptions;

		const member:(Pointer | string) = memberOrOptions !== requestOptions ?
			memberOrOptions as (Pointer | string) :
			uriOrMember as (Pointer | string);

		const uri:string | undefined = member !== uriOrMember ?
			uriOrMember as string :
			void 0;

		return sendAddAction( this, uri, [ member ], requestOptions );
	},

	addMembers( this:MembersDocument, uriOrMembers:string | (Pointer | string)[], membersOrOptions:(Pointer | string)[] | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
		requestOptions = ! Array.isArray( membersOrOptions ) ?
			membersOrOptions :
			requestOptions;

		const members:(Pointer | string)[] = membersOrOptions !== requestOptions ?
			membersOrOptions as (Pointer | string)[] :
			uriOrMembers as (Pointer | string)[];

		const uri:string | undefined = members !== uriOrMembers ?
			uriOrMembers as string :
			void 0;

		return sendAddAction( this, uri, members, requestOptions );
	},


	removeMember( this:MembersDocument, uriOrMember:string | (Pointer | string), memberOrOptions:(Pointer | string) | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
		requestOptions = isObject( memberOrOptions ) && ! Pointer.is( memberOrOptions ) ?
			memberOrOptions :
			requestOptions;

		const member:(Pointer | string) = memberOrOptions !== requestOptions ?
			memberOrOptions as (Pointer | string) :
			uriOrMember as (Pointer | string);

		const uri:string | undefined = member !== uriOrMember ?
			uriOrMember as string :
			void 0;

		return sendRemoveAction( this, uri, [ member ], requestOptions );
	},

	removeMembers( this:MembersDocument, uriOrMembers:string | (Pointer | string)[], membersOrOptions:(Pointer | string)[] | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
		requestOptions = ! Array.isArray( membersOrOptions ) ?
			membersOrOptions :
			requestOptions;

		const members:(Pointer | string)[] = membersOrOptions !== requestOptions ?
			membersOrOptions as (Pointer | string)[] :
			uriOrMembers as (Pointer | string)[];

		const uri:string | undefined = members !== uriOrMembers ?
			uriOrMembers as string :
			void 0;

		return sendRemoveAction( this, uri, members, requestOptions );
	},


	removeAllMembers( this:MembersDocument, uriOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
		requestOptions = isObject( uriOrOptions ) ? uriOrOptions :
			requestOptions ? requestOptions : {};

		const uri:string | undefined = uriOrOptions !== requestOptions ?
			uriOrOptions as string :
			void 0;

		return promiseMethod( () => {
			const registry:RegistryService<MembersDocument, AbstractContext<MembersDocument, any> | undefined> = getRegistry( this );
			const url:string = RequestUtils.getRequestURLFor( registry, this, uri );

			setDefaultRequestOptions( registry, requestOptions );
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
				.catch( registry._parseFailedResponse.bind( registry ) )
				;
		} );
	},
};

export interface MembersDocumentFactory {
	PROTOTYPE:PickSelfProps<MembersDocument, TransientResource, "_registry">;


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

		const resource:T & TransientResource = ModelDecorator
			.decorateMultiple( object, TransientResource );

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},
};
