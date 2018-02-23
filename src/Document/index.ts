import * as Fragment from "../Fragment";
import * as JSONLDConverter from "../JSONLD/Converter";
import { ModelDecorator } from "../ModelDecorator";
import { ModelFactory } from "../ModelFactory";
import * as NamedFragment from "../NamedFragment";
import * as ObjectSchema from "../ObjectSchema";
import {
	Pointer,
	PointerLibrary,
	PointerValidator,
} from "../Pointer";
import * as RDFDocument from "../RDF/Document";
import { Resource } from "../Resource";
import { C } from "../Vocabularies/C";
import { LDP } from "../Vocabularies/LDP";
import { XSD } from "../Vocabularies/XSD";

import {
	createDocument,
	createDocumentFrom,
	decorateDocument,
	isDecoratedDocument,
	isDocument,
} from "./factory";

export interface Document extends Resource, PointerLibrary, PointerValidator {
	defaultInteractionModel?:Pointer;
	isMemberOfRelation?:Pointer;
	hasMemberRelation?:Pointer;

	_fragmentsIndex:Map<string, Fragment.Class>;

	_normalize():void;


	_removeFragment( slugOrFragment:string | Fragment.Class ):void;


	hasFragment( slug:string ):boolean;


	getFragment<T>( slug:string ):T & Fragment.Class;

	getNamedFragment<T>( slug:string ):T & NamedFragment.Class;


	getFragments():Fragment.Class[];


	createFragment<T>( object:T, slug?:string ):T & Fragment.Class;

	createFragment( slug?:string ):Fragment.Class;


	createNamedFragment<T>( object:T, slug:string ):T & NamedFragment.Class;

	createNamedFragment( slug:string ):NamedFragment.Class;


	removeNamedFragment( slugOrFragment:string | NamedFragment.Class ):void;


	toJSON( objectSchemaResolver?:ObjectSchema.Resolver, jsonldConverter?:JSONLDConverter.Class ):RDFDocument.Class;
}

export interface DocumentFactory extends ModelFactory<Document>, ModelDecorator<Document> {
	TYPE:string;
	SCHEMA:ObjectSchema.Class;


	is( object:object ):object is Document;

	isDecorated( object:object ):object is Document;


	create():Document;

	createFrom<T extends object>( object:T ):T & Document;

	decorate<T extends object>( object:T ):T & Document;
}

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

	is: isDocument,
	isDecorated: isDecoratedDocument,

	create: createDocument,
	createFrom: createDocumentFrom,
	decorate: decorateDocument,
};

export default Document;
