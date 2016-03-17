import AbstractContext from "./AbstractContext";
import Context from "./Context";
import PersistedApp from "./PersistedApp";
declare class AppContext extends AbstractContext {
    private app;
    private base;
    constructor(parentContext: Context, app: PersistedApp);
    resolve(uri: string): string;
    private getBase(resource);
}
export default AppContext;
