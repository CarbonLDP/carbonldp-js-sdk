import { RequestOptions } from "../HTTP";


export interface Authenticator<C extends object> {
	isAuthenticated():boolean;

	authenticate( ...params:any[] ):Promise<C>;

	clearAuthentication():void;

	addAuthentication( requestOptions:RequestOptions ):RequestOptions;
}
