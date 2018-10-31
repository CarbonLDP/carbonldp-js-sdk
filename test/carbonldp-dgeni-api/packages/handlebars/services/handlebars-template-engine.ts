import fs from "fs";
import glob from "glob";
import path from "path";

import Handlebars, { HelperDelegate } from "handlebars";
import { TemplateEngine } from "./TemplateEngine";

type HandlebarsTemplate = ( data:any ) => string;

export default function templateEngine( templateFinder:any ):HandlebarsTemplateEngine {
	return new HandlebarsTemplateEngine(
		templateFinder
	);
}

export class HandlebarsTemplateEngine implements TemplateEngine {
	helpers:{ [ name:string ]:HelperDelegate } = {};
	partials:string | string[] = [];

	private templateFinder:any;

	constructor( templateFinder:any ) {
		this.templateFinder = templateFinder;
	}

	getRenderer():( template:string, data:any ) => string {
		Handlebars.registerHelper( this.helpers );

		const partials:string[] = Array.isArray( this.partials ) ? this.partials : [ this.partials ];
		for( const partial of partials ) {
			const partialPath:string = this._getTemplateGlob( partial );
			const files:string[] = glob.sync( partialPath );

			for( const file of files ) {
				const partialData:string = fs.readFileSync( file, "utf8" );
				Handlebars.registerPartial( path.basename( file, path.extname( file ) ), partialData );
			}
		}

		return ( template, data ) => {
			if( ! data.doc.outputPath ) return "";

			const templateGlob:string = this._getTemplateGlob( template );
			const [ file ] = glob.sync( templateGlob );

			const templateData:string = fs.readFileSync( file, "utf8" );

			const handlebarsTemplate:HandlebarsTemplate = Handlebars.compile( templateData );
			return handlebarsTemplate( data.doc );
		};
	}

	private _getTemplateGlob( template:string ):string {
		const rootGlob:string = this.templateFinder.templateFolders.length === 1
			? this.templateFinder.templateFolders[ 0 ]
			: `{${ this.templateFinder.templateFolders.join( "," ) }}`;

		return path.resolve( rootGlob, template );
	}
}
