import Context from "./../Context";
import * as HTTP from "./../HTTP";
import Authenticator from "./Authenticator";
import * as Token from "./Token";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
export declare class Class implements Authenticator<UsernameAndPasswordToken> {
    private static TOKEN_CONTAINER;
    private context;
    private basicAuthenticator;
    private _credentials;
    constructor(context: Context);
    isAuthenticated(): boolean;
    authenticate(authenticationToken: UsernameAndPasswordToken): Promise<Token.Class>;
    authenticate(credentials: Token.Class): Promise<Token.Class>;
    addAuthentication(requestOptions: HTTP.Request.Options): HTTP.Request.Options;
    clearAuthentication(): void;
    private createToken();
    private addTokenAuthenticationHeader(headers);
}
export default Class;
