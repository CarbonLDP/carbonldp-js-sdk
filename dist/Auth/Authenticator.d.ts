import { RequestOptions } from "../HTTP/Request";
export declare abstract class Class<T extends object, W extends object> {
    protected abstract credentials: W;
    isAuthenticated(): boolean;
    abstract authenticate(authenticationToken: T): Promise<W>;
    clearAuthentication(): void;
    addAuthentication(requestOptions: RequestOptions): RequestOptions;
    protected abstract getHeaderValue(): string;
}
export default Class;
