import { DocumentsContext } from "../Context/DocumentsContext";

import { Document, BaseResolvableDocument } from "../Document/Document";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { BaseGeneralRegistry } from "../GeneralRegistry/BaseGeneralRegistry";
import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";

import { URI } from "../RDF/URI";

import { BaseDocumentsRegistry } from "./BaseDocumentsRegistry";


/**
 * Registry that manages {@link Document}'s.
 */
export interface DocumentsRegistry extends GeneralRegistry<Document> {
	/**
	 * Context where the registry belongs to.
	 */
	readonly context:DocumentsContext;

	/**
	 * Register a document endpoint that already exists in the platform.
	 * @param id The URI of the document to be registered.
	 * @returns The shallow document of the endpoint, since this does not makes any request.
	 */
	register( id:string ):Document;
}


/**
 * Factory, decorator and utils for {@link DocumentsRegistry}.
 */
export type DocumentsRegistryFactory =
	& ModelPrototype<DocumentsRegistry, GeneralRegistry<Document>, "_getLocalID">
	& ModelDecorator<DocumentsRegistry, BaseDocumentsRegistry>
	& ModelFactory<DocumentsRegistry, BaseDocumentsRegistry>
	;

/**
 * Constant with the factory, decorator and/or utils for a {@link DocumentsRegistry} object.
 */
export const DocumentsRegistry:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link DocumentsRegistry}
	 */
	PROTOTYPE: DocumentsRegistryFactory["PROTOTYPE"];

	/**
	 * Checks if the DocumentsRegistry has the decorated properties and methods from its prototype.
	 */
	isDecorated( object:object ):object is DocumentsRegistry;

	/**
	 * Defines the DocumentsRegistry's prototype properties and methods to the DocumentsRegistry object.
	 */
	decorate<T extends object>( object:T &  BaseDocumentsRegistry ):T & DocumentsRegistry;

	/**
	 * Creates a {@link DocumentsRegistry} with the provided data.
	 */
	create<T extends object>( data:T & BaseDocumentsRegistry ):T & DocumentsRegistry;

	/**
	 * Creates a {@link DocumentsRegistry} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseDocumentsRegistry ):T & DocumentsRegistry
} = {
	PROTOTYPE: {
		register( this:DocumentsRegistry, id:string ):Document {
			return this.getPointer( id, true );
		},

		_getLocalID( this:DocumentsRegistry, id:string ):string {
			if( URI.hasFragment( id ) ) throw new IllegalArgumentError( `"${id}" is out of scope.` );
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
