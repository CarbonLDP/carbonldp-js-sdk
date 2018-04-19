import { Fragment } from "./Fragment";
import { JSONLDConverter } from "./JSONLD/Converter";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import { NamedFragment } from "./NamedFragment";
import { ObjectSchema, ObjectSchemaResolver } from "./ObjectSchema";
import { Pointer, PointerLibrary, PointerValidator } from "./Pointer";
import { RDFDocument } from "./RDF/Document";
import { Resource } from "./Resource";
export interface TransientDocument extends Resource, PointerLibrary, PointerValidator {
    defaultInteractionModel?: Pointer;
    isMemberOfRelation?: Pointer;
    hasMemberRelation?: Pointer;
    _fragmentsIndex: Map<string, Fragment>;
    _normalize(): void;
    _removeFragment(slugOrFragment: string | Fragment): void;
    hasFragment(slug: string): boolean;
    getFragment<T>(slug: string): T & Fragment;
    getNamedFragment<T>(slug: string): T & NamedFragment;
    getFragments(): Fragment[];
    createFragment<T>(object: T, slug?: string): T & Fragment;
    createFragment(slug?: string): Fragment;
    createNamedFragment<T>(object: T, slug: string): T & NamedFragment;
    createNamedFragment(slug: string): NamedFragment;
    removeNamedFragment(slugOrFragment: string | NamedFragment): void;
    toJSON(objectSchemaResolver?: ObjectSchemaResolver, jsonldConverter?: JSONLDConverter): RDFDocument;
}
export interface DocumentFactory extends ModelFactory<TransientDocument>, ModelDecorator<TransientDocument> {
    TYPE: string;
    SCHEMA: ObjectSchema;
    is(object: object): object is TransientDocument;
    isDecorated(object: object): object is TransientDocument;
    create(): TransientDocument;
    createFrom<T extends object>(object: T): T & TransientDocument;
    decorate<T extends object>(object: T): T & TransientDocument;
    _convertNestedObjects(parent: TransientDocument, actual: any, fragmentsTracker?: Set<string>): void;
}
export declare const TransientDocument: DocumentFactory;
