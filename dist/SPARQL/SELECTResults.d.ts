import * as Pointer from "./../Pointer";
export interface BindingObject {
    [binding: string]: string | number | boolean | Date | Pointer.Class;
}
export interface Class {
    vars: string[];
    bindings: BindingObject[];
}
export default Class;
