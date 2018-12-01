import { CollectionToken, IRIRefToken, LiteralToken, PrefixedNameToken, PropertyToken, SubjectToken } from "sparqler/tokens";

import { AddToken, DeleteToken, LDPatchToken, PrefixToken, SliceToken, UpdateListToken } from "./Tokens";


describe( "LDPatchToken", () => {

	it( "should exist", () => {
		expect( LDPatchToken ).toBeDefined();
		expect( LDPatchToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "LDPatchToken.constructor", () => {

		it( "should be instantiable", () => {
			const token:LDPatchToken = new LDPatchToken();
			expect( token ).toEqual( jasmine.any( LDPatchToken ) );
		} );


		it( "should initialize prologues", () => {
			const token:LDPatchToken = new LDPatchToken();
			expect( token.prologues ).toEqual( [] );
		} );

		it( "should initialize statements", () => {
			const token:LDPatchToken = new LDPatchToken();
			expect( token.statements ).toEqual( [] );
		} );

		it( "should set token name as `ldpatch`", () => {
			const token:LDPatchToken = new LDPatchToken();
			expect( token.token ).toBe( "ldpatch" );
		} );

	} );

	describe( "LDPatchToken.toString", () => {

		it( "should exist", () => {
			expect( LDPatchToken.prototype.toString ).toBeDefined();
			expect( LDPatchToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );


		it( "should override default toString", () => {
			expect( LDPatchToken.prototype.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the list of actions", () => {
			const token:LDPatchToken = new LDPatchToken();
			token.prologues.push( ...[
				new PrefixToken( "profile", new IRIRefToken( "http://ogp.me/ns/profile#" ) ),
				new PrefixToken( "ex", new IRIRefToken( "http://example.org/vocab#" ) ),
			] );

			const resource:IRIRefToken = new IRIRefToken( "#" );

			const deleteName:DeleteToken = new DeleteToken();
			deleteName.triples.push( new SubjectToken( resource )
				.addProperty( new PropertyToken( new PrefixedNameToken( "profile", "first_name" ) )
					.addObject( new LiteralToken( "Tim" ) ) ) );

			const addNameAndImage:AddToken = new AddToken();
			addNameAndImage.triples.push( new SubjectToken( resource )
				.addProperty( new PropertyToken( new PrefixedNameToken( "profile", "first_name" ) )
					.addObject( new LiteralToken( "Timothy" ) ) )
				.addProperty( new PropertyToken( new PrefixedNameToken( "profile", "image" ) )
					.addObject( new IRIRefToken( "https://example.org/tim.jpg" ) ) ) );

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

describe( "PrefixToken", () => {

	it( "should exist", () => {
		expect( PrefixToken ).toBeDefined();
		expect( PrefixToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "PrefixToken.constructor", () => {

		it( "should be instantiable", () => {
			const token:PrefixToken = new PrefixToken( null, null );
			expect( token ).toEqual( jasmine.any( PrefixToken ) );
		} );


		it( "should initialize prefix namespace", () => {
			const namespace:string = "prefix_name";
			const token:PrefixToken = new PrefixToken( namespace, null );
			expect( token.namespace ).toBe( namespace );
		} );

		it( "should initialize iri", () => {
			const iri:IRIRefToken = new IRIRefToken( "http://example.com/" );
			const token:PrefixToken = new PrefixToken( null, iri );
			expect( token.iri ).toBe( iri );
		} );

		it( "should set token name as `prefix`", () => {
			const token:PrefixToken = new PrefixToken( null, null );
			expect( token.token ).toBe( "prefix" );
		} );

	} );

	describe( "PrefixToken.toString", () => {

		it( "should exist", () => {
			expect( PrefixToken.prototype.toString ).toBeDefined();
			expect( PrefixToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );


		it( "should override default toString", () => {
			expect( PrefixToken.prototype.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the prefix", () => {
			const token:PrefixToken = new PrefixToken( "ex", new IRIRefToken( "http://example.com/" ) );

			expect( token.toString() ).toBe( `@prefix ex: <http://example.com/>.` );
		} );

	} );

} );

describe( "AddToken", () => {

	it( "should exist", () => {
		expect( AddToken ).toBeDefined();
		expect( AddToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "AddToken.constructor", () => {

		it( "should be instantiable", () => {
			const token:AddToken = new AddToken();
			expect( token ).toEqual( jasmine.any( AddToken ) );
		} );

		it( "should initialize triples", () => {
			const token:AddToken = new AddToken();
			expect( token.triples ).toEqual( [] );
		} );

		it( "should set token name as `add`", () => {
			const token:AddToken = new AddToken();
			expect( token.token ).toBe( "add" );
		} );

	} );

	describe( "AddToken.toString", () => {

		it( "should exist", () => {
			expect( AddToken.prototype.toString ).toBeDefined();
			expect( AddToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );


		it( "should override default toString", () => {
			expect( AddToken.prototype.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the action", () => {
			const token:AddToken = new AddToken();
			token.triples.push( new SubjectToken( new IRIRefToken( "http://example.com/" ) )
				.addProperty( new PropertyToken( new PrefixedNameToken( "ex:property" ) )
					.addObject( new LiteralToken( "literal" ) ) ) );
			token.triples.push( new SubjectToken( new IRIRefToken( "http://example.com/" ) )
				.addProperty( new PropertyToken( new PrefixedNameToken( "ex:property2" ) )
					.addObject( new LiteralToken( "literal-2" ) ) ) );

			expect( token.toString() ).toBe( `Add { <http://example.com/> ex:property "literal". <http://example.com/> ex:property2 "literal-2". }.` );
		} );

	} );

} );

describe( "DeleteToken", () => {

	it( "should exist", () => {
		expect( DeleteToken ).toBeDefined();
		expect( DeleteToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "DeleteToken.constructor", () => {

		it( "should be instantiable", () => {
			const token:DeleteToken = new DeleteToken();
			expect( token ).toEqual( jasmine.any( DeleteToken ) );
		} );


		it( "should initialize triples", () => {
			const token:DeleteToken = new DeleteToken();
			expect( token.triples ).toEqual( [] );
		} );

		it( "should set token name as `delete`", () => {
			const token:DeleteToken = new DeleteToken();
			expect( token.token ).toBe( "delete" );
		} );

	} );

	describe( "DeleteToken.toString", () => {

		it( "should exist", () => {
			expect( DeleteToken.prototype.toString ).toBeDefined();
			expect( DeleteToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );


		it( "should override default toString", () => {
			expect( DeleteToken.prototype.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should return the action", () => {
			const token:DeleteToken = new DeleteToken();
			token.triples.push( new SubjectToken( new IRIRefToken( "http://example.com/" ) )
				.addProperty( new PropertyToken( new PrefixedNameToken( "ex:property" ) )
					.addObject( new LiteralToken( "literal" ) ) ) );
			token.triples.push( new SubjectToken( new IRIRefToken( "http://example.com/" ) )
				.addProperty( new PropertyToken( new PrefixedNameToken( "ex:property2" ) )
					.addObject( new LiteralToken( "literal-2" ) ) ) );

			expect( token.toString() ).toBe( `Delete { <http://example.com/> ex:property "literal". <http://example.com/> ex:property2 "literal-2". }.` );
		} );

	} );

} );

describe( "UpdateListToken", () => {

	it( "should exist", () => {
		expect( UpdateListToken ).toBeDefined();
		expect( UpdateListToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "UpdateListToken.constructor", () => {

		it( "should be instantiable", () => {
			const token:UpdateListToken = new UpdateListToken( null, null, null, null );
			expect( token ).toEqual( jasmine.any( UpdateListToken ) );
		} );

		it( "should set token name as `updateList`", () => {
			const token:UpdateListToken = new UpdateListToken( null, null, null, null );
			expect( token.token ).toBe( "updateList" );
		} );

	} );

	describe( "UpdateListToken.toString", () => {

		it( "should exist", () => {
			expect( UpdateListToken.prototype.toString ).toBeDefined();
			expect( UpdateListToken.prototype.toString ).toEqual( jasmine.any( Function ) );
		} );


		it( "should print the action", () => {
			const subject:IRIRefToken = new IRIRefToken( "http://example.com/" );
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

describe( "SliceToken", () => {

	it( "should exist", () => {
		expect( SliceToken ).toBeDefined();
		expect( SliceToken ).toEqual( jasmine.any( Function ) );
	} );

	describe( "SliceToken.constructor", () => {

		it( "should be instantiable", () => {
			const token:SliceToken = new SliceToken();
			expect( token ).toBeDefined();
			expect( token ).toEqual( jasmine.any( SliceToken ) );
		} );


		it( "should store indexes", () => {
			const helper:( minIndex:number, maxIndex:number ) => void = ( minIndex, maxIndex ) => {
				const token:SliceToken = new SliceToken( minIndex, maxIndex );
				expect( token.minIndex ).toBe( minIndex );
				expect( token.maxIndex ).toBe( maxIndex );
			};

			helper( 10, 10 );
			helper( 1, 100 );
			helper( 5, - 10 );
		} );

		it( "should ignore minIndex when null", () => {
			const helper:( maxIndex:number ) => void = ( maxIndex ) => {
				const token:SliceToken = new SliceToken( null, maxIndex );
				expect( token.minIndex ).toBeUndefined();
				expect( token.maxIndex ).toBe( maxIndex );
			};

			helper( 10 );
			helper( 100 );
			helper( - 10 );
		} );

		it( "should ignore minIndex when undefined", () => {
			const helper:( maxIndex:number ) => void = ( maxIndex ) => {
				const token:SliceToken = new SliceToken( void 0, maxIndex );
				expect( token.minIndex ).toBeUndefined();
				expect( token.maxIndex ).toBe( maxIndex );
			};

			helper( 10 );
			helper( 100 );
			helper( - 10 );
		} );

		it( "should ignore maxIndex when null", () => {
			const helper:( minIndex:number ) => void = ( minIndex ) => {
				const token:SliceToken = new SliceToken( minIndex, null );
				expect( token.minIndex ).toBe( minIndex );
				expect( token.maxIndex ).toBeUndefined();
			};

			helper( 10 );
			helper( 1 );
			helper( - 5 );
		} );

		it( "should ignore maxIndex when undefined", () => {
			const helper:( minIndex:number ) => void = ( minIndex ) => {
				const token:SliceToken = new SliceToken( minIndex );
				expect( token.minIndex ).toBe( minIndex );
				expect( token.maxIndex ).toBeUndefined();
			};

			helper( 10 );
			helper( 1 );
			helper( - 5 );
		} );

		it( "should set token name as `slice`", () => {
			const token:SliceToken = new SliceToken();
			expect( token.token ).toBe( "slice" );
		} );

	} );

	describe( "SliceToken.toString", () => {

		it( "should override default", () => {
			expect( SliceToken.prototype.toString ).toBeDefined();
			expect( SliceToken.prototype.toString ).not.toBe( Object.prototype.toString );
		} );

		it( "should print empty slice", () => {
			const token:SliceToken = new SliceToken();
			expect( token.toString() ).toBe( ".." );
		} );

		it( "should print slice from index to last", () => {
			const helper:( index:number, expected:string ) => void = ( index, expected ) => {
				const token:SliceToken = new SliceToken( index );
				expect( token.toString() ).toBe( expected );
			};

			helper( 1, "1.." );
			helper( 10, "10.." );
			helper( - 5, "-5.." );
		} );

		it( "should print slice from start to index", () => {
			const helper:( index:number, expected:string ) => void = ( index, expected ) => {
				const token:SliceToken = new SliceToken( null, index );
				expect( token.toString() ).toBe( expected );
			};

			helper( 1, "..1" );
			helper( 10, "..10" );
			helper( - 5, "..-5" );
		} );

		it( "should print slice from index to index", () => {
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
