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
			document = Document.Factory.create( "http://example.com/resource/" );
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );

			document = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );
			expect( PersistedContainer.Factory.hasClassProperties( document ) ).toBe( false );

			document = <PersistedDocument.Class> Utils.extend( document, {
				createChild: ():Promise<boolean> => {
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

			document = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );
			document = <PersistedDocument.Class> Utils.extend( document, {
				createChild: createChild
			});
			let persistedDocument:PersistedContainer.Class = PersistedContainer.Factory.decorate( document );
			expect( PersistedContainer.Factory.hasClassProperties( persistedDocument ) ).toBe( true );
			expect( persistedDocument.createChild ).toBe( createChild );

			document = PersistedDocument.Factory.create( "http://example.com/resource/", context.documents );
			persistedDocument = PersistedContainer.Factory.decorate( document );
			expect( PersistedContainer.Factory.hasClassProperties( persistedDocument ) ).toBe( true );
			expect( persistedDocument.createChild ).not.toBe( createChild );
		});

		describe( decoratedObject(
			"Object decorated by the Carbon.LDP.PersistedContainer.Factory.decorate function.", [
				"Carbon.LDP.PersistedContainer.Class"
			]
		), ():void => {

			describe( method(
				INSTANCE,
				"createChild"
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

				it( hasSignature( [
					{ name: "slug", type: "string" },
					{ name: "object", type: "Object" }
				],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ( done:{ ():void, fail:() => void } ):void => {
					expect( container.createChild ).toBeDefined();
					expect( Utils.isFunction( container.createChild ) ).toBeDefined();

					let promises:Promise<any>[] = [];
					let promise:Promise<[ Pointer.Class, HTTP.Response.Class ]>;
					let document:Document.Class;
					let spies = {
						success: ( [ pointer, response ]:[ Pointer.Class, HTTP.Response.Class ] ):void => {
							expect( pointer.id ).toBe( "http://example.com/resource/child/" );
						},
						fail: ():void => {
						}
					};
					let successSpy = spyOn( spies, "success").and.callThrough();
					let failSpy = spyOn( spies, "fail").and.callThrough();

					document = Document.Factory.create();
					promise = container.createChild( 'child', document );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success, spies.fail ) );

					jasmine.Ajax.requests.mostRecent().respondWith({
						status: 201,
						responseHeaders: {
							"Location": "http://example.com/resource/child/",
						},
						responseText: "{}"
					});

					Promise.all( promises ).then( ():void => {
						expect( successSpy.calls.count() ).toBe( 1 );
						expect( failSpy.calls.count() ).toBe( 0 );
						done();
					}, done.fail );

					// TODO wait TODO's from Carbon.LDP.PersistedContainer file.
				});

				it( hasSignature( [
					{ name: "slug", type: "string" }
				],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ( done:{ ():void, fail:() => void } ):void => {
					expect( container.createChild ).toBeDefined();
					expect( Utils.isFunction( container.createChild ) ).toBeDefined();

					done();
					// TODO wait TODO's from Carbon.LDP.PersistedContainer file.
				});

				it( hasSignature( [
						{ name: "object", type: "Object" }
					],
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ( done:{ ():void, fail:() => void } ):void => {
					expect( container.createChild ).toBeDefined();
					expect( Utils.isFunction( container.createChild ) ).toBeDefined();

					let promises:Promise<any>[] = [];
					let promise:Promise<[ Pointer.Class, HTTP.Response.Class ]>;
					let document:Document.Class;
					let spies = {
						success: ( [ pointer, response ]:[ Pointer.Class, HTTP.Response.Class ] ):void => {
							expect( pointer.id ).toBe( "http://example.com/resource/auto-generated-child-ID/" );
						},
						fail: ():void => {
						}
					};
					let successSpy = spyOn( spies, "success").and.callThrough();
					let failSpy = spyOn( spies, "fail").and.callThrough();

					document = Document.Factory.create();
					promise = container.createChild( document );
					expect( promise instanceof Promise ).toBe( true );
					promises.push( promise.then( spies.success, spies.fail ) );

					jasmine.Ajax.requests.mostRecent().respondWith({
						status: 201,
						responseHeaders: {
							"Location": "http://example.com/resource/auto-generated-child-ID/",
						},
						responseText: "{}"
					});

					Promise.all( promises ).then( ():void => {
						expect( successSpy.calls.count() ).toBe( 1 );
						expect( failSpy.calls.count() ).toBe( 0 );
						done();
					}, done.fail );

					// TODO wait TODO's from Carbon.LDP.PersistedContainer file.
				});

				it( hasSignature(
					{ type: "Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>" }
				), ( done:{ ():void, fail:() => void } ):void => {
					expect( container.createChild ).toBeDefined();
					expect( Utils.isFunction( container.createChild ) ).toBeDefined();

					done();

					// TODO wait TODO's from Carbon.LDP.PersistedContainer file.
				});

			});

		});

	});

});