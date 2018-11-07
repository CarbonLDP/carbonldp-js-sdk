import { Package } from "dgeni";
import base from "dgeni-packages/base";

import Handlebars from "handlebars";
import Swag from "swag";
import markdown from "./helpers/markdown";
import areEqual from "./helpers/areEqual";
import combineElements from "./helpers/combineElements";
import concat from "./helpers/concat";
import newLine from "./helpers/new-line";
import tocTree from "./helpers/toc-tree";
import toURL from "./helpers/toURL";
import trim from "./helpers/trim";
import urlify from "./helpers/urlify";

import handlebarsTemplateEngine, { HandlebarsTemplateEngine } from "./services/handlebars-template-engine";

export = new Package( "handlebars", [ base ] )

	.factory( handlebarsTemplateEngine )

	.config( ( templateEngine:HandlebarsTemplateEngine ) => {
		Swag.registerHelpers( Handlebars );

		templateEngine.helpers = {
			...templateEngine.helpers,

			"newLine": newLine,
			"trim": trim,
			"urlify": urlify,
			"markdown": markdown,
			"toc-tree": tocTree,
			"combineElements": combineElements,
			"concat": concat,
			"areEqual": areEqual,
			"toURL": toURL,
		};
	} );
