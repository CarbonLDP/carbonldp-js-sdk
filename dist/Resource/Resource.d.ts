import { Context } from "../Context/Context";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactoryOptional } from "../Model/ModelFactoryOptional";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";
import { RDFNode } from "../RDF/Node";
import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { Registry } from "../Registry/Registry";
import { BaseResource } from "./BaseResource";
export interface Resource extends RegisteredPointer {
    types: string[];
    $registry: Registry<RegisteredPointer> | undefined;
    $slug: string;
    addType(type: string): void;
    hasType(type: string): boolean;
    removeType(type: string): void;
    toJSON(contextOrKey: Context | string): RDFNode;
}
export declare type ResourceFactory = ModelPrototype<Resource, RegisteredPointer> & ModelDecorator<Resource, BaseResource> & ModelFactoryOptional<Resource> & ModelTypeGuard<Resource>;
export declare const Resource: ResourceFactory;
