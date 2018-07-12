import { Document } from "../Document/Document";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";

import { QueryablePointer } from "../QueryDocuments/QueryablePointer";

import {
	extendsClass,
	hasProperty,
	interfaze,
	isDefined,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC,
} from "../test/JasmineExtender";

import { BaseResolvableFragment } from "./BaseResolvableFragment";
import { Fragment, FragmentFactory } from "./Fragment";
import { TransientFragment } from "./TransientFragment";

describe( module( "carbonldp/Fragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.Fragment",
		"Interface that represents a persisted fragment of a persisted document."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientFragment" ), ():void => {
			const target:TransientFragment = {} as Fragment;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.QueryablePointer" ), ():void => {
			const target:QueryablePointer = {} as Fragment;
			expect( target ).toBeDefined();
		} );

		let $registry:Document;
		let fragment:Fragment;
		beforeEach( ():void => {
			$registry = Document.decorate( {} );
			fragment = Fragment
				.decorate( { $registry } );
		} );

		it( hasProperty(
			OPTIONAL,
			"$registry",
			"CarbonLDP.Document",
			"The registry where the fragment belongs to."
		), ():void => {} );

		it( hasProperty(
			OBLIGATORY,
			"$document",
			"CarbonLDP.Document",
			"The document where the fragment belongs to."
		), ():void => {} );

		describe( property(
			OBLIGATORY,
			"$repository",
			"CarbonLDP.Document",
			"The repository associated where the fragment can be resolved with."
		), ():void => {

			it( "should be the $registry", () => {
				expect( fragment.$repository ).toBe( fragment.$registry );
			} );

			it( "should assign the $registry ", () => {
				const document:Document = Document.decorate( {} );
				fragment.$repository = document;

				expect( fragment.$registry ).toBe( document );
			} );

		} );


		describe( "Fragment._resolved", () => {

			it( "should return false when parent is not resolved", () => {
				$registry._resolved = false;
				expect( fragment._resolved ).toBe( false, "Not passing resolution to parent" );
			} );

			it( "should return true when parent is not resolved", () => {
				$registry._resolved = true;
				expect( fragment._resolved ).toBe( true, "Not passing resolution to parent" );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.FragmentFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.Fragment` object."
	), ():void => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.Fragment, CarbonLDP.TransientFragment & CarbonLDP.QueryDocuments.QueryablePointer>" ), () => {
			const target:ModelPrototype<Fragment, TransientFragment & QueryablePointer> = {} as FragmentFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.Fragment, CarbonLDP.BaseResolvableFragment>" ), () => {
			const target:ModelDecorator<Fragment, BaseResolvableFragment> = {} as FragmentFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelFactory<CarbonLDP.Fragment, CarbonLDP.BaseResolvableFragment>" ), () => {
			const target:ModelFactory<Fragment, BaseResolvableFragment> = {} as FragmentFactory;
			expect( target ).toBeDefined();
		} );


		describe( "Fragment.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( Fragment.isDecorated ).toBeDefined();
				expect( Fragment.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should verify members from PROTOTYPE", () => {
				const spy:jasmine.Spy = spyOn( ModelDecorator, "hasPropertiesFrom" )
					.and.returnValue( true );

				const returned:boolean = Fragment.isDecorated( { the: "object" } );

				expect( spy ).toHaveBeenCalledWith( Fragment.PROTOTYPE, { the: "object" } );
				expect( returned ).toBe( true, "Not returning value from ModelDecorator.hasPropertiesFrom" );
			} );

		} );

		describe( "Fragment.decorate", ():void => {

			it( "should exists", ():void => {
				expect( Fragment.decorate ).toBeDefined();
				expect( Fragment.decorate ).toEqual( jasmine.any( Function ) );
			} );

			let $registry:Document;
			beforeEach( ():void => {
				$registry = Document.decorate( {} );
			} );


			it( "should decorate with TransientFragment", () => {
				const spy:jasmine.Spy = spyOn( TransientFragment, "decorate" );

				Fragment.decorate( { $registry } );
				expect( spy ).toHaveBeenCalled();
			} );

			it( "should decorate with QueryablePointer", () => {
				const spy:jasmine.Spy = spyOn( QueryablePointer, "decorate" );

				Fragment.decorate( { $registry } );
				expect( spy ).toHaveBeenCalled();
			} );

			it( "should add PROTOTYPE", () => {
				const fragment:Fragment = Fragment.decorate( { $registry } );
				expect( Fragment.isDecorated( fragment ) ).toBe( true, "Not adding PROTOTYPE members" );
			} );

			it( "should throw error when no $registry", () => {
				expect( () => {
					Fragment.decorate( {} as any );
				} ).toThrowError( IllegalArgumentError, `Property "$registry" is required.` );
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
