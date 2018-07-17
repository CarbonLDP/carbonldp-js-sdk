import { Context } from "../Context/Context";
import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";
import { Pointer } from "../Pointer/Pointer";
import { RDFNode } from "../RDF/Node";
import { Registry } from "../Registry/Registry";
import { Resource } from "../Resource/Resource";
import { BaseFreeResources } from "./BaseFreeResources";
export interface FreeResources extends Registry<Resource> {
    $registry: GeneralRegistry<any>;
    $_getLocalID(id: string): string;
    $_addPointer<T extends object>(base: T & Partial<Pointer>): T & Resource;
    toJSON(contextOrKey?: Context | string): RDFNode[];
}
export declare type OverriddenMembers = "$registry" | "$_getLocalID" | "$_addPointer";
export interface FreeResourcesUtils {
    parseFreeNodes(registry: GeneralRegistry<any>, freeNodes: RDFNode[]): FreeResources;
}
export declare type FreeResourcesFactory = ModelPrototype<FreeResources, Registry, OverriddenMembers> & ModelDecorator<FreeResources, BaseFreeResources> & ModelTypeGuard<FreeResources> & ModelFactory<FreeResources, BaseFreeResources> & FreeResourcesUtils;
export declare const FreeResources: FreeResourcesFactory;
