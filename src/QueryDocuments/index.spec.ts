import { INSTANCE, module, reexports } from "../test/JasmineExtender";

import * as QueryDocument from "./index";

import { QueryableMetadata } from "./QueryableMetadata";
import { QueryContext } from "./QueryContext";
import { QueryContextBuilder } from "./QueryContextBuilder";
import { QueryDocumentBuilder } from "./QueryDocumentBuilder";
import { QueryDocumentsBuilder, QueryDocumentsBuilderOrderData } from "./QueryDocumentsBuilder";
import { QueryMetadata, QueryMetadataFactory } from "./QueryMetadata";
import { QueryObject } from "./QueryObject";
import { QueryProperty, QueryPropertyType } from "./QueryProperty";
import { QuerySchema } from "./QuerySchema";
import { QuerySchemaProperty } from "./QuerySchemaProperty";
import { QueryValue } from "./QueryValue";
import { QueryVariable } from "./QueryVariable";


describe( module( "carbonldp/QueryDocuments" ), ():void => {

	it( "should exists", ():void => {
		expect( QueryDocument ).toBeDefined();
		expect( QueryDocument ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports(
		INSTANCE,
		"QueryableMetadata",
		"CarbonLDP.QueryDocuments.QueryableMetadata"
	), ():void => {
		expect( QueryDocument.QueryableMetadata ).toBeDefined();
		expect( QueryDocument.QueryableMetadata ).toBe( QueryableMetadata );
	} );

	it( reexports(
		INSTANCE,
		"QueryContext",
		"CarbonLDP.QueryDocuments.QueryContext"
	), ():void => {
		expect( QueryDocument.QueryContext ).toBeDefined();
		expect( QueryDocument.QueryContext ).toBe( QueryContext );
	} );

	it( reexports(
		INSTANCE,
		"QueryContextBuilder",
		"CarbonLDP.QueryDocuments.QueryContextBuilder"
	), ():void => {
		expect( QueryDocument.QueryContextBuilder ).toBeDefined();
		expect( QueryDocument.QueryContextBuilder ).toBe( QueryContextBuilder );
	} );

	it( reexports(
		INSTANCE,
		"QueryDocumentBuilder",
		"CarbonLDP.QueryDocuments.QueryDocumentBuilder"
	), ():void => {
		expect( QueryDocument.QueryDocumentBuilder ).toBeDefined();
		expect( QueryDocument.QueryDocumentBuilder ).toBe( QueryDocumentBuilder );
	} );

	it( reexports(
		INSTANCE,
		"QueryDocumentsBuilderOrderData",
		"CarbonLDP.QueryDocuments.QueryDocumentsBuilderOrderData"
	), ():void => {
		const target:QueryDocument.QueryDocumentsBuilderOrderData = {} as QueryDocumentsBuilderOrderData;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		INSTANCE,
		"QueryDocumentsBuilder",
		"CarbonLDP.QueryDocuments.QueryDocumentsBuilder"
	), ():void => {
		expect( QueryDocument.QueryDocumentsBuilder ).toBeDefined();
		expect( QueryDocument.QueryDocumentsBuilder ).toBe( QueryDocumentsBuilder );
	} );

	it( reexports(
		INSTANCE,
		"QueryMetadata",
		"CarbonLDP.QueryDocuments.QueryMetadata"
	), ():void => {
		expect( QueryDocument.QueryMetadata ).toBeDefined();
		expect( QueryDocument.QueryMetadata ).toBe( QueryMetadata );
	} );

	it( reexports(
		INSTANCE,
		"QueryMetadataFactory",
		"CarbonLDP.QueryDocuments.QueryMetadataFactory"
	), ():void => {
		const target:QueryDocument.QueryMetadataFactory = {} as QueryMetadataFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		INSTANCE,
		"QueryObject",
		"CarbonLDP.QueryDocuments.QueryObject"
	), ():void => {
		expect( QueryDocument.QueryObject ).toBeDefined();
		expect( QueryDocument.QueryObject ).toBe( QueryObject );
	} );

	it( reexports(
		INSTANCE,
		"QueryProperty",
		"CarbonLDP.QueryDocuments.QueryProperty"
	), ():void => {
		expect( QueryDocument.QueryProperty ).toBeDefined();
		expect( QueryDocument.QueryProperty ).toBe( QueryProperty );
	} );

	it( reexports(
		INSTANCE,
		"QueryPropertyType",
		"CarbonLDP.QueryDocuments.QueryPropertyType"
	), ():void => {
		expect( QueryDocument.QueryPropertyType ).toBeDefined();
		expect( QueryDocument.QueryPropertyType ).toBe( QueryPropertyType );
	} );

	it( reexports(
		INSTANCE,
		"QuerySchema",
		"CarbonLDP.QueryDocuments.QuerySchema"
	), ():void => {
		const target:QueryDocument.QuerySchema = {} as QuerySchema;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		INSTANCE,
		"QuerySchemaProperty",
		"CarbonLDP.QueryDocuments.QuerySchemaProperty"
	), ():void => {
		const target:QueryDocument.QuerySchemaProperty = {} as QuerySchemaProperty;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		INSTANCE,
		"QueryValue",
		"CarbonLDP.QueryDocuments.QueryValue"
	), ():void => {
		expect( QueryDocument.QueryValue ).toBeDefined();
		expect( QueryDocument.QueryValue ).toBe( QueryValue );
	} );

	it( reexports(
		INSTANCE,
		"QueryVariable",
		"CarbonLDP.QueryDocuments.QueryVariable"
	), ():void => {
		expect( QueryDocument.QueryVariable ).toBeDefined();
		expect( QueryDocument.QueryVariable ).toBe( QueryVariable );
	} );

} );

