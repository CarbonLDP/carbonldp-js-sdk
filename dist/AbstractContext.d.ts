import Context from "./Context";
import * as SDKContext from "./SDKContext";
export declare abstract class Class extends SDKContext.Class {
    _parentContext: Context;
    parentContext: Context;
    constructor(parentContext?: Context);
    abstract resolve(relativeURI: string): string;
}
export default Class;
