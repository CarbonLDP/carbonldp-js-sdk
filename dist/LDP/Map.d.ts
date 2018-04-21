import { ModelFactory } from "../core/ModelFactory";
import { ObjectSchema } from "../ObjectSchema";
import { TransientResource } from "../Resource";
import { MapEntry } from "./MapEntry";
export interface Map<K, V> extends TransientResource {
    entries: MapEntry<K, V>[];
}
export interface MapFactory extends ModelFactory<Map<any, any>> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    is(object: object): object is Map<any, any>;
}
export declare const Map: MapFactory;
