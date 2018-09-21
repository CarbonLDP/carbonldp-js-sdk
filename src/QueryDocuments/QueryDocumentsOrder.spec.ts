import { hasProperty, interfaze, module, OBLIGATORY, OPTIONAL } from "../test/JasmineExtender";

import { QueryDocumentsOrder } from "./QueryDocumentsOrder";


describe( module( "carbonldp/QueryDocuments/QueryDocumentsOrder" ), ():void => {

	describe( interfaze(
		"CarbonLDP.SPARQLER.QueryDocument.QueryDocumentsOrder",
		"Interface that specifies the data of the order wanted fot the result query."
	), () => {

		it( hasProperty(
			OBLIGATORY,
			"path",
			"string",
			"The path to the property that specifies the order of the query."
		), ():void => {
			const target:QueryDocumentsOrder[ "path" ] = "path" as string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"flow",
			"\"ASC\" | \"DESC\"",
			"The flow of the order wanted."
		), ():void => {
			const target:QueryDocumentsOrder[ "flow" ] = "ASC" as "ASC" | "DESC";
			expect( target ).toBeDefined();
		} );

	} );

} );
