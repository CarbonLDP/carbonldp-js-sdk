import { CarbonLDP } from "../CarbonLDP";
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

		it( hasProperty(
			OBLIGATORY,
			"_savedFragments",
			"CarbonLDP.Fragment[]",
			"Array with a copy of every fragment that that is currently persisted in the server."
		), ():void => {} );

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

		} );

		describe( method( OBLIGATORY, "is" ), ():void => {

			it( hasSignature(
				[
					{ name: "value", type: "any" },
				],
				{ type: "value is CarbonLDP.BasePersistedDocument" }
			), ():void => {} );


			let isTransientDocument:jasmine.Spy;
			beforeEach( ():void => {
				isTransientDocument = spyOn( TransientDocument, "is" )
					.and.returnValue( true );
			} );

			it( "should assert if is a TransientDocument", ():void => {
				BasePersistedDocument.is( { the: "document" } );
				expect( isTransientDocument ).toHaveBeenCalledWith( { the: "document" } );
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
