import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelPrototype } from "../Model/ModelPrototype";
import { ObjectSchemaResolver } from "../ObjectSchema/ObjectSchemaResolver";
import { BaseRepository } from "./BaseRepository";
import { ResolvablePointer } from "./ResolvablePointer";
export interface Repository<MODEL extends ResolvablePointer = ResolvablePointer> {
    get(uri: string, ...params: any[]): Promise<MODEL>;
    resolve(resource: MODEL, ...params: any[]): Promise<MODEL>;
    exists(uri: string, ...params: any[]): Promise<boolean>;
    refresh(resource: MODEL, ...params: any[]): Promise<MODEL>;
    save(resource: MODEL, ...params: any[]): Promise<MODEL>;
    saveAndRefresh(resource: MODEL, ...params: any[]): Promise<MODEL>;
    delete(uri: string, ...params: any[]): Promise<void>;
}
export declare type RepositoryFactory = ModelPrototype<Repository, BaseRepository & ObjectSchemaResolver> & ModelDecorator<Repository<any>, BaseRepository>;
export declare const Repository: RepositoryFactory;
