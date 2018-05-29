import { QueryClause } from "sparqler/clauses";
import * as TokensModule from "sparqler/tokens";
import {
	BindToken,
	ConstructToken,
	FilterToken,
	IRIToken,
	LimitToken,
	LiteralToken,
	OffsetToken,
	OptionalToken,
	OrderToken,
	PredicateToken,
	PrefixedNameToken,
	PrefixToken,
	QueryToken,
	SelectToken,
	SubjectToken,
	ValuesToken,
	VariableToken
} from "sparqler/tokens";

import { BaseAccessPoint } from "./AccessPoint";
import { AccessPoint } from "./AccessPoint";
import { TransientBlankNode } from "./BlankNode";
import { CarbonLDP } from "./CarbonLDP";
import { Document } from "./Document";
import { TransientDocument } from "./Document";

import * as Errors from "./Errors";
import { TransientFragment } from "./Fragment";
import { HTTPError } from "./HTTP/Errors";
import { Header } from "./HTTP/Header";
import { RequestService } from "./HTTP/Request";
import { Response } from "./HTTP/Response";
import { JSONLDConverter } from "./JSONLD/Converter";
import { Event } from "./Messaging/Event";
import * as MessagingUtils from "./Messaging/Utils";
import { NamedFragment } from "./NamedFragment";
import * as ObjectSchema from "./ObjectSchema";
import { Pointer } from "./Pointer";
import {
	PersistedResource,
	TransientResource
} from "./Resource";
import { ContextSettings } from "./Settings";
import * as SPARQL from "./SPARQL";
import { PartialMetadata } from "./SPARQL/QueryDocument/PartialMetadata";
import {
	clazz,
	hasConstructor,
	hasMethod,
	hasProperty,
	hasSignature,
	INSTANCE,
	isDefined,
	method,
	module,
} from "./test/JasmineExtender";
import {
	TransientAccessPoint,
} from "./AccessPoint";
import * as Utils from "./Utils";
import { C } from "./Vocabularies/C";
import { CS } from "./Vocabularies/CS";
import { LDP } from "./Vocabularies/LDP";
import { XSD } from "./Vocabularies/XSD";

type Documents = {
	[ fn:string ]:(<P = any>( ...params:any[] ) => any) | any;
};
const Documents:{ new( ...params:any[] ):Documents } = class {} as any;

type MockedContext = any;
const MockedContext:{ new( ...params:any[] ):MockedContext } = class {};

function createPartialMetadata( schema:ObjectSchema.ObjectSchema ):PartialMetadata {
	const digestedSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.ObjectSchemaDigester.digestSchema( schema );
	digestedSchema.properties.forEach( definition => ObjectSchema.ObjectSchemaUtils.resolveProperty( digestedSchema, definition, true ) );
	return new PartialMetadata( digestedSchema );
}

function createMockDocument<T extends { id:string }>( data:{ documents:Documents, props:T } ):T & Document {
	const pointer:Pointer = data.documents.getPointer( data.props.id );
	const doc:T & Document = Document.decorate( Object.assign( pointer, data.props ) );

	findNonEnumerableProps( doc );
	doc._normalize();
	return doc;
}

function findNonEnumerableProps( object:object ):void {
	Object
		.keys( object )
		.filter( key => key.startsWith( "_" ) )
		.forEach( key => Object.defineProperty( object, key, { enumerable: false, configurable: true } ) )
	;

	Object
		.keys( object )
		.filter( key => Array.isArray( object[ key ] ) || Utils.isPlainObject( object[ key ] ) )
		.map( key => object[ key ] )
		.forEach( findNonEnumerableProps )
	;
}

xdescribe( module( "carbonldp/Documents" ), ():void => {

	describe( clazz(
		"CarbonLDP.Documents",
		"Class that contains methods for retrieving, saving and updating documents from the Carbon LDP server.", [
			"CarbonLDP.PointerLibrary",
			"CarbonLDP.PointerValidator",
			"CarbonLDP.ObjectSchemaResolver",
		]
	), ():void => {

		beforeEach( ():void => {
			jasmine.Ajax.install();
		} );

		afterEach( ():void => {
			jasmine.Ajax.uninstall();
		} );

		it( isDefined(), ():void => {
			expect( Documents ).toBeDefined();
			expect( Utils.isFunction( Documents ) ).toBe( true );
		} );

		it( hasProperty(
			INSTANCE,
			"documentDecorators",
			"Map<string, CarbonLDP.DocumentDecorator>",
			"A map that specifies a type and a tuple with a function decorator and its parameters which will be called when a document with the specified type has been resolved or refreshed.\n\nThe decorator function must at least accept the object to decorate and optional parameters declared in the tuple."
		), ():void => {
			let documents:Documents = {};

			expect( documents.documentDecorators ).toBeDefined();
			expect( documents.documentDecorators ).toEqual( jasmine.any( Map ) );

			// Has default decorators
			expect( documents.documentDecorators.size ).toBe( 4 );
			expect( documents.documentDecorators.has( CS.ProtectedDocument ) ).toBe( true );
			expect( documents.documentDecorators.has( CS.AccessControlList ) ).toBe( true );
			expect( documents.documentDecorators.has( CS.User ) ).toBe( true );
			expect( documents.documentDecorators.has( CS.Role ) ).toBe( true );
		} );

	} );

} );
