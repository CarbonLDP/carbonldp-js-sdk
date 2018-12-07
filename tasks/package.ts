import fs from "fs";
import glob from "glob";
import gulp from "gulp";
import jsonEditor from "gulp-json-editor";
import path from "path";

import CONFIG, { DIST, SRC } from "./config";

export const copyMarkdowns:gulp.TaskFunction = () => {
	const MDs:string[] = [
		"README.md",
		"CHANGELOG.md",
		"LICENSE",
	];

	return gulp.src( MDs, { base: "./" } )
		.pipe( gulp.dest( DIST ) );
};
copyMarkdowns.displayName = "copy:markdowns";


export const copyPackage:gulp.TaskFunction = () => {
	const mainDir:string = path.relative( DIST, CONFIG.dist.cjs );
	const moduleDir:string = path.relative( DIST, CONFIG.dist.esm5 );
	const es2015Dir:string = path.relative( DIST, CONFIG.dist.esm2015 );
	const typesDir:string = path.relative( DIST, CONFIG.dist.types );

	return gulp.src( "package.json" )
		.pipe( jsonEditor( {
			private: void 0,
			scripts: void 0,
			devDependencies: void 0,
			main: path.join( mainDir, "CarbonLDP.js" ),
			module: path.join( moduleDir, "CarbonLDP.js" ),
			es2015: path.join( es2015Dir, "CarbonLDP.js" ),
			typings: path.join( typesDir, "CarbonLDP.d.ts" ),
		}, {
			keep_array_indentation: true,
			end_with_newline: true,
		} ) )
		.pipe( gulp.dest( DIST ) );
};
copyPackage.displayName = "copy:package";


export const makeDirPackages:gulp.TaskFunction = async () => {
	const directories:string[] = glob
		.sync( `${SRC}/*/**/index.ts` )
		.map( file => file.replace( "/index.ts", "" ) )
		.sort()
	;

	for( const srcEntry of directories ) {
		const relativeEntry:string = path.relative( SRC, srcEntry );
		const distEntry:string = path.join( DIST, relativeEntry );

		mkDir( distEntry );
		const mainDir:string = path.join( CONFIG.dist.cjs, relativeEntry );
		const moduleDir:string = path.join( CONFIG.dist.esm5, relativeEntry );
		const es2015Dir:string = path.join( CONFIG.dist.esm2015, relativeEntry );
		const typesDir:string = path.join( CONFIG.dist.types, relativeEntry );

		const body:object = {
			name: `CarbonLDP/${relativeEntry}`,
			main: path.join( path.relative( distEntry, mainDir ), "index.js" ),
			module: path.join( path.relative( distEntry, moduleDir ), "index.js" ),
			es2015: path.join( path.relative( distEntry, es2015Dir ), "index.js" ),
			typings: path.join( path.relative( distEntry, typesDir ), "index.d.ts" ),
		};

		const bodyStr:string = JSON.stringify( body, null, 2 );
		fs.writeFileSync( path.join( distEntry, "package.json" ), bodyStr );
	}
};
makeDirPackages.displayName = "make:directory-packages";

function mkDir( dirPath:string ):void {
	if( fs.existsSync( dirPath ) ) return;

	try {
		fs.mkdirSync( dirPath );
	} catch {
		const parent:string = dirPath
			.split( "/" )
			.slice( 0, - 1 )
			.join( "/" );

		mkDir( parent );
		fs.mkdirSync( dirPath );
	}
}


export const preparePackage:gulp.TaskFunction = gulp.parallel(
	copyMarkdowns,
	copyPackage,
	makeDirPackages
);
preparePackage.displayName = "prepare:package";
