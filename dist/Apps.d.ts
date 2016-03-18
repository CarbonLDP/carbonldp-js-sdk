import AppContext from "./AppContext";
import Context from "./Context";
import * as Response from "./HTTP/Response";
import * as Pointer from "./Pointer";
import * as App from "./App";
declare class Apps {
    private context;
    constructor(context: Context);
    get(uri: string): Promise<AppContext>;
    getAll(): Promise<AppContext[]>;
    create(appDocument: App.Class): Promise<[Pointer.Class, Response.Class]>;
    create(slug: string, appDocument: App.Class): Promise<[Pointer.Class, Response.Class]>;
    private getAppsContainerURI();
}
export default Apps;
