import { Fragment } from "../Fragment";
import { JSONLDConverter } from "../JSONLD/Converter";
import { ModelDecorator } from "../ModelDecorator";
import { ModelFactory } from "../ModelFactory";
import { NamedFragment } from "../NamedFragment";
import * as ObjectSchema from "../ObjectSchema";
import { Pointer, PointerLibrary, PointerValidator } from "../Pointer";
import { RDFDocument } from "../RDF/Document";
import { Resource } from "../Resource";
export interface Document extends Resource, PointerLibrary, PointerValidator {
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
    toJSON(objectSchemaResolver?: ObjectSchema.ObjectSchemaResolver, jsonldConverter?: JSONLDConverter): RDFDocument;
}
export interface DocumentFactory extends ModelFactory<Document>, ModelDecorator<Document> {
    TYPE: string;
    SCHEMA: ObjectSchema.ObjectSchema;
    is(object: object): object is Document;
    isDecorated(object: object): object is Document;
    create(): Document;
    createFrom<T extends object>(object: T): T & Document;
    decorate<T extends object>(object: T): T & Document;
}
export declare const Document: DocumentFactory;
export default Document;
