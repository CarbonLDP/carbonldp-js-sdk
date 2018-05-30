import { CarbonLDP } from "../CarbonLDP";
import { DocumentsRegistry } from "../Registry";
import { PersistedResource } from "../Resource";
import {
	extendsClass,
	hasMethod,
	hasProperty,
	hasSignature,
	interfaze,
	method,
	module,
	OBLIGATORY,
	property,
	STATIC
} from "../test/JasmineExtender";
import {
	BasePersistedDocument,
	BasePersistedDocumentFactory
} from "./BasePersistedDocument";
import { Document } from "./Document";
import { TransientDocument } from "./TransientDocument";


function createMock( data?:Partial<BasePersistedDocument> ):BasePersistedDocument {
	return BasePersistedDocument.decorate( Object.assign( {}, data ) );
}


describe( module( "carbonldp/Document" ), ():void => {

	describe( interfaze(
		"CarbonLDP.BasePersistedDocument",
		"Document that contains base data and methods of a persisted document that can be resolved."
	), ():void => {

		it( extendsClass( "CarbonLDP.TransientDocument" ), ():void => {
			const target:TransientDocument = {} as BasePersistedDocument;
			expect( target ).toBeDefined();
		} );

		it( extendsClass( "CarbonLDP.PersistedResource" ), ():void => {
			const target:PersistedResource = {} as BasePersistedDocument;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"_context",
			"CarbonLDP.CarbonLDP | undefined"
		), ():void => {
			const target:BasePersistedDocument[ "_context" ] = {} as CarbonLDP | undefined;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"_registry",
			"CarbonLDP.DocumentsRegistry | undefined"
		), ():void => {
			const target:BasePersistedDocument[ "_registry" ] = {} as DocumentsRegistry | undefined;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"_resolved",
			"boolean | undefined"
		), ():void => {
			const target:BasePersistedDocument[ "_resolved" ] = {} as boolean | undefined;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OBLIGATORY,
			"_eTag",
			"string | undefined",
			"The ETag (entity tag) of the persisted document."
		), ():void => {
			const target:BasePersistedDocument[ "_eTag" ] = "" as string | undefined;
			expect( target ).toBeDefined();
		} );


		it( hasProperty(
			OBLIGATORY,
			"_savedFragments",
			"CarbonLDP.Fragment[]",
			"Array with a copy of every fragment that that is currently persisted in the server."
		), ():void => {} );


		describe( method(
			OBLIGATORY,
			"isResolved"
		), ():void => {

			it( hasSignature(
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:BasePersistedDocument = createMock();

				expect( resource.isResolved ).toBeDefined();
				expect( resource.isResolved ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false when _resolved undefined", ():void => {
				const resource:BasePersistedDocument = createMock();

				const returned:boolean = resource.isResolved();
				expect( returned ).toBe( false );
			} );

			it( "should return false when _resolved false", ():void => {
				const resource:BasePersistedDocument = createMock( { _resolved: false } );

				const returned:boolean = resource.isResolved();
				expect( returned ).toBe( false );
			} );

			it( "should return true when _resolved true", ():void => {
				const resource:BasePersistedDocument = createMock( { _resolved: true } );

				const returned:boolean = resource.isResolved();
				expect( returned ).toBe( true );
			} );

		} );

		describe( method(
			OBLIGATORY,
			"isOutdated",
			"Returns true when the document contains data of multiple requests with different versions of the resource."
		), ():void => {

			it( hasSignature(
				{ type: "boolean" }
			), ():void => {} );

			it( "should exists", ():void => {
				const resource:BasePersistedDocument = createMock();

				expect( resource.isOutdated ).toBeDefined();
				expect( resource.isOutdated ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return false if _eTag undefined", ():void => {
				const resource:BasePersistedDocument = createMock();

				const returned:boolean = resource.isOutdated();
				expect( returned ).toBe( false );
			} );

			it( "should return false if _eTag defined", ():void => {
				const resource:BasePersistedDocument = createMock( { _eTag: "" } );

				const returned:boolean = resource.isOutdated();
				expect( returned ).toBe( false );
			} );

			it( "should return true if _eTag is null", ():void => {
				const resource:BasePersistedDocument = createMock( { _eTag: null } );

				const returned:boolean = resource.isOutdated();
				expect( returned ).toBe( true );
			} );

		} );


		it( hasMethod(
			OBLIGATORY,
			"_syncSavedFragments",
			"Set all the current fragments in the document as fragments that has been saved in the server."
		), ():void => {} );

	} );


	describe( interfaze(
		"CarbonLDP.PersistedDocumentFactory",
		"Interface with the factory and utils for `CarbonLDP.BasePersistedDocument` objects."
	), ():void => {

		describe( method( OBLIGATORY, "isDecorated" ), ():void => {

			it( hasSignature(
				[
					{ name: "object", type: "object" },
				],
				{ type: "object is CarbonLDP.BasePersistedDocument" }
			), ():void => {} );


			it( "should exists", ():void => {
				expect( BasePersistedDocument.isDecorated ).toBeDefined();
				expect( BasePersistedDocument.isDecorated ).toEqual( jasmine.any( Function ) );
			} );


			let object:BasePersistedDocumentFactory[ "PROTOTYPE" ];
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
				const returned:boolean = BasePersistedDocument.isDecorated( object );
				expect( returned ).toBe( true );
			} );

			it( "should return false when missing _eTag", ():void => {
				delete object._eTag;

				const returned:boolean = BasePersistedDocument.isDecorated( object );
				expect( returned ).toBe( false );
			} );

			it( "should return false when missing _resolved", ():void => {
				delete object._resolved;

				const returned:boolean = BasePersistedDocument.isDecorated( object );
				expect( returned ).toBe( false );
			} );

			it( "should return false when missing isOutdated", ():void => {
				delete object.isOutdated;

				const returned:boolean = BasePersistedDocument.isDecorated( object );
				expect( returned ).toBe( false );
			} );

			it( "should return false when missing isResolved", ():void => {
				delete object.isResolved;

				const returned:boolean = BasePersistedDocument.isDecorated( object );
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
				{ type: "T & CarbonLDP.BasePersistedDocument" }
			), ():void => {} );

			it( "should exists", ():void => {
				expect( BasePersistedDocument.decorate ).toBeDefined();
				expect( BasePersistedDocument.decorate ).toEqual( jasmine.any( Function ) );
			} );


			it( "should return add prototype properties", ():void => {
				const resource:BasePersistedDocument = BasePersistedDocument.decorate( {} );
				expect( BasePersistedDocument.isDecorated( resource ) ).toBe( true );
			} );

			it( "should return self object reference", ():void => {
				const object:{} = {};
				const returned:BasePersistedDocument = BasePersistedDocument.decorate( object );
				expect( object ).toBe( returned );
			} );

			it( "should decorate with TransientDocument", ():void => {
				const spy:jasmine.Spy = spyOn( TransientDocument, "decorate" );

				BasePersistedDocument.decorate( { the: "document" } );
				expect( spy ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should decorate with PersistedResource", ():void => {
				const spy:jasmine.Spy = spyOn( PersistedResource, "decorate" );

				BasePersistedDocument.decorate( { the: "document" } );
				expect( spy ).toHaveBeenCalledWith( { the: "document" } );
			} );

		} );

		describe( method( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				[
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.BasePersistedDocument" }
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
				BasePersistedDocument.is( { the: "document" } );
				expect( isTransientDocument ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert if is a PersistedResource", ():void => {
				BasePersistedDocument.is( { the: "document" } );
				expect( isPersistedResource ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should assert has prototype properties", ():void => {
				const spy:jasmine.Spy = spyOn( BasePersistedDocument, "isDecorated" );

				BasePersistedDocument.is( { the: "document" } );
				expect( spy ).toHaveBeenCalledWith( { the: "document" } );
			} );

			it( "should return true when all assertions pass", ():void => {
				spyOn( BasePersistedDocument, "isDecorated" )
					.and.returnValue( true );

				const returned:boolean = BasePersistedDocument.is( { the: "document" } );
				expect( returned ).toBe( true );
			} );

		} );

	} );


	describe( property(
		STATIC,
		"BasePersistedDocument",
		"CarbonLDP.BasePersistedDocumentFactory"
	), ():void => {

		it( "should exists", ():void => {
			expect( BasePersistedDocument ).toBeDefined();
			expect( BasePersistedDocument ).toEqual( jasmine.any( Object ) );
		} );

	} );

} );
