import { CarbonLDP } from "../CarbonLDP";
import { DocumentsRegistry } from "../Registry";
import { PersistedResource } from "../Resource";
import {
	extendsClass,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";
import { Document } from "./Document";
import {
	PersistedDocument,
	PersistedDocumentFactory
} from "./PersistedDocument";
import { TransientDocument } from "./TransientDocument";


function createMock( data?:Partial<PersistedDocument> ):PersistedDocument {
	return PersistedDocument.decorate( Object.assign( {}, data ) );
}


describe( module( "carbonldp/Document" ), ():void => {

	describe( interfaze(
		"CarbonLDP.PersistedDocument",
		"Document that contains base data and methods of a persisted document that can be resolved."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientDocument" ), ():void => {
			const target:TransientDocument = {} as PersistedDocument;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.PersistedResource" ), ():void => {
			const target:PersistedResource = {} as PersistedDocument;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"_context",
			"CarbonLDP.CarbonLDP | undefined"
		), ():void => {
			const target:PersistedDocument[ "_context" ] = {} as CarbonLDP | undefined;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"_registry",
			"CarbonLDP.DocumentsRegistry | undefined"
		), ():void => {
			const target:PersistedDocument[ "_registry" ] = {} as DocumentsRegistry | undefined;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"_resolved",
			"boolean | undefined"
		), ():void => {
			const target:PersistedDocument[ "_resolved" ] = {} as boolean | undefined;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"_eTag",
			"string | undefined"
		), ():void => {
			const target:PersistedDocument[ "_eTag" ] = "" as string | undefined;
			expect( target ).toBeDefined();
		} );


		describe( method(
			OBLIGATORY,
			"isResolved"
		), ():void => {

			it( hasSignature(
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:PersistedDocument = createMock();

				expect( resource.isResolved ).toBeDefined();
				expect( resource.isResolved ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when _resolved undefined", ():void => {
				const resource:PersistedDocument = createMock();

				const returned:boolean = resource.isResolved();
				expect( returned ).toBe( false );
			} );

			it( "should return false when _resolved false", ():void => {
				const resource:PersistedDocument = createMock( { _resolved: false } );

				const returned:boolean = resource.isResolved();
				expect( returned ).toBe( false );
			} );

			it( "should return true when _resolved true", ():void => {
				const resource:PersistedDocument = createMock( { _resolved: true } );

				const returned:boolean = resource.isResolved();
				expect( returned ).toBe( true );
			} );

		} );

		describe( method(
			OBLIGATORY,
			"isOutdated"
		), ():void => {

			it( hasSignature(
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:PersistedDocument = createMock();

				expect( resource.isOutdated ).toBeDefined();
				expect( resource.isOutdated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false if _eTag undefined", ():void => {
				const resource:PersistedDocument = createMock();

				const returned:boolean = resource.isOutdated();
				expect( returned ).toBe( false );
			} );

			it( "should return false if _eTag defined", ():void => {
				const resource:PersistedDocument = createMock( { _eTag: "" } );

				const returned:boolean = resource.isOutdated();
				expect( returned ).toBe( false );
			} );

			it( "should return true if _eTag is null", ():void => {
				const resource:PersistedDocument = createMock( { _eTag: null } );

				const returned:boolean = resource.isOutdated();
				expect( returned ).toBe( true );
			} );

		} );

	} );


	describe( interfaze(
		"CarbonLDP.PersistedDocumentFactory",
		"Interface with the factory and utils for `CarbonLDP.PersistedDocument` objects."
	), ():void => {

		describe( method( OBLIGATORY, "isDecorated" ), ():void => {

			it( hasSignature(
				[
					{ name: "object", type: "object" },
				],
				{ type: "object is CarbonLDP.PersistedDocument" }
			), ():void => {} );


			it( "should exists", ():void => {
				expect( PersistedDocument.isDecorated ).toBeDefined();
				expect( PersistedDocument.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			let object:PersistedDocumentFactory[ "PROTOTYPE" ];
			beforeEach( ():void => {
				const fn:() => any = () => {};

				object = {
					_eTag: void 0,
					_resolved: void 0,

					isOutdated: fn,
					isResolved: fn,

					_savedFragments: [],
					_syncSavedFragments: fn,
				};
			} );

			it( "should return true when all prototype properties", ():void => {
				const returned:boolean = PersistedDocument.isDecorated( object );
				expect( returned ).toBe( true );
			} );

			it( "should return false when missing _eTag", ():void => {
				delete object._eTag;

				const returned:boolean = PersistedDocument.isDecorated( object );
				expect( returned ).toBe( false );
			} );

			it( "should return false when missing _resolved", ():void => {
				delete object._resolved;

				const returned:boolean = PersistedDocument.isDecorated( object );
				expect( returned ).toBe( false );
			} );

			it( "should return false when missing isOutdated", ():void => {
				delete object.isOutdated;

				const returned:boolean = PersistedDocument.isDecorated( object );
				expect( returned ).toBe( false );
			} );

			it( "should return false when missing isResolved", ():void => {
				delete object.isResolved;

				const returned:boolean = PersistedDocument.isDecorated( object );
				expect( returned ).toBe( false );
			} );


			it( "should return false when no _savedFragments", ():void => {
				delete object._savedFragments;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

			it( "should return false when no _syncSavedFragments", ():void => {
				delete object._syncSavedFragments;
				expect( Document.isDecorated( object ) ).toBe( false );
			} );

		} );

		describe( method( OBLIGATORY, "decorate" ), ():void => {

			it( hasSignature(
				[ "T extends object" ],
				[
					{ name: "object", type: "T" },
				],
				{ type: "T & CarbonLDP.PersistedDocument" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( PersistedDocument.decorate ).toBeDefined();
				expect( PersistedDocument.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return add prototype properties", ():void => {
				const resource:PersistedDocument = PersistedDocument.decorate( {} );
				expect( PersistedDocument.isDecorated( resource ) ).toBe( true );
			} );

			it( "should return self object reference", ():void => {
				const object:{} = {};
				const returned:PersistedDocument = PersistedDocument.decorate( object );
				expect( object ).toBe( returned );
			} );

			it( "should decorate with TransientDocument", ():void => {
				const spy:jasmine.Spy = spyOn( TransientDocument, "decorate" );

				PersistedDocument.decorate( { the: "document" } );
				expect( spy ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should decorate with PersistedResource", ():void => {
				const spy:jasmine.Spy = spyOn( PersistedResource, "decorate" );

				PersistedDocument.decorate( { the: "document" } );
				expect( spy ).toHaveBeenCalledWith( { the: "document" } );
			} );

		} );

		describe( method( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				[
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.PersistedDocument" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( PersistedResource.is ).toBeDefined();
				expect( PersistedResource.is ).toEqual( jasmine.any( Function ) );
			} );


			let isTransientDocument:jasmine.Spy;
			let isPersistedResource:jasmine.Spy;
			beforeEach( ():void => {
				isTransientDocument = spyOn( TransientDocument, "is" )
					.and.returnValue( true );
				isPersistedResource = spyOn( PersistedResource, "isDecorated" )
					.and.returnValue( true );
			} );

			it( "should assert if is a TransientDocument", ():void => {
				PersistedDocument.is( { the: "document" } );
				expect( isTransientDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert if is a PersistedResource", ():void => {
				PersistedDocument.is( { the: "document" } );
				expect( isPersistedResource ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert has prototype properties", ():void => {
				const spy:jasmine.Spy = spyOn( PersistedDocument, "isDecorated" );

				PersistedDocument.is( { the: "document" } );
				expect( spy ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should return true when all assertions pass", ():void => {
				spyOn( PersistedDocument, "isDecorated" )
					.and.returnValue( true );

				const returned:boolean = PersistedDocument.is( { the: "document" } );
				expect( returned ).toBe( true );
			} );

		} );

	} );


	describe( property(
		STATIC,
		"PersistedDocument",
		"CarbonLDP.PersistedDocumentFactory"
	), ():void => {

		it( "should exists", ():void => {
			expect( PersistedDocument ).toBeDefined();
			expect( PersistedDocument ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
