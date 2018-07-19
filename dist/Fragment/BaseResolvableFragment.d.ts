import { Document } from "../Document/Document";
import { BaseTransientFragment } from "./BaseTransientFragment";
export interface BaseResolvableFragment extends BaseTransientFragment {
    $registry: Document;
}
