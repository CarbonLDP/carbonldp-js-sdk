import path from "canonical-path";
import {Package} from "dgeni";

//Processors
import {navigationProcessor} from "./processors/navigation";

//Nunjucks Filters
import { linkifyFilter } from "./rendering/filters/linkify";
import { nullifyEmptyFilter } from "./rendering/filters/nullifyEmpty";
import { highlightFilter } from "./rendering/filters/highlight";
//Nunjucks tags
import { highlightTag } from "./rendering/tags/highlight";

// Dgeni doc tags
import { typeParameters } from "./tags-def/typeParameters";
import { isDefault } from "./tags-def/isDefault";
import { moduleDoc } from "./tags-def/moduleDoc";
import { paramInLineTag } from "./inline-tags-def/paramInlineTag";



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

// Configure the output path for written files (i.e., file names).
.config( function( computePathsProcessor, computeIdsProcessor ) {

	computePathsProcessor.pathTemplates.push( {
		docTypes: [ "module", "class", "interface", "function", "enum", "type-alias", "const" ],
		pathTemplate: "/${id}/",
		outputPathTemplate: "${id}/index.html",
	} );

	computePathsProcessor.pathTemplates.push( {
		docTypes: [ "index" ],
		pathTemplate: ".",
		outputPathTemplate: "${id}.html",
	} );

	computeIdsProcessor.idTemplates.push( {
		docTypes: [ "index" ],
		idTemplate: "index",
		// getAliases: () => [ "index" ],
	} );
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

// Configure the processor to accept the '@param' tag.
.config(function (inlineTagProcessor, getInjectables) {
	inlineTagProcessor.inlineTagDefinitions.push( ...getInjectables([
		paramInLineTag
	]))
})

// Configure processor for finding nunjucks templates.
.config( function( templateFinder ) {
	// Where to find the templates for the doc rendering
	templateFinder.templateFolders = [ templateDir, path.resolve( templateDir, "partials" ), path.resolve( templateDir, "macros" ) ];

	// Standard patterns for matching docs to templates
	templateFinder.templatePatterns = [
		"${ doc.docType }.template.njk",
		"${ doc.docType }.macro.njk",
	];
	// templateFinder.templatePatterns.unshift('common.template.html');
} )


// Adds custom functions for nunjucks templates
.config( function( templateEngine, getInjectables ) {
	templateEngine.filters.push( ...getInjectables( [
		linkifyFilter,
		nullifyEmptyFilter,
		highlightFilter,
	] ) );
	templateEngine.tags.push( ...getInjectables( [
		highlightTag,
	] ) );
} )
.config( function( parseTagsProcessor, getInjectables ) {
	parseTagsProcessor.tagDefinitions.push( ...getInjectables( [
		moduleDoc,
		typeParameters,
		isDefault,
	] ) );
} );

export = apiDocsPackage;
