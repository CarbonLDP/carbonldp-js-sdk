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


export interface BaseLDPDocumentTrait {
	$repository:LDPDocumentsRepositoryTrait;
}

export interface LDPDocumentTrait extends TransientDocument, ResolvablePointer {
	$repository:LDPDocumentsRepositoryTrait;

	create<T extends object>( children:T[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	create<T extends object>( children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	create<T extends object>( child:T, requestOptions?:RequestOptions ):Promise<T & Document>;
	create<T extends object>( child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & Document>;
	create<T extends object>( uri:string, children:T[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	create<T extends object>( uri:string, children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	create<T extends object>( uri:string, child:T, requestOptions?:RequestOptions ):Promise<T & Document>;
	create<T extends object>( uri:string, child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & Document>;

	createAndRetrieve<T extends object>( children:T[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	createAndRetrieve<T extends object>( children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	createAndRetrieve<T extends object>( child:T, requestOptions?:RequestOptions ):Promise<T & Document>;
	createAndRetrieve<T extends object>( child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & Document>;
	createAndRetrieve<T extends object>( uri:string, children:T[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	createAndRetrieve<T extends object>( uri:string, children:T[], slugs?:string[], requestOptions?:RequestOptions ):Promise<(T & Document)[]>;
	createAndRetrieve<T extends object>( uri:string, child:T, requestOptions?:RequestOptions ):Promise<T & Document>;
	createAndRetrieve<T extends object>( uri:string, child:T, slug?:string, requestOptions?:RequestOptions ):Promise<T & Document>;


	addMember( member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;
	addMember( uri:string, member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;

	addMembers( members:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;
	addMembers( uri:string, members:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;


	removeMember( member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;
	removeMember( uri:string, member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;

	removeMembers( members?:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;
	removeMembers( requestOptions?:RequestOptions ):Promise<void>;
	removeMembers( uri:string, members?:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;
	removeMembers( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}


function __parseMemberParams( this:void, resource:Pointer, args:IArguments ):{ uri:string, params:any[] } {
	const params:any[] = Array.from( args );

	const uri:string = isString( params[ 0 ] ) && isString( Pointer.getID( params[ 1 ] ) ) ?
		URI.resolve( resource.$id, params.shift() ) : resource.$id;

	return { uri, params };
}

export type LDPDocumentTraitFactory =
	& ModelPrototype<LDPDocumentTrait, TransientDocument & ResolvablePointer>
	& ModelDecorator<LDPDocumentTrait, BaseLDPDocumentTrait>
	;

export const LDPDocumentTrait:LDPDocumentTraitFactory = {
	PROTOTYPE: {
		create<T extends object>( this:LDPDocumentTrait, uriOrChildren:string | T | T[], childrenOrSlugsOrRequestOptions?:T | T[] | string | string[] | RequestOptions, slugsOrRequestOptions?:string | string[] | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document) | (T & Document)[]> {
			const { _uri, _args } = _parseURIParams( this, uriOrChildren, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.create( _uri, ..._args );
		},

		createAndRetrieve<T extends object>( this:LDPDocumentTrait, uriOrChildren?:string | T | T[], childrenOrSlugsOrRequestOptions?:T | T[] | string | string[] | RequestOptions, slugsOrRequestOptions?:string | string[] | RequestOptions, requestOptions:RequestOptions = {} ):Promise<(T & Document) | (T & Document)[]> {
			const { _uri, _args } = _parseURIParams( this, uriOrChildren, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.createAndRetrieve( _uri, ..._args );
		},


		addMember( this:LDPDocumentTrait, uriOrMember:string | (Pointer | string), memberOrOptions?:(Pointer | string) | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { uri, params } = __parseMemberParams( this, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.addMember( uri, ...params );
		},

		addMembers( this:LDPDocumentTrait, uriOrMembers:string | (Pointer | string)[], membersOrOptions:(Pointer | string)[] | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { _uri, _args } = _parseURIParams( this, uriOrMembers, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.addMembers( _uri, ..._args );
		},


		removeMember( this:LDPDocumentTrait, uriOrMember:string | (Pointer | string), memberOrOptions:(Pointer | string) | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { uri, params } = __parseMemberParams( this, arguments );
			// FIXME
			// @ts-ignore
			return this.$repository.removeMember( uri, ...params );
		},

		removeMembers( this:LDPDocumentTrait, uriOrMembersOrOptions?:string | (Pointer | string)[] | RequestOptions, membersOrOptions?:(Pointer | string)[] | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
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
