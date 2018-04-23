import { TransientResource } from "../Resource";
import { TransientDocument } from "../Document";
import { BaseFragment } from "./BaseFragment";
export interface TransientFragment extends TransientResource {
    _document: TransientDocument;
}
export interface TransientFragmentFactory {
    isDecorated(object: object): object is TransientFragment;
    is(value: any): value is TransientFragment;
    create<T extends BaseFragment>(data: T): T & TransientFragment;
    createFrom<T extends BaseFragment>(object: T): T & TransientFragment;
    decorate<T extends object>(object: T): T & TransientFragment;
}
export declare const TransientFragment: TransientFragmentFactory;
