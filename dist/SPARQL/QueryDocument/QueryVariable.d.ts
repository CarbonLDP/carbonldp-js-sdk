import { VariableToken } from "sparqler/tokens";
export declare class Class extends VariableToken {
    readonly name: string;
    private readonly index;
    constructor(name: string, index: number);
    toString(): string;
}
export default Class;
