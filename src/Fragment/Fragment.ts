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
	 * Accessor to the {@link Document#$get `Document.$get()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$get `Document.$get()`}
	 */
	// TODO: Fix link syntax
	$get<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Accessor to the {@link Document#$get `Document.$get()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$get `Document.$get()`}
	 */
	// TODO: Fix link syntax
	$get<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Accessor to the {@link Document#$get `Document.$get()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$get `Document.$get()`}
	 */
	// TODO: Fix link syntax
	$get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Accessor to the {@link Document#$get `Document.$get()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$get `Document.$get()`}
	 */
	// TODO: Fix link syntax
	$get<T extends object>( uri:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	/**
	 * Accessor to the {@link Document#$resolve `Document.$resolve()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$resolve `Document.$resolve()`}
	 */
	// TODO: Fix link syntax
	$resolve<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	/**
	 * Accessor to the {@link Document#$resolve `Document.$resolve()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$resolve `Document.$resolve()`}
	 */
	// TODO: Fix link syntax
	$resolve<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	/**
	 * Accessor to the {@link Document#$resolve `Document.$resolve()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$resolve `Document.$resolve()`}
	 */
	// TODO: Fix link syntax
	$resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	/**
	 * Accessor to the {@link Document#$resolve `Document.$resolve()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$resolve `Document.$resolve()`}
	 */
	// TODO: Fix link syntax
	$resolve<T extends object>( document:Document, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;


	/**
	 * Accessor to the {@link Document#$exists `Document.$exists()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$exists `Document.$exists()`}
	 */
	// TODO: Fix link syntax
	$exists( requestOptions?:RequestOptions ):Promise<boolean>;
	/**
	 * Accessor to the {@link Document#$exists `Document.$exists()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$exists `Document.$exists()`}
	 */
	// TODO: Fix link syntax
	$exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;


	/**
	 * Accessor to the {@link Document#$refresh `Document.$refresh()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$refresh `Document.$refresh()`}
	 */
	// TODO: Fix link syntax
	$refresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;
	/**
	 * Accessor to the {@link Document#$refresh `Document.$refresh()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$refresh `Document.$refresh()`}
	 */
	// TODO: Fix link syntax
	$refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	/**
	 * Accessor to the {@link Document#$save `Document.$save()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$save `Document.$save()`}
	 */
	// TODO: Fix link syntax
	$save<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;
	/**
	 * Accessor to the {@link Document#$save `Document.$save()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$save `Document.$save()`}
	 */
	// TODO: Fix link syntax
	$save<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	/**
	 * Accessor to the {@link Document#$saveAndRefresh `Document.$saveAndRefresh()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$saveAndRefresh `Document.$saveAndRefresh()`}
	 */
	// TODO: Fix link syntax
	$saveAndRefresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;
	/**
	 * Accessor to the {@link Document#$saveAndRefresh `Document.$saveAndRefresh()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$saveAndRefresh `Document.$saveAndRefresh()`}
	 */
	// TODO: Fix link syntax
	$saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	/**
	 * Accessor to the {@link Document#$delete `Document.$delete()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$delete `Document.$delete()`}
	 */
	// TODO: Fix link syntax
	$delete( requestOptions?:RequestOptions ):Promise<void>;
	/**
	 * Accessor to the {@link Document#$delete `Document.$delete()`} method of the document where the fragment belongs to.
	 * @see {@link Document#$delete `Document.$delete()`}
	 */
	// TODO: Fix link syntax
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
 * Constant with the factory, decorator and/or utils for a {@link Fragment} object.
 */
export const Fragment:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link Fragment}.
	 */
	PROTOTYPE:FragmentFactory["PROTOTYPE"];

	/**
	 * Returns true if the object is decorated with the specific properties and methods of a {@link Fragment}.
	 */
	isDecorated( object:object ):object is Fragment;

	/**
	 * Decorates the object with the properties and methods from the {@link Fragment} prototype.
	 */
	decorate<T extends object>( object:T & BaseResolvableFragment ):T & Fragment;

	/**
	 * Creates a {@link Fragment} with the provided data.
	 */
	create<T extends object>( data:T & BaseTransientFragment ):T & TransientFragment;

	/**
	 * Creates a {@link Fragment} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseTransientFragment ):T & BaseTransientFragment;
} = <FragmentFactory> {
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
