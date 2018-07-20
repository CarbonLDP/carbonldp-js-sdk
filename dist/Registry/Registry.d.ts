import { BiModelDecorator } from "../Model/BiModelDecorator";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";
import { Pointer } from "../Pointer/Pointer";
import { $PointerLibrary, PointerLibrary } from "../Pointer/PointerLibrary";
import { $PointerValidator, PointerValidator } from "../Pointer/PointerValidator";
import { BaseRegisteredPointer } from "./BaseRegisteredPointer";
import { $BaseRegistry, BaseRegistry } from "./BaseRegistry";
import { RegisteredPointer } from "./RegisteredPointer";
export interface Registry<MODEL extends RegisteredPointer = RegisteredPointer> extends PointerLibrary, PointerValidator {
    readonly registry: Registry<any> | $Registry<any> | undefined;
    readonly __modelDecorator: ModelDecorator<MODEL, BaseRegisteredPointer>;
    readonly __resourcesMap: Map<string, MODEL>;
    inScope(idOrPointer: string | Pointer): boolean;
    inScope(idOrPointer: string | Pointer, local: true): boolean;
    hasPointer(id: string): boolean;
    hasPointer(id: string, local: true): boolean;
    getPointer(id: string): RegisteredPointer;
    getPointer(id: string, local: true): MODEL;
    getPointers(): RegisteredPointer[];
    getPointers(local: true): MODEL[];
    removePointer(idOrPointer: string | RegisteredPointer): boolean;
    removePointer(idOrPointer: string | RegisteredPointer, local: true): boolean;
    _addPointer<T extends object>(pointer: T & Pointer): T & MODEL;
    _getLocalID(id: string): string;
}
export interface $Registry<MODEL extends RegisteredPointer = RegisteredPointer> extends Pointer, $PointerLibrary, $PointerValidator {
    readonly $registry: Registry<any> | $Registry<any> | undefined;
    readonly $__modelDecorator: ModelDecorator<MODEL, BaseRegisteredPointer>;
    readonly $__resourcesMap: Map<string, MODEL>;
    $inScope(idOrPointer: string | Pointer): boolean;
    $inScope(idOrPointer: string | Pointer, local: true): boolean;
    $hasPointer(id: string): boolean;
    $hasPointer(id: string, local: true): boolean;
    $getPointer(id: string): RegisteredPointer;
    $getPointer(id: string, local: true): MODEL;
    $getPointers(): RegisteredPointer[];
    $getPointers(local: true): MODEL[];
    $removePointer(idOrPointer: string | RegisteredPointer): boolean;
    $removePointer(idOrPointer: string | RegisteredPointer, local: true): boolean;
    $_getLocalID(id: string): string;
    $_addPointer<T extends object>(pointer: T & Pointer): T & MODEL;
}
export declare function _getPointer<T extends RegisteredPointer>(registry: Registry<T> | $Registry<T>, id: string, local?: true): T;
export declare type RegistryFactory = ModelPrototype<Registry<any>> & BiModelDecorator<Registry<any>, $Registry<any>, BaseRegistry, $BaseRegistry>;
export declare const Registry: RegistryFactory;
