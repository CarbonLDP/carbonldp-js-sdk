import { PartialMetadata } from "../SPARQL/QueryDocument";
import { TransientResource, TransientResourceFactory } from "./TransientResource";
export interface Resource extends TransientResource {
    _snapshot: TransientResource;
    _partialMetadata?: PartialMetadata;
    _syncSnapshot(): void;
    isDirty(): boolean;
    revert(): void;
    isPartial(): boolean;
}
export interface ResourceFactory extends TransientResourceFactory {
    isDecorated(object: object): object is Resource;
    decorate<T extends object>(object: T): T & Resource;
    is(value: any): value is Resource;
}
export declare const Resource: ResourceFactory;
