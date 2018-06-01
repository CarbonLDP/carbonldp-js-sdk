import { Document } from "../Document";
import { Resource } from "../Resource";
import { TransientFragment, TransientFragmentFactory } from "./TransientFragment";
export interface Fragment extends Resource, TransientFragment {
    _document: Document;
    addType(type: string): void;
    hasType(type: string): boolean;
    removeType(type: string): void;
}
export interface FragmentFactory extends TransientFragmentFactory {
    isDecorated(object: object): object is Fragment;
    is(value: any): value is Fragment;
    decorate<T extends object>(object: T): T & Fragment;
}
export declare const Fragment: FragmentFactory;
