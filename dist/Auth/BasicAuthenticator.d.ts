import { Authenticator } from "./Authenticator";
import { BasicCredentials } from "./BasicCredentials";
import { BasicToken } from "./BasicToken";
export declare class BasicAuthenticator extends Authenticator<BasicToken, BasicCredentials> {
    protected credentials: BasicCredentials;
    authenticate(authenticationToken: BasicToken): Promise<BasicCredentials>;
    protected getHeaderValue(): string;
}
