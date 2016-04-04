import Value from "./Value";
export interface Class {
    "@list": Array<Value>;
}
export declare class Factory {
    static is(value: any): boolean;
}
export default Class;
