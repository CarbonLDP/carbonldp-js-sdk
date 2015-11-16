import * as HTTP from "./../HTTP";
import AuthenticationToken from "./AuthenticationToken";

export interface Class<T extends AuthenticationToken> {
	isAuthenticated():boolean;
	authenticate( authenticationToken:T ):Promise<void>;
	clearAuthentication():void;
	addAuthentication( requestOptions:HTTP.Request.Options ):HTTP.Request.Options;
	supports( authenticationToken:AuthenticationToken ):boolean;
}

export default Class;
