import * as AbstractContext from "../../AbstractContext";
import * as QueryProperty from "./QueryProperty";
import * as QueryVariable from "./QueryVariable";
export declare class Class {
    protected _context: AbstractContext.Class;
    protected _propertiesMap: Map<string, QueryProperty.Class>;
    private _variablesCounter;
    private _variablesMap;
    constructor(context: AbstractContext.Class);
    getVariable(name: string): QueryVariable.Class;
    getProperty(name: string): QueryProperty.Class;
    serializeLiteral(type: string, value: any): string;
    expandIRI(iri: string): string;
    compactIRI(iri: string): string;
}
export default Class;
