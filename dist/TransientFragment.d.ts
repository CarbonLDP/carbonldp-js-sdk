import { TransientDocument } from "./TransientDocument";
import { ModelDecorator } from "./core/ModelDecorator";
import { ModelFactory } from "./core/ModelFactory";
import { TransientResource } from "./Resource";
export interface TransientFragment extends TransientResource {
    _document: TransientDocument;
}
export interface TransientFragmentFactory extends ModelFactory<TransientFragment>, ModelDecorator<TransientFragment> {
    isDecorated(object: object): object is TransientFragment;
    is(object: object): object is TransientFragment;
    create(document: TransientDocument, id?: string): TransientFragment;
    createFrom<T extends object>(object: T, document: TransientDocument, id?: string): T & TransientFragment;
    decorate<T extends object>(object: T): T & TransientFragment;
}
export declare const TransientFragment: TransientFragmentFactory;
