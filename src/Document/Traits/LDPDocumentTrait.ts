import { LDPDocumentsRepositoryTrait } from "../../DocumentsRepository/Traits/LDPDocumentsRepositoryTrait";
import { _parseURIParams } from "../../DocumentsRepository/Utils";

import { RequestOptions } from "../../HTTP/Request";
import { ModelDecorator } from "../../Model/ModelDecorator";

import { ModelPrototype } from "../../Model/ModelPrototype";

import { Pointer } from "../../Pointer/Pointer";
import { URI } from "../../RDF/URI";

import { ResolvablePointer } from "../../Repository/ResolvablePointer";

import { isObject, isString } from "../../Utils";

import { Document } from "../Document";
import { TransientDocument } from "../TransientDocument";


/**
 * Properties for creating a {@link LDPDocumentTrait}
 */
export interface BaseLDPDocumentTrait {
	/**
	 * Repository trait that will to execute requests of the trait to create.
	 */
	$repository:LDPDocumentsRepositoryTrait;
}

/**
 * Trait of a {@link Document} with methods for LDP related requests.
 */
export interface LDPDocumentTrait extends TransientDocument, ResolvablePointer {
	/**
	 * Repository trait that actually executes the request of the current trait.
	 */
	$repository:LDPDocumentsRepositoryTrait;

	/**
	 * Persists multiple objects as children of the current document.
	 * @param children Objects to be persisted.
	 * @param requestOptions Customizable options for the request.
	 */
	$create<T extends object>( children:T[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Persists multiple objects as children of the current document.
	 * @param children Objects to be persisted.
	 * @param slugs Suggested slugs for every child URI of the {@param children} provided. The slug will be assigned in the order they are provided.
	 * @param requestOptions Customizable options for the request.
	 */
	$create<T extends object>( children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Persists the object as a child of the current document.
	 * @param child Object to be persisted.
	 * @param requestOptions Customizable options for the request.
	 */
	$create<T extends object>( child:T, requestOptions?:RequestOptions ):Promise<T & Document>;
	/**
	 * Persists the object as a child of the current document.
	 * @param child Object to be persisted.
	 * @param slug Suggested slug for the child URI.
	 * @param requestOptions Customizable options for the request.
	 */
	$create<T extends object>( child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & Document>;
	/**
	 * Persists multiple objects as children of the document of the specified URI.
	 * @param uri URI of the document where to create the children.
	 * @param children Objects to be persisted.
	 * @param requestOptions Customizable options for the request.
	 */
	$create<T extends object>( uri:string, children:T[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Persists multiple objects as children of the document of the specified URI.
	 * @param uri URI of the document where to create the children.
	 * @param children Objects to be persisted.
	 * @param slugs Suggested slugs for every child URI of the {@param children} provided. The slug will be assigned in the order they are provided.
	 * @param requestOptions Customizable options for the request.
	 */
	$create<T extends object>( uri:string, children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Persists the object as a child of the document of the specified URI.
	 * @param uri URI of the document where to create the child.
	 * @param child Object to be persisted.
	 * @param requestOptions Customizable options for the request.
	 */
	$create<T extends object>( uri:string, child:T, requestOptions?:RequestOptions ):Promise<T & Document>;
	/**
	 * Persists the object as a child of the document of the specified URI.
	 * @param uri URI of the document where to create the child.
	 * @param child Object to be persisted.
	 * @param slug Suggested slug for the child URI.
	 * @param requestOptions Customizable options for the request.
	 */
	$create<T extends object>( uri:string, child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & Document>;

	/**
	 * Persists multiple objects as children of the current document and retrieves the updated data from the server.
	 * @param children Objects to be persisted.
	 * @param requestOptions Customizable options for the request.
	 */
	$createAndRetrieve<T extends object>( children:T[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Persists multiple objects as children of the current document and retrieves the updated data from the server.
	 * @param children Objects to be persisted.
	 * @param slugs Suggested slugs for every child URI of the {@param children} provided. The slug will be assigned in the order they are provided.
	 * @param requestOptions Customizable options for the request.
	 */
	$createAndRetrieve<T extends object>( children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Persists the object as a child of the current document and retrieves the updated data from the server.
	 * @param child Object to be persisted.
	 * @param requestOptions Customizable options for the request.
	 */
	$createAndRetrieve<T extends object>( child:T, requestOptions?:RequestOptions ):Promise<T & Document>;
	/**
	 * Persists the object as a child of the current document and retrieves the updated data from the server.
	 * @param child Object to be persisted.
	 * @param slug Suggested slug for the child URI.
	 * @param requestOptions Customizable options for the request.
	 */
	$createAndRetrieve<T extends object>( child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & Document>;
	/**
	 * Persists multiple objects as children of the document of the specified URI and retrieves the updated data from the server.
	 * @param uri URI of the document where to create the children.
	 * @param children Objects to be persisted.
	 * @param requestOptions Customizable options for the request.
	 */
	$createAndRetrieve<T extends object>( uri:string, children:T[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Persists multiple objects as children of the document of the specified URI and retrieves the updated data from the server.
	 * @param uri URI of the document where to create the children.
	 * @param children Objects to be persisted.
	 * @param slugs Suggested slugs for every child URI of the {@param children} provided. The slug will be assigned in the order they are provided.
	 * @param requestOptions Customizable options for the request.
	 */
	$createAndRetrieve<T extends object>( uri:string, children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	/**
	 * Persists the object as a child of the document of the specified URI and retrieves the updated data from the server.
	 * @param uri URI of the document where to create the child.
	 * @param child Object to be persisted.
	 * @param requestOptions Customizable options for the request.
	 */
	$createAndRetrieve<T extends object>( uri:string, child:T, requestOptions?:RequestOptions ):Promise<T & Document>;
	/**
	 * Persists the object as a child of the document of the specified URI and retrieves the updated data from the server.
	 * @param uri URI of the document where to create the child.
	 * @param child Object to be persisted.
	 * @param slug Suggested slug for the child URI.
	 * @param requestOptions Customizable options for the request.
	 */
	$createAndRetrieve<T extends object>( uri:string, child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & Document>;


	/**
	 * Adds the provided resource as member of the current document.
	 * @param member Resource to be added as member.
	 * @param requestOptions Customizable options for the request.
	 */
	$addMember( member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;
	/**
	 * Adds the provided resource as member of the document of the specified URI.
	 * @param uri URI of the document to add the member.
	 * @param member Resource to be added as member.
	 * @param requestOptions Customizable options for the request.
	 */
	$addMember( uri:string, member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;

	/**
	 * Adds the provided resources as members of the current document.
	 * @param members Resources to be added as members.
	 * @param requestOptions Customizable options for the request.
	 */
	$addMembers( members:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;
	/**
	 * Adds the provided resources as members of the document of the specified URI.
	 * @param uri URI of the document to add the members.
	 * @param members Resources to be added as members.
	 * @param requestOptions Customizable options for the request.
	 */
	$addMembers( uri:string, members:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;


	/**
	 * Removes the provided resource as member of the current document.
	 * @param member Resource to be removed as member.
	 * @param requestOptions Customizable options for the request.
	 */
	$removeMember( member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;
	/**
	 * Removes the provided resource as member of the document of the specified URI.
	 * @param uri URI of the document to remove the member.
	 * @param member Resource to be removed as member.
	 * @param requestOptions Customizable options for the request.
	 */
	$removeMember( uri:string, member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;

	/**
	 * Removes the provided resources as members of the current document.
	 * IF no {@param members} is provided all the members of the current document will be removed.
	 * @param members Resources to be removed as members.
	 * @param requestOptions Customizable options for the request.
	 */
	$removeMembers( members?:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;
	/**
	 * Removes all the members of the current document.
	 * @param requestOptions Customizable options for the request.
	 */
	$removeMembers( requestOptions?:RequestOptions ):Promise<void>;
	/**
	 * Removes the provided resources as members of the document of the specified URI.
	 * IF no {@param members} is provided all the members of the specified document will be removed.
	 * @param uri URI of the document to remove the members.
	 * @param members Resources to be removed as members.
	 * @param requestOptions Customizable options for the request.
	 */
	$removeMembers( uri:string, members?:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;
	/**
	 * Removes all the members of the document of the specified URI.
	 * @param uri URI of the document to remove its members.
	 * @param requestOptions Customizable options for the request.
	 */
	$removeMembers( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}


function __parseMemberParams( this:void, resource:Pointer, args:IArguments ):{ uri:string, params:any[] } {
	const params:any[] = Array.from( args );

	const uri:string = isString( params[ 0 ] ) && isString( Pointer.getID( params[ 1 ] ) ) ?
		URI.resolve( resource.$id, params.shift() ) : resource.$id;

	return { uri, params };
}

/**
 * Factory, decorator and utils for {@link LDPDocumentTrait}.
 */
export type LDPDocumentTraitFactory =
	& ModelPrototype<LDPDocumentTrait, TransientDocument & ResolvablePointer>
	& ModelDecorator<LDPDocumentTrait, BaseLDPDocumentTrait>
	;

/**
 * Constant that implements {@link LDPDocumentTraitFactory}.
 */
export const LDPDocumentTrait:LDPDocumentTraitFactory = {
	PROTOTYPE: {
		$create<T extends object>( this:LDPDocumentTrait, uriOrChildren:string | T | T[], childrenOrSlugsOrRequestOptions?:T | T[] | string | string[] | RequestOptions, slugsOrRequestOptions?:string | string[] | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document) | (T & Document)[]> {
			const { _uri, _args } = _parseURIParams( this, uriOrChildren, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.create( _uri, ..._args );
		},

		$createAndRetrieve<T extends object>( this:LDPDocumentTrait, uriOrChildren?:string | T | T[], childrenOrSlugsOrRequestOptions?:T | T[] | string | string[] | RequestOptions, slugsOrRequestOptions?:string | string[] | RequestOptions, requestOptions:RequestOptions = {} ):Promise<(T & Document) | (T & Document)[]> {
			const { _uri, _args } = _parseURIParams( this, uriOrChildren, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.createAndRetrieve( _uri, ..._args );
		},


		$addMember( this:LDPDocumentTrait, uriOrMember:string | (Pointer | string), memberOrOptions?:(Pointer | string) | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { uri, params } = __parseMemberParams( this, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.addMember( uri, ...params );
		},

		$addMembers( this:LDPDocumentTrait, uriOrMembers:string | (Pointer | string)[], membersOrOptions?:(Pointer | string)[] | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { _uri, _args } = _parseURIParams( this, uriOrMembers, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.addMembers( _uri, ..._args );
		},


		$removeMember( this:LDPDocumentTrait, uriOrMember:string | (Pointer | string), memberOrOptions?:(Pointer | string) | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { uri, params } = __parseMemberParams( this, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.removeMember( uri, ...params );
		},

		$removeMembers( this:LDPDocumentTrait, uriOrMembersOrOptions?:string | (Pointer | string)[] | RequestOptions, membersOrOptions?:(Pointer | string)[] | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { _uri, _args } = _parseURIParams( this, uriOrMembersOrOptions, arguments );
			return this.$repository.removeMembers( _uri, ..._args );
		},
	},

	isDecorated( object:object ):object is LDPDocumentTrait {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( LDPDocumentTrait.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseLDPDocumentTrait>( object:T ):T & LDPDocumentTrait {
		if( LDPDocumentTrait.isDecorated( object ) ) return object;

		const target:T & TransientDocument & ResolvablePointer = ModelDecorator
			.decorateMultiple( object, TransientDocument, ResolvablePointer );

		return ModelDecorator
			.definePropertiesFrom( LDPDocumentTrait.PROTOTYPE, target );
	},
};
