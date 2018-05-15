import { AbstractAuthenticator } from "./AbstractAuthenticator";
import { BasicCredentials } from "./BasicCredentials";
import { BasicToken } from "./BasicToken";
export declare class BasicAuthenticator extends AbstractAuthenticator<BasicToken, BasicCredentials> {
    protected _credentials: BasicCredentials;
    authenticate(authenticationToken: BasicToken): Promise<BasicCredentials>;
    protected _getHeaderValue(): string;
}
