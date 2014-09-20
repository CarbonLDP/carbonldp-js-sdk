describe( 'Carbon object', function () {

	var ajaxTimeout = 1000;
	var testAppAvailable = null;
	var testAgentCredentials = {
		username: 'testagent@test.com',
		password: 'test',
		key     : '4e5t8n3mptt1qir5jgiiqqk4eu'
	}

	beforeEach( function ( done ) {
		if ( testAppAvailable !== null ) {
			done();
			return;
		}

		$j.ajax( {
			type   : 'HEAD',
			url    : Carbon.getAPIRequestURL() + 'ldp/testapp/',
			headers: {
				"Authorization": "Basic " + btoa( testAgentCredentials.username + ':' + testAgentCredentials.password )
			},
			timeout: ajaxTimeout
		} )
			.done( function () {
				testAppAvailable = true;
			} )
			.fail( function ( jqXHR, textStatus, errorThrown ) {
				switch ( jqXHR.status ) {
					case 0:
						window.console.error( 'jasmine( Carbon ) >> REST API unavailable, asynchronous tests will be omitted. ' );
						testAppAvailable = false;
						break;
					case 401:
						window.console.error( 'jasmine( Carbon ) >> Test dummy data not loaded, asynchronous tests will be omitted. ' );
						testAppAvailable = false;
						break;
					case 404:
						window.console.error( 'jasmine( Carbon ) >> Test dummy data not loaded, asynchronous tests will be omitted. ' );
						testAppAvailable = false;
						break;
					default:
						window.console.error( 'jasmine( Carbon ) >> Unknown error, asynchronous tests will be omitted. ' );
						testAppAvailable = false;
						break;
				}
			} )
			.always( function () {
				done();
			} )
		;
	} );

	it( 'is defined and globally accessible', function () {
		expect( Carbon ).toBeDefined();
	} );

	it( 'has method, getVersion(), which returns Carbon\'s Version', function () {
		expect( Carbon.getVersion() ).toEqual( jasmine.any( String ) );
	} );

	it( 'has method, getAPIRequestURL(), which returns a URL', function () {
		expect( Carbon.getAPIRequestURL() ).toEqual( jasmine.any( String ) );
	} );

	it( 'contains common namespaces', function () {
		expect( Carbon.DefaultPrefixes ).toEqual( jasmine.any( Object ) );
	} );

	it( 'contains SDK constants', function () {
		expect( Carbon.NS ).toEqual( Carbon.DefaultPrefixes.c );
		expect( Carbon.SECURITY_NS ).toEqual( Carbon.DefaultPrefixes.cs );
		expect( Carbon.INLINE_RESOURCE_SIGN ).toEqual( jasmine.any( String ) );
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
			it( 'has method, isToken(), which returns if a resource is a token or not', function () {
				expect( Carbon.Auth.Token.isToken ).toBeDefined();

				var tokenResource = Carbon.Resource.create( 'http://example.org/token' );
				tokenResource.addType( Carbon.Auth.Token.class );
				expect( Carbon.Auth.Token.isToken( tokenResource ) ).toBe( true );

				var nonTokenResource = Carbon.Resource.create( 'http://example.org/nonToken' );
				expect( Carbon.Auth.Token.isToken( nonTokenResource ) ).toBe( false );
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
			it( 'has method, isAgent(), which returns if a resource is an agent or not', function () {
				expect( Carbon.Auth.Agent.isAgent ).toBeDefined();

				var agentResource = Carbon.Resource.create( 'http://example.org/agent' );
				agentResource.addType( Carbon.Auth.Agent.class );
				expect( Carbon.Auth.Agent.isAgent( agentResource ) ).toBe( true );

				var nonAgentResource = Carbon.Resource.create( 'http://example.org/nonAgent' );
				expect( Carbon.Auth.Agent.isAgent( nonAgentResource ) ).toBe( false );
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

		it( 'has method, setMethod(), which sets (and validates) the current Auth method', function () {
			expect( Carbon.Auth.setMethod ).toBeDefined();

			expect( Carbon.Auth.setMethod.bind( null, 'token' ) ).not.toThrow();
			expect( Carbon.Auth.setMethod.bind( null, 'Isn\'t Valid' ) ).toThrow();
		} );
		it( 'has method, getMethod(), which returns the current Auth method', function () {
			expect( Carbon.Auth.getMethod ).toBeDefined();

			Carbon.Auth.setMethod( 'token' );

			expect( Carbon.Auth.getMethod() ).toEqual( 'token' );
		} );

		it( 'has method, login(), which sends a request to log the agent in', function () {
			expect( Carbon.Auth.login ).toBeDefined();
		} );
		it( 'login() >> Successfully logs an agent in', function ( done ) {
			if ( ! testAppAvailable ) {
				window.console.error( 'jasmine( Carbon.Auth.login ) >> Omitted due to unavailable service. ' );
				pending();
				return;
			}

			var loginPromise = Carbon.Auth.login( testAgentCredentials.username, testAgentCredentials.password );

			// Is this a promise?
			expect( loginPromise.then ).toBeDefined();

			loginPromise.then(
				function () {
					expect( Carbon.Auth.hasCredentials() ).toBe( true );
					expect( Carbon.Auth.getMethod() ).toEqual( 'token' );
					done();
				},
				function ( errorObject ) {
					// This shouldn't be reached
					expect( false ).toBe( true );
					done();
				}
			);
		} );
		it( 'login() >> Returns an ErrorResponse when an error happens', function ( done ) {
			if ( ! testAppAvailable ) {
				window.console.error( 'jasmine( Carbon.Auth.login ) >> Omitted due to unavailable service. ' );
				pending();
				return;
			}

			var loginPromise = Carbon.Auth.login( 'invalid@invalid.com', 'invalid' );

			// Is this a promise?
			expect( loginPromise.then ).toBeDefined();

			loginPromise.then(
				function () {
					expect( false ).toBe( true );
					done();
				},
				function ( errorObject ) {
					expect( errorObject ).toBeDefined();
					pending();
				}
			);
		} );

		it( 'has method, hasCredentials(), which returns if there are credentials in cache', function () {
			expect( Carbon.Auth.hasCredentials ).toBeDefined();
			expect( Carbon.Auth.hasCredentials() ).toEqual( jasmine.any( Boolean ) );
		} );

		it( 'has method, eraseCredentials(), which erases the cached credentials', function () {
			expect( Carbon.Auth.eraseCredentials ).toBeDefined();
			// TODO: Ensure that there are credentials before calling it
			Carbon.Auth.eraseCredentials();
			expect( Carbon.Auth.hasCredentials() ).toBe( false );
			expect( Carbon.Auth.getMethod() ).toBeNull();
		} );

		it( 'has method, setToken(), which sets a tokenResource as the current credentials', function () {
			expect( Carbon.Auth.setToken ).toBeDefined();

			var token = Carbon.Resource.create( 'http://example.org/token' );
			token.setProperty( Carbon.Auth.Token.Property.key.uri, 'Some key value' );
			Carbon.Auth.Token.injectMethods( token );

			expect( Carbon.Auth.setToken.bind( null, token ) ).not.toThrow();

			var nonToken = Carbon.Resource.create( 'http://example.org/nontoken' );
			Carbon.Auth.Token.injectMethods( nonToken );

			expect( Carbon.Auth.setToken.bind( null, nonToken ) ).toThrow();
		} );

		it( 'has method, setCredentialHeaders(), ', function () {
			expect( Carbon.Auth.setCredentialHeaders ).toBeDefined();
			pending();
		} );

		it( 'has method, registerAgent(), which registers an Agent', function(done) {
			if( ! testAppAvailable ) {
				window.console.error( 'jasmine( Carbon.Auth.registerAgent ) >> Omitted due to unavailable service. ' );
				pending();
				return;
			}

			expect( Carbon.Auth.registerAgent ).toBeDefined();

			pending();
		});
	} );

} );