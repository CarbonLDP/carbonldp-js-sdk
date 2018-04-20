import { TransientFragment } from "./TransientFragment";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import { Document } from "./Document";
import { Resource } from "./Resource";
export interface Fragment extends Resource, TransientFragment {
    _document: Document;
    addType(type: string): void;
    hasType(type: string): boolean;
    removeType(type: string): void;
}
export interface FragmentFactory extends ModelFactory<Fragment>, ModelDecorator<Fragment> {
    isDecorated(object: object): object is Fragment;
    is(object: object): object is Fragment;
    decorate<T extends object>(object: T): T & Fragment;
    create(document: Document, id?: string): Fragment;
    createFrom<T extends object>(object: T, document: Document, id?: string): T & Fragment;
}
export declare const Fragment: FragmentFactory;
