import { Documents } from "../Documents";
import {
	clazz,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	OPTIONAL,
} from "../test/JasmineExtender";
import * as Utils from "./../Utils";

import { ACL } from "./ACL";

import DefaultExport, { PersistedACL } from "./PersistedACL";

describe( module( "Carbon/Auth/PersistedACL" ), ():void => {

	describe( interfaze(
		"Carbon.Auth.PersistedACL.PersistedACL",
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

	describe( interfaze(
		"Carbon.Auth.PersistedACL.PersistedACLFactory",
		"Interface with factory, decorate and utils methods for `Carbon.Auth.PersistedACL.PersistedACL` objects."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated",
			"Return true if the object provided has the properties and methods of a `Carbon.Auth.PersistedACL.PersistedACL` object.", [
				{ name: "object", type: "object", description: "The object to analise." },
			],
			{ type: "object is Carbon.Auth.PersistedACL.PersistedACL" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorate the object with the properties and methods of a `Carbon.Auth.PersistedACL.PersistedACL` object.", [
				{ name: "object", type: "T", description: "The object to decorate." },
			],
			{ type: "T & Carbon.Auth.PersistedACL.PersistedACL" }
		), ():void => {} );

	} );

	describe( clazz( "Carbon.Auth.PersistedACL.Factory", "Factory class for `Carbon.Auth.PersistedACL.PersistedACL` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedACL ).toBeDefined();
			expect( PersistedACL ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different tests
		it( "PersistedACL.isDecorated", ():void => {
			expect( PersistedACL.isDecorated ).toBeDefined();
			expect( Utils.isFunction( PersistedACL.isDecorated ) ).toBe( true );

			// TODO: Figure out how to test assertion of internal function
		} );

		// TODO: Separate in different tests
		it( "PersistedACL.decorate", ():void => {
			expect( PersistedACL.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedACL.decorate ) ).toBe( true );

			const spy:jasmine.Spy = spyOn( ACL, "decorate" ).and.callThrough();

			const documents:Documents = new Documents();
			const object:object = {
				id: "http://example.com/some/acl/",
				accessTo: documents.getPointer( "http://example.com/some/" ),
			};

			PersistedACL.decorate( object, documents );
			expect( spy ).toHaveBeenCalledTimes( 1 );
		} );

	} );

	it( hasDefaultExport( "Carbon.Auth.PersistedACL.PersistedACL" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedACL;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

} );
