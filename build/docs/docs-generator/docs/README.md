# Developer documentation

This package configures [Dgeni] to generate a tree model based on the [carbonldp-js-sdk] documentation practices. We recommend you
to start your understanding of the package by reading the main file: [./index.ts].

## Notes

- From the [Dgeni] documentation:<br>
	> Dgeni on its own doesn't do much. You must configure it with Packages that contain Services and Processors. It is the Processors that actually convert your source files to documentation files.
	
	In short, [Dgeni] is just a framework with an ecosystem of packages tailored to help with the generation of 
	documentation from different sources (primarily JSDoc/TSDoc comments).

## File structure

```
├── dgeni-models                            # Extensions of the models dgeni create, to include custom tags and JSDocs tags
├── inline-tags                             # Handlers of custom inline tags (inline tags have the form `{@tagName [content]}`)
├── local-models                            # Custom models that the templates expect to receive
├── model-tags                              # Tags/properties to be added to the models created by dgeni.
├── node_modules                            # npm dependencies (don't touch them) 
├── packages                                # Custom packages
│   └── handlebars                          # Package for supporting handlebars template engine 
│       ├── helpers                         # Custom helpers used by the template system
│       └── services                        # Services that actually implements the template support
├── processors                              # Custom processors to run with the dgeni system
├── services                                # Custom services
├── package.json                            # npm's configuration file
└── README.md                               # this
```

## Node modules

- `dependencies`
	- `dgeni`: Documentation generation framework upon which this package is based on
    - `dgeni-packages`: [Dgeni packages] offered by the Dgeni team
    - `glob`: Used to read files on the handlebars templates
    - `handlebars`: Templating engine
    - `marked`: Used to compile JSDoc/TSDoc comments written in Markdown
    - `swag`: Collection of helpers for handlebars
    - `typescript`: Declared as a dependency to lock the version so it matches the version used by `dgeni-packages`
- `devDependencies`
	- `@types/handlebars`: Handlebars [TS definition types](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)

[Dgeni]: https://github.com/angular/dgeni
[Dgeni packages]: https://github.com/angular/dgeni#packages
[TS definition types]: https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html
