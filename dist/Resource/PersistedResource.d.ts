import { PartialMetadata } from "../SPARQL/QueryDocument";
import { PickSelfProps } from "../Utils";
import { TransientResource } from "./TransientResource";
export interface PersistedResource extends TransientResource {
    _snapshot: object | undefined;
    _partialMetadata: PartialMetadata | undefined;
    _syncSnapshot(): void;
    isDirty(): boolean;
    revert(): void;
    isPartial(): boolean;
}
export interface PersistedResourceFactory {
    PROTOTYPE: PickSelfProps<PersistedResource, TransientResource>;
    isDecorated(object: object): object is PersistedResource;
    is(value: any): value is PersistedResource;
    decorate<T extends object>(object: T): T & PersistedResource;
}
export declare const PersistedResource: PersistedResourceFactory;
