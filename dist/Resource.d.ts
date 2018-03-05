import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import { Pointer } from "./Pointer";
export interface Resource extends Pointer {
    types: string[];
    addType(type: string): void;
    hasType(type: string): boolean;
    removeType(type: string): void;
}
export interface ResourceConstant extends ModelFactory<Resource>, ModelDecorator<Resource> {
    isDecorated(object: object): object is Resource;
    is(object: object): object is Resource;
    create(id?: string, types?: string[]): Resource;
    createFrom<T extends object>(object: T, id?: string, types?: string[]): T & Resource;
    decorate<T extends object>(object: T): T & Resource;
}
export declare function addTypeInResource(this: Resource, type: string): void;
export declare function hasTypeInResource(this: Resource, type: string): boolean;
export declare function removeTypeInResource(this: Resource, type: string): void;
export declare const Resource: ResourceConstant;
export default Resource;
