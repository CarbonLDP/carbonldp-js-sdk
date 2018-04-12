import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { AuthenticatedUserInformationAccessor } from "./AuthenticatedUserInformationAccessor";
import { Authenticator } from "./Authenticator";
import { BasicToken } from "./BasicToken";
import { TokenCredentials, TokenCredentialsBase } from "./TokenCredentials";
export declare class TokenAuthenticator extends Authenticator<BasicToken, TokenCredentials> {
    protected _credentials: TokenCredentials;
    isAuthenticated(): boolean;
    authenticate(tokenOrCredentials: BasicToken | TokenCredentialsBase): Promise<TokenCredentials>;
    protected _getHeaderValue(): string;
    protected _parseCredentialsBase(credentialsBase: TokenCredentialsBase): Promise<TokenCredentials>;
    protected _getCredentials(token: BasicToken): Promise<TokenCredentials>;
    protected _parseRDFMetadata(rdfData: object[], response: Response, requestOptions: RequestOptions): AuthenticatedUserInformationAccessor;
    protected _parseRDFCredentials(rdfData: object[], response: Response): TokenCredentials;
}
