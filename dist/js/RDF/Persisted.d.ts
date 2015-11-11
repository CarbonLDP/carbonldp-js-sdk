/// <reference path="../../typings/es6/es6.d.ts" />
import * as Value from "./Value";
declare class Modifications {
    add: Map<string, Value.Class[]>;
    set: Map<string, Value.Class[]>;
    delete: Map<string, Value.Class[]>;
    constructor();
}
declare enum ModificationType {
    ADD = 0,
    SET = 1,
    DELETE = 2,
}
interface Persisted {
    _dirty: boolean;
    _modifications: Modifications;
    isDirty(): boolean;
}
declare class Factory {
    static is(object: Object): boolean;
    static from(object: Object): Persisted;
    static from(objects: Object[]): Persisted[];
    private static injectBehaviour(value);
}
export { Modifications, ModificationType, Persisted as Class, Factory };
