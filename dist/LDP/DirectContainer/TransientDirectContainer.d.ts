import { TransientDocument } from "../../Document/TransientDocument";
import { ModelFactory } from "../../Model/ModelFactory";
import { Pointer } from "../../Pointer/Pointer";
import { LDP } from "../../Vocabularies/LDP";
import { BaseDirectContainer } from "./BaseDirectContainer";
export interface TransientDirectContainer extends TransientDocument {
    membershipResource?: Pointer;
    hasMemberRelation: Pointer;
}
export interface TransientDirectContainerFactory extends ModelFactory<TransientDirectContainer> {
    TYPE: LDP["DirectContainer"];
    is(value: any): value is TransientDirectContainer;
    create<T extends object>(data: T & BaseDirectContainer): T & TransientDirectContainer;
    createFrom<T extends object>(object: T & BaseDirectContainer): T & TransientDirectContainer;
}
export declare const TransientDirectContainer: TransientDirectContainerFactory;
