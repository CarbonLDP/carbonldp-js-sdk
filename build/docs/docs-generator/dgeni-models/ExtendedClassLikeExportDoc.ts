import { ClassLikeExportDoc } from "dgeni-packages/typescript/api-doc-types/ClassLikeExportDoc";
import { Generic } from "../model-tags/generics";
import { JSDoc } from "./JSDoc";

export type ExtendedClassLikeExportDoc = ClassLikeExportDoc & JSDoc & Generic;
