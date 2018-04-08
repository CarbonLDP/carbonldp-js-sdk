import { RequestOptions } from "../HTTP/Request";
import { Response } from "../HTTP/Response";
import { AuthenticatedUserInformationAccessor } from "./AuthenticatedUserInformationAccessor";
import { Authenticator } from "./Authenticator";
import { TokenCredentials, TokenCredentialsBase } from "./TokenCredentials";
import { UsernameAndPasswordToken } from "./UsernameAndPasswordToken";
export declare class TokenAuthenticator extends Authenticator<UsernameAndPasswordToken, TokenCredentials> {
    protected _credentials: TokenCredentials;
    isAuthenticated(): boolean;
    authenticate(tokenOrCredentials: UsernameAndPasswordToken | TokenCredentialsBase): Promise<TokenCredentials>;
    protected _getHeaderValue(): string;
    protected _parseCredentialsBase(credentialsBase: TokenCredentialsBase): Promise<TokenCredentials>;
    protected _getCredentials(token: UsernameAndPasswordToken): Promise<TokenCredentials>;
    protected _parseRDFMetadata(rdfData: object[], response: Response, requestOptions: RequestOptions): AuthenticatedUserInformationAccessor;
    protected _parseRDFCredentials(rdfData: object[], response: Response): TokenCredentials;
}
