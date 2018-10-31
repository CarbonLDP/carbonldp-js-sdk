import { DocCollection, Processor } from "dgeni";

export default function oldDocsTree():Processor {
	return {
		$runAfter: [ "processing-docs" ],
		$runBefore: [ "docs-processed" ],

		$process( docs:DocCollection ):any {
			return [
				{
					docType: "index",
					modules: docs,
				},
				...docs,
			];
		},
	};
}
