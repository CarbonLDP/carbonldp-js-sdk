import * as App from "./App";
import AppContext from "./App/Context";
import Context from "./Context";
import { Options } from "./HTTP/Request";
import * as Pointer from "./Pointer";
import * as Response from "./HTTP/Response";
export declare class Class {
    private context;
    constructor(context: Context);
    getContext(uri: string): Promise<AppContext>;
    getContext(pointer: Pointer.Class): Promise<AppContext>;
    getAllContexts(): Promise<AppContext[]>;
    create(appDocument: App.Class): Promise<[Pointer.Class, Response.Class]>;
    create(slug: string, appDocument: App.Class): Promise<[Pointer.Class, Response.Class]>;
    delete(appURI: string, requestOptions?: Options): Promise<Response.Class>;
    private resolveURI(appURI);
    private getContainerURI();
}
export default Class;
