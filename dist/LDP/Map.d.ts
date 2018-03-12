import { ModelFactory } from "../ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { Resource } from "../Resource";
import { MapEntry } from "./MapEntry";
export interface Map<K, V> extends Resource {
    entries: MapEntry<K, V>[];
}
export interface MapFactory extends ModelFactory<Map<any, any>> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    is(object: object): object is Map<any, any>;
}
export declare const Map: MapFactory;
export default Map;
