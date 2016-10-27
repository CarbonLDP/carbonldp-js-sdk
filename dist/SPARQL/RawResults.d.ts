export declare class ValueTypes {
    static readonly URI: string;
    static readonly LITERAL: string;
    static readonly BNODE: string;
}
export interface BindingObject {
    [name: string]: BindingProperty;
}
export interface BindingProperty {
    "type": string;
    "value": string;
    "datatype"?: string;
    "xml:lang"?: string;
}
export interface Class {
    "head": {
        "vars"?: string[];
        "links"?: string[];
    };
    "results"?: {
        "bindings": BindingObject[];
    };
    "boolean"?: boolean;
}
export declare class Factory {
    static hasClassProperties(value: Object): boolean;
    static is(value: any): boolean;
}
export default Class;
