import {
	Document,
	TransientDocument
} from "../Document";
import {
	GETOptions,
	RequestOptions,
} from "../HTTP";
import {
	ModelDecorator,
	ModelPrototype
} from "../Model";
import { Pointer } from "../Pointer";
import { URI } from "../RDF";
import { ResolvablePointer } from "../Repository";
import {
	isObject,
	isString,
} from "../Utils";
import { LDPDocumentsRepositoryTrait } from "./LDPDocumentsRepositoryTrait";


export interface BaseLDPDocumentTrait {
	$repository:LDPDocumentsRepositoryTrait;
}

export interface LDPDocumentTrait extends TransientDocument, ResolvablePointer {
	$repository:LDPDocumentsRepositoryTrait;


	get<T extends object>( requestOptions?:GETOptions ):Promise<T & Document>;
	get<T extends object>( uri:string, requestOptions?:GETOptions ):Promise<T & Document>;

	resolve<T extends object>( requestOptions?:GETOptions ):Promise<T & Document>;


	exists( requestOptions?:RequestOptions ):Promise<boolean>;
	exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;


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


	refresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;

	save<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;

	saveAndRefresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;


	delete( requestOptions?:RequestOptions ):Promise<void>;
	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;


	addMember( member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;
	addMember( uri:string, member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;

	addMembers( members:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;
	addMembers( uri:string, members:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;


	removeMember( member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;
	removeMember( uri:string, member:string | Pointer, requestOptions?:RequestOptions ):Promise<void>;

	removeMembers( members?:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;
	removeMembers( uri:string, members?:(string | Pointer)[], requestOptions?:RequestOptions ):Promise<void>;
}


function __parseURIParams( resource:LDPDocumentTrait, uriOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):{ uri:string, options?:RequestOptions } {
	const uri:string = isString( uriOrOptions ) ?
		URI.resolve( resource.$id, uriOrOptions ) : resource.$id;

	const options:RequestOptions | undefined = isObject( uriOrOptions ) ?
		uriOrOptions : requestOptions;

	return { uri, options };
}

function __parseChildParams<T extends object>( resource:LDPDocumentTrait, uriOrChildren?:string | T | T[], childrenOrSlugsOrOptions?:T | T[] | string | string[] | RequestOptions, slugsOrOptions?:string | string[] | RequestOptions ):{ uri:string, children:T | T[], slugsOrOptions:string | string[] | RequestOptions } {
	const uri:string = isString( uriOrChildren ) ?
		URI.resolve( this.$id, uriOrChildren ) : this.$id;

	const children:T | T[] = ! isString( uriOrChildren ) ?
		uriOrChildren : childrenOrSlugsOrOptions as T | T[];

	if( children === uriOrChildren )
		slugsOrOptions = childrenOrSlugsOrOptions as string | string[] | RequestOptions;

	return { uri, children, slugsOrOptions };
}

function __parseMembersParams<T extends (Pointer | string) | (Pointer | string)[]>( resource:LDPDocumentTrait, uriOrMember?:string | T, membersOrOptions?:T | RequestOptions, requestOptions?:RequestOptions ):{ uri:string, members?:T, options?:RequestOptions } {
	const options:RequestOptions = isObject( membersOrOptions ) && ! Pointer.is( membersOrOptions ) ?
		membersOrOptions :
		requestOptions;

	const members:T = membersOrOptions !== requestOptions ?
		membersOrOptions as T :
		uriOrMember as T;

	const uri:string | undefined = members !== uriOrMember ?
		URI.resolve( resource.$id, uriOrMember as string ) :
		resource.$id;

	return { uri, members, options };
}

export type LDPDocumentTraitFactory =
	& ModelPrototype<LDPDocumentTrait, TransientDocument & ResolvablePointer>
	& ModelDecorator<LDPDocumentTrait, BaseLDPDocumentTrait>
	;

export const LDPDocumentTrait:LDPDocumentTraitFactory = {
	PROTOTYPE: {
		get<T extends object>( this:LDPDocumentTrait, uriOrOptions:string | GETOptions, requestOptions?:RequestOptions ):Promise<T & Document> {
			const { uri, options } = __parseURIParams( this, uriOrOptions, requestOptions );
			return this.$repository.get<T>( uri, options );
		},

		resolve<T extends object>( this:Document, requestOptions:GETOptions = {} ):Promise<T & Document> {
			return this.$repository.resolve( this, requestOptions );
		},


		exists( this:LDPDocumentTrait, uriOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):Promise<boolean> {
			const { uri, options } = __parseURIParams( this, uriOrOptions, requestOptions );
			return this.$repository.exists( uri, options );
		},


		create<T extends object>( this:LDPDocumentTrait, uriOrChildren?:string | T | T[], childrenOrSlugsOrRequestOptions?:T | T[] | string | string[] | RequestOptions, slugsOrRequestOptions?:string | string[] | RequestOptions, requestOptions?:RequestOptions ):Promise<(T & Document) | (T & Document)[]> {
			const { uri, children, slugsOrOptions } = __parseChildParams( this, uriOrChildren, childrenOrSlugsOrRequestOptions, slugsOrRequestOptions );
			return this.$repository.create( uri, children as T, slugsOrOptions as string, requestOptions );
		},

		createAndRetrieve<T extends object>( this:LDPDocumentTrait, uriOrChildren?:string | T | T[], childrenOrSlugsOrRequestOptions?:T | T[] | string | string[] | RequestOptions, slugsOrRequestOptions?:string | string[] | RequestOptions, requestOptions:RequestOptions = {} ):Promise<(T & Document) | (T & Document)[]> {
			const { uri, children, slugsOrOptions } = __parseChildParams( this, uriOrChildren, childrenOrSlugsOrRequestOptions, slugsOrRequestOptions );
			return this.$repository.createAndRetrieve( uri, children as T, slugsOrOptions as string, requestOptions );
		},


		refresh<T extends object>( this:Document, requestOptions?:RequestOptions ):Promise<T & Document> {
			return this.$repository.refresh<T>( this, requestOptions );
		},

		save<T extends object>( this:T & Document, requestOptions?:RequestOptions ):Promise<T & Document> {
			return this.$repository.save<T>( this, requestOptions );
		},

		saveAndRefresh<T extends object>( this:T & Document, requestOptions?:RequestOptions ):Promise<T & Document> {
			return this.$repository.saveAndRefresh<T>( this, requestOptions );
		},


		delete( this:LDPDocumentTrait, uriOrOptions:string | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { uri, options } = __parseURIParams( this, uriOrOptions, requestOptions );
			return this.$repository.delete( uri, options );
		},


		addMember( this:LDPDocumentTrait, uriOrMember:string | (Pointer | string), memberOrOptions?:(Pointer | string) | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { uri, members, options } = __parseMembersParams( this, uriOrMember, memberOrOptions, requestOptions );
			return this.$repository.addMember( uri, members, options );
		},

		addMembers( this:LDPDocumentTrait, uriOrMembers:string | (Pointer | string)[], membersOrOptions:(Pointer | string)[] | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { uri, members, options } = __parseMembersParams( this, uriOrMembers, membersOrOptions, requestOptions );
			return this.$repository.addMembers( uri, members, options );
		},


		removeMember( this:LDPDocumentTrait, uriOrMember:string | (Pointer | string), memberOrOptions:(Pointer | string) | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { uri, members, options } = __parseMembersParams( this, uriOrMember, memberOrOptions, requestOptions );
			return this.$repository.removeMember( uri, members, options );
		},

		removeMembers( this:LDPDocumentTrait, uriOrMembers?:string | (Pointer | string)[], membersOrOptions?:(Pointer | string)[] | RequestOptions, requestOptions?:RequestOptions ):Promise<void> {
			const { uri, members, options } = __parseMembersParams( this, uriOrMembers, membersOrOptions, requestOptions );
			return this.$repository.removeMembers( uri, members, options );
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
