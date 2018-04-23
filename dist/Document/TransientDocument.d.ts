import { ModelDecorator } from "../core/ModelDecorator";
import { ModelFactory } from "../core/ModelFactory";
import { TransientFragment } from "../Fragment";
import { JSONLDConverter } from "../JSONLD";
import { TransientNamedFragment } from "../NamedFragment";
import { ObjectSchemaResolver } from "../ObjectSchema";
import { Pointer, PointerLibrary, PointerValidator } from "../Pointer";
import { RDFDocument } from "../RDF";
import { TransientResource } from "../Resource";
import { C } from "../Vocabularies";
import { BaseDocument } from "./BaseDocument";
export interface TransientDocument extends TransientResource, PointerLibrary, PointerValidator {
    defaultInteractionModel?: Pointer;
    isMemberOfRelation?: Pointer;
    hasMemberRelation?: Pointer;
    _fragmentsIndex: Map<string, TransientFragment>;
    _normalize(): void;
    _removeFragment(slugOrFragment: string | TransientFragment): void;
    hasFragment(slug: string): boolean;
    getFragment<T>(slug: string): T & TransientFragment;
    getNamedFragment<T>(slug: string): T & TransientNamedFragment;
    getFragments(): TransientFragment[];
    createFragment<T>(object: T, slug?: string): T & TransientFragment;
    createFragment(slug?: string): TransientFragment;
    createNamedFragment<T>(object: T, slug: string): T & TransientNamedFragment;
    createNamedFragment(slug: string): TransientNamedFragment;
    removeNamedFragment(slugOrFragment: string | TransientNamedFragment): void;
    toJSON(objectSchemaResolver?: ObjectSchemaResolver, jsonldConverter?: JSONLDConverter): RDFDocument;
}
export interface TransientDocumentFactory extends ModelFactory<TransientDocument>, ModelDecorator<TransientDocument> {
    TYPE: C["Document"];
    is(value: any): value is TransientDocument;
    isDecorated(object: object): object is TransientDocument;
    create<T extends BaseDocument>(data?: T): T & TransientDocument;
    createFrom<T extends BaseDocument>(object: T): T & TransientDocument;
    decorate<T extends object>(object: T): T & TransientDocument;
    _convertNestedObjects(parent: TransientDocument, actual: any, fragmentsTracker?: Set<string>): void;
}
export declare const TransientDocument: TransientDocumentFactory;
