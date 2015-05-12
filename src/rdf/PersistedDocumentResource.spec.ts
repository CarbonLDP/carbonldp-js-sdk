/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/jasmine-ajax/mock-ajax.d.ts" />
import * as Resource from './Resource';
import * as DocumentResource from './DocumentResource';
import * as PersistedDocumentResource from './PersistedDocumentResource';
import * as Utils from '../Utils';

describe( 'RDF', function () {
	describe( 'PersistedDocumentResource', function () {
		it( 'is defined', function () {
			expect( PersistedDocumentResource ).toBeDefined();
		} );
		describe( 'Factory', function () {
			it( 'is defined', function () {
				expect( PersistedDocumentResource.Factory ).toBeDefined();
			} );
			it( 'is defined', function () {
				var resource:Resource.Class = Resource.Factory.create();
				var documentResource:DocumentResource.Class = DocumentResource.Factory.from( resource );
				var persisted:PersistedDocumentResource.Class = PersistedDocumentResource.Factory.from( documentResource, null );

				expect( persisted ).toBeDefined();
				expect( persisted ).not.toBeNull();
				expect( persisted ).toEqual( resource );

				persisted.addProperty( 'http://example.org/title', 'Awesome title' );

				expect( persisted._dirty ).toBe
			} );
		} );
	} );
} );