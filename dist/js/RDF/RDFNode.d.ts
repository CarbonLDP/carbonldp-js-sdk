interface RDFNode {
    '@id': string;
}
declare class Factory {
    static is(value: any): boolean;
    static create(uri: string): RDFNode;
}
declare class Util {
    static areEqual(node1: RDFNode, node2: RDFNode): boolean;
}
export { RDFNode as Class, Factory, Util };
