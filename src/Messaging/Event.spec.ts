import { Event } from "./Event";


describe( "Event", () => {

	it( "should exists", () => {
		expect( Event ).toBeDefined();
		expect( Event ).toEqual( jasmine.any( Object ) );
	} );


	it( "Event.CHILD_CREATED", () => {
		expect( Event.CHILD_CREATED ).toBeDefined();
		expect( Event.CHILD_CREATED ).toBe( "child.created" );
	} );

	it( "Event.DOCUMENT_MODIFIED", () => {
		expect( Event.DOCUMENT_MODIFIED ).toBeDefined();
		expect( Event.DOCUMENT_MODIFIED ).toBe( "document.modified" );
	} );

	it( "Event.DOCUMENT_DELETED", () => {
		expect( Event.DOCUMENT_DELETED ).toBeDefined();
		expect( Event.DOCUMENT_DELETED ).toBe( "document.deleted" );
	} );

	it( "Event.MEMBER_ADDED", () => {
		expect( Event.MEMBER_ADDED ).toBeDefined();
		expect( Event.MEMBER_ADDED ).toBe( "member.added" );
	} );

	it( "Event.MEMBER_REMOVED", () => {
		expect( Event.MEMBER_REMOVED ).toBeDefined();
		expect( Event.MEMBER_REMOVED ).toBe( "member.removed" );
	} );

} );
