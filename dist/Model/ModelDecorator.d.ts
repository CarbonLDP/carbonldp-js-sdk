export interface ModelDecorator<MODEL extends object, BASE extends object = object> {
    isDecorated(object: object): object is MODEL;
    decorate<W extends object>(object: W & BASE): W & MODEL;
}
export interface ModelDecoratorFactory {
    hasPropertiesFrom<P extends object, O extends object>(prototype: P, object: O): boolean;
    definePropertiesFrom<P extends object, O extends object>(prototype: P, object: O): O & P;
    decorateMultiple<O extends B1, M1 extends object, B1 extends object>(object: O, model1: ModelDecorator<M1, B1>): O & M1;
    decorateMultiple<O extends B1 & Pick<B2, Exclude<keyof B2, keyof M1>>, M1 extends object, B1 extends object, M2 extends object, B2 extends object>(object: O, model1: ModelDecorator<M1, B1>, model2: ModelDecorator<M2, B2>): O & M1 & M2;
    decorateMultiple<O extends B1 & B2 & B3, M1 extends object, B1 extends object, M2 extends object, B2 extends object, M3 extends object, B3 extends object>(object: O, model1: ModelDecorator<M1, B1>, model2: ModelDecorator<M2, B2>, model3: ModelDecorator<M3, B3>): O & M1 & M2 & M3;
    decorateMultiple<O extends B1 & B2 & B3 & B4, M1 extends object, B1 extends object, M2 extends object, B2 extends object, M3 extends object, B3 extends object, M4 extends object, B4 extends object>(object: O, model1: ModelDecorator<M1, B1>, model2: ModelDecorator<M2, B2>, model3: ModelDecorator<M3, B3>, model4: ModelDecorator<M4, B4>): O & M1 & M2 & M3 & M4;
    decorateMultiple<O extends B1 & B2 & B3 & B4 & B5, M1 extends object, B1 extends object, M2 extends object, B2 extends object, M3 extends object, B3 extends object, M4 extends object, B4 extends object, M5 extends object, B5 extends object>(object: O, model1: ModelDecorator<M1, B1>, model2: ModelDecorator<M2, B2>, model3: ModelDecorator<M3, B3>, model4: ModelDecorator<M4, B4>, model5: ModelDecorator<M5, B5>): O & M1 & M2 & M3 & M4 & M5;
    decorateMultiple<O extends B1 & B2 & B3 & B4 & B5 & B6, M1 extends object, B1 extends object, M2 extends object, B2 extends object, M3 extends object, B3 extends object, M4 extends object, B4 extends object, M5 extends object, B5 extends object, M6 extends object, B6 extends object>(object: O, model1: ModelDecorator<M1, B1>, model2: ModelDecorator<M2, B2>, model3: ModelDecorator<M3, B3>, model4: ModelDecorator<M4, B4>, model5: ModelDecorator<M5, B5>, model6: ModelDecorator<M6, B6>): O & M1 & M2 & M3 & M4 & M5 & M6;
}
export declare const ModelDecorator: ModelDecoratorFactory;
