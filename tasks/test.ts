import gulp from "gulp";
import karma from "karma";
import path from "path";
import del from "del";
import moduleAlias from "module-alias";
import ts from "gulp-typescript";
import sourcemaps from "gulp-sourcemaps";
import filter from "gulp-filter";
import jasmine from "gulp-jasmine";


export const testBrowser:gulp.TaskFunction = ( done ) => {
	new karma.Server( {
		configFile: process.cwd() + "/karma.conf.js",
		singleRun: true,
	}, done ).start();
};
testBrowser.displayName = "test:browser";


export const testBrowserWatch:gulp.TaskFunction = ( done ) => {
	new karma.Server( {
		configFile: process.cwd() + "/karma.conf.js",
		autoWatch: true,
		singleRun: false,
	}, done ).start();
};
testBrowserWatch.displayName = "test:browser:watch";


const TEMP:string = "temp/";

export const testNode:gulp.TaskFunction = () => {
	process.env.NODE_ENV = "test";

	moduleAlias.addAliases( {
		"sockjs-client": path.resolve( "test/mock-sockjs.js" ),
	} );

	require( "source-map-support/register" );

	const tsProject:ts.Project = ts.createProject( "tsconfig.json" );
	const stream:NodeJS.WritableStream = gulp.src( [ "{src,test}/**/*.ts" ] )
		.pipe( sourcemaps.init() )
		.pipe( tsProject() )
		.js
		.pipe( sourcemaps.mapSources( ( sourcePath ) => path.resolve( "./", sourcePath ) ) )
		.pipe( sourcemaps.write( ".", {
			includeContent: false,
		} ) )
		.pipe( gulp.dest( TEMP ) )
		.pipe( filter( [ "**/*.spec.js", "**/test/**/index.js" ] ) )
		.pipe( jasmine( {
			includeStackTrace: true,
		} ) );

	const delTemp:() => void = () => del.sync( TEMP );
	stream.on( "jasmineDone", delTemp );
	stream.on( "error", delTemp );

	return stream;
};
testNode.displayName = "test:node";


export const test:gulp.TaskFunction = gulp.series(
	testNode,
	testBrowser
);
