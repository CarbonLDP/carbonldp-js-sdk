import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ModelTypeGuard } from "../Model/ModelTypeGuard";
import { Pointer } from "../Pointer/Pointer";
import { BaseRegisteredPointer } from "./BaseRegisteredPointer";
import { Registry } from "./Registry";
export interface RegisteredPointer extends Pointer {
    $registry: Registry<RegisteredPointer>;
}
export declare type RegisteredPointerFactory = ModelPrototype<RegisteredPointer, Pointer> & ModelDecorator<RegisteredPointer, BaseRegisteredPointer> & ModelFactory<RegisteredPointer, BaseRegisteredPointer> & ModelTypeGuard<RegisteredPointer>;
export declare const RegisteredPointer: RegisteredPointerFactory;
