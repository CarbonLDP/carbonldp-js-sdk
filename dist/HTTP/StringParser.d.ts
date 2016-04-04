import Parser from "./Parser";
export declare class Class implements Parser<string> {
    parse(body: string): Promise<string>;
}
export default Class;
