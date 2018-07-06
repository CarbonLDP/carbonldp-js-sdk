import { Context } from "../Context";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype
} from "../Model";
import { Document } from "../Document";
import { BaseRegistry } from "./BaseRegistry";
import { GeneralRegistry } from "./GeneralRegistry";


// FIXME: DocumentsContext
export interface BaseDocumentsRegistry {
	$context:Context<Document>;
	// $context:DocumentsContext;
}

export interface DocumentsRegistry extends GeneralRegistry<Document> {
	// readonly $context:DocumentsContext;
	$context:Context<Document>;

	register( id:string ):Document;
}


export type DocumentsRegistryFactory =
	& ModelPrototype<DocumentsRegistry, GeneralRegistry<Document>>
	& ModelDecorator<DocumentsRegistry, BaseDocumentsRegistry>
	& ModelFactory<DocumentsRegistry, BaseDocumentsRegistry>
	;

export const DocumentsRegistry:DocumentsRegistryFactory = {
	PROTOTYPE: {
		register( this:DocumentsRegistry, id:string ):Document {
			return this._addPointer( { $id: id } );
		},
	},


	isDecorated( object:object ):object is DocumentsRegistry {
		return ModelDecorator
			.hasPropertiesFrom( DocumentsRegistry.PROTOTYPE, object );
	},

	decorate<T extends BaseDocumentsRegistry>( object:T ):T & DocumentsRegistry {
		if( DocumentsRegistry.isDecorated( object ) ) return object;

		const resource:T & GeneralRegistry<Document> = ModelDecorator
			.decorateMultiple( object, GeneralRegistry );

		return ModelDecorator
			.definePropertiesFrom( DocumentsRegistry.PROTOTYPE, resource );
	},


	create<T extends object>( data:T & BaseDocumentsRegistry ):T & DocumentsRegistry {
		// FIXME: TS 3.0
		return DocumentsRegistry.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseDocumentsRegistry ):T & DocumentsRegistry {
		const baseObject:T & BaseRegistry<Document> = Object.assign( object, {
			__modelDecorator: Document,
		} );

		const registry:T & GeneralRegistry<Document> = GeneralRegistry
			.createFrom( baseObject );

		return DocumentsRegistry.decorate( registry );
	},
};
