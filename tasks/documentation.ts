import { Dgeni } from "dgeni";
import gulp from "gulp";
import htmlReplace from "gulp-html-replace";
import htmlMin from "gulp-htmlmin";
import imageMin from "gulp-imagemin";
import replace from "gulp-replace";
import del = require("del");
import webpack = require("webpack");


export const docsCleanHTML:gulp.TaskFunction = () =>
	del( [
		"docs/**", "!docs",
		"!docs/styles", "!docs/styles/**",
		"!docs/fonts", "!docs/fonts/**",
		"!docs/images", "!docs/images/**",
		"!docs/scripts", "!docs/scripts/**",
		"!docs/scripts", "!docs/scripts/**",
		"!docs/favicon.png",
	] );
docsCleanHTML.displayName = "docs:clean-html";

export const docsCreateHTML:gulp.TaskFunction = () => {
	const dgeni:Dgeni = new Dgeni( [ require( "../build/docs/dgeni" ) ] );
	return dgeni.generate();
};
docsCreateHTML.displayName = "docs:create-html";

export const docsHTMLReplace:gulp.TaskFunction = () =>
	gulp.src( "docs/**/*.html" )
		.pipe( htmlReplace( {
			"css": "assets/styles.min.css",
			"js": "scripts/bundle.min.js"
		} ) )
		.pipe( replace( /<(?!base)([^>]*?)href="(\/)([^*]*?)"([?>]*?)>/gm, `<$1href="$3"$4>` ) )
		.pipe( gulp.dest( "docs/" ) );
docsHTMLReplace.displayName = "docs:html-replace";

export const docsHTMLMin:gulp.TaskFunction = () =>
	gulp.src( "docs/**/*.html" )
		.pipe( htmlMin( {
			collapseWhitespace: true,
			removeComments: true
		} ) )
		.pipe( gulp.dest( "docs" ) );
docsHTMLMin.displayName = "docs:html-min";

export const docsHTML:gulp.TaskFunction = gulp.series(
	docsCleanHTML,
	docsCreateHTML,
);
docsHTML.displayName = "docs:html";


export const docsCleanBundle:gulp.TaskFunction = () =>
	del( [
		"docs/styles/**",
		"docs/scripts/**",
		"docs/fonts/**",
	] );
docsCleanBundle.displayName = "docs:clean-bundle";

export const docsCreateBundle:gulp.TaskFunction = done => {
	let config = process.env.NODE_ENV === "prod" ?
		require( "../build/docs/webpack/webpack.prod" ) :
		require( "../build/docs/webpack/webpack.dev" );

	const compiler = webpack( config );

	compiler.run( ( error ) => {
		if( error ) done( error );
		else done();
	} );
};
docsCreateBundle.displayName = "docs:create-bundle";

export const docsBundle:gulp.TaskFunction = gulp.series(
	docsCleanBundle,
	docsCreateBundle,
);
docsBundle.displayName = "docs:bundle";


export const docsCleanImages:gulp.TaskFunction = () =>
	del( [ "docs/images/**" ] );
docsCleanImages.displayName = "docs:clean-images";

export const docsAddImages:gulp.TaskFunction = () =>
	gulp.src( "build/docs/src/images/**" )
		.pipe( imageMin() )
		.pipe( gulp.dest( "docs/images" ) );
docsAddImages.displayName = "docs:add-images";

export const docsImages:gulp.TaskFunction = gulp.series(
	docsCleanImages,
	docsAddImages,
);
docsImages.displayName = "docs:images";


const setENV:( env:string ) => gulp.TaskFunction = env => {
	const fn:gulp.TaskFunction = () => {
		process.env.NODE_ENV = env;
		return Promise.resolve();
	};


	return fn;
};

export const docsBuildProd:gulp.TaskFunction = gulp.series(
	setENV( "prod" ),
	gulp.parallel( docsHTML, docsImages ),
	gulp.parallel( docsBundle, docsHTMLReplace ),
	docsHTMLMin,
);
docsBuildProd.displayName = "docs:build|prod";

export const docsBuildDev:gulp.TaskFunction = gulp.series(
	setENV( "dev" ),
	gulp.parallel( docsHTML, docsImages ),
	docsBundle,
	docsHTMLMin,
);
docsBuildDev.displayName = "docs:build|dev";


