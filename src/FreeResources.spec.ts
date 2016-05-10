import {module, isDefined, clazz, hasMethod, STATIC, decoratedObject, hasProperty, INSTANCE, method, hasSignature} from "./test/JasmineExtender";
import AbstractContext from "./AbstractContext";
import Documents from "./Documents";
import * as Errors from "./Errors";
import * as Pointer from "./Pointer";
import * as Resource from "./Resource";
import * as URI from "./RDF/URI";
import * as Utils from "./Utils";

import * as FreeResources from "./FreeResources";

describe( module( "Carbon/FreeResources" ), ():void => {

	it( isDefined(), ():void => {
		expect( FreeResources ).toBeDefined();
		expect( Utils.isObject( FreeResources ) ).toBe( true );
	});

	describe( clazz( "Carbon.FreeResources.Factory", "Factory class for `Carbon.FreeResources.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( FreeResources.Factory ).toBeDefined();
			expect( Utils.isFunction( FreeResources.Factory ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"hasClassProperties",
			"Returns true if the object provided has the properties of a `Carbon.FreeResources.Class` object.", [
				{ name: "object", type: "Object" }
			],
			{ type: "boolean" }
		), ():void => {
			expect( FreeResources.Factory.hasClassProperties ).toBeDefined();
			expect( Utils.isFunction( FreeResources.Factory.hasClassProperties ) ).toBe( true );

			let object:any;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object = {};
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object._documents = null;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object._resourcesIndex = null;
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.hasResource = () => {};
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.getResource = () => {};
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.getResources = () => {};
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.createResource = () => {};
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.hasPointer = () => {};
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.getPointer = () => {};
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( false );
			object.inScope = () => {};
			expect( FreeResources.Factory.hasClassProperties( object ) ).toBe( true );
		});

		it( hasMethod(
			STATIC,
			"create",
			"Creates a empty `Carbon.FreeResources.Class` object.", [
				{ name: "documents", type: "Carbon.Documents", description: "A `Carbon.Documents` object where the FreeResources scope is."}
			],
			{ type: "Carbon.FreeResources.Class" }
		), ():void => {
			expect( FreeResources.Factory.create ).toBeDefined();
			expect( Utils.isFunction( FreeResources.Factory.create ) ).toBe( true );

			let documents:Documents = new Documents();
			let freeResources:FreeResources.Class = FreeResources.Factory.create( documents );

			expect( freeResources ).toBeTruthy();
			expect( FreeResources.Factory.hasClassProperties( freeResources ) );
		});

		it( hasMethod(
			STATIC,
			"createFrom",
			"Create a `Carbon.FreeResources.Class` object from the plain object provided.", [
				{ name: "object", type: "T extends Object", description: "The object that wants be converted in a `Carbon.FreeResources.Class`." },
				{ name: "documents", type: "Carbon.Documents.Class", description: "A `Carbon.Documents` object where the FreeResource scope is." }
			],
			{ type: "Carbon.FreeResources.Class & T" }
		), ():void => {
			expect( FreeResources.Factory.createFrom ).toBeDefined();
			expect( Utils.isFunction( FreeResources.Factory.createFrom ) ).toBe( true );

			let documents:Documents = new Documents();

			let freeResources:FreeResources.Class = FreeResources.Factory.createFrom( {}, documents );
			expect( freeResources ).toBeTruthy();
			expect( FreeResources.Factory.hasClassProperties( freeResources ) );

			interface My { myProperty:string }
			let myFreeResources:FreeResources.Class & My = FreeResources.Factory.createFrom( { myProperty: "The property" }, documents );
			expect( myFreeResources ).toBeTruthy();
			expect( FreeResources.Factory.hasClassProperties( myFreeResources ) );
			expect( myFreeResources.myProperty ).toBeDefined();
			expect( myFreeResources.myProperty ).toBe( "The property" );
		});

		it( hasMethod(
			STATIC,
			"decorate",
			"Decorate the object provided with the methods and properties of a `Carbon.FreeResources.Class` object.", [
				{ name: "object", type: "T extends Object" }
			],
			{ type: "Carbon.FreeResources.Class & T" }
		), ():void => {
			expect( FreeResources.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( FreeResources.Factory.decorate ) ).toBe( true );

			let fx:Function = () => null;
			let object:any = {
				_documents: null,
				_resourcesIndex: null,
				hasResource: fx,
				getResource: fx,
				getResources: fx,
				createResource: fx,
				hasPointer: fx,
				getPointer: fx,
				inScope: fx
			};
			let freeResources:FreeResources.Class = FreeResources.Factory.decorate( object );
			expect( freeResources ).toBeTruthy();
			expect( FreeResources.Factory.hasClassProperties( freeResources ) ).toBe( true );
			expect( freeResources._resourcesIndex ).toBeNull();
			expect( freeResources.hasResource ).toBe( fx );
			expect( freeResources.getResources ).toBe( fx );

			interface My { myProperty:string; }
			let anotherFreeResources:FreeResources.Class & My = FreeResources.Factory.decorate<My>( { myProperty: "The property" } );
			expect( anotherFreeResources ).toBeTruthy();
			expect( anotherFreeResources._resourcesIndex ).not.toBeNull();
			expect( anotherFreeResources.hasResource ).not.toBe( fx );
			expect( anotherFreeResources.getResources ).not.toBe( fx );

			expect( FreeResources.Factory.hasClassProperties( anotherFreeResources ) ).toBe( false );
			anotherFreeResources._documents = null;
			expect( FreeResources.Factory.hasClassProperties( anotherFreeResources ) ).toBe( true );
		});


		describe( decoratedObject(
			"Object decorated by the Carbon.FreeResources.Factory.decorate function.", [
				"Carbon.FreeResources.Class",
			]
		), ():void => {
			let freeResources:FreeResources.Class;
			let documents:Documents;

			beforeEach( ():void => {
				class MockedContext extends AbstractContext {
					resolve( uri:string ) {
						return "http://example.com/" + uri;
					}
				}
				documents = new Documents( new MockedContext() );

				freeResources = FreeResources.Factory.create( documents );
			});

			it( hasProperty(
				INSTANCE,
				"_documents",
				"Private property that contains the Documents class where the object scope is.",
				"Carbon.Documents"
			), ():void => {
				expect( freeResources._documents ).toBeDefined();
				expect( freeResources._documents instanceof Documents ).toBe( true );
			});

			it( hasProperty(
				INSTANCE,
				"_resourcesIndex",
				"Private property that contains the references of every free resource in a map form.",
				"Map<string, Carbon.Resource.Class>"
			), ():void => {
				expect( freeResources._resourcesIndex ).toBeDefined();
				expect( freeResources._resourcesIndex instanceof Map ).toBe( true );
			});

			it( hasMethod(
				INSTANCE,
				"hasResource",
				"Returns true if exists a resource with the ID specified.", [
					{ name: "id", type: "string", description: "The ID of the resource to seek for." }
				],
				{ type: "boolean" }
			), ():void => {
				expect( freeResources.hasResource ).toBeDefined();
				expect( Utils.isFunction( freeResources.hasResource ) ).toBe( true );

				expect( freeResources.hasResource( "_:any..." ) ).toBe( false );

				let resource:Resource.Class & { val:string } = Resource.Factory.createFrom( { val: "The resource" } );
				freeResources._resourcesIndex.set( "_:some", resource );
				expect( freeResources.hasResource( "_:some" ) ).toBe( true );

				expect( freeResources.hasResource( "_:any..." ) ).toBe( false );
			});

			it( hasMethod(
				INSTANCE,
				"getResource",
				"Returns the resource referred by the ID provided. If no resource exists with the ID specified `null` is returned.", [
					{ name: "id", type: "string", description: "The ID of the resource to seek for." }
				],
				{ type: "Carbon.Resource.Class" }
			), ():void => {
				expect( freeResources.getResource ).toBeDefined();
				expect( Utils.isFunction( freeResources.getResource ) ).toBe( true );


				expect( freeResources.getResource( "_:any..." ) ).toBeNull();

				let resource:Resource.Class & { val:string } = Resource.Factory.createFrom( { val: "The resource" }, "_:some" );
				freeResources._resourcesIndex.set( "_:some", resource );
				expect( freeResources.getResource( "_:some" ) ).toBe( resource );

				expect( freeResources.getResource( "_:any..." ) ).toBeNull();
			});
			
			it( hasMethod(
				INSTANCE,
				"getResources",
				"Returns an array with all the resources inside the FreeResources object",
				{ type: "Carbon.Resource.Class[]" }
			), ():void => {
				expect( freeResources.getResources ).toBeDefined();
				expect( Utils.isFunction( freeResources.getResources ) ).toBe( true );

				let resources:Resource.Class[];

				resources = freeResources.getResources();
				expect( resources ).toBeTruthy();
				expect( Utils.isArray( resources ) ).toBe( true );
				expect( resources.length ).toBe( 0 );

				freeResources._resourcesIndex.set( "_:some", Resource.Factory.create( "_:some" ) );
				freeResources._resourcesIndex.set( "_:another", Resource.Factory.create( "_:another" ) );
				resources = freeResources.getResources();
				expect( resources ).toBeTruthy();
				expect( Utils.isArray( resources ) ).toBe( true );
				expect( resources.length ).toBe( 2 );
				expect( resources[ 0 ].id ).toBe( "_:some" );
				expect( resources[ 1 ].id ).toBe( "_:another" );
			});
			
			it( hasMethod(
				INSTANCE,
				"createResource",
				"Create an returns a new Free Resource. Throw an Error if no valid id if provided or if it is already in use.", [
					{ name: "id", type: "string", optional: true, description: "The ID of the resource to create. It should be an ID as a BlankNode." }
				],
				{ type: "Carbon.Resource.Class" }
			), ():void => {
				expect( freeResources.createResource ).toBeDefined();
				expect( Utils.isFunction( freeResources.createResource ) ).toBe( true );
				
				let resource00:Resource.Class;
				resource00 = freeResources.createResource();
				expect( resource00 ).toBeTruthy();
				expect( URI.Util.isBNodeID( resource00.id ) ).toBe( true );

				let resource01:Resource.Class;
				resource01 = freeResources.createResource();
				expect( resource01 ).toBeTruthy();
				expect( URI.Util.isBNodeID( resource01.id ) ).toBe( true );
				expect( resource00.id ).not.toBe( resource01.id );
				
				let resource02:Resource.Class;
				resource02 = freeResources.createResource( "_:some" );
				expect( resource02 ).toBeTruthy();
				expect( URI.Util.isBNodeID( resource02.id ) ).toBe( true );
				expect( resource02.id ).toBe( "_:some" );
				
				expect( () => freeResources.createResource( "no-valid-id") ).toThrowError( Errors.IllegalArgumentError );
				expect( () => freeResources.createResource( "_:some") ).toThrowError( Errors.IDAlreadyInUseError );
			});
			
			it( hasMethod(
				INSTANCE,
				"hasPointer",
				"Returns true if exists a pointer in the scope of the FreeResources object and its parents.",
				{ type: "boolean" }
			), ():void => {
				expect( freeResources.hasPointer ).toBeDefined();
				expect( Utils.isFunction( freeResources.hasPointer ) ).toBe( true );
				
				expect( freeResources.hasPointer( "_:some" ) ).toBe( false );
				
				freeResources._resourcesIndex.set( "_:some", Resource.Factory.create( "_:some" ) );
				expect( freeResources.hasPointer( "_:some" ) ).toBe( true );
				
				expect( freeResources.hasPointer( "http://example.com/some/" ) ).toBe( false );

				documents.getPointer( "http://example.com/some/" );
				expect( freeResources.hasPointer( "http://example.com/some/" ) ).toBe( true );
			});

			it( hasMethod(
				INSTANCE,
				"getPointer",
				"Returns the pointer referred by the id specified, or creates one if no pointer exists in the scope.", [
					{ name: "id", type: "string", description: "The ID of the pointer seek for or the one to create." }
				],
				{ type: "Carbon.Pointer.Class" }
			), ():void => {
				expect( freeResources.getPointer ).toBeDefined();
				expect( Utils.isFunction( freeResources.getPointer ) ).toBe( true );

				let resource:Resource.Class = Resource.Factory.create( "_:some" );
				freeResources._resourcesIndex.set( "_:some",  resource );
				expect( freeResources.getPointer( "_:some" ) ).toBe( resource );

				let pointer:Pointer.Class = freeResources.getPointer( "_:another" );
				expect( pointer ).toBeTruthy();
				expect( pointer.id ).toBe( "_:another" );
				expect( freeResources._resourcesIndex.get( "_:another" ) ).toBe( pointer );

				pointer = freeResources.getPointer( "http://example.com/some/" );
				expect( pointer ).toBeTruthy();
				expect( documents.getPointer( "http://example.com/some/" ) ).toBe( pointer );
			});

			describe( method(
				INSTANCE,
				"inScope"
			), ():void => {

				it( isDefined(), ():void => {
					expect( freeResources.inScope ).toBeDefined();
					expect( Utils.isFunction( freeResources.inScope ) ).toBe( true );
				});

				it( hasSignature(
					"Returns true if the the ID provided is in the scope of the object.", [
						{ name: "id", type: "string", description: "The ID to evaluate if is in the scope." }
					],
					{ type: "boolean" }
				), ():void => {
					expect( freeResources.inScope( "_:some" ) ).toBe( true );
					expect( freeResources.inScope( "http://example.com/some/" ) ).toBe( true );

					expect( freeResources.inScope( "some/" ) ).toBe( false );
				});

				it( hasSignature(
					"Returns true if the the Pointer provided can be in the scope of the object.", [
						{ name: "pointer", type: "Carbon.Pointer.Class", description: "The Pointer to evaluate if can be in the scope." }
					],
					{ type: "boolean" }
				), ():void => {
					expect( freeResources.inScope( Pointer.Factory.create( "_:some" ) ) ).toBe( true );
					expect( freeResources.inScope( Pointer.Factory.create( "http://example.com/some/" ) ) ).toBe( true );

					expect( freeResources.inScope( Pointer.Factory.create( "some/" ) ) ).toBe( false );
				});

			});

		});

	});

});