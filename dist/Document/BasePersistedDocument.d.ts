import { BlankNode } from "../BlankNode";
import { CarbonLDP } from "../CarbonLDP";
import { NamedFragment } from "../NamedFragment";
import { DocumentsRegistry } from "../Registry";
import { PersistedResource } from "../Resource";
import { PickSelfProps } from "../Utils";
import { TransientDocument } from "./TransientDocument";
export interface BasePersistedDocument extends TransientDocument, PersistedResource {
    _context: CarbonLDP | undefined;
    _registry: DocumentsRegistry | undefined;
    _resolved: boolean | undefined;
    _eTag: string | undefined | null;
    _savedFragments: (BlankNode | NamedFragment)[];
    isResolved(): boolean;
    isOutdated(): boolean;
    _syncSavedFragments(): void;
}
export interface BasePersistedDocumentFactory {
    PROTOTYPE: PickSelfProps<BasePersistedDocument, TransientDocument & PersistedResource>;
    isDecorated(object: object): object is BasePersistedDocument;
    decorate<T extends object>(object: T): T & BasePersistedDocument;
    is(value: any): value is BasePersistedDocument;
}
export declare const BasePersistedDocument: BasePersistedDocumentFactory;
