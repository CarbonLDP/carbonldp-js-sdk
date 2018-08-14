import { DocumentsContext } from "../Context/DocumentsContext";

import { Document } from "../Document/Document";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { BaseGeneralRegistry } from "../GeneralRegistry/BaseGeneralRegistry";
import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";

import { URI } from "../RDF/URI";

import { BaseDocumentsRegistry } from "./BaseDocumentsRegistry";


export interface DocumentsRegistry extends GeneralRegistry<Document> {
	readonly context:DocumentsContext;

	register( id:string ):Document;
}


export type DocumentsRegistryFactory =
	& ModelPrototype<DocumentsRegistry, GeneralRegistry<Document>, "_getLocalID">
	& ModelDecorator<DocumentsRegistry, BaseDocumentsRegistry>
	& ModelFactory<DocumentsRegistry, BaseDocumentsRegistry>
	;

export const DocumentsRegistry:DocumentsRegistryFactory = {
	PROTOTYPE: {
		register( this:DocumentsRegistry, id:string ):Document {
			return this.getPointer( id, true );
		},

		_getLocalID( this:DocumentsRegistry, id:string ):string {
			if( URI.hasFragment( id ) ) throw new IllegalArgumentError( `"${ id }" is out of scope.` );
			return GeneralRegistry.PROTOTYPE._getLocalID.call( this, id );
		},
	},


	isDecorated( object:object ):object is DocumentsRegistry {
		return ModelDecorator
			.hasPropertiesFrom( DocumentsRegistry.PROTOTYPE, object );
	},

	decorate<T extends BaseDocumentsRegistry>( object:T ):T & DocumentsRegistry {
		if( DocumentsRegistry.isDecorated( object ) ) return object;

		const base:T & BaseGeneralRegistry = Object.assign<T, Pick<BaseGeneralRegistry, "__modelDecorator">>( object, {
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
		const registry:T & DocumentsRegistry = DocumentsRegistry.decorate( object );
		return GeneralRegistry.createFrom( registry );
	},
};
