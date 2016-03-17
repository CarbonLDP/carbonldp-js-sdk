import AppContext from "./AppContext";
import Context from "./Context";
declare class Apps {
    private context;
    constructor(context: Context);
    get(uri: string): Promise<AppContext>;
    getAll(): Promise<AppContext[]>;
    private getAppsContainerURI();
}
export default Apps;
