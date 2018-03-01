import {
	STATIC,

	OBLIGATORY,
	OPTIONAL,

	module,
	clazz,
	method,
	interfaze,

	isDefined,
	hasMethod,
	extendsClass,
	hasProperty,
	hasSignature,
	hasDefaultExport,
} from "../test/JasmineExtender";

import * as ACL from "./ACL";
import Documents from "../Documents";
import { PersistedDocument } from "./../PersistedDocument";
import * as Utils from "./../Utils";

import * as PersistedACL from "./PersistedACL";
import DefaultExport from "./PersistedACL";

describe( module( "Carbon/Auth/PersistedACL" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedACL ).toBeDefined();
		expect( Utils.isObject( PersistedACL ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.Auth.PersistedACL.Class",
		"Interface that represents a persisted Access Control List (ACL)."
	), ():void => {

		it( extendsClass( "Carbon.PersistedDocument.PersistedDocument" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"accessTo",
			"Carbon.Pointer.Pointer",
			"Reference to the document the ACL belongs."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"entries",
			"Carbon.Auth.PersistedACE.PersistedACE[]",
			"Array of persisted ACEs that only grants or denies permissions of the document the ACL belongs."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"inheritableEntries",
			"Carbon.Auth.PersistedACE.PersistedACE[]",
			"Array of persisted ACEs that grants or denies permissions of the document's children the ACL belongs."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"_parsePointer",
			"(Internal) Function that parse string URIs to pointers.", [
				{ name: "element", type: "string | Carbon.Pointer.Pointer", description: "The URI string o pointer to convert into pointer." },
			],
			{ type: "Carbon.Pointer.Pointer" }
		), ():void => {} );

		describe( method( OBLIGATORY, "grant" ), ():void => {

			it( hasSignature(
				"Grant the permission specified to the subject provided for the document related to the ACL.", [
					{ name: "subject", type: "string | Carbon.Pointer.Pointer", description: "The subject which will be assigned the permission specified." },
					{ name: "subjectClass", type: "string | Carbon.Pointer.Pointer", description: "The type of subject provided." },
					{ name: "permission", type: "string | Carbon.Pointer.Pointer", description: "The permission that will be granted to the subject specified." },
				]
			), ():void => {} );

			it( hasSignature(
				"Grant several permissions to the subject provided for the document related to the ACL.", [
					{ name: "subject", type: "string | Carbon.Pointer.Pointer", description: "The subject which will be assigned the permission specified." },
					{ name: "subjectClass", type: "string | Carbon.Pointer.Pointer", description: "The type of subject provided." },
					{ name: "permissions", type: "(string | Carbon.Pointer.Pointer)[]", description: "The permissions that will be granted to the subject specified." },
				]
			), ():void => {} );

			it( hasSignature(
				"Grant the permission specified to the every subject provided for the document related to the ACL.", [
					{ name: "subjects", type: "(string | Carbon.Pointer.Pointer)[]", description: "The subjects which will be assigned the every permissions specified." },
					{ name: "subjectClass", type: "string | Carbon.Pointer.Pointer", description: "The type of subjects provided." },
					{ name: "permission", type: "string | Carbon.Pointer.Pointer", description: "The permission that will be granted to the every subject." },
				]
			), ():void => {} );

			it( hasSignature(
				"Grant several permissions to the every subject provided for the document related to the ACL.", [
					{ name: "subjects", type: "(string | Carbon.Pointer.Pointer)[]", description: "The subjects which will be assigned the every permissions specified." },
					{ name: "subjectClass", type: "string | Carbon.Pointer.Pointer", description: "The type of subjects provided." },
					{ name: "permissions", type: "(string | Carbon.Pointer.Pointer)[]", description: "The permissions that will be granted to the every subject." },
				]
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "deny" ), ():void => {

			it( hasSignature(
				"Grant the permission specified to the subject provided for the document related to the ACL.", [
					{ name: "subject", type: "string | Carbon.Pointer.Pointer", description: "The subject which will be assigned the permission specified." },
					{ name: "subjectClass", type: "string | Carbon.Pointer.Pointer", description: "The type of subject provided." },
					{ name: "permission", type: "string | Carbon.Pointer.Pointer", description: "The permission that will be granted to the subject specified." },
				]
			), ():void => {} );

			it( hasSignature(
				"Grant several permissions to the subject provided for the document related to the ACL.", [
					{ name: "subject", type: "string | Carbon.Pointer.Pointer", description: "The subject which will be assigned the permission specified." },
					{ name: "subjectClass", type: "string | Carbon.Pointer.Pointer", description: "The type of subject provided." },
					{ name: "permissions", type: "(string | Carbon.Pointer.Pointer)[]", description: "The permissions that will be granted to the subject specified." },
				]
			), ():void => {} );

			it( hasSignature(
				"Grant the permission specified to the every subject provided for the document related to the ACL.", [
					{ name: "subjects", type: "(string | Carbon.Pointer.Pointer)[]", description: "The subjects which will be assigned the every permissions specified." },
					{ name: "subjectClass", type: "string | Carbon.Pointer.Pointer", description: "The type of subjects provided." },
					{ name: "permission", type: "string | Carbon.Pointer.Pointer", description: "The permission that will be granted to the every subject." },
				]
			), ():void => {} );

			it( hasSignature(
				"Grant several permissions to the every subject provided for the document related to the ACL.", [
					{ name: "subjects", type: "(string | Carbon.Pointer.Pointer)[]", description: "The subjects which will be assigned the every permissions specified." },
					{ name: "subjectClass", type: "string | Carbon.Pointer.Pointer", description: "The type of subjects provided." },
					{ name: "permissions", type: "(string | Carbon.Pointer.Pointer)[]", description: "The permissions that will be granted to the every subject." },
				]
			), ():void => {} );

		} );

		describe( method( OBLIGATORY, "configureChildInheritance" ), ():void => {

			it( hasSignature(
				"Configures the permission specified to the subject provided either granting or denying it for the children of the document related to the ACL.", [
					{ name: "granting", type: "boolean", description: "Boolean to indicate if the permission will be granted o denied." },
					{ name: "subject", type: "string | Carbon.Pointer.Pointer", description: "The subject which will be assigned the permission specified." },
					{ name: "subjectClass", type: "string | Carbon.Pointer.Pointer", description: "The type of subject provided." },
					{ name: "permission", type: "string | Carbon.Pointer.Pointer", description: "The permission that will be granted to the subject specified." },
				]
			), ():void => {} );

			it( hasSignature(
				"Configure several permissions to the subject provided either granting or denying them for the children of the document related to the ACL.", [
					{ name: "granting", type: "boolean", description: "Boolean to indicate if the permission will be granted o denied." },
					{ name: "subject", type: "string | Carbon.Pointer.Pointer", description: "The subject which will be assigned the permission specified." },
					{ name: "subjectClass", type: "string | Carbon.Pointer.Pointer", description: "The type of subject provided." },
					{ name: "permissions", type: "(string | Carbon.Pointer.Pointer)[]", description: "The permissions that will be granted to the subject specified." },
				]
			), ():void => {} );

			it( hasSignature(
				"Configure the permission specified to the every subject provided either granting or denying it for the children of the document related to the ACL.", [
					{ name: "granting", type: "boolean", description: "Boolean to indicate if the permission will be granted o denied." },
					{ name: "subjects", type: "(string | Carbon.Pointer.Pointer)[]", description: "The subjects which will be assigned the every permissions specified." },
					{ name: "subjectClass", type: "string | Carbon.Pointer.Pointer", description: "The type of subjects provided." },
					{ name: "permission", type: "string | Carbon.Pointer.Pointer", description: "The permission that will be granted to the every subject." },
				]
			), ():void => {} );

			it( hasSignature(
				"Configure several permissions to the every subject provided either granting or denying them for the children of the document related to the ACL.", [
					{ name: "granting", type: "boolean", description: "Boolean to indicate if the permission will be granted o denied." },
					{ name: "subjects", type: "(string | Carbon.Pointer.Pointer)[]", description: "The subjects which will be assigned the every permissions specified." },
					{ name: "subjectClass", type: "string | Carbon.Pointer.Pointer", description: "The type of subjects provided." },
					{ name: "permissions", type: "(string | Carbon.Pointer.Pointer)[]", description: "The permissions that will be granted to the every subject." },
				]
			), ():void => {} );

		} );

		it( hasMethod(
			OBLIGATORY,
			"grants",
			"Returns true if the subject has a configuration where it grants the permission specified for the document related to de ACL.\nReturns `null` if no configuration of the subject and permission exists in the ACL.", [
				{ name: "subject", type: "string | Carbon.Pointer.Pointer", description: "The subject to look for its configuration." },
				{ name: "permission", type: "string | Carbon.Pointer.Pointer", description: "The permission to check if it has a granting configuration." },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"denies",
			"Returns true if the subject has a configuration where it denies the permission specified for the document related to de ACL.\nReturns `null` if no configuration of the subject and permission exists in the ACL.", [
				{ name: "subject", type: "string | Carbon.Pointer.Pointer", description: "The subject to look for its configuration." },
				{ name: "permission", type: "string | Carbon.Pointer.Pointer", description: "The permission to check if it has a granting configuration." },
			],
			{ type: "boolean" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getChildInheritance",
			"Returns if grants or denies a configuration of the subject and the permission specified for the children of document related to de ACL.\nReturns `null` if no configuration of the subject and permission exists in the ACL.", [
				{ name: "subject", type: "string | Carbon.Pointer.Pointer", description: "The subject to look for its configuration." },
				{ name: "permission", type: "string | Carbon.Pointer.Pointer", description: "The permission to check if it has a granting configuration." },
			],
			{ type: "boolean" }
		), ():void => {} );

		describe( method(
			OBLIGATORY,
			"remove"
		), ():void => {

			it( hasSignature(
				"Remove the configuration of a permission from a subject for the document related to the ACL.", [
					{ name: "subject", type: "string | Carbon.Pointer.Pointer", description: "The subject from will be removed the permission." },
					{ name: "permission", type: "string | Carbon.Pointer.Pointer", description: "The permission to remove from the subject configuration." },
				]
			), ():void => {} );

			it( hasSignature(
				"Remove the configuration of several permissions from a subject for the document related to the ACL.", [
					{ name: "subject", type: "string | Carbon.Pointer.Pointer", description: "The subject from will removed the permission." },
					{ name: "permissions", type: "(string | Carbon.Pointer.Pointer)[]", description: "The permissions to remove from the subject configuration." },
				]
			), ():void => {} );

		} );

		describe( method(
			OBLIGATORY,
			"removeChildInheritance"
		), ():void => {

			it( hasSignature(
				"Remove the configuration of a permission from a subject for the children of the document related to the ACL.", [
					{ name: "subject", type: "string | Carbon.Pointer.Pointer", description: "The subject from will be removed the permission." },
					{ name: "permission", type: "string | Carbon.Pointer.Pointer", description: "The permission to remove from the subject configuration." },
				]
			), ():void => {} );

		} );

	} );

	describe( clazz( "Carbon.Auth.PersistedACL.Factory", "Factory class for `Carbon.Auth.PersistedACL.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedACL.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedACL.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Return true if the object provided has the properties and methods of a `Carbon.Auth.PersistedACL.Class` object.", [
				{ name: "object", type: "Object", description: "The object to analise." },
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedACL.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedACL.Factory.hasClassProperties ) ).toBe( true );

			let object:any = void 0;
			expect( PersistedACL.Factory.hasClassProperties( object ) ).toBe( false );

			object = {
				entries: null,
				accessTo: null,
				inheritableEntries: null,
			};
			expect( PersistedACL.Factory.hasClassProperties( object ) ).toBe( true );

			delete object.accessTo;
			expect( PersistedACL.Factory.hasClassProperties( object ) ).toBe( false );
			object.accessTo = null;

			delete object.entries;
			expect( PersistedACL.Factory.hasClassProperties( object ) ).toBe( true );
			object.entries = null;

			delete object.inheritableEntries;
			expect( PersistedACL.Factory.hasClassProperties( object ) ).toBe( true );
			object.inheritableEntries = null;
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends Carbon.PersistedDocument.PersistedDocument" ],
			"Decorate the object with the properties and methods of a `Carbon.Auth.PersistedACL.Class` object.", [
				{ name: "document", type: "T", description: "The persisted document to decorate." },
			],
			{ type: "T & Carbon.Auth.PersistedACL.Class" }
		), ():void => {
			expect( PersistedACL.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedACL.Factory.decorate ) ).toBe( true );

			let spy:jasmine.Spy = spyOn( ACL.Factory, "decorate" ).and.callThrough();
			let document:PersistedDocument = PersistedDocument.create( new Documents(), "http://example.com/some/acl/" );
			document[ "accessTo" ] = document.getPointer( "http://example.com/some/" );

			let acl:PersistedACL.Class = PersistedACL.Factory.decorate( document );
			expect( spy ).toHaveBeenCalledTimes( 1 );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.PersistedACL.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedACL.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
