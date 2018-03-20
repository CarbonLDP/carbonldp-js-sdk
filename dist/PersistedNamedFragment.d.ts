import { ModelDecorator } from "./ModelDecorator";
import { NamedFragment } from "./NamedFragment";
import { PersistedDocument } from "./PersistedDocument";
import { PersistedFragment } from "./PersistedFragment";
export interface PersistedNamedFragment extends PersistedFragment, NamedFragment {
    _document: PersistedDocument;
}
export interface PersistedNamedFragmentFactory extends ModelDecorator<PersistedNamedFragment> {
    isDecorated(object: object): object is PersistedNamedFragment;
    decorate<T extends object>(object: T): T & PersistedNamedFragment;
}
export declare const PersistedNamedFragment: PersistedNamedFragmentFactory;
