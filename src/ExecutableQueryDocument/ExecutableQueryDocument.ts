import { exec } from "child_process";
import { BaseDocument } from "../Document/BaseDocument";
import { BaseResolvableDocument, Document, DocumentFactory } from "../Document/Document";
import { EventEmitterDocumentTrait } from "../Document/Traits/EventEmitterDocumentTrait";
import { QueryableDocumentTrait } from "../Document/Traits/QueryableDocumentTrait";
import { SPARQLDocumentTrait } from "../Document/Traits/SPARQLDocumentTrait";
import { OverriddenMembers, TransientDocument } from "../Document/TransientDocument";
import { DocumentsRegistry } from "../DocumentsRegistry/DocumentsRegistry";
import { DocumentsRepository } from "../DocumentsRepository/DocumentsRepository";
import { Fragment } from "../Fragment/Fragment";
import { TransientFragment } from "../Fragment/TransientFragment";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelFactoryOptional } from "../Model/ModelFactoryOptional";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelSchema } from "../Model/ModelSchema";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { $Registry } from "../Registry/Registry";
import { ResolvablePointer } from "../Repository/ResolvablePointer";
import { Resource } from "../Resource/Resource";


import { C } from "../Vocabularies/C";
import { BaseExecutableQueryDocument } from "./BaseExecutableQueryDocument";
import { TransientExecutableQueryDocument } from "./TransientExecutableQueryDocument";

/**
 * Required properties for creating a {@link Document} object.
 */
export interface BaseResolvableExecutanleQueryDocument extends BaseExecutableQueryDocument {
	/**
	 * Registry where the created {@link Document} will exist.
	 */
	$registry:DocumentsRegistry;
	/**
	 * Repository where the created {@link Document} can manage its data.
	 */
	$repository:DocumentsRepository;
}

/**
 * Model that represents a `c:ExecutableQueryDocument`
 */
export interface ExecutableQueryDocument extends Document {
	/**
	 * The stored SPARQL Query to execute on GET request with `ldp:ExecutableQuery` interaction model.
	 */
	storedQuery: string;
	/**
	 * The last time the storedQuery was successfully executed and returned. When a new `c:ExecutableQueryDocument` is
	 * created, it has no `c:successfullyExecuted` property set.
	 */
	successfullyExecuted?: Date;
}

/**
 * Factory, decorator and utils of a {@link ExecutableQueryDocument} object.
 */
export type ExecutableQueryDocumentFactory =
	& ModelSchema<C[ "ExecutableQueryDocument" ]>
	& DocumentFactory
	& ModelDecorator<ExecutableQueryDocument, BaseResolvableExecutanleQueryDocument>
	& ModelTypeGuard<ExecutableQueryDocument>
	& ModelFactory<TransientExecutableQueryDocument, BaseExecutableQueryDocument>
	;


/**
 * Constant with the factory, decorator and/or utils for an {@link ExecutableQueryDocument} object.
 */
export const ExecutableQueryDocument:{

	/**
	 * Type of the model, in this case: `https://carbonldp.com/ns/v1/platform#Document`.
	 */
	TYPE:C["ExecutableQueryDocument"];

	/**
	 * Schema for the {@link Document}.
	 */
	SCHEMA:ObjectSchema;

	/**
	 * The object with the properties/methods to use in the decoration of a {@link Document}.
	 */
	PROTOTYPE:ExecutableQueryDocumentFactory["PROTOTYPE"];

	/**
	 * Returns true if the object is decorated with the specific properties and methods of a {@link Document}.
	 */
	isDecorated( object:object ):object is ExecutableQueryDocument;

	/**
	 * Returns true when the value provided is considered to be a {@link Document}.
	 */
	is( object:object ):object is ExecutableQueryDocument;

	/**
	 * Decorates the object with the properties and methods from the {@link Document} prototype.
	 */
	decorate<T extends object>( object:T & BaseResolvableDocument ):T & ExecutableQueryDocument;

	/**
	 * Creates a {@link Document} with the provided data.
	 */
	create<T extends object>( data:T & BaseExecutableQueryDocument ):T & TransientExecutableQueryDocument;

	/**
	 * Creates a {@link Document} from the provided object.
	 */
	createFrom<T extends object>( object:T & BaseExecutableQueryDocument ):T & TransientExecutableQueryDocument;
} = <ExecutableQueryDocumentFactory> {
	...Document,
	TYPE: C.ExecutableQueryDocument,
	create: TransientExecutableQueryDocument.create,
	createFrom: TransientExecutableQueryDocument.createFrom,
};
