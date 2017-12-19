import * as Context from "./../Context";
import * as HTTP from "./../HTTP";
import { QueryDocumentBuilder } from "./../SPARQL/QueryDocument";
import * as PersistedUser from "./PersistedUser";
export declare class Class {
    private context;
    constructor(context: Context.Class);
    register(email: string, password: string, disabled?: boolean): Promise<[PersistedUser.Class, HTTP.Response.Class]>;
    registerWith<T extends object>(userObject: T, email: string, password: string, disabled?: boolean): Promise<[T & PersistedUser.Class, HTTP.Response.Class]>;
    get<T extends object>(userURI: string, requestOptions?: HTTP.Request.Options, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder.Class) => QueryDocumentBuilder.Class): Promise<[T & PersistedUser.Class, HTTP.Response.Class]>;
    get<T extends object>(userURI: string, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder.Class) => QueryDocumentBuilder.Class): Promise<[T & PersistedUser.Class, HTTP.Response.Class]>;
    enable(userURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedUser.Class, HTTP.Response.Class[]]>;
    disable(userURI: string, requestOptions?: HTTP.Request.Options): Promise<[PersistedUser.Class, HTTP.Response.Class[]]>;
    delete(userURI: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    private getPersistedUser(userURI);
    private resolveURI(relativeURI?);
}
export default Class;
