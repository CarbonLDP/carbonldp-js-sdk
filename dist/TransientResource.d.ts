import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import { Pointer } from "./Pointer";
export interface TransientResource extends Pointer {
    types: string[];
    addType(type: string): void;
    hasType(type: string): boolean;
    removeType(type: string): void;
}
export interface TransientResourceFactory extends ModelFactory<TransientResource>, ModelDecorator<TransientResource> {
    isDecorated(object: object): object is TransientResource;
    is(object: object): object is TransientResource;
    create(id?: string, types?: string[]): TransientResource;
    createFrom<T extends object>(object: T, id?: string, types?: string[]): T & TransientResource;
    decorate<T extends object>(object: T): T & TransientResource;
}
export declare function addTypeInResource(this: TransientResource, type: string): void;
export declare function hasTypeInResource(this: TransientResource, type: string): boolean;
export declare function removeTypeInResource(this: TransientResource, type: string): void;
export declare const TransientResource: TransientResourceFactory;
