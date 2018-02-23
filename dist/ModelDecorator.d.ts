import { Context } from "./Context";
export interface ModelDecorator<T extends object> {
    TYPE?: string;
    isDecorated(object: object): object is T;
    decorate<W extends object>(object: W, context?: Context): W & T;
}
