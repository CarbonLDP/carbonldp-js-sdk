import { Parser } from "../HTTP/Parser";
import RawResults from "./RawResults";
export declare class Class implements Parser<RawResults> {
    parse(input: string): Promise<any>;
}
export default Class;
