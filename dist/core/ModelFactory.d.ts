export interface ModelFactory<M extends object, B extends object = object> {
    is?(value: any): value is M;
    create?<W extends B>(...arg: any[]): any;
    createFrom?<W extends B>(object: W, ...args: any[]): any;
}
