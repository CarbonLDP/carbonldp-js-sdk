import { Parser } from "./Parser";
export declare class JSONParser implements Parser<object> {
    parse(body: string): Promise<object>;
}
