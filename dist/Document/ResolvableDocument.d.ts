import { CarbonLDP } from "../CarbonLDP";
import { DocumentsRegistry } from "../Registry";
import { PersistedResource } from "../Resource";
import { TransientDocument } from "./TransientDocument";
import { PickSelfProps } from "../Utils";
export interface ResolvableDocument extends TransientDocument, PersistedResource {
    _context: CarbonLDP | undefined;
    _registry: DocumentsRegistry | undefined;
    _resolved: boolean | undefined;
    _eTag: string | undefined;
    isResolved(): boolean;
    isOutdated(): boolean;
}
export interface ResolvableDocumentFactory {
    PROTOTYPE: PickSelfProps<ResolvableDocument, TransientDocument & PersistedResource>;
    isDecorated(object: object): object is ResolvableDocument;
    decorate<T extends object>(object: T): T & ResolvableDocument;
    is(value: any): value is ResolvableDocument;
}
export declare const ResolvableDocument: ResolvableDocumentFactory;
