import { ModelFactory } from "../../Model";
import { TransientDocument } from "../../Document";
import { Pointer } from "../../Pointer";
import { LDP } from "../../Vocabularies";
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
