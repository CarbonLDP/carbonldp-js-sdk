import { CollectionToken, IRIToken, LiteralToken, PredicateToken, PrefixedNameToken, SubjectToken } from "sparqler/tokens";
import * as TokenUtils from "sparqler/tokens/utils";

import { clazz, constructor, hasProperty, hasSignature, INSTANCE, method, module } from "../test/JasmineExtender";

import * as Module from "./Tokens";
import { AddToken, DeleteToken, LDPatchToken, PrefixToken, SliceToken, UpdateListToken } from "./Tokens";


describe( module( "carbonldp/LDPatch/Tokens" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( clazz( "CarbonLDP.LDPatch.LDPatchToken", "An LD Patch expression.", [ "sparqler/tokens/TokenNode" ] ), ():void => {

		it( hasProperty( INSTANCE, "token", "ldpatch" ), ():void => {
		} );

		it( hasProperty( INSTANCE, "prologues", "CarbonLDP.LDPatch.PrefixToken[]" ), ():void => {
		} );

		it( hasProperty( INSTANCE, "statements", "CarbonLDP.LDPatch.StatementToken[]" ), ():void => {
		} );


		it( "should exists", ():void => {
			expect( LDPatchToken ).toBeDefined();
			expect( LDPatchToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(), ():void => {
			} );

			it( "should exists", ():void => {
				const token:LDPatchToken = new LDPatchToken();
				expect( token ).toEqual( jasmine.any( LDPatchToken ) );
			} );

			it( "should initialize prologues", ():void => {
				const token:LDPatchToken = new LDPatchToken();
				expect( token.prologues ).toEqual( [] );
			} );

			it( "should initialize statements", ():void => {
				const token:LDPatchToken = new LDPatchToken();
				expect( token.statements ).toEqual( [] );
			} );

			it( "should set token name as `ldpatch`", ():void => {
				const token:LDPatchToken = new LDPatchToken();
				expect( token.token ).toBe( "ldpatch" );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

			it( hasSignature( { type: "string" } ), ():void => {
			} );

			it( "should exists", ():void => {
				expect( LDPatchToken.prototype.toString ).toBeDefined();
				expect( LDPatchToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should override default toString", ():void => {
				expect( LDPatchToken.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the list of actions", ():void => {
				const token:LDPatchToken = new LDPatchToken();
				token.prologues.push( ...[
					new PrefixToken( "profile", new IRIToken( "http://ogp.me/ns/profile#" ) ),
					new PrefixToken( "ex", new IRIToken( "http://example.org/vocab#" ) ),
				] );

				const resource:IRIToken = new IRIToken( "#" );

				const deleteName:DeleteToken = new DeleteToken();
				deleteName.triples.push( new SubjectToken( resource )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "profile", "first_name" ) )
						.addObject( new LiteralToken( "Tim" ) ) ) );

				const addNameAndImage:AddToken = new AddToken();
				addNameAndImage.triples.push( new SubjectToken( resource )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "profile", "first_name" ) )
						.addObject( new LiteralToken( "Timothy" ) ) )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "profile", "image" ) )
						.addObject( new IRIToken( "https://example.org/tim.jpg" ) ) ) );

				const newLanguages:CollectionToken = new CollectionToken();
				newLanguages.objects.push( new LiteralToken( "fr-CH" ) );
				const updateLanguages:UpdateListToken = new UpdateListToken( resource, new PrefixedNameToken( "ex", "preferredLanguages" ), new SliceToken( 1, 2 ), newLanguages );

				token.statements.push( ...[
					deleteName,
					addNameAndImage,
					updateLanguages,
				] );

				expect( token.toString() ).toBe( `` +
					`@prefix profile: <http://ogp.me/ns/profile#>. ` +
					`@prefix ex: <http://example.org/vocab#>. ` +
					`Delete { <#> profile:first_name "Tim". }. ` +
					`Add { ` +
					`<#> profile:first_name "Timothy";` +
					` profile:image <https://example.org/tim.jpg>. ` +
					`}. ` +
					`UpdateList <#> ex:preferredLanguages 1..2 ( "fr-CH" ).` +
					``
				);
			} );

		} );

	} );

	describe( clazz( "CarbonLDP.LDPatch.PrefixToken", "LD Patch add action.", [ "sparqler/tokens/TokenNode" ] ), ():void => {

		it( hasProperty( INSTANCE, "token", "prefix" ), ():void => {
		} );

		it( hasProperty( INSTANCE, "namespace", "string" ), ():void => {
		} );

		it( hasProperty( INSTANCE, "iri", "sparqler/tokens/IRIToken" ), ():void => {
		} );


		it( "should exists", ():void => {
			expect( PrefixToken ).toBeDefined();
			expect( PrefixToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "namespace", type: "string", description: "The namespace of the LD Patch prefix." },
					{ name: "iri", type: "sparqler/tokens/IRIToken", description: "The IRI of the LD Patch prefix." },
				]
			), ():void => {
			} );

			it( "should exists", ():void => {
				const token:PrefixToken = new PrefixToken( null, null );
				expect( token ).toEqual( jasmine.any( PrefixToken ) );
			} );

			it( "should initialize prefix namespace", ():void => {
				const namespace:string = "prefix_name";
				const token:PrefixToken = new PrefixToken( namespace, null );
				expect( token.namespace ).toBe( namespace );
			} );

			it( "should initialize iri", ():void => {
				const iri:IRIToken = new IRIToken( "http://example.com/" );
				const token:PrefixToken = new PrefixToken( null, iri );
				expect( token.iri ).toBe( iri );
			} );

			it( "should set token name as `prefix`", ():void => {
				const token:PrefixToken = new PrefixToken( null, null );
				expect( token.token ).toBe( "prefix" );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

			it( hasSignature( { type: "string" } ), ():void => {
			} );

			it( "should exists", ():void => {
				expect( PrefixToken.prototype.toString ).toBeDefined();
				expect( PrefixToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should override default toString", ():void => {
				expect( PrefixToken.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should return the prefix", ():void => {
				const token:PrefixToken = new PrefixToken( "ex", new IRIToken( "http://example.com/" ) );

				expect( token.toString() ).toBe( `@prefix ex: <http://example.com/>.` );
			} );

		} );

	} );

	describe( clazz( "CarbonLDP.LDPatch.AddToken", "LD Patch add action.", [ "sparqler/tokens/TokenNode" ] ), ():void => {

		it( hasProperty( INSTANCE, "token", "add" ), ():void => {
		} );

		it( hasProperty( INSTANCE, "triples", "sparqler/tokens/SubjectToken[]" ), ():void => {
		} );


		it( "should exists", ():void => {
			expect( AddToken ).toBeDefined();
			expect( AddToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(), ():void => {
			} );

			it( "should exists", ():void => {
				const token:AddToken = new AddToken();
				expect( token ).toEqual( jasmine.any( AddToken ) );
			} );

			it( "should initialize triples", ():void => {
				const token:AddToken = new AddToken();
				expect( token.triples ).toEqual( [] );
			} );

			it( "should set token name as `add`", ():void => {
				const token:AddToken = new AddToken();
				expect( token.token ).toBe( "add" );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

			it( hasSignature( { type: "string" } ), ():void => {
			} );

			it( "should exists", ():void => {
				expect( AddToken.prototype.toString ).toBeDefined();
				expect( AddToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should override default toString", ():void => {
				expect( AddToken.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should join triples with `joinPatterns` function", ():void => {
				const spy:jasmine.Spy = spyOn( TokenUtils, "joinPatterns" );
				const token:AddToken = new AddToken();
				token.triples.push( new SubjectToken( new IRIToken( "http://example.com/" ) )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property" ) )
						.addObject( new LiteralToken( "literal" ) ) ) );

				token.toString();
				expect( spy ).toHaveBeenCalledWith( token.triples );
			} );

			it( "should return the action", ():void => {
				const token:AddToken = new AddToken();
				token.triples.push( new SubjectToken( new IRIToken( "http://example.com/" ) )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property" ) )
						.addObject( new LiteralToken( "literal" ) ) ) );
				token.triples.push( new SubjectToken( new IRIToken( "http://example.com/" ) )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property2" ) )
						.addObject( new LiteralToken( "literal-2" ) ) ) );

				expect( token.toString() ).toBe( `Add { <http://example.com/> ex:property "literal". <http://example.com/> ex:property2 "literal-2". }.` );
			} );

		} );

	} );

	describe( clazz( "CarbonLDP.LDPatch.DeleteToken", "LD Patch delete action.", [ "sparqler/tokens/TokenNode" ] ), ():void => {

		it( hasProperty( INSTANCE, "token", "delete" ), ():void => {
		} );

		it( hasProperty( INSTANCE, "triples", "sparqler/tokens/SubjectToken[]" ), ():void => {
		} );


		it( "should exists", ():void => {
			expect( DeleteToken ).toBeDefined();
			expect( DeleteToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(), ():void => {
			} );

			it( "should exists", ():void => {
				const token:DeleteToken = new DeleteToken();
				expect( token ).toEqual( jasmine.any( DeleteToken ) );
			} );

			it( "should initialize triples", ():void => {
				const token:DeleteToken = new DeleteToken();
				expect( token.triples ).toEqual( [] );
			} );

			it( "should set token name as `delete`", ():void => {
				const token:DeleteToken = new DeleteToken();
				expect( token.token ).toBe( "delete" );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

			it( hasSignature( { type: "string" } ), ():void => {
			} );

			it( "should exists", ():void => {
				expect( DeleteToken.prototype.toString ).toBeDefined();
				expect( DeleteToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should override default toString", ():void => {
				expect( DeleteToken.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should join triples with `joinPatterns` function", ():void => {
				const spy:jasmine.Spy = spyOn( TokenUtils, "joinPatterns" );
				const token:DeleteToken = new DeleteToken();
				token.triples.push( new SubjectToken( new IRIToken( "http://example.com/" ) )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property" ) )
						.addObject( new LiteralToken( "literal" ) ) ) );

				token.toString();
				expect( spy ).toHaveBeenCalledWith( token.triples );
			} );

			it( "should return the action", ():void => {
				const token:DeleteToken = new DeleteToken();
				token.triples.push( new SubjectToken( new IRIToken( "http://example.com/" ) )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property" ) )
						.addObject( new LiteralToken( "literal" ) ) ) );
				token.triples.push( new SubjectToken( new IRIToken( "http://example.com/" ) )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:property2" ) )
						.addObject( new LiteralToken( "literal-2" ) ) ) );

				expect( token.toString() ).toBe( `Delete { <http://example.com/> ex:property "literal". <http://example.com/> ex:property2 "literal-2". }.` );
			} );

		} );

	} );

	describe( clazz( "CarbonLDP.LDPatch.UpdateListToken", "LD Patch update list action.", [ "sparqler/tokens/TokenNode" ] ), ():void => {

		it( hasProperty( INSTANCE, "token", "updateList" ), ():void => {
		} );

		it( hasProperty( INSTANCE, "subject", "sparqler/tokens/VariableORIRI | sparqler/tokens/BlankNodeToken", ), ():void => {
		} );

		it( hasProperty( INSTANCE, "predicate", "sparqler/tokens/IRIToken | sparqler/tokens/PrefixedNameToken" ), ():void => {
		} );

		it( hasProperty( INSTANCE, "slice", "CarbonLDP.LDPatch.SliceToken" ), ():void => {
		} );

		it( hasProperty( INSTANCE, "collection", "sparqler/tokens/CollectionToken" ), ():void => {
		} );


		it( "should exists", ():void => {
			expect( UpdateListToken ).toBeDefined();
			expect( UpdateListToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "subject", type: "sparqler/tokens/VariableORIRI | sparqler/tokens/BlankNodeToken", description: "The subject that contains the list to update." },
					{ name: "predicate", type: "sparqler/tokens/IRIToken | sparqler/tokens/PrefixedNameToken", description: "The predicate relation to the list to update." },
					{ name: "slice", type: "CarbonLDP.LDPatch.SliceToken", description: "The slice that specifies the index of the elements in the list that will be replaced." },
					{ name: "collection", type: "sparqler/tokens/CollectionToken", description: "The collection to replace the selected elements by the slice token." },
				]
			), ():void => {
			} );

			it( "should exists", ():void => {
				const token:UpdateListToken = new UpdateListToken( null, null, null, null );
				expect( token ).toEqual( jasmine.any( UpdateListToken ) );
			} );

			it( "should set token name as `updateList`", ():void => {
				const token:UpdateListToken = new UpdateListToken( null, null, null, null );
				expect( token.token ).toBe( "updateList" );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

			it( hasSignature( { type: "string" } ), ():void => {
			} );

			it( "should exists", ():void => {
				expect( UpdateListToken.prototype.toString ).toBeDefined();
				expect( UpdateListToken.prototype.toString ).toEqual( jasmine.any( Function ) );
			} );

			it( "should print the action", ():void => {
				const subject:IRIToken = new IRIToken( "http://example.com/" );
				const predicate:PrefixedNameToken = new PrefixedNameToken( "ex:property" );
				const slice:SliceToken = new SliceToken();
				const collection:CollectionToken = new CollectionToken();

				const token:UpdateListToken = new UpdateListToken( subject, predicate, slice, collection );
				expect( token.toString() ).toBe( `UpdateList <http://example.com/> ex:property .. ().` );

				collection.objects.push( new LiteralToken( "value-1" ), new LiteralToken( "value-2" ) );
				expect( token.toString() ).toBe( `UpdateList <http://example.com/> ex:property .. ( "value-1" "value-2" ).` );
			} );

		} );

	} );

	describe( clazz( "CarbonLDP.LDPatch.SliceToken", "LD Patch list slice expression token.", [ "sparqler/tokens/TokenNode" ] ), ():void => {

		it( hasProperty( INSTANCE, "token", "slice" ), ():void => {
		} );

		it( hasProperty( INSTANCE, "minIndex", "number" ), ():void => {
		} );

		it( hasProperty( INSTANCE, "maxIndex", "number" ), ():void => {
		} );


		it( "should exists", ():void => {
			expect( SliceToken ).toBeDefined();
			expect( SliceToken ).toEqual( jasmine.any( Function ) );
		} );

		describe( constructor(), ():void => {

			it( hasSignature(
				[
					{ name: "minIndex", type: "number", optional: true, description: "The minimum index of the list's range to update." },
					{ name: "maxIndex", type: "number", optional: true, description: "The maximum index of the list's range to update." },
				]
			), ():void => {
			} );

			it( "should exists", ():void => {
				const token:SliceToken = new SliceToken();
				expect( token ).toBeDefined();
				expect( token ).toEqual( jasmine.any( SliceToken ) );
			} );

			it( "should store indexes", ():void => {
				const helper:( minIndex:number, maxIndex:number ) => void = ( minIndex, maxIndex ) => {
					const token:SliceToken = new SliceToken( minIndex, maxIndex );
					expect( token.minIndex ).toBe( minIndex );
					expect( token.maxIndex ).toBe( maxIndex );
				};

				helper( 10, 10 );
				helper( 1, 100 );
				helper( 5, - 10 );
			} );

			it( "should ignore minIndex when null", ():void => {
				const helper:( maxIndex:number ) => void = ( maxIndex ) => {
					const token:SliceToken = new SliceToken( null, maxIndex );
					expect( token.minIndex ).toBeUndefined();
					expect( token.maxIndex ).toBe( maxIndex );
				};

				helper( 10 );
				helper( 100 );
				helper( - 10 );
			} );

			it( "should ignore minIndex when undefined", ():void => {
				const helper:( maxIndex:number ) => void = ( maxIndex ) => {
					const token:SliceToken = new SliceToken( void 0, maxIndex );
					expect( token.minIndex ).toBeUndefined();
					expect( token.maxIndex ).toBe( maxIndex );
				};

				helper( 10 );
				helper( 100 );
				helper( - 10 );
			} );

			it( "should ignore maxIndex when null", ():void => {
				const helper:( minIndex:number ) => void = ( minIndex ) => {
					const token:SliceToken = new SliceToken( minIndex, null );
					expect( token.minIndex ).toBe( minIndex );
					expect( token.maxIndex ).toBeUndefined();
				};

				helper( 10 );
				helper( 1 );
				helper( - 5 );
			} );

			it( "should ignore maxIndex when undefined", ():void => {
				const helper:( minIndex:number ) => void = ( minIndex ) => {
					const token:SliceToken = new SliceToken( minIndex );
					expect( token.minIndex ).toBe( minIndex );
					expect( token.maxIndex ).toBeUndefined();
				};

				helper( 10 );
				helper( 1 );
				helper( - 5 );
			} );

			it( "should set token name as `slice`", ():void => {
				const token:SliceToken = new SliceToken();
				expect( token.token ).toBe( "slice" );
			} );

		} );

		describe( method( INSTANCE, "toString" ), ():void => {

			it( hasSignature( { type: "string" } ), ():void => {
			} );

			it( "should override default", ():void => {
				expect( SliceToken.prototype.toString ).toBeDefined();
				expect( SliceToken.prototype.toString ).not.toBe( Object.prototype.toString );
			} );

			it( "should print empty slice", ():void => {
				const token:SliceToken = new SliceToken();
				expect( token.toString() ).toBe( ".." );
			} );

			it( "should print slice from index to last", ():void => {
				const helper:( index:number, expected:string ) => void = ( index, expected ) => {
					const token:SliceToken = new SliceToken( index );
					expect( token.toString() ).toBe( expected );
				};

				helper( 1, "1.." );
				helper( 10, "10.." );
				helper( - 5, "-5.." );
			} );

			it( "should print slice from start to index", ():void => {
				const helper:( index:number, expected:string ) => void = ( index, expected ) => {
					const token:SliceToken = new SliceToken( null, index );
					expect( token.toString() ).toBe( expected );
				};

				helper( 1, "..1" );
				helper( 10, "..10" );
				helper( - 5, "..-5" );
			} );

			it( "should print slice from index to index", ():void => {
				const helper:( minIndex:number, maxIndex:number, expected:string ) => void = ( minIndex, maxIndex, expected ) => {
					const token:SliceToken = new SliceToken( minIndex, maxIndex );
					expect( token.toString() ).toBe( expected );
				};

				helper( 1, 1, "1..1" );
				helper( 10, 5, "10..5" );
				helper( - 10, - 1, "-10..-1" );
			} );

		} );

	} );

} );
