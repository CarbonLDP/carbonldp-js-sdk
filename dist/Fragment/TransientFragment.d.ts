import { TransientDocument } from "../Document/TransientDocument";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";
import { Resource } from "../Resource/Resource";
import { BaseTransientFragment } from "./BaseTransientFragment";
export interface TransientFragment extends Resource {
    $document: TransientDocument;
    $registry: TransientDocument;
}
export declare type OverriddenMembers = "$registry" | "$id" | "$slug";
export declare type TransientFragmentFactory = ModelPrototype<TransientFragment & BaseTransientFragment, Resource, OverriddenMembers> & ModelDecorator<TransientFragment, BaseTransientFragment> & ModelFactory<TransientFragment, BaseTransientFragment> & ModelTypeGuard<TransientFragment>;
export declare const TransientFragment: TransientFragmentFactory;
