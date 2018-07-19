import { Document } from "../../Document/Document";
import { TransientDirectContainerFactory } from "./TransientDirectContainer";
export interface DirectContainer extends Document {
}
export interface DirectContainerFactory {
    TYPE: TransientDirectContainerFactory["TYPE"];
    create: TransientDirectContainerFactory["create"];
    createFrom: TransientDirectContainerFactory["createFrom"];
    is(value: any): value is DirectContainer;
}
export declare const DirectContainer: DirectContainerFactory;
