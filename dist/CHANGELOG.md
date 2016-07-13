# 0.35.1 (June 27, 2016)
- Improve how fragments are refreshed

# 0.35.0 (June 20, 2016)
- [LDP-685](https://jira.base22.com/browse/LDP-685) - Authenticate a URL with an Auth Ticket
    - Added `auth.createTicket()`
    - Added `auth.getAuthenticatedURL()`
    - Added `documents.getDownloadURL()`
    - Added `documents.getDownloadURL()`

# 0.34.1 (June 16, 2016)
- Fix [LDP-672](https://jira.base22.com/browse/LDP-672) - Fragments with double #
- Fix [LDP-686](https://jira.base22.com/browse/LDP-686) - `getMembers` deletes container and membershipResource properties

# 0.34.0 (May 26, 2016)
- [LDP-637](https://jira.base22.com/browse/LDP-637) Update test and build workflows to latest JSPM version
- [LDP-662](https://jira.base22.com/browse/LDP-662) Definitions are no longer being bundled. Instead the npm package has been refactored so all definition files work with a node moduleResolution

#### Breaking Changes
- The definition file `dist/bundles/carbon.d.ts` no longer exists. Configure typescript to have a `moduleResolution: "node"` and the definition files should be included automatically

# 0.33.0 (May 17, 2016)
- [LDP-637](https://jira.base22.com/browse/LDP-637) Resolve URI strings when property is configured as "@id"
- [LDP-635](https://jira.base22.com/browse/LDP-635) Use default app vocabulary for unknown properties
- [LDP-607](https://jira.base22.com/browse/LDP-607) Fix compatibility with Safari
- Fix minor issue where literals with long @type were ignored

# 0.32.0 (May 13, 2016)
- [LDP-631](https://jira.base22.com/browse/LDP-631) Retrieve document members and/or children in the same request
    - Added `persistedDocument.getMembers()` method
    - Added `persistedDocument.getChildren()` method
- [LDP-634](https://jira.base22.com/browse/LDP-634) Create fragments/namedFragments from an object with nested objects
- [LDP-635](https://jira.base22.com/browse/LDP-635) Use the app's default vocabulary for unknown properties (not defined in the objectSchema)

#### Breaking Changes
- `persistedDocument.getMembers()` has been renamed to `persistedDocument.listMembers()`
- `persistedDocument.getChildren()` has been renamed to `persistedDocument.listChildren()`

# 0.31.0 (May 4th, 2016) :rocket::star:
- [LDP-608](https://jira.base22.com/browse/LDP-608) Initial support for Node.js

# 0.30.0 (April 28, 2016)
- [LDP-498](https://jira.base22.com/browse/LDP-498)
    - Added `persistedDocument.refresh()` method, which lets you refresh a document with the latest version on the server
- Fixed bug, changes to the object schema were not reflected unless they were tied to a type
- Fixed bug, extending the object schema specifying a type polluted the general object schema

# 0.29.1 (April 26, 2016)
- Fixed [LDP-630](https://jira.base22.com/browse/LDP-630), resolving the same resource at the same time throws an error
- Fixed [LDP-629](https://jira.base22.com/browse/LDP-629), IllegalArgumentError when resolving a document that was already resolved

# 0.29.0 (April 22, 2016)
- Added `context.documents.removeAllMembers()`
- Added `context.documents.getChildren()` method, which lets you obtain all the children of a container
- Fixed a bug in `LDP.DirectContainer.Factory.createFrom` where sending an undefined `hasMemberRelation` would trigger unexpected behaviour

# 0.28.0 (April 14, 2016)
- Added `context.documents.removeMember()` method, which lets you remove a single member reference to a Container
- Added `context.documents.removeMember()` method, same as `persistedContainer.removeMember()`
- Added `context.documents.removeMembers()` method, which lets you remove a multiple members references to a Container
- Added `context.documents.removeMembers()` method, same as `persistedContainer.removeMembers()`

# 0.27.0 (April 14, 2016)
- Added `context.documents.addMember()` method, which lets you add a single member reference to a Container
- Added `context.documents.addMember()` method, same as `persistedContainer.addMember()`
- Added `context.documents.addMembers()` method, which lets you add a multiple members references to a Container
- Added `context.documents.addMembers()` method, same as `persistedContainer.addMembers()`

#### Breaking Changes
- Changed `context.documents.delete()` method, now it accepts a document URI and not a PersistedDocument object

# 0.26.0 (April 14, 2016)
- Added `persistedContainer.getMembers()` method, which lets you obtain the members of the Container

#### Breaking Changes
- Renamed `app.allowsOrigin` property to `app.allowsOrigins`, and now it is an array of `Pointer.Class` or `string`.

# 0.25.1 (April 12, 2016)
- `Document.Factory.createFrom()` now accepts a object with nested object properties and structures it as a Document with fragments
- `context.documents.createChild()` same ^
- `persistedDocument.createChild()` same ^

# 0.25.0 (April 8, 2016)
- Added `context.documents.exists()` method, which lets you verify if a determined resource exists in the server

# 0.24.0 (April 8, 2016)
- Added `AccessPoint` module
- Added `LDP/DirectContainer` module
- Added `LDP/IndirectContainer` module
- Added `context.documents.createAccessPoint()` method, which lets you create an AccessPoint for a document
- Added `context.documents.createAccessPoint()` method, same as `persistedDocument.createAccessPoint()`
- `context.documents.createChild()` now accepts relative URIs
- `jsonLDConverter` now expands pointers even if they are out of the context's scope

# 0.23.2 (April 8, 2016)
- Added optional description property in `App`
- Added getter for app document in `App.Context`

# 0.23.1 (April 7, 2016)
- Added API documentation in `doc/README.md`

# 0.23.0 (April 7, 2016)
- Added `RDFRepresentation` module

# 0.22.0 (March 31, 2016)
- Added `PersistedApp.Class` interface

# 0.21.2 (March 31, 2016)
- Fixed incorrect export in App module

# 0.21.1 (March 31, 2016)
- Added signature in `HTTP.Request.Service.delete()` to support sending a delete request without a body

# 0.21.0 (March 31, 2016)
- Added `persistedDocument.upload()` method, which lets you upload a file and save it as a child of the document
- Added `context.documents.upload()` method, same as `persistedDocument.upload()`
- Added a signature to `HTTP.Request.Service.send()` to support sending Blobs as the request's body

# 0.20.0 (March 30, 2016)
- Added `Agents` module
- Added `Agent` module 
- Added `Agents.create()` method, which lets you persist an Agent

## 0.19.0 (March 30, 2016)
- Added `Apps.create()` method, which lets you persist an App
- Added missing reexports in `Carbon`
- Added signature `Apps.getContext( app:Carbon.Pointer.Class )` to reuse already resolved apps
- Added `version` property to `Carbon` instances to make it easier to retrieve the SDK version

#### Breaking Changes
- Renamed `Apps.get()` to `Apps.getContext()`
- Renamed `Apps.getAll()` to `Apps.getAllContexts()`
- Moved `App.Context` to its own file in `Carbon/App/Context`

## 0.18.1 (March 28, 2016)
- Fixed case sensitiveness issue with http response/request headers
- Added `HTTP.Response.getHeader()` method, which helps retrieve a header independently of the header's case

## 0.18.0 (March 16, 2016)
- By default, the function `authenticate()` of `Auth` class use `TOKEN` method for authentication
- `Auth` class can be specified with witch method of authentication use `BASIC` or `TOKEN`, using the function  `authenticateUsing()`
- Also `authenticationUsing()` can be provided with a `Token.Class` object credentials with the `TOKEN` method, for the reuse of a already existing JWT Token

## 0.17.5 (March 15, 2016)
- Typo

## 0.17.4 (March 15, 2016)
- Renamed package name in definitions bundle to carbonldp. Imports now need to be `carbonldp/Carbon`, etc.

## 0.17.3 (March 15, 2016)
- Added `tsconfig.json` and removed unnecessary exports in the definitions bundle (`dist/bundles/carbon.d.ts`)

## 0.17.2 (March 15, 2016)
- Add missing unit tests.

## 0.17.1 (March 14, 2016)
- Move dev scripts to `npm run-script install-dev` so they don't fail on external `npm install`s

## 0.17.0 (March 11, 2016)
- BasicContainers will now be decorated with `createChild()`
- PersistedDocuments and PersistedFragments will now track their state. Execute `isDirty()` to know if something has changed since it was retrieved
- Changed module type to commonjs so files can be required in nodeJS

## 0.16.1 (March 10, 2016)
- Fix `URI.Util.isBaseOf`, it wasn't handling fragments like it should

## 0.16.0 (March 8, 2016)
- SPARQL queries can now be executed in a Document, Documents or whatever endpoint. The following methods were added:
    - `document.executeRawASKQuery()`
    - `document.executeASKQuery()`
    - `document.executeRawSPARQLQuery()`
    - `document.executeSPARQLQuery()`
    - `document.executeRawConstructQuery()`
    - `document.executeRawDescribeQuery()`
    Those methods are also accessible in `documents` and `SPARQL.Service`
- A definition file has been generated for people that are using JSPM. It can be found in `dist/bundles/carbon.d.ts`

## 0.15.1 (February 22, 2016)
- Changed test browser to Chrome. PhantomJS was giving too many problems
- Fixed `documents.getMembers()`

## 0.15.0 (February 18, 2016)
- `context.documents` can now retrieve the members of a document using `getMembers()`
- `carbon.apps` can no retrieve all accessible appContexts at once with `getAll()`

## 0.14.0 (February 9, 2016)
- Support for Raw ASK, SELECT, DESCRIBE and CONSTRUCT queries
- Documents can create children
# ##Breaking Changes
- `context.Auth`, `context.Documents` and `context.Apps` were renamed to their lowercase counterpart

## 0.13.0 (February 9, 2016)
- Changed ObjectDescriptions to JSON-LD contexts 'extendObjectSchema'
- Documents can create children
- Support for Raw SPARQL SELECT Queries

## 0.12.0 (November 19, 2015)
- Added Token Authentication support

## 0.11.0 (November 12, 2015)
- Changed RequireJS for JSPM in karma runner

## 0.10.0 (October 31, 2015)
- Changed building process to use gulp instead of grunt
- Added new build form to use Carbon with JSPM and TypeScript
- Added new bundle to import Carbon as a SFX package

## 0.9.0 (October 31, 2015)
- Add initial support for BNodes
- Changed interface to revolve around the Document concept
- Added APIDescription functionality to retrieve CarbonLDP's API description

## 0.8.2 (October 23, 2015)
- Created system to compile distribution files when committing code
- Applied convention of mimicking folder structure with aggregator files

## 0.8.1 (September 14, 2015)
- Added LICENSE files

## 0.8.0 (September 14, 2015)
- Changed source code to Typescript
- Carbon can now be imported as an AMD module

## 0.7.1 (October 16, 2014)
- ETags are now being stored as Date objects.

## 0.7.0 (October 16, 2014)
- SourceLibrary now offers ETag resource verification (resourceHasChanged())
- Retrieving a resource using the cache now validates that it hasn't changed in the server side

## 0.6.0 (October 15, 2014)
- All Applications available can be pulled one or all at the same time.

## 0.5.0 (October 13, 2014)
- Multiple RDF Sources can be pulled at the same time.
- The Literal module supports objects.
- Created the App module for the Auth module.

## 0.4.0 (October 2, 2014)
- RDF Sources can now be created
- Started the support for BasicContainer
- Literals can now be properly casted
- SPARQL SELECT and ASK queries can now be executed
- Started the modularization of the SDK
- More stuff...

## 0.3.0 (September 19, 2014)
- RDF Sources can be retrieved
- RDF Sources keep track on their changes
- RDF Sources can be committed (and use PATCH to do it)

## 0.2.0 (September 18, 2014)
- Carbon can now be initialized.
- Carbon's API version can now be retrieved.

## 0.1.0 (August 06, 2014)
- Creation of the project