import { ModelDecorator } from "./ModelDecorator";
import { Resource } from "./Resource";
import { PartialMetadata } from "./SPARQL/QueryDocument/PartialMetadata";
export interface PersistedResource extends Resource {
    _snapshot: Resource;
    _partialMetadata?: PartialMetadata;
    _syncSnapshot(): void;
    isDirty(): boolean;
    revert(): void;
    isPartial(): boolean;
}
export interface PersistedResourceFactory extends ModelDecorator<PersistedResource> {
    isDecorated(object: object): object is PersistedResource;
    decorate<T extends object>(object: T): T & PersistedResource;
}
export declare const PersistedResource: PersistedResourceFactory;
