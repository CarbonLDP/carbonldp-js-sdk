import * as HTTP from "./../HTTP";
import Parent from "./../Parent";
import Authenticator from "./Authenticator";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
export declare class Class implements Authenticator<UsernameAndPasswordToken> {
    private static TOKEN_CONTAINER;
    private parent;
    private basicAuthenticator;
    private token;
    constructor(parent: Parent);
    isAuthenticated(): boolean;
    authenticate(authenticationToken: UsernameAndPasswordToken): Promise<void>;
    addAuthentication(requestOptions: HTTP.Request.Options): HTTP.Request.Options;
    clearAuthentication(): void;
    private createToken();
    private addTokenAuthenticationHeader(headers);
}
export default Class;
