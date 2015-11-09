interface Literal {
    "@type"?: string;
    "@value": string;
}
declare class Factory {
    static from(value: any): Literal;
    static parse(literal: Literal): any;
    static is(value: any): boolean;
}
declare class Util {
    static areEqual(literal1: Literal, literal2: Literal): boolean;
}
export { Literal as Class, Factory, Util };
