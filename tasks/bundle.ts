import gulp from "gulp";
import path from "path";
import { rollup, Plugin } from "rollup";
import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import { uglify } from "rollup-plugin-uglify";
import config from "./config";

const SRC_DIR:string = path.resolve( __dirname, "../build" );

const DEFAULT_PLUGINS:Plugin[] = [
	resolve( {
		main: true,
		module: true,
		browser: true,
	} ),
	commonjs( {
		ignoreGlobal: true,
		sourceMap: false,
	} ),
	typescript( {
		tsconfig: "tsconfig.json",
		tsconfigOverride: {
			compilerOptions: {
				"module": "esnext",
			},
		},
	} ),
	replace( {
		"process.env.NODE_ENV": JSON.stringify( "production" ),
	} ),
];

export const bundleSFX:gulp.TaskFunction = async () => {
	// Main bundle
	await rollup( {
		input: path.resolve( SRC_DIR, "sfx.ts" ),
		plugins: DEFAULT_PLUGINS,
	} ).then( bundle => bundle.write( {
		file: `${ config.dist.bundle }CarbonLDP.sfx.js`,
		format: "umd",
		name: "CarbonLDP",
	} ) );

	// Minified bundle
	await rollup( {
		input: path.resolve( SRC_DIR, "sfx.ts" ),
		plugins: [
			...DEFAULT_PLUGINS,
			uglify(),
		],
	} ).then( bundle => bundle.write( {
		file: `${ config.dist.bundle }CarbonLDP.sfx.min.js`,
		format: "umd",
		name: "CarbonLDP",
		compact: true,
	} ) );
};
bundleSFX.displayName = "bundle:sfx";
