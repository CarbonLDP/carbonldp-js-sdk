import { CarbonLDP } from "../CarbonLDP";
import { ModelDecorator } from "../core";
import { DocumentsRegistry } from "../Registry";
import { PersistedResource } from "../Resource";
import { TransientDocument } from "./TransientDocument";
import {
	isObject,
	PickSelfProps
} from "../Utils";


export interface ResolvableDocument extends TransientDocument, PersistedResource {
	_context:CarbonLDP | undefined;
	_registry:DocumentsRegistry | undefined;

	_resolved:boolean | undefined;
	_eTag:string | undefined;

	isResolved():boolean;
	isOutdated():boolean;
}


const PROTOTYPE:PickSelfProps<ResolvableDocument, TransientDocument & PersistedResource> = {
	_resolved: false,
	_eTag: void 0,


	isResolved( this:ResolvableDocument ):boolean {
		return ! ! this._resolved;
	},

	isOutdated( this:ResolvableDocument ):boolean {
		return this._eTag === null;
	},
};

export interface ResolvableDocumentFactory {
	PROTOTYPE:PickSelfProps<ResolvableDocument, TransientDocument & PersistedResource>;


	isDecorated( object:object ):object is ResolvableDocument;

	decorate<T extends object>( object:T ):T & ResolvableDocument;


	is( value:any ):value is ResolvableDocument;
}

export const ResolvableDocument:ResolvableDocumentFactory = {
	PROTOTYPE,

	isDecorated( object:object ):object is ResolvableDocument {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object )
			;
	},

	decorate<T extends object>( object:T ):T & ResolvableDocument {
		if( ResolvableDocument.isDecorated( object ) ) return object;

		const resource:T & TransientDocument & PersistedResource = ModelDecorator
			.decorateMultiple( object, TransientDocument, PersistedResource );

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},


	is( value:any ):value is ResolvableDocument {
		return TransientDocument.is( value )
			&& PersistedResource.isDecorated( value )
			;
	},
};
