import * as HTTP from "../HTTP";
export declare abstract class Class<T extends object, W extends object> {
    protected abstract credentials: W;
    isAuthenticated(): boolean;
    abstract authenticate(authenticationToken: T): Promise<W>;
    clearAuthentication(): void;
    addAuthentication(requestOptions: HTTP.Request.Options): HTTP.Request.Options;
    protected abstract getHeaderValue(): HTTP.Header.Value;
}
export default Class;
