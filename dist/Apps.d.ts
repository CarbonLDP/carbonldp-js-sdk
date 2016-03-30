import AppContext from "./App/Context";
import Context from "./Context";
import * as Response from "./HTTP/Response";
import * as Pointer from "./Pointer";
import * as App from "./App";
export declare class Class {
    private context;
    constructor(context: Context);
    getContext(uri: string): Promise<AppContext>;
    getContext(pointer: Pointer.Class): Promise<AppContext>;
    getAllContext(): Promise<AppContext[]>;
    create(appDocument: App.Class): Promise<[Pointer.Class, Response.Class]>;
    create(slug: string, appDocument: App.Class): Promise<[Pointer.Class, Response.Class]>;
    private getAppsContainerURI();
}
export default Class;
