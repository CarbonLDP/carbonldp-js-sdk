import { ModelDecorator } from "./ModelDecorator";
import { TransientResource } from "./TransientResource";
import { PartialMetadata } from "./SPARQL/QueryDocument/PartialMetadata";
export interface Resource extends TransientResource {
    _snapshot: TransientResource;
    _partialMetadata?: PartialMetadata;
    _syncSnapshot(): void;
    isDirty(): boolean;
    revert(): void;
    isPartial(): boolean;
}
export interface ResourceFactory extends ModelDecorator<Resource> {
    isDecorated(object: object): object is Resource;
    decorate<T extends object>(object: T): T & Resource;
}
export declare const Resource: ResourceFactory;
