import { CarbonLDP } from "../CarbonLDP";
import { DocumentsRegistry } from "../Registry";
import { PersistedResource } from "../Resource";
import { TransientDocument } from "./TransientDocument";
import { PickSelfProps } from "../Utils";
export interface PersistedDocument extends TransientDocument, PersistedResource {
    _context: CarbonLDP | undefined;
    _registry: DocumentsRegistry | undefined;
    _resolved: boolean | undefined;
    _eTag: string | undefined | null;
    isResolved(): boolean;
    isOutdated(): boolean;
}
export interface PersistedDocumentFactory {
    PROTOTYPE: PickSelfProps<PersistedDocument, TransientDocument & PersistedResource>;
    isDecorated(object: object): object is PersistedDocument;
    decorate<T extends object>(object: T): T & PersistedDocument;
    is(value: any): value is PersistedDocument;
}
export declare const PersistedDocument: PersistedDocumentFactory;
