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

			document = <PersistedDocument.Class> Utils.extend( document, {
				createChild: ():Promise<boolean> => {
					return new Promise( ( resolve:( result:boolean ) => void ) => {
						resolve( true );
					});
				},
				upload: ():Promise<boolean> => {
					return new Promise( ( resolve:( result:boolean ) => void ) => {
						resolve( true );
					});
				}
			});
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
			let createChild:Function = ():Promise<boolean> => {
				return new Promise( ( resolve:( result:boolean ) => void ) => {
					resolve( true );
				});
			};
			let upload:Function = ():Promise<boolean> => {
				return new Promise( ( resolve:( result:boolean ) => void ) => {
					resolve( true );
				});
			};

			document = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );
			document = <PersistedDocument.Class> Utils.extend( document, {
				createChild: createChild,
				upload: upload
			});
			let persistedDocument:PersistedContainer.Class = PersistedContainer.Factory.decorate( document );
			expect( PersistedContainer.Factory.hasClassProperties( persistedDocument ) ).toBe( true );
			expect( persistedDocument.createChild ).toBe( createChild );
			expect( persistedDocument.upload ).toBe( upload );

			document = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );
			persistedDocument = PersistedContainer.Factory.decorate( document );
			expect( PersistedContainer.Factory.hasClassProperties( persistedDocument ) ).toBe( true );
			expect( persistedDocument.createChild ).not.toBe( createChild );
			expect( persistedDocument.upload ).not.toBe( upload );
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
				jasmine.Ajax.install();
			});

			afterEach( ():void => {
				jasmine.Ajax.uninstall();
			});

			describe( method(
				INSTANCE,
				"addMember"
			), ():void => {

				it( hasSignature(
					"Add the specified resource Pointer as a member of the container.", [
						{ name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to add as a member." },
					],
					{ type: "Promise<Carbon.HTTP.Response.Class>" }
				), ():void => {
					expect( container.addMember ).toBeDefined();
					expect( Utils.isFunction( container.addMember ) ).toBeDefined();

					let spy = spyOn( container._documents, "addMember" );

					let pointer:Pointer.Class = context.documents.getPointer( "new-member/" );
					container.addMember( pointer );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", pointer );
				});

				it( hasSignature(
					"Add the specified resource URI as a member of the container.", [
						{ name: "memberURI", type: "string", description: "URI of the resource to add as a member." },
					],
					{ type: "Promise<Carbon.HTTP.Response.Class>" }
				), ():void => {
					expect( container.addMember ).toBeDefined();
					expect( Utils.isFunction( container.addMember ) ).toBeDefined();

					let spy = spyOn( container._documents, "addMember" );

					container.addMember( "new-member/" );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", "new-member/" );
				});

			});

			describe( method(
				INSTANCE,
				"createChild"
			), ():void => {

				it( hasSignature( [
					{ name: "slug", type: "string", description: "The slug name for the children URI." },
					{ name: "object", type: "Object", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one." }
				],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( container.createChild ).toBeDefined();
					expect( Utils.isFunction( container.createChild ) ).toBeDefined();

					let spy = spyOn( container._documents, "createChild" );

					let document:Document.Class = Document.Factory.create();
					container.createChild( "child", document );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", "child", document );
					spy.calls.reset();

					let object:Object = { my: "object" };
					container.createChild( "child", object );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", "child", object );
				});

				it( hasSignature( [
						{ name: "object", type: "Object", description: "The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one." }
					],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( container.createChild ).toBeDefined();
					expect( Utils.isFunction( container.createChild ) ).toBeDefined();

					let spy = spyOn( container._documents, "createChild" );

					let document:Document.Class = Document.Factory.create();
					container.createChild( document );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", document );
					spy.calls.reset();

					let object:Object = { my: "object" };
					container.createChild( object );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", object );
				});

				it( hasSignature( [
					{ name: "slug", type: "string", description: "The slug name for the children URI." }
				],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( container.createChild ).toBeDefined();
					expect( Utils.isFunction( container.createChild ) ).toBeDefined();

					let spy = spyOn( container._documents, "createChild" );

					container.createChild( "child" );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", "child", {} );
				});

				it( hasSignature(
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( container.createChild ).toBeDefined();
					expect( Utils.isFunction( container.createChild ) ).toBeDefined();

					let spy = spyOn( container._documents, "createChild" );

					container.createChild();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", {} );
				});

			});

			describe( method(
				INSTANCE,
				"upload",
				"Upload a File to the server as a child of the Container."
			), ():void => {

				it( hasSignature( [
						{ name: "slug", type: "string", description: "The slug name for the file URI." },
						{ name: "blob", type: "Blob", description: "Binary data to store in the server." }
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
						{ name: "blob", type: "Blob", description: "Binary data to store in the server." }
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

		});

	});

});