import { Fragment } from "../Fragment";
import * as JSONLDConverter from "../JSONLD/Converter";
import { ModelDecorator } from "../ModelDecorator";
import { ModelFactory } from "../ModelFactory";
import * as NamedFragment from "../NamedFragment";
import * as ObjectSchema from "../ObjectSchema";
import { Pointer, PointerLibrary, PointerValidator } from "../Pointer";
import * as RDFDocument from "../RDF/Document";
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
    getNamedFragment<T>(slug: string): T & NamedFragment.Class;
    getFragments(): Fragment[];
    createFragment<T>(object: T, slug?: string): T & Fragment;
    createFragment(slug?: string): Fragment;
    createNamedFragment<T>(object: T, slug: string): T & NamedFragment.Class;
    createNamedFragment(slug: string): NamedFragment.Class;
    removeNamedFragment(slugOrFragment: string | NamedFragment.Class): void;
    toJSON(objectSchemaResolver?: ObjectSchema.Resolver, jsonldConverter?: JSONLDConverter.Class): RDFDocument.Class;
}
export interface DocumentFactory extends ModelFactory<Document>, ModelDecorator<Document> {
    TYPE: string;
    SCHEMA: ObjectSchema.Class;
    is(object: object): object is Document;
    isDecorated(object: object): object is Document;
    create(): Document;
    createFrom<T extends object>(object: T): T & Document;
    decorate<T extends object>(object: T): T & Document;
}
export declare const Document: DocumentFactory;
export default Document;
