import { ModelSchema } from "../Model/ModelSchema";
import { ObjectSchema } from "../ObjectSchema/ObjectSchema";
import { Resource } from "../Resource/Resource";
import { C } from "../Vocabularies/C";
import { MapEntry } from "./MapEntry";
export interface Map<K, V> extends Resource {
    entries: MapEntry<K, V>[];
}
export interface MapFactory extends ModelSchema {
    TYPE: C["Map"];
    SCHEMA: ObjectSchema;
    is(object: object): object is Map<any, any>;
}
export declare const Map: MapFactory;
