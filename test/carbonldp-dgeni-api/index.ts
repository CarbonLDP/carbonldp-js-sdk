import * as path from "path";
import { Package } from "dgeni";

import JsDocs from "dgeni-packages/jsdoc";
import Links from "dgeni-packages/links";
import Typescript from "dgeni-packages/typescript";
import HandleBars from "./packages/handlebars";

// Processors
import oldDocsTree from "./processors/old-docs-tree";

// Paths configurations
const projectPath:string = process.cwd();
const srcPath:string = path.resolve( projectPath, "src/" );
const distPath:string = path.resolve( projectPath, "docs/" );

export = new Package( "carbonldp-dgeni-api",
	[
		JsDocs,
		HandleBars,
		Typescript,
		Links,
	] )

	.processor( oldDocsTree )

	.config( function( log:any ):void {
		log.level = "info";
	} )

	// Configure the processor for reading files from the file system.
	.config( function( readFilesProcessor:any, writeFilesProcessor:any ):void {
		readFilesProcessor.basePath = srcPath;

		// Disable for using readTypeScriptModules
		readFilesProcessor.$enabled = false;

		writeFilesProcessor.outputFolder = distPath;
	} )

	// Configure the output path for written files.
	.config( function( computePathsProcessor:any, computeIdsProcessor:any ):void {
		// Reset templates
		computePathsProcessor.pathTemplates = [];
		computeIdsProcessor.idTemplates = [];


		// Index Doc

		computePathsProcessor.pathTemplates.push( {
			docTypes: [ "index" ],
			pathTemplate: ".",
			// FIXME: Change to correct `index.html`
			outputPathTemplate: "index2.html",
		} );

		computeIdsProcessor.idTemplates.push( {
			docTypes: [ "index" ],
			idTemplate: "index",
			getAliases():string[] {
				return [ "index" ];
			},
		} );
	} )

	// Configure TypeScript files
	.config( function( readTypeScriptModules:any ):void {
		readTypeScriptModules.basePath = srcPath;
		readTypeScriptModules.hidePrivateMembers = false;
		readTypeScriptModules.sortClassMembers = true;

		// Entry points for docs generation.
		readTypeScriptModules.sourceFiles = [ {
			include: "**/*.ts",
			exclude: "**/*.spec.ts",
		} ];
	} )

	// Configure pattern for templates
	.config( function( templateFinder:any ):void {
		templateFinder.templatePatterns = [
			"${ doc.docType }.template.hbs",
		];
	} );
