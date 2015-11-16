import * as HTTP from "./../HTTP";
import Authenticator from "./Authenticator";
import AuthenticationToken from "./AuthenticationToken";
import UsernameAndPasswordToken from "./UsernameAndPasswordToken";
export interface Credentials {
    username: string;
    password: string;
}
export declare class Class implements Authenticator<UsernameAndPasswordToken> {
    private credentials;
    isAuthenticated(): boolean;
    authenticate(authenticationToken: UsernameAndPasswordToken): Promise<void>;
    addAuthentication(requestOptions: HTTP.Request.Options): HTTP.Request.Options;
    clearAuthentication(): void;
    supports(authenticationToken: AuthenticationToken): boolean;
    private addBasicAuthenticationHeader(headers);
}
export default Class;
