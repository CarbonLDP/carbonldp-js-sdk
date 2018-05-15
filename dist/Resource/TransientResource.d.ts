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
    create<T extends object>(data?: T & BaseResource): T & TransientResource;
    createFrom<T extends object>(object: T & BaseResource): T & TransientResource;
    decorate<T extends object>(object: T): T & TransientResource;
}
export declare const TransientResource: TransientResourceFactory;
