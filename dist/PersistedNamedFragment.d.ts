import { ModelDecorator } from "./ModelDecorator";
import { TransientNamedFragment } from "./TransientNamedFragment";
import { Document } from "./Document";
import { Fragment } from "./Fragment";
export interface PersistedNamedFragment extends Fragment, TransientNamedFragment {
    _document: Document;
}
export interface PersistedNamedFragmentFactory extends ModelDecorator<PersistedNamedFragment> {
    isDecorated(object: object): object is PersistedNamedFragment;
    decorate<T extends object>(object: T): T & PersistedNamedFragment;
}
export declare const PersistedNamedFragment: PersistedNamedFragmentFactory;
