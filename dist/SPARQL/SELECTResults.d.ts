import { Pointer } from "../Pointer";
export interface SPARQLBindingObject {
    [binding: string]: string | number | boolean | Date | Pointer;
}
export interface SPARQLSelectResults<T = SPARQLBindingObject> {
    vars: string[];
    bindings: T[];
}
