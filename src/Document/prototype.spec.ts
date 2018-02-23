import { BlankNode } from "../BlankNode";
import {
	IDAlreadyInUseError,
	IllegalArgumentError,
} from "../Errors";
import { Fragment } from "../Fragment";
import * as JSONLDConverter from "../JSONLD/Converter";
import { NamedFragment } from "../NamedFragment";
import * as ObjectSchema from "../ObjectSchema";
import { Pointer } from "../Pointer";
import * as RDFDocument from "../RDF/Document";
import * as RDFNode from "../RDF/Node";
import * as URI from "../RDF/URI";
import { Resource } from "../Resource";

import { createDocumentFrom } from "./factory";
import { Document } from "./index";
import * as Module from "./prototype";
import {
	convertNestedObjects,
	createFragment,
	createNamedFragment,
	getFragment,
	getFragments,
	getNamedFragment,
	getPointer,
	hasFragment,
	hasPointer,
	inScope,
	normalize,
	removeFragment,
	removeNamedFragment,
	toJSON
} from "./prototype";


function createMockDocument<T extends {}>( origin:T = {} as T ):T & Document {
	return createDocumentFrom( Object.assign( origin, { id: "https://example.com/document/" } ) );
}


describe( "Document methods", ():void => {

	describe( "hasPointer", ():void => {

		it( "should exists", ():void => {
			expect( hasPointer ).toBeDefined();
			expect( hasPointer ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return true when IRI of the document", ():void => {
			const document:Document = createMockDocument();

			expect( hasPointer.call( document, "https://example.com/document/" ) ).toBe( true );
		} );

		it( "should return false when relative IRIs", ():void => {
			const document:Document = createMockDocument();

			expect( hasPointer.call( document, "document/" ) ).toBe( false );
			expect( hasPointer.call( document, "another/document/" ) ).toBe( false );
		} );

		it( "should return false when another absolute IRIs", ():void => {
			const document:Document = createMockDocument();

			expect( hasPointer.call( document, "https://example.com/another/document/" ) ).toBe( false );
		} );

		it( "should return false when relative fragment label and not exits", ():void => {
			const document:Document = createMockDocument();

			expect( hasPointer.call( document, "#fragment" ) ).toBe( false );
		} );

		it( "should return true when relative fragment label and exits", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "fragment", {} as any );

			expect( hasPointer.call( document, "#fragment" ) ).toBe( true );
		} );

		it( "should return false when absolute fragment label and not exits", ():void => {
			const document:Document = createMockDocument();

			expect( hasPointer.call( document, "https://example.com/document/#fragment" ) ).toBe( false );
		} );

		it( "should return true when absolute fragment label and exits", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "fragment", {} as any );

			expect( hasPointer.call( document, "https://example.com/document/#fragment" ) ).toBe( true );
		} );

		it( "should return false when blank node label and not exists", ():void => {
			const document:Document = createMockDocument();

			expect( hasPointer.call( document, "_:1" ) ).toBe( false );
		} );

		it( "should be true when blank node label and exits", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "_:1", {} as any );

			expect( hasPointer.call( document, "_:1" ) ).toBe( true );
		} );

	} );

	describe( "getPointer", ():void => {

		it( "should exists", ():void => {
			expect( getPointer ).toBeDefined();
			expect( getPointer ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return the document when IRI of the document", ():void => {
			const document:Document = createMockDocument();

			const pointer:Pointer = getPointer.call( document, "https://example.com/document/" );
			expect( pointer ).toBe( document );
		} );

		it( "should return null when relative IRIs", ():void => {
			const document:Document = createMockDocument();

			expect( getPointer.call( document, "document/" ) ).toBeNull();
			expect( getPointer.call( document, "another/document/" ) ).toBeNull();
		} );

		it( "should return null when another absolute IRIs", ():void => {
			const document:Document = createMockDocument();

			expect( getPointer.call( document, "https://example.com/another/document/" ) ).toBeNull();
		} );

		it( "should create `NamedFragment` when relative fragment label and not exits", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = getPointer.call( document, "#fragment" );

			// TODO: Use `NamedFragment.is`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( NamedFragment.isDecorated( fragment ) ).toBe( true );

			expect( document._fragmentsIndex ).toEqual( new Map( [
				[ "fragment", fragment ],
			] ) );
		} );

		it( "should return fragment when relative fragment label and exits", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = {} as any;
			document._fragmentsIndex.set( "fragment", fragment );

			expect( getPointer.call( document, "#fragment" ) ).toBe( fragment );
		} );

		it( "should create `NamedFragment` when absolute fragment label and not exits", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = getPointer.call( document, "https://example.com/document/#fragment" );

			// TODO: Use `NamedFragment.is`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( NamedFragment.isDecorated( fragment ) ).toBe( true );

			expect( document._fragmentsIndex ).toEqual( new Map( [
				[ "fragment", fragment ],
			] ) );
		} );

		it( "should return fragment when absolute fragment label and exits", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = {} as any;
			document._fragmentsIndex.set( "fragment", fragment );

			expect( getPointer.call( document, "https://example.com/document/#fragment" ) ).toBe( fragment );
		} );

		it( "should create `BlankNode` when blank node label and not exists", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = getPointer.call( document, "_:1" );

			// TODO: Use `BlankNode.is`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( URI.Util.isBNodeID( fragment.id ) ).toBe( true );

			expect( document._fragmentsIndex ).toEqual( new Map( [
				[ "_:1", fragment ],
			] ) );
		} );

		it( "should return true when blank node label and exits", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = {} as any;
			document._fragmentsIndex.set( "_:1", fragment );

			expect( getPointer.call( document, "_:1" ) ).toBe( fragment );
		} );

	} );


	describe( "inScope", ():void => {

		it( "should exists", ():void => {
			expect( inScope ).toBeDefined();
			expect( inScope ).toEqual( jasmine.any( Function ) );
		} );

		describe( "When string IRI", ():void => {

			it( "should return true when IRI of the document", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, "https://example.com/document/" ) ).toBe( true );
			} );

			it( "should return false when relative IRIs", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, "document/" ) ).toBe( false );
				expect( inScope.call( document, "another/document/" ) ).toBe( false );
			} );

			it( "should return false when another absolute IRIs", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, "https://example.com/another/document/" ) ).toBe( false );
			} );

			it( "should return true when relative fragment label", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, "#fragment" ) ).toBe( true );
			} );

			it( "should return true when absolute fragment label", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, "https://example.com/document/#fragment" ) ).toBe( true );
			} );

			it( "should return false when another absolute fragment label", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, "https://example.com/another/document/#fragment" ) ).toBe( false );
			} );

			it( "should return true when blank node label", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, "_:1" ) ).toBe( true );
			} );

		} );

		describe( "When Pointer", ():void => {

			it( "should return true when IRI of the document", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, Pointer.create( "https://example.com/document/" ) ) ).toBe( true );
			} );

			it( "should return false when relative IRIs", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, Pointer.create( "document/" ) ) ).toBe( false );
				expect( inScope.call( document, Pointer.create( "another/document/" ) ) ).toBe( false );
			} );

			it( "should return false when another absolute IRIs", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, Pointer.create( "https://example.com/another/document/" ) ) ).toBe( false );
			} );

			it( "should return true when relative fragment label", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, Pointer.create( "#fragment" ) ) ).toBe( true );
			} );

			it( "should return true when absolute fragment label", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, Pointer.create( "https://example.com/document/#fragment" ) ) ).toBe( true );
			} );

			it( "should return false when another absolute fragment label", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, Pointer.create( "https://example.com/another/document/#fragment" ) ) ).toBe( false );
			} );

			it( "should return true when blank node label", ():void => {
				const document:Document = createMockDocument();

				expect( inScope.call( document, Pointer.create( "_:1" ) ) ).toBe( true );
			} );

		} );

	} );


	describe( "hasFragment", ():void => {

		it( "should exists", ():void => {
			expect( hasFragment ).toBeDefined();
			expect( hasFragment ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return false when IRI of the document", ():void => {
			const document:Document = createMockDocument();

			expect( hasFragment.call( document, "https://example.com/document/" ) ).toBe( false );
		} );

		it( "should return false when relative IRIs", ():void => {
			const document:Document = createMockDocument();

			expect( hasFragment.call( document, "document/" ) ).toBe( false );
			expect( hasFragment.call( document, "another/document/" ) ).toBe( false );
		} );

		it( "should return false when another absolute IRIs", ():void => {
			const document:Document = createMockDocument();

			expect( hasFragment.call( document, "https://example.com/another/document/" ) ).toBe( false );
		} );

		it( "should return false when relative fragment label and not exits", ():void => {
			const document:Document = createMockDocument();

			expect( hasFragment.call( document, "#fragment" ) ).toBe( false );
		} );

		it( "should return true when relative fragment label and exits", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "fragment", {} as any );

			expect( hasFragment.call( document, "#fragment" ) ).toBe( true );
		} );

		it( "should return false when absolute fragment label and not exits", ():void => {
			const document:Document = createMockDocument();

			expect( hasFragment.call( document, "https://example.com/document/#fragment" ) ).toBe( false );
		} );

		it( "should return true when absolute fragment label and exits", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "fragment", {} as any );

			expect( hasFragment.call( document, "https://example.com/document/#fragment" ) ).toBe( true );
		} );

		it( "should return false when blank node label and not exists", ():void => {
			const document:Document = createMockDocument();

			expect( hasFragment.call( document, "_:1" ) ).toBe( false );
		} );

		it( "should be true when blank node label and exits", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "_:1", {} as any );

			expect( hasFragment.call( document, "_:1" ) ).toBe( true );
		} );

	} );

	describe( "getFragment", ():void => {

		it( "should exists", ():void => {
			expect( getFragment ).toBeDefined();
			expect( getFragment ).toEqual( jasmine.any( Function ) );
		} );

		it( "should throw error when IRI of the document", ():void => {
			const document:Document = createMockDocument();

			expect( getFragment.bind( document, "https://example.com/document/" ) ).toThrowError( IllegalArgumentError, "The id is out of scope." );
		} );

		it( "should throw error when another absolute IRIs", ():void => {
			const document:Document = createMockDocument();

			expect( getFragment.bind( document, "https://example.com/another/document/" ) ).toThrowError( IllegalArgumentError, "The id is out of scope." );
		} );

		it( "should return null when relative fragment label and not exits", ():void => {
			const document:Document = createMockDocument();

			expect( getFragment.call( document, "#fragment" ) ).toBeNull();
		} );

		it( "should return fragment when relative fragment label and exits", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = {} as any;
			document._fragmentsIndex.set( "fragment", fragment );

			expect( getFragment.call( document, "#fragment" ) ).toBe( fragment );
		} );

		it( "should return null when absolute fragment label and not exits", ():void => {
			const document:Document = createMockDocument();

			expect( getFragment.call( document, "https://example.com/document/#fragment" ) ).toBeNull();
		} );

		it( "should return fragment when absolute fragment label and exits", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = {} as any;
			document._fragmentsIndex.set( "fragment", fragment );

			expect( getFragment.call( document, "https://example.com/document/#fragment" ) ).toBe( fragment );
		} );

		it( "should return null when blank node label and not exists", ():void => {
			const document:Document = createMockDocument();

			expect( getFragment.call( document, "_:1" ) ).toBeNull();
		} );

		it( "should return true when blank node label and exits", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = {} as any;
			document._fragmentsIndex.set( "_:1", fragment );

			expect( getFragment.call( document, "_:1" ) ).toBe( fragment );
		} );

	} );

	describe( "getNamedFragment", ():void => {

		it( "should exists", ():void => {
			expect( getNamedFragment ).toBeDefined();
			expect( getNamedFragment ).toEqual( jasmine.any( Function ) );
		} );

		it( "should throw error when IRI of the document", ():void => {
			const document:Document = createMockDocument();

			expect( getNamedFragment.bind( document, "https://example.com/document/" ) ).toThrowError( IllegalArgumentError, "The id is out of scope." );
		} );

		it( "should throw error when another absolute IRIs", ():void => {
			const document:Document = createMockDocument();

			expect( getNamedFragment.bind( document, "https://example.com/another/document/" ) ).toThrowError( IllegalArgumentError, "The id is out of scope." );
		} );

		it( "should return null when relative fragment label and not exits", ():void => {
			const document:Document = createMockDocument();

			expect( getNamedFragment.call( document, "#fragment" ) ).toBeNull();
		} );

		it( "should return fragment when relative fragment label and exits", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = {} as any;
			document._fragmentsIndex.set( "fragment", fragment );

			expect( getNamedFragment.call( document, "#fragment" ) ).toBe( fragment );
		} );

		it( "should return fragment when relative label and exits", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = {} as any;
			document._fragmentsIndex.set( "fragment", fragment );

			expect( getNamedFragment.call( document, "fragment" ) ).toBe( fragment );
		} );

		it( "should return null when absolute fragment label and not exits", ():void => {
			const document:Document = createMockDocument();

			expect( getNamedFragment.call( document, "https://example.com/document/#fragment" ) ).toBeNull();
		} );

		it( "should return fragment when absolute fragment label and exits", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = {} as any;
			document._fragmentsIndex.set( "fragment", fragment );

			expect( getNamedFragment.call( document, "https://example.com/document/#fragment" ) ).toBe( fragment );
		} );

		it( "should throw error when another absolute fragment label", ():void => {
			const document:Document = createMockDocument();

			expect( getNamedFragment.bind( document, "https://example.com/anotherdocument/#fragment" ) ).toThrowError( IllegalArgumentError, "The id is out of scope." );
		} );

		it( "should throw error when blank node label and not exists", ():void => {
			const document:Document = createMockDocument();

			expect( getNamedFragment.bind( document, "_:1" ) ).toThrowError( IllegalArgumentError, "Named fragments can't have a id that starts with '_:'." );
		} );

	} );


	describe( "getFragments", ():void => {

		it( "should exists", ():void => {
			expect( getFragments ).toBeDefined();
			expect( getFragments ).toEqual( jasmine.any( Function ) );
		} );

		it( "should return empty array when no fragments", ():void => {
			const document:Document = createDocumentFrom( {} );

			expect( getFragments.call( document ) ).toEqual( [] );
		} );

		it( "should return array with all fragments", ():void => {
			const document:Document = createDocumentFrom( {} );
			document._fragmentsIndex
				.set( "fragment", { the: "first fragment" } as any )
				.set( "_:1", { the: "second fragment" } as any )
				.set( "another", { the: "third fragment" } as any )
				.set( "_:2", { the: "fourth fragment" } as any )
			;

			expect( getFragments.call( document ) ).toEqual( [
				{ the: "first fragment" } as any,
				{ the: "second fragment" } as any,
				{ the: "third fragment" } as any,
				{ the: "fourth fragment" } as any,
			] );
		} );

	} );


	describe( "createFragment", ():void => {

		it( "should exists", ():void => {
			expect( createFragment ).toBeDefined();
			expect( createFragment ).toEqual( jasmine.any( Function ) );
		} );

		it( "should create `NamedFragment` when object and slug label provided", ():void => {
			const document:Document = createMockDocument();
			const fragment:{ string:string } = createFragment.call( document, { string: "a string" }, "fragment" );

			// TODO: Use `isNamedFragment`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( Fragment.isDecorated( fragment ) ).toBe( true );

			expect( fragment ).toEqual( {
				string: "a string",
			} );
		} );

		it( "should create `NamedFragment` when only slug label provided", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = createFragment.call( document, "fragment" );

			// TODO: Use `isNamedFragment`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( Fragment.isDecorated( fragment ) ).toBe( true );
		} );

		it( "should create `NamedFragment` when object and absolute IRI provided", ():void => {
			const document:Document = createMockDocument();
			type TargetFragment = Fragment & { string:string };
			const fragment:TargetFragment = createFragment.call( document, { string: "a string" }, "https://example.com/document/#fragment" );

			// TODO: Use `isNamedFragment`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( Fragment.isDecorated( fragment ) ).toBe( true );

			expect( fragment as { string:string } ).toEqual( {
				string: "a string",
			} );
		} );

		it( "should create `NamedFragment` when only absolute IRI provided", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = createFragment.call( document, "https://example.com/document/#fragment" );

			// TODO: Use `isNamedFragment`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( Fragment.isDecorated( fragment ) ).toBe( true );
		} );

		it( "should create `BlankNode` when no label provided", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = createFragment.call( document, {} );

			// TODO: Use `isBlankNode`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( Fragment.isDecorated( fragment ) ).toBe( true );
			expect( URI.Util.isBNodeID( fragment.id ) ).toBe( true );
		} );

		it( "should create `BlankNode` when object and blank node label provided", ():void => {
			const document:Document = createMockDocument();
			type TargetFragment = Fragment & { string:string };
			const fragment:TargetFragment = createFragment.call( document, { string: "a string" }, "_:1" );

			// TODO: Use `isBlankNode`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( Fragment.isDecorated( fragment ) ).toBe( true );
			expect( URI.Util.isBNodeID( fragment.id ) ).toBe( true );

			expect( fragment as { string:string } ).toEqual( {
				string: "a string",
			} );
		} );

		it( "should create `BlankNode` when only blank node label provided", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = createFragment.call( document, "_:1" );

			// TODO: Use `isBlankNode`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( Fragment.isDecorated( fragment ) ).toBe( true );
			expect( URI.Util.isBNodeID( fragment.id ) ).toBe( true );
		} );

		it( "should call `convertNestedObjects` with the object provided", ():void => {
			const document:Document = createMockDocument();
			const spy:jasmine.Spy = spyOn( Module, "convertNestedObjects" );

			const object:object = { the: "object" };
			createFragment.call( document, object );

			expect( spy ).toHaveBeenCalledWith( document, object );
		} );

		it( "should throw error when object but slug label is already used", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "fragment", null );

			expect( createFragment.bind( document, {}, "fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
		} );

		it( "should throw error when only slug label is already used", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "fragment", null );

			expect( createFragment.bind( document, "fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
		} );

		it( "should throw error when object but absolute IRI provided is already used", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "fragment", null );

			expect( createFragment.bind( document, {}, "https://example.com/document/#fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
		} );

		it( "should throw error when only absolute IRI provided is already used", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "fragment", null );

			expect( createFragment.bind( document, "https://example.com/document/#fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
		} );

		it( "should throw error when object but blank node label is used", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "_:1", null );

			expect( createFragment.bind( document, {}, "_:1" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
		} );

		it( "should throw error when only blank node label is used", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "_:1", null );

			expect( createFragment.bind( document, "_:1" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
		} );

	} );

	describe( "createNamedFragment", ():void => {

		it( "should exists", ():void => {
			expect( createNamedFragment ).toBeDefined();
			expect( createNamedFragment ).toEqual( jasmine.any( Function ) );
		} );

		it( "should create `NamedFragment` when object and slug label provided", ():void => {
			const document:Document = createMockDocument();
			type TargetFragment = Fragment & { string:string };
			const fragment:TargetFragment = createNamedFragment.call( document, { string: "a string" }, "fragment" );

			// TODO: Use `isNamedFragment`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( Fragment.isDecorated( fragment ) ).toBe( true );

			expect( fragment as { string:string } ).toEqual( {
				string: "a string",
			} );
		} );

		it( "should create `NamedFragment` when only slug label provided", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = createNamedFragment.call( document, "fragment" );

			// TODO: Use `isNamedFragment`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( Fragment.isDecorated( fragment ) ).toBe( true );
		} );

		it( "should create `NamedFragment` when object and absolute IRI provided", ():void => {
			const document:Document = createMockDocument();
			type TargetFragment = Fragment & { string:string };
			const fragment:TargetFragment = createNamedFragment.call( document, { string: "a string" }, "https://example.com/document/#fragment" );

			// TODO: Use `isNamedFragment`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( Fragment.isDecorated( fragment ) ).toBe( true );

			expect( fragment as { string:string } ).toEqual( {
				string: "a string",
			} );
		} );

		it( "should create `NamedFragment` when only absolute IRI provided", ():void => {
			const document:Document = createMockDocument();
			const fragment:Fragment = createNamedFragment.call( document, "https://example.com/document/#fragment" );

			// TODO: Use `isNamedFragment`
			expect( Resource.is( fragment ) ).toBe( true );
			expect( Fragment.isDecorated( fragment ) ).toBe( true );
		} );

		it( "should throw error when object and blank node label provided", ():void => {
			const document:Document = createMockDocument();
			expect( createNamedFragment.bind( document, {}, "_:1" ) ).toThrowError( IllegalArgumentError, "Named fragments can't have a slug that starts with '_:'." );
		} );

		it( "should throw error when only blank node label provided", ():void => {
			const document:Document = createMockDocument();
			expect( createNamedFragment.bind( document, "_:1" ) ).toThrowError( IllegalArgumentError, "Named fragments can't have a slug that starts with '_:'." );
		} );

		it( "should call `convertNestedObjects` with the object provided", ():void => {
			const document:Document = createMockDocument();
			const spy:jasmine.Spy = spyOn( Module, "convertNestedObjects" );

			const object:object = { the: "object" };
			createNamedFragment.call( document, object, "fragment" );

			expect( spy ).toHaveBeenCalledWith( document, object );
		} );

		it( "should throw error when object but slug label is already used", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "fragment", null );

			expect( createNamedFragment.bind( document, {}, "fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
		} );

		it( "should throw error when only slug label is already used", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "fragment", null );

			expect( createNamedFragment.bind( document, "fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
		} );

		it( "should throw error when object but absolute IRI provided is already used", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "fragment", null );

			expect( createNamedFragment.bind( document, {}, "https://example.com/document/#fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
		} );

		it( "should throw error when only absolute IRI provided is already used", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "fragment", null );

			expect( createNamedFragment.bind( document, "https://example.com/document/#fragment" ) ).toThrowError( IDAlreadyInUseError, "The slug provided is already being used by a fragment." );
		} );

	} );


	describe( "removeFragment", ():void => {

		it( "should exists", ():void => {
			expect( removeFragment ).toBeDefined();
			expect( removeFragment ).toEqual( jasmine.any( Function ) );
		} );

		it( "should remove providing a `NamedFragment`", ():void => {
			const document:Document = createMockDocument();

			const fragment:NamedFragment = NamedFragment.create( document, "fragment" );
			document._fragmentsIndex.set( "fragment", fragment );

			removeFragment.call( document, fragment );
			expect( document._fragmentsIndex ).toEqual( new Map() );
		} );

		it( "should remove providing a `BlankNode`", ():void => {
			const document:Document = createMockDocument();

			const fragment:BlankNode = BlankNode.create( document, "_:1" );
			document._fragmentsIndex.set( "_:1", fragment );

			removeFragment.call( document, fragment );
			expect( document._fragmentsIndex ).toEqual( new Map() );
		} );

		it( "should remove providing a fragment label", ():void => {
			const document:Document = createMockDocument();

			document._fragmentsIndex.set( "fragment", null );

			removeFragment.call( document, "#fragment" );
			expect( document._fragmentsIndex ).toEqual( new Map() );
		} );

		it( "should remove providing a fragment slug label", ():void => {
			const document:Document = createMockDocument();

			document._fragmentsIndex.set( "fragment", null );

			removeFragment.call( document, "fragment" );
			expect( document._fragmentsIndex ).toEqual( new Map() );
		} );

		it( "should remove providing an absolute fragment IRI", ():void => {
			const document:Document = createMockDocument();

			document._fragmentsIndex.set( "fragment", null );

			removeFragment.call( document, "https://example.com/document/#fragment" );
			expect( document._fragmentsIndex ).toEqual( new Map() );
		} );

		it( "should remove providing a blank node label", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "_:1", null );

			removeFragment.call( document, "_:1" );
			expect( document._fragmentsIndex ).toEqual( new Map() );
		} );

	} );

	describe( "removeNamedFragment", ():void => {

		it( "should exists", ():void => {
			expect( removeNamedFragment ).toBeDefined();
			expect( removeNamedFragment ).toEqual( jasmine.any( Function ) );
		} );

		it( "should remove providing a `NamedFragment`", ():void => {
			const document:Document = createMockDocument();

			const fragment:NamedFragment = NamedFragment.create( document, "fragment" );
			document._fragmentsIndex.set( "fragment", fragment );

			removeNamedFragment.call( document, fragment );
			expect( document._fragmentsIndex ).toEqual( new Map() );
		} );

		it( "should throw error providing a `BlankNode`", ():void => {
			const document:Document = createMockDocument();

			const fragment:BlankNode = BlankNode.create( document, "_:1" );
			document._fragmentsIndex.set( "_:1", fragment );

			expect( removeNamedFragment.bind( document, fragment ) ).toThrowError( IllegalArgumentError, "You can only remove NamedFragments." );
		} );

		it( "should remove providing a fragment label", ():void => {
			const document:Document = createMockDocument();

			document._fragmentsIndex.set( "fragment", null );

			removeNamedFragment.call( document, "#fragment" );
			expect( document._fragmentsIndex ).toEqual( new Map() );
		} );

		it( "should remove providing a fragment slug label", ():void => {
			const document:Document = createMockDocument();

			document._fragmentsIndex.set( "fragment", null );

			removeNamedFragment.call( document, "fragment" );
			expect( document._fragmentsIndex ).toEqual( new Map() );
		} );

		it( "should remove providing an absolute fragment IRI", ():void => {
			const document:Document = createMockDocument();

			document._fragmentsIndex.set( "fragment", null );

			removeNamedFragment.call( document, "https://example.com/document/#fragment" );
			expect( document._fragmentsIndex ).toEqual( new Map() );
		} );

		it( "should throw error providing a blank node label", ():void => {
			const document:Document = createMockDocument();
			document._fragmentsIndex.set( "_:1", null );

			expect( removeNamedFragment.bind( document, "_:1" ) ).toThrowError( IllegalArgumentError, "You can only remove NamedFragments." );
		} );

	} );


	describe( "toJSON", ():void => {

		it( "should exists", ():void => {
			expect( toJSON ).toBeDefined();
			expect( toJSON ).toEqual( jasmine.any( Function ) );
		} );

		it( "should expand all resources with a new `JSONLDConverter` with empty `DigestedObjectSchema`s when none provided", ():void => {
			const document:Document = createMockDocument( { the: "document" } );
			document.createFragment( { then: "blank node" }, "_:1" );
			document.createFragment( { then: "named fragment" }, "fragment" );

			const jsonldConverter:jasmine.SpyObj<JSONLDConverter.Class> = jasmine
				.createSpyObj<JSONLDConverter.Class>( "JSONLDConverter", { "expand": {} } );
			spyOn( JSONLDConverter, "Class" ).and.returnValue( jsonldConverter );

			toJSON.call( document );
			expect( jsonldConverter.expand ).toHaveBeenCalledWith( document, new ObjectSchema.DigestedObjectSchema(), new ObjectSchema.DigestedObjectSchema() );
			expect( jsonldConverter.expand ).toHaveBeenCalledWith( { then: "blank node" }, new ObjectSchema.DigestedObjectSchema(), new ObjectSchema.DigestedObjectSchema() );
			expect( jsonldConverter.expand ).toHaveBeenCalledWith( { then: "named fragment" }, new ObjectSchema.DigestedObjectSchema(), new ObjectSchema.DigestedObjectSchema() );
		} );

		it( "should get the schemas of every resource with the `ObjectSchemaResolver`", ():void => {
			const document:Document = createMockDocument( { the: "document" } );
			document.createFragment( { then: "blank node" }, "_:1" );
			document.createFragment( { then: "named fragment" }, "fragment" );

			const schemaResolver:jasmine.SpyObj<ObjectSchema.Resolver> = jasmine
				.createSpyObj<ObjectSchema.Resolver>(
					"ObjectSchemaResolver", {
						"getGeneralSchema": new ObjectSchema.DigestedObjectSchema(),
						"getSchemaFor": new ObjectSchema.DigestedObjectSchema(),
					}
				);

			toJSON.call( document, schemaResolver );

			expect( schemaResolver.getGeneralSchema ).toHaveBeenCalledTimes( 1 );

			expect( schemaResolver.getSchemaFor ).toHaveBeenCalledWith( document );
			expect( schemaResolver.getSchemaFor ).toHaveBeenCalledWith( { then: "blank node" } );
			expect( schemaResolver.getSchemaFor ).toHaveBeenCalledWith( { then: "named fragment" } );
		} );

		it( "should expand all resources with a new `JSONLDConverter` with the schemas of the `ObjectSchemaResolver` provided", ():void => {
			const document:Document = createMockDocument( { the: "document" } );
			document.createFragment( { then: "blank node" }, "_:1" );
			document.createFragment( { then: "named fragment" }, "fragment" );

			const generalSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( { "@base": "https://example.com/schema/general/" } );
			const resourceSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( { "@base": "https://example.com/schema/resource/" } );
			const schemaResolver:jasmine.SpyObj<ObjectSchema.Resolver> = jasmine
				.createSpyObj<ObjectSchema.Resolver>(
					"ObjectSchemaResolver", {
						"getGeneralSchema": generalSchema,
						"getSchemaFor": resourceSchema,
					}
				);

			const jsonldConverter:jasmine.SpyObj<JSONLDConverter.Class> = jasmine
				.createSpyObj<JSONLDConverter.Class>( "JSONLDConverter", { "expand": {} } );
			spyOn( JSONLDConverter, "Class" ).and.returnValue( jsonldConverter );

			toJSON.call( document, schemaResolver );
			expect( jsonldConverter.expand ).toHaveBeenCalledWith( document, generalSchema, resourceSchema );
			expect( jsonldConverter.expand ).toHaveBeenCalledWith( { then: "blank node" }, generalSchema, resourceSchema );
			expect( jsonldConverter.expand ).toHaveBeenCalledWith( { then: "named fragment" }, generalSchema, resourceSchema );
		} );

		it( "should expand all resources with the `JSONLDConverter` provided and the schemas of the `ObjectSchemaResolver` also provided", ():void => {
			const document:Document = createMockDocument( { the: "document" } );
			document.createFragment( { then: "blank node" }, "_:1" );
			document.createFragment( { then: "named fragment" }, "fragment" );

			const generalSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( { "@base": "https://example.com/schema/general/" } );
			const resourceSchema:ObjectSchema.DigestedObjectSchema = ObjectSchema.Digester.digestSchema( { "@base": "https://example.com/schema/resource/" } );
			const schemaResolver:jasmine.SpyObj<ObjectSchema.Resolver> = jasmine
				.createSpyObj<ObjectSchema.Resolver>(
					"ObjectSchemaResolver", {
						"getGeneralSchema": generalSchema,
						"getSchemaFor": resourceSchema,
					}
				);

			const jsonldConverter:jasmine.SpyObj<JSONLDConverter.Class> = jasmine
				.createSpyObj<JSONLDConverter.Class>( "JSONLDConverter", { "expand": {} } );

			toJSON.call( document, schemaResolver, jsonldConverter );
			expect( jsonldConverter.expand ).toHaveBeenCalledWith( document, generalSchema, resourceSchema );
			expect( jsonldConverter.expand ).toHaveBeenCalledWith( { then: "blank node" }, generalSchema, resourceSchema );
			expect( jsonldConverter.expand ).toHaveBeenCalledWith( { then: "named fragment" }, generalSchema, resourceSchema );
		} );

		it( "should return a `RDFDocument` with the expanded resources", ():void => {
			const document:Document = createMockDocument( { the: "document" } );
			document.createFragment( { then: "blank node" }, "_:1" );
			document.createFragment( { then: "named fragment" }, "fragment" );

			const jsonldConverter:jasmine.SpyObj<JSONLDConverter.Class> = jasmine.createSpyObj<JSONLDConverter.Class>( "JSONLDConverter", [ "expand" ] );
			jsonldConverter.expand.and.callFake( ( resource ) => {
				if( resource === document ) return { the: "expanded document" };
				if( resource === document.getFragment( "_:1" ) ) return { the: "expanded blank node" };
				return { the: "expanded named fragment" };
			} );

			const expanded:RDFDocument.Class = toJSON.call( document, void 0, jsonldConverter );
			expect( expanded ).toEqual( {
				"@id": "https://example.com/document/",
				"@graph": [
					{ the: "expanded document" },
					{ the: "expanded blank node" },
					{ the: "expanded named fragment" },
				] as any as RDFNode.Class[],
			} );
		} );

	} );


	describe( "normalize", ():void => {

		it( "should exists", ():void => {
			expect( normalize ).toBeDefined();
			expect( normalize ).toEqual( jasmine.any( Function ) );
		} );

		it( "should remove `BlankNodes` not referenced from the main document", ():void => {
			type TargetDocument = Document & { object?:{ id:string } };
			const document:TargetDocument = createDocumentFrom( { object: { id: "_:1" } } );
			delete document.object;

			normalize.call( document );
			expect( document.object ).not.toBeDefined();
			expect( document.hasFragment( "_:1" ) ).toBe( false );
		} );

		it( "should remove `BlankNodes` not referenced from the fragments", ():void => {
			type TargetDocument = Document & { object:{ object?:{ id:string } } };
			const document:TargetDocument = createDocumentFrom( { object: { object: { id: "_:1" } } } );
			delete document.object.object;

			normalize.call( document );
			expect( document.object.object ).not.toBeDefined();
			expect( document.hasFragment( "_:1" ) ).toBe( false );
		} );

		it( "should maintain `NamedFragments` not referenced from the main document", ():void => {
			type TargetDocument = Document & { object?:{ id:string } };
			const document:TargetDocument = createDocumentFrom( { object: { id: "#1" } } );
			delete document.object;

			normalize.call( document );
			expect( document.object ).not.toBeDefined();
			expect( document.hasFragment( "#1" ) ).toBe( true );
		} );

		it( "should maintain `NamedFragments` not referenced from the fragments", ():void => {
			type TargetDocument = Document & { object:{ object?:{ id:string } } };
			const document:TargetDocument = createDocumentFrom( { object: { object: { id: "#1" } } } );
			delete document.object.object;

			normalize.call( document );
			expect( document.object.object ).not.toBeDefined();
			expect( document.hasFragment( "#1" ) ).toBe( true );
		} );

		it( "should convert without problems cyclical referenced fragments", ():void => {
			type TargetDocument = Document & { object?:{ self?:{} } };
			const document:TargetDocument = createDocumentFrom( {} );

			const object:{ id?:string, self?:{} } = { id: "_:1" };
			object.self = object;

			document.object = object;
			normalize.call( document );

			expect( document.object ).toBeDefined();
			// TODO: Use `isFragment`
			expect( Resource.is( document.object ) ).toBe( true );
			expect( document.hasFragment( "_:1" ) ).toBe( true );
			expect( document.object.self ).toBe( document.object );
		} );

	} );

	describe( "convertNestedObject", ():void => {

		it( "should exists", ():void => {
			expect( convertNestedObjects ).toBeDefined();
			expect( convertNestedObjects ).toEqual( jasmine.any( Function ) );
		} );

		it( "should convert single object property to `Fragment`", ():void => {
			type TargetDocument = Document & { object?:{ string:string } };
			const document:TargetDocument = createDocumentFrom( {} );
			document.object = { string: "new object" };

			convertNestedObjects( document, document );
			expect( document.object ).toEqual( { string: "new object" } );

			// TODO: Use `isFragment`
			expect( Resource.is( document.object ) ).toBe( true );
			expect( document.hasFragment( document.object[ "id" ] ) ).toBe( true );
		} );

		it( "should convert object array property to `Fragment`", ():void => {
			type TargetDocument = Document & { array?:{ string:string }[] };
			const document:TargetDocument = createDocumentFrom( {} );
			document.array = [ { string: "element 1" }, { string: "element 2" } ];

			convertNestedObjects( document, document );
			expect( document.array ).toEqual( [
				{ string: "element 1" },
				{ string: "element 2" },
			] );

			// TODO: Use `isFragment`
			expect( Resource.is( document.array[ 0 ] ) ).toBe( true );
			expect( document.hasFragment( document.array[ 0 ][ "id" ] ) ).toBe( true );

			expect( Resource.is( document.array[ 1 ] ) ).toBe( true );
			expect( document.hasFragment( document.array[ 1 ][ "id" ] ) ).toBe( true );
		} );

		it( "should convert second level object property to `Fragment`", ():void => {
			type TargetDocument = Document & { object?:{ object:{ string:string } } };
			const document:TargetDocument = createDocumentFrom( {} );
			document.object = { object: { string: "new object" } };

			convertNestedObjects( document, document );
			expect( document.object ).toEqual( { object: { string: "new object" } } );

			// TODO: Use `isFragment`
			expect( Resource.is( document.object ) ).toBe( true );
			expect( document.hasFragment( document.object[ "id" ] ) ).toBe( true );

			expect( Resource.is( document.object.object ) ).toBe( true );
			expect( document.hasFragment( document.object.object[ "id" ] ) ).toBe( true );
		} );

		it( "should convert only second level object property to `Fragment`", ():void => {
			type TargetDocument = Document & { object?:{ object:{ string:string } } };
			const document:TargetDocument = createDocumentFrom( {} );
			document.object = { object: { string: "new object" } };

			convertNestedObjects( document, document.object );
			expect( document.object ).toEqual( { object: { string: "new object" } } );

			// TODO: Use `isFragment`
			expect( Resource.is( document.object ) ).toBe( false );

			expect( Resource.is( document.object.object ) ).toBe( true );
			expect( document.hasFragment( document.object.object[ "id" ] ) ).toBe( true );
		} );

		it( "should be a `BlankNode` when no slug/id in new object", ():void => {
			type TargetDocument = Document & { object?:{ string:string } };
			const document:TargetDocument = createDocumentFrom( {} );
			document.object = { string: "new object" };

			convertNestedObjects( document, document );
			expect( document.object ).toEqual( { string: "new object" } );

			// TODO: Use `isBlankNode`
			expect( URI.Util.isBNodeID( document.object[ "id" ] ) ).toBe( true );
		} );

		it( "should be a `BlankNode` when bnode label in id property", ():void => {
			type TargetDocument = Document & { object?:{ id?:string, string:string } };
			const document:TargetDocument = createDocumentFrom( {} );
			document.object = { id: "_:1", string: "new object" };

			convertNestedObjects( document, document );
			expect( document.object ).toEqual( { string: "new object" } );
			// TODO: Use `isBlankNode`
			expect( URI.Util.isBNodeID( document.object[ "id" ] ) ).toBe( true );

			expect( document.hasFragment( "_:1" ) ).toBe( true );
			expect( document.object ).toBe( document.getFragment( "_:1" ) );
		} );

		it( "should be a `NamedFragment` when relative fragment label in id property", ():void => {
			type TargetDocument = Document & { object?:{ id?:string, string:string } };
			const document:TargetDocument = createDocumentFrom( {} );
			document.object = { id: "#fragment", string: "new object" };

			convertNestedObjects( document, document );
			expect( document.object ).toEqual( { string: "new object" } );
			// TODO: Use `isNamedFragment`
			expect( Resource.is( document.object ) ).toBe( true );
			expect( NamedFragment.isDecorated( document.object ) ).toBe( true );

			expect( document.hasFragment( "#fragment" ) ).toBe( true );
			expect( document.object ).toBe( document.getFragment( "#fragment" ) );
		} );

		it( "should be a `NamedFragment` when relative fragment label in slug property", ():void => {
			type TargetDocument = Document & { object?:{ slug?:string, string:string } };
			const document:TargetDocument = createDocumentFrom( {} );
			document.object = { slug: "#1", string: "new object" };

			convertNestedObjects( document, document );
			expect( document.object ).toEqual( { string: "new object" } );
			// TODO: Use `isNamedFragment`
			expect( Resource.is( document.object ) ).toBe( true );
			expect( NamedFragment.isDecorated( document.object ) ).toBe( true );

			expect( document.hasFragment( "#1" ) ).toBe( true );
			expect( document.object ).toBe( document.getFragment( "#1" ) );
		} );

		it( "should be a `NamedFragment` when relative label in slug property", ():void => {
			type TargetDocument = Document & { object?:{ slug?:string, string:string } };
			const document:TargetDocument = createDocumentFrom( {} );
			document.object = { slug: "fragment", string: "new object" };

			convertNestedObjects( document, document );
			expect( document.object ).toEqual( { string: "new object" } );
			// TODO: Use `isNamedFragment`
			expect( Resource.is( document.object ) ).toBe( true );
			expect( NamedFragment.isDecorated( document.object ) ).toBe( true );

			expect( document.hasFragment( "#fragment" ) ).toBe( true );
			expect( document.object ).toBe( document.getFragment( "#fragment" ) );
		} );

	} );

} );
