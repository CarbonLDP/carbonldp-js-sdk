import { BlankNodeToken, IRIRefToken, PrefixedNameToken } from "sparqler/tokens";

import { createMockContext } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { QueryContainer } from "./QueryContainer";
import { QueryObject } from "./QueryObject";


describe( "QueryObject", () => {

	it( "should exists", () => {
		expect( QueryObject ).toBeDefined();
		expect( QueryObject ).toEqual( jasmine.any( Function ) );
	} );

	let context:AbstractContext<any, any>;
	let queryContainer:QueryContainer;
	beforeEach( () => {
		context = createMockContext( { uri: "https://example.com/" } );
		context.extendObjectSchema( {
			"ex": "http://example.com/ns#",
		} );
		queryContainer = new QueryContainer( context, { uri: "root" } );
	} );


	describe( "QueryObject.constructor", () => {

		it( "should be instantiable", () => {
			const queryObject:QueryObject = new QueryObject( queryContainer, "http://example.com/" );
			expect( queryObject ).toEqual( jasmine.any( QueryObject ) );
		} );


		it( "should create an IRI token", () => {
			const queryObject:QueryObject = new QueryObject( queryContainer, "http://example.com/resource/" );
			expect( queryObject[ "_resource" ] ).toEqual( jasmine.any( IRIRefToken ) );
		} );

		it( "should create an PrefixedName token", () => {
			const queryObject:QueryObject = new QueryObject( queryContainer, "ex:resource" );
			expect( queryObject[ "_resource" ] ).toEqual( jasmine.any( PrefixedNameToken ) );
		} );

		it( "should create an BlankNodeToken token", () => {
			const queryObject:QueryObject = new QueryObject( queryContainer, "_:resource" );
			expect( queryObject[ "_resource" ] ).toEqual( jasmine.any( BlankNodeToken ) );
		} );

		it( "should call the compactIRI", () => {
			const spy:jasmine.Spy = spyOn( queryContainer, "compactIRI" ).and.callThrough();

			const helper:( iri:string ) => void = iri => {
				new QueryObject( queryContainer, iri );
				expect( spy ).toHaveBeenCalledWith( iri );
			};

			helper( "http://example.com/resource/" );
			helper( "ex:resource" );
		} );

		it( "should no call the compactIRI when blank node", () => {
			const spy:jasmine.Spy = spyOn( queryContainer, "compactIRI" ).and.callThrough();

			const helper:( iri:string ) => void = iri => {
				new QueryObject( queryContainer, iri );
				expect( spy ).not.toHaveBeenCalled();
			};

			helper( "_:resource" );
		} );

	} );


	describe( "QueryObject.getToken", () => {

		it( "should exists", () => {
			expect( QueryObject.prototype.getToken ).toBeDefined();
			expect( QueryObject.prototype.getToken ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the token created", () => {
			const helper:( object:string ) => void = object => {
				const queryObject:QueryObject = new QueryObject( queryContainer, object );
				expect( queryObject.getToken() ).toBe( queryObject[ "_resource" ] );
			};

			helper( "http://example.com/" );
			helper( "ex:resource" );
			helper( "_:blank-node" );
		} );

	} );

	describe( "QueryObject.toString", () => {

		it( "should override the default toString", () => {
			expect( QueryObject.prototype.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the string of the resource", () => {
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
