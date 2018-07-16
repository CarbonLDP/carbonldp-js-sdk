import {
	LimitToken,
	OffsetToken,
	OptionalToken,
	OrderToken,
	PredicateToken,
	PrefixedNameToken,
	SelectToken,
	SubjectToken,
	VariableToken
} from "sparqler/tokens";

import { createMockContext } from "../../test/helpers/mocks";

import { AbstractContext } from "../Context/AbstractContext";

import { IllegalArgumentError } from "../Errors/IllegalArgumentError";
import { IllegalStateError } from "../Errors/IllegalStateError";

import {
	clazz,
	extendsClass,
	hasProperty,
	hasSignature,
	INSTANCE,
	interfaze,
	method,
	module,
	OBLIGATORY,
	OPTIONAL
} from "../test/JasmineExtender";

import { QueryContextBuilder } from "./QueryContextBuilder";
import { QueryDocumentBuilder } from "./QueryDocumentBuilder";
import * as Module from "./QueryDocumentsBuilder";
import { QueryDocumentsBuilder, QueryDocumentsBuilderOrderData } from "./QueryDocumentsBuilder";
import { QueryProperty } from "./QueryProperty";


describe( module( "carbonldp/QueryDocuments/QueryDocumentsBuilder" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	describe( interfaze(
		"CarbonLDP.SPARQLER.QueryDocument.QueryDocumentBuilderOrderData",
		"Interface that specifies the data of the order wanted fot the result query."
	), () => {

		it( hasProperty(
			OBLIGATORY,
			"path",
			"string",
			"The path to the property that specifies the order of the query."
		), ():void => {
			const target:QueryDocumentsBuilderOrderData[ "path" ] = "path" as string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"flow",
			"\"ASC\" | \"DESC\"",
			"The flow of the order wanted."
		), ():void => {
			const target:QueryDocumentsBuilderOrderData[ "flow" ] = "ASC" as "ASC" | "DESC";
			expect( target ).toBeDefined();
		} );

	} );

	describe( clazz(
		"CarbonLDP.QueryDocuments.QueryDocumentsBuilder",
		"Class with the helpers and properties for construct a query document"
	), ():void => {

		it( "should exists", ():void => {
			expect( QueryDocumentsBuilder ).toBeDefined();
			expect( QueryDocumentsBuilder ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext<any, any>;
		let queryContext:QueryContextBuilder;
		let baseProperty:QueryProperty;
		let selectToken:SelectToken;
		beforeEach( ():void => {
			context = createMockContext( {
				uri: "http://example.com",
				settings: { vocabulary: "http://example.com/vocab#" },
			} );
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

		it( extendsClass( "CarbonLDP.QueryDocuments.QueryDocumentBuilder.Class" ), ():void => {
			const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
			expect( builder ).toEqual( jasmine.any( QueryDocumentBuilder ) );
		} );

		describe( method( INSTANCE, "orderBy" ), ():void => {

			it( hasSignature(
				"Makes the target documents of the query to return ordered by the property specified.\n" +
				"If no order flow is specified, the default behaviour of SPARQL ordering is used (ascending order).",
				[
					{ name: "property", type: "string", description: "The property name from which the results will be ordered." },
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
					queryContext.addProperty( `${ baseProperty.name }.${ name }` );
					builder.orderBy( name );
				};

				expect( helper( "member.property" ) ).toThrowError( IllegalStateError, `A sub-select token has not been defined.` );
				expect( helper( "member.property-2" ) ).toThrowError( IllegalStateError, `A sub-select token has not been defined.` );
			} );

			it( "should throw error when no valid property provided", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
				const helper:( name:string ) => void = name => () => {
					const fullName:string = `${ baseProperty.name }.${ name }`;
					if( ! queryContext.hasProperty( fullName ) ) queryContext.addProperty( fullName );

					builder.orderBy( name );
				};

				expect( helper( "property" ) ).toThrowError( IllegalArgumentError, `The property "member.property" is not a valid property defined by the builder.` );
				expect( helper( "property-2" ) ).toThrowError( IllegalArgumentError, `The property "member.property-2" is not a valid property defined by the builder.` );

				expect( helper( "property.sub-property" ) ).toThrowError( IllegalArgumentError, `The property "member.property.sub-property" is not a valid property defined by the builder.` );
				expect( helper( "property.sub-property-2" ) ).toThrowError( IllegalArgumentError, `The property "member.property.sub-property-2" is not a valid property defined by the builder.` );

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
				expect( helper( "property.sub-property" ) ).toThrowError( IllegalArgumentError, `The property "member.property" is not a valid property defined by the builder.` );
				expect( helper( "property.sub-property-2" ) ).toThrowError( IllegalArgumentError, `The property "member.property" is not a valid property defined by the builder.` );
			} );

			it( "should return itself", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
				const helper:( name:string ) => void = name => {
					const property:QueryProperty = queryContext.addProperty( `${ baseProperty.name }.${ name }` );
					property.addPattern( new SubjectToken( baseProperty.variable )
						.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
							.addObject( property.variable )
						)
					);

					const returnedValue:QueryDocumentsBuilder = builder.orderBy( name );
					expect( returnedValue ).toBe( builder );
				};

				helper( "property" );
				helper( "property-2" );
			} );

			it( "should add modifier in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty = queryContext.addProperty( "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( "property" );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable ),
				] );
			} );

			it( "should add modifier with specific `ASC` flow in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty = queryContext.addProperty( "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( "property", "ASC" );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable, "ASC" ),
				] );
			} );

			it( "should add modifier with specific `ascending` flow in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty = queryContext.addProperty( "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( "property", "ascending" );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable, "ASC" ),
				] );
			} );

			it( "should add modifier with specific `DESC` flow in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty = queryContext.addProperty( "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( "property", "DESC" );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable, "DESC" ),
				] );
			} );

			it( "should add modifier with specific `descending` flow in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty = queryContext.addProperty( "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( "property", "descending" );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable, "DESC" ),
				] );
			} );

			it( "should error when invalid flow", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				queryContext.addProperty( "member.property" );
				const helper:( flow:string ) => void = flow => () => {
					builder.orderBy( "property", flow as any );
				};

				expect( helper( "not-descending" ) ).toThrowError( IllegalArgumentError, "Invalid flow order." );
				expect( helper( "_descending" ) ).toThrowError( IllegalArgumentError, "Invalid flow order." );
				expect( helper( "ascend" ) ).toThrowError( IllegalArgumentError, "Invalid flow order." );
				expect( helper( "ascend_ing" ) ).toThrowError( IllegalArgumentError, "Invalid flow order." );
			} );

			it( "should replace existing modifier in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const oldProperty:QueryProperty = queryContext.addProperty( "member.property-1" );
				oldProperty.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( oldProperty.variable )
					)
				);
				builder.orderBy( "property-1" );

				const newProperty:QueryProperty = queryContext.addProperty( "member.property-2" );
				newProperty.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( newProperty.variable )
					)
				);
				builder.orderBy( "property-2" );

				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( newProperty.variable ),
				] );
			} );

			it( "should add modifier first that limit modifier", ():void => {
				selectToken.addModifier( new LimitToken( 10 ) );

				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty = queryContext.addProperty( "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( "property" );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable ),
					new LimitToken( 10 ),
				] );
			} );

			it( "should add modifier first that offset modifier", ():void => {
				selectToken.addModifier( new OffsetToken( 10 ) );

				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty = queryContext.addProperty( "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( "property" );
				expect( selectToken.modifiers ).toEqual( [
					new OrderToken( property.variable ),
					new OffsetToken( 10 ),
				] );
			} );

			it( "should add the one-level property triple in the sub-select", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty = queryContext.addProperty( "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( "property" );
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

				const property:QueryProperty = queryContext.addProperty( "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				const subProperty:QueryProperty = queryContext.addProperty( "member.property.subProperty" );
				subProperty.addPattern( new SubjectToken( property.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:sub-path" ) )
						.addObject( subProperty.variable )
					)
				);

				builder.orderBy( "property.subProperty" );
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

				const oldProperty:QueryProperty = queryContext.addProperty( "member.property-1" );
				oldProperty.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( oldProperty.variable )
					)
				);
				builder.orderBy( "property-1" );

				const newProperty:QueryProperty = queryContext.addProperty( "member.property-2" );
				newProperty.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( newProperty.variable )
					)
				);
				builder.orderBy( "property-2" );

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

			it( "should store the order path", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty = queryContext.addProperty( "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( "property" );
				expect( builder._orderData ).toEqual( {
					path: "property",
					flow: void 0,
				} );
			} );

			it( "should store the order flow", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );

				const property:QueryProperty = queryContext.addProperty( "member.property" );
				property.addPattern( new SubjectToken( baseProperty.variable )
					.addPredicate( new PredicateToken( new PrefixedNameToken( "ex:path" ) )
						.addObject( property.variable )
					)
				);

				builder.orderBy( "property", "DESC" );
				expect( builder._orderData ).toEqual( {
					path: "property",
					flow: "DESC",
				} );
			} );

			it( "should not store the order data when invalid property", ():void => {
				const builder:QueryDocumentsBuilder = new QueryDocumentsBuilder( queryContext, baseProperty );
				const helper:( name:string ) => void = name => () => {
					if( ! queryContext.hasProperty( name ) ) queryContext.addProperty( name );

					builder.orderBy( name );
				};

				expect( helper( "member.property" ) ).toThrow();
				expect( builder._orderData ).toBeUndefined();
				expect( helper( "member.property-2" ) ).toThrow();
				expect( builder._orderData ).toBeUndefined();

				expect( helper( "member.property.sub-property" ) ).toThrow();
				expect( builder._orderData ).toBeUndefined();
				expect( helper( "member.property.sub-property-2" ) ).toThrow();
				expect( builder._orderData ).toBeUndefined();

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
				expect( helper( "member.property.sub-property" ) ).toThrow();
				expect( builder._orderData ).toBeUndefined();
				expect( helper( "member.property.sub-property-2" ) ).toThrow();
				expect( builder._orderData ).toBeUndefined();
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
