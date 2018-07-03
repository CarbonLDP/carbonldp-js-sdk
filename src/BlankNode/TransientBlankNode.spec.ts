import { IllegalArgumentError } from "../Errors";
import { TransientFragment } from "../Fragment";
import { URI } from "../RDF";
import {
	extendsClass,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC,
} from "../test/JasmineExtender";
import { BaseBlankNode } from "./BaseBlankNode";
import { TransientBlankNode } from "./TransientBlankNode";


describe( module( "carbonldp/BlankNode" ), ():void => {

	describe( interfaze(
		"CarbonLDP.TransientBlankNode",
		"Interface that represents the basic data of a blank node."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientFragment" ), () => {
			const target:TransientFragment = {} as TransientBlankNode;
			expect( target ).toBeDefined();
		} );

	} );

	describe( interfaze(
		"CarbonLDP.TransientBlankNodeFactory",
		"Interface with the factory, decorate and utils methods id a `CarbonLDP.TransientBlankNode` object."
	), ():void => {

		describe( method( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				"Returns true if the object provided is considered a `CarbonLDP.TransientBlankNode`.", [
					{ name: "object", type: "object" },
				],
				{ type: "object is CarbonLDP.TransientBlankNode" }
			), ():void => {} );


			let isTransientFragment:jasmine.Spy;
			beforeEach( ():void => {
				isTransientFragment = spyOn( TransientFragment, "is" )
					.and.returnValue( true );
			} );

			it( "should be a TransientFragment", () => {
				isTransientFragment.and.returnValue( false );

				TransientBlankNode.is( { the: "object" } );
				expect( isTransientFragment ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return true when has bNode label as ID", () => {
				const returned:boolean = TransientBlankNode.is( { id: "_:1" } );
				expect( returned ).toBe( true );
			} );

			it( "should return false when has NO bNode label as ID", () => {
				const returned:boolean = TransientBlankNode.is( { id: "not-bNode-label/" } );
				expect( returned ).toBe( false );
			} );

		} );

		describe( method( OBLIGATORY, "create" ), ():void => {

			it( hasSignature(
				[ "T extends CarbonLDP.BaseBlankNode" ],
				"Creates a `CarbonLDP.TransientBlankNode` object from the parameters specified.", [
					{ name: "data", type: "T", description: "Data to be used in the creation of the blank node." },
				],
				{ type: "T & CarbonLDP.TransientBlankNode" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( TransientBlankNode.create ).toBeDefined();
				expect( TransientBlankNode.create ).toEqual( jasmine.any( Function ) );
			} );


			it( "should call .createFrom", () => {
				const spy:jasmine.Spy = spyOn( TransientBlankNode, "createFrom" );

				TransientBlankNode.create( { the: "object" } );
				expect( spy ).toHaveBeenCalledWith( { the: "object" } );
			} );

			it( "should return different reference", () => {
				const base:{} = {};
				const resource:{} = TransientBlankNode.create( base );

				expect( resource ).not.toBe( base );
			} );

		} );

		describe( method( OBLIGATORY, "createFrom" ), ():void => {

			it( hasSignature(
				[ "T extends CarbonLDP.BaseBlankNode" ],
				"Creates a `CarbonLDP.TransientBlankNode` object from the object and parameters specified.", [
					{ name: "object", type: "T", description: "Object to be converted into a blank node." },
				],
				{ type: "T & CarbonLDP.TransientBlankNode" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( TransientBlankNode.createFrom ).toBeDefined();
				expect( TransientBlankNode.createFrom ).toEqual( jasmine.any( Function ) );
			} );


			it( "should throw error if id not a blank node label", ():void => {
				const object:BaseBlankNode = {
					$id: "not a blank-node label",
				};
				expect( () => TransientBlankNode.createFrom( object ) ).toThrowError( IllegalArgumentError, `The id "not a blank-node label" is not a blank node label.` );
			} );

			it( "should maintain the blank node label id", ():void => {
				const bNode:TransientBlankNode = TransientBlankNode.createFrom( {
					$id: "_:blank-node-label",
				} );

				expect( bNode.$id ).toBe( "_:blank-node-label" );
			} );

			it( "should create a blank node label id not provided", ():void => {
				const bNode:TransientBlankNode = TransientBlankNode.createFrom( {} );
				expect( URI.isBNodeID( bNode.$id ) ).toBe( true );
			} );


			it( "should return same reference", () => {
				const base:{} = {};
				const resource:{} = TransientBlankNode.createFrom( base );

				expect( resource ).toBe( base );
			} );

		} );

	} );

	describe( property(
		STATIC,
		"TransientBlankNode",
		"CarbonLDP.TransientBlankNodeFactory",
		"Constant that implements the `CarbonLDP.TransientBlankNodeFactory` interface."
	), ():void => {

		it( "should exists", ():void => {
			expect( TransientBlankNode ).toBeDefined();
			expect( TransientBlankNode ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
