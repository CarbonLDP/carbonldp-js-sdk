import { INSTANCE, module, reexports } from "../../test/JasmineExtender";

import * as QueryDocument from "./";

import * as PartialMetadata from "./PartialMetadata";
import * as QueryContext from "./QueryContext";
import * as QueryContextBuilder from "./QueryContextBuilder";
import * as QueryContextPartial from "./QueryContextPartial";
import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as QueryDocumentsBuilder from "./QueryDocumentsBuilder";
import * as QueryMetadata from "./QueryMetadata";
import * as QueryObject from "./QueryObject";
import * as QueryProperty from "./QueryProperty";
import * as QuerySchema from "./QuerySchema";
import * as QuerySchemaProperty from "./QuerySchemaProperty";
import * as QueryValue from "./QueryValue";
import * as QueryVariable from "./QueryVariable";

describe( module( "CarbonLDP/SPARQL/QueryDocument" ), ():void => {

	it( "should exists", ():void => {
		expect( QueryDocument ).toBeDefined();
		expect( QueryDocument ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports( INSTANCE, "PartialMetadata", "CarbonLDP/SPARQL/QueryDocument/PartialMetadata" ), ():void => {
		expect( QueryDocument.PartialMetadata ).toBeDefined();
		expect( QueryDocument.PartialMetadata ).toBe( PartialMetadata );
	} );

	it( reexports( INSTANCE, "QueryContext", "CarbonLDP/SPARQL/QueryDocument/QueryContext" ), ():void => {
		expect( QueryDocument.QueryContext ).toBeDefined();
		expect( QueryDocument.QueryContext ).toBe( QueryContext );
	} );

	it( reexports( INSTANCE, "QueryContextBuilder", "CarbonLDP/SPARQL/QueryDocument/QueryContextBuilder" ), ():void => {
		expect( QueryDocument.QueryContextBuilder ).toBeDefined();
		expect( QueryDocument.QueryContextBuilder ).toBe( QueryContextBuilder );
	} );

	it( reexports( INSTANCE, "QueryContextPartial", "CarbonLDP/SPARQL/QueryDocument/QueryContextPartial" ), ():void => {
		expect( QueryDocument.QueryContextPartial ).toBeDefined();
		expect( QueryDocument.QueryContextPartial ).toBe( QueryContextPartial );
	} );

	it( reexports( INSTANCE, "QueryDocumentBuilder", "CarbonLDP/SPARQL/QueryDocument/QueryDocumentBuilder" ), ():void => {
		expect( QueryDocument.QueryDocumentBuilder ).toBeDefined();
		expect( QueryDocument.QueryDocumentBuilder ).toBe( QueryDocumentBuilder );
	} );

	it( reexports( INSTANCE, "QueryDocumentsBuilder", "CarbonLDP/SPARQL/QueryDocument/QueryDocumentsBuilder" ), ():void => {
		expect( QueryDocument.QueryDocumentsBuilder ).toBeDefined();
		expect( QueryDocument.QueryDocumentsBuilder ).toBe( QueryDocumentsBuilder );
	} );

	it( reexports( INSTANCE, "QueryMetadata", "CarbonLDP/SPARQL/QueryDocument/QueryMetadata" ), ():void => {
		expect( QueryDocument.QueryMetadata ).toBeDefined();
		expect( QueryDocument.QueryMetadata ).toBe( QueryMetadata );
	} );

	it( reexports( INSTANCE, "QueryObject", "CarbonLDP/SPARQL/QueryDocument/QueryObject" ), ():void => {
		expect( QueryDocument.QueryObject ).toBeDefined();
		expect( QueryDocument.QueryObject ).toBe( QueryObject );
	} );

	it( reexports( INSTANCE, "QuerySchema", "CarbonLDP/SPARQL/QueryDocument/QuerySchema" ), ():void => {
		expect( QueryDocument.QuerySchema ).toBeDefined();
		expect( QueryDocument.QuerySchema ).toBe( QuerySchema );
	} );

	it( reexports( INSTANCE, "QueryProperty", "CarbonLDP/SPARQL/QueryDocument/QueryProperty" ), ():void => {
		expect( QueryDocument.QueryProperty ).toBeDefined();
		expect( QueryDocument.QueryProperty ).toBe( QueryProperty );
	} );

	it( reexports( INSTANCE, "QuerySchemaProperty", "CarbonLDP/SPARQL/QueryDocument/QuerySchemaProperty" ), ():void => {
		expect( QueryDocument.QuerySchemaProperty ).toBeDefined();
		expect( QueryDocument.QuerySchemaProperty ).toBe( QuerySchemaProperty );
	} );

	it( reexports( INSTANCE, "QueryValue", "CarbonLDP/SPARQL/QueryDocument/QueryValue" ), ():void => {
		expect( QueryDocument.QueryValue ).toBeDefined();
		expect( QueryDocument.QueryValue ).toBe( QueryValue );
	} );

	it( reexports( INSTANCE, "QueryVariable", "CarbonLDP/SPARQL/QueryDocument/QueryVariable" ), ():void => {
		expect( QueryDocument.QueryVariable ).toBeDefined();
		expect( QueryDocument.QueryVariable ).toBe( QueryVariable );
	} );

} );

