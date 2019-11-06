import del from "del";
import gulp from "gulp";
import filter from "gulp-filter";
import jasmine from "gulp-jasmine";
import sourcemaps from "gulp-sourcemaps";
import ts from "gulp-typescript";
import karma from "karma";
import moduleAlias from "module-alias";
import path from "path";


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
		.pipe( filter( [ "**/*.js" ] ) )
		.pipe( jasmine( {
			includeStackTrace: true,
			config: {
				helpers: [ "./node_modules/jasmine-ajax-node" ],
			},
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
