import AppContext from "./Apps/AppContext";
import Context from "./Context";
import * as Response from "./HTTP/Response";
import * as Pointer from "./Pointer";
import * as App from "./Apps/App";
import * as PersistedApp from "./Apps/PersistedApp";
export declare class Class {
    private context;
    constructor(context: Context);
    getContext(uri: string): Promise<AppContext>;
    getAllContext(): Promise<AppContext[]>;
    create(appDocument: App.Class): Promise<[Pointer.Class, Response.Class]>;
    create(slug: string, appDocument: App.Class): Promise<[Pointer.Class, Response.Class]>;
    private getAppsContainerURI();
}
export { App, PersistedApp, AppContext };
export default Class;
