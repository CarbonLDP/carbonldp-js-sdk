import Context from "./../Context";
import * as HTTP from "./../HTTP";
import Authenticator from "./Authenticator";
import * as TokenCredentials from "./TokenCredentials";
import * as UsernameAndPasswordToken from "./UsernameAndPasswordToken";
export declare const TOKEN_CONTAINER: string;
export declare class Class implements Authenticator<UsernameAndPasswordToken.Class, TokenCredentials.Class> {
    private context;
    private basicAuthenticator;
    private _credentials;
    constructor(context: Context);
    isAuthenticated(): boolean;
    authenticate(tokenOrCredentials: UsernameAndPasswordToken.Class | TokenCredentials.Class): Promise<TokenCredentials.Class>;
    addAuthentication(requestOptions: HTTP.Request.Options): HTTP.Request.Options;
    clearAuthentication(): void;
    private createToken();
    private addTokenAuthenticationHeader(headers);
}
export default Class;
