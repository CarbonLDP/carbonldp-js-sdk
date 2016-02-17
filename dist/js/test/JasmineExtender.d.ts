export interface SuiteDescriptor {
    access?: string;
    suiteType: string;
    name?: string;
    description?: string;
}
export interface SpecDescriptor {
    access?: string;
    specType: string;
    name?: string;
    description?: string;
}
export interface InterfaceDescriptor {
    parent?: string;
}
export interface InterfaceSuiteDescriptor extends SuiteDescriptor, InterfaceDescriptor {
}
export interface InterfaceSpecDescriptor extends SpecDescriptor, InterfaceDescriptor {
}
export interface ClassDescriptor extends InterfaceDescriptor {
    interfaces?: string[];
}
export interface ClassSuiteDescriptor extends SuiteDescriptor, ClassDescriptor {
}
export interface ClassSpecDescriptor extends SpecDescriptor, ClassDescriptor {
}
export interface PropertyDescriptor extends SpecDescriptor {
    type: string;
}
export interface MethodDescriptor extends SpecDescriptor {
    arguments?: MethodArgument[];
    returns?: MethodReturn;
}
export interface ReexportsDescriptor extends SpecDescriptor {
    originalLocation: string;
}
export interface MethodArgument {
    name: string;
    type: string;
    description?: string;
    optional?: boolean;
    default?: string;
}
export interface MethodReturn {
    type: string;
    description?: string;
}
export declare function serialize(descriptor: SuiteDescriptor): string;
export declare function serialize(descriptor: PropertyDescriptor): string;
export declare function serialize(descriptor: MethodDescriptor): string;
export declare const MODULE: string;
export declare const CLASS: string;
export declare const INTERFACE: string;
export declare const STATIC: string;
export declare const INSTANCE: string;
export declare const CONSTRUCTOR: string;
export declare const METHOD: string;
export declare const SIGNATURE: string;
export declare const PROPERTY: string;
export declare const SUPER_CLASS: string;
export declare const REEXPORTS: string;
export declare const DEFAULTEXPORT: string;
export declare function module(name: string, description?: string): string;
export declare function clazz(name: string, description: string, parent?: string, interfaces?: Array<string>): string;
export declare function interfaze(name: string, description: string, parent?: string): string;
export declare function constructor(description?: string): string;
export declare function reexports(access: string, name: string, originalLocation: string): string;
export declare function hasInterface(access: string, name: string): string;
export declare function isDefined(): string;
export declare function hasConstructor(): string;
export declare function hasConstructor(constructorArguments: MethodArgument[]): string;
export declare function hasConstructor(description: string, constructorArguments: MethodArgument[]): string;
export declare function hasMethod(access: string, name: string): string;
export declare function hasMethod(access: string, name: string, description: string): string;
export declare function hasMethod(access: string, name: string, methodArguments: MethodArgument[]): string;
export declare function hasMethod(access: string, name: string, returns: MethodReturn): string;
export declare function hasMethod(access: string, name: string, description: string, methodArguments: MethodArgument[]): string;
export declare function hasMethod(access: string, name: string, description: string, returns: MethodReturn): string;
export declare function hasMethod(access: string, name: string, methodArguments: MethodArgument[], returns: MethodReturn): string;
export declare function hasMethod(access: string, name: string, description: string, methodArguments: MethodArgument[], returns: MethodReturn): string;
export declare function method(access: string, name: string): string;
export declare function method(access: string, name: string, description: string): string;
export declare function hasSignature(): string;
export declare function hasSignature(description: string): string;
export declare function hasSignature(description: string, methodArguments: MethodArgument[]): string;
export declare function hasSignature(description: string, methodArguments: MethodArgument[], returns: MethodReturn): string;
export declare function hasSignature(methodArguments: MethodArgument[]): string;
export declare function hasSignature(methodArguments: MethodArgument[], returns: MethodReturn): string;
export declare function hasSignature(returns: MethodReturn): string;
export declare function hasProperty(access: string, name: string, type: string, description?: string): string;
export declare let property: typeof hasProperty;
export declare function extendsClass(name: string): string;
export declare function hasDefaultExport(exportName: string): string;
