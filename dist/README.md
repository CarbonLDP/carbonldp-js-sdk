# [CarbonLDP JavaScript SDK](http://carbonldp.com/)

[![npm version](https://badge.fury.io/js/carbonldp.svg)](https://badge.fury.io/js/carbonldp) [![Join the chat at https://gitter.im/CarbonLDP/CarbonLDP-JS-SDK](https://badges.gitter.im/CarbonLDP/CarbonLDP-JS-SDK.svg)](https://gitter.im/CarbonLDP/CarbonLDP-JS-SDK?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/CarbonLDP/carbonldp-js-sdk.svg)](https://travis-ci.org/CarbonLDP/carbonldp-js-sdk)

Official JavaScript SDK for Carbon LDP applications, which simplifies the use of Carbon's REST API.

## Development setup
1. Install dependencies
    - [node.js 6+](https://nodejs.org/en/)
    - gulp: `npm install gulp -g` (you may need to run it as root)
    - typings: `npm install typings -g` (you may need to run it as root)
2. cd into the project's root directory
3. Run `npm install`
4. Run `typings install`
5. Build the source code by running `npm start`

## Main gulp tasks
1. `build`: Same as `npm start`. Build the source code and prepare it for production (inside the dist/ folder)
2. `lint`: Same as `npm lint`. Run TSLint over the source code to perform static code analysis.

## File structure
- **build**: Build related scripts
    - **documentation**: Files used to generate documentation
        - **html**: Files used for html based documentation
        - **markdown**: Files used for markdown based documentation
    - **license.js**: Contains the license to append to the build
        - **sfx.ts**: Main file that feeds the SFX building process. Requires Carbon and exports its entire content as a module
- **config**: Configuration files used for building and testing the SDK 
	- **karma.conf.js**: Actual Karma test runner configuration file, used by the karma file in the base path
	- **webpack.common.js**: Base Webpack configuration used by every by the specific environment webpack configuration files
	- **webpack.prod.js**: Webpack configuration used for generate the bundle files
	- **webpack.test.js**: Webpack configuration used by **karma.conf.js**
- **dist**: Compiled files
    - **bundles**: Contains different versions of Carbon, bundled for simplicity
        - **Carbon.sfx.js**: Bundle that contains Carbon and all of its dependencies. Carbon is exposed in the global environment
        - **Carbon.sfx.min.js**: Minimized version of the bundle
- **documentation**: JS SDK's API documentation
- **node_modules**: npm dependencies (don't touch them)
- **playground**: Informal testing ground (TODO: Clean directory)
- **scripts**: Scripts that aid in the workflow
	- **copy-hooks.js**: Copies `pre-commit` to .git when `npm install` is called
    - **pre-commit**: Builds Carbon and adds the dist folder to the commit. Makes sure there's a fresh build in each commit
- **src**: Source files
- **test**: Test framework related files (not the real tests)
- **typings**: TypeScript definition files (See [typings](https://github.com/typings/typings))
    - **modules**: Definition files are installed here. This folder is managed by [typings](https://github.com/typings/typings)
    - **index.d.ts**: Definition file managed by [typings](https://github.com/typings/typings). Most typings are installed with `npm`, but the `@types` repository doesn't have typings for `jsonld` yet
    - **typings.d.ts**: Main definitions file
- **.gitignore**: Git configuration file to mark which files to ignore
- **.travis.yml**: Travis configuration file
- **CHANGELOG.md**: File to track changes. Any new addition needs to be added here
- **gulpfile.js**: Gulp configuration file
- **karma.conf.js**: Karma test runner configuration file
- **LICENSE**: Self explanatory
- **package.json**: npm configuration file
- **README.md**: === this
- **tsconfig.json**: TypeScript compiler configuration file
- **tslint.json**: tslint configuration file
- **typings.json**: [typings](https://github.com/typings/typings) configuration file
- **webpack.config.js**: Webpack configuration file used to create the bundle files

## License

	Copyright (c) 2015-present, Base22 Technology Group, LLC
	All rights reserved.

	This source code is licensed under the BSD-style license found in the
	LICENSE file in the root directory of this source tree.
