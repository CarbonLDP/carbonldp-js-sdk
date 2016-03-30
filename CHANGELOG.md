# 0.19.0 (March 30, 2016)
* Added `Apps.create()` method, which lets you persist an App
* Added missing reexports in `Carbon`
* Added signature `Apps.getContext( app:Carbon.Pointer.Class )` to reuse already resolved apps
* Added `version` property to `Carbon` instances to make it easier to retrieve the SDK version
## Breaking Changes
* Renamed `Apps.get()` to `Apps.getContext()`
* Renamed `Apps.getAll()` to `Apps.getAllContexts()`
* Moved `App.Context` to its own file in `Carbon/App/Context`

# 0.18.1 (March 28, 2016)
* Fixed case sensitiveness issue with http response/request headers
* Added `HTTP.Response.getHeader()` method, which helps retrieve a header independently of the header's case

# 0.18.0 (March 16, 2016)
* By default, the function `authenticate()` of `Auth` class use `TOKEN` method for authentication
* `Auth` class can be specified with witch method of authentication use `BASIC` or `TOKEN`, using the function  `authenticateUsing()`
* Also `authenticationUsing()` can be provided with a `Token.Class` object credentials with the `TOKEN` method, for the reuse of a already existing JWT Token

# 0.17.5 (March 15, 2016)
* Typo

# 0.17.4 (March 15, 2016)
* Renamed package name in definitions bundle to carbonldp. Imports now need to be `carbonldp/Carbon`, etc.

# 0.17.3 (March 15, 2016)
* Added `tsconfig.json` and removed unnecessary exports in the definitions bundle (`dist/bundles/carbon.d.ts`)

# 0.17.2 (March 15, 2016)
* Add missing unit tests.

# 0.17.1 (March 14, 2016)
* Move dev scripts to `npm run-script install-dev` so they don't fail on external `npm install`s

# 0.17.0 (March 11, 2016)
* BasicContainers will now be decorated with `createChild()`
* PersistedDocuments and PersistedFragments will now track their state. Execute `isDirty()` to know if something has changed since it was retrieved
* Changed module type to commonjs so files can be required in nodeJS

# 0.16.1 (March 10, 2016)
* Fix `URI.Util.isBaseOf`, it wasn't handling fragments like it should

# 0.16.0 (March 8, 2016)
* SPARQL queries can now be executed in a Document, Documents or whatever endpoint. The following methods were added:
    * `document.executeRawASKQuery()`
    * `document.executeASKQuery()`
    * `document.executeRawSPARQLQuery()`
    * `document.executeSPARQLQuery()`
    * `document.executeRawConstructQuery()`
    * `document.executeRawDescribeQuery()`
    Those methods are also accessible in `documents` and `SPARQL.Service`
* A definition file has been generated for people that are using JSPM. It can be found in `dist/bundles/carbon.d.ts`

# 0.15.1 (February 22, 2016)
* Changed test browser to Chrome. PhantomJS was giving too many problems
* Fixed `documents.getMembers()`

# 0.15.0 (February 18, 2016)
* `context.documents` can now retrieve the members of a document using `getMembers()`
* `carbon.apps` can no retrieve all accessible appContexts at once with `getAll()`

# 0.14.0 (February 9, 2016)
* Support for Raw ASK, SELECT, DESCRIBE and CONSTRUCT queries
* Documents can create children
## Breaking Changes
* `context.Auth`, `context.Documents` and `context.Apps` were renamed to their lowercase counterpart

# 0.13.0 (February 9, 2016)
* Changed ObjectDescriptions to JSON-LD contexts 'extendObjectSchema'
* Documents can create children
* Support for Raw SPARQL SELECT Queries

# 0.12.0 (November 19, 2015)
* Added Token Authentication support

# 0.11.0 (November 12, 2015)
* Changed RequireJS for JSPM in karma runner

# 0.10.0 (October 31, 2015)
* Changed building process to use gulp instead of grunt
* Added new build form to use Carbon with JSPM and TypeScript
* Added new bundle to import Carbon as a SFX package

# 0.9.0 (October 31, 2015)
* Add initial support for BNodes
* Changed interface to revolve around the Document concept
* Added APIDescription functionality to retrieve CarbonLDP's API description

# 0.8.2 (October 23, 2015)
* Created system to compile distribution files when committing code
* Applied convention of mimicking folder structure with aggregator files

# 0.8.1 (September 14, 2015)
* Added LICENSE files

# 0.8.0 (September 14, 2015)
* Changed source code to Typescript
* Carbon can now be imported as an AMD module

# 0.7.1 (October 16, 2014)
* ETags are now being stored as Date objects.

# 0.7.0 (October 16, 2014)
* SourceLibrary now offers ETag resource verification (resourceHasChanged())
* Retrieving a resource using the cache now validates that it hasn't changed in the server side

# 0.6.0 (October 15, 2014)
* All Applications available can be pulled one or all at the same time.

# 0.5.0 (October 13, 2014)
* Multiple RDF Sources can be pulled at the same time.
* The Literal module supports objects.
* Created the App module for the Auth module.

# 0.4.0 (October 2, 2014)
* RDF Sources can now be created
* Started the support for BasicContainer
* Literals can now be properly casted
* SPARQL SELECT and ASK queries can now be executed
* Started the modularization of the SDK
* More stuff...

# 0.3.0 (September 19, 2014)
* RDF Sources can be retrieved
* RDF Sources keep track on their changes
* RDF Sources can be committed (and use PATCH to do it)

# 0.2.0 (September 18, 2014)
* Carbon can now be initialized.
* Carbon's API version can now be retrieved.

# 0.1.0 (August 06, 2014)
* Creation of the project