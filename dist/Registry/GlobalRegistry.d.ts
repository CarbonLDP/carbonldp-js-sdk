import { GlobalContext } from "../Context/GlobalContext";
import { GeneralRegistry } from "../GeneralRegistry/GeneralRegistry";
import { ModelFactory } from "../Model/ModelFactory";
import { RegisteredPointer } from "./RegisteredPointer";
export interface BaseGlobalRegistry {
    context: GlobalContext;
}
export interface GlobalRegistry extends GeneralRegistry<RegisteredPointer> {
    context: GlobalContext;
    registry: undefined;
}
export declare type GlobalRegistryFactory = ModelFactory<GlobalRegistry, BaseGlobalRegistry>;
export declare const GlobalRegistry: GlobalRegistryFactory;
