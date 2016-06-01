import * as HTTP from "./../HTTP";
import Authenticator from "./Authenticator";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";
export declare class Class implements Authenticator<UsernameAndPasswordToken> {
    private credentials;
    isAuthenticated(): boolean;
    authenticate(authenticationToken: UsernameAndPasswordToken): Promise<UsernameAndPasswordCredentials.Class>;
    addAuthentication(requestOptions: HTTP.Request.Options): HTTP.Request.Options;
    clearAuthentication(): void;
    private addBasicAuthenticationHeader(headers);
}
export default Class;
