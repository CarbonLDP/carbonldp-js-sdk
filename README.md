# [CarbonLDP JavaScript SDK](http://carbonldp.com/)

[![npm version][npm-image]][npm-url]
[![Downloads][npm-downloads]][npm-url]
[![Join the chat at https://gitter.im/CarbonLDP/CarbonLDP-JS-SDK][gitter-image]][gitter-url]

[![Build status][circleci-image]][circleci-url]

Official JavaScript SDK for Carbon LDP applications. Simplifies the use of Carbon LDP's REST API.

For information on how to use the SDK, please refer to the [JavaScript SDK user guide](https://carbonldp.com/documentation/javascript-sdk/) on the Carbon LDP website.

## Installing

```
npm install carbonldp
```

## Development setup

1. Install dependencies
    - [node.js 6+](https://nodejs.org/en/)
2. cd into the project's root directory
3. Run `npm install`
5. Build the source code by running `npm start`

## Main gulp tasks

1. `build`: Same as `npm start`. Build the source code and prepare it for production (inside the dist/ folder)
2. `lint`: Same as `npm lint`. Run TSLint over the source code to perform static code analysis.
3. `test`: Same as `npm test`. Run the test in both Node.js and Google Chrome.

## File structure

```
├── .circleci                           # CircleCI's configuration files (automated build and deploy system)
├── .idea                               # WebStorm shared configuration files (like code style)
├── build                               # Build related scripts
│   ├── license.js                      # Contains the license to append to the build
│   ├── sfx.ts                          # Main file that feeds the SFX building process
│   └── docs                            # Templates for build the different types of API documentation
│       ├── html                        # Templates for html documentation (used for github pages)
│       └── markdown                    # Templates for markdown documentation
├── config                              # Configuration files used while bundling the application
│   ├── karma.conf.js                   # Actual Karma test runner configuration file
│   ├── webpack.common.js               # Webpack's settings used by every mode
│   ├── webpack.prod.js                 # Webpack bundling settings for PRODUCTION mode
│   └── webpack.test.js                 # Webpack bundling settings for TESTING mode
├── dist                                # Distribution related files
│   └── bundles                         # Contains the bundled versions of the entire SDK
├── docs                                # JS SDK's API docucmentation files
├── node_modules                        # npm dependencies (don't touch them)
├── playground                          # Informal testing ground (TODO: Clean directory)
├── src                                 # All source files
├── test                                # Test framework related files (not the real tests)
├── .gitignore                          # Ignore file for git
├── .nvmrc                              # nvm configuration file that specifies supported Node.js version (for development)
├── CHANGELOG.md                        # File to track package changes
├── gulpfile.js                         # Gulp's configuration file
├── karma.conf.js                       # Karma configuration file used for the Browser tests
├── LICENSE                             # Self explanatory
├── package.json                        # npm's configuration file
├── package-lock.json                   # npm's with the exact desired dependency tree
├── README.md                           # this
├── tsconfig.json                       # Typescript compiler configuration file
├── tslint.json                         # TSLint configuration file
└── webpack.config.js                   # Webpack configuration used to bundle the SDK
```

## License

	Copyright (c) 2015-present, Base22 Technology Group, LLC
	All rights reserved.

	This source code is licensed under the BSD-style license found in the
	LICENSE file in the root directory of this source tree.

[npm-image]: https://img.shields.io/npm/v/carbonldp.svg?style=flat-square
[npm-url]: https://npmjs.org/package/carbonldp
[npm-downloads]: https://img.shields.io/npm/dm/carbonldp.svg?style=flat-square
[gitter-image]: https://badges.gitter.im/CarbonLDP/CarbonLDP-JS-SDK.svg
[gitter-url]: https://gitter.im/CarbonLDP/CarbonLDP-JS-SDK?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[circleci-image]: https://circleci.com/gh/CarbonLDP/carbonldp-js-sdk/tree/master.svg?style=svg
[circleci-url]: https://circleci.com/gh/CarbonLDP/carbonldp-js-sdk/tree/master
