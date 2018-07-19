import { Context } from "../Context/Context";
import { ModelDecorator } from "../Model/ModelDecorator";
import { ModelFactory } from "../Model/ModelFactory";
import { ModelPrototype } from "../Model/ModelPrototype";
import { RegisteredPointer } from "../Registry/RegisteredPointer";
import { Repository } from "../Repository/Repository";
import { ResolvablePointer } from "../Repository/ResolvablePointer";
import { BaseGeneralRepository } from "./BaseGeneralRepository";
export interface GeneralRepository<MODEL extends ResolvablePointer = ResolvablePointer> extends Repository<MODEL> {
    $context: Context<MODEL & RegisteredPointer, MODEL>;
}
export declare type GeneralRepositoryFactory = ModelPrototype<GeneralRepository, Repository> & ModelDecorator<GeneralRepository<any>, BaseGeneralRepository> & ModelFactory<GeneralRepository, BaseGeneralRepository>;
export declare const GeneralRepository: GeneralRepositoryFactory;
