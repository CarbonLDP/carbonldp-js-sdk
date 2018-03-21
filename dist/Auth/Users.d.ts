import { Context } from "../Context";
import { RequestOptions } from "../HTTP";
import { QueryDocumentBuilder } from "../SPARQL/QueryDocument";
import * as PersistedUser from "./PersistedUser";
export declare class Class {
    private context;
    constructor(context: Context);
    register(email: string, password: string, disabled?: boolean): Promise<PersistedUser.Class>;
    registerWith<T extends object>(userObject: T, email: string, password: string, disabled?: boolean): Promise<T & PersistedUser.Class>;
    get<T extends object>(userURI: string, requestOptions?: RequestOptions, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & PersistedUser.Class>;
    get<T extends object>(userURI: string, queryBuilderFn?: (queryBuilder: QueryDocumentBuilder) => QueryDocumentBuilder): Promise<T & PersistedUser.Class>;
    enable(userURI: string, requestOptions?: RequestOptions): Promise<PersistedUser.Class>;
    disable(userURI: string, requestOptions?: RequestOptions): Promise<PersistedUser.Class>;
    delete(userURI: string, requestOptions?: RequestOptions): Promise<void>;
    private getPersistedUser(userURI);
    private resolveURI(relativeURI?);
    private getContainerURI();
}
export default Class;
