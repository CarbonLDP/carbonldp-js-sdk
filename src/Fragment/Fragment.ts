import { Document } from "../Document/Document";

import { GETOptions, RequestOptions } from "../HTTP/Request";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";

import { QueryablePointer } from "../QueryDocuments/QueryablePointer";
import { QueryDocumentBuilder } from "../QueryDocuments/QueryDocumentBuilder";

import { BaseResolvablePointer } from "../Repository/BaseResolvablePointer";

import { BaseResolvableFragment } from "./BaseResolvableFragment";
import { BaseTransientFragment } from "./BaseTransientFragment";
import { TransientFragment } from "./TransientFragment";


/**
 * Model that represents a fragment of a persisted `c:Document`.
 */
export interface Fragment extends TransientFragment, QueryablePointer {
	/**
	 * The document the fragment belongs to.
	 */
	$document:Document;
	/**
	 * Registry where the fragment belongs to.
	 */
	$registry:Document;
	/**
	 * Repository where the fragment can make requests.
	 */
	$repository:Document;


	/**
	 * Accessor to the {@link Document.$get} method of the document where the fragment belongs to.
	 * @see {@link Document.$get}
	 */
	$get<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Accessor to the {@link Document.$get} method of the document where the fragment belongs to.
	 * @see {@link Document.$get}
	 */
	$get<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Accessor to the {@link Document.$get} method of the document where the fragment belongs to.
	 * @see {@link Document.$get}
	 */
	$get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Accessor to the {@link Document.$get} method of the document where the fragment belongs to.
	 * @see {@link Document.$get}
	 */
	$get<T extends object>( uri:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	/**
	 * Accessor to the {@link Document.$resolve} method of the document where the fragment belongs to.
	 * @see {@link Document.$resolve}
	 */
	$resolve<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	/**
	 * Accessor to the {@link Document.$resolve} method of the document where the fragment belongs to.
	 * @see {@link Document.$resolve}
	 */
	$resolve<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	/**
	 * Accessor to the {@link Document.$resolve} method of the document where the fragment belongs to.
	 * @see {@link Document.$resolve}
	 */
	$resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Accessor to the {@link Document.$resolve} method of the document where the fragment belongs to.
	 * @see {@link Document.$resolve}
	 */
	$resolve<T extends object>( document:Document, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;


	/**
	 * Accessor to the {@link Document.$exists} method of the document where the fragment belongs to.
	 * @see {@link Document.$exists}
	 */
	$exists( requestOptions?:RequestOptions ):Promise<boolean>;
	/**
	 * Accessor to the {@link Document.$exists} method of the document where the fragment belongs to.
	 * @see {@link Document.$exists}
	 */
	$exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;


	/**
	 * Accessor to the {@link Document.$refresh} method of the document where the fragment belongs to.
	 * @see {@link Document.$refresh}
	 */
	$refresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;
	/**
	 * Accessor to the {@link Document.$refresh} method of the document where the fragment belongs to.
	 * @see {@link Document.$refresh}
	 */
	$refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	/**
	 * Accessor to the {@link Document.$save} method of the document where the fragment belongs to.
	 * @see {@link Document.$save}
	 */
	$save<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;
	/**
	 * Accessor to the {@link Document.$save} method of the document where the fragment belongs to.
	 * @see {@link Document.$save}
	 */
	$save<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	/**
	 * Accessor to the {@link Document.$saveAndRefresh} method of the document where the fragment belongs to.
	 * @see {@link Document.$saveAndRefresh}
	 */
	$saveAndRefresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;
	/**
	 * Accessor to the {@link Document.$saveAndRefresh} method of the document where the fragment belongs to.
	 * @see {@link Document.$saveAndRefresh}
	 */
	$saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	/**
	 * Accessor to the {@link Document.$delete} method of the document where the fragment belongs to.
	 * @see {@link Document.$delete}
	 */
	$delete( requestOptions?:RequestOptions ):Promise<void>;
	/**
	 * Accessor to the {@link Document.$delete} method of the document where the fragment belongs to.
	 * @see {@link Document.$delete}
	 */
	$delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}


export type OverriddenMembers =
	| "$repository"
	| "$_resolved"
	;

/**
 * Factory, decorator and utils for {@link Fragment}.
 */
export type FragmentFactory =
	& ModelPrototype<Fragment, TransientFragment & QueryablePointer, OverriddenMembers>
	& ModelDecorator<Fragment, BaseResolvableFragment>
	& ModelFactory<TransientFragment, BaseTransientFragment>
	;

/**
 * Constant that implements {@link FragmentFactory}.
 */
export const Fragment:FragmentFactory = {
	PROTOTYPE: {
		get $repository( this:Fragment ):Document {
			return this.$registry;
		},
		set $repository( this:Fragment, document:Document ) {
			this.$registry = document;
		},

		get $_resolved( this:Fragment ):boolean {
			return this.$document.$_resolved;
		},
		set $_resolved( this:Fragment, _value:boolean ) {},
	},


	isDecorated( object:object ):object is Fragment {
		return ModelDecorator
			.hasPropertiesFrom( Fragment.PROTOTYPE, object )
			;
	},

	decorate<T extends BaseResolvableFragment>( object:T ):T & Fragment {
		if( Fragment.isDecorated( object ) ) return object;

		type ForcedT = T & { $document:Document } & BaseResolvablePointer;
		const forced:ForcedT = Object.assign( object, {
			$document: object.$registry,
			$repository: object.$registry,
		} );

		const target:ForcedT & TransientFragment & QueryablePointer = ModelDecorator
			.decorateMultiple( forced, TransientFragment, QueryablePointer );

		return ModelDecorator
			.definePropertiesFrom( Fragment.PROTOTYPE, target );
	},

	create: TransientFragment.create,
	createFrom: TransientFragment.createFrom,
};
