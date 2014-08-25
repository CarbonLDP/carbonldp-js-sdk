describe( 'Carbon object', function () {

	it( 'is defined and globally accessible', function () {
		expect( Carbon ).toBeDefined();
	} );

	it( 'has method, getVersion(), which returns Carbon\'s Version', function () {
		expect( Carbon.getVersion() ).toEqual( jasmine.any( String ) );
	} );

	it( 'has method, getAPIBaseURL(), which returns a URL', function () {
		expect( Carbon.getAPIBaseURL() ).toEqual( jasmine.any( String ) );
	} );

	it( 'contains common namespaces', function () {
		expect( Carbon.DefaultPrefixes ).toEqual( jasmine.any( Object ) );
	} );

	it( 'contains SDK constants', function () {
		expect( Carbon.NS ).toEqual( Carbon.DefaultPrefixes.c );
		expect( Carbon.SECURITY_NS ).toEqual( Carbon.DefaultPrefixes.cs );
		expect( Carbon.SECONDARY_RES_SIGN ).toEqual( jasmine.any( String ) );
		expect( Carbon.SYSTEM_RES_SIGN ).toEqual( jasmine.any( String ) );
	} );

	describe( 'Auth module', function () {

		it( 'is defined and globally accessible', function () {
			expect( Carbon.Auth ).toBeDefined();
		} );

		describe( 'Token, JSON-LD submodule', function () {
			it( 'is defined and globally accessible', function () {
				expect( Carbon.Auth.Token ).toBeDefined();
			} );
			it( 'has basic JSON-LD submodule properties', function () {
				expect( Carbon.Auth.Token.class ).toEqual( jasmine.any( String ) );
				expect( Carbon.Auth.Token.Property ).toEqual( jasmine.any( Object ) );
				// TODO: Create function to validate Property object
			} );
		} );

		describe( 'Agent, JSON-LD submodule', function () {
			it( 'is defined and globally accessible', function () {
				expect( Carbon.Auth.Agent ).toBeDefined();
			} );
			it( 'has basic JSON-LD submodule properties', function () {
				expect( Carbon.Auth.Agent.class ).toEqual( jasmine.any( String ) );
				expect( Carbon.Auth.Agent.Property ).toEqual( jasmine.any( Object ) );
				// TODO: Create function to validate Property object
			} );
			it( 'has method, create(), which returns a JSON-LD Agent Resource', function () {
				var agent = Carbon.Auth.Agent.create();
				expect( agent ).toEqual( jasmine.any( Object ) );
				expect( agent.isOfType( Carbon.Auth.Agent.class ) ).toBe( true );
				expect( agent.getURI() ).toEqual( jasmine.any( String ) );

				var agentURI = 'http://example.org/agents/123123123';
				var agentWithURI = Carbon.Auth.Agent.create( agentURI );
				expect( agentWithURI.getURI() ).toEqual( agentURI );
			} );
		} );

	} );

} );