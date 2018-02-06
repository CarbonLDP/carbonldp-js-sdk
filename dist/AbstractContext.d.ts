import * as SDKContext from "./SDKContext";
import Context from "./Context";
export declare abstract class Class extends SDKContext.Class {
    protected abstract _baseURI: string;
    readonly baseURI: string;
    protected _parentContext: Context;
    readonly parentContext: Context;
    constructor(parentContext?: Context);
}
export default Class;
