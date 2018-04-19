import { ModelDecorator } from "./ModelDecorator";
import { NamedFragment } from "./NamedFragment";
import { Document } from "./Document";
import { PersistedFragment } from "./PersistedFragment";
export interface PersistedNamedFragment extends PersistedFragment, NamedFragment {
    _document: Document;
}
export interface PersistedNamedFragmentFactory extends ModelDecorator<PersistedNamedFragment> {
    isDecorated(object: object): object is PersistedNamedFragment;
    decorate<T extends object>(object: T): T & PersistedNamedFragment;
}
export declare const PersistedNamedFragment: PersistedNamedFragmentFactory;
