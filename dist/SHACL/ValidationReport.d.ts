import { ObjectSchema } from "../ObjectSchema";
import { ValidationResult } from "./ValidationResult";
export interface ValidationReport {
    conforms: boolean;
    results?: ValidationResult[];
    shapesGraphWellFormed?: boolean;
}
export interface ValidationReportFactory {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const ValidationReport: ValidationReportFactory;
export default ValidationReport;
