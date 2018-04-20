import { ModelDecorator } from "./ModelDecorator";
import { TransientResource } from "./TransientResource";
import { PartialMetadata } from "./SPARQL/QueryDocument/PartialMetadata";
export interface PersistedResource extends TransientResource {
    _snapshot: TransientResource;
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
