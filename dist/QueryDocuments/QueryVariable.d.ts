import { VariableToken } from "sparqler/tokens";
export declare class QueryVariable extends VariableToken {
    readonly name: string;
    private readonly index;
    constructor(name: string, index: number);
    toString(): string;
}
