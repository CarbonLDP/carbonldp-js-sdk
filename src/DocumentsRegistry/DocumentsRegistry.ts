import { DocumentsContext } from "../Context/DocumentsContext";

import { Document } from "../Document/Document";
import { BaseGeneralRegistry } from "../GeneralRegistry/BaseGeneralRegistry";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";

import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";


export interface BaseDocumentsRegistry {
	$context:DocumentsContext;
}

export interface DocumentsRegistry extends GeneralRegistry<Document> {
	readonly $context:DocumentsContext;

	register( id:string ):Document;
}


export type DocumentsRegistryFactory =
	& ModelPrototype<DocumentsRegistry, GeneralRegistry<Document> & BaseDocumentsRegistry>
	& ModelDecorator<DocumentsRegistry, BaseDocumentsRegistry>
	& ModelFactory<DocumentsRegistry, BaseDocumentsRegistry>
	;

export const DocumentsRegistry:DocumentsRegistryFactory = {
	PROTOTYPE: {
		register( this:DocumentsRegistry, id:string ):Document {
			return this.getPointer( id, true );
		},
	},


	isDecorated( object:object ):object is DocumentsRegistry {
		return ModelDecorator
			.hasPropertiesFrom( DocumentsRegistry.PROTOTYPE, object );
	},

	decorate<T extends BaseDocumentsRegistry>( object:T ):T & DocumentsRegistry {
		if( DocumentsRegistry.isDecorated( object ) ) return object;

		const base: T & BaseGeneralRegistry = Object.assign( object, {
			__modelDecorator: Document,
		} );

		const target:T & GeneralRegistry<Document> = ModelDecorator
			.decorateMultiple( base, GeneralRegistry );

		return ModelDecorator
			.definePropertiesFrom( DocumentsRegistry.PROTOTYPE, target );
	},


	create<T extends object>( data:T & BaseDocumentsRegistry ):T & DocumentsRegistry {
		// FIXME
		return DocumentsRegistry.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseDocumentsRegistry ):T & DocumentsRegistry {
		return DocumentsRegistry.decorate( object );
	},
};
