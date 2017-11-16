import { INSTANCE, module, reexports } from "../../test/JasmineExtender";

import * as QueryDocument from "../QueryDocument";
import * as QueryContext from "./QueryContext";
import * as QueryDocumentBuilder from "./QueryDocumentBuilder";
import * as QueryDocumentsBuilder from "./QueryDocumentsBuilder";
import * as QueryMetadata from "./QueryMetadata";
import * as QueryObject from "./QueryObject";
import * as QueryPropertiesSchema from "./QueryPropertiesSchema";
import * as QueryProperty from "./QueryProperty";
import * as QueryPropertySchema from "./QueryPropertySchema";
import * as QueryValue from "./QueryValue";
import * as QueryVariable from "./QueryVariable";

describe( module( "Carbon/SPARQL/QueryDocument" ), ():void => {

	it( "should exists", ():void => {
		expect( QueryDocument ).toBeDefined();
		expect( QueryDocument ).toEqual( jasmine.any( Object ) );
	} );

	it( reexports( INSTANCE, "QueryContext", "Carbon.SPARQL.QueryDocument.QueryContext" ), ():void => {
		expect( QueryDocument.QueryContext ).toBeDefined();
		expect( QueryDocument.QueryContext ).toBe( QueryContext );
	} );

	it( reexports( INSTANCE, "QueryDocumentBuilder", "Carbon.SPARQL.QueryDocument.QueryDocumentBuilder" ), ():void => {
		expect( QueryDocument.QueryDocumentBuilder ).toBeDefined();
		expect( QueryDocument.QueryDocumentBuilder ).toBe( QueryDocumentBuilder );
	} );

	it( reexports( INSTANCE, "QueryDocumentsBuilder", "Carbon.SPARQL.QueryDocument.QueryDocumentsBuilder" ), ():void => {
		expect( QueryDocument.QueryDocumentsBuilder ).toBeDefined();
		expect( QueryDocument.QueryDocumentsBuilder ).toBe( QueryDocumentsBuilder );
	} );

	it( reexports( INSTANCE, "QueryMetadata", "Carbon.SPARQL.QueryDocument.QueryMetadata" ), ():void => {
		expect( QueryDocument.QueryMetadata ).toBeDefined();
		expect( QueryDocument.QueryMetadata ).toBe( QueryMetadata );
	} );

	it( reexports( INSTANCE, "QueryObject", "Carbon.SPARQL.QueryDocument.QueryObject" ), ():void => {
		expect( QueryDocument.QueryObject ).toBeDefined();
		expect( QueryDocument.QueryObject ).toBe( QueryObject );
	} );

	it( reexports( INSTANCE, "QueryPropertiesSchema", "Carbon.SPARQL.QueryDocument.QueryPropertiesSchema" ), ():void => {
		expect( QueryDocument.QueryPropertiesSchema ).toBeDefined();
		expect( QueryDocument.QueryPropertiesSchema ).toBe( QueryPropertiesSchema );
	} );

	it( reexports( INSTANCE, "QueryProperty", "Carbon.SPARQL.QueryDocument.QueryProperty" ), ():void => {
		expect( QueryDocument.QueryProperty ).toBeDefined();
		expect( QueryDocument.QueryProperty ).toBe( QueryProperty );
	} );

	it( reexports( INSTANCE, "QueryPropertySchema", "Carbon.SPARQL.QueryDocument.QueryPropertySchema" ), ():void => {
		expect( QueryDocument.QueryPropertySchema ).toBeDefined();
		expect( QueryDocument.QueryPropertySchema ).toBe( QueryPropertySchema );
	} );

	it( reexports( INSTANCE, "QueryValue", "Carbon.SPARQL.QueryDocument.QueryValue" ), ():void => {
		expect( QueryDocument.QueryValue ).toBeDefined();
		expect( QueryDocument.QueryValue ).toBe( QueryValue );
	} );

	it( reexports( INSTANCE, "QueryVariable", "Carbon.SPARQL.QueryDocument.QueryVariable" ), ():void => {
		expect( QueryDocument.QueryVariable ).toBeDefined();
		expect( QueryDocument.QueryVariable ).toBe( QueryVariable );
	} );

} );

