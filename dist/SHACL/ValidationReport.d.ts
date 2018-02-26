import * as ObjectSchema from "./../ObjectSchema";
import * as ValidationResult from "./ValidationResult";
export declare const RDF_CLASS: string;
export declare const SCHEMA: ObjectSchema.ObjectSchema;
export interface Class {
    conforms: boolean;
    results?: ValidationResult.Class[];
    shapesGraphWellFormed?: boolean;
}
export default Class;
