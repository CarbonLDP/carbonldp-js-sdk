import { JSONParser } from "../HTTP/JSONParser";
import { Parser } from "../HTTP/Parser";
export declare class JSONLDParser extends JSONParser implements Parser<object[]> {
    parse(input: string): Promise<object[]>;
}
export default JSONLDParser;
