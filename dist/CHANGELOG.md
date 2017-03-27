# 0.41.0 (2017/01/25)

- Created HTML based API documentation that can be read in the `docs` folder
- Completed #108  - Add label for optional attributes of interfaces
- Completed #127 - Implement the `If-None-Match` header for the `documents.refresh()` method
- Completed #128 - Add support for retrieving the same updated document from the server in the same request of creation or modification
- Fixed #102 - Move the addition of the factory decorator for persisted app roles to the app context
- Fixed #104 - When extending an object schema, if a property is repeated, the last one will override the original
- Fixed #111 - Fix type of agents in persisted roles interface
- Fixed #114 - Error asking if URI is relative to another one
- Fixed #115 - Error when retrying to persist an object after the server sent an error
- Fixed #118 - Incorrect product brand name
- Fixed #116 - Throws an specific error if a URI outside the current context is requested
- Fixed #119 - Missing `description` property for roles
- Fixed minor issue linking some types in the documentation
- Fixed error that does not maintained the reference object of a named fragment when persisting a new child document

# 0.40.0 (2016/10/27)

- Completed #99 - Properties declared in the schema can be declared with a relative `@id` that will be resolved when needed with the default vocabulary of the current context
- Completed #91 - Add methods to persist multiple children and access points
    - Added `context.documents.createChildren()` and `context.documents.createChildrenAndRetrieve()`
    - Added `persistedDocument.createChildren()` and `persistedDocument.createChildrenAndRetrieve()`
- Completed #89 - Add missing interfaces' documentation
- Resolved #94 - Change the documentation TOC to display only the classes and interfaces
- Fixed #96 - Error due to a circular reference between fragments of a document
- Fixed #90 - Change the form some generics were used
- Fixed some errors in the documentation
- Updated typescript to ^2.0.6

#### Breaking Changes
- Renamed `Carbon.RDF.RDFNode` to `Carbon.RDF.Node`

# 0.39.0 (October 12, 2016)

- Completed [LDP-818](https://jira.base22.com/browse/LDP-818) - Specify `@type` with relative URIs
    `@type` in schemas will now be resolved with the `xsd` namespace by default:
    
    ```
    carbon.extendObjectSchema( {
        "title": {
            "@id": "ex:title",
            "@type": "string" // Same as "xsd:string"
        }
    } );
    ```

- Now `context.documents.createChild()` and `context.documents.createChildAndRetrieve()` returns an object of type `T & PersistedProtectedDocument.Class`
- Now `context.auth.roles.createChild()` returns an object of type `T & Carbon.Auth.PersistedRole.Class`
- Now `Carbon.Auth.PersistedRole.Class` and `Carbon.Auth.PersistedAgent.Class` extends from `Carbon.PersistedProtectedDocument.Class`
- Add the permissions URIs into `Carbon.NS.CS.Class` class.
- Completed [LDP-832](https://jira.base22.com/browse/LDP-832): Allow schema properties without `@id`.
 
    The URI of the properties will be resolved with the default vocabulary in the expansion and compression of a document. If there isn't a default vocabulary an `InvalidJSONLDSyntaxError` will be thrown. This helps to specify the type of a property that has previously been declared with the default vocabulary. Declaring the following schema, it specify that the property `defaultVocabulary:arrayProperty` is an array of strings:
 
    ```typescript
        context.extendObjectSchema( {
            "xsd": "http://www.w3.org/2001/XMLSchema#",
            "arrayProperty": {
                "@type": "xsd:string",
                "@container": "@set",
            },
        } );
    ```

- Made decorators in `context.documents` dynamic
- Added `context.documents.removePointer()` method, used only internally
- Reused code between `context.documents.createChild()` and `context.documents.createAccessPoint()` methods
- Moved some Utils functions from `RDF.Value` to `RDF.Node` module
- Now `JSONLD.Converter` uses the Utils functions of `RDF.Node` module
- Set types of bindings results in `SPARQL.SELECTResults` module
- Exported version inside `package.json` into `Carbon.ts` object at build
 
- Fixed [LDP-797](https://jira.base22.com/browse/LDP-797) - Add missing `createChild()` method in `Carbon.Auth.PersistedRole.Class`
- Fixed [LDP-827](https://jira.base22.com/browse/LDP-827) - Errors with multiple `@list` on a single property

# 0.38.0 (September 08, 2016)

- [LDP-800](https://jira.base22.com/browse/LDP-800) - Revert changes from a PersistedDocument
    - Add `persistedDocument.revert()` method that reverts any change made to the document
    - Add `persistedFragment.revert()` method that reverts any change made to the fragment
    - Add `persistedNamedFragment.revert()` method that reverts any change made to the named fragment
- Fix [LDP-796](https://jira.base22.com/browse/LDP-796) - NodeJS strips the port from the configured domain
- Fix [LDP-801](https://jira.base22.com/browse/LDP-801) - Add missing `@language` property to JSON-LD
- Fix documentation error in `context.documents.createChild()` method
- Fix documentation error in `apps.create()` method
- Fix [LDP-810](https://jira.base22.com/browse/LDP-810) - Documentation error

# 0.37.0 (August 22, 2016)

- [LDP-531](https://jira.base22.com/browse/LDP-531) - Create an App Role
    - Add `Role`, `App.Role` modules, in memory representation of the role to create
    - Add `Roles`, `App.Roles` modules, classes that help manage the roles of the context
    - Add `appContext.auth.roles` property, an instance of `App.Roles` module
    - Add `roles.createChild()` method that helps create a new app role
- [LDP-532](https://jira.base22.com/browse/LDP-532) - Retrieve an App Role
    - Add `PersistedRole`, `App.PersistedRole` modules, persisted representation of a role
    - Add the `roles.get` method that helps retrieve a role from the server
- [LDP-533](https://jira.base22.com/browse/LDP-533) - List the agents from an App Role
    - Add `roles.listAgents()` and `role.listAgents()` methods that retrieve a list of UNRESOLVED persisted agents
    - Add `roles.getAgents()` and `role.getAgents()` methods that retrieve a list of RESOLVED persisted agents
- [LDP-534](https://jira.base22.com/browse/LDP-534) - Add Agents to an App Role
    - Add `roles.addAgent()` and `role.addAgent()` methods that add an agent to a specified role
    - Add `roles.addAgents()` and `role.addAgents()` methods that add multiple agents to a specified role
- [LDP-535](https://jira.base22.com/browse/LDP-535) - Remove Agents from an App Role
    - Add `roles.removeAgent` and `role.removeAgent` methods that remove an agent from the specified role
    - Add `roles.removeAgents` and `role.removeAgents` methods that remove multiple agents from the specified role
- [LDP-525](https://jira.base22.com/browse/LDP-525) - Retrieve an Agent Profile
    - Add `agents.get` method which retrieves an agent from the server
    - Add `Auth.PersistedAgent` module that represents a retrieved agent
- [LDP-521](https://jira.base22.com/browse/LDP-521) - Register a Platform Agent, [LDP-522](https://jira.base22.com/browse/LDP-522) - Retrieve a Platform Agent
    - Creates `Platform`, `Platform.Auth`, `Platform.Agents` and `Platform.PersistedAgent` modules.
    - `Platform.Auth` and `Platform.Agents` extends their respective abstract classes in `Auth` that already have implemented the `register()` and `get()` methods.
- [LDP-527](https://jira.base22.com/browse/LDP-527) - Delete an App Agent, 
- [LDP-523](https://jira.base22.com/browse/LDP-523) - Delete a Platform Agent
    - Add `agents.delete()` method that helps you to delete a specified agent
- [LDP-526](https://jira.base22.com/browse/LDP-526) - Activate/Deactivate an Agent
    - Add `agents.enable()` and `persistedAgent.enable()` methods
    - Add `agents.disable()` and `persistedAgent.disable()` methods
- [LDP-530](https://jira.base22.com/browse/LDP-530) - Delete an App
    - Add `apps.delete()` method that helps delete an entire Application
- Remove jsonld.js dependency
- Fix [LDP-769](https://jira.base22.com/browse/LDP-769) - Fragments don't have helper functions for types
    - Move decoration of helper functions to `Resource` module
    - Add support for relative and prefixed types in PersistedFragments
    
#### Breaking Changes

- Move `Carbon.Agents` module to `Carbon.Auth.Agents`
- Move `context.agents` property to `context.auth.agents`
- Rename `agents.create()` method to `agents.register()`
- Move `Carbon.Agent` module to `Carbon.Auth.Agent`
- `auth.authenticatedAgent` is now a `Carbon.Auth.PersistedAgent.Class` object
- `token.agent` is now a `Carbon.Auth.PersistedAgent.Class` object

# 0.36.0 (August 03, 2016)
- [LDP-507](https://jira.base22.com/browse/LDP-507) Parse server errors. When receiving an HTTP.Error, you can now access properties that provide more information such as:
    - `errors`: An array of errors. The platform can detect several errors per request, e.g. several invalid properties
        - `carbonCode`: A carbon specific code that serves as a reference of the error. It can be sent to the support team when submitting an issue
        - `message`: A string detailing the error in a more human friendly way
    - `requestID`: A unique ID assigned to the request sent to the platform. This ID needs to be sent when reporting bugs so the request can be tracked
- [LDP-506](https://jira.base22.com/browse/LDP-506) Execute SPARQL Updates. The following methods have been added:
    - `documents.executeUPDATE()`
    - `persistedDocument.executeUPDATE()`
- [LDP-536](https://jira.base22.com/browse/LDP-536) Retrieve a `cs:ProtectedDocument`'s ACL
    - `persistedProtectedDocument.getACL()`
- [LDP-537](https://jira.base22.com/browse/LDP-537) Modify and save an ACL. `PersistedACL`s have now the following methods:
    - `grant()`
    - `deny()`
    - `configureChildInheritance()`
    - `grants()`
    - `denies()`
    - `getChildInheritance()`
    - `remove()`
    - `removeChildInheritance()`
- [LDP-746](https://jira.base22.com/browse/LDP-746) - Get the current authenticated agent
    - Add `context.auth.authenticatedAgent` property. It contains the current authenticated agent
    - Add `token.agent` property that also contains the Agent that has been authenticated with `"TOKEN"` method
- Many method signatures are now generic. Before, something like this needed to be done if we were expecting a specific type on a persisted document:
  
    ```typescript
    interface Project {
        name:string;
        tasks:Task[];
    }
  
    documents.get( "some-project/" ).then( ( [ document, response ]:[ PersistedDocument.Class, HTTP.Response.Class ] ) => {
        let project:Project & PersistedDocument.Class = <any> document; // Ugly :(
        console.log( project.name );
    });
    ```
    
    Now we can use the generic version of the `get` method and call it like this:
    
    ```typescript
    interface Project {
        name:string;
        tasks:Task[];
    }

    documents.get<Project>( "some-project/" ).then( ( [ project, response ]:[ Project & PersistedDocument.Class, HTTP.Response.Class ] ) => {
        console.log( project.name );
    });
    ```
    
    The changed methods are:
    
    - `documents.get` / `persistedDocument.get`
    - `documents.createChild` / `persistedDocument.createChild`
    - `documents.getChildren` / `persistedDocument.getChildren`
    - `documents.getMembers` / `persistedDocument.getMembers`
    - `documents.createAccessPoint` / `persistedDocument.createAccessPoint`
    - `documents.save` / `persistedDocument.save`
    - `documents.refresh` / `persistedDocument.refresh`

- Add `documents.createChildAndRetrieve` / `persistedDocument.createChildAndRetrieve`, methods that create a child and automatically retrieve it to make sure the returned 
    `ProtectedDocument.Class` has all the document's information.
- Change several methods so they return already decorated pointers. Before, if you wanted to create a child of a just created child you needed to do something like this:

    ```typescript

    documents.createChild( "some-project/" ).then( ( [ pointer, response ]:[ Pointer.Class, HTTP.Response.Class ] ) => {
        console.log( "createChild" in pointer ); // false
        return pointer.resolve();
    }).then( ( [ persistedDocument, response ]:[ PersistedDocument.Class, HTTP.Response.Class ] ) => {
        console.log( "createChild" in persistedDocument ); // true
        return persistedDocument.createChild( ... );
    });
    ```
    
    Now, the method decorates the pointer as a `PersistedDocument.Class` and even though it doesn't resolve its missing properties, methods like `createChild` can be immediately
    called on it:
    
    ```typescript
    
    documents.createChild( "some-project/" ).then( ( [ persistedDocument, response ]:[ PersistedDocument.Class, HTTP.Response.Class ] ) => {
        console.log( "createChild" in persistedDocument ); // true
        return persistedDocument.createChild( ... );
    });
    ```
    
- [LDP-730](https://jira.base22.com/browse/LDP-730) - Save and refresh a document
    - Add `documents.saveAndRefresh` / `persistedDocument.saveAndRefresh` methods
- Methods now reuse objects instead of creating new ones for the `Pointer.Class`/`PersistedDocument.Class` results. For example, before the SDK acted like this:

    ```typescript
    let objectToPersist:any = {
        someProperty: [
            {
                property: "Hello"
            },
            {
                property: "World"
            }
        ]
    }
    
    documents.createChild( "/", objectToPersist ).then( ( [ pointer, response ]:[ Pointer.Class, HTTP.Response.Class ] ) => {
        console.log( pointer === objectToPersist ); // false
        console.log( "someProperty" in pointer ); // false
    });
    ```
    
    But now it will reuse the objects like this:
    
    ```typescript
    let objectToPersist:any = {
        someProperty: [
            {
                property: "Hello"
            },
            {
                property: "World"
            }
        ]
    }
    
    documents.createChild( "/", objectToPersist ).then( ( [ document, response ]:[ PersistedDocument.Class, HTTP.Response.Class ] ) => {
        console.log( document === objectToPersist ); // true
        console.log( "someProperty" in pointer ); // true
        console.log( document.someProperty[ 0 ] === objectToPersist.someProperty[ 0 ] ); // true
        console.log( document.someProperty[ 1 ] === objectToPersist.someProperty[ 1 ] ); // true
    });
    ```

- [LDP-712](https://jira.base22.com/browse/LDP-712) - Convert any nested object into a fragment when saving the document.
    - Add private `document._normalize()` method that convert nested objects and remove unreferenced BlankNodes.
    - Add `document.removeNamedFragment()` method that remove the specified NamedFragment.
- [LDP-729](https://jira.base22.com/browse/LDP-729) - Support adding relative and prefixed types to a Document
    - Add `addType()`, `hasType()` and `removeType()` methods to `Document` and `PersistedDocument`.
    - Add support for prefixed URIs in `getPointer()` methods.
- Fix [LDP-709](https://jira.base22.com/browse/LDP-709) - Error when refreshing documents with an array of fragments
- Fix [LDP-658](https://jira.base22.com/browse/LDP-658) - Corrections in documentation and README
- Fix [LDP-721](https://jira.base22.com/browse/LDP-721) - `apps.getAllContext` brings all applications visible to an agent
- Fix [LDP-741](https://jira.base22.com/browse/LDP-741) - Listing members of an AccessPoint that doesn't have members throws an Error

#### Breaking Changes
- `documents.createChild()` signature was changed. `slug` is now the third argument instead of the second one
- `documents.createAccessPoint()` signature was changed. `slug` is now the third argument instead of the second one
- `persistedDocument.createChild()` signature was changed. `slug` is now the second argument instead of the first one
- `persistedDocument.createAccessPoint()` signature was changed. `slug` is now the second argument instead of the first one
- `apps.create()` signature was changed. `slug` is now the second argument instead of the first one
- `agents.create()` signature was changed. `slug` is now the second argument instead of the first one
- `document.removeFragment()` is now private. To remove fragments simply remove any reference the document or named fragments have of it.

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