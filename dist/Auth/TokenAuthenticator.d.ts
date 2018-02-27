import { RequestOptions } from "../HTTP/Request";
import Context from "./../Context";
import Authenticator from "./Authenticator";
import * as Token from "./Token";
import * as UsernameAndPasswordToken from "./UsernameAndPasswordToken";
export declare const TOKEN_CONTAINER: string;
export declare class Class implements Authenticator<UsernameAndPasswordToken.Class, Token.Class> {
    private context;
    private basicAuthenticator;
    private _credentials;
    constructor(context: Context);
    isAuthenticated(): boolean;
    authenticate(authenticationToken: UsernameAndPasswordToken.Class): Promise<Token.Class>;
    authenticate(credentials: Token.Class): Promise<Token.Class>;
    addAuthentication(requestOptions: RequestOptions): RequestOptions;
    clearAuthentication(): void;
    private createToken();
    private addTokenAuthenticationHeader(headers);
}
export default Class;
