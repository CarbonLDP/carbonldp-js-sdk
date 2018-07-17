import { ModelDecorator } from "../Model/ModelDecorator";
import { RegisteredPointer } from "./RegisteredPointer";
import { Registry } from "./Registry";
export interface BaseRegistry<M extends RegisteredPointer = RegisteredPointer> {
    $registry?: Registry;
    $__modelDecorator: ModelDecorator<M>;
}
