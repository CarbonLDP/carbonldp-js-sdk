import { LimitToken, OffsetToken, OptionalToken, OrderToken, PredicateToken, PrefixedNameToken, SelectToken, SubjectToken, VariableToken } from "sparqler/tokens";

import AbstractContext from "../../AbstractContext";
import { clazz, extendsClass, hasDefaultExport, hasSignature, INSTANCE, method, module } from "../../test/JasmineExtender";
import { IllegalArgumentError, IllegalStateError } from "./../../Errors";
import QueryContextBuilder from "./QueryContextBuilder";
import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as Module from "./QueryDocumentsBuilder";
import { Class as QueryDocumentsBuilder } from "./QueryDocumentsBuilder";
import * as QueryProperty from "./QueryProperty";

describe( module( "Carbon/SPARQL/QueryDocument/QueryDocumentsBuilder" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.Class" ), ():void => {
		expect( Module.default ).toBeDefined();
		expect( Module.default ).toBe( QueryDocumentsBuilder );
	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder.Class", "Class with the helpers and properties for construct a query document" ), ():void => {

		it( "should exists", ():void => {
			expect( QueryDocumentsBuilder ).toBeDefined();
			expect( QueryDocumentsBuilder ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext;
		let queryContext:QueryContextBuilder;
		let baseProperty:QueryProperty.Class;
		let selectToken:SelectToken;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "http://example.com";
			};
			context.setSetting( "vocabulary", "http://example.com/vocab#" );
			context.extendObjectSchema( {
				"ex": "http://example.com/ns#",
			} );

			queryContext = new QueryContextBuilder( context );

			baseProperty = queryContext
				.addProperty( "member" )
				.setOptional( false );

			const membershipResource:VariableToken = queryContext.getVariable( "membershipResource" );
			const hasMemberRelation:VariableToken = queryContext.getVariable( "hasMemberRelation" );
			selectToken = new SelectToken()
				.addVariable( baseProperty.variable )
				.addPattern( new SubjectToken( membershipResource )
					.addPredicate( new PredicateToken( hasMemberRelation )
						.addObject( baseProperty.variable )
					)
				)
			;
			baseProperty.addPattern( selectToken );
		} );

		describe( "QueryDocumentsBuilder.constructor", ():void => {

			it( "should exists", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
				expect( builder ).toBeDefined();
				expect( builder ).toEqual( jasmine.any( QueryDocumentsBuilder ) );
			} );

			it( "should be instantiable", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
				expect( builder ).toBeDefined();
				expect( builder ).toEqual( jasmine.any( QueryDocumentsBuilder ) );
			} );

		} );

		it( extendsClass( "Carbon.QueryDocuments.QueryDocumentBuilder.Class" ), ():void => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
			expect( builder ).toEqual( jasmine.any( QueryDocumentBuilder.Class ) );
		} );

		describe( method( INSTANCE, "orderBy" ), ():void => {

			it( hasSignature(
				"Makes the target documents of the query to return ordered by the property specified.\n" +
				"If no order flow is specified, the default behaviour of SPARQL ordering is used (ascending order).",
				[
					{ name: "property", type: "Carbon.SPARQL.QueryProperty.Class", description: "The property from which the results will be ordered." },
					{ name: "flow", type: `"ASC" | "DESC" | "ascending" | "descending"`, description: "The specific order flow of the query." },
				],
				{ type: "this" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryDocumentsBuilder.prototype.orderBy ).toBeDefined();
				expect( QueryDocumentsBuilder.prototype.orderBy ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error when no select token defined", ():void => {
				baseProperty = queryContext.addProperty( "member" );
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
				const helper:( name:string ) => void = name => () => {
					const property:QueryProperty.Class = new QueryProperty.Class( queryContext, name )
						.addPattern( new SubjectToken( queryContext.getVariable( "member.property" ) ) );
					builder.orderBy( property );
				};

				expect( helper( "member.property" ) ).toThrowError( IllegalStateError, `A sub-select token has not been defined.` );
				expect( helper( "member.property-2" ) ).toThrowError( IllegalStateError, `A sub-select token has not been defined.` );
			} );

			it( "should throw error when no valid property provided", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
				const helper:( name:string ) => void = name => () => {
					if( ! queryContext.hasProperty( name ) ) queryContext.addProperty( name );

					const property:QueryProperty.Class = queryContext.getProperty( name );
					builder.orderBy( property );
				};

				expect( helper( "member.property" ) ).toThrowError( IllegalArgumentError, `The property "member.property" is not a valid property defined by the builder.` );
				expect( helper( "member.property-2" ) ).toThrowError( IllegalArgumentError, `The property "member.property-2" is not a valid property defined by the builder.` );

				expect( helper( "member.property.sub-property" ) ).toThrowError( IllegalArgumentError, `The property "member.property.sub-property" is not a valid property defined by the builder.` );
				expect( helper( "member.property.sub-property-2" ) ).toThrowError( IllegalArgumentError, `The property "member.property.sub-property-2" is not a valid property defined by the builder.` );

				queryContext
					.getProperty( "member.property.sub-property" )
					.addPattern( new SubjectToken( queryContext.getVariable( "member.property" ) )
						.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
							.addObject( queryContext.getVariable( "member.property.sub-property" ) )
						)
					)
				;
				queryContext
					.getProperty( "member.property.sub-property-2" )
					.addPattern( new SubjectToken( queryContext.getVariable( "member.property" ) )
						.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path-2" ) )
							.addObject( queryContext.getVariable( "member.property.sub-property-2" ) )
						)
					)
				;
				expect( helper( "member.property.sub-property" ) ).toThrowError( IllegalArgumentError, `The property "member.property" is not a valid property defined by the builder.` );
				expect( helper( "member.property.sub-property-2" ) ).toThrowError( IllegalArgumentError, `The property "member.property" is not a valid property defined by the builder.` );
			} );

			it( "should return itself", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
				const helper:( name:string ) => void = name => {
					const property:QueryProperty.Class = new QueryProperty.Class( queryContext, name );
					property.addPattern( new SubjectToken( baseProperty.variable )
						.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
							.addObject( property.variable )
						)
					);

					const returnedValue:QueryDocumentsBuilder = builder.orderBy( property );
					expect( returnedValue ).toBe( builder );
				};

				helper( "member.property" );
				helper( "member.property-2" );
			} );

			it( "should add modifier in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty.Class = new QueryProperty.Class( queryContext, "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( property );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable ),
				] );
			} );

			it( "should add modifier with specific `ASC` flow in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty.Class = new QueryProperty.Class( queryContext, "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( property, "ASC" );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable, "ASC" ),
				] );
			} );

			it( "should add modifier with specific `ascending` flow in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty.Class = new QueryProperty.Class( queryContext, "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( property, "ascending" );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable, "ASC" ),
				] );
			} );

			it( "should add modifier with specific `DESC` flow in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty.Class = new QueryProperty.Class( queryContext, "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( property, "DESC" );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable, "DESC" ),
				] );
			} );

			it( "should add modifier with specific `descending` flow in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty.Class = new QueryProperty.Class( queryContext, "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( property, "descending" );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable, "DESC" ),
				] );
			} );

			it( "should error when invalid flow", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty.Class = new QueryProperty.Class( queryContext, "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				const helper:( flow:string ) => void = flow => () => {
					builder.orderBy( property, flow as any );
				};

				expect( helper( "not-descending" ) ).toThrowError( IllegalArgumentError, "Invalid flow order." );
				expect( helper( "_descending" ) ).toThrowError( IllegalArgumentError, "Invalid flow order." );
				expect( helper( "ascend" ) ).toThrowError( IllegalArgumentError, "Invalid flow order." );
				expect( helper( "ascend_ing" ) ).toThrowError( IllegalArgumentError, "Invalid flow order." );
			} );

			it( "should replace existing modifier in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const oldProperty:QueryProperty.Class = new QueryProperty.Class( queryContext, "member.property-1" );
				oldProperty.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( oldProperty.variable )
					)
				);
				builder.orderBy( oldProperty );

				const newProperty:QueryProperty.Class = new QueryProperty.Class( queryContext, "member.property-2" );
				newProperty.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( newProperty.variable )
					)
				);
				builder.orderBy( newProperty );

				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( newProperty.variable ),
				] );
			} );

			it( "should add modifier first that limit modifier", ():void => {
				selectToken.addModifier( new LimitToken( 10 ) );

				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty.Class = new QueryProperty.Class( queryContext, "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( property );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable ),
					new LimitToken( 10 ),
				] );
			} );

			it( "should add modifier first that offset modifier", ():void => {
				selectToken.addModifier( new OffsetToken( 10 ) );

				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty.Class = new QueryProperty.Class( queryContext, "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( property );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable ),
					new OffsetToken( 10 ),
				] );
			} );

			it( "should add the one-level property triple in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty.Class = new QueryProperty.Class( queryContext, "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( property );
				expect( selectToken.patterns ).toEqual( jasmine.arrayContaining( [
					new OptionalToken()
						.addPattern( new SubjectToken( baseProperty.variable )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
								.addObject( property.variable )
							)
						)
					,
				] ) as any );
			} );

			it( "should add the two-level property triple in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty.Class = queryContext.addProperty( "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				const subProperty:QueryProperty.Class = queryContext.addProperty( "member.property.subProperty" );
				subProperty.addPattern( new SubjectToken( property.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:sub-path" ) )
						.addObject( subProperty.variable )
					)
				);

				builder.orderBy( subProperty );
				expect( selectToken.patterns ).toEqual( [
					jasmine.any( SubjectToken ) as any,
					new OptionalToken()
						.addPattern( new SubjectToken( baseProperty.variable )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
								.addObject( property.variable )
							)
						)
						.addPattern( new OptionalToken()
							.addPattern( new SubjectToken( property.variable )
								.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:sub-path" ) )
									.addObject( subProperty.variable )
								)
							)
						)
					,
				] );
			} );

			it( "should replace the property triple in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const oldProperty:QueryProperty.Class = new QueryProperty.Class( queryContext, "member.property-1" );
				oldProperty.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( oldProperty.variable )
					)
				);
				builder.orderBy( oldProperty );

				const newProperty:QueryProperty.Class = new QueryProperty.Class( queryContext, "member.property-2" );
				newProperty.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( newProperty.variable )
					)
				);
				builder.orderBy( newProperty );

				expect( selectToken.patterns ).not.toEqual( jasmine.arrayContaining( [
					new OptionalToken()
						.addPattern( new SubjectToken( baseProperty.variable )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
								.addObject( oldProperty.variable )
							)
						)
					,
				] ) as any );

				expect( selectToken.patterns ).toEqual( jasmine.arrayContaining( [
					new OptionalToken()
						.addPattern( new SubjectToken( baseProperty.variable )
							.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
								.addObject( newProperty.variable )
							)
						)
					,
				] ) as any );
			} );

		} );

		describe( method( INSTANCE, "limit" ), ():void => {

			it( hasSignature(
				"Limit the target results to be returned by the number specified.",
				[
					{ name: "limit", type: "number", description: "The maximum number of targeted results." },
				],
				{ type: "this" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryDocumentsBuilder.prototype.limit ).toBeDefined();
				expect( QueryDocumentsBuilder.prototype.limit ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error when no select token defined", ():void => {
				baseProperty = queryContext.addProperty( "member" );
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
				const helper:( limit:number ) => void = limit => () => {
					builder.limit( limit );
				};

				expect( helper( 10 ) ).toThrowError( IllegalStateError, `A sub-select token has not been defined.` );
				expect( helper( 100 ) ).toThrowError( IllegalStateError, `A sub-select token has not been defined.` );
			} );

			it( "should return itself", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
				const helper:( limit:number ) => void = limit => {
					const returnedValue:QueryDocumentsBuilder = builder.limit( limit );
					expect( returnedValue ).toBe( builder );
				};

				helper( 10 );
				helper( 100 );
			} );

			it( "should add modifier in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				builder.limit( 10 );
				expect( selectToken.modifiers ).toEqual( [
					new LimitToken( 10 ),
				] );
			} );

			it( "should replace the modifier in the sub-select", ():void => {
				selectToken.modifiers.push( new LimitToken( 10 ) );
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				builder.limit( 100 );
				expect( selectToken.modifiers ).toEqual( [
					new LimitToken( 100 ),
				] );
			} );

			it( "should add modifier last that offset modifier", ():void => {
				selectToken.modifiers.push( new OffsetToken( 10 ) );
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				builder.limit( 100 );
				expect( selectToken.modifiers ).toEqual( [
					new OffsetToken( 10 ),
					new LimitToken( 100 ),
				] );
			} );

			it( "should add modifier last that order modifier", ():void => {
				selectToken.modifiers.push( new OrderToken( queryContext.getVariable( "member.property" ) ) );
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				builder.limit( 100 );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( queryContext.getVariable( "member.property" ) ),
					new LimitToken( 100 ),
				] );
			} );

		} );

		describe( method( INSTANCE, "offset" ), ():void => {

			it( hasSignature(
				"Set an offset in the target results to be returned.",
				[
					{ name: "offset", type: "number", description: "The offset number to be applied to the targeted results." },
				],
				{ type: "this" }
			), ():void => {
			} );

			it( "should exists", ():void => {
				expect( QueryDocumentsBuilder.prototype.offset ).toBeDefined();
				expect( QueryDocumentsBuilder.prototype.offset ).toEqual( jasmine.any( Function ) );
			} );

			it( "should throw error when no select token defined", ():void => {
				baseProperty = queryContext.addProperty( "member" );
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
				const helper:( offset:number ) => void = offset => () => {
					builder.offset( offset );
				};

				expect( helper( 10 ) ).toThrowError( IllegalStateError, `A sub-select token has not been defined.` );
				expect( helper( 100 ) ).toThrowError( IllegalStateError, `A sub-select token has not been defined.` );
			} );

			it( "should return itself", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
				const helper:( offset:number ) => void = offset => {
					const returnedValue:QueryDocumentsBuilder = builder.offset( offset );
					expect( returnedValue ).toBe( builder );
				};

				helper( 10 );
				helper( 100 );
			} );

			it( "should add modifier in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				builder.offset( 10 );
				expect( selectToken.modifiers ).toEqual( [
					new OffsetToken( 10 ),
				] );
			} );

			it( "should replace the modifier in the sub-select", ():void => {
				selectToken.modifiers.push( new OffsetToken( 10 ) );
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				builder.offset( 100 );
				expect( selectToken.modifiers ).toEqual( [
					new OffsetToken( 100 ),
				] );
			} );

			it( "should add modifier last that limit modifier", ():void => {
				selectToken.modifiers.push( new LimitToken( 10 ) );
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				builder.offset( 100 );
				expect( selectToken.modifiers ).toEqual( [
					new LimitToken( 10 ),
					new OffsetToken( 100 ),
				] );
			} );

			it( "should add modifier last that order modifier", ():void => {
				selectToken.modifiers.push( new OrderToken( queryContext.getVariable( "member.property" ) ) );
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				builder.offset( 100 );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( queryContext.getVariable( "member.property" ) ),
					new OffsetToken( 100 ),
				] );
			} );

		} );

	} );

} );
