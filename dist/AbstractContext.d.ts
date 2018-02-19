import Context from "./Context";
import * as SDKContext from "./SDKContext";
export declare abstract class AbstractContext extends SDKContext.Class {
    protected abstract _baseURI: string;
    readonly baseURI: string;
    protected _parentContext: Context;
    readonly parentContext: Context;
    constructor(parentContext?: Context);
}
export default AbstractContext;
