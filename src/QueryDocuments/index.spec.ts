import * as Module from "./index";
import { QueryablePointer, } from "./QueryablePointer";
import { QueryableProperty } from "./QueryableProperty";
import { QueryContainer } from "./QueryContainer";
import { QueryContainerPropertyType } from "./QueryContainerPropertyType";
import { QueryDocumentBuilder, SubQueryDocumentsBuilder } from "./QueryDocumentBuilder";
import { QueryDocumentsBuilder } from "./QueryDocumentsBuilder";
import { QueryObject } from "./QueryObject";
import { QueryProperty } from "./QueryProperty";
import { QueryPropertyType } from "./QueryPropertyType";
import { QueryResultCompacter } from "./QueryResultCompacter";
import { QueryRootProperty } from "./QueryRootProperty";
import { QueryValue } from "./QueryValue";
import { QueryVariable } from "./QueryVariable";
import * as Utils from "./Utils";

describe( "QueryDocuments/index", () => {

	it( "should reexport QueryablePointer", () => {
		expect( Module.QueryablePointer ).toBeDefined();
		expect( Module.QueryablePointer ).toBe( QueryablePointer );
	} );

	it( "should reexport QueryableProperty", () => {
		expect( Module.QueryableProperty ).toBeDefined();
		expect( Module.QueryableProperty ).toBe( QueryableProperty );
	} );

	it( "should reexport QueryContainer", () => {
		expect( Module.QueryContainer ).toBeDefined();
		expect( Module.QueryContainer ).toBe( QueryContainer );
	} );

	it( "should reexport QueryContainerPropertyType", () => {
		expect( Module.QueryContainerPropertyType ).toBeDefined();
		expect( Module.QueryContainerPropertyType ).toBe( QueryContainerPropertyType );
	} );

	it( "should reexport QueryDocumentBuilder", () => {
		expect( Module.QueryDocumentBuilder ).toBeDefined();
		expect( Module.QueryDocumentBuilder ).toBe( QueryDocumentBuilder );
	} );

	it( "should reexport SubQueryDocumentsBuilder", () => {
		expect( Module.SubQueryDocumentsBuilder ).toBeDefined();
		expect( Module.SubQueryDocumentsBuilder ).toBe( SubQueryDocumentsBuilder );
	} );

	it( "should reexport QueryDocumentsBuilder", () => {
		expect( Module.QueryDocumentsBuilder ).toBeDefined();
		expect( Module.QueryDocumentsBuilder ).toBe( QueryDocumentsBuilder );
	} );

	it( "should reexport QueryObject", () => {
		expect( Module.QueryObject ).toBeDefined();
		expect( Module.QueryObject ).toBe( QueryObject );
	} );

	it( "should reexport QueryProperty", () => {
		expect( Module.QueryProperty ).toBeDefined();
		expect( Module.QueryProperty ).toBe( QueryProperty );
	} );

	it( "should reexport QueryPropertyType", () => {
		expect( Module.QueryPropertyType ).toBeDefined();
		expect( Module.QueryPropertyType ).toBe( QueryPropertyType );
	} );

	it( "should reexport QueryResultCompacter", () => {
		expect( Module.QueryResultCompacter ).toBeDefined();
		expect( Module.QueryResultCompacter ).toBe( QueryResultCompacter );
	} );

	it( "should reexport QueryRootProperty", () => {
		expect( Module.QueryRootProperty ).toBeDefined();
		expect( Module.QueryRootProperty ).toBe( QueryRootProperty );
	} );

	it( "should reexport QueryValue", () => {
		expect( Module.QueryValue ).toBeDefined();
		expect( Module.QueryValue ).toBe( QueryValue );
	} );

	it( "should reexport QueryVariable", () => {
		expect( Module.QueryVariable ).toBeDefined();
		expect( Module.QueryVariable ).toBe( QueryVariable );
	} );

	it( "should reexport _areDifferentType", () => {
		expect( Module._areDifferentType ).toBeDefined();
		expect( Module._areDifferentType ).toBe( Utils._areDifferentType );
	} );

	it( "should reexport _getBestType", () => {
		expect( Module._getBestType ).toBeDefined();
		expect( Module._getBestType ).toBe( Utils._getBestType );
	} );

	it( "should reexport _getMatchingDefinition", () => {
		expect( Module._getMatchingDefinition ).toBeDefined();
		expect( Module._getMatchingDefinition ).toBe( Utils._getMatchingDefinition );
	} );

	it( "should reexport _getPathProperty", () => {
		expect( Module._getPathProperty ).toBeDefined();
		expect( Module._getPathProperty ).toBe( Utils._getPathProperty );
	} );

	it( "should reexport _getRootPath", () => {
		expect( Module._getRootPath ).toBeDefined();
		expect( Module._getRootPath ).toBe( Utils._getRootPath );
	} );

} );

