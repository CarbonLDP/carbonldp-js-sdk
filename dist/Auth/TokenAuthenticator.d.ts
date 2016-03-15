import Context from "./../Context";
import * as HTTP from "./../HTTP";
import Authenticator from "./Authenticator";
import AuthenticationToken from "./AuthenticationToken";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
import * as TokenCredentials from "./TokenCredentials";
export declare class Class implements Authenticator<UsernameAndPasswordToken> {
    private static TOKEN_CONTAINER;
    private context;
    private basicAuthenticator;
    private _credentials;
    credentials: TokenCredentials.Class;
    constructor(context: Context);
    isAuthenticated(): boolean;
    authenticate(authenticationToken: UsernameAndPasswordToken): Promise<TokenCredentials.Class>;
    addAuthentication(requestOptions: HTTP.Request.Options): HTTP.Request.Options;
    clearAuthentication(): void;
    supports(authenticationToken: AuthenticationToken): boolean;
    private createToken();
    private addTokenAuthenticationHeader(headers);
}
export default Class;
