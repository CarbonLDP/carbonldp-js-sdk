# Architecture

The following diagram exposes the base elements that form the structure of the SDK:
[![Architecture Diagram][diagram]][diagram]

## Contexts

Central point of access to the functionality inside the SDK.
The main elements of every context are:
  - `baseURI`. The domain of the resources the context can manage.
  - `repository`. Manages the request methods of the context's domain. See [Repositories](#repositories)
  - `registry`. Manages the resources inside the context's domain. See [Registries](#registries)
  - `JSONLDConverter`. Has the capabilities to convert JSON-LD into simple JS objects.
  - ObjectSchema methods. Methods that manage the schemas that have the information for a better JSON-LD conversion.
  
There are different implementations of context inside the SDK:
  - `Context`. Interface with the description of the minimum methods a context should have.
  - `AbstractContext`. Base implementation of the general functionality.
  - `DocumentsContext`. The context for the `Document`s of the platform. It also adds the real-time service that can connect to the Carbon LDP platform broker.
  - `CarbonLDP`. The exposed context for the user that adds submodules, version, and the endpoint of the root document of the platform.
  - `GlobalContext`. Context that exposes a singleton that shares the common information of the platform. It is used to share this information to the `CarbonLDP` contexts and also, to manage external resources from the `CarbonLDP` domain.

## Repositories

The repositories have the methods to perform the available requests of the context domain.

The different repositories inside the SDK are:
  - `Repository`. Base interface that describes the minimum requests of any repository, i.e. CRUD methods.
  - `GeneralRepository`. Similar to the previous one, but it exists to separate a repository that is specialized to work directly for a context.
  - `DocumentsRepository`. The repository that the `DocumentsContext` and the `CarbonLDP` class contain, it has all the multiple services the Carbon LDP platform offers.

Since the `DocumentRepository` has a lot of methods, these are grouped and separated in different traits to have a better scalability:
  - `EventEmitterDocumentsRepositoryTrait`. Methods for the real-time subscriptions.
  - `SPARQLDocumentsRepositoryTrait`. Methods for making SPARQL queries.
  - `LDPDocumentsRepositoryTrait`. Methods for the CRUD and LDP action requests.
  - `QueryableDocumentsRepositoryTrait`. Methods for partially reading documents.

Resources inside the SDK are also repositories, but these are described by the `$Repository` element. 
This repository has the same functionality as one described before, but the methods are preceded with a `$` symbol,
to avoid overlaps between the repository's methods and the data of the resources.

The main resources/repositories inside the SDK are:
  - `ResolvablePointer`. The base resource/repository that has a relation to a context's repository by the `$repository` property, to delegate the behavior and not repeat the implementation code.
  - `Document`. The resource that connects to the `DocumentsRepository`, and therefore also has all the services of the platform.

Due to the same reasons of the `DocumentsRepository`, the `Document` resource also divides its functionality in similar traits:
  - `$EventEmitterDocumentTrait`
  - `$SPARQLDocumentRepositoryTrait`
  - `$LDPDocumentRepositoryTrait`
  - `$QueryableDocumentRepositoryTrait`

## Registries

The registries are the elements in charge of storing and providing resources in a certain context's domain.

The purpose of the registries is to always have the same reference for every specific resource,
allowing users to relate resources and access that related information in an easier way.

Similar to the repositories, there is the `$Registry` interface declaring the `$` methods equivalents
that manage resources inside resources.

The main registries inside the SDK are:
  - `Registry`/`$Registry`. As explained before, the base methods of any registry.
  - `GeneralRegistry`. A specialized registry to work directly for a context.
  - `DocumentsRegistry`. The registry that the `DocumentsContext` and the `CarbonLDP` class contain, it manages the `Document` resources.
  - `Document`. Also, a registry that stores sub-resources called `Fragments` (Named Fragments/Blank Nodes).

## Models

The models are representations of specific types of resources.<br>
Its name should be the same as the slug of the `rdf:type` that describes the resource.

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
the factory and utilities methods of those models. To create the type is to unite
the interfaces already described inside [`carbonldp/Model`](../src/Model/index.ts).<br>
The names will be created adding the `Factory` word after the interface name,
e.g. for `TransientDocument` the type will be `TransientDocumentFactory`.

However, for the implementation, the name will be a constant with the same name of the model.
e.g. for `TransientDocument` the constant will be `TransientDocument`.
This will merge the types making it easier to use the type and factory at the same time. 

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

Since the models are representations of real data, their properties are the alias defined in object schemas added into the context.
For properties and methods that are extension from the SDK, a `$` symbol needs to be added at the beginning to avoid the overlapping of data.

This is to follow the respective `$` convention of registries and repositories that have interfaces that help as base for some models.

Remember, preceding with `_` is a common convention to mark a private property, but since we are already preceding with a `$` symbol,
the private properties will be started by `$_` or `$__`, where:
  - `$_`, is for private properties that can be used anywhere in the SDK.
  - `$__`, is for private properties that can only be used within the class/interface where it has been declared.

---

For more detailed information, read the [API Reference documentation](https://carbonldp.github.io/carbonldp-js-sdk/). 


<!-- Links -->
[diagram]: https://www.lucidchart.com/publicSegments/view/56af8fa0-f27e-497c-98aa-da24012ebfa4/image.png
