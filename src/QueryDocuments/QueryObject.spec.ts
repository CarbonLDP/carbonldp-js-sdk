import { BlankNodeToken, IRIRefToken, PrefixedNameToken } from "sparqler/tokens";

import { createMockContext } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { clazz, constructor, hasSignature, INSTANCE, method, module } from "../test/JasmineExtender";

import { QueryContainerType } from "./QueryContainerType";
import { QueryDocumentContainer } from "./QueryDocumentContainer";
import { QueryObject } from "./QueryObject";


describe( module( "carbonldp/QueryDocuments/QueryObject" ), ():void => {

	describe( clazz( "CarbonLDP.QueryDocuments.QueryObject", "Class that represents any resource." ), ():void => {

		it( "should exists", ():void => {
			expect( QueryObject ).toBeDefined();
			expect( QueryObject ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext<any, any>;
		let queryContainer:QueryDocumentContainer;
		beforeEach( ():void => {
			context = createMockContext( { uri: "https://example.com/" } );
			context.extendObjectSchema( {
				"ex": "http://example.com/ns#",
			} );
			queryContainer = new QueryDocumentContainer( context, { uri: "root", containerType: QueryContainerType.DOCUMENT } );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				"Creates an object for the specified object resource.",
				[
					{ name: "queryContainer", type: "CarbonLDP.QueryDocuments.QueryDocumentContainer" },
					{ name: "id", type: "string", description: "The ID to be converted in a safe to use object in the query statements." },
				]
			), ():void => {
			} );

			it( "should exists", ():void => {
				const queryObject:QueryObject = new QueryObject( queryContainer, "http://example.com/" );
				expect( queryObject ).toEqual( jasmine.any( QueryObject ) );
			} );

			it( "should create an IRI token", ():void => {
				const queryObject:QueryObject = new QueryObject( queryContainer, "http://example.com/resource/" );
				expect( queryObject[ "_resource" ] ).toEqual( jasmine.any( IRIRefToken ) );
			} );

			it( "should create an PrefixedName token", ():void => {
				const queryObject:QueryObject = new QueryObject( queryContainer, "ex:resource" );
				expect( queryObject[ "_resource" ] ).toEqual( jasmine.any( PrefixedNameToken ) );
			} );

			it( "should create an BlankNodeToken token", ():void => {
				const queryObject:QueryObject = new QueryObject( queryContainer, "_:resource" );
				expect( queryObject[ "_resource" ] ).toEqual( jasmine.any( BlankNodeToken ) );
			} );

			it( "should call the compactIRI", ():void => {
				const spy:jasmine.Spy = spyOn( queryContainer, "compactIRI" ).and.callThrough();

				const helper:( iri:string ) => void = iri => {
					new QueryObject( queryContainer, iri );
					expect( spy ).toHaveBeenCalledWith( iri );
				};

				helper( "http://example.com/resource/" );
				helper( "ex:resource" );
			} );

			it( "should no call the compactIRI when blank node", ():void => {
				const spy:jasmine.Spy = spyOn( queryContainer, "compactIRI" ).and.callThrough();

				const helper:( iri:string ) => void = iri => {
					new QueryObject( queryContainer, iri );
					expect( spy ).not.toHaveBeenCalled();
				};

				helper( "_:resource" );
			} );

		} );

		describe( method( INSTANCE, "getToken" ), ():void => {

			it( hasSignature(
				"Returns the SPARQL token of the object.",
				{ type: "sparqler/tokens/IRIToken | sparqler/tokens/BlankNodeToken | sparqler/tokens/PrefixedNameToken" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( QueryObject.prototype.getToken ).toBeDefined();
				expect( QueryObject.prototype.getToken ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the token created", ():void => {
				const helper:( object:string ) => void = object => {
					const queryObject:QueryObject = new QueryObject( queryContainer, object );
					expect( queryObject.getToken() ).toBe( queryObject[ "_resource" ] );
				};

				helper( "http://example.com/" );
				helper( "ex:resource" );
				helper( "_:blank-node" );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

			it( hasSignature(
				"Returns the SPARQL string representation of the object to be used in the query.",
				{ type: "string" }
			), ():void => {} );

			it( "should override the default toString", ():void => {
				expect( QueryObject.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the string of the resource", ():void => {
				const helper:( iri:string ) => void = iri => {
					const queryObject:QueryObject = new QueryObject( queryContainer, iri );
					expect( queryObject.toString() ).toBe( queryObject[ "_resource" ].toString() );
				};

				helper( "http://example.com/resource/" );
				helper( "ex:resource" );
				helper( "_:resource" );
			} );

		} );

	} );

} );
