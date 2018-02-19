import {
	STATIC,

	module,
	clazz,

	isDefined,
	hasProperty
} from "./../test/JasmineExtender";
import * as Utils from "./../Utils";

import * as LDP from "./LDP";

describe( module(
	"Carbon/Vocabularies/LDP"
), ():void => {

	it( isDefined(), ():void => {
		expect( LDP ).toBeDefined();
		expect( Utils.isObject( LDP ) ).toBe( true );
	} );

	it( hasProperty(
		STATIC,
		"namespace",
		"string"
	), ():void => {
		expect( LDP.namespace ).toBeDefined();
		expect( Utils.isString( LDP.namespace ) ).toBe( true );

		expect( LDP.namespace ).toBe( "http://www.w3.org/ns/ldp#" )
	} );

	describe( clazz(
		"Carbon.NS.LDP.Class",
		"Class that contains classes defined in the W3C Linked Data Platform (LDP) vocabulary."
	), ():void => {

		it( isDefined(), ():void => {
			expect( LDP.Class ).toBeDefined();
			expect( Utils.isFunction( LDP.Class ) ).toBe( true );
			expect( Object.keys( LDP.Class ).length ).toBe( 16 );
		} );

		it( hasProperty(
			STATIC,
			"Resource",
			"string"
		), ():void => {
			expect( LDP.Class.Resource ).toBeDefined();
			expect( Utils.isString( LDP.Class.Resource ) ).toBe( true );

			expect( LDP.Class.Resource ).toBe( "http://www.w3.org/ns/ldp#Resource" );
		} );

		it( hasProperty(
			STATIC,
			"RDFSource",
			"string"
		), ():void => {
			expect( LDP.Class.RDFSource ).toBeDefined();
			expect( Utils.isString( LDP.Class.RDFSource ) ).toBe( true );

			expect( LDP.Class.RDFSource ).toBe( "http://www.w3.org/ns/ldp#RDFSource" );
		} );

		it( hasProperty(
			STATIC,
			"Container",
			"string"
		), ():void => {
			expect( LDP.Class.Container ).toBeDefined();
			expect( Utils.isString( LDP.Class.Container ) ).toBe( true );

			expect( LDP.Class.Container ).toBe( "http://www.w3.org/ns/ldp#Container" );
		} );

		it( hasProperty(
			STATIC,
			"BasicContainer",
			"string"
		), ():void => {
			expect( LDP.Class.BasicContainer ).toBeDefined();
			expect( Utils.isString( LDP.Class.BasicContainer ) ).toBe( true );

			expect( LDP.Class.BasicContainer ).toBe( "http://www.w3.org/ns/ldp#BasicContainer" );
		} );

		it( hasProperty(
			STATIC,
			"DirectContainer",
			"string"
		), ():void => {
			expect( LDP.Class.DirectContainer ).toBeDefined();
			expect( Utils.isString( LDP.Class.DirectContainer ) ).toBe( true );

			expect( LDP.Class.DirectContainer ).toBe( "http://www.w3.org/ns/ldp#DirectContainer" );
		} );

		it( hasProperty(
			STATIC,
			"IndirectContainer",
			"string"
		), ():void => {
			expect( LDP.Class.IndirectContainer ).toBeDefined();
			expect( Utils.isString( LDP.Class.IndirectContainer ) ).toBe( true );

			expect( LDP.Class.IndirectContainer ).toBe( "http://www.w3.org/ns/ldp#IndirectContainer" );
		} );

		it( hasProperty(
			STATIC,
			"NonRDFSource",
			"string"
		), ():void => {
			expect( LDP.Class.NonRDFSource ).toBeDefined();
			expect( Utils.isString( LDP.Class.NonRDFSource ) ).toBe( true );

			expect( LDP.Class.NonRDFSource ).toBe( "http://www.w3.org/ns/ldp#NonRDFSource" );
		} );

		it( hasProperty(
			STATIC,
			"MemberSubject",
			"string"
		), ():void => {
			expect( LDP.Class.MemberSubject ).toBeDefined();
			expect( Utils.isString( LDP.Class.MemberSubject ) ).toBe( true );

			expect( LDP.Class.MemberSubject ).toBe( "http://www.w3.org/ns/ldp#MemberSubject" );
		} );

		it( hasProperty(
			STATIC,
			"PreferContainment",
			"string"
		), ():void => {
			expect( LDP.Class.PreferContainment ).toBeDefined();
			expect( Utils.isString( LDP.Class.PreferContainment ) ).toBe( true );

			expect( LDP.Class.PreferContainment ).toBe( "http://www.w3.org/ns/ldp#PreferContainment" );
		} );

		it( hasProperty(
			STATIC,
			"PreferMembership",
			"string"
		), ():void => {
			expect( LDP.Class.PreferMembership ).toBeDefined();
			expect( Utils.isString( LDP.Class.PreferMembership ) ).toBe( true );

			expect( LDP.Class.PreferMembership ).toBe( "http://www.w3.org/ns/ldp#PreferMembership" );
		} );

		it( hasProperty(
			STATIC,
			"PreferEmptyContainer",
			"string"
		), ():void => {
			expect( LDP.Class.PreferEmptyContainer ).toBeDefined();
			expect( Utils.isString( LDP.Class.PreferEmptyContainer ) ).toBe( true );

			expect( LDP.Class.PreferEmptyContainer ).toBe( "http://www.w3.org/ns/ldp#PreferEmptyContainer" );
		} );

		it( hasProperty(
			STATIC,
			"PreferMinimalContainer",
			"string"
		), ():void => {
			expect( LDP.Class.PreferMinimalContainer ).toBeDefined();
			expect( Utils.isString( LDP.Class.PreferMinimalContainer ) ).toBe( true );

			expect( LDP.Class.PreferMinimalContainer ).toBe( "http://www.w3.org/ns/ldp#PreferMinimalContainer" );
		} );

		it( hasProperty(
			STATIC,
			"Page",
			"string"
		), ():void => {
			expect( LDP.Class.Page ).toBeDefined();
			expect( Utils.isString( LDP.Class.Page ) ).toBe( true );

			expect( LDP.Class.Page ).toBe( "http://www.w3.org/ns/ldp#Page" );
		} );

		it( hasProperty(
			STATIC,
			"PageSortCriterion",
			"string"
		), ():void => {
			expect( LDP.Class.PageSortCriterion ).toBeDefined();
			expect( Utils.isString( LDP.Class.PageSortCriterion ) ).toBe( true );

			expect( LDP.Class.PageSortCriterion ).toBe( "http://www.w3.org/ns/ldp#PageSortCriterion" );
		} );

		it( hasProperty(
			STATIC,
			"Ascending",
			"string"
		), ():void => {
			expect( LDP.Class.Ascending ).toBeDefined();
			expect( Utils.isString( LDP.Class.Ascending ) ).toBe( true );

			expect( LDP.Class.Ascending ).toBe( "http://www.w3.org/ns/ldp#Ascending" );
		} );

		it( hasProperty(
			STATIC,
			"Descending",
			"string"
		), ():void => {
			expect( LDP.Class.Descending ).toBeDefined();
			expect( Utils.isString( LDP.Class.Descending ) ).toBe( true );

			expect( LDP.Class.Descending ).toBe( "http://www.w3.org/ns/ldp#Descending" );
		} );

	} );

	describe( clazz(
		"Carbon.NS.LDP.Predicate",
		"Class that contains predicates defined in the W3C Linked Data Platform (LDP) vocabulary."
	), ():void => {

		it( isDefined(), ():void => {
			expect( LDP.Predicate ).toBeDefined();
			expect( Utils.isFunction( LDP.Predicate ) ).toBe( true );

			expect( Object.keys( LDP.Predicate ).length ).toBe( 11 );
		} );

		it( hasProperty(
			STATIC,
			"contains",
			"string"
		), ():void => {
			expect( LDP.Predicate.contains ).toBeDefined();
			expect( Utils.isString( LDP.Predicate.contains ) ).toBe( true );

			expect( LDP.Predicate.contains ).toBe( "http://www.w3.org/ns/ldp#contains" );
		} );

		it( hasProperty(
			STATIC,
			"member",
			"string"
		), ():void => {
			expect( LDP.Predicate.member ).toBeDefined();
			expect( Utils.isString( LDP.Predicate.member ) ).toBe( true );

			expect( LDP.Predicate.member ).toBe( "http://www.w3.org/ns/ldp#member" );
		} );

		it( hasProperty(
			STATIC,
			"hasMemberRelation",
			"string"
		), ():void => {
			expect( LDP.Predicate.hasMemberRelation ).toBeDefined();
			expect( Utils.isString( LDP.Predicate.hasMemberRelation ) ).toBe( true );

			expect( LDP.Predicate.hasMemberRelation ).toBe( "http://www.w3.org/ns/ldp#hasMemberRelation" );
		} );

		it( hasProperty(
			STATIC,
			"isMemberOfRelation",
			"string"
		), ():void => {
			expect( LDP.Predicate.isMemberOfRelation ).toBeDefined();
			expect( Utils.isString( LDP.Predicate.isMemberOfRelation ) ).toBe( true );

			expect( LDP.Predicate.isMemberOfRelation ).toBe( "http://www.w3.org/ns/ldp#isMemberOfRelation" );
		} );

		it( hasProperty(
			STATIC,
			"membershipResource",
			"string"
		), ():void => {
			expect( LDP.Predicate.membershipResource ).toBeDefined();
			expect( Utils.isString( LDP.Predicate.membershipResource ) ).toBe( true );

			expect( LDP.Predicate.membershipResource ).toBe( "http://www.w3.org/ns/ldp#membershipResource" );
		} );

		it( hasProperty(
			STATIC,
			"insertedContentRelation",
			"string"
		), ():void => {
			expect( LDP.Predicate.insertedContentRelation ).toBeDefined();
			expect( Utils.isString( LDP.Predicate.insertedContentRelation ) ).toBe( true );

			expect( LDP.Predicate.insertedContentRelation ).toBe( "http://www.w3.org/ns/ldp#insertedContentRelation" );
		} );

		it( hasProperty(
			STATIC,
			"constrainedBy",
			"string"
		), ():void => {
			expect( LDP.Predicate.constrainedBy ).toBeDefined();
			expect( Utils.isString( LDP.Predicate.constrainedBy ) ).toBe( true );

			expect( LDP.Predicate.constrainedBy ).toBe( "http://www.w3.org/ns/ldp#constrainedBy" );
		} );

		it( hasProperty(
			STATIC,
			"pageSortCriteria",
			"string"
		), ():void => {
			expect( LDP.Predicate.pageSortCriteria ).toBeDefined();
			expect( Utils.isString( LDP.Predicate.pageSortCriteria ) ).toBe( true );

			expect( LDP.Predicate.pageSortCriteria ).toBe( "http://www.w3.org/ns/ldp#pageSortCriteria" );
		} );

		it( hasProperty(
			STATIC,
			"pageSortOrder",
			"string"
		), ():void => {
			expect( LDP.Predicate.pageSortOrder ).toBeDefined();
			expect( Utils.isString( LDP.Predicate.pageSortOrder ) ).toBe( true );

			expect( LDP.Predicate.pageSortOrder ).toBe( "http://www.w3.org/ns/ldp#pageSortOrder" );
		} );

		it( hasProperty(
			STATIC,
			"pageSortCollation",
			"string"
		), ():void => {
			expect( LDP.Predicate.pageSortCollation ).toBeDefined();
			expect( Utils.isString( LDP.Predicate.pageSortCollation ) ).toBe( true );

			expect( LDP.Predicate.pageSortCollation ).toBe( "http://www.w3.org/ns/ldp#pageSortCollation" );
		} );

		it( hasProperty(
			STATIC,
			"pageSequence",
			"string"
		), ():void => {
			expect( LDP.Predicate.pageSequence ).toBeDefined();
			expect( Utils.isString( LDP.Predicate.pageSequence ) ).toBe( true );

			expect( LDP.Predicate.pageSequence ).toBe( "http://www.w3.org/ns/ldp#pageSequence" );
		} );

	} );

} );