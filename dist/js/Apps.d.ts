/// <reference path="../typings/es6-promise/es6-promise.d.ts" />
import * as App from './App';
import Parent from './Parent';
export declare class Apps {
    private parent;
    constructor(parent: Parent);
    get(uri: string): Promise<App.Class>;
    private getAppsContainerURI();
}
export default Apps;
