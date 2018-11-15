# carbonldp-dgeni-api

A Dgeni Package with custom process and services to convert the extracted comments docs by Dgeni in the model tree used by the documentation templates of the `carbonldp-js-sdk`.

## File structure

```
├── dgeni-models                        # Extensions of the models dgeni create, to incude custom tags and JSDocs tags
├── inline-tags                         # Handlers of custom inline tags (inline tags have the form `{@tagName [content]}`)
├── local-models                        # Custom models that the templates expect to recieve
├── model-tags                          # Tags/properties to be added to the models created by dgeni.
├── node_modules                        # npm dependencies (don't touch them) 
├── pacakges                            # Custom packages
│   └── handlebars                      # Package for supporting handlebars template engine 
│       ├── helpers                     # Custom helpers used by the tempalte system
│       └── services                    # Services that actually implemetns the template support
├── processors                          # Custom processors to run with the dgeni system
│   ├── normalizeDocs.ts                # Analize docs to remove repeated docs and add the missing ones
│   └── oldDocsTree.js                  # Convert the dgeni-models into the local models
├── services                            # Custom services
│   ├── getLinkInfo.ts                  # Override service of `dgeni-packages/links` to support local models
│   └── resolveUrl.ts                   # Override service of `dgeni-packages/base` to support local template link formation
├── package.json                        # npm's configuration file
├── README.md                           # this
```
