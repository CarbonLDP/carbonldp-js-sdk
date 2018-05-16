import { CarbonLDP } from "../CarbonLDP";
import { ModelDecorator } from "../core";
import { DocumentsRegistry } from "../Registry";
import { PersistedResource } from "../Resource";
import { TransientDocument } from "./TransientDocument";
import {
	isObject,
	PickSelfProps
} from "../Utils";


export interface PersistedDocument extends TransientDocument, PersistedResource {
	_context:CarbonLDP | undefined;
	_registry:DocumentsRegistry | undefined;

	_resolved:boolean | undefined;
	_eTag:string | undefined | null;

	isResolved():boolean;
	isOutdated():boolean;
}


const PROTOTYPE:PickSelfProps<PersistedDocument, TransientDocument & PersistedResource> = {
	_resolved: false,
	_eTag: void 0,


	isResolved( this:PersistedDocument ):boolean {
		return ! ! this._resolved;
	},

	isOutdated( this:PersistedDocument ):boolean {
		return this._eTag === null;
	},
};

export interface PersistedDocumentFactory {
	PROTOTYPE:PickSelfProps<PersistedDocument, TransientDocument & PersistedResource>;


	isDecorated( object:object ):object is PersistedDocument;

	decorate<T extends object>( object:T ):T & PersistedDocument;


	is( value:any ):value is PersistedDocument;
}

export const PersistedDocument:PersistedDocumentFactory = {
	PROTOTYPE,

	isDecorated( object:object ):object is PersistedDocument {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( PROTOTYPE, object )
			;
	},

	decorate<T extends object>( object:T ):T & PersistedDocument {
		if( PersistedDocument.isDecorated( object ) ) return object;

		const resource:T & TransientDocument & PersistedResource = ModelDecorator
			.decorateMultiple( object, TransientDocument, PersistedResource );

		return ModelDecorator
			.definePropertiesFrom( PROTOTYPE, resource );
	},


	is( value:any ):value is PersistedDocument {
		return TransientDocument.is( value )
			&& PersistedResource.isDecorated( value )
			&& PersistedDocument.isDecorated( value )
			;
	},
};
