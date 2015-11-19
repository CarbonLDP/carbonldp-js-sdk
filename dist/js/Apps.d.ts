/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
import * as App from "./App";
import Context from "./Context";
export declare class Apps {
    private context;
    constructor(context: Context);
    get(uri: string): Promise<App.Class>;
    private getAppsContainerURI();
}
export default Apps;
