export interface ModelDecorator<T extends object, U extends object = object> {
    isDecorated(object: object): object is T;
    decorate<W extends U>(object: W): W & T;
}
export interface ModelDecoratorFactory {
    hasPropertiesFrom<P extends object, O extends object>(prototype: P, object: O): boolean;
    definePropertiesFrom<P extends object, O extends object>(prototype: P, object: O): O & P;
    decorateMultiple<O extends object, M1 extends object>(object: O, model1: ModelDecorator<M1>): O & M1;
    decorateMultiple<O extends object, M1 extends object, M2 extends object>(object: O, model1: ModelDecorator<M1>, model2: ModelDecorator<M2>): O & M1 & M2;
    decorateMultiple<O extends object, M1 extends object, M2 extends object, M3 extends object>(object: O, model1: ModelDecorator<M1>, model2: ModelDecorator<M2>, model3: ModelDecorator<M3>): O & M1 & M2 & M3;
    decorateMultiple<O extends object, M1 extends object, M2 extends object, M3 extends object, M4 extends object>(object: O, model1: ModelDecorator<M1>, model2: ModelDecorator<M2>, model3: ModelDecorator<M3>, model4: ModelDecorator<M4>): O & M1 & M2 & M3 & M4;
    decorateMultiple<O extends object, M1 extends object, M2 extends object, M3 extends object, M4 extends object, M5 extends object>(object: O, model1: ModelDecorator<M1>, model2: ModelDecorator<M2>, model3: ModelDecorator<M3>, model4: ModelDecorator<M4>, model5: ModelDecorator<M5>): O & M1 & M2 & M3 & M4 & M5;
    decorateMultiple<O extends object, M1 extends object, M2 extends object, M3 extends object, M4 extends object, M5 extends object, M6 extends object>(object: O, model1: ModelDecorator<M1>, model2: ModelDecorator<M2>, model3: ModelDecorator<M3>, model4: ModelDecorator<M4>, model5: ModelDecorator<M5>, model6: ModelDecorator<M6>): O & M1 & M2 & M3 & M4 & M5 & M6;
}
export declare const ModelDecorator: ModelDecoratorFactory;
