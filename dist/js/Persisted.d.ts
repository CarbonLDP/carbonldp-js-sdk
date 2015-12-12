import * as RDF from "./RDF";
declare class Modifications {
    add: Map<string, RDF.Value.Class[]>;
    set: Map<string, RDF.Value.Class[]>;
    delete: Map<string, RDF.Value.Class[]>;
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
    private static injectBehavior(value);
}
export { Modifications, ModificationType, Persisted as Class, Factory };
