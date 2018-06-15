import { PersistedResource } from "../Resource";
import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	isDefined,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { Fragment } from "./Fragment";
import {
	TransientFragment,
	TransientFragmentFactory
} from "./TransientFragment";

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

		it( extendsClass( "CarbonLDP.TransientFragmentFactory" ), () => {
			expect<TransientFragmentFactory>( Fragment ).toEqual( jasmine.objectContaining( {
				create: TransientFragment.create,
				createFrom: TransientFragment.createFrom,
			} ) );
		} );


		describe( method( OBLIGATORY, "isDecorated" ), ():void => {

			it( hasSignature(
				[
					{ name: "object", type: "object" },
				],
				{ type: "object is CarbonLDP.Fragment" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Fragment.isDecorated ).toBeDefined();
				expect( Fragment.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call TransientFragment & PersistedResource .isDecorated", () => {
				const isTransientFragmentDecorated:jasmine.Spy = spyOn( TransientFragment, "isDecorated" )
					.and.returnValue( true );
				const isPersistedResourceDecorated:jasmine.Spy = spyOn( PersistedResource, "isDecorated" )
					.and.returnValue( true );

				const returned:boolean = Fragment.isDecorated( { the: "object" } );
				expect( isTransientFragmentDecorated ).toHaveBeenCalledWith( { the: "object" } );
				expect( isPersistedResourceDecorated ).toHaveBeenCalledWith( { the: "object" } );
				expect( returned ).toBe( true );
			} );

		} );

		describe( method( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				[
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.Fragment" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Fragment.is ).toBeDefined();
				expect( Fragment.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientFragment:jasmine.Spy;
			let isPersistedResource:jasmine.Spy;
			beforeEach( ():void => {
				isTransientFragment = spyOn( TransientFragment, "is" )
					.and.returnValue( true );
				isPersistedResource = spyOn( PersistedResource, "isDecorated" )
					.and.returnValue( true );
			} );

			it( "should be a TransientFragment", () => {
				Fragment.is( { the: "object" } );
				expect( isTransientFragment ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should be isPersistedResource", () => {
				Fragment.is( { the: "object" } );
				expect( isPersistedResource ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return true when all assertions", () => {
				const returned:boolean = Fragment.is( {} );
				expect( returned ).toBe( true );
			} );

		} );

		describe( method( OBLIGATORY, "decorate" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				"Decorates the object provided with the properties and methods of a `CarbonLDP.Fragment` object.",
				[
					{ name: "object", type: "object", description: "The object to convert into a persisted fragment." },
				]
			), ():void => {} );

			it( "should exists", ():void => {
				expect( Fragment.decorate ).toBeDefined();
				expect( Fragment.decorate ).toEqual( jasmine.any( Function ) );
			} );

			// TODO: Separate in different tests
			it( "should work", ():void => {
				let spyPersistedDecorator:jasmine.Spy = spyOn( PersistedResource, "decorate" );

				let fragment:TransientFragment = TransientFragment.create( {
					_document: null,
					id: "_:01",
				} );
				let persistedFragment:Fragment = Fragment.decorate( fragment );

				expect( persistedFragment ).toBeTruthy();
				expect( spyPersistedDecorator ).toHaveBeenCalledWith( fragment );
			} );

		} );

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

	} );

} );
