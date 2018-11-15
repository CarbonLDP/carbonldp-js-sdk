import { Package } from "dgeni";

import JsDocs from "dgeni-packages/jsdoc";
import Links from "dgeni-packages/links";
import Typescript from "dgeni-packages/typescript";

import * as path from "path";
// Inline tags
import { INLINE_TAGS } from "./inline-tags";
// Model Tags
import { generics } from "./model-tags/generics";
// Packages
import HandleBars from "./packages/handlebars";
// Processors
import normalizeDocs from "./processors/normalizeDocs";
import oldDocsTree from "./processors/oldDocsTree";
// Services
import getLinkInfo from "./services/getLinkInfo";
import resolveUrl from "./services/resolveUrl";

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

	.factory( getLinkInfo )
	.factory( resolveUrl )

	.processor( normalizeDocs )
	.processor( oldDocsTree )

	.config( function( log:any ):void {
		log.level = "info";
	} )

	// Configure new tags inside Docs
	.config( function( parseTagsProcessor:any, getInjectables:any ):void {
		parseTagsProcessor.tagDefinitions.push( ...getInjectables( [
			generics,
		] ) );
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

		computePathsProcessor.pathTemplates.push( {
			docTypes: [ "module" ],
			pathTemplate: "carbonldp/${ id }",
			getOutputPath():void {},
		} );

		computePathsProcessor.pathTemplates.push( {
			docTypes: [ "class", "interface", "type-alias", "enum" ],
			getPath( doc:any ):string {
				// Special case for main class
				if( doc.id === "CarbonLDP" ) return doc.id;

				const id:string = doc.id.replace( /\//g, "." );
				return `CarbonLDP.${ id }`;
			},
			getOutputPath():void {},
		} );


		computePathsProcessor.pathTemplates.push( {
			docTypes: [ "member" ],
			getPath( doc:any ):string {
				const access:string = doc.isStatic ? "#" : ".";
				return `${ doc.containerDoc.path }${ access }${ doc.name }`;
			},
			getOutputPath():void {},
		} );

		computePathsProcessor.pathTemplates.push( {
			docTypes: [ "const", "function" ],
			pathTemplate: "${ moduleDoc.path }#${ name }",
			getOutputPath():void {},
		} );

		computePathsProcessor.pathTemplates.push( {
			docTypes: [ "parameter" ],
			pathTemplate: "${ container.path }~${ name }",
			getOutputPath():void {},
		} );


		// Index Doc

		computePathsProcessor.pathTemplates.push( {
			docTypes: [ "index" ],
			pathTemplate: ".",
			outputPathTemplate: "index.html",
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
			exclude: "{**/*.spec.ts,test/*.ts}",
		} ];
	} )

	// Configure pattern for templates
	.config( function( templateFinder:any ):void {
		templateFinder.templatePatterns = [
			"${ doc.docType }.template.hbs",
		];
	} )

	// Extend inline tags
	.config( function( getInjectables:Function, inlineTagProcessor:any ):void {
		const inlineTags:any[] = getInjectables( INLINE_TAGS );
		inlineTagProcessor.inlineTagDefinitions.push( ...inlineTags );
	} );
