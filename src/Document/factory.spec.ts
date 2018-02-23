import { Minus } from "../../test/helpers/types";

import { Resource } from "../Resource";
import * as Module from "./factory";
import {
	createDocument,
	createDocumentFrom,
	decorateDocument,
	isDecoratedDocument,
	isDocument
} from "./factory";
import { Document } from "./index";


type DocumentProperties = Minus<Document, Resource>;

function mockDocumentProperties():DocumentProperties {
	return {
		hasMemberRelation: null,
		isMemberOfRelation: null,
		defaultInteractionModel: null,

		_fragmentsIndex: null,
		_normalize: ():any => {},
		_removeFragment: ():any => {},

		hasPointer: ():any => {},
		getPointer: ():any => {},

		inScope: ():any => {},

		hasFragment: ():any => {},
		getFragment: ():any => {},
		getNamedFragment: ():any => {},
		getFragments: ():any => {},
		createFragment: ():any => {},
		createNamedFragment: ():any => {},
		removeNamedFragment: ():any => {},
		toJSON: ():any => {},
	};
}


describe( "isDecoratedDocument", ():void => {

	it( "should exists", ():void => {
		expect( isDecoratedDocument ).toBeDefined();
		expect( isDecoratedDocument ).toEqual( jasmine.any( Function ) );
	} );

	it( "should return false when `undefined`", ():void => {
		expect( isDecoratedDocument( void 0 ) ).toBe( false );
	} );

	it( "should return false when `null`", ():void => {
		expect( isDecoratedDocument( null ) ).toBe( false );
	} );

	it( "should return true when all properties", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		expect( isDecoratedDocument( target ) ).toBe( true );
	} );

	it( "should return true when no `hasMemberRelation`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.hasMemberRelation;
		expect( isDecoratedDocument( target ) ).toBe( true );
	} );

	it( "should return true when no `isMemberOfRelation`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.isMemberOfRelation;
		expect( isDecoratedDocument( target ) ).toBe( true );
	} );

	it( "should return true when no `defaultInteractionModel`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.defaultInteractionModel;
		expect( isDecoratedDocument( target ) ).toBe( true );
	} );

	it( "should return false when no `_fragmentsIndex`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target._fragmentsIndex;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

	it( "should return false when no `_normalize`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target._normalize;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

	it( "should return false when no `_removeFragment`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target._removeFragment;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

	it( "should return false when no `hasPointer`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.hasPointer;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

	it( "should return false when no `getPointer`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.getPointer;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

	it( "should return false when no `inScope`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.inScope;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

	it( "should return false when no `hasFragment`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.hasFragment;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

	it( "should return false when no `getFragment`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.getFragment;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

	it( "should return false when no `getNamedFragment`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.getNamedFragment;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

	it( "should return false when no `getFragments`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.getFragments;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

	it( "should return false when no `createFragment`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.createFragment;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

	it( "should return false when no `createNamedFragment`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.createNamedFragment;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

	it( "should return false when no `removeNamedFragment`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.removeNamedFragment;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

	it( "should return false when no `toJSON`", ():void => {
		const target:DocumentProperties = mockDocumentProperties();
		delete target.toJSON;
		expect( isDecoratedDocument( target ) ).toBe( false );
	} );

} );

describe( "isDocument", ():void => {

	it( "should exists", ():void => {
		expect( isDocument ).toBeDefined();
		expect( isDocument ).toEqual( jasmine.any( Function ) );
	} );

	it( "should return false when `undefined`", ():void => {
		expect( isDocument( void 0 ) ).toBe( false );
	} );

	it( "should return false when `null`", ():void => {
		expect( isDocument( null ) ).toBe( false );
	} );

	it( "should assert that is a `Resource`", ():void => {
		const spy:jasmine.Spy = spyOn( Resource, "is" );

		const target:object = { the: "object" };
		isDocument( target );

		expect( spy ).toHaveBeenCalledWith( target );
	} );

	it( "should assert that is decorated", ():void => {
		spyOn( Resource, "is" ).and.returnValue( true );
		const spy:jasmine.Spy = spyOn( Module, "isDecoratedDocument" );

		const target:object = { the: "object" };
		isDocument( target );

		expect( spy ).toHaveBeenCalledWith( target );
	} );

	it( "should assert that is a document", ():void => {
		spyOn( Resource, "is" ).and.returnValue( true );
		spyOn( Module, "isDecoratedDocument" ).and.returnValue( true );

		expect( isDocument( {} ) ).toBe( true );
	} );

} );


describe( "createDocument", ():void => {

	it( "should exists", ():void => {
		expect( createDocument ).toBeDefined();
		expect( createDocument ).toEqual( jasmine.any( Function ) );
	} );

	it( "should return a `Document`", ():void => {
		const target:Document = createDocument();
		expect( isDocument( target ) ).toBe( true );
	} );

} );

describe( "createDocumentFrom", ():void => {

	it( "should exists", ():void => {
		expect( createDocumentFrom ).toBeDefined();
		expect( createDocumentFrom ).toEqual( jasmine.any( Function ) );
	} );

	it( "should create a `Document`", ():void => {
		const target:Document = createDocumentFrom( {} );
		expect( isDocument( target ) ).toBe( true );
	} );

	it( "should convert nested objects to `Fragment`s", ():void => {
		type TargetDocument = Document & { object:object };
		const target:TargetDocument = createDocumentFrom( { object: {} } );

		// TODO use `isFragment` instead
		expect( Resource.is( target.object ) ).toBe( true );
	} );

} );

describe( "decorateDocument", ():void => {

	it( "should exists", ():void => {
		expect( decorateDocument ).toBeDefined();
		expect( decorateDocument ).toEqual( jasmine.any( Function ) );
	} );

	it( "should add the `Resource` properties", ():void => {
		const target:Resource = decorateDocument( {} );
		expect( Resource.isDecorated( target ) ).toBe( true );
	} );

	it( "should work with the `isDecorated` function", ():void => {
		const target:Document = decorateDocument( {} );
		expect( isDecoratedDocument( target ) ).toBe( true );
	} );

	it( "should add en empty Map in `_fragmentsIndex`", ():void => {
		const target:Document = decorateDocument( {} );
		expect( target._fragmentsIndex ).toEqual( jasmine.any( Map ) );
	} );

} );
