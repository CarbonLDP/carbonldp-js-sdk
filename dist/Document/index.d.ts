import * as Fragment from "../Fragment";
import * as JSONLDConverter from "../JSONLD/Converter";
import { ModelDecorator } from "../ModelDecorator";
import { ModelFactory } from "../ModelFactory";
import * as NamedFragment from "../NamedFragment";
import * as ObjectSchema from "../ObjectSchema";
import * as Pointer from "../Pointer";
import * as RDFDocument from "../RDF/Document";
import * as Resource from "../Resource";
export interface Document extends Resource.Class, Pointer.Library, Pointer.Validator {
    defaultInteractionModel?: Pointer.Class;
    isMemberOfRelation?: Pointer.Class;
    hasMemberRelation?: Pointer.Class;
    _fragmentsIndex: Map<string, Fragment.Class>;
    _normalize(): void;
    _removeFragment(slugOrFragment: string | Fragment.Class): void;
    hasFragment(slug: string): boolean;
    getFragment<T>(slug: string): T & Fragment.Class;
    getNamedFragment<T>(slug: string): T & NamedFragment.Class;
    getFragments(): Fragment.Class[];
    createFragment<T>(object: T, slug?: string): T & Fragment.Class;
    createFragment(slug?: string): Fragment.Class;
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
