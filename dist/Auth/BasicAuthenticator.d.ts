import { RequestOptions } from "../HTTP/Request";
import Authenticator from "./Authenticator";
import * as UsernameAndPasswordCredentials from "./UsernameAndPasswordCredentials";
import * as UsernameAndPasswordToken from "./UsernameAndPasswordToken";
export declare class Class implements Authenticator<UsernameAndPasswordToken.Class, UsernameAndPasswordCredentials.Class> {
    private credentials;
    isAuthenticated(): boolean;
    authenticate(authenticationToken: UsernameAndPasswordToken.Class): Promise<UsernameAndPasswordCredentials.Class>;
    addAuthentication(requestOptions: RequestOptions): RequestOptions;
    clearAuthentication(): void;
    private addBasicAuthenticationHeader(headers);
}
export default Class;
