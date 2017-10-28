import { BlankNodeToken, IRIToken, PrefixedNameToken } from "sparqler/tokens";

import AbstractContext from "../../AbstractContext";
import { clazz, constructor, hasDefaultExport, INSTANCE, method, module } from "../../test/JasmineExtender";
import * as Pointer from "./../../Pointer";
import QueryContext from "./QueryContext";
import * as Module from "./QueryObject";
import { Class as QueryObject } from "./QueryObject";

describe( module( "Carbon/SPARQL/QueryDocument/QueryObject" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryObject.Class" ), ():void => {
		expect( Module.default ).toBeDefined();
		expect( Module.default ).toBe( QueryObject );
	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryObject.Class", "Class that represents any resource." ), ():void => {

		it( "should exists", ():void => {
			expect( QueryObject ).toBeDefined();
			expect( QueryObject ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext;
		let queryContext:QueryContext;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "https://example.com/";
			};
			context.extendObjectSchema( {
				"ex": "http://example.com/ns#",
			} );
			queryContext = new QueryContext( context );
		} );

		describe( constructor(), ():void => {

			it( "should exists", ():void => {
				const queryObject:QueryObject = new QueryObject( queryContext, "http://example.com/" );
				expect( queryObject ).toEqual( jasmine.any( QueryObject ) );
			} );

			it( "should create an IRI token", ():void => {
				const queryObject:QueryObject = new QueryObject( queryContext, "http://example.com/resource/" );
				expect( queryObject[ "_resource" ] ).toEqual( jasmine.any( IRIToken ) );
			} );

			it( "should create an PrefixedName token", ():void => {
				const queryObject:QueryObject = new QueryObject( queryContext, "ex:resource" );
				expect( queryObject[ "_resource" ] ).toEqual( jasmine.any( PrefixedNameToken ) );
			} );

			it( "should create an BlankNodeToken token", ():void => {
				const queryObject:QueryObject = new QueryObject( queryContext, "_:resource" );
				expect( queryObject[ "_resource" ] ).toEqual( jasmine.any( BlankNodeToken ) );
			} );

			it( "should call the compactIRI", ():void => {
				const spy:jasmine.Spy = spyOn( queryContext, "compactIRI" ).and.callThrough();

				const helper:( iri:string ) => void = iri => {
					new QueryObject( queryContext, iri );
					expect( spy ).toHaveBeenCalledWith( iri );
				};

				helper( "http://example.com/resource/" );
				helper( "ex:resource" );
			} );

			it( "should no call the compactIRI when blank node", ():void => {
				const spy:jasmine.Spy = spyOn( queryContext, "compactIRI" ).and.callThrough();

				const helper:( iri:string ) => void = iri => {
					new QueryObject( queryContext, iri );
					expect( spy ).not.toHaveBeenCalled();
				};

				helper( "_:resource" );
			} );

		} );

		describe( method( INSTANCE, "getToken" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryObject.prototype.getToken ).toBeDefined();
				expect( QueryObject.prototype.getToken ).toEqual( jasmine.any( Function ) );
			} );

			it( "should return the token created", ():void => {
				const helper:( object:string | Pointer.Class ) => void = object => {
					const queryObject:QueryObject = new QueryObject( queryContext, object );
					expect( queryObject.getToken() ).toBe( queryObject[ "_resource" ] );
				};

				helper( "http://example.com/" );
				helper( "ex:resource" );
				helper( "_:blank-node" );

				helper( Pointer.Factory.create( "http://example.com/" ) );
				helper( Pointer.Factory.create( "ex:resource" ) );
				helper( Pointer.Factory.create( "_:blank-node" ) );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

			it( "should override the default toString", ():void => {
				expect( QueryObject.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the string of the resource", ():void => {
				const helper:( iri:string ) => void = iri => {
					const queryObject:QueryObject = new QueryObject( queryContext, iri );
					expect( queryObject.toString() ).toBe( queryObject[ "_resource" ].toString() );
				};

				helper( "http://example.com/resource/" );
				helper( "ex:resource" );
				helper( "_:resource" );
			} );

		} );

	} );

} );
