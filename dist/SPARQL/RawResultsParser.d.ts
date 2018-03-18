import { JSONParser } from "../HTTP/JSONParser";
import { Parser } from "../HTTP/Parser";
import { SPARQLRawResults } from "./RawResults";
export declare class SPARQLRawResultsParser extends JSONParser implements Parser<SPARQLRawResults> {
    parse(input: string): Promise<SPARQLRawResults>;
}
export default SPARQLRawResultsParser;
