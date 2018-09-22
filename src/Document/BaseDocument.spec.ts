import { Pointer } from "../Pointer/Pointer";

import { BaseResource } from "../Resource/BaseResource";

import { extendsClass, hasProperty, interfaze, module, OPTIONAL } from "../test/JasmineExtender";

import { BaseDocument } from "./BaseDocument";


describe( module( "carbonldp/Document" ), ():void => {

	describe( interfaze(
		"CarbonLDP.BaseDocument",
		"Interface with the base properties of a document."
	), ():void => {

		it( extendsClass( "CarbonLDP.BaseResource" ), ():void => {
			const target:BaseResource = {} as BaseDocument;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"hasMemberRelation",
			"CarbonLDP.Pointer | string",
			"A Pointer with the member of relation of the document."
		), ():void => {
			const target:BaseDocument[ "hasMemberRelation" ] = {} as Pointer | string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"isMemberOfRelation",
			"CarbonLDP.Pointer | string",
			"A Pointer with the inverted relation the document will have."
		), ():void => {
			const target:BaseDocument[ "isMemberOfRelation" ] = {} as Pointer | string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"insertedContentRelation",
			"CarbonLDP.Pointer | string",
			"Pointer that represents the inserted content relation of the document."
		), ():void => {
			const target:BaseDocument[ "insertedContentRelation" ] = {} as Pointer | string;
			expect( target ).toBeDefined();
		} );

		it( hasProperty(
			OPTIONAL,
			"defaultInteractionModel",
			"CarbonLDP.Pointer | string",
			"A Pointer URI representing the default interaction model of the document when persisted."
		), ():void => {
			const target:BaseDocument[ "defaultInteractionModel" ] = {} as Pointer | string;
			expect( target ).toBeDefined();
		} );

	} );

} );
