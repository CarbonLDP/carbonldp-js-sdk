import { ACL } from "../Auth";
import { Document } from "../Document";
import { Pointer } from "../Pointer";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";
import { CS } from "../Vocabularies";

import { ProtectedDocument } from "./ProtectedDocument";


describe( module( "carbonldp/ProtectedDocument" ), ():void => {

	describe( interfaze(
		"CarbonLDP.ProtectedDocument",
		"Interface that represents a persisted protected document."
	), ():void => {

		it( extendsClass( "CarbonLDP.Document" ), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"accessControlList",
			"CarbonLDP.Pointer",
			"A reference to the ACL of the document."
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"getACL",
			"Obtains and resolve the ACL of the actual document.", [
				{ name: "requestOptions", type: "CarbonLDP.HTTP.RequestOptions", optional: true, description: " Customizable options for the request." },
			],
			{ type: "Promise<CarbonLDP.Auth.ACL>" }
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.ProtectedDocument",
		"Interface with the factory, decorate and utils methods for `CarbonLDP.ProtectedDocument` objects."
	), ():void => {

		it( hasMethod(
			STATIC,
			"isDecorated",
			"Returns true if the object provided contains the properties and methods of a `CarbonLDP.ProtectedDocument` object.", [
				{ name: "object", type: "object", description: "The object to check." },
			],
			{ type: "object is CarbonLDP.ProtectedDocument" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"is",
			"Returns true if the object provided is considered a `CarbonLDP.ProtectedDocument` object.", [
				{ name: "object", type: "object", description: "The object to check." },
			],
			{ type: "object is CarbonLDP.ProtectedDocument" }
		), ():void => {} );

		it( hasMethod(
			STATIC,
			"decorate",
			[ "T extends object" ],
			"Decorate the object with the properties and methods of a `CarbonLDP.ProtectedDocument` object.", [
				{ name: "object", type: "T", description: "The object to decorate." },
			],
			{ type: "T & CarbonLDP.ProtectedDocument" }
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"ProtectedDocument",
		"CarbonLDP.ProtectedDocument",
		"Constant that implements the `CarbonLDP.ProtectedDocument` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( ProtectedDocument ).toBeDefined();
			expect( ProtectedDocument ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Separate in different errors
		it( "ProtectedDocument.SCHEMA", ():void => {
			expect( ProtectedDocument.SCHEMA ).toBeDefined();
			expect( Utils.isObject( ProtectedDocument.SCHEMA ) ).toBe( true );

			expect( Utils.hasProperty( ProtectedDocument.SCHEMA, "accessControlList" ) ).toBe( true );
			expect( ProtectedDocument.SCHEMA[ "accessControlList" ] ).toEqual( {
				"@id": CS.accessControlList,
				"@type": "@id",
			} );

		} );

		// TODO: Separate in different tests
		it( "ProtectedDocument.isDecorated", ():void => {
			expect( ProtectedDocument.isDecorated ).toBeDefined();
			expect( Utils.isFunction( ProtectedDocument.isDecorated ) ).toBe( true );

			let object:any = void 0;
			expect( ProtectedDocument.isDecorated( object ) ).toBe( false );

			object = {
				accessControlList: null,
				getACL: ():void => {},
			};
			expect( ProtectedDocument.isDecorated( object ) ).toBe( true );

			delete object.accessControlList;
			expect( ProtectedDocument.isDecorated( object ) ).toBe( true );
			object.accessControlList = null;

			delete object.getACL;
			expect( ProtectedDocument.isDecorated( object ) ).toBe( false );
			object.getACL = ():void => {};
		} );

		// TODO: Separate in different tests
		it( "ProtectedDocument.is", ():void => {
			expect( ProtectedDocument.is ).toBeDefined();
			expect( Utils.isFunction( ProtectedDocument.is ) ).toBe( true );

			let object:any = void 0;
			expect( ProtectedDocument.is( object ) ).toBe( false );

			object = {
				accessControlList: null,
				getACL: ():void => {},
			};
			expect( ProtectedDocument.is( object ) ).toBe( false );

			let document:Document = Document.decorate( object );
			expect( ProtectedDocument.is( document ) ).toBe( true );
		} );

		// TODO: Separate in different tests
		it( "ProtectedDocument.decorate", ():void => {
			expect( ACL.decorate ).toBeDefined();
			expect( Utils.isFunction( ACL.decorate ) ).toBe( true );

			const persistedDocumentSpy:jasmine.Spy = spyOn( Document, "decorate" ).and.callThrough();

			let fn:Function = ():void => {};
			let document:object;
			let protectedDocument:ProtectedDocument;

			document = {
				accessControlList: null,
				getACL: fn,
			};
			protectedDocument = ProtectedDocument.decorate( document );
			expect( ProtectedDocument.isDecorated( protectedDocument ) ).toBe( true );
			expect( protectedDocument.getACL ).toBe( fn );

			document = {
				accessControlList: null,
			};
			protectedDocument = ProtectedDocument.decorate( document );
			expect( ProtectedDocument.isDecorated( protectedDocument ) ).toBe( true );
			expect( protectedDocument.getACL ).not.toBe( fn );

			expect( persistedDocumentSpy ).toHaveBeenCalledTimes( 1 );
		} );

		describe( "ProtectedDocument instance", ():void => {

			// TODO: Separate in different tests
			it( "ProtectedDocument.getACL", ( done:{ ():void, fail:() => void } ):void => {
				const protectedDocument:ProtectedDocument = ProtectedDocument.decorate( {
					id: "http://example.com/resource/",
					accessControlList: Pointer.create( { $id: "http://example.com/resource/~acl/" } ),
					_resolved: true,
				} );

				const mockACL:ACL = ACL.decorate( {
					_eTag: `"1234567890"`,

					id: "http://example.com/resource/~acl/",
					types: [ CS.AccessControlList ],

					accessTo: protectedDocument,
					entries: [
						{
							id: "_:1",
							types: [ CS.AccessControlEntry ],

							granting: true,
							permissions: [
								Pointer.create( { $id: "http://example.com/ns#READ" } ),
								Pointer.create( { $id: "http://example.com/ns#WRITE" } ),
								Pointer.create( { $id: "http://example.com/ns#CREATE" } ),
								Pointer.create( { $id: "http://example.com/ns#DELETE" } ),
							],
							subjects: [ Pointer.create( { $id: "https://example.com/.system/roles/my-role/" } ) ],
							subjectClass: Pointer.create( { $id: CS.Role } ),
						},
					],
					inheritableEntries: [
						{
							id: "_:2",
							types: [ CS.AccessControlEntry ],

							granting: true,
							permissions: [
								Pointer.create( { $id: "http://example.com/ns#READ" } ),
								Pointer.create( { $id: "http://example.com/ns#WRITE" } ),
							],
							subjects: [ Pointer.create( { $id: "https://example.com/.system/roles/my-role/" } ) ],
							subjectClass: Pointer.create( { $id: CS.Role } ),
						},
					],
				} );
				mockACL._normalize();

				const promises:Promise<any>[] = [];


				expect( protectedDocument.getACL ).toBeDefined();
				expect( Utils.isFunction( protectedDocument.getACL ) ).toBe( true );

				Object.defineProperty( protectedDocument, "get", { writable: true } );
				spyOn( protectedDocument, "get" ).and
					.returnValue( Promise.resolve( mockACL ) );

				promises.push( protectedDocument.getACL().then( ( acl:ACL ) => {
					expect( acl ).toBeDefined();

					expect( ACL.isDecorated( acl ) ).toBe( true );
					expect( acl.entries ).toBeDefined();
					expect( acl.entries.length ).toBe( 1 );
					expect( acl.inheritableEntries ).toBeDefined();
					expect( acl.inheritableEntries.length ).toBe( 1 );
					expect( acl.accessTo.$id ).toBe( protectedDocument.$id );
				} ) );


				const unresolvedProtectedDocument:ProtectedDocument = ProtectedDocument.decorate( { id: "http://example.com/resource/" } );

				Object.defineProperty( unresolvedProtectedDocument, "executeSELECTQuery", { writable: true } );
				spyOn( unresolvedProtectedDocument, "executeSELECTQuery" ).and
					.returnValue( Promise.resolve( {
						bindings: [ {
							acl: Pointer.create( { $id: "http://example.com/resource/~acl/" } ),
						} ],
					} ) );

				Object.defineProperty( unresolvedProtectedDocument, "get", { writable: true } );
				spyOn( unresolvedProtectedDocument, "get" ).and
					.returnValue( Promise.resolve( mockACL ) );

				promises.push( unresolvedProtectedDocument.getACL().then( ( acl:ACL ) => {
					expect( acl ).toBeDefined();

					expect( ACL.isDecorated( acl ) ).toBe( true );
					expect( acl.entries ).toBeDefined();
					expect( acl.entries.length ).toBe( 1 );
					expect( acl.inheritableEntries ).toBeDefined();
					expect( acl.inheritableEntries.length ).toBe( 1 );
					expect( acl.accessTo.$id ).toBe( protectedDocument.$id );
				} ) );

				Promise.all( promises ).then( done ).catch( done.fail );
			} );

		} );

	} );

} );
