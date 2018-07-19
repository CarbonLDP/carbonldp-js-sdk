import { Context } from "../../Context/Context";
import { BaseGeneralRepository } from "../../GeneralRepository/BaseGeneralRepository";
import { GeneralRepository } from "../../GeneralRepository/GeneralRepository";
import { GETOptions, RequestOptions } from "../../HTTP/Request";
import { Response } from "../../HTTP/Response";
import { ModelDecorator } from "../../Model/ModelDecorator";
import { ModelPrototype } from "../../Model/ModelPrototype";
import { RegisteredPointer } from "../../Registry/RegisteredPointer";
import { ResolvablePointer } from "../../Repository/ResolvablePointer";
export interface HTTPRepositoryTrait<MODEL extends ResolvablePointer = ResolvablePointer> extends GeneralRepository<MODEL> {
    readonly $context: Context<MODEL & RegisteredPointer, MODEL>;
    get<T extends object>(uri: string, requestOptions?: GETOptions): Promise<T & MODEL>;
    resolve<T extends object>(resource: MODEL, requestOptions?: RequestOptions): Promise<T & MODEL>;
    exists(uri: string, requestOptions?: RequestOptions): Promise<boolean>;
    refresh<T extends object>(resource: MODEL, requestOptions?: RequestOptions): Promise<T & MODEL>;
    save<T extends object>(resource: MODEL, requestOptions?: RequestOptions): Promise<T & MODEL>;
    saveAndRefresh<T extends object>(resource: MODEL, requestOptions?: RequestOptions): Promise<T & MODEL>;
    delete(uri: string, requestOptions?: RequestOptions): Promise<void>;
    _parseResponseData<T extends object>(response: Response, id: string): Promise<T & MODEL>;
}
export declare type OverriddenMembers = "get" | "resolve" | "exists" | "refresh" | "save" | "saveAndRefresh" | "delete";
export declare type GeneralRepositoryFactory = ModelPrototype<HTTPRepositoryTrait, GeneralRepository, OverriddenMembers> & ModelDecorator<HTTPRepositoryTrait<any>, BaseGeneralRepository>;
export declare const HTTPRepositoryTrait: GeneralRepositoryFactory;
