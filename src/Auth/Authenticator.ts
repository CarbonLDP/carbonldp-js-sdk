import { RequestOptions } from "../HTTP/Request";

export interface Class<T extends Object, W extends Object> {
	isAuthenticated():boolean;

	authenticate( authenticationToken:T ):Promise<W>;

	clearAuthentication():void;

	addAuthentication( requestOptions:RequestOptions ):RequestOptions;
}

export default Class;
