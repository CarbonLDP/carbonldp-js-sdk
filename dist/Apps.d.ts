import AppContext from "./AppContext";
import Context from "./Context";
import * as Response from "./HTTP/Response";
import * as Pointer from "./Pointer";
import * as App from "./App";
declare class Apps {
    private context;
    constructor(context: Context);
    getAppContext(uri: string): Promise<AppContext>;
    getAllAppContext(): Promise<AppContext[]>;
    createApp(appDocument: App.Class): Promise<[Pointer.Class, Response.Class]>;
    createApp(slug: string, appDocument: App.Class): Promise<[Pointer.Class, Response.Class]>;
    private getAppsContainerURI();
}
export default Apps;
