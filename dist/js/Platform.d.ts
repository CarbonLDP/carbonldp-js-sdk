import AbstractContext from "./AbstractContext";
import Context from "./Context";
export declare class Class extends AbstractContext {
    constructor(parentContext: Context);
    resolve(uri: string): string;
}
export default Class;
