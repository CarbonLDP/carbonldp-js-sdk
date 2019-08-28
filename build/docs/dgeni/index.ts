// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
import path from "canonical-path";
import {Package} from "dgeni";

//Processors
import {navigationProcessor} from "./processors/navigation";


// Project configuration.
const projectRootDir = path.resolve( __dirname, "./../../.." );
const sourceDir = path.resolve( projectRootDir, "src/" );
const outputDir = path.resolve( projectRootDir, "docs/" );
const templateDir = path.resolve( __dirname, "./templates" );

// Create and export a new Dgeni package called dgeni-example. This package depends upon
// tslint:disable-next-line: comment-format
// the jsdoc and nunjucks packages defined in the dgeni-packages npm module.
const apiDocsPackage = new Package( "sdk-api-docs", [
	// tslint:disable-next-line: no-var-requires
	require( "dgeni-packages/jsdoc" ),
	// tslint:disable-next-line: no-var-requires
	require( "dgeni-packages/nunjucks" ),
	// tslint:disable-next-line: no-var-requires
	require( "dgeni-packages/typescript" ),
	// tslint:disable-next-line: no-var-requires
	require( "dgeni-packages/links" ),
	// tslint:disable-next-line: no-var-requires
	require( "dgeni-packages/git" ),
] )

.processor(navigationProcessor)

.config( function( log ) {
	log.level = "info";
} )

// Configure the processor for reading files from the file system.
.config( function( readFilesProcessor, writeFilesProcessor ) {
	readFilesProcessor.basePath = sourceDir;
	readFilesProcessor.$enabled = false; // disable for now as we are using readTypeScriptModules

	writeFilesProcessor.outputFolder = outputDir;
} )

// Configure the processor for understanding TypeScript.
.config( function( readTypeScriptModules ) {
	readTypeScriptModules.basePath = sourceDir;
	readTypeScriptModules.hidePrivateMembers = false;
	// readTypeScriptModules.sortClassMembers = true;

	// Entry points for docs generation.
	readTypeScriptModules.sourceFiles = [
		{
			include: "**/*.ts",
			exclude: "**/*.spec.ts",
		},
	];
} )

// Configure processor for finding nunjucks templates.
.config( function( templateFinder ) {
	// Where to find the templates for the doc rendering
	templateFinder.templateFolders = [ templateDir, path.resolve( templateDir, "partials" ), path.resolve( templateDir, "macros" ) ];

	// // Standard patterns for matching docs to templates
	// templateFinder.templatePatterns = [
	// 	"${ doc.docType }.template.njk",
	// 	"${ doc.docType }.macro.njk",
	// ];
	templateFinder.templatePatterns.unshift('common.template.html');
} )

export = apiDocsPackage;
