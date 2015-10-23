/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/jasmine-ajax/mock-ajax.d.ts" />
import * as RDFNode from './RDFNode';
import * as RDFDocument from './RDFDocument';
import * as Utils from '../Utils';

describe( 'RDFDocument', function () {
	it( 'is defined', function () {
		expect( RDFDocument ).toBeDefined();
	} );
	describe( 'Util', function () {
		var document:RDFDocument.Class;

		beforeEach( function () {
			document = {
				'@graph': [
					{'@id': 'http://example.org/resource/1'},
					{'@id': 'http://example.org/resource/1#fragment-1'},
					{'@id': 'http://example.org/resource/1#fragment-2'},
					{'@id': 'http://example.org/resource/1#fragment-3'},
					{'@id': 'http://example.org/resource/1/child/'},
					{'@id': 'http://example.org/resource/1/child/#fragment-1'},
					{'@id': 'http://example.org/resource/1/child/#fragment-2'},
					{'@id': 'http://example.org/resource/1/child/#fragment-3'},
					{'@id': 'http://example.org/resource/2'},
					{'@id': 'http://example.org/resource/2#fragment-1'},
					{'@id': 'http://example.org/resource/2#fragment-2'},
					{'@id': 'http://example.org/resource/2#fragment-3'}
				],
				'@id': ''
			};
		} );

		it( 'is defined', function () {
			expect( RDFDocument.Util ).toBeDefined();
		} );
		it( 'has method, getDocumentResources(), that returns all the document resources from a document.', function () {
			expect( RDFDocument.Util.getDocumentResources ).toBeDefined();
			expect( Utils.isFunction( RDFDocument.Util.getDocumentResources ) ).toBeTruthy();

			var documentResources:RDFNode.Class[];

			documentResources = RDFDocument.Util.getDocumentResources( document );
			expect( documentResources ).not.toBeNull();
			expect( Utils.isArray( documentResources ) ).toBeTruthy();
			expect( documentResources.length ).toBe( 3 );

			documentResources = RDFDocument.Util.getDocumentResources( document[ '@graph' ] );
			expect( documentResources ).not.toBeNull();
			expect( Utils.isArray( documentResources ) ).toBeTruthy();
			expect( documentResources.length ).toBe( 3 );
		} );
		it( 'has method, getFragmentResources(), that returns all the fragments of the document.', function () {
			expect( RDFDocument.Util.getFragmentResources ).toBeDefined();
			expect( Utils.isFunction( RDFDocument.Util.getFragmentResources ) ).toBeTruthy();

			var fragments:RDFNode.Class[];

			fragments = RDFDocument.Util.getFragmentResources( document );
			expect( fragments ).not.toBeNull();
			expect( Utils.isArray( fragments ) ).toBeTruthy();
			expect( fragments.length ).toBe( 9 );

			fragments = RDFDocument.Util.getFragmentResources( document[ '@graph' ] );
			expect( fragments ).not.toBeNull();
			expect( Utils.isArray( fragments ) ).toBeTruthy();
			expect( fragments.length ).toBe( 9 );

			var documentResource:RDFNode.Class = {
				'@id': 'http://example.org/resource/1'
			};

			fragments = RDFDocument.Util.getFragmentResources( document, documentResource );
			expect( fragments ).not.toBeNull();
			expect( Utils.isArray( fragments ) ).toBeTruthy();
			expect( fragments.length ).toBe( 3 );

			fragments = RDFDocument.Util.getFragmentResources( document, 'http://example.org/resource/1/child/' );
			expect( fragments ).not.toBeNull();
			expect( Utils.isArray( fragments ) ).toBeTruthy();
			expect( fragments.length ).toBe( 3 );
		} );
	} );
} );