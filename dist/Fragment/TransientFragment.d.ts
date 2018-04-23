import { TransientDocument } from "../Document";
import { TransientResource } from "../Resource";
import { BaseFragment } from "./BaseFragment";
export interface TransientFragment extends TransientResource {
    _document: TransientDocument;
}
export interface TransientFragmentFactory {
    isDecorated(object: object): object is TransientFragment;
    is(value: any): value is TransientFragment;
    create<T extends object>(data: T & BaseFragment): T & TransientFragment;
    createFrom<T extends object>(object: T & BaseFragment): T & TransientFragment;
    decorate<T extends object>(object: T): T & TransientFragment;
}
export declare const TransientFragment: TransientFragmentFactory;
