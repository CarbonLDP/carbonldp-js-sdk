import { Authenticator } from "./Authenticator";
import * as BasicCredentials from "./BasicCredentials";
import * as BasicToken from "./BasicToken";
export declare class BasicAuthenticator extends Authenticator<BasicToken.Class, BasicCredentials.Class> {
    protected credentials: BasicCredentials.Class;
    authenticate(authenticationToken: BasicToken.Class): Promise<BasicCredentials.Class>;
    protected getHeaderValue(): string;
}
