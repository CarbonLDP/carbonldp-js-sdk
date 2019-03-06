import { Dgeni } from "dgeni";
import docsGenerator from "docs-generator";
import gulp from "gulp";
import htmlMin from "gulp-htmlmin";
import path from "path";


const docsPath:string = "api-docs/";

export const compileDgeni:gulp.TaskFunction = () => {
	const dgeni:Dgeni = new Dgeni( [
		docsGenerator
			.config( function( writeFilesProcessor:any ):void {
				writeFilesProcessor.outputFolder = path.resolve( docsPath );
			} )
			.config( function( templateFinder:any, templateEngine:any ):void {
				// Configure pattern for Handlebars templates
				templateFinder.templateFolders = [ "build/docs/templates/html/" ];
				templateFinder.templatePatterns = [ "template.hbs" ];
				templateEngine.partials = [ "partials/*.hbs" ];
			} ),
	] );

	return dgeni.generate();
};
compileDgeni.displayName = "compile:dgeni";


export const documentationMinify:gulp.TaskFunction = () => {
	return gulp.src( `${ docsPath }index.html` )
		.pipe( htmlMin( {
			collapseWhitespace: true,
			conservativeCollapse: true,
			removeComments: true,
		} ) )
		.pipe( gulp.dest( docsPath ) )
		;
};
documentationMinify.displayName = "documentation:minify";


export const compileDocumentation:gulp.TaskFunction = gulp.series(
	compileDgeni,
	documentationMinify
);
compileDocumentation.displayName = "documentation";

