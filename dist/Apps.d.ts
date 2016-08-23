import * as App from "./App";
import AppContext from "./App/Context";
import Context from "./Context";
import * as HTTP from "./HTTP";
import * as PersistedDocument from "./PersistedDocument";
import * as Pointer from "./Pointer";
export declare class Class {
    private context;
    constructor(context: Context);
    getContext(uri: string): Promise<AppContext>;
    getContext(pointer: Pointer.Class): Promise<AppContext>;
    getAllContexts(): Promise<AppContext[]>;
    create(appDocument: App.Class, slug?: string): Promise<[PersistedDocument.Class, HTTP.Response.Class]>;
    delete(appURI: string, requestOptions?: HTTP.Request.Options): Promise<HTTP.Response.Class>;
    private resolveURI(appURI);
    private getContainerURI();
}
export default Class;
