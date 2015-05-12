/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
class Agent {

}

class Auth {
	login( username:string, password:string ):Promise<Agent> {
		return new Promise( function ( resolve, reject ) {
			// TODO: Implement
			reject( "Not implemented" );
		} );
	}
}

export default Auth;