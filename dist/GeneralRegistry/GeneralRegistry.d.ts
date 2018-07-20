import { Context } from "../Context/Context";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ObjectSchemaResolver } from "../ObjectSchema/ObjectSchemaResolver";
import { Pointer } from "../Pointer/Pointer";
import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { Registry } from "../Registry/Registry";
import { BaseGeneralRegistry } from "./BaseGeneralRegistry";
import { TypedModelDecorator } from "./TypedModelDecorator";
export interface GeneralRegistry<M extends RegisteredPointer = RegisteredPointer> extends Registry<M>, ObjectSchemaResolver {
    readonly context: Context<M>;
    readonly registry: GeneralRegistry | undefined;
    __modelDecorators: Map<string, TypedModelDecorator>;
    addDecorator(decorator: TypedModelDecorator): this;
    decorate(object: {
        types?: string[];
    }): void;
    _addPointer<T extends object>(pointer: T & Pointer): T & M;
    _getLocalID(id: string): string;
}
export declare type OverloadedFns = "context" | "registry" | "_addPointer" | "_getLocalID";
export declare type GeneralRegistryFactory = ModelPrototype<GeneralRegistry, Registry & ObjectSchemaResolver, OverloadedFns> & ModelDecorator<GeneralRegistry<any>, BaseGeneralRegistry> & ModelFactory<GeneralRegistry<any>, BaseGeneralRegistry>;
export declare const GeneralRegistry: GeneralRegistryFactory;
