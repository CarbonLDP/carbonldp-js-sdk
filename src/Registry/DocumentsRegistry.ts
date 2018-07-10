import { DocumentsContext } from "../Context";
import { Document } from "../Document";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype
} from "../Model";
import { GeneralRegistry } from "./GeneralRegistry";


export interface BaseDocumentsRegistry {
	$context:DocumentsContext;
}

export interface DocumentsRegistry extends GeneralRegistry<Document> {
	readonly $context:DocumentsContext;

	register( id:string ):Document;
}


export type OverrodeMembers =
	| "__modelDecorator"
;

export type DocumentsRegistryFactory =
	& ModelPrototype<DocumentsRegistry, GeneralRegistry<Document> & BaseDocumentsRegistry, OverrodeMembers>
	& ModelDecorator<DocumentsRegistry, BaseDocumentsRegistry>
	& ModelFactory<DocumentsRegistry, BaseDocumentsRegistry>
	;

export const DocumentsRegistry:DocumentsRegistryFactory = {
	PROTOTYPE: {
		__modelDecorator:Document,

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

		const resource:T & GeneralRegistry<Document> = ModelDecorator
			.decorateMultiple( object, GeneralRegistry );

		return ModelDecorator
			.definePropertiesFrom( DocumentsRegistry.PROTOTYPE, resource );
	},


	create<T extends object>( data:T & BaseDocumentsRegistry ):T & DocumentsRegistry {
		// FIXME
		return DocumentsRegistry.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseDocumentsRegistry ):T & DocumentsRegistry {
		return DocumentsRegistry.decorate( object );
	},
};
