import { Authenticator } from "./Authenticator";
import { UsernameAndPasswordCredentials } from "./UsernameAndPasswordCredentials";
import { UsernameAndPasswordToken } from "./UsernameAndPasswordToken";
export declare class BasicAuthenticator extends Authenticator<UsernameAndPasswordToken, UsernameAndPasswordCredentials> {
    protected credentials: UsernameAndPasswordCredentials;
    authenticate(authenticationToken: UsernameAndPasswordToken): Promise<UsernameAndPasswordCredentials>;
    protected _getHeaderValue(): string;
}
