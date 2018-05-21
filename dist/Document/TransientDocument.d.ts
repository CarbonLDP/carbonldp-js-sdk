import { TransientBlankNode } from "../BlankNode";
import { CarbonLDP } from "../CarbonLDP";
import { ModelDecorator, ModelFactory } from "../core";
import { TransientFragment } from "../Fragment";
import { TransientNamedFragment } from "../NamedFragment";
import { Pointer } from "../Pointer";
import { RDFDocument } from "../RDF";
import { DocumentsRegistry, Registry } from "../Registry";
import { TransientResource } from "../Resource";
import { PickSelfProps } from "../Utils";
import { C } from "../Vocabularies";
import { BaseDocument } from "./BaseDocument";
export interface TransientDocument extends TransientResource, Registry<TransientBlankNode | TransientNamedFragment> {
    _context: CarbonLDP | undefined;
    _registry: DocumentsRegistry | undefined;
    defaultInteractionModel?: Pointer;
    isMemberOfRelation?: Pointer;
    hasMemberRelation?: Pointer;
    hasFragment(slug: string): boolean;
    getFragment<T extends object>(slug: string): (T & TransientFragment) | null;
    getNamedFragment<T extends object>(slug: string): (T & TransientNamedFragment) | null;
    getFragments(): TransientFragment[];
    createFragment<T extends object>(object: T, slug?: string): T & TransientFragment;
    createFragment(slug?: string): TransientFragment;
    createNamedFragment<T extends object>(object: T, slug: string): T & TransientNamedFragment;
    createNamedFragment(slug: string): TransientNamedFragment;
    removeNamedFragment(slugOrFragment: string | TransientNamedFragment): boolean;
    _removeFragment(slugOrFragment: string | TransientFragment): boolean;
    _normalize(): void;
    _getLocalID(id: string): string;
    _register<T extends object>(base: T & {
        id?: string;
    }): T & TransientFragment;
    toJSON(registry?: DocumentsRegistry): RDFDocument;
}
export interface TransientDocumentFactory extends ModelFactory<TransientDocument>, ModelDecorator<TransientDocument> {
    PROTOTYPE: PickSelfProps<TransientDocument, TransientResource & Registry<TransientBlankNode | TransientNamedFragment>, "_context" | "_registry" | "_getLocalID" | "_register">;
    TYPE: C["Document"];
    is(value: any): value is TransientDocument;
    isDecorated(object: object): object is TransientDocument;
    create<T extends object>(data?: T & BaseDocument): T & TransientDocument;
    createFrom<T extends object>(object: T & BaseDocument): T & TransientDocument;
    decorate<T extends object>(object: T): T & TransientDocument;
    _convertNestedObjects<T extends object>(resource: TransientDocument, target: T): T;
}
export declare const TransientDocument: TransientDocumentFactory;
