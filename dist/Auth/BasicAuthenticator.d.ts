import Authenticator from "./Authenticator";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";
import * as UsernameAndPasswordToken from "./UsernameAndPasswordToken";
export declare class Class extends Authenticator<UsernameAndPasswordToken.Class, UsernameAndPasswordCredentials.Class> {
    protected credentials: UsernameAndPasswordCredentials.Class;
    authenticate(authenticationToken: UsernameAndPasswordToken.Class): Promise<UsernameAndPasswordCredentials.Class>;
    protected getHeaderValue(): string;
}
export default Class;
