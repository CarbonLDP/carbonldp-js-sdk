import { TransientDocument } from "../Document/TransientDocument";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";

import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";

import { URI } from "../RDF/URI";

import { Resource } from "../Resource/Resource";

import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OBLIGATORY,
	OPTIONAL,
	property,
	STATIC
} from "../test/JasmineExtender";

import { BaseTransientFragment } from "./BaseTransientFragment";
import { TransientFragment, TransientFragmentFactory } from "./TransientFragment";


describe( module( "carbonldp/Fragment" ), ():void => {

	describe( interfaze(
		"CarbonLDP.TransientFragment",
		"Interface of an in-memory fragment of a document."
	), ():void => {

		let fragment:TransientFragment;
		beforeEach( ():void => {
			fragment = TransientFragment
				.create( { $registry: TransientDocument.create() } );
		} );

		it( hasProperty(
			OPTIONAL,
			"$registry",
			"CarbonLDP.TransientDocument",
			"The registry where the transient fragment belongs to."
		), ():void => {} );

		describe( property(
			OBLIGATORY,
			"$document",
			"CarbonLDP.TransientDocument",
			"The transient document where the transient fragment belongs to."
		), ():void => {

			it( "should be the $registry", () => {
				expect( fragment.$document ).toBe( fragment.$registry );
			} );

			it( "should assign the $registry ", () => {
				const document:TransientDocument = TransientDocument.create();
				fragment.$document = document;

				expect( fragment.$registry ).toBe( document );
			} );

		} );

	} );

	describe( interfaze(
		"CarbonLDP.TransientFragmentFactory",
		"Interface with the factory, decorate and utils methods of a `CarbonLDP.TransientFragment` object."
	), ():void => {

		it( extendsClass( "CarbonLDP.Model.ModelPrototype<CarbonLDP.TransientFragment, CarbonLDP.Resource>" ), () => {
			const target:ModelPrototype<TransientFragment, Resource> = {} as TransientFragmentFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelDecorator<CarbonLDP.TransientFragment, CarbonLDP.BaseTransientFragment>" ), () => {
			const target:ModelDecorator<TransientFragment, BaseTransientFragment> = {} as TransientFragmentFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelTypeGuard<CarbonLDP.TransientFragment>" ), () => {
			const target:ModelTypeGuard<TransientFragment> = {} as TransientFragmentFactory;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.Model.ModelFactory<CarbonLDP.TransientFragment, CarbonLDP.BaseTransientFragment>" ), () => {
			const target:ModelFactory<TransientFragment, BaseTransientFragment> = {} as TransientFragmentFactory;
			expect( target ).toBeDefined();
		} );

	} );

	describe( hasProperty(
		STATIC,
		"TransientFragment",
		"CarbonLDP.TransientFragmentFactory",
		"Constant that implements the `CarbonLDP.TransientFragmentFactory` interface"
	), ():void => {

		it( "should exist", ():void => {
			expect( TransientFragment ).toBeDefined();
			expect( TransientFragment ).toEqual( jasmine.any( Object ) );
		} );


		let $registry:TransientDocument;
		beforeEach( ():void => {
			$registry = TransientDocument.create();
		} );

		describe( "TransientFragment.isDecorated", ():void => {

			it( "should exists", ():void => {
				expect( TransientFragment.isDecorated ).toBeDefined();
				expect( TransientFragment.isDecorated ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call TransientResource.isDecorated", ():void => {
				const spy:jasmine.Spy = spyOn( Resource, "isDecorated" );

				TransientFragment.isDecorated( { the: "object" } );
				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

		} );

		describe( "TransientFragment.create", ():void => {

			it( "should exists", ():void => {
				expect( TransientFragment.create ).toBeDefined();
				expect( TransientFragment.create ).toEqual( jasmine.any( Function ) );
			} );

			it( "should fill bNode label id when no provided", ():void => {
				const fragment:TransientFragment = TransientFragment.create( { $registry } );

				expect( URI.isBNodeID( fragment.$id ) ).toBe( true );
			} );

			it( "should maintain id when provided", ():void => {
				const fragment:TransientFragment = TransientFragment.create( {
					$registry,
					$id: "#fragment",
				} );

				expect( fragment.$id ).toBe( "#fragment" );
			} );

			it( "should call TransientFragment.createFrom", ():void => {
				const spy:jasmine.Spy = spyOn( TransientFragment, "createFrom" );

				TransientFragment.create( { $registry, the: "fragment" } );
				expect( spy ).toHaveBeenCalledWith( { $registry, the: "fragment" } );
			} );

			it( "should return different reference", ():void => {
				const object:BaseTransientFragment = { $registry };
				const returned:TransientFragment = TransientFragment.create( object );

				expect( object ).not.toBe( returned );
			} );

		} );

		describe( "TransientFragment.createFrom", ():void => {

			it( "should exists", ():void => {
				expect( TransientFragment.createFrom ).toBeDefined();
				expect( TransientFragment.createFrom ).toEqual( jasmine.any( Function ) );
			} );

			it( "should fill bNode label id when no provided", ():void => {
				const fragment:TransientFragment = TransientFragment.createFrom( { $registry } );

				expect( URI.isBNodeID( fragment.$id ) ).toBe( true );
			} );

			it( "should maintain id when provided", ():void => {
				const fragment:TransientFragment = TransientFragment.createFrom( {
					$registry,
					$id: "#fragment",
				} );

				expect( fragment.$id ).toBe( "#fragment" );
			} );

			it( "should call TransientFragment.decorate", ():void => {
				const spy:jasmine.Spy = spyOn( TransientFragment, "decorate" );

				TransientFragment.createFrom( { $registry, the: "fragment" } );
				expect( spy ).toHaveBeenCalledWith( { $registry, the: "fragment" } );
			} );

			it( "should return same reference", ():void => {
				const object:BaseTransientFragment = { $registry };
				const returned:TransientFragment = TransientFragment.createFrom( object );

				expect( object ).toBe( returned );
			} );

		} );

		describe( "TransientFragment.decorate", ():void => {

			it( "should exists", ():void => {
				expect( TransientFragment.decorate ).toBeDefined();
				expect( TransientFragment.decorate ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call Resource.decorate", ():void => {
				const spy:jasmine.Spy = spyOn( Resource, "decorate" );

				TransientFragment.decorate( { $registry, the: "object" } );
				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should throw error when no $registry", () => {
				expect( () => {
					TransientFragment.decorate( {} as any );
				} ).toThrowError( IllegalArgumentError, `Property "$registry" is required.` );
			} );

		} );

	} );

} );
