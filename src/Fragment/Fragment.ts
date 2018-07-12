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


export interface Fragment extends TransientFragment, QueryablePointer {
	$document:Document;
	$registry:Document;
	$repository:Document;


	get<T extends object>( queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	get<T extends object>( uri:string, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;

	resolve<T extends object>( requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	resolve<T extends object>( queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & this & Document>;
	resolve<T extends object>( document:Document, queryBuilderFn:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;
	resolve<T extends object>( document:Document, requestOptions?:GETOptions, queryBuilderFn?:( queryBuilder:QueryDocumentBuilder ) => QueryDocumentBuilder ):Promise<T & Document>;


	exists( requestOptions?:RequestOptions ):Promise<boolean>;
	exists( uri:string, requestOptions?:RequestOptions ):Promise<boolean>;


	refresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;
	refresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	save<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;
	save<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;

	saveAndRefresh<T extends object>( requestOptions?:RequestOptions ):Promise<T & this & Document>;
	saveAndRefresh<T extends object>( document:Document, requestOptions?:RequestOptions ):Promise<T & Document>;


	delete( requestOptions?:RequestOptions ):Promise<void>;
	delete( uri:string, requestOptions?:RequestOptions ):Promise<void>;
}


export type OverrodeMembers =
	| "$repository"
	| "_resolved"
	;

export type FragmentFactory =
	& ModelPrototype<Fragment, TransientFragment & QueryablePointer, OverrodeMembers>
	& ModelDecorator<Fragment, BaseResolvableFragment>
	& ModelFactory<TransientFragment, BaseTransientFragment>
	;

export const Fragment:FragmentFactory = {
	PROTOTYPE: {
		get $repository( this:Fragment ):Document {
			return this.$registry;
		},
		set $repository( this:Fragment, document:Document ) {
			this.$registry = document;
		},

		get _resolved( this:Fragment ):boolean {
			return this.$document._resolved;
		},
		set _resolved( this:Fragment, _value:boolean ) {},
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
