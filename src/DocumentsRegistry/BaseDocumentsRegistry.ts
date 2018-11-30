import { DocumentsContext } from "../Context/DocumentsContext";


/**
 * Properties for creating a {@link DocumentsRegistry}.
 */
export interface BaseDocumentsRegistry {
	/**
	 * Context from where the registry is been created.
	 */
	context:DocumentsContext;
}
