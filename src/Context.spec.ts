import {
	OBLIGATORY,

	module,
	method,
	interfaze,

	isDefined,
	hasProperty,
	hasMethod,
	hasSignature,
	hasDefaultExport,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

import * as Context from "./Context";
import DefaultExport from "./Context";

describe( module( "Carbon/Context" ), ():void => {

	it( isDefined(), ():void => {
		expect( Context ).toBeDefined();
		expect( Utils.isObject( Context ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.Context.Class",
		"Interface that every context in the SDK implements."
	), ():void => {

		it( hasProperty(
			OBLIGATORY,
			"auth",
			"Carbon.Auth.Class",
			"The authentication and authorization class of the context."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"documents",
			"Carbon.Documents.Class",
			"The documents class of the context."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"parentContext",
			"Carbon.Context.Class",
			"The parent context of the current context. It will be `null` when the context has no parent."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getBaseURI",
			"Returns the base URI of the current context.",
			{ type: "string", description: "The base URI of the context." }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"resolve",
			"Resolves the relative URI provided in accordance to the base URI of the context.", [
				{ name: "relativeURI", type: "string", description: "The relative URI to be resolved." },
			],
			{ type: "string", description: "The resolved absolute URI from the relative provided." }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"_resolvePath",
			"Resolves the path provided into an URL using the `path` settings of the context.", [
				{ name: "path", type: "string", description: "The dot notation string that refers the path declared in the settings of the context." },
			],
			{ type: "string", description: "The absolute URI of the path provided." }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"hasObjectSchema",
			"Returns true if there is an ObjectSchema for the specified type.", [
				{ name: "type", type: "string", description: "The URI of the type to look for its schema." },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getObjectSchema",
			"Returns the ObjectSchema for the specified type. If no type is specified, the general object schema of the context should be returned.", [
				{ name: "type", type: "string", optional: true, description: "The URI of the type to look for its schema." },
			],
			{ type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The specified schema to look for." }
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"extendObjectSchema"
		), ():void => {

			it( hasSignature(
				"Extends the schema for a specified type of Resource.\nIf a schema for the type exists in the parent context, this is duplicated for the actual context, but only the first time this schema is extended.", [
					{ name: "type", type: "string", description: "The URI of the type to extends its schema." },
					{ name: "objectSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The new schema that will extends the previous one." },
				]
			), ():void => {} );

			it( hasSignature(
				"Extends the general schema of the current context.\nIf a general schema exists in the parent context, this is duplicated for the current context, but only the first time the schema is extended.", [
					{ name: "objectSchema", type: "Carbon.ObjectSchema.DigestedObjectSchema", description: "The new schema that will extends the previous one." },
				]
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"clearObjectSchema",
			"Remove the schema of the type specified, or the general schema if no type is provided.", [
				{ name: "type", type: "string", optional: true, description: "The URI of the type to remove its schema." },
			]
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.Context.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:Context.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
