import AbstractContext from "./../AbstractContext";
import Context from "./../Context";
import PersistedApp from "./../PersistedApp";
export declare class Class extends AbstractContext {
    app: PersistedApp;
    private _app;
    private base;
    constructor(parentContext: Context, app: PersistedApp);
    resolve(uri: string): string;
    private getBase(resource);
}
export default Class;
