import { ObjectSchema } from "../ObjectSchema";
import { ValidationResult } from "./ValidationResult";
export interface ValidationReport {
    conforms: boolean;
    results?: ValidationResult[];
    shapesGraphWellFormed?: boolean;
}
export interface ValidationReportConstant {
    TYPE: string;
    SCHEMA: ObjectSchema;
}
export declare const ValidationReport: ValidationReportConstant;
export default ValidationReport;
