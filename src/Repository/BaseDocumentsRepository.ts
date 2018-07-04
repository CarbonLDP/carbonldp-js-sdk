import { Context } from "../Context";
import { Document } from "../Document";


export interface BaseDocumentsRepository {
	$context:Context<Document, Document>;
}
