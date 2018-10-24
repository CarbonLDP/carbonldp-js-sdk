import { DocumentsContext } from "../Context/DocumentsContext";


/**
 * Properties for creating a {@link DocumentsRepository}.
 */
export interface BaseDocumentsRepository {
	/**
	 * Context from where the repository will be created.
	 */
	context:DocumentsContext;
}
