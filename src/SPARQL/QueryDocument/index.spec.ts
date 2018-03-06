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

describe( module( "carbonldp/SPARQL/QueryDocument" ), ():void => {

	it( "should exists", ():void => {
		expect( QueryDocument ).toBeDefined();
		expect( QueryDocument ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports( INSTANCE, "PartialMetadata", "carbonldp/SPARQL/QueryDocument/PartialMetadata" ), ():void => {
		expect( QueryDocument.PartialMetadata ).toBeDefined();
		expect( QueryDocument.PartialMetadata ).toBe( PartialMetadata );
	} );

	it( reexports( INSTANCE, "QueryContext", "carbonldp/SPARQL/QueryDocument/QueryContext" ), ():void => {
		expect( QueryDocument.QueryContext ).toBeDefined();
		expect( QueryDocument.QueryContext ).toBe( QueryContext );
	} );

	it( reexports( INSTANCE, "QueryContextBuilder", "carbonldp/SPARQL/QueryDocument/QueryContextBuilder" ), ():void => {
		expect( QueryDocument.QueryContextBuilder ).toBeDefined();
		expect( QueryDocument.QueryContextBuilder ).toBe( QueryContextBuilder );
	} );

	it( reexports( INSTANCE, "QueryContextPartial", "carbonldp/SPARQL/QueryDocument/QueryContextPartial" ), ():void => {
		expect( QueryDocument.QueryContextPartial ).toBeDefined();
		expect( QueryDocument.QueryContextPartial ).toBe( QueryContextPartial );
	} );

	it( reexports( INSTANCE, "QueryDocumentBuilder", "carbonldp/SPARQL/QueryDocument/QueryDocumentBuilder" ), ():void => {
		expect( QueryDocument.QueryDocumentBuilder ).toBeDefined();
		expect( QueryDocument.QueryDocumentBuilder ).toBe( QueryDocumentBuilder );
	} );

	it( reexports( INSTANCE, "QueryDocumentsBuilder", "carbonldp/SPARQL/QueryDocument/QueryDocumentsBuilder" ), ():void => {
		expect( QueryDocument.QueryDocumentsBuilder ).toBeDefined();
		expect( QueryDocument.QueryDocumentsBuilder ).toBe( QueryDocumentsBuilder );
	} );

	it( reexports( INSTANCE, "QueryMetadata", "carbonldp/SPARQL/QueryDocument/QueryMetadata" ), ():void => {
		expect( QueryDocument.QueryMetadata ).toBeDefined();
		expect( QueryDocument.QueryMetadata ).toBe( QueryMetadata );
	} );

	it( reexports( INSTANCE, "QueryObject", "carbonldp/SPARQL/QueryDocument/QueryObject" ), ():void => {
		expect( QueryDocument.QueryObject ).toBeDefined();
		expect( QueryDocument.QueryObject ).toBe( QueryObject );
	} );

	it( reexports( INSTANCE, "QuerySchema", "carbonldp/SPARQL/QueryDocument/QuerySchema" ), ():void => {
		expect( QueryDocument.QuerySchema ).toBeDefined();
		expect( QueryDocument.QuerySchema ).toBe( QuerySchema );
	} );

	it( reexports( INSTANCE, "QueryProperty", "carbonldp/SPARQL/QueryDocument/QueryProperty" ), ():void => {
		expect( QueryDocument.QueryProperty ).toBeDefined();
		expect( QueryDocument.QueryProperty ).toBe( QueryProperty );
	} );

	it( reexports( INSTANCE, "QuerySchemaProperty", "carbonldp/SPARQL/QueryDocument/QuerySchemaProperty" ), ():void => {
		expect( QueryDocument.QuerySchemaProperty ).toBeDefined();
		expect( QueryDocument.QuerySchemaProperty ).toBe( QuerySchemaProperty );
	} );

	it( reexports( INSTANCE, "QueryValue", "carbonldp/SPARQL/QueryDocument/QueryValue" ), ():void => {
		expect( QueryDocument.QueryValue ).toBeDefined();
		expect( QueryDocument.QueryValue ).toBe( QueryValue );
	} );

	it( reexports( INSTANCE, "QueryVariable", "carbonldp/SPARQL/QueryDocument/QueryVariable" ), ():void => {
		expect( QueryDocument.QueryVariable ).toBeDefined();
		expect( QueryDocument.QueryVariable ).toBe( QueryVariable );
	} );

} );

