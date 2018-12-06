import { Dgeni } from "dgeni";
import gulp from "gulp";
import htmlMin from "gulp-htmlmin";


export const compileDgeni:gulp.TaskFunction = () => {
	const dgeni:Dgeni = new Dgeni( [
		require( "docs-generator" )
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
	return gulp.src( "docs/index.html" )
		.pipe( htmlMin( {
			collapseWhitespace: true,
			conservativeCollapse: true,
			removeComments: true,
		} ) )
		.pipe( gulp.dest( "docs" ) )
		;
};
documentationMinify.displayName = "documentation:minify";


export const compileDocumentation:gulp.TaskFunction = gulp.series(
	compileDgeni,
	documentationMinify
);
compileDocumentation.displayName = "documentation";

