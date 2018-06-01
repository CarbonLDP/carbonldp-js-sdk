import { TransientBlankNode } from "../BlankNode";
import { ObjectSchema } from "../ObjectSchema";
export interface MapEntry<K, V> extends TransientBlankNode {
    entryKey: K;
    entryValue: V;
}
export interface MapEntryFactory {
    SCHEMA: ObjectSchema;
}
export declare const MapEntry: MapEntryFactory;
