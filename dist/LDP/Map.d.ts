import { ModelSchema } from "../core/ModelSchema";
import { ObjectSchema } from "../ObjectSchema";
import { TransientResource } from "../Resource";
import { C } from "../Vocabularies/C";
import { MapEntry } from "./MapEntry";
export interface Map<K, V> extends TransientResource {
    entries: MapEntry<K, V>[];
}
export interface MapFactory extends ModelSchema {
    TYPE: C["Map"];
    SCHEMA: ObjectSchema;
    is(object: object): object is Map<any, any>;
}
export declare const Map: MapFactory;
