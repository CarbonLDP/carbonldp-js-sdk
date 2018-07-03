import { BlankNode } from "../BlankNode";
import { ModelDecorator } from "../core";
import { Fragment } from "../Fragment";
import { NamedFragment } from "../NamedFragment";
import { DocumentsRegistry } from "../Registry";
import { PersistedResource } from "../Resource";
import {
	isObject,
	PickSelfProps
} from "../Utils";
import { Document } from "./Document";
import { TransientDocument } from "./TransientDocument";


export interface BasePersistedDocument extends TransientDocument, PersistedResource {
	$registry:DocumentsRegistry | undefined;

	_resolved:boolean | undefined;
	_eTag:string | undefined | null;

	_savedFragments:(BlankNode | NamedFragment)[];


	isResolved():boolean;
	isOutdated():boolean;


	_syncSavedFragments():void;
}


const PROTOTYPE:PickSelfProps<BasePersistedDocument, TransientDocument & PersistedResource> = {
	_resolved: false,
	_eTag: void 0,

	get _savedFragments():Fragment[] { return []; },


	isResolved( this:BasePersistedDocument ):boolean {
		return ! ! this._resolved;
	},

	isOutdated( this:BasePersistedDocument ):boolean {
		return this._eTag === null;
	},


	_syncSavedFragments( this:Document ):void {
		this._savedFragments = Array
			.from( this.__resourcesMap.values() )
			.map( Fragment.decorate )
		;

		this._savedFragments
			.forEach( fragment => fragment._syncSnapshot() )
		;
	},
};

export interface BasePersistedDocumentFactory {
	PROTOTYPE:PickSelfProps<BasePersistedDocument, TransientDocument & PersistedResource>;


	isDecorated( object:object ):object is BasePersistedDocument;

	decorate<T extends object>( object:T ):T & BasePersistedDocument;


	is( value:any ):value is BasePersistedDocument;
}

export const BasePersistedDocument:BasePersistedDocumentFactory = {
	PROTOTYPE,

	isDecorated( object:object ):object is BasePersistedDocument {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object )
			;
	},

	decorate<T extends object>( object:T ):T & BasePersistedDocument {
		if( BasePersistedDocument.isDecorated( object ) ) return object;

		const resource:T & TransientDocument & PersistedResource = ModelDecorator
			.decorateMultiple( object, TransientDocument, PersistedResource );

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},


	is( value:any ):value is BasePersistedDocument {
		return TransientDocument.is( value )
			&& PersistedResource.isDecorated( value )
			&& BasePersistedDocument.isDecorated( value )
			;
	},
};
