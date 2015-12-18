/// <reference path="../typings/tsd.d.ts" />
import * as App from "./App";
import Context from "./Context";
export declare class Apps {
    private context;
    constructor(context: Context);
    get(uri: string): Promise<App.Context>;
    private getAppsContainerURI();
}
export default Apps;
