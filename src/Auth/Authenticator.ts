import * as HTTP from "./../HTTP";
import AuthenticationToken from "./AuthenticationToken";
import * as Credentials from "./Credentials";

export interface Class<T extends AuthenticationToken> {
	isAuthenticated():boolean;
	authenticate( authenticationToken:T ):Promise<Credentials.Class>;
	clearAuthentication():void;
	addAuthentication( requestOptions:HTTP.Request.Options ):HTTP.Request.Options;
	supports( authenticationToken:AuthenticationToken ):boolean;
}

export default Class;
