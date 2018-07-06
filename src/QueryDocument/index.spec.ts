import {
	INSTANCE,
	module,
	reexports
} from "../test/JasmineExtender";
import * as QueryDocument from "./index";
import { PartialMetadata } from "./PartialMetadata";
import { QueryContext } from "./QueryContext";
import { QueryContextBuilder } from "./QueryContextBuilder";
import { QueryContextPartial } from "./QueryContextPartial";
import { QueryDocumentBuilder } from "./QueryDocumentBuilder";
import { QueryDocumentDocument } from "./QueryDocumentDocument";
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

describe( module( "carbonldp/QueryDocument" ), ():void => {

	it( "should exists", ():void => {
		expect( QueryDocument ).toBeDefined();
		expect( QueryDocument ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports(
		INSTANCE,
		"PartialMetadata",
		"CarbonLDP.QueryDocument.PartialMetadata"
	), ():void => {
		expect( QueryDocument.PartialMetadata ).toBeDefined();
		expect( QueryDocument.PartialMetadata ).toBe( PartialMetadata );
	} );

	it( reexports(
		INSTANCE,
		"QueryContext",
		"CarbonLDP.QueryDocument.QueryContext"
	), ():void => {
		expect( QueryDocument.QueryContext ).toBeDefined();
		expect( QueryDocument.QueryContext ).toBe( QueryContext );
	} );

	it( reexports(
		INSTANCE,
		"QueryContextBuilder",
		"CarbonLDP.QueryDocument.QueryContextBuilder"
	), ():void => {
		expect( QueryDocument.QueryContextBuilder ).toBeDefined();
		expect( QueryDocument.QueryContextBuilder ).toBe( QueryContextBuilder );
	} );

	it( reexports(
		INSTANCE,
		"QueryContextPartial",
		"CarbonLDP.QueryDocument.QueryContextPartial"
	), ():void => {
		expect( QueryDocument.QueryContextPartial ).toBeDefined();
		expect( QueryDocument.QueryContextPartial ).toBe( QueryContextPartial );
	} );

	it( reexports(
		INSTANCE,
		"QueryDocumentBuilder",
		"CarbonLDP.QueryDocument.QueryDocumentBuilder"
	), ():void => {
		expect( QueryDocument.QueryDocumentBuilder ).toBeDefined();
		expect( QueryDocument.QueryDocumentBuilder ).toBe( QueryDocumentBuilder );
	} );

	it( reexports(
		INSTANCE,
		"QueryDocumentsBuilderOrderData",
		"CarbonLDP.QueryDocument.QueryDocumentsBuilderOrderData"
	), ():void => {
		const target:QueryDocument.QueryDocumentsBuilderOrderData = {} as QueryDocumentsBuilderOrderData;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		INSTANCE,
		"QueryDocumentDocument",
		"CarbonLDP.QueryDocument.QueryDocumentDocument"
	), ():void => {
		expect( QueryDocument.QueryDocumentDocument ).toBeDefined();
		expect( QueryDocument.QueryDocumentDocument ).toBe( QueryDocumentDocument );
	} );

	it( reexports(
		INSTANCE,
		"QueryDocumentsBuilder",
		"CarbonLDP.QueryDocument.QueryDocumentsBuilder"
	), ():void => {
		expect( QueryDocument.QueryDocumentsBuilder ).toBeDefined();
		expect( QueryDocument.QueryDocumentsBuilder ).toBe( QueryDocumentsBuilder );
	} );

	it( reexports(
		INSTANCE,
		"QueryMetadata",
		"CarbonLDP.QueryDocument.QueryMetadata"
	), ():void => {
		expect( QueryDocument.QueryMetadata ).toBeDefined();
		expect( QueryDocument.QueryMetadata ).toBe( QueryMetadata );
	} );

	it( reexports(
		INSTANCE,
		"QueryMetadataFactory",
		"CarbonLDP.QueryDocument.QueryMetadataFactory"
	), ():void => {
		const target:QueryDocument.QueryMetadataFactory = {} as QueryMetadataFactory;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		INSTANCE,
		"QueryObject",
		"CarbonLDP.QueryDocument.QueryObject"
	), ():void => {
		expect( QueryDocument.QueryObject ).toBeDefined();
		expect( QueryDocument.QueryObject ).toBe( QueryObject );
	} );

	it( reexports(
		INSTANCE,
		"QueryProperty",
		"CarbonLDP.QueryDocument.QueryProperty"
	), ():void => {
		expect( QueryDocument.QueryProperty ).toBeDefined();
		expect( QueryDocument.QueryProperty ).toBe( QueryProperty );
	} );

	it( reexports(
		INSTANCE,
		"QueryPropertyType",
		"CarbonLDP.QueryDocument.QueryPropertyType"
	), ():void => {
		expect( QueryDocument.QueryPropertyType ).toBeDefined();
		expect( QueryDocument.QueryPropertyType ).toBe( QueryPropertyType );
	} );

	it( reexports(
		INSTANCE,
		"QuerySchema",
		"CarbonLDP.QueryDocument.QuerySchema"
	), ():void => {
		const target:QueryDocument.QuerySchema = {} as QuerySchema;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		INSTANCE,
		"QuerySchemaProperty",
		"CarbonLDP.QueryDocument.QuerySchemaProperty"
	), ():void => {
		const target:QueryDocument.QuerySchemaProperty = {} as QuerySchemaProperty;
		expect( target ).toBeDefined();
	} );

	it( reexports(
		INSTANCE,
		"QueryValue",
		"CarbonLDP.QueryDocument.QueryValue"
	), ():void => {
		expect( QueryDocument.QueryValue ).toBeDefined();
		expect( QueryDocument.QueryValue ).toBe( QueryValue );
	} );

	it( reexports(
		INSTANCE,
		"QueryVariable",
		"CarbonLDP.QueryDocument.QueryVariable"
	), ():void => {
		expect( QueryDocument.QueryVariable ).toBeDefined();
		expect( QueryDocument.QueryVariable ).toBe( QueryVariable );
	} );

} );

