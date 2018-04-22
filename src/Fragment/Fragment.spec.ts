import { AbstractContext } from "../AbstractContext";
import { Document } from "../Document";

import { Resource } from "../Resource";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import * as Utils from "../Utils";

import { Fragment } from "./Fragment";
import { TransientFragment } from "./TransientFragment";

describe( module( "carbonldp/Fragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Fragment",
		"Interface that represents a persisted fragment of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.Resource" ), ():void => {} );
		it( extendsClass( "CarbonLDP.TransientFragment" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"_document",
			"CarbonLDP.Document",
			"A reference to the persisted document the current fragment belongs to."
		), ():void => {} );

	} );

	describe( interfaze(
		"CarbonLDP.FragmentFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.Fragment` object."
	), ():void => {

		it( hasMethod(
			OBLIGATORY,
			"isDecorated", [
				{ name: "object", type: "object" },
			],
			{ type: "object is CarbonLDP.Fragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"is", [
				{ name: "value", type: "any" },
			],
			{ type: "value is CarbonLDP.Fragment" }
		), ():void => {} );

		it( hasMethod(
			OBLIGATORY,
			"decorate",
			[ "T extends object" ],
			"Decorates the object provided with the properties and methods of a `CarbonLDP.Fragment` object.",
			[
				{ name: "object", type: "object", description: "The object to convert into a persisted fragment." },
			]
		), ():void => {} );

	} );

	describe( property(
		STATIC,
		"Fragment",
		"CarbonLDP.FragmentFactory",
		"Constant that implements the `CarbonLDP.FragmentFactory` interface."
	), ():void => {

		it( isDefined(), ():void => {
			expect( Fragment ).toBeDefined();
			expect( Fragment ).toEqual( jasmine.any( Object ) );
		} );

		// TODO: Test `Fragment.isDecorated`

		// TODO: Test `Fragment.is`

		// TODO: Separate in different tests
		it( "Fragment.decorate", ():void => {
			expect( Fragment.decorate ).toBeDefined();
			expect( Utils.isFunction( Fragment.decorate ) ).toBe( true );

			let spyPersistedDecorator:jasmine.Spy = spyOn( Resource, "decorate" );

			let fragment:TransientFragment = TransientFragment.create( {
				_document: null,
				id: "_:01",
			} );
			let persistedFragment:Fragment = Fragment.decorate( fragment );

			expect( persistedFragment ).toBeTruthy();
			expect( spyPersistedDecorator ).toHaveBeenCalledWith( fragment );
		} );

		// TODO: Test `Fragment.create`

		// TODO: Test `Fragment.createFrom`

		describe( "Fragment instance", ():void => {

			let persistedFragment:Fragment;
			beforeEach( ():void => {
				class MockedContext extends AbstractContext {
					protected _baseURI:string;

					constructor() {
						super();
						this._baseURI = "http://example.com/";
						this.settings = {
							vocabulary: "http://example.com/vocab#",
							paths: { system: ".system/" },
						};
					}
				}

				let context:AbstractContext = new MockedContext();
				context.extendObjectSchema( {
					"exTypes": "http://example.com/types#",
					"another": "http://example.com/another-url/ns#",
				} );

				context.documents.getPointer( "http://example.com/in/documents/" );

				let fragment:TransientFragment = TransientFragment.create( {
					_document: Document.create( context.documents, "http://example.com/document/" ),
				} );
				persistedFragment = Fragment.decorate( fragment );
			} );

			// TODO: Separate in different tests
			it( "Fragment.addType", ():void => {
				expect( persistedFragment.addType ).toBeDefined();
				expect( Utils.isFunction( persistedFragment.addType ) ).toBe( true );

				expect( persistedFragment.types.length ).toBe( 0 );

				persistedFragment.addType( "http://example.com/types#Type-1" );
				expect( persistedFragment.types.length ).toBe( 1 );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-1" );

				persistedFragment.addType( "http://example.com/types#Type-2" );
				expect( persistedFragment.types.length ).toBe( 2 );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-1" );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-2" );

				persistedFragment.addType( "exTypes:Type-3" );
				expect( persistedFragment.types.length ).toBe( 3 );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-1" );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-2" );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-3" );

				persistedFragment.addType( "another:Type-0" );
				expect( persistedFragment.types.length ).toBe( 4 );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-1" );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-2" );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-3" );
				expect( persistedFragment.types ).toContain( "http://example.com/another-url/ns#Type-0" );

				persistedFragment.addType( "Current-Type" );
				expect( persistedFragment.types.length ).toBe( 5 );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-1" );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-2" );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-3" );
				expect( persistedFragment.types ).toContain( "http://example.com/another-url/ns#Type-0" );
				expect( persistedFragment.types ).toContain( "http://example.com/vocab#Current-Type" );
			} );

			// TODO: Separate in different tests
			it( "Fragment.hasType", ():void => {
				expect( persistedFragment.hasType ).toBeDefined();
				expect( Utils.isFunction( persistedFragment.hasType ) ).toBe( true );

				persistedFragment.types = [ "http://example.com/types#Type-1" ];
				expect( persistedFragment.hasType( "http://example.com/types#Type-1" ) ).toBe( true );
				expect( persistedFragment.hasType( "exTypes:Type-1" ) ).toBe( true );
				expect( persistedFragment.hasType( "http://example.com/types#Type-2" ) ).toBe( false );


				persistedFragment.types = [ "http://example.com/types#Type-1", "http://example.com/types#Type-2" ];
				expect( persistedFragment.hasType( "http://example.com/types#Type-1" ) ).toBe( true );
				expect( persistedFragment.hasType( "exTypes:Type-1" ) ).toBe( true );
				expect( persistedFragment.hasType( "http://example.com/types#Type-2" ) ).toBe( true );
				expect( persistedFragment.hasType( "exTypes:Type-2" ) ).toBe( true );
				expect( persistedFragment.hasType( "http://example.com/types#Type-3" ) ).toBe( false );
				expect( persistedFragment.hasType( "exTypes:#Type-3" ) ).toBe( false );

				persistedFragment.types = [ "http://example.com/types#Type-1", "http://example.com/another-url/ns#Type-2" ];
				expect( persistedFragment.hasType( "http://example.com/types#Type-1" ) ).toBe( true );
				expect( persistedFragment.hasType( "exTypes:Type-1" ) ).toBe( true );
				expect( persistedFragment.hasType( "another:Type-1" ) ).toBe( false );
				expect( persistedFragment.hasType( "http://example.com/another-url/ns#Type-2" ) ).toBe( true );
				expect( persistedFragment.hasType( "exTypes:Type-2" ) ).toBe( false );
				expect( persistedFragment.hasType( "another:Type-2" ) ).toBe( true );

				persistedFragment.types = [ "http://example.com/types#Type-1", "http://example.com/another-url/ns#Type-2", "http://example.com/vocab#Current-Type" ];
				expect( persistedFragment.hasType( "http://example.com/types#Type-1" ) ).toBe( true );
				expect( persistedFragment.hasType( "exTypes:Type-1" ) ).toBe( true );
				expect( persistedFragment.hasType( "another:Type-1" ) ).toBe( false );
				expect( persistedFragment.hasType( "Type-1" ) ).toBe( false );
				expect( persistedFragment.hasType( "http://example.com/another-url/ns#Type-2" ) ).toBe( true );
				expect( persistedFragment.hasType( "exTypes:Type-2" ) ).toBe( false );
				expect( persistedFragment.hasType( "another:Type-2" ) ).toBe( true );
				expect( persistedFragment.hasType( "Type-2" ) ).toBe( false );
				expect( persistedFragment.hasType( "http://example.com/vocab#Current-Type" ) ).toBe( true );
				expect( persistedFragment.hasType( "exTypes:Current-Type" ) ).toBe( false );
				expect( persistedFragment.hasType( "another:Current-Type" ) ).toBe( false );
				expect( persistedFragment.hasType( "Current-Type" ) ).toBe( true );
			} );

			// TODO: Separate in different tests
			it( "Fragment.removeType", ():void => {
				expect( persistedFragment.removeType ).toBeDefined();
				expect( Utils.isFunction( persistedFragment.removeType ) ).toBe( true );

				persistedFragment.types = [ "http://example.com/types#Type-1" ];
				persistedFragment.removeType( "http://example.com/types#Type-2" );
				expect( persistedFragment.types.length ).toBe( 1 );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-1" );
				persistedFragment.removeType( "another:Type-1" );
				expect( persistedFragment.types.length ).toBe( 1 );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-1" );
				persistedFragment.removeType( "Type-1" );
				expect( persistedFragment.types.length ).toBe( 1 );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-1" );

				persistedFragment.types = [ "http://example.com/types#Type-1" ];
				persistedFragment.removeType( "http://example.com/types#Type-1" );
				expect( persistedFragment.types.length ).toBe( 0 );
				persistedFragment.types = [ "http://example.com/types#Type-1" ];
				persistedFragment.removeType( "exTypes:Type-1" );
				expect( persistedFragment.types.length ).toBe( 0 );

				persistedFragment.types = [ "http://example.com/types#Type-1", "http://example.com/types#Type-2" ];
				persistedFragment.removeType( "http://example.com/types#Type-1" );
				expect( persistedFragment.types.length ).toBe( 1 );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-2" );
				persistedFragment.removeType( "exTypes:Type-2" );
				expect( persistedFragment.types.length ).toBe( 0 );

				persistedFragment.types = [ "http://example.com/types#Type-1", "http://example.com/types#Type-2", "http://example.com/another-url/ns#Type-3" ];
				persistedFragment.removeType( "http://example.com/types#Type-1" );
				expect( persistedFragment.types.length ).toBe( 2 );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-2" );
				expect( persistedFragment.types ).toContain( "http://example.com/another-url/ns#Type-3" );
				persistedFragment.removeType( "exTypes:Type-2" );
				expect( persistedFragment.types.length ).toBe( 1 );
				expect( persistedFragment.types ).toContain( "http://example.com/another-url/ns#Type-3" );
				persistedFragment.removeType( "another:Type-3" );
				expect( persistedFragment.types.length ).toBe( 0 );

				persistedFragment.types = [ "http://example.com/types#Type-1", "http://example.com/types#Type-2", "http://example.com/another-url/ns#Type-3", "http://example.com/vocab#Type-4" ];
				persistedFragment.removeType( "http://example.com/types#Type-1" );
				expect( persistedFragment.types.length ).toBe( 3 );
				expect( persistedFragment.types ).toContain( "http://example.com/types#Type-2" );
				expect( persistedFragment.types ).toContain( "http://example.com/another-url/ns#Type-3" );
				expect( persistedFragment.types ).toContain( "http://example.com/vocab#Type-4" );
				persistedFragment.removeType( "exTypes:Type-2" );
				expect( persistedFragment.types.length ).toBe( 2 );
				expect( persistedFragment.types ).toContain( "http://example.com/another-url/ns#Type-3" );
				expect( persistedFragment.types ).toContain( "http://example.com/vocab#Type-4" );
				persistedFragment.removeType( "another:Type-3" );
				expect( persistedFragment.types.length ).toBe( 1 );
				expect( persistedFragment.types ).toContain( "http://example.com/vocab#Type-4" );
				persistedFragment.removeType( "Type-4" );
				expect( persistedFragment.types.length ).toBe( 0 );
			} );

		} );

	} );

} );
