import { Parser } from "./Parser";
export declare class StringParser implements Parser<string> {
    parse(body: string): Promise<string>;
}
