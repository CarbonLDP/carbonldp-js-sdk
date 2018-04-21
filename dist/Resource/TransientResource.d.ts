import { Pointer } from "../Pointer";
import { BaseResource } from "./BaseResource";
export interface TransientResource extends Pointer {
    types: string[];
    addType(type: string): void;
    hasType(type: string): boolean;
    removeType(type: string): void;
}
export interface TransientResourceFactory {
    isDecorated(object: object): object is TransientResource;
    is(value: any): value is TransientResource;
    create<T extends BaseResource>(data?: T): T & TransientResource;
    createFrom<T extends BaseResource>(object: T): T & TransientResource;
    decorate<T extends object>(object: T): T & TransientResource;
}
export declare function addTypeInResource(this: TransientResource, type: string): void;
export declare function hasTypeInResource(this: TransientResource, type: string): boolean;
export declare function removeTypeInResource(this: TransientResource, type: string): void;
export declare const TransientResource: TransientResourceFactory;
