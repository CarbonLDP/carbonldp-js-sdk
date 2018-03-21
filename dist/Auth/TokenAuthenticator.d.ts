import { Context } from "../Context";
import { Authenticator } from "./Authenticator";
import { BasicToken } from "./BasicToken";
import * as TokenCredentials from "./TokenCredentials";
export declare const TOKEN_CONTAINER: string;
export declare class Class extends Authenticator<BasicToken, TokenCredentials.Class> {
    protected context: Context;
    protected credentials: TokenCredentials.Class;
    constructor(context: Context);
    isAuthenticated(): boolean;
    authenticate(tokenOrCredentials: BasicToken | TokenCredentials.Class): Promise<TokenCredentials.Class>;
    protected getHeaderValue(): string;
    private getCredentials(tokenOrCredentials);
}
export default Class;
