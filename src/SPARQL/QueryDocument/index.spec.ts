import {
	INSTANCE,
	module,
	reexports
} from "../../test/JasmineExtender";

import * as QueryDocument from "./";

import { PartialMetadata } from "./PartialMetadata";
import { QueryContext } from "./QueryContext";
import { QueryContextBuilder } from "./QueryContextBuilder";
import { QueryContextPartial } from "./QueryContextPartial";
import { QueryDocumentBuilder } from "./QueryDocumentBuilder";
import {
	QueryDocumentsBuilder,
	QueryDocumentsBuilderOrderData,
} from "./QueryDocumentsBuilder";
import {
	QueryMetadata,
	QueryMetadataFactory,
} from "./QueryMetadata";
import { QueryObject } from "./QueryObject";
import {
	QueryProperty,
	QueryPropertyType,
} from "./QueryProperty";
import { QuerySchema } from "./QuerySchema";
import { QuerySchemaProperty } from "./QuerySchemaProperty";
import { QueryValue } from "./QueryValue";
import { QueryVariable } from "./QueryVariable";

describe( module( "carbonldp/SPARQL/QueryDocument" ), ():void => {

	it( "should exists", ():void => {
		expect( QueryDocument ).toBeDefined();
		expect( QueryDocument ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports(
		INSTANCE,
		"PartialMetadata",
		"CarbonLDP.SPARQL.QueryDocument.PartialMetadata"
	), ():void => {
		expect( QueryDocument.PartialMetadata ).toBeDefined();
		expect( QueryDocument.PartialMetadata ).toBe( PartialMetadata );
	} );

	it( reexports(
		INSTANCE,
		"QueryContext",
		"CarbonLDP.SPARQL.QueryDocument.QueryContext"
	), ():void => {
		expect( QueryDocument.QueryContext ).toBeDefined();
		expect( QueryDocument.QueryContext ).toBe( QueryContext );
	} );

	it( reexports(
		INSTANCE,
		"QueryContextBuilder",
		"CarbonLDP.SPARQL.QueryDocument.QueryContextBuilder"
	), ():void => {
		expect( QueryDocument.QueryContextBuilder ).toBeDefined();
		expect( QueryDocument.QueryContextBuilder ).toBe( QueryContextBuilder );
	} );

	it( reexports(
		INSTANCE,
		"QueryContextPartial",
		"CarbonLDP.SPARQL.QueryDocument.QueryContextPartial"
	), ():void => {
		expect( QueryDocument.QueryContextPartial ).toBeDefined();
		expect( QueryDocument.QueryContextPartial ).toBe( QueryContextPartial );
	} );

	it( reexports(
		INSTANCE,
		"QueryDocumentBuilder",
		"CarbonLDP.SPARQL.QueryDocument.QueryDocumentBuilder"
	), ():void => {
		expect( QueryDocument.QueryDocumentBuilder ).toBeDefined();
		expect( QueryDocument.QueryDocumentBuilder ).toBe( QueryDocumentBuilder );
	} );

	it( reexports(
		INSTANCE,
		"QueryDocumentsBuilderOrderData",
		"CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilderOrderData"
	), ():void => {
		const target:QueryDocument.QueryDocumentsBuilderOrderData = {} as QueryDocumentsBuilderOrderData;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		INSTANCE,
		"QueryDocumentsBuilder",
		"CarbonLDP.SPARQL.QueryDocument.QueryDocumentsBuilder"
	), ():void => {
		expect( QueryDocument.QueryDocumentsBuilder ).toBeDefined();
		expect( QueryDocument.QueryDocumentsBuilder ).toBe( QueryDocumentsBuilder );
	} );

	it( reexports(
		INSTANCE,
		"QueryMetadata",
		"CarbonLDP.SPARQL.QueryDocument.QueryMetadata"
	), ():void => {
		expect( QueryDocument.QueryMetadata ).toBeDefined();
		expect( QueryDocument.QueryMetadata ).toBe( QueryMetadata );
	} );

	it( reexports(
		INSTANCE,
		"QueryMetadataFactory",
		"CarbonLDP.SPARQL.QueryDocument.QueryMetadataFactory"
	), ():void => {
		const target:QueryDocument.QueryMetadataFactory = {} as QueryMetadataFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		INSTANCE,
		"QueryObject",
		"CarbonLDP.SPARQL.QueryDocument.QueryObject"
	), ():void => {
		expect( QueryDocument.QueryObject ).toBeDefined();
		expect( QueryDocument.QueryObject ).toBe( QueryObject );
	} );

	it( reexports(
		INSTANCE,
		"QueryProperty",
		"CarbonLDP.SPARQL.QueryDocument.QueryProperty"
	), ():void => {
		expect( QueryDocument.QueryProperty ).toBeDefined();
		expect( QueryDocument.QueryProperty ).toBe( QueryProperty );
	} );

	it( reexports(
		INSTANCE,
		"QueryPropertyType",
		"CarbonLDP.SPARQL.QueryDocument.QueryPropertyType"
	), ():void => {
		expect( QueryDocument.QueryPropertyType ).toBeDefined();
		expect( QueryDocument.QueryPropertyType ).toBe( QueryPropertyType );
	} );

	it( reexports(
		INSTANCE,
		"QuerySchema",
		"CarbonLDP.SPARQL.QueryDocument.QuerySchema"
	), ():void => {
		const target:QueryDocument.QuerySchema = {} as QuerySchema;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		INSTANCE,
		"QuerySchemaProperty",
		"CarbonLDP.SPARQL.QueryDocument.QuerySchemaProperty"
	), ():void => {
		const target:QueryDocument.QuerySchemaProperty = {} as QuerySchemaProperty;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		INSTANCE,
		"QueryValue",
		"CarbonLDP.SPARQL.QueryDocument.QueryValue"
	), ():void => {
		expect( QueryDocument.QueryValue ).toBeDefined();
		expect( QueryDocument.QueryValue ).toBe( QueryValue );
	} );

	it( reexports(
		INSTANCE,
		"QueryVariable",
		"CarbonLDP.SPARQL.QueryDocument.QueryVariable"
	), ():void => {
		expect( QueryDocument.QueryVariable ).toBeDefined();
		expect( QueryDocument.QueryVariable ).toBe( QueryVariable );
	} );

} );

