# Dependencies

## Main Dependencies

- [sparqler](https://github.com/CarbonLDP/sparqler)<br>
	Library that can construct a SPARQL query with a fluent interface.<br>
	The library is extended, adding the execution and parsing of results with Carbon LDP.
- [webstomp-client](https://github.com/JSteunou/webstomp-client)<br>
	Library to use the [stomp](https://stomp.github.io/) protocol;
	used by the platform to notify about events in real-time.
- [sockjs-client](https://github.com/sockjs/sockjs-client/)<br>
	Library that emulates WebSocket objects using the native WebSocket, if exists, or
	other transports also supported by the SockJS endpoint in the platform.<br>
	This client is used to change the data in the real-time subscriptions.
- [tslib](https://github.com/Microsoft/tslib)<br>
	Library that contains the helper functions of [TypeScript](https://www.typescriptlang.org/).
	
## Development dependencies

 - [codecov](https://github.com/codecov/codecov-node)<br>
    Script to upload test coverage to [Codecov](https://codecov.io/), improving CI.
 - [del](https://github.com/sindresorhus/del)<br>
    Library used in Gulp tasks to delete folders.
 - [dgeni](https://github.com/angular/dgeni)<br>
    Documentation generator supported by the Angular team.
    This is the generator used to create the SDK's api-docs.
 - [docs-generator](../build/docs/docs-generator)<br>
    A package implementation of Dgeni that contains the actual logic
    to process the source code and create the API documentation.<br>
    **Local package dependencies**:<br>
    - [dgeni-packages](https://github.com/angular/dgeni-packages)<br>
        Dgeni packages developed by the Angular team that actually have the logic
        to process the source code into understandable API models.<br>
    - [glob](https://github.com/isaacs/node-glob)<br>
        Library used to find the templates and partials provided to the
        `docs-generator` packages, accepting patterns to match multiple files
        as in shell.
    - [handlebars](https://handlebarsjs.com/)<br>
        Templating language of the templates to provide to `docs-generator`.
        The templates should expect to receive and object with the following structure: [IndexDoc](../build/docs/docs-generator/local-models/IndexDoc.ts).
    - [marked](https://github.com/markedjs/marked)<br>
        Markdown processor used to decorate the description of the docs comments.
    - [swag](https://elving.me/swag/)<br>
        Helpers available to use in the handlebars templates.
 - [gulp](https://github.com/gulpjs/gulp)<br>
    Task runner used in the project.
 - [gulp-filter](https://github.com/sindresorhus/gulp-filter)<br>
    Gulp plugin to filter matched stream files.
 - [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin)<br>
    Gulp plugin to minify html files.
 - [gulp-jasmine](https://github.com/sindresorhus/gulp-jasmine)<br>
    Gulp plugin to execute jasmine test under Node.js
 - [gulp-json-editor](https://github.com/rejas/gulp-json-editor)<br>
    Gulp plugin to edit JSON files, used to edit the main `package.json`
    when generating the `packge.json` for the distribution package.
 - [gulp-replace](https://github.com/lazd/gulp-replace)<br>
    Gulp plugin to replace the matching of any selected file.<br>
    Used to insert the current version of the library into the `CarbonLDP` class.
 - [gulp-sourcemaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps)<br>
    Gulp plugin to generate the sourcemaps of the distribution files.
 - [gulp-tslint](https://github.com/panuhorsmalahti/gulp-tslint)<br>
    Gulp plugin to check the fulfillment of the lint rules.
 - [gulp-typescript](https://github.com/ivogabe/gulp-typescript)<br>
    Gulp plugin to compile TypeScript into the distribution JavaScript files.
 - [jasmine-core](https://jasmine.github.io/)<br>
    Testing framework used in the SDK's unit tests. 
 - [jasmine-ajax](https://github.com/jasmine/jasmine-ajax)<br>
    Jasmine extension to fake HTTP requests in browsers using `XMLHttpRequest`.
 - [jasmine-ajax-node](https://github.com/roddolf/jasmine-ajax-node)<br>
    Jasmine extension to fake HTTP request in Node.js using `http` or `https` modules.
 - [jsonld](https://github.com/digitalbazaar/jsonld.js)<br>
    Library that implements the JSON-LD specification.<br>
    Used in tests that ensure the correct operation of an internal implementation that expands JSON-LD.
 - [karma](https://karma-runner.github.io)<br>
    Test runner with a lot of useful plugins to create a simple configuration
    for the project. 
 - [karma-chrome-launcher](https://github.com/karma-runner/karma-chrome-launcher)<br>
    Karma plugin to run the test in the Chrome browser.
 - [karma-jasmine](https://github.com/karma-runner/karma-jasmine)<br>
    Karma plugin to execute jasmine tests.
 - [karma-jasmine-ajax](https://github.com/IDCubed/karma-jasmine-ajax)<br>
    Karma plugin to add the Ajax extension into jasmine.
 - [karma-mocha-reporter](https://github.com/litixsoft/karma-mocha-reporter)<br>
    Karma plugin to report the test results in a mocha style.
 - [karma-source-map-support](https://github.com/tschaub/karma-source-map-support)<br>
    Karma plugin that changes the stack traces of errors to use the original source files (TypeScript files). 
 - [karma-typescript]()<br>
    Karma plugin that compiles the TypeScript files into JavaScript to be able tu run the selected browser.
 - [mock-socket](https://github.com/thoov/mock-socket)<br>
    Library that mocks WebSockets. This is used to test the real-time features of the project.
 - [module-alias](https://github.com/ilearnio/module-alias)<br>
    Library that allows the replacement of modules' import in Node.js, when Node.js uses the `require` method.<br>
    This is used to replace SockJS import into a extended `mock-socket` to be able to test the real-time.
 - [rollup](https://rollupjs.org/guide/en)<br>
    Module bundler for JavaScript.<br>
    The library is used to create the browser bundle of the SDK.
 - [rollup-plugin-alias](https://github.com/rollup/rollup-plugin-alias)<br>
    Rollup plugin to define alias for imported modules.<br>
    Used to force the empty imports of Node.js modules that will not be used in the browser bundle.
 - [rollup-plugin-commonjs](https://github.com/rollup/rollup-plugin-commonjs)<br>
    Rollup plugin to import commonjs modules, since natively rollup only support ES modules.
 - [rollup-plugin-node-globals](https://github.com/calvinmetcalf/rollup-plugin-node-globals)<br>
    Rollup plugin to insert Node.js globals into the bundle,
    specially the `global` variable that is used by some SDK dependencies (for browserify support).
 - [rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve)<br>
    Rollup plugin to import Node.js dependencies.
 - [rollup-plugin-replace](https://www.npmjs.com/package/rollup-plugin-replace)<br>
    Rollup plugin to replace strings in the files.<br>
    Used to insert the `process.env.NODE_ENV` variable.
 - [rollup-plugin-typescript2](https://github.com/ezolenko/rollup-plugin-typescript2)<br>
    Rollup plugin to compile the source TypeScript files.
 - [rollup-plugin-uglify](https://github.com/TrySound/rollup-plugin-uglify)<br>
    Rollup plugin to minify the bundle using [UglifyJS](https://github.com/mishoo/UglifyJS2).
 - [source-map-support](https://github.com/evanw/node-source-map-support)<br>
    Library that changes the stack traces of errors to use the original source files (TypeScript files).
 - [ts-node](https://github.com/TypeStrong/ts-node)<br>
    Executable to run TypeScript files with Node.js without the necessity to compile to JavaScript before.
 - [tslint](https://palantir.github.io/tslint/)<br>
    Linter for TypeScript files.
 - [typescript](https://www.typescriptlang.org/)<br>
    A JavaScript superset maintained by Microsoft that allows to write JS using types.