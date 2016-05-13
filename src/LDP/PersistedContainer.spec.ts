import {
	STATIC,
	INSTANCE,

	module,
	clazz,
	method,

	isDefined,
	hasMethod,
	hasSignature,
	decoratedObject
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";
import * as Pointer from "./../Pointer";
import * as Document from "./../Document";
import * as PersistedDocument from "./../PersistedDocument";
import * as RetrievalPreferences from "./../RetrievalPreferences";
import AbstractContext from "./../AbstractContext";

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

			let document:any;
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );

			document = {
				addMember: () => {},
				addMembers: () => {},
				createChild: () => {},
				listChildren: () => {},
				getChildren: () => {},
				listMembers: () => {},
				getMembers: () => {},
				removeMember: () => {},
				removeMembers: () => {},
				removeAllMembers: () => {},
				upload: () => {},
			};
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( true );

			delete document.addMember;
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );
			document.addMember = () => {};

			delete document.addMembers;
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );
			document.addMembers = () => {};

			delete document.createChild;
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );
			document.createChild = () => {};

			delete document.listChildren;
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );
			document.listChildren = () => {};

			delete document.getChildren;
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );
			document.getChildren = () => {};

			delete document.listMembers;
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );
			document.listMembers = () => {};

			delete document.getMembers;
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );
			document.getMembers = () => {};

			delete document.removeMember;
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );
			document.removeMember = () => {};

			delete document.removeMembers;
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );
			document.removeMembers = () => {};

			delete document.removeAllMembers;
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );
			document.removeAllMembers = () => {};

			delete document.upload;
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );
			document.upload = () => {};
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

			let document:any;
			document = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );

			let persistedContainer:PersistedContainer.Class = PersistedContainer.Factory.decorate( document );
			expect( PersistedContainer.Factory.hasClassProperties( persistedContainer ) ).toBe( true );

			let fx = () => {};
			document = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );
			document.addMember = fx;
			document.addMembers = fx;
			document.createChild = fx;
			document.listChildren = fx;
			document.getChildren = fx;
			document.listMembers = fx;
			document.getMembers = fx;
			document.removeMember = fx;
			document.removeMembers = fx;
			document.removeAllMembers = fx;
			document.upload = fx;

			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( true );
			let anotherContainer:PersistedContainer.Class = PersistedContainer.Factory.decorate( document );
			expect( PersistedContainer.Factory.hasClassProperties( anotherContainer ) ).toBe( true );
			expect( anotherContainer.addMember ).toBe( fx );
			expect( anotherContainer.addMembers ).toBe( fx );
			expect( anotherContainer.createChild ).toBe( fx );
			expect( anotherContainer.listChildren ).toBe( fx );
			expect( anotherContainer.getChildren ).toBe( fx );
			expect( anotherContainer.listMembers ).toBe( fx );
			expect( anotherContainer.getMembers ).toBe( fx );
			expect( anotherContainer.removeMember ).toBe( fx );
			expect( anotherContainer.removeMembers ).toBe( fx );
			expect( anotherContainer.removeAllMembers ).toBe( fx );
			expect( anotherContainer.upload ).toBe( fx );


			delete document.addMember;
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );
			let anotherAnotherContainer:PersistedContainer.Class = PersistedContainer.Factory.decorate( document );
			expect( PersistedContainer.Factory.hasClassProperties( anotherAnotherContainer ) ).toBe( true );
			expect( anotherAnotherContainer.addMember ).not.toBe( fx );
			expect( anotherAnotherContainer.addMembers ).not.toBe( fx );
			expect( anotherAnotherContainer.createChild ).not.toBe( fx );
			expect( anotherAnotherContainer.listChildren ).not.toBe( fx );
			expect( anotherAnotherContainer.getChildren ).not.toBe( fx );
			expect( anotherAnotherContainer.listMembers ).not.toBe( fx );
			expect( anotherAnotherContainer.getMembers ).not.toBe( fx );
			expect( anotherAnotherContainer.removeMember ).not.toBe( fx );
			expect( anotherAnotherContainer.removeMembers ).not.toBe( fx );
			expect( anotherAnotherContainer.removeAllMembers ).not.toBe( fx );
			expect( anotherAnotherContainer.upload ).not.toBe( fx );
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

			it( hasMethod(
				INSTANCE,
				"addMembers",
				"Add the specified resources URI or Pointers as members of the container.", [
					{ name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to add as members" },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( container.addMembers ).toBeDefined();
				expect( Utils.isFunction( container.addMembers ) ).toBeDefined();

				let spy = spyOn( container._documents, "addMembers" );

				let pointers:Pointer.Class[] = [];
				pointers.push( context.documents.getPointer( "new-member/" ) );
				container.addMembers( pointers );

				expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", pointers );
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

			it( hasMethod(
				INSTANCE,
				"listChildren",
				"Return all the children of the container.",
				{ type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response ]>" }
			), ():void => {
				expect( container.listChildren ).toBeDefined();
				expect( Utils.isFunction( container.listChildren ) ).toBeDefined();

				let spy = spyOn( container._documents, "listChildren" );

				container.listChildren();
				expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/" );
			});

			it( hasMethod(
				INSTANCE,
				"getChildren",
				"Return all the children of the container.", [
					{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true },
				],
				{ type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response ]>" }
			), ():void => {
				expect( container.getChildren ).toBeDefined();
				expect( Utils.isFunction( container.getChildren ) ).toBeDefined();

				let spy = spyOn( container._documents, "getChildren" );

				container.getChildren();
				expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", undefined );
				spy.calls.reset();


				let retrievalPreferences:RetrievalPreferences.Class = {
					limit: 10,
					offset: 0,
					orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ]
				};
				container.getChildren( retrievalPreferences );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", retrievalPreferences );
			});

			it( hasMethod(
				INSTANCE,
				"listMembers", [
					{ name: "includeNonReadable", type: "boolean", optional: true, description: "By default this option is set to `true`." },
				],
				{ type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }
			), ():void => {
				expect( container.listMembers ).toBeDefined();
				expect( Utils.isFunction( container.listMembers ) ).toBeDefined();

				let spy = spyOn( container._documents, "listMembers" );

				container.listMembers();
				expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", true );
				spy.calls.reset();

				container.listMembers( false );
				expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", false );
			});

			describe( method(
				INSTANCE,
				"getMembers"
			), ():void => {

				it( hasSignature( [
						{ name: "includeNonReadable", type: "boolean", optional: true, description: "By default this option is set to `true`." },
						{ name: "retrievalPreferences", type: "Carbon.RetrievalPreferences.Class", optional: true },
					],
					{ type: "Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( container.getMembers ).toBeDefined();
					expect( Utils.isFunction( container.getMembers ) ).toBeDefined();

					let spy = spyOn( container._documents, "getMembers" );

					container.getMembers();
					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", true, undefined );
					spy.calls.reset();

					container.getMembers( false );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", false, undefined );
					spy.calls.reset();

					let retrievalPreferences:RetrievalPreferences.Class = {
						limit: 10,
						offset: 0,
						orderBy: [ { "@id": "http://example.com/ns#string", "@type": "string" } ]
					};

					container.getMembers( false, retrievalPreferences );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", false, retrievalPreferences );
					spy.calls.reset();

					container.getMembers( true, retrievalPreferences );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", true, retrievalPreferences );
					spy.calls.reset();

					container.getMembers( retrievalPreferences );
					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", retrievalPreferences, undefined );
					spy.calls.reset();
				});

			});

			describe( method(
				INSTANCE,
				"removeMember"
			), ():void => {

				it( hasSignature(
					"Remove the specified resource Pointer as a member of the container.", [
						{ name: "member", type: "Carbon.Pointer.Class", description: "Pointer object that references the resource to remove as a member." },
					],
					{ type: "Promise<Carbon.HTTP.Response.Class>" }
				), ():void => {
					expect( container.removeMember ).toBeDefined();
					expect( Utils.isFunction( container.removeMember ) ).toBeDefined();

					let spy = spyOn( container._documents, "removeMember" );

					let pointer:Pointer.Class = context.documents.getPointer( "remove-member/" );
					container.removeMember( pointer );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", pointer );
				});

				it( hasSignature(
					"Remove the specified resource URI as a member of the container.", [
						{ name: "memberURI", type: "string", description: "URI of the resource to remove as a member." },
					],
					{ type: "Promise<Carbon.HTTP.Response.Class>" }
				), ():void => {
					expect( container.removeMember ).toBeDefined();
					expect( Utils.isFunction( container.removeMember ) ).toBeDefined();

					let spy = spyOn( container._documents, "removeMember" );

					container.removeMember( "remove-member/" );

					expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", "remove-member/" );
				});

			});

			it( hasMethod(
				INSTANCE,
				"removeMembers",
				"Remove the specified resources URI or Pointers as members of the container.", [
					{ name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to remove as members" },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( container.removeMembers ).toBeDefined();
				expect( Utils.isFunction( container.removeMembers ) ).toBeDefined();

				let spy = spyOn( container._documents, "removeMembers" );

				let pointers:Pointer.Class[] = [];
				pointers.push( context.documents.getPointer( "remove-member/" ) );
				container.removeMembers( pointers );

				expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", pointers );
			});

			it( hasMethod(
				INSTANCE,
				"removeAllMembers",
				"Remove the specified resources URI or Pointers as members of the container.", [
					{ name: "members", type: "(Carbon.Pointer.Class | string)[]", description: "Array of string URIs or Pointers to remove as members" },
				],
				{ type: "Promise<Carbon.HTTP.Response.Class>" }
			), ():void => {
				expect( container.removeAllMembers ).toBeDefined();
				expect( Utils.isFunction( container.removeAllMembers ) ).toBeDefined();

				let spy = spyOn( container._documents, "removeAllMembers" );

				container.removeAllMembers();

				expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/" );
			});

			describe( method(
				INSTANCE,
				"upload",
				"Upload a File to the server as a child of the Container."
			), ():void => {

				it( hasSignature( [
						{ name: "slug", type: "string", description: "The slug that will be used in the URI of the data." },
						{ name: "data", type: "Blob", description: "Binary data to store in the server. The Blob works in a Browser." }
					],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( container.upload ).toBeDefined();
					expect( Utils.isFunction( container.upload ) ).toBeDefined();

					if ( typeof Blob !== "undefined" ) {
						let spy = spyOn( container._documents, "upload" );

						let blob:Blob = new Blob( [ JSON.stringify( { "some content": "for the blob." } ) ], { type : "application/json" } );
						container.upload( "child", blob );

						expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", "child", blob );
					}
				});

				it( hasSignature( [
						{ name: "data", type: "Blob", description: "Binary data to store in the server. The Blob works in a Browser." }
					],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( container.upload ).toBeDefined();
					expect( Utils.isFunction( container.upload ) ).toBeDefined();

					if ( typeof Blob !== "undefined" ) {
						let spy = spyOn( container._documents, "upload" );

						let blob:Blob = new Blob( [ JSON.stringify( { "some content": "for the blob." } ) ], { type : "application/json" } );
						container.upload( blob );

						expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", blob );
					}
				});

				it( hasSignature( [
						{ name: "slug", type: "string", description: "The slug that will be used in the URI of the data." },
						{ name: "data", type: "Buffer", description: "Binary data to store in the server. The Buffer only works in Node.js." }
					],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( container.upload ).toBeDefined();
					expect( Utils.isFunction( container.upload ) ).toBeDefined();

					if ( typeof Buffer !== "undefined" ) {
						let spy = spyOn( container._documents, "upload" );

						let buffer:Buffer = new Buffer( JSON.stringify( { "some content": "for the buffer." } ) );
						container.upload( "child", buffer );

						expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", "child", buffer );
					}
				});

				it( hasSignature( [
						{ name: "data", type: "Buffer", description: "Binary data to store in the server. The Buffer only works in Node.js." }
					],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ():void => {
					expect( container.upload ).toBeDefined();
					expect( Utils.isFunction( container.upload ) ).toBeDefined();

					if ( typeof Buffer !== "undefined" ) {
						let spy = spyOn( container._documents, "upload" );

						let buffer:Buffer = new Buffer( JSON.stringify( { "some content": "for the buffer." } ) );
						container.upload( buffer );

						expect( spy ).toHaveBeenCalledWith( "http://example.com/resource/", buffer );
					}
				});

			});

		});

	});

});