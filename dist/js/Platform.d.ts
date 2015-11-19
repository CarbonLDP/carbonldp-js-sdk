import Context from "./Context";
export declare class Class extends Context {
    parentContext: Context;
    constructor(parentContext: Context);
    resolve(uri: string): string;
}
export default Class;
