import AbstractContext from "./AbstractContext";
import * as Fragment from "./Fragment";
import * as PersistedDocument from "./PersistedDocument";

import * as PersistedFragment from "./PersistedFragment";
import DefaultExport from "./PersistedFragment";
import * as PersistedResource from "./PersistedResource";
import {
	clazz,
	decoratedObject,
	extendsClass,
	hasDefaultExport,
	hasMethod,
	hasProperty,
	INSTANCE,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	STATIC,
} from "./test/JasmineExtender";
import * as Utils from "./Utils";

describe( module( "Carbon/PersistedFragment" ), ():void => {

	it( isDefined(), ():void => {
		expect( PersistedFragment ).toBeDefined();
		expect( Utils.isObject( PersistedFragment ) ).toBe( true );
	} );

	describe( interfaze(
		"Carbon.PersistedFragment.Class",
		"Interface that represents a persisted fragment of a persisted document."
	), ():void => {

		it( extendsClass( "Carbon.PersistedResource.Class" ), ():void => {} );
		it( extendsClass( "Carbon.Fragment.Class" ), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"document",
			"Carbon.PersistedDocument.Class",
			"A reference to the persisted document the current fragment belongs to."
		), ():void => {} );

	} );

	it( hasDefaultExport( "Carbon.PersistedFragment.Class" ), ():void => {
		let defaultExport:DefaultExport = <any> {};
		let defaultTarget:PersistedFragment.Class;

		defaultTarget = defaultExport;
		expect( defaultTarget ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz( "Carbon.PersistedFragment.Factory", "Factory class for `Carbon.PersistedFragment.Class` objects." ), ():void => {

		it( isDefined(), ():void => {
			expect( PersistedFragment.Factory ).toBeDefined();
			expect( Utils.isFunction( PersistedFragment.Factory ) ).toBe( true );
		} );

		it( hasMethod(
			STATIC,
			"decorate",
			"Decorates the object provided with the properties and methods of a `Carbon.PersistedFragment.Class` object.", [
				{ name: "fragment", type: "T extends Carbon.Fragment.Class", description: "The Fragment object to convert into a persisted one." },
			]
		), ():void => {
			expect( PersistedFragment.Factory.decorate ).toBeDefined();
			expect( Utils.isFunction( PersistedFragment.Factory.decorate ) ).toBe( true );

			let spyPersistedDecorator:jasmine.Spy = spyOn( PersistedResource.Factory, "decorate" );

			let fragment:Fragment.Class = Fragment.Factory.create( "_:01", null );
			let persistedFragment:PersistedFragment.Class = PersistedFragment.Factory.decorate( fragment );

			expect( persistedFragment ).toBeTruthy();
			expect( spyPersistedDecorator ).toHaveBeenCalledWith( fragment );
		} );

		describe( decoratedObject(
			"Object decorated by the `Carbon.PersistedFragment.Factory.decorate()` function.", [
				"Carbon.PersistedFragment.Class",
			]
		), ():void => {
			let persistedFragment:PersistedFragment.Class;

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

				let document:PersistedDocument.Class = PersistedDocument.Factory.create( "http://example.com/document/", context.documents );

				let fragment:Fragment.Class = Fragment.Factory.create( document );
				persistedFragment = PersistedFragment.Factory.decorate( fragment );
			} );

			it( hasMethod(
				INSTANCE,
				"addType",
				"Adds a type to the PersistedFragment. Relative and prefixed types are resolved before the operation.", [
					{ name: "type", type: "string", description: "The type to be added." },
				]
			), ():void => {
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

			it( hasMethod(
				INSTANCE,
				"hasType",
				"Returns true if the PersistedFragment contains the type specified. Relative and prefixed types are resolved before the operation.", [
					{ name: "type", type: "string", description: "The type to look for." },
				]
			), ():void => {
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

			it( hasMethod(
				INSTANCE,
				"removeType",
				"Remove the type specified from the PersistedFragment. Relative and prefixed types are resolved before the operation.", [
					{ name: "type", type: "string", description: "The type to be removed." },
				]
			), ():void => {
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
