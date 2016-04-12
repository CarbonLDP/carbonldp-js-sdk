import {
	STATIC,
	INSTANCE,

	module,
	clazz,
	method,

	isDefined,
	hasProperty,
	hasMethod,
	hasSignature,
	decoratedObject
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as NS from "./../NS";
import * as Pointer from "./../Pointer";
import * as Document from "./../Document";
import * as PersistedDocument from "./../PersistedDocument";
import AbstractContext from "./../AbstractContext";
import * as HTTP from "./../HTTP";

import * as PersistedContainer from "./PersistedContainer";

describe( module( "Carbon/LDP/PersistedContainer" ), ():void => {
	let context:AbstractContext;

	it( isDefined(), ():void => {
		expect( PersistedContainer ).toBeDefined();
		expect( Utils.isObject( PersistedContainer ) ).toBe( true );
	});

	describe( clazz(
		"Carbon.LDP.PersistedContainer.Factory",
		"Factory class for LDP PersistedContainer objects"
	), ():void => {

		beforeEach( ():void => {
			class MockedContext extends AbstractContext {
				resolve( uri:string ):string {
					return uri;
				}
			}
			context = new MockedContext();
		});

		it( isDefined(), ():void => {
			expect( PersistedContainer.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedContainer.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object has the properties to be defined as a PersistedContainer", [
				{ name: "document", type: "Carbon.Document.Class" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( PersistedContainer.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( PersistedContainer.Factory.hasClassProperties ) ).toBe( true );

			let document:Document.Class;

			document = Document.Factory.create();
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );

			document = Document.Factory.create();
			document.id = "http://example.com/resource/";
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );

			document = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );

			( <PersistedContainer.Class> document ).createChild = () => {};
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );
			( <PersistedContainer.Class> document ).upload = () => {};
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );

			( <PersistedContainer.Class> document ).getMembers = () => {};
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"decorate",
			"Returns the PersistedDocuments decorated as a PersistedContainer", [
				{ name: "persistedDocument", type: "T extends Carbon.PersistedDocument.Class" }
			],
			{ "type": "T & Carbon.LDP.PersistedContainer.Class" }
		), ():void => {
			expect( PersistedContainer.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedContainer.Factory.decorate ) ).toBe( true );

			let document:PersistedDocument.Class;
			document = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );

			let persistedContainer:PersistedContainer.Class = PersistedContainer.Factory.decorate( document );
			expect( PersistedContainer.Factory.hasClassProperties( persistedContainer ) ).toBe( true );

			document = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );
			( <PersistedContainer.Class> document ).createChild = () => {};
			( <PersistedContainer.Class> document ).upload = () => {};
			( <PersistedContainer.Class> document ).getMembers = () => {};
			let anotherContainer:PersistedContainer.Class = PersistedContainer.Factory.decorate( document );

			expect( PersistedContainer.Factory.hasClassProperties( anotherContainer ) ).toBe( true );
			expect( anotherContainer.createChild ).not.toBe( persistedContainer.createChild );
			expect( anotherContainer.upload ).not.toBe( persistedContainer.upload );
			expect( anotherContainer.getMembers ).not.toBe( persistedContainer.getMembers );
		});

		describe( decoratedObject(
			"Object decorated by the Carbon.LDP.PersistedContainer.Factory.decorate function.", [
				"Carbon.LDP.PersistedContainer.Class",
			]
		), ():void => {

			let container:PersistedContainer.Class;

			beforeEach( ():void => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ):string {
						return uri;
					}
				}
				context = new MockedContext();
				let document = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );
				container = PersistedContainer.Factory.decorate( document );
			});

			describe( method(
				INSTANCE,
				"createChild"
			), ():void => {

				it( hasSignature( [
					{ name: "slug", type: "string" },
					{ name: "object", type: "Object" }
				],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( container.createChild ).toBeDefined();
					expect( Utils.isFunction( container.createChild ) ).toBeDefined();

					let spy = spyOn( container._documents, "createChild" );

					let document:Document.Class = Document.Factory.create();
					container.createChild( "child", document );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", "child", document );
				});

				it( hasSignature( [
						{ name: "object", type: "Object" }
					],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( container.createChild ).toBeDefined();
					expect( Utils.isFunction( container.createChild ) ).toBeDefined();

					let spy = spyOn( container._documents, "createChild" );

					let document:Document.Class = Document.Factory.create();
					container.createChild( document );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", document );
				});

			});

			describe( method(
				INSTANCE,
				"upload",
				"Upload a File to the server as a child of the Container."
			), ():void => {

				it( hasSignature( [
						{ name: "slug", type: "string" },
						{ name: "blob", type: "Blob" }
					],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( container.upload ).toBeDefined();
					expect( Utils.isFunction( container.upload ) ).toBeDefined();

					let spy = spyOn( container._documents, "upload" );

					let blob:Blob = new Blob( [ JSON.stringify( { "some content": "for the blob." } ) ], { type : "application/json" } );
					container.upload( "child", blob );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", "child", blob );
				});

				it( hasSignature( [
						{ name: "blob", type: "Blob" }
					],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( container.upload ).toBeDefined();
					expect( Utils.isFunction( container.upload ) ).toBeDefined();

					let spy = spyOn( container._documents, "upload" );

					let blob:Blob = new Blob( [ JSON.stringify( { "some content": "for the blob." } ) ], { type : "application/json" } );
					container.upload( blob );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", blob );
				});

			});

			it( hasMethod(
				INSTANCE,
				"getMembers", [
					{ name: "includeNonReadable", type: "boolean", optional: true, description: "By default this option is set to `true`." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( container.getMembers ).toBeDefined();
				expect( Utils.isFunction( container.getMembers ) ).toBeDefined();

				let spy = spyOn( container._documents, "getMembers" );

				container.getMembers();
				expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", true );
				spy.calls.reset();

				container.getMembers( false );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", false );
			});

		});

	});

});