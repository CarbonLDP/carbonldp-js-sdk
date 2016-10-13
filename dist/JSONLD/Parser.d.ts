import Parser from "./../HTTP/Parser";
export declare class Class implements Parser<Object[]> {
    parse(input: string): Promise<Object[]>;
}
export default Class;
