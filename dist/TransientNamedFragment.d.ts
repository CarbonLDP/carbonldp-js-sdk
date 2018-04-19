import { TransientDocument } from "./TransientDocument";
import { TransientFragment } from "./TransientFragment";
import { ModelDecorator } from "./ModelDecorator";
import { ModelFactory } from "./ModelFactory";
export interface TransientNamedFragment extends TransientFragment {
    slug: string;
}
export interface TransientNamedFragmentFactory extends ModelFactory<TransientNamedFragment>, ModelDecorator<TransientNamedFragment> {
    isDecorated(object: object): object is TransientNamedFragment;
    is(object: object): object is TransientNamedFragment;
    create(document: TransientDocument, slug: string): TransientNamedFragment;
    createFrom<T extends object>(object: T, document: TransientDocument, slug: string): T & TransientNamedFragment;
    decorate<T extends object>(object: T): T & TransientNamedFragment;
}
export declare const TransientNamedFragment: TransientNamedFragmentFactory;
