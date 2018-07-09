import { Fragment } from "../Fragment";
import { EventEmitterDocumentTrait } from "../Messaging";
import {
	ModelDecorator,
	ModelFactory,
	ModelPrototype,
	ModelSchema,
	ModelTypeGuard,
} from "../Model";
import { QueryableDocumentTrait } from "../QueryDocument";
import { DocumentsRegistry } from "../Registry";
import { DocumentsRepository } from "../Repository";
import { SPARQLDocumentTrait } from "../SPARQL";
import { isObject } from "../Utils";
import {
	C,
	LDP,
	XSD,
} from "../Vocabularies";
import { BaseDocument } from "./BaseDocument";
import { TransientDocument } from "./TransientDocument";


export interface Document extends SPARQLDocumentTrait, EventEmitterDocumentTrait, QueryableDocumentTrait {
	$registry:DocumentsRegistry;
	$repository:DocumentsRepository;


	__savedFragments:Fragment[];


	created?:Date;
	modified?:Date;
	accessPoints?:Document[];
	contains?:Document[];


	_syncSavedFragments():void;
}


export type OverloadedMembers =
	| "__modelDecorator"
	;

export type DocumentFactory =
	& ModelSchema<C[ "Document" ]>
	& ModelPrototype<Document, SPARQLDocumentTrait & EventEmitterDocumentTrait & QueryableDocumentTrait, OverloadedMembers>
	& ModelDecorator<Document>
	& ModelTypeGuard<Document>
	& ModelFactory<TransientDocument, BaseDocument>
	;

export const Document:DocumentFactory = {
	TYPE: C.Document,
	SCHEMA: {
		"contains": {
			"@id": LDP.contains,
			"@container": "@set",
			"@type": "@id",
		},
		"members": {
			"@id": LDP.member,
			"@container": "@set",
			"@type": "@id",
		},
		"membershipResource": {
			"@id": LDP.membershipResource,
			"@type": "@id",
		},
		"isMemberOfRelation": {
			"@id": LDP.isMemberOfRelation,
			"@type": "@id",
		},
		"hasMemberRelation": {
			"@id": LDP.hasMemberRelation,
			"@type": "@id",
		},
		"insertedContentRelation": {
			"@id": LDP.insertedContentRelation,
			"@type": "@id",
		},
		"created": {
			"@id": C.created,
			"@type": XSD.dateTime,
		},
		"modified": {
			"@id": C.modified,
			"@type": XSD.dateTime,
		},
		"defaultInteractionModel": {
			"@id": C.defaultInteractionModel,
			"@type": "@id",
		},
		"accessPoints": {
			"@id": C.accessPoint,
			"@type": "@id",
			"@container": "@set",
		},
	},

	PROTOTYPE: {
		__modelDecorator: Fragment,

		get __savedFragments():Fragment[] { return []; },

		_syncSavedFragments( this:Document ):void {
			this.__savedFragments = Array
				.from( this.__resourcesMap.values() )
				.map( Fragment.decorate )
			;

			this.__savedFragments
				.forEach( fragment => fragment._syncSnapshot() )
			;
		},
	},


	isDecorated( object:object ):object is Document {
		return isObject( object )
			&& ModelDecorator
				.hasPropertiesFrom( Document.PROTOTYPE, object )
			;
	},

	is( object:object ):object is Document {
		return TransientDocument.is( object )
			&& SPARQLDocumentTrait.isDecorated( object )
			&& EventEmitterDocumentTrait.isDecorated( object )
			&& QueryableDocumentTrait.isDecorated( object )
			&& Document.isDecorated( object )
			;
	},


	decorate<T extends object>( object:T ):T & Document {
		if( Document.isDecorated( object ) ) return object;

		const target:T & SPARQLDocumentTrait & EventEmitterDocumentTrait & QueryableDocumentTrait = ModelDecorator
			.decorateMultiple( object, SPARQLDocumentTrait, EventEmitterDocumentTrait, QueryableDocumentTrait );

		return ModelDecorator
			.definePropertiesFrom( Document.PROTOTYPE, target );
	},


	create: TransientDocument.create,
	createFrom: TransientDocument.createFrom,
};
