import { ClassLikeExportDoc } from "dgeni-packages/typescript/api-doc-types/ClassLikeExportDoc";
import { Generic } from "../tags/generics";
import { JSDoc } from "../local-models/JSDoc";

export type ExtendedClassLikeExportDoc = ClassLikeExportDoc & JSDoc & Generic;
