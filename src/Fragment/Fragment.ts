import { Document } from "../Document";
import {
	GETOptions,
	RequestOptions
} from "../HTTP";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype
} from "../Model";
import { QueryDocumentBuilder } from "../QueryDocument";
import { ResolvablePointer } from "../Repository";
import { PersistedResource } from "../Resource";
import { BaseFragment } from "./BaseFragment";
import { TransientFragment } from "./TransientFragment";


export interface BaseResolvableFragment {
	$registry:Document;
}

export interface Fragment extends TransientFragment, ResolvablePointer {
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


type ForcedOverloadedMembers = {
	$document:Document;
};

export type OverloadedMembers =
	| "$repository"
	| "_resolved"
	;

export type FragmentFactory =
	& ModelPrototype<Fragment, TransientFragment & ResolvablePointer, OverloadedMembers>
	& ModelDecorator<Fragment, BaseResolvableFragment>
	& ModelFactory<TransientFragment, BaseFragment>
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
		return TransientFragment.isDecorated( object )
			&& PersistedResource.isDecorated( object )
			;
	},

	decorate<T extends BaseResolvableFragment>( object:T ):T & Fragment {
		if( Fragment.isDecorated( object ) ) return object;

		type ForcedT = T & ForcedOverloadedMembers;
		const forced:ForcedT = object as ForcedT;

		const target:ForcedT & TransientFragment & ResolvablePointer = ModelDecorator
			.decorateMultiple( forced, TransientFragment, ResolvablePointer );

		return ModelDecorator
			.definePropertiesFrom( Fragment.PROTOTYPE, target );
	},

	create: TransientFragment.create,
	createFrom: TransientFragment.createFrom,
};
