import AbstractContext from "../../AbstractContext";
import * as Pointer from "../../Pointer";
import { clazz, constructor, hasDefaultExport, INSTANCE, method, module, property } from "../../test/JasmineExtender";
import QueryContext from "./QueryContext";
import * as Module from "./QueryDocumentBuilder";
import { Class as QueryDocumentBuilder } from "./QueryDocumentBuilder";
import * as QueryObject from "./QueryObject";
import * as QueryValue from "./QueryValue";

describe( module( "Carbon/SPARQL/QueryDocument/QueryDocumentBuilder" ), ():void => {

	it( "should exists", ():void => {
		expect( Module ).toBeDefined();
		expect( Module ).toEqual( jasmine.any( Object ) );
	} );

	it( hasDefaultExport( "Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.Class" ), ():void => {
		expect( Module.default ).toBeDefined();
		expect( Module.default ).toBe( QueryDocumentBuilder );
	} );

	describe( clazz( "Carbon.SPARQL.QueryDocument.QueryDocumentBuilder.Class", "Class with the helpers and properties for construct a query document" ), ():void => {

		it( "should exists", ():void => {
			expect( QueryDocumentBuilder ).toBeDefined();
			expect( QueryDocumentBuilder ).toEqual( jasmine.any( Function ) );
		} );

		let context:AbstractContext;
		let queryContext:QueryContext;
		beforeEach( ():void => {
			context = new class extends AbstractContext {
				protected _baseURI:string = "http://example.com";
			};
			queryContext = new QueryContext( context );
		} );

		describe( constructor(), ():void => {

			it( "should exists", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				expect( builder ).toBeDefined();
				expect( builder ).toEqual( jasmine.any( QueryDocumentBuilder ) );
			} );

		} );

		describe( property( INSTANCE, "inherit", "Readonly<{}>" ), ():void => {

			it( "should exists", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				expect( builder.inherit ).toBeDefined();
				expect( builder.inherit ).toEqual( jasmine.any( Object ) );
			} );

			it( "should be frozen", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				expect( builder.inherit ).toBeDefined();
				expect( Object.isFrozen( builder.inherit ) ).toBe( true );
			} );

			it( "should be the same for every builder", ():void => {
				const builder1:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				const builder2:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				const builder3:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );

				expect( builder1.inherit ).toBe( builder2.inherit );
				expect( builder1.inherit ).toBe( builder3.inherit );
				expect( builder2.inherit ).toBe( builder3.inherit );
			} );

		} );

		describe( method( INSTANCE, "property" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.property ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.property ).toEqual( jasmine.any( Function ) );
			} );

			it( "should call the `getProperty` of the query context", ():void => {
				const spy:jasmine.Spy = spyOn( queryContext, "getProperty" );
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );

				builder.property( "name" );
				expect( spy ).toHaveBeenCalledWith( "name" );
				builder.property( "object.name" );
				expect( spy ).toHaveBeenCalledWith( "object.name" );
			} );

		} );

		describe( method( INSTANCE, "value" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.value ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.value ).toEqual( jasmine.any( Function ) );
			} );

			it( "should create a QueryValue with the name provided", ():void => {
				const spy:jasmine.Spy = spyOn( QueryValue, "Class" );
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );

				builder.value( "name" );
				expect( spy ).toHaveBeenCalledWith( queryContext, "name" );

				builder.value( 1 );
				expect( spy ).toHaveBeenCalledWith( queryContext, 1 );

				builder.value( true );
				expect( spy ).toHaveBeenCalledWith( queryContext, true );

				const date:Date = new Date();
				builder.value( date );
				expect( spy ).toHaveBeenCalledWith( queryContext, date );
			} );

			it( "should return a QueryValue", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				expect( builder.value( "value" ) ).toEqual( jasmine.any( QueryValue.Class ) );
				expect( builder.value( 10.01 ) ).toEqual( jasmine.any( QueryValue.Class ) );
				expect( builder.value( true ) ).toEqual( jasmine.any( QueryValue.Class ) );
				expect( builder.value( new Date() ) ).toEqual( jasmine.any( QueryValue.Class ) );
			} );

		} );

		describe( method( INSTANCE, "object" ), ():void => {

			it( "should exists", ():void => {
				expect( QueryDocumentBuilder.prototype.object ).toBeDefined();
				expect( QueryDocumentBuilder.prototype.object ).toEqual( jasmine.any( Function ) );
			} );

			it( "should create a QueryObject with the name provided", ():void => {
				const spy:jasmine.Spy = spyOn( QueryObject, "Class" );
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );

				builder.object( "http://example.com/resource/" );
				expect( spy ).toHaveBeenCalledWith( queryContext, "http://example.com/resource/" );

				const pointer:Pointer.Class = context.documents.getPointer( "http://example.com/resource/" );
				builder.object( pointer );
				expect( spy ).toHaveBeenCalledWith( queryContext, pointer );
			} );

			it( "should return a QueryObject", ():void => {
				const builder:QueryDocumentBuilder = new QueryDocumentBuilder( queryContext );
				expect( builder.object( "http://example.com/resource/" ) ).toEqual( jasmine.any( QueryObject.Class ) );
				expect( builder.object( context.documents.getPointer( "http://example.com/resource/" ) ) ).toEqual( jasmine.any( QueryObject.Class ) );
			} );

		} );

	} );

} );
