import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
import { CarbonMapEntry } from "./CarbonMapEntry";
export interface CarbonMap<K, V> extends Resource {
    entries: CarbonMapEntry<K, V>[];
}
export interface CarbonMapFactory extends ModelFactory<CarbonMap<any, any>> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    is(object: object): object is CarbonMap<any, any>;
}
export declare const CarbonMap: CarbonMapFactory;
