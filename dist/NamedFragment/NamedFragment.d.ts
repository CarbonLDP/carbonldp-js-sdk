import { Document } from "../Document";
import { Fragment } from "../Fragment";
import { TransientNamedFragment, TransientNamedFragmentFactory } from "./TransientNamedFragment";
export interface NamedFragment extends Fragment, TransientNamedFragment {
    _document: Document;
}
export interface NamedFragmentFactory extends TransientNamedFragmentFactory {
    isDecorated(object: object): object is NamedFragment;
    decorate<T extends object>(object: T): T & NamedFragment;
}
export declare const NamedFragment: NamedFragmentFactory;
