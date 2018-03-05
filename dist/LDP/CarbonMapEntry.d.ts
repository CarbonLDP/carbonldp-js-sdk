import { BlankNode } from "../BlankNode";
import { ObjectSchema } from "../ObjectSchema";
export interface CarbonMapEntry<K, V> extends BlankNode {
    entryKey: K;
    entryValue: V;
}
export interface CarbonMapEntryConstant {
    SCHEMA: ObjectSchema;
}
export declare const CarbonMapEntry: CarbonMapEntryConstant;
export default CarbonMapEntry;
