import { BaseResource } from "../Resource";
import {
	extendsClass,
	hasProperty,
	interfaze,
	module,
	OPTIONAL
} from "../test/JasmineExtender";

describe( module( "carbonldp/Document" ), ():void => {

	describe( interfaze(
		"CarbonLDP.BaseDocument",
		"Interface with the base properties of a document."
	), ():void => {

		it( extendsClass( "CarbonLDP.BaseResource" ), ():void => {
		} );

		it( hasProperty(
			OPTIONAL,
			"hasMemberRelation",
			"CarbonLDP.Pointer",
			"A Pointer with the member of relation of the document."
		), ():void => {} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"CarbonLDP.Pointer",
			"A Pointer with the inverted relation the document will have."
		), ():void => {} );

	} );

} );
