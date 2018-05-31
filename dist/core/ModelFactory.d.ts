export interface ModelFactory<M extends object, B extends object = object> {
    is(value: any): value is M;
    create<W extends object>(data: W & B): W & M;
    createFrom<W extends object>(object: W & B): W & M;
}
