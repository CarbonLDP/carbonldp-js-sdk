import { ModelDecorator } from "./ModelDecorator";
import { TransientNamedFragment } from "./TransientNamedFragment";
import { Document } from "./Document";
import { Fragment } from "./Fragment";
export interface NamedFragment extends Fragment, TransientNamedFragment {
    _document: Document;
}
export interface NamedFragmentFactory extends ModelDecorator<NamedFragment> {
    isDecorated(object: object): object is NamedFragment;
    decorate<T extends object>(object: T): T & NamedFragment;
}
export declare const NamedFragment: NamedFragmentFactory;
