import {
	DocCollection,
	Document,
	Processor,
} from "dgeni";

interface NavigationDoc {
	id: string;
	name: string;
	type: string;
	exports: NavigationDoc[];
}

function docCompare(first: NavigationDoc, second: NavigationDoc): number {
	return first.id.toLowerCase().localeCompare(second.id.toLowerCase());
}

export function navigationProcessor(): Navigation {
	return new Navigation();
}

export class Navigation implements Processor {

	$runAfter = ["processing-docs"];
	$runBefore = ["docs-processed"];

	_navigationDocs: NavigationDoc[] = [];

	$process(docs: DocCollection) {
		const filteredDocs: DocCollection = docs.filter(doc => {
			if (["function-overload", "get-accessor-info"].includes(doc.docType)) return false;

			if (doc.docType === "module") {
				if (doc.fileInfo.baseName !== "index") return false;
				if (doc.name === "index") this._fixIndexModule(doc);
				this._addNavigationDoc(doc);
			} else {
				if (doc.moduleDoc === void 0) return false;
				if (doc.moduleDoc.fileInfo.baseName !== "index") return false;
			}

			doc.navigationDocs = this._navigationDocs;
			return true;
		});

		this._navigationDocs.sort(docCompare);

		// this._navigationDocs.forEach(navDoc => {
		// 	if (navDoc.id === "AccessPoint") {
		// 		console.log(navDoc);
		// 	}
		// })
		return filteredDocs;
	}

	_fixIndexModule(doc: Document): void {
		// Change document properties
		doc.docType = "index";
		doc.id = "";
		doc.isDefault = false;

		let exported: boolean = false;
		doc.exports = doc.exports.filter(exportDoc => {
			if (exported && exportDoc.name === "default") {
				doc.isDefault = true;
				return false;
			}
			if (exported && exportDoc.name === "SPARQLER") return false;

			// Remove `index` from id
			exportDoc.id = exportDoc.id.substr(6);

			exported = exportDoc.name === "SPARQLER";
			return true;
		});
	}

	_addNavigationDoc(doc: Document): void {
		const exports: DocCollection = doc.exports || [];
		exports.sort(docCompare);

		this._navigationDocs.push({
			id: doc.id,
			name: doc.name,
			type: doc.docType,
			exports,
		});
	}

}
