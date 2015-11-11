import * as RDF from "../../RDF";
interface PATCHRequest extends RDF.Resource.Class {
    addAction: Map<string, RDF.Node.Class>;
    setAction: Map<string, RDF.Node.Class>;
    deleteAction: Map<string, RDF.Node.Class>;
}
declare class Factory {
    static create(): PATCHRequest;
    static create(object: RDF.Persisted.Class): PATCHRequest;
    static create(objects: RDF.Persisted.Class[]): PATCHRequest;
    private static injectBehaviour(value);
}
export { PATCHRequest as Class, Factory };
