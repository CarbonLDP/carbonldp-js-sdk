import { Pointer } from "../Pointer/Pointer";
import { ModelDecorator, ModelDecoratorFactory } from "./ModelDecorator";
export interface BiModelDecorator<MODEL extends object, $MODEL extends Pointer, BASE extends object, $BASE extends Pointer> extends ModelDecorator<MODEL, BASE> {
    isDecorated(object: Pointer): object is $MODEL;
    isDecorated(object: object): object is MODEL;
    decorate<T extends object>(object: T & $BASE): T & $MODEL;
    decorate<T extends object>(object: T & BASE): T & MODEL;
}
export declare const BiModelDecorator: ModelDecoratorFactory;
