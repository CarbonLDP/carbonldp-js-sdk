import { TransientDocument } from "./TransientDocument";
import { Fragment } from "./Fragment";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
export interface NamedFragment extends Fragment {
    slug: string;
}
export interface NamedFragmentFactory extends ModelFactory<NamedFragment>, ModelDecorator<NamedFragment> {
    isDecorated(object: object): object is NamedFragment;
    is(object: object): object is NamedFragment;
    create(document: TransientDocument, slug: string): NamedFragment;
    createFrom<T extends object>(object: T, document: TransientDocument, slug: string): T & NamedFragment;
    decorate<T extends object>(object: T): T & NamedFragment;
}
export declare const NamedFragment: NamedFragmentFactory;
