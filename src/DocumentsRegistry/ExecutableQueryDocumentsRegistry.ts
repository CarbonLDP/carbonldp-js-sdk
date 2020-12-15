import { DocumentsContext } from "../Context/DocumentsContext";
import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { ExecutableQueryDocument } from "../ExecutableQueryDocument/ExecutableQueryDocument";
import { BaseGeneralRegistry } from "../GeneralRegistry/BaseGeneralRegistry";
import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";
import { Document } from "../Document/Document";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { URI } from "../RDF/URI";
import { BaseDocumentsRegistry } from "./BaseDocumentsRegistry";
import { DocumentsRegistry } from "./DocumentsRegistry";


// @ts-ignore
export interface ExecutableQueryDocumentsRegistry extends GeneralRegistry<ExecutableQueryDocument> {
	/**
	 * Context where the registry belongs to.
	 */
	readonly context:DocumentsContext;

	/**
	 * Register a document endpoint that already exists in the platform.
	 * @param id The URI of the document to be registered.
	 * @returns The shallow document of the endpoint, since this does not makes any request.
	 */
	register( id:string ):ExecutableQueryDocument;
}

/**
 * Factory, decorator and utils for {@link DocumentsRegistry}.
 */
export type ExecutableQueryDocumentsRegistryFactory =
	& ModelPrototype<ExecutableQueryDocumentsRegistry, GeneralRegistry<ExecutableQueryDocument>, "_getLocalID">
	& ModelDecorator<ExecutableQueryDocumentsRegistry, BaseDocumentsRegistry>
	& ModelFactory<ExecutableQueryDocumentsRegistry, BaseDocumentsRegistry>
	;

/**
 * Constant with the factory, decorator and/or utils for a {@link DocumentsRegistry} object.
 */
export const ExecutableQueryDocumentsRegistry:{
	/**
	 * The object with the properties/methods to use in the decoration of a {@link DocumentsRegistry}.
	 */
	PROTOTYPE:ExecutableQueryDocumentsRegistryFactory["PROTOTYPE"];

	/**
	 * Returns true if the object is decorated with the specific properties and methods of a {@link DocumentsRegistry}.
	 */
	isDecorated( object:object ):object is ExecutableQueryDocumentsRegistry;

	/**
	 * Decorates the object with the properties and methods from the {@link DocumentsRegistry} prototype.
	 */
	decorate<T extends object>( object:T & BaseDocumentsRegistry ):T & ExecutableQueryDocumentsRegistry;

	/**
	 * Creates a {@link DocumentsRegistry} with the provided data.
	 */
	create<T extends object>( data:T & BaseDocumentsRegistry ):T & ExecutableQueryDocumentsRegistry;

	/**
	 * Creates a {@link DocumentsRegistry} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseDocumentsRegistry ):T & ExecutableQueryDocumentsRegistry
} = <ExecutableQueryDocumentsRegistryFactory> {
	PROTOTYPE: {
		register( this:ExecutableQueryDocumentsRegistry, id:string ):ExecutableQueryDocument | Document {
			return this.getPointer( id, true );
		},

		_getLocalID( this:ExecutableQueryDocumentsRegistry, id:string ):string {
			if( URI.hasFragment( id ) ) throw new IllegalArgumentError( `"${ id }" is out of scope.` );
			return GeneralRegistry.PROTOTYPE._getLocalID.call( this, id );
		},
	},


	isDecorated( object:object ):object is ExecutableQueryDocumentsRegistry {
		return ModelDecorator
			.hasPropertiesFrom( ExecutableQueryDocumentsRegistry.PROTOTYPE, object );
	},

	decorate<T extends BaseDocumentsRegistry>( object:T ):T & ExecutableQueryDocumentsRegistry {
		if( ExecutableQueryDocumentsRegistry.isDecorated( object ) ) return object;

		const base:T & BaseGeneralRegistry = Object.assign<T, Pick<BaseGeneralRegistry, "__modelDecorator">>( object, {
			__modelDecorator: ExecutableQueryDocument,
		} );

		const target:T & GeneralRegistry<ExecutableQueryDocument> = ModelDecorator
			.decorateMultiple( base, GeneralRegistry );

		return ModelDecorator
			.definePropertiesFrom( ExecutableQueryDocumentsRegistry.PROTOTYPE, target );
	},


	create<T extends object>( data:T & BaseDocumentsRegistry ):T & ExecutableQueryDocumentsRegistry {
		// FIXME
		return ExecutableQueryDocumentsRegistry.createFrom( { ...data as any } );
	},

	createFrom<T extends object>( object:T & BaseDocumentsRegistry ):T & ExecutableQueryDocumentsRegistry {
		const registry:T & ExecutableQueryDocumentsRegistry = ExecutableQueryDocumentsRegistry.decorate( object );
		return GeneralRegistry.createFrom( registry );
	},
};
