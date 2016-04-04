export interface BindingObject {
    [binding: string]: any;
}
export interface Class {
    vars: string[];
    bindings: BindingObject[];
}
export default Class;
