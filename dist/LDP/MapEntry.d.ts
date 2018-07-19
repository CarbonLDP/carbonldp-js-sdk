import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { Resource } from "../Resource/Resource";
export interface MapEntry<K, V> extends Resource {
    entryKey: K;
    entryValue: V;
}
export interface MapEntryFactory {
    SCHEMA: ObjectSchema;
}
export declare const MapEntry: MapEntryFactory;
