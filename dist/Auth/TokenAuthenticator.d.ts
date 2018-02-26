import Context from "./../Context";
import * as HTTP from "../HTTP";
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
    addAuthentication(requestOptions: HTTP.Request.Options): HTTP.Request.Options;
    clearAuthentication(): void;
    private createToken();
    private addTokenAuthenticationHeader(headers);
}
export default Class;
