# Architecture

The following diagram exposes the base elements that form the structure of the SDK:
[![Architecture Diagram][diagram]][diagram]

## Contexts

Central point of access of the functionality inside the SDK.
The main elements of every context are:
  - `baseURI`. The domain of the resources the context can manage.
  - `respository`. Interface to the available requests in the domain.
  - `registry`. Manage the resources inside the context's domain.
  - `JSONLDConverter`. Has the capabilities to convert JSON-LD into simple JS objects.
  - ObjectSchema methods. Methods that manage the schemas that has the information for a better JSON-LD conversion.
  
There are different implementation of context inside the SDK:
  - `AbstractContext`. Base implementation of the general functionality.
  - `DocumentsContext`. The context for the `Document`s of the platform. It add the real-time functionality of the Platform.
  - `CarbonLDP`. The exposed context for the user that add submodules, version and the endpoint of the root document of the Platform.
  - `GlobalContext`. A context that exposes a singleton that shares the common information of the Platform and is used for share them to the `CarbonLDP` contexts and also to manage external resources of the `CarbonLDP` domain.

## Repositories

The repositories has the methods to of the available request of the context domain.

Since the repository of the `CarbonLDP` has is multiple methods, these are grouped and separated in different traits that later will be composed to create `DocumentRespository`:
- `EventEmitterDocumentsRepositoryTrait`. Methods fro the real-time subscriptions.
- `SPARQLDocumentsRepositoryTrait`. Methods for making SPARQL queries.
- `LDPDocumentsRepositoryTrait`. Methods for the CRUD and LDP action requests.
- `QueryableDocumentsRepositoryTrait`. Methods for partial reading of documents.

The `$Repository` element has the same functionality, but the methods are preceded with a `$` symbol,
since this interface is to describe resources functionality and to avoid data overlap its content are described by this symbol.

Therefore the `Document` resource is a repository, which functionality is also separated in multiple traits:
- `$EventEmitterDocumentTrait`
- `$SPARQLDocumentRepositoryTrait`
- `$LDPDocumentRepositoryTrait`
- `$QueryableDocumentRepositoryTrait`

## Registries

The registries are the elements in charge to store and provide resources in the domain of certain context.

The purpose of the registries is to always have the same reference for every specific resource,
allowing to relate resources an access that related information easier.

Similar to the repositories, there is `$Registry` interface declaring the `$` methods equivalents
that manage resources inside resources.
In the case of `Document`s, this sub-resources are called `Fragments` (Named Fragments/Blank Nodes).

## Models

The models are representations of specific types of resources.<br>
Its name should be the same as the slug of the `rdf:type` that describe the resource.

There are three kinds of models:
- **Base**:<br>
  Interface that contains the basic information to create a **Transient** type.<br>
  Its name is formed by the model name preceded by the `Base` word,
  e.g. for the model _Document_, the interface will be `BaseDocument`. 
- **Transient**:<br>
  Interface that represents a resource before it has been persisted into the Platform.<br>
  Its name is formed by the model name preceded by the `Transient` word,
  e.g. for the model _Document_, the interface will be `TransientDocument`.
- **Persisted**:<br>
  Interface that represents a resource that already has a stored representation in the platform.<br>
  Its name is the same as the model,
  e.g. for the model _Document_, the interface will be `Document`.

Every type of model should be created in a different file,
inside a directory with the name of the model:
```text
src/
└── Document/
	├── BaseDocument.ts
	├── TransientDocument.ts
	└── Document.ts
```

For the **Transient** and **Persisted** models, there is a type alias describing
the factory and utilities methods of that models. To create the type is to unite
the already interfaces described inside [`carbonldp/Model`](../src/Model/index.ts).<br>
The names will be created adding the `Factory` word after the interface name,
e.g. for `TransientDocument` the type will be `TransientDocumentFactory`.

But for the implementation, it will be a constant with the same name of the model.
e.g. for `TransientDocument` the constant will be `TransientDocument`.
This will merge the types making easier to use the type and factory at the same time.  

```text
Document/
├── BaseDocument.ts
│	└── BaseDocument [interface]
├── TransientDocument.ts
│	├── TransientDocument [interface]
│	├── TransientDocumentFactory [type]
│	└── TransientDocument [const]
└── Document.ts
	├── Document [interface]
	├── DocumentFactory [type]
	└── Document [const]
```

---

For more detailed information, read the [API Reference documentation](https://carbonldp.github.io/carbonldp-js-sdk/). 


<!-- Links -->
[diagram]: https://www.lucidchart.com/publicSegments/view/56af8fa0-f27e-497c-98aa-da24012ebfa4/image.png
