import Context from "./Context";
import * as SDKContext from "./SDKContext";
declare abstract class AbstractContext extends SDKContext.Class {
    _parentContext: Context;
    parentContext: Context;
    constructor(parentContext?: Context);
    abstract resolve(relativeURI: string): string;
}
export default AbstractContext;
