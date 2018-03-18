import { Fragment } from "./Fragment";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
import { PersistedDocument } from "./PersistedDocument";
import { PersistedResource } from "./PersistedResource";
export interface PersistedFragment extends PersistedResource, Fragment {
    _document: PersistedDocument;
    addType(type: string): void;
    hasType(type: string): boolean;
    removeType(type: string): void;
}
export interface PersistedFragmentFactory extends ModelFactory<PersistedFragment>, ModelDecorator<PersistedFragment> {
    isDecorated(object: object): object is PersistedFragment;
    is(object: object): object is PersistedFragment;
    decorate<T extends object>(object: T): T & PersistedFragment;
    create(document: PersistedDocument, id?: string): PersistedFragment;
    createFrom<T extends object>(object: T, document: PersistedDocument, id?: string): T & PersistedFragment;
}
export declare const PersistedFragment: PersistedFragmentFactory;
export default PersistedFragment;
