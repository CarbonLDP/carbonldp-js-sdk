import * as HTTP from "../HTTP";

export interface Class<T extends Object, W extends Object> {
	isAuthenticated():boolean;
	authenticate( authenticationToken:T ):Promise<W>;
	clearAuthentication():void;
	addAuthentication( requestOptions:HTTP.Request.Options ):HTTP.Request.Options;
}

export default Class;
