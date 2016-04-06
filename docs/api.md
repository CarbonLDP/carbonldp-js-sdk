# CarbonLDP SDK API description


## Carbon <a name="Carbon"></a>




### Class Carbon

> Principal class that contains all references for use the SDK.

#### Reexports

			
| Export name | Original Location | 
| --- | --- |
| Agent | [Carbon/Agent](#Carbon-Agent) |
| Agents | [Carbon/Agents](#Carbon-Agents) |
| App | [Carbon/App](#Carbon-App) |
| Apps | [Carbon/Apps](#Carbon-Apps) |
| Auth | [Carbon/Auth](#Carbon-Auth) |
| Document | [Carbon/Document](#Carbon-Document) |
| Documents | [Carbon/Documents](#Carbon-Documents) |
| Errors | [Carbon/Errors](#Carbon-Errors) |
| Fragment | [Carbon/Fragment](#Carbon-Fragment) |
| HTTP | [Carbon/HTTP](#Carbon-HTTP) |
| JSONLDConverter | [Carbon/JSONLDConverter](#Carbon-JSONLDConverter) |
| LDP | [Carbon/LDP](#Carbon-LDP) |
| NamedFragment | [Carbon/NamedFragment](#Carbon-NamedFragment) |
| NS | [Carbon/NS](#Carbon-NS) |
| ObjectSchema | [Carbon/ObjectSchema](#Carbon-ObjectSchema) |
| Persisted | [Carbon/Persisted](#Carbon-Persisted) |
| PersistedApp | [Carbon/PersistedApp](#Carbon-PersistedApp) |
| PersistedDocument | [Carbon/PersistedDocument](#Carbon-PersistedDocument) |
| PersistedFragment | [Carbon/PersistedFragment](#Carbon-PersistedFragment) |
| PersistedNamedFragment | [Carbon/PersistedNamedFragment](#Carbon-PersistedNamedFragment) |
| PersistedResource | [Carbon/PersistedResource](#Carbon-PersistedResource) |
| Pointer | [Carbon/Pointer](#Carbon-Pointer) |
| RDF | [Carbon/RDF](#Carbon-RDF) |
| Resource | [Carbon/Resource](#Carbon-Resource) |
| SDKContext | [Carbon/SDKContext](#Carbon-SDKContext) |
| SPARQL | [Carbon/SPARQL](#Carbon-SPARQL) |
| Utils | [Carbon/Utils](#Carbon-Utils) |

#### Constructor

```typescript 
Carbon( settings?:any ) 
```

**Parameters**

- settings 

#### Properties

```typescript 
static version:string 
```

Returns the version of the SDK

```typescript 
version:string 
```

Returns the version of the SDK

#### Methods


##### resolve

```typescript 
resolve( uri:string ):string 
```

Resolve the URI provided in the context of the instance, this information is provided in the settings object.

**Parameters**

- uri 

##### getAPIDescription

```typescript 
getAPIDescription():Promise<Carbon.APIDescription.Class> 
```

Returns the API description of the connected platform in the instance of Carbon


## Carbon/APIDescription <a name="Carbon-APIDescription"></a>




## Carbon/AbstractContext <a name="Carbon-AbstractContext"></a>




### Class Carbon.AbstractContext

> Abstract class for defining contexts


#### Constructor

```typescript 
AbstractContext() 
```


#### Properties



#### Methods


##### resolve

```typescript 
resolve( relativeURI:string ):string 
```

Abstract method which implementation must resolve the URI provided in the scope of the application.

**Parameters**

- relativeURI 


## Carbon/Agents <a name="Carbon-Agents"></a>




### Class Carbon.Agents.Class

> Class for manage Agents of a determined context.


#### Constructor

```typescript 
Class() 
```




## Carbon/Agents/Agent <a name="Carbon-Agents-Agent"></a>




### Class Carbon.Agents.Agent.Factory

> Factory class for `Carbon.Agents.Agent.Class` objects




#### Methods

##### hasClassProperties

```typescript 
static hasClassProperties( resource:Object ):boolean 
```

Returns true if the object provided has the properties that defines a `Carbon.Agents.Agent.Class` object

**Parameters**

- resource 

##### is

```typescript 
static is( object:Object ):boolean 
```

Returns true if the object provided is considered as an `Carbon.Agents.Agent.Class` object

**Parameters**

- object 

##### create

```typescript 
static create( name:string,  email:string ):Carbon.Agents.Agent.Class 
```

Create a `Carbon.Agents.Agent.Class` object with the name and email specified.

**Parameters**

- name 
- email 

##### createFrom

```typescript 
static createFrom( object:T extends Object ):T & Carbon.Agents.Agent.Class 
```

Create a `Carbon.Agents.Agent.Class` object with the object provided.

**Parameters**

- object 



## Carbon/App <a name="Carbon-App"></a>


### Reexports

		
| Export name | Original Location | 
| --- | --- |
| App | [Carbon/App/Context](#Carbon-App-Context) |


### Class Carbon.App.Factory

> Factory class for `Carbon.App.Class` objects




#### Methods

##### hasClassProperties

```typescript 
static hasClassProperties( resource:Object ):boolean 
```

Returns true if the object provided has the properties that defines a `Carbon.App.Class` object

**Parameters**

- resource 

##### is

```typescript 
static is( object:Object ):boolean 
```

Returns true if the object provided is considered as an `Carbon.App.Class` object

**Parameters**

- object 

##### create

```typescript 
static create( name:string ):Carbon.App.Class 
```

Create a empty `Carbon.App.Class` object.

**Parameters**

- name 

##### createFrom

```typescript 
static createFrom( object:T extends Object ):T & Carbon.App.Class 
```

Create a `Carbon.App.Class` object with the object provided.

**Parameters**

- object 



## Carbon/App/Context <a name="Carbon-App-Context"></a>




### Class Carbon.App.Context

> Class that represents a Carbon Application. It centers the scope of several services (Carbon.Auth, Carbon.Resources, etc.) into the Application's scope.


#### Constructor

```typescript 
Context( parentContext:Carbon.Context,  app:Carbon.App.Context ) 
```

**Parameters**

- parentContext 
- app 

#### Properties



#### Methods


##### resolve

```typescript 
resolve( uri:string ):string 
```

Resolve the URI provided in the scope of the application

**Parameters**

- uri 


## Carbon/Apps <a name="Carbon-Apps"></a>




### Class Carbon.Apps.Class

> Class for obtaining Carbon Apps.


#### Constructor

```typescript 
Class( context:Carbon.Context ) 
```

**Parameters**

- context : A context from where Carbon Apps can be obtained


#### Methods


##### getAllContexts

```typescript 
getAllContexts():Promise<Carbon.Apps.AppContext[]> 
```

Obtains all the `Carbon.Apps.AppContext` objects of every app where the context of the Apps instance can reach.

##### create

```typescript 
create( appDocument:Carbon.Apps.App.Class ):Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class> 
```

Persists an App Document in the server, generating a unique slug.
Returns a Pointer for the stored App Document, and the response of the call.

**Parameters**

- appDocument 

```typescript 
create( slug:string,  appDocument:Carbon.Apps.App.Class ):Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class> 
```

Persists an App Document in the server using the slug specified.
Returns a Pointer for the stored App Document, and the response of the call.

**Parameters**

- slug 
- appDocument 


## Carbon/Auth <a name="Carbon-Auth"></a>


### Reexports

		
| Export name | Original Location | 
| --- | --- |
| AuthenticationToken | [Carbon.Auth.AuthenticationToken](#Carbon-Auth-AuthenticationToken) |
| Authenticator | [Carbon.Auth.Authenticator](#Carbon-Auth-Authenticator) |
| BasicAuthenticator | [Carbon.Auth.BasicAuthenticator](#Carbon-Auth-BasicAuthenticator) |
| Token | [Carbon.Auth.Token](#Carbon-Auth-Token) |
| TokenAuthenticator | [Carbon.Auth.TokenAuthenticator](#Carbon-Auth-TokenAuthenticator) |
| UsernameAndPasswordToken | [Carbon.Auth.UsernameAndPasswordToken](#Carbon-Auth-UsernameAndPasswordToken) |


### Class Carbon.Auth.Class

> Class for manage all the methods of authentication.


#### Constructor

```typescript 
Class() 
```



#### Methods


##### isAuthenticated

```typescript 
isAuthenticated( askParent?:boolean ):boolean 
```

Returns true the user is authenticated.

**Parameters**

- askParent 

##### authenticate

```typescript 
authenticate( username:string,  password:string ):Promise<Carbon.Auth.Credentials> 
```

Authenticate the user with an `username` and `password`. Uses the `TOKEN` method for the authentication.

**Parameters**

- username 
- password 

##### authenticateUsing

```typescript 
authenticateUsing( method:'BASIC',  username:string,  password:string ):Promise<Carbon.Auth.UsernameAndPasswordCredentials.Class> 
```

Authenticates the user with Basic HTTP Authentication, witch uses encoded username and password.

**Parameters**

- method 
- username 
- password 

```typescript 
authenticateUsing( method:'TOKEN',  username:string,  password:string ):Promise<Carbon.Auth.Token.Class> 
```

Authenticates the user with username and password, and generates a JSON Web Token (JWT) credentials.

**Parameters**

- method 
- username 
- password 

```typescript 
authenticateUsing( method:'TOKEN',  token:Carbon.Auth.Token.Class ):Promise<Carbon.Auth.Token.Class> 
```

Authenticates the user with a JSON Web Token (JWT), i.e. the credentials generated by TokenAuthenticator.

**Parameters**

- method 
- token 

##### addAuthentication

```typescript 
addAuthentication( options:Carbon.HTTP.Request.Options ): 
```

Add the authentication header to a `Carbon.HTTP.Request.Options` object.

**Parameters**

- options 

##### clearAuthentication

```typescript 
clearAuthentication(): 
```

Deletes the current authentication


## Carbon/Auth/BasicAuthenticator <a name="Carbon-Auth-BasicAuthenticator"></a>




### Class Carbon.Auth.BasicAuthenticator.Class

> 
		Authenticates requests using Basic Authentication
	


#### Constructor

```typescript 
Class() 
```



#### Methods


##### isAuthenticated

```typescript 
isAuthenticated():boolean 
```


			returns true if the instance contains stored credentials.
		

##### authenticate

```typescript 
authenticate( authenticationToken:Carbon.Auth.UsernameAndPasswordToken ):Promise<void> 
```


			Stores credentials to authenticate future requests.
		

**Parameters**

- authenticationToken 

##### addAuthentication

```typescript 
addAuthentication( requestOptions:Carbon.HTTP.Request.Options ):Carbon.HTTP.Request.Options 
```


			Adds the Basic authentication header to the passed request options object.
		

**Parameters**

- requestOptions : Request options object to add Authentication headers.

##### clearAuthentication

```typescript 
clearAuthentication(): 
```


			Clears any saved credentials and restores the Authenticator to its initial state.
		

##### supports

```typescript 
supports( authenticationToken:Carbon.Auth.AuthenticationToken ):boolean 
```

Returns true if the Authenticator supports the AuthenticationToken.

**Parameters**

- authenticationToken 


## Carbon/Auth/Token <a name="Carbon-Auth-Token"></a>




### Class Carbon.Auth.Token.Factory





#### Methods

##### is

```typescript 
static is( value:any ):boolean 
```

Duck tape tests if the value sent is a Token object

**Parameters**

- value 

##### hasClassProperties

```typescript 
static hasClassProperties( object:Object ):boolean 
```

Returns true if the object provided has the necessary information to be utilized as a object of type `Carbon.Auth.Token.Class`

**Parameters**

- object 


##### decorate

```typescript 
decorate( object:T extends Object ):Carbon.Auth.Token.Class 
```

Adds any necessary data to the object provided to be utilized as a type `Carbon.Auth.Token.Class`

**Parameters**

- object 

##### hasRDFClass

```typescript 
hasRDFClass( pointer:Carbon.Pointer.Class ):boolean 
```

Description

**Parameters**

- pointer 

```typescript 
hasRDFClass( expandedObject:Object ):boolean 
```

Description

**Parameters**

- expandedObject 


## Carbon/Auth/TokenAuthenticator <a name="Carbon-Auth-TokenAuthenticator"></a>




### Class Carbon.Auth.TokenAuthenticator.Class

> 
		Authenticates requests using Basic Authentication
	


#### Constructor

```typescript 
Class( context:Carbon.Context ) 
```

**Parameters**

- context : The context where to authenticate the agent.


#### Methods


##### isAuthenticated

```typescript 
isAuthenticated():boolean 
```


			returns true if the instance contains stored credentials.
		

##### authenticate

```typescript 
authenticate( authenticationToken:Carbon.Auth.UsernameAndPasswordToken ):Promise<Carbon.Auth.Token.Class> 
```

Stores credentials to authenticate future requests.

**Parameters**

- authenticationToken 

```typescript 
authenticate( token:Carbon.Auth.Token.Class ):Promise<Carbon.Auth.Token.Class> 
```

Stores credentials to authenticate future requests.

**Parameters**

- token 

##### addAuthentication

```typescript 
addAuthentication( requestOptions:Carbon.HTTP.Request.Options ):Carbon.HTTP.Request.Options 
```


			Adds the Basic authentication header to the passed request options object.
		

**Parameters**

- requestOptions : Request options object to add Authentication headers.

##### clearAuthentication

```typescript 
clearAuthentication(): 
```


			Clears any saved credentials and restores the Authenticator to its initial state.
		

##### supports

```typescript 
supports( authenticationToken:Carbon.Auth.AuthenticationToken ):boolean 
```

Returns true if the Authenticator supports the AuthenticationToken.

**Parameters**

- authenticationToken 


## Carbon/Auth/UsernameAndPasswordToken <a name="Carbon-Auth-UsernameAndPasswordToken"></a>




### Class Carbon.Auth.UsernameAndPasswordToken.Class

> Wrapper for manage an Authentication Token in form of UserName/Password


#### Constructor

```typescript 
Class( username:string,  password:string ) 
```

**Parameters**

- username 
- password 

#### Properties




## Carbon/Document <a name="Carbon-Document"></a>




### Class Carbon.Document.Factory

> Factory class for Document objects.




#### Methods

##### hasClassProperties

```typescript 
static hasClassProperties( documentResource:Object ):boolean 
```

Returns true if the object provided has the properties and functions of a Document object

**Parameters**

- documentResource 

##### create

```typescript 
static create( uri:string ):Carbon.Document.Class 
```

Creates an empty Document object which reference to the URI provided.

**Parameters**

- uri 

```typescript 
static create():Carbon.Document.Class 
```

Creates an empty Document object.

##### createFrom

```typescript 
static createFrom( object:T extends Object,  uri:string ):Carbon.Document.Class 
```

Creates a Document object from the object provided and will reference to the URI provided.

**Parameters**

- object 
- uri 

```typescript 
static createFrom():Carbon.Document.Class 
```

Creates a Document object from the object provided.

##### decorate

```typescript 
static decorate( object:T extends Object ):T & Carbon.Document.Class 
```

Adds the properties and method necessary for a Document object.

**Parameters**

- object 



## Carbon/Documents <a name="Carbon-Documents"></a>




## Carbon/Errors <a name="Carbon-Errors"></a>


### Reexports

		
| Export name | Original Location | 
| --- | --- |
| IDAlreadyInUseError | [Carbon/Errors/IDAlreadyInUseError](#Carbon-Errors-IDAlreadyInUseError) |
| IllegalActionError | [Carbon/Errors/IllegalActionError](#Carbon-Errors-IllegalActionError) |
| IllegalArgumentError | [Carbon/Errors/IllegalArgumentError](#Carbon-Errors-IllegalArgumentError) |
| IllegalStateError | [Carbon/Errors/IllegalStateError](#Carbon-Errors-IllegalStateError) |
| NotImplementedError | [Carbon/Errors/NotImplementedError](#Carbon-Errors-NotImplementedError) |


## Carbon/Errors/AbstractError <a name="Carbon-Errors-AbstractError"></a>




### Class Carbon.Errors.AbstractError



#### Constructor

```typescript 
AbstractError( message:string ) 
```

**Parameters**

- message 

#### Properties



#### Methods


##### toString

```typescript 
toString():string 
```

Returns a string representation


## Carbon/Errors/IDAlreadyInUseError <a name="Carbon-Errors-IDAlreadyInUseError"></a>




### Class Carbon.Errors.IDAlreadyInUseError

> Error class to indicates that an ID is already in use



#### Properties




## Carbon/Errors/IllegalActionError <a name="Carbon-Errors-IllegalActionError"></a>




### Class Carbon.Errors.IllegalActionError

> Error class that indicates a illegal action



#### Properties




## Carbon/Errors/IllegalArgumentError <a name="Carbon-Errors-IllegalArgumentError"></a>




### Class Carbon.Errors.IllegalArgumentError

> Error class that indicates an illegal argument was provided to in a function



#### Properties




## Carbon/Errors/IllegalStateError <a name="Carbon-Errors-IllegalStateError"></a>




### Class Carbon.Errors.IllegalStateError

> Error class that can be thrown to show an illegal state, meaning an state that the application is not supposed to reach.


#### Constructor

```typescript 
IllegalStateError( message?:string ) 
```

**Parameters**

- message 

#### Properties



#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/Errors/NotImplementedError <a name="Carbon-Errors-NotImplementedError"></a>




### Class Carbon.Errors.NotImplementedError

> Error class that indicates a function that is still not implemented


#### Constructor

```typescript 
NotImplementedError( message?:string ) 
```

**Parameters**

- message 

#### Properties



#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/Fragment <a name="Carbon-Fragment"></a>




### Class Carbon.Fragment.Factory

> Factory class for Fragment objects.




#### Methods

##### hasClassProperties

```typescript 
static hasClassProperties( resource:Object ):boolean 
```

Returns true if the object provided has the properties and functions of a Fragment object

**Parameters**

- resource 

##### create

```typescript 
static create( id:string,  document:Carbon.Document.Class ):Carbon.Fragment.Class 
```

Creates a Fragment with the ID provided for the document specified.

**Parameters**

- id 
- document 

```typescript 
static create( document:Carbon.Document.Class ):Carbon.Fragment.Class 
```

Create a Blank Node Fragment since no ID is provided for the specified document.

**Parameters**

- document 

##### createFrom

```typescript 
static createFrom( object:T extends Object,  id:string,  document:Carbon.Document.Class ):T & Carbon.Fragment.Class 
```

Creates a Fragment from an Object with the ID provided for the document specified.

**Parameters**

- object 
- id 
- document 

```typescript 
static createFrom( object:T extends Object,  document:Carbon.Document.Class ):Carbon.Fragment.Class 
```

Create a Blank Node Fragment since no ID is provided for the specified document.

**Parameters**

- object 
- document 




> Class with useful options for Fragment objects




#### Methods

##### generateID

```typescript 
static generateID(): 
```

Returns an ID for a BlankNode using an universally unique identifier (UUID).



## Carbon/HTTP <a name="Carbon-HTTP"></a>


### Reexports

		
| Export name | Original Location | 
| --- | --- |
| Errors | [Carbon/HTTP/Errors](#Carbon-HTTP-Errors) |
| Header | [Carbon/HTTP/Header](#Carbon-HTTP-Header) |
| JSONParser | [Carbon/HTTP/JSONParser](#Carbon-HTTP-JSONParser) |
| JSONLDParser | [Carbon/HTTP/JSONLDParser](#Carbon-HTTP-JSONLDParser) |
| Method | [Carbon/HTTP/Method](#Carbon-HTTP-Method) |
| Parser | [Carbon/HTTP/Parser](#Carbon-HTTP-Parser) |
| Request | [Carbon/HTTP/Request](#Carbon-HTTP-Request) |
| Response | [Carbon/HTTP/Response](#Carbon-HTTP-Response) |
| StatusCode | [Carbon/HTTP/StatusCode](#Carbon-HTTP-StatusCode) |
| StringParser | [Carbon/HTTP/StringParser](#Carbon-HTTP-StringParser) |


## Carbon/HTTP/Errors <a name="Carbon-HTTP-Errors"></a>


### Reexports

		
| Export name | Original Location | 
| --- | --- |
| Error | [Carbon/HTTP/Errors/HTTPError](#Carbon-HTTP-Errors-HTTPError) |
| BadRequestError | [Carbon/HTTP/Errors/client/BadRequestError](#Carbon-HTTP-Errors-client-BadRequestError) |
| ConflictError | [Carbon/HTTP/Errors/client/ConflictError](#Carbon-HTTP-Errors-client-ConflictError) |
| ForbiddenError | [Carbon/HTTP/Errors/client/ForbiddenError](#Carbon-HTTP-Errors-client-ForbiddenError) |
| MethodNotAllowedError | [Carbon/HTTP/Errors/client/MethodNotAllowedError](#Carbon-HTTP-Errors-client-MethodNotAllowedError) |
| NotAcceptableError | [Carbon/HTTP/Errors/client/NotAcceptableError](#Carbon-HTTP-Errors-client-NotAcceptableError) |
| NotFoundError | [Carbon/HTTP/Errors/client/NotFoundError](#Carbon-HTTP-Errors-client-NotFoundError) |
| PreconditionFailedError | [Carbon/HTTP/Errors/client/PreconditionFailedError](#Carbon-HTTP-Errors-client-PreconditionFailedError) |
| PreconditionRequiredError | [Carbon/HTTP/Errors/client/PreconditionRequiredError](#Carbon-HTTP-Errors-client-PreconditionRequiredError) |
| RequestEntityTooLargeError | [Carbon/HTTP/Errors/client/RequestEntityTooLargeError](#Carbon-HTTP-Errors-client-RequestEntityTooLargeError) |
| RequestHeaderFieldsTooLargeError | [Carbon/HTTP/Errors/client/RequestHeaderFieldsTooLargeError](#Carbon-HTTP-Errors-client-RequestHeaderFieldsTooLargeError) |
| RequestURITooLongError | [Carbon/HTTP/Errors/client/RequestURITooLongError](#Carbon-HTTP-Errors-client-RequestURITooLongError) |
| TooManyRequestsError | [Carbon/HTTP/Errors/client/TooManyRequestsError](#Carbon-HTTP-Errors-client-TooManyRequestsError) |
| UnauthorizedError | [Carbon/HTTP/Errors/client/UnauthorizedError](#Carbon-HTTP-Errors-client-UnauthorizedError) |
| UnsupportedMediaTypeError | [Carbon/HTTP/Errors/client/UnsupportedMediaTypeError](#Carbon-HTTP-Errors-client-UnsupportedMediaTypeError) |
| BadResponseError | [Carbon/HTTP/Errors/client/BadResponseError](#Carbon-HTTP-Errors-client-BadResponseError) |
| BadGatewayError | [Carbon/HTTP/Errors/client/BadGatewayError](#Carbon-HTTP-Errors-client-BadGatewayError) |
| GatewayTimeoutError | [Carbon/HTTP/Errors/client/GatewayTimeoutError](#Carbon-HTTP-Errors-client-GatewayTimeoutError) |
| HTTPVersionNotSupportedError | [Carbon/HTTP/Errors/client/HTTPVersionNotSupportedError](#Carbon-HTTP-Errors-client-HTTPVersionNotSupportedError) |
| InternalServerErrorError | [Carbon/HTTP/Errors/client/InternalServerErrorError](#Carbon-HTTP-Errors-client-InternalServerErrorError) |
| NotImplementedError | [Carbon/HTTP/Errors/client/NotImplementedError](#Carbon-HTTP-Errors-client-NotImplementedError) |
| ServiceUnavailableError | [Carbon/HTTP/Errors/client/ServiceUnavailableError](#Carbon-HTTP-Errors-client-ServiceUnavailableError) |
| UnknownError | [Carbon/HTTP/Errors/client/UnknownError](#Carbon-HTTP-Errors-client-UnknownError) |


## Carbon/HTTP/Errors/BadRequestError <a name="Carbon-HTTP-Errors-BadRequestError"></a>




### Class Carbon.HTTP.Errors.BadRequestError

> Error class that can be throw to indicate has been send a request that doesn


#### Constructor

```typescript 
BadRequestError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/ConflictError <a name="Carbon-HTTP-Errors-ConflictError"></a>




### Class Carbon.HTTP.Errors.ConflictError

> Error class that can be throw to indicate that the request could not be processed because of conflict in the request, such as an ID conflict


#### Constructor

```typescript 
ConflictError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/ForbiddenError <a name="Carbon-HTTP-Errors-ForbiddenError"></a>




### Class Carbon.HTTP.Errors.client.ForbiddenError

> Error class that can be throw to indicate that the current user does not have permissions to fulfill the request


#### Constructor

```typescript 
ForbiddenError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/HTTPError <a name="Carbon-HTTP-Errors-HTTPError"></a>




### Class Carbon.HTTP.Errors.HTTPError

> Error class for define any type of HTTP Error occurred


#### Constructor

```typescript 
HTTPError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/UnknownError <a name="Carbon-HTTP-Errors-UnknownError"></a>




### Class Carbon.HTTP.Errors.UnknownError

> Error class that defines any error that can not be identified


#### Constructor

```typescript 
UnknownError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/client/MethodNotAllowedError <a name="Carbon-HTTP-Errors-client-MethodNotAllowedError"></a>




### Class Carbon.HTTP.Errors.client.MethodNotAllowedError

> Error class that can be throw to indicate that the current user does not have the required permissions to fulfill the request


#### Constructor

```typescript 
MethodNotAllowedError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/client/NotAcceptableError <a name="Carbon-HTTP-Errors-client-NotAcceptableError"></a>




### Class Carbon.HTTP.Errors.client.NotAcceptableError

> Error class that can be throw to indicate that the server cannot respond with the accept-header specified in the request


#### Constructor

```typescript 
NotAcceptableError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/client/NotFoundError <a name="Carbon-HTTP-Errors-client-NotFoundError"></a>




### Class Carbon.HTTP.Errors.client.NotFoundError

> Error class that can be throw to indicate that the resource was not found


#### Constructor

```typescript 
NotFoundError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/client/PreconditionFailedError <a name="Carbon-HTTP-Errors-client-PreconditionFailedError"></a>




### Class Carbon.HTTP.Errors.client.PreconditionFailedError

> Error class that can be throw to indicate that the precondition header was resolved to false


#### Constructor

```typescript 
PreconditionFailedError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/client/PreconditionRequiredError <a name="Carbon-HTTP-Errors-client-PreconditionRequiredError"></a>




### Class Carbon.HTTP.Errors.client.PreconditionRequiredError

> Error class that can be throw to indicate that the request is missing a precondition header


#### Constructor

```typescript 
PreconditionRequiredError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/client/RequestEntityTooLargeError <a name="Carbon-HTTP-Errors-client-RequestEntityTooLargeError"></a>




### Class Carbon.HTTP.Errors.client.RequestEntityTooLargeError

> Error class that can be throw to indicate that the request entity is larger than the server is able to process


#### Constructor

```typescript 
RequestEntityTooLargeError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/client/RequestHeaderFieldsTooLargeError <a name="Carbon-HTTP-Errors-client-RequestHeaderFieldsTooLargeError"></a>




### Class Carbon.HTTP.Errors.client.RequestHeaderFieldsTooLargeError

> Error class that can be throw to indicate that the server is no able to process the request because its header fields are too large


#### Constructor

```typescript 
RequestHeaderFieldsTooLargeError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/client/RequestURITooLongError <a name="Carbon-HTTP-Errors-client-RequestURITooLongError"></a>




### Class Carbon.HTTP.Errors.client.RequestURITooLongError

> Error class that can be throw to indicate that the server is no able to process the request because its URI is too long


#### Constructor

```typescript 
RequestURITooLongError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/client/TooManyRequestsError <a name="Carbon-HTTP-Errors-client-TooManyRequestsError"></a>




### Class Carbon.HTTP.Errors.client.TooManyRequestsError

> Error class that can be throw to indicate that the current user has sent too many request in a given amount of time


#### Constructor

```typescript 
TooManyRequestsError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/client/UnauthorizedError <a name="Carbon-HTTP-Errors-client-UnauthorizedError"></a>




### Class Carbon.HTTP.Errors.client.UnauthorizedError

> Error class that can be throw to indicate that authentication is required or has failed


#### Constructor

```typescript 
UnauthorizedError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/client/UnsupportedMediaTypeError <a name="Carbon-HTTP-Errors-client-UnsupportedMediaTypeError"></a>




### Class Carbon.HTTP.Errors.client.UnsupportedMediaTypeError

> Error class that can be throw to indicate that the request has a media-type not supported by the server


#### Constructor

```typescript 
UnsupportedMediaTypeError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/server/BadGatewayError <a name="Carbon-HTTP-Errors-server-BadGatewayError"></a>




### Class Carbon.HTTP.Errors.server.BadGatewayError

> Error class that can be throw to indicate that the server was acting as a gateway or proxy and received an invalid response from the upstream server


#### Constructor

```typescript 
BadGatewayError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/server/BadResponseError <a name="Carbon-HTTP-Errors-server-BadResponseError"></a>




### Class Carbon.HTTP.Errors.server.BadResponseError

> Error class that can be throw to indicate that the response obtained can not is note the expected or cannot be interpreted


#### Constructor

```typescript 
BadResponseError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/server/GatewayTimeoutError <a name="Carbon-HTTP-Errors-server-GatewayTimeoutError"></a>




### Class Carbon.HTTP.Errors.server.GatewayTimeoutError

> Error class that can be throw to indicate that the server, while acting as a gateway or proxy, did not receive a timely response from the upstream server


#### Constructor

```typescript 
GatewayTimeoutError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/server/HTTPVersionNotSupportedError <a name="Carbon-HTTP-Errors-server-HTTPVersionNotSupportedError"></a>




### Class Carbon.HTTP.Errors.server.HTTPVersionNotSupportedError

> Error class that can be throw to indicate that the server does not support the HTTP protocol version used in the request


#### Constructor

```typescript 
HTTPVersionNotSupportedError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/server/InternalServerErrorError <a name="Carbon-HTTP-Errors-server-InternalServerErrorError"></a>




### Class Carbon.HTTP.Errors.server.InternalServerErrorError

> Error class that can be throw to indicate that the server encountered an unexpected condition. This generic error is given when no more specific message is suitable


#### Constructor

```typescript 
InternalServerErrorError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/server/NotImplementedError <a name="Carbon-HTTP-Errors-server-NotImplementedError"></a>




### Class Carbon.HTTP.Errors.server.NotImplementedError

> Error class that can be throw to indicate that the server does not have the ability to fulfill the request yet


#### Constructor

```typescript 
NotImplementedError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Errors/server/ServiceUnavailableError <a name="Carbon-HTTP-Errors-server-ServiceUnavailableError"></a>




### Class Carbon.HTTP.Errors.server.ServiceUnavailableError

> Error class that can be throw to indicate that the server is currently unavailable (because it is overloaded or down for maintenance)


#### Constructor

```typescript 
ServiceUnavailableError( message:string,  response:Carbon.HTTP.Response ) 
```

**Parameters**

- message 
- response 

#### Properties

```typescript 
static statusCode:number 
```


```typescript 
statusCode:number 
```


#### Methods


##### toString

```typescript 
toString():string 
```



## Carbon/HTTP/Header <a name="Carbon-HTTP-Header"></a>




### Class Carbon.HTTP.Header.Value

> Class wrapper for a string value of a HTTP header


#### Constructor

```typescript 
Value( value:string ) 
```

**Parameters**

- value 


#### Methods


##### toString

```typescript 
toString():string 
```




> Class for have better management of the values in a HTTP header


#### Constructor

```typescript 
Carbon.HTTP.Header.Class( values:Array <Carbon.HTTP.Header.Value> ) 
```

**Parameters**

- values 
```typescript 
Carbon.HTTP.Header.Class( value:string ) 
```

**Parameters**

- value 

#### Properties



#### Methods


##### toString

```typescript 
toString(): 
```

string



> Class with useful options for manage headers




#### Methods

##### parseHeaders

```typescript 
static parseHeaders( headersString:string ):Map <string, Carbon.HTTP.Header.Class> 
```

Returns an Map object, witch relates the all header-names with a `Carbon.HTTP.Header.Class` containing their values

**Parameters**

- headersString 



## Carbon/HTTP/JSONLDParser <a name="Carbon-HTTP-JSONLDParser"></a>




### Class Carbon.HTTP.JSONLDParser.Class

> Class wrapper for native `JSON.parse` using `Promise` pattern




#### Methods


##### parse

```typescript 
parse( body:string ):Promise <Object> 
```


**Parameters**

- body : A JSON string to parse


## Carbon/HTTP/JSONParser <a name="Carbon-HTTP-JSONParser"></a>




### Class Carbon.HTTP.JSONParser.Class

> Class wrapper for native `JSON.parse` using `Promise` pattern




#### Methods


##### parse

```typescript 
parse( body:string ):Promise <Object> 
```


**Parameters**

- body : A JSON string to parse


## Carbon/HTTP/Method <a name="Carbon-HTTP-Method"></a>




## Carbon/HTTP/Request <a name="Carbon-HTTP-Request"></a>




### Class Carbon.HTTP.Request.Service

> Class that have functions to manage HTTP requests




#### Methods

##### send

```typescript 
static send( url:string,  body:string,  options:object ):Promise<Carbon.HTTP.Response> 
```

Generic send method, to be used by the others methods in the class

**Parameters**

- url 
- body 
- options 

##### head

```typescript 
static head( url:string,  options?:object ):Promise<Carbon.HTTP.Response> 
```


**Parameters**

- url 
- options 

##### options

```typescript 
static options( url:string,  options?:object ):Promise<Carbon.HTTP.Response> 
```


**Parameters**

- url 
- options 

##### get

```typescript 
static get( url:string,  options?:object ):Promise<Carbon.HTTP.Response> 
```

Simple get request

**Parameters**

- url 
- options 

```typescript 
static get( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<[Object, Carbon.HTTP.Response]> 
```

Get request with specified parser

**Parameters**

- url 
- options 
- parser 

##### post

```typescript 
static post( url:string,  body:string,  options?:object ):Promise<Carbon.HTTP.Response> 
```

Simple post request

**Parameters**

- url 
- body 
- options 

```typescript 
static post( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response> 
```

Post request with specified parser

**Parameters**

- url 
- options 
- parser 

##### put

```typescript 
static put( url:string,  body:string,  options?:object ):Promise<Carbon.HTTP.Response> 
```

Simple put request

**Parameters**

- url 
- body 
- options 

```typescript 
static put( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response> 
```

Put request with specified parser

**Parameters**

- url 
- options 
- parser 

##### patch

```typescript 
static patch( url:string,  body:string,  options?:object ):Promise<Carbon.HTTP.Response> 
```

Simple patch request

**Parameters**

- url 
- body 
- options 

```typescript 
static patch( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response> 
```

Patch request with specified parser

**Parameters**

- url 
- options 
- parser 

##### delete

```typescript 
static delete( url:string,  body:string,  options?:object ):Promise<Carbon.HTTP.Response> 
```

Simple delete request

**Parameters**

- url 
- body 
- options 

```typescript 
static delete( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response> 
```

Delete request with specified parser

**Parameters**

- url 
- options 
- parser 

```typescript 
static delete( url:string,  options?:object ):Promise<Carbon.HTTP.Response> 
```

Simple delete request

**Parameters**

- url 
- options 

```typescript 
static delete( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response> 
```

Delete request with specified parser

**Parameters**

- url 
- options 
- parser 




> Useful functions for manage the options object of a request




#### Methods

##### getHeader

```typescript 
static getHeader( headerName:string,  requestOptions:Object,  initialize?:boolean ):Carbon.HTTP.Header.Class 
```

Returns the header object of a header-name inside an options object request. Returns `undefined` if the header not exists. If `initialize` flag is provided with true, a empty header will be created even if it already exits

**Parameters**

- headerName 
- requestOptions 
- initialize 

##### setAcceptHeader

```typescript 
static setAcceptHeader( accept:string,  requestOptions:Object ):Object 
```

Set an Accept header in an options object request

**Parameters**

- accept 
- requestOptions 

##### setContentTypeHeader

```typescript 
static setContentTypeHeader( contentType:string,  requestOptions:Object ):Object 
```

Set an Content-Type header in an options object request

**Parameters**

- contentType 
- requestOptions 

##### setIfMatchHeader

```typescript 
static setIfMatchHeader( etag:string,  requestOptions:Object ):Object 
```

Set a If-Match header in an options object request

**Parameters**

- etag 
- requestOptions 

##### setPreferredInteractionModel

```typescript 
static setPreferredInteractionModel( interactionModelURI:string,  requestOptions:Object ):Object 
```

Set a Prefer header with `rel=interaction-model` in an options object request

**Parameters**

- interactionModelURI 
- requestOptions 

##### setSlug

```typescript 
static setSlug( slug:string,  requestOptions:Object ):Object 
```

Set a Slug header in an options object request

**Parameters**

- slug 
- requestOptions 

##### setContainerRetrievalPreferences

```typescript 
static setContainerRetrievalPreferences( preference:Carbon.HTTP.Request.ContainerRetrievalPreferences,  requestOptions:Carbon.HTTP.Request.Options ):Object 
```

Set a Prefer header with `return=representation` in an options object request

**Parameters**

- preference 
- requestOptions 



## Carbon/HTTP/Response <a name="Carbon-HTTP-Response"></a>




### Class Carbon.HTTP.Response.Class

> Class that represents an HTTP Response


#### Constructor

```typescript 
Class( request:XMLHttpRequest ) 
```

**Parameters**

- request 

#### Properties



#### Methods


##### getHeader

```typescript 
getHeader( name:string ):Carbon.HTTP.Header.Class 
```

Return the Header object referred by the name provided.

**Parameters**

- name 



> Class with useful methods to use with a `Carbon.HTTP.Response.Class` object




#### Methods

##### getETag

```typescript 
static getETag( response:Carbon.HTTP.Response.Class ):string 
```

Return the ETag string header of a `Carbon.HTTP.Response.Class` object. Returns null if no ETag exists

**Parameters**

- response 



## Carbon/HTTP/StatusCode <a name="Carbon-HTTP-StatusCode"></a>




## Carbon/HTTP/StringParser <a name="Carbon-HTTP-StringParser"></a>




### Class Carbon.HTTP.StringParser.Class

> Parses a Carbon.HTTP.Response.Class and returns a String




#### Methods


##### parse

```typescript 
parse( body:Carbon.HTTP.Response.Class ):Promise<string> 
```

Gets a string and returns a promise with the same string

**Parameters**

- body 


## Carbon/JSONLDConverter <a name="Carbon-JSONLDConverter"></a>




### Class Carbon.JSONLDConverter.Class






## Carbon/LDP <a name="Carbon-LDP"></a>


### Reexports

		
| Export name | Original Location | 
| --- | --- |
| AccessPoint | [Carbon/LDP/AccessPoint](#Carbon-LDP-AccessPoint) |
| BasicContainer | [Carbon/LDP/BasicContainer](#Carbon-LDP-BasicContainer) |
| Container | [Carbon/LDP/Container](#Carbon-LDP-Container) |
| PersistedContainer | [Carbon/LDP/PersistedContainer](#Carbon-LDP-PersistedContainer) |
| RDFSource | [Carbon/LDP/RDFSource](#Carbon-LDP-RDFSource) |


## Carbon/LDP/AccessPoint <a name="Carbon-LDP-AccessPoint"></a>




### Class Carbon.LDP.AccessPoint.Factory

> Factory class for AccessPoint objects




#### Methods

##### hasClassProperties

```typescript 
static hasClassProperties( resource:Object ):boolean 
```

Returns true if the object has the properties to be defined as a AccessPoint

**Parameters**

- resource 



## Carbon/LDP/BasicContainer <a name="Carbon-LDP-BasicContainer"></a>




### Class Carbon.LDP.BasicContainer.Factory

> Factory class for LDP BasicContainer objects





## Carbon/LDP/Container <a name="Carbon-LDP-Container"></a>




### Class Carbon.LDP.Container.Factory

> Factory class for LDP Container objects




#### Methods

##### hasClassProperties

```typescript 
static hasClassProperties( resource:Carbon.RDF.Node.Class ):boolean 
```

Returns true if the object has the properties to be defined as a LDP Container

**Parameters**

- resource 

##### hasRDFClass

```typescript 
static hasRDFClass( pointer:Carbon.Pointer.Class ):boolean 
```

Returns true if the Pointer provided is an LDP Container.

**Parameters**

- pointer 

```typescript 
static hasRDFClass( expandedObject:Object ):boolean 
```

Returns true if the Object provided is an LDP Container.

**Parameters**

- expandedObject 



## Carbon/LDP/PersistedContainer <a name="Carbon-LDP-PersistedContainer"></a>




### Class Carbon.LDP.PersistedContainer.Factory

> Factory class for LDP PersistedContainer objects




#### Methods

##### hasClassProperties

```typescript 
static hasClassProperties( document:Carbon.Document.Class ):boolean 
```

Returns true if the object has the properties to be defined as a PersistedContainer

**Parameters**

- document 

##### decorate

```typescript 
static decorate( persistedDocument:T extends Carbon.PersistedDocument.Class ):T & Carbon.LDP.PersistedContainer.Class 
```

Returns the PersistedDocuments decorated as a PersistedContainer

**Parameters**

- persistedDocument 



## Carbon/LDP/RDFSource <a name="Carbon-LDP-RDFSource"></a>




### Class Carbon.LDP.RDFSource.Factory

> Factory class for RDFSource objects





## Carbon/NS <a name="Carbon-NS"></a>


### Reexports

		
| Export name | Original Location | 
| --- | --- |
| C | [Carbon/NS/C](#Carbon-NS-C) |
| CP | [Carbon/NS/CP](#Carbon-NS-CP) |
| CS | [Carbon/NS/CS](#Carbon-NS-CS) |
| LDP | [Carbon/NS/LDP](#Carbon-NS-LDP) |
| RDF | [Carbon/NS/RDF](#Carbon-NS-RDF) |
| XSD | [Carbon/NS/XSD](#Carbon-NS-XSD) |
| VCARD | [Carbon/NS/VCARD](#Carbon-NS-VCARD) |


## Carbon/NS/C <a name="Carbon-NS-C"></a>




### Class Carbon.NS.C.Class

> Class that contains objects defined by the Carbon Platform



#### Properties

```typescript 
static AccessPoint:string 
```

```typescript 
static API:string 
```

```typescript 
static NonReadableMembershipResourceTriples:string 
```

```typescript 
static PreferContainmentResources:string 
```

```typescript 
static PreferContainmentTriples:string 
```

```typescript 
static PreferMembershipResources:string 
```

```typescript 
static PreferMembershipTriples:string 
```

```typescript 
static VolatileResource:string 
```


```typescript 
AccessPoint:string 
```

```typescript 
API:string 
```

```typescript 
NonReadableMembershipResourceTriples:string 
```

```typescript 
PreferContainmentResources:string 
```

```typescript 
PreferContainmentTriples:string 
```

```typescript 
PreferMembershipResources:string 
```

```typescript 
PreferMembershipTriples:string 
```

```typescript 
VolatileResource:string 
```




> Class that contains predicates defined by the Carbon Platform



#### Properties

```typescript 
static accessPoint:string 
```

```typescript 
static buildDate:string 
```

```typescript 
static created:string 
```

```typescript 
static modified:string 
```

```typescript 
static version:string 
```


```typescript 
accessPoint:string 
```

```typescript 
buildDate:string 
```

```typescript 
created:string 
```

```typescript 
modified:string 
```

```typescript 
version:string 
```



## Carbon/NS/CP <a name="Carbon-NS-CP"></a>




### Class Carbon.NS.CP.Predicate

> Class that contains predicates defined by Carbon Patch



#### Properties

```typescript 
static ADD_ACTION:string 
```

```typescript 
static SET_ACTION:string 
```

```typescript 
static DELETE_ACTION:string 
```


```typescript 
ADD_ACTION:string 
```

```typescript 
SET_ACTION:string 
```

```typescript 
DELETE_ACTION:string 
```



## Carbon/NS/CS <a name="Carbon-NS-CS"></a>




### Class Carbon.NS.CS.Class

> Class that contains objects defined by Carbon Security



#### Properties

```typescript 
static Application:string 
```

```typescript 
static Token:string 
```

```typescript 
static AllOrigins:string 
```


```typescript 
Application:string 
```

```typescript 
Token:string 
```

```typescript 
AllOrigins:string 
```




> Class that contains predicates defined by Carbon Security



#### Properties

```typescript 
static name:string 
```

```typescript 
static allowsOrigin:string 
```

```typescript 
static rootContainer:string 
```

```typescript 
static tokenKey:string 
```

```typescript 
static expirationTime:string 
```

```typescript 
static password:string 
```


```typescript 
name:string 
```

```typescript 
allowsOrigin:string 
```

```typescript 
rootContainer:string 
```

```typescript 
tokenKey:string 
```

```typescript 
expirationTime:string 
```

```typescript 
password:string 
```



## Carbon/NS/LDP <a name="Carbon-NS-LDP"></a>




### Class Carbon.NS.LDP.Class

> Class that contains objects defined in the W3C Linked Data Platform (LDP) vocabulary



#### Properties

```typescript 
static Resource:string 
```

```typescript 
static RDFSource:string 
```

```typescript 
static Container:string 
```

```typescript 
static BasicContainer:string 
```

```typescript 
static DirectContainer:string 
```

```typescript 
static IndirectContainer:string 
```

```typescript 
static NonRDFSource:string 
```

```typescript 
static MemberSubject:string 
```

```typescript 
static PreferContainment:string 
```

```typescript 
static PreferMembership:string 
```

```typescript 
static PreferEmptyContainer:string 
```

```typescript 
static PreferMinimalContainer:string 
```

```typescript 
static Page:string 
```

```typescript 
static PageSortCriterion:string 
```

```typescript 
static Ascending:string 
```

```typescript 
static Descending:string 
```


```typescript 
Resource:string 
```

```typescript 
RDFSource:string 
```

```typescript 
Container:string 
```

```typescript 
BasicContainer:string 
```

```typescript 
DirectContainer:string 
```

```typescript 
IndirectContainer:string 
```

```typescript 
NonRDFSource:string 
```

```typescript 
MemberSubject:string 
```

```typescript 
PreferContainment:string 
```

```typescript 
PreferMembership:string 
```

```typescript 
PreferEmptyContainer:string 
```

```typescript 
PreferMinimalContainer:string 
```

```typescript 
Page:string 
```

```typescript 
PageSortCriterion:string 
```

```typescript 
Ascending:string 
```

```typescript 
Descending:string 
```




> Class that contains predicates defined in the W3C Linked Data Platform (LDP) vocabulary



#### Properties

```typescript 
static contains:string 
```

```typescript 
static member:string 
```

```typescript 
static hasMemberRelation:string 
```

```typescript 
static isMemberOfRelation:string 
```

```typescript 
static membershipResource:string 
```

```typescript 
static insertedContentRelation:string 
```

```typescript 
static constrainedBy:string 
```

```typescript 
static pageSortCriteria:string 
```

```typescript 
static pageSortOrder:string 
```

```typescript 
static pageSortCollation:string 
```

```typescript 
static pageSequence:string 
```


```typescript 
contains:string 
```

```typescript 
member:string 
```

```typescript 
hasMemberRelation:string 
```

```typescript 
isMemberOfRelation:string 
```

```typescript 
membershipResource:string 
```

```typescript 
insertedContentRelation:string 
```

```typescript 
constrainedBy:string 
```

```typescript 
pageSortCriteria:string 
```

```typescript 
pageSortOrder:string 
```

```typescript 
pageSortCollation:string 
```

```typescript 
pageSequence:string 
```



## Carbon/NS/RDF <a name="Carbon-NS-RDF"></a>




### Class Carbon.NS.RDF.Predicate

> Class that contains predicates defined in the RDF Syntax Specification



#### Properties

```typescript 
static type:string 
```


```typescript 
type:string 
```



## Carbon/NS/VCARD <a name="Carbon-NS-VCARD"></a>




### Class Carbon.NS.VCARD.Predicate

> Class that contains some predicates defined in the vCard Ontology Specification



#### Properties

```typescript 
static email:string 
```


```typescript 
email:string 
```



## Carbon/NS/XSD <a name="Carbon-NS-XSD"></a>




### Class Carbon.NS.XSD.DataType

> DataType that contains data-types defined in the XML Schema Definition Language (XSD)



#### Properties

```typescript 
static date:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#date:string 
```

```typescript 
static dateTime:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#dateTime:string 
```

```typescript 
static duration:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#duration:string 
```

```typescript 
static gDay:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#gDay:string 
```

```typescript 
static gMonth:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#gMonth:string 
```

```typescript 
static gMonthDay:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#gMonthDay:string 
```

```typescript 
static gYear:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#gYear:string 
```

```typescript 
static gYearMonth:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#gYearMonth:string 
```

```typescript 
static time:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#time:string 
```

```typescript 
static byte:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#byte:string 
```

```typescript 
static decimal:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#decimal:string 
```

```typescript 
static int:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#int:string 
```

```typescript 
static integer:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#integer:string 
```

```typescript 
static long:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#long:string 
```

```typescript 
static negativeInteger:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#negativeInteger:string 
```

```typescript 
static nonNegativeInteger:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#nonNegativeInteger:string 
```

```typescript 
static nonPositiveInteger:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#nonPositiveInteger:string 
```

```typescript 
static positiveInteger:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#positiveInteger:string 
```

```typescript 
static short:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#short:string 
```

```typescript 
static unsignedLong:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#unsignedLong:string 
```

```typescript 
static unsignedInt:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#unsignedInt:string 
```

```typescript 
static unsignedShort:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#unsignedShort:string 
```

```typescript 
static unsignedByte:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#unsignedByte:string 
```

```typescript 
static double:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#double:string 
```

```typescript 
static float:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#float:string 
```

```typescript 
static boolean:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#boolean:string 
```

```typescript 
static string:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#string:string 
```

```typescript 
static object:string 
```

```typescript 
static http://www.w3.org/2001/XMLSchema#object:string 
```


```typescript 
date:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#date:string 
```

```typescript 
dateTime:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#dateTime:string 
```

```typescript 
duration:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#duration:string 
```

```typescript 
gDay:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#gDay:string 
```

```typescript 
gMonth:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#gMonth:string 
```

```typescript 
gMonthDay:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#gMonthDay:string 
```

```typescript 
gYear:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#gYear:string 
```

```typescript 
gYearMonth:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#gYearMonth:string 
```

```typescript 
time:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#time:string 
```

```typescript 
byte:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#byte:string 
```

```typescript 
decimal:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#decimal:string 
```

```typescript 
int:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#int:string 
```

```typescript 
integer:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#integer:string 
```

```typescript 
long:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#long:string 
```

```typescript 
negativeInteger:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#negativeInteger:string 
```

```typescript 
nonNegativeInteger:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#nonNegativeInteger:string 
```

```typescript 
nonPositiveInteger:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#nonPositiveInteger:string 
```

```typescript 
positiveInteger:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#positiveInteger:string 
```

```typescript 
short:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#short:string 
```

```typescript 
unsignedLong:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#unsignedLong:string 
```

```typescript 
unsignedInt:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#unsignedInt:string 
```

```typescript 
unsignedShort:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#unsignedShort:string 
```

```typescript 
unsignedByte:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#unsignedByte:string 
```

```typescript 
double:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#double:string 
```

```typescript 
float:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#float:string 
```

```typescript 
boolean:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#boolean:string 
```

```typescript 
string:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#string:string 
```

```typescript 
object:string 
```

```typescript 
http://www.w3.org/2001/XMLSchema#object:string 
```



## Carbon/NamedFragment <a name="Carbon-NamedFragment"></a>




### Class Carbon.NamedFragment.Factory

> Factory class for NamedFragment objects.




#### Methods

##### hasClassProperties

```typescript 
static hasClassProperties( resource:Carbon.Fragment.Class ):boolean 
```

Returns true if the object provided has the properties and functions of a NamedFragment object

**Parameters**

- resource 

##### create

```typescript 
static create( slug:string,  document:Carbon.Document.Class ):Carbon.NamedFragment.Class 
```

Creates a NamedFragment with the Slug provided for the document specified.

**Parameters**

- slug 
- document 

##### createFrom

```typescript 
static createFrom( object:T extends Object,  slug:string,  document:Carbon.Document.Class ):T & Carbon.NamedFragment.Class 
```

Creates a NamedFragment from an Object with the Slug provided for the document specified.

**Parameters**

- object 
- slug 
- document 



## Carbon/ObjectSchema <a name="Carbon-ObjectSchema"></a>




### Class Carbon.ObjectSchema.DigestedObjectSchema

> Class of a standardized Schema.


#### Constructor

```typescript 
DigestedObjectSchema() 
```


#### Properties





> Class for standardized object properties in a Schema.


#### Constructor

```typescript 
Carbon.ObjectSchema.DigestedPropertyDefinition() 
```


#### Properties





> Class with options for standardize a JSON-LD Schema.




#### Methods

##### combineDigestedObjectSchemas

```typescript 
static combineDigestedObjectSchemas( digestedSchemas:Carbon.ObjectSchema.DigestedObjectSchema[] ):Carbon.ObjectSchema.DigestedObjectSchema 
```

Combine several standardized schemas in one.

**Parameters**

- digestedSchemas 



## Carbon/PersistedApp <a name="Carbon-PersistedApp"></a>




### Class Carbon.PersistedApp.Factory

> Factory class for `Carbon.PersistedApp.Class` objects




#### Methods

##### hasClassProperties

```typescript 
static hasClassProperties( resource:Object ):boolean 
```

Returns true if the object provided has the properties that defines a `Carbon.PersistedApp.Class` object

**Parameters**

- resource 

##### is

```typescript 
static is( object:Object ):boolean 
```

Returns true if the object provided is considered as an `Carbon.PersistedApp.Class` object

**Parameters**

- object 



## Carbon/PersistedDocument <a name="Carbon-PersistedDocument"></a>




### Class Carbon.PersistedDocument.Factory

> Factory class for PersistedDocument objects.




#### Methods

##### hasClassProperties

```typescript 
static hasClassProperties( document:Carbon.Document.Class ):boolean 
```

Returns true if the Document provided has the properties and functions of a PersistedDocument object

**Parameters**

- document 

##### is

```typescript 
static is( object:Object ):boolean 
```

Returns true if the element provided is a PersistedDocument object.

**Parameters**

- object 

##### create

```typescript 
static create( uri:string,  documents:Carbon.Documents ):Carbon.PersistedDocument.Class 
```

Creates an empty PersistedDocument object with the URI provided and contained by the Documents object specified.

**Parameters**

- uri 
- documents 

##### createFrom

```typescript 
static createFrom( object:T extends Object,  uri:string ):Carbon.PersistedDocument.Class 
```

Creates a PersistedDocument object from the object and URI provided, with the Documents object specified as container.

**Parameters**

- object 
- uri 

##### decorate

```typescript 
static decorate( object:T extends Object,  documents:Carbon.Documents ):T & Carbon.PersistedDocument.Class 
```

Adds the properties and methods necessary for a PersistedDocument object.

**Parameters**

- object 
- documents 



## Carbon/Pointer <a name="Carbon-Pointer"></a>




### Class Carbon.Pointer.Factory

> Factory class for Pointer objects.




#### Methods

##### hasClassProperties

```typescript 
static hasClassProperties( resource:Object ):boolean 
```

Returns true if the object provided has the properties and functions of a Pointer object

**Parameters**

- resource 

##### is

```typescript 
static is( value:any ):boolean 
```

Returns true if the value provided is a Pinter object.

**Parameters**

- value 

##### create

```typescript 
static create( id?:string ):Carbon.Pointer.Class 
```

Create a Pointer object with id if provided.

**Parameters**

- id 

##### decorate

```typescript 
static decorate( object:T extends Object ):T & Carbon.Pointer.Class 
```

Decorates the object provided with the elements of a Pointer object.

**Parameters**

- object 



## Carbon/RDF <a name="Carbon-RDF"></a>


### Reexports

		
| Export name | Original Location | 
| --- | --- |
| Literal | [Carbon/RDF/Literal](#Carbon-RDF-Literal) |
| Document | [Carbon/RDF/Document](#Carbon-RDF-Document) |
| List | [Carbon/RDF/List](#Carbon-RDF-List) |
| Node | [Carbon/RDF/Node](#Carbon-RDF-Node) |
| URI | [Carbon/RDF/URI](#Carbon-RDF-URI) |
| Value | [Carbon/RDF/Value](#Carbon-RDF-Value) |


## Carbon/RDF/Document <a name="Carbon-RDF-Document"></a>




### Class Carbon.RDF.Document.Factory

> Class Factory to manage creation and management of RDFDocument objects




#### Methods

##### is

```typescript 
static is( object:Object ):boolean 
```

Returns true if the object is an RDFDocument object

**Parameters**

- object 

##### create

```typescript 
static create( resources:Carbon.RDF.RDFNode.Class[],  uri?:string ):Carbon.RDF.RDFDocument.Class 
```

Return an RDFDocument object created with the parameters provided

**Parameters**

- resources 
- uri 




> Class with useful functions for manage RDF Documents




#### Methods

##### getBNodeResources

```typescript 
static getBNodeResources( document:Carbon.RDF.Document.Class ):Carbon.RDF.RDFNode.Class[] 
```

Returns all the resources that refers to blank nodes from a document.
Throw an `Carbon.Errors.IllegalArgumentError` if the object is not RDF like

**Parameters**

- document 




> Async class for parse a JSON-LD string to an array of RDFDocuments




#### Methods


##### parse

```typescript 
parse( input:string ):Promise<any> 
```

Parse the a JSON-LD string to an array of RDFDocuments

**Parameters**

- input 


## Carbon/RDF/List <a name="Carbon-RDF-List"></a>




### Class Carbon.RDF.List.Factory

> Class Factory to manage creation and management of List objects




#### Methods

##### is

```typescript 
static is( value:any ):boolean 
```

Returns true if the object provided can be called a RDF List

**Parameters**

- value 



## Carbon/RDF/Literal <a name="Carbon-RDF-Literal"></a>


### Reexports

		
| Export name | Original Location | 
| --- | --- |
| serializer | [Carbon/RDF/Literal/Serializers](#Carbon-RDF-Literal-Serializers) |


### Class Carbon.RDF.Literal.Factory

> Class Factory to manage creation and management of Literal objects.




#### Methods

##### from

```typescript 
static from(): 
```

Convert the value provided to a Literal object.

##### parse

```typescript 
static parse( literal:Carbon.RDF.Literal.Class ):any 
```

Parse the Literal object to the respective JavaScript type.
Returns null if cannot be parsed.

**Parameters**

- literal 

##### is

```typescript 
static is( value:any ):boolean 
```

Returns true if the object provided can be called a RDF Literal

**Parameters**

- value 

##### hasType

```typescript 
static hasType( value:Carbon.RDF.Literal.Class,  type:string ):boolean 
```

Returns true if the Literal has the type indicated

**Parameters**

- value 
- type 




> Class with useful functions for manage RDF Literals




#### Methods

##### areEqual

```typescript 
static areEqual( literal1:Carbon.RDF.Literal.Class,  literal2:Carbon.RDF.Literal.Class ):boolean 
```

Returns true if two Literals are equal

**Parameters**

- literal1 
- literal2 



## Carbon/RDF/Literal/Serializers <a name="Carbon-RDF-Literal-Serializers"></a>


### Reexports

		
| Export name | Original Location | 
| --- | --- |
| XSD | [Carbon/RDF/Literal/Serializers/XSD](#Carbon-RDF-Literal-Serializers-XSD) |


## Carbon/RDF/Literal/Serializers/XSD <a name="Carbon-RDF-Literal-Serializers-XSD"></a>




### Class Carbon.RDF.Literal.Serializes.XSD.DateSerializer

> Class that can serialize a Date object into a string literal with format `YYY-MM-DD`Instead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.dateSerializer`




#### Methods


##### serialize

```typescript 
serialize( value:any ):string 
```

Returns the string with format `YYY-MM-DD`, of the Date object

**Parameters**

- value 



> Class that can serialize a Date object into a string ISO literalInstead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.dateTimeSerializer`




#### Methods


##### serialize

```typescript 
serialize( value:any ):string 
```

Returns the simplified extended ISO format (ISO 8601) of the Date object

**Parameters**

- value 



> Class that can serialize a Date object into a literal string with format `HH:mm:ss.sssZ`Instead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.timeSerializer`




#### Methods


##### serialize

```typescript 
serialize( value:any ):string 
```

Returns a string representing the Date object with format `HH:mm:ss.sssZ`

**Parameters**

- value 



> Class that can serialize any Number value to a string literal of an integerInstead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.integerSerializer`




#### Methods


##### serialize

```typescript 
serialize( value:any ):string 
```

Returns a string representing a integer from the Number provided

**Parameters**

- value 



> Class that can serialize any Number value to a string literal of an unsigned integerInstead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.unsignedIntegerSerializer`




#### Methods


##### serialize

```typescript 
serialize( value:any ):string 
```

Returns a string representing an unsigned integer from the Number provided

**Parameters**

- value 



> Class that can serialize any Number value to a string literal of floatInstead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.floatSerializer`




#### Methods


##### serialize

```typescript 
serialize( value:any ):string 
```

Returns a string representing a float from the Number provided

**Parameters**

- value 



> Class that can serialize any variable to a string literal representation its truth valueInstead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.booleanSerializer`




#### Methods


##### serialize

```typescript 
serialize( value:any ):string 
```

Returns a string representing the truth value from the variable provided

**Parameters**

- value 



> Class that can serialize any variable to a string literal representation its truth valueInstead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.stringSerializer`




#### Methods


##### serialize

```typescript 
serialize( value:any ):string 
```

Returns a string representing the truth value from the variable provided

**Parameters**

- value 


## Carbon/RDF/RDFNode <a name="Carbon-RDF-RDFNode"></a>




### Class Carbon.RDF.RDFNode.Factory

> Class Factory to manage creation and management of RDFNode objects




#### Methods

##### is

```typescript 
static is( object:Object ):boolean 
```

Returns true when an object can be called an RDFNode

**Parameters**

- object 

##### create

```typescript 
static create( uri:string ):Carbon.RDF.RDFNode.Class 
```

Create a RDFNode object providing an URI string

**Parameters**

- uri 




> Class with useful functions for manage RDFNode objects




#### Methods

##### areEqual

```typescript 
static areEqual( node1:Carbon.RDF.RDFDocument.Class,  node2:Carbon.RDF.RDFDocument.Class ):boolean 
```

Returns true if the objects represent the same resource

**Parameters**

- node1 
- node2 

##### getPropertyURI

```typescript 
static getPropertyURI( node:Carbon.RDF.RDFNode.Class,  predicate:string ):string 
```

Returns the URI from a property resource in the RDFNode object.
Returns null if the property not exists or the URI is not found

**Parameters**

- node 
- predicate 



## Carbon/RDF/URI <a name="Carbon-RDF-URI"></a>




### Class Carbon.RDF.URI.Class

> Wrapper for an URI string value


#### Constructor

```typescript 
Class( stringValue:string ) 
```

**Parameters**

- stringValue : The string that represents an URI


#### Methods


##### toString

```typescript 
toString():string 
```

Returns a string that represents the URI of the class



> CLass with useful functions for managing URI's




#### Methods

##### hasFragment

```typescript 
static hasFragment( uri:string ):boolean 
```

Returns true if the URI provided contains a fragment

**Parameters**

- uri 

##### hasProtocol

```typescript 
static hasProtocol( uri:string ):boolean 
```

Returns true if the URI provided has a protocol

**Parameters**

- uri 

##### isAbsolute

```typescript 
static isAbsolute( uri:string ):boolean 
```

Returns true if the URI provided is absolute

**Parameters**

- uri 

##### isRelative

```typescript 
static isRelative( uri:string ):boolean 
```

Returns true if the URI provided is relative

**Parameters**

- uri 

##### isBNodeID

```typescript 
static isBNodeID( uri:string ):boolean 
```

Returns true if the URI provided reference to a Blank Node

**Parameters**

- uri 

##### isPrefixed

```typescript 
static isPrefixed( uri:string ):boolean 
```

Returns true if the URI provided has a prefix

**Parameters**

- uri 

##### isFragmentOf

```typescript 
static isFragmentOf( fragmentURI:string,  uri:string ):boolean 
```

Returns true if the first URI is a fragment od the second URI provided

**Parameters**

- fragmentURI 
- uri 

##### isBaseOf

```typescript 
static isBaseOf( baseURI:string,  uri:string ):boolean 
```

Return true if the first URI is parent of the second URI provided

**Parameters**

- baseURI 
- uri 

##### getRelativeURI

```typescript 
static getRelativeURI( absoluteURI:string,  base:string ):string 
```

Returns the relative URI from a base URI provided

**Parameters**

- absoluteURI 
- base 

##### getDocumentURI

```typescript 
static getDocumentURI( uri:string ): 
```

Returns the URI that just reference to the Document of the URI provided

**Parameters**

- uri 

##### getFragment

```typescript 
static getFragment( uri:string ):string 
```

Returns the name of the fragment in the URI provided. If no fragment exists in the URI, null will be returned

**Parameters**

- uri 

##### getSlug

```typescript 
static getSlug( uri:string ):string 
```

Returns the slug of the URI. It takes an ending slash as part as the slug.

**Parameters**

- uri 

##### resolve

```typescript 
static resolve( parentURI:string,  childURI:string ):string 
```

Return a URI formed from a parent URI and a relative child URI

**Parameters**

- parentURI 
- childURI 

##### removeProtocol

```typescript 
static removeProtocol( uri:string ):string 
```

Removes the protocol of the URI provided

**Parameters**

- uri 

##### prefix

```typescript 
static prefix( uri:string,  prefix:string,  prefixURI:string ):string 
```

Replace a base of a URI with the prefix provided. If the prefix can not be resolved, the URI provided will be returned

**Parameters**

- uri 
- prefix 
- prefixURI 

```typescript 
static prefix( uri:string,  objectSchema:Carbon.ObjectSchema.DigestedObjectSchema ):string 
```

Replace the base of a URI with a prefix in accordance with the ObjectSchema provided. If the prefix can not be resolved, the URI provided will be returned

**Parameters**

- uri 
- objectSchema 



## Carbon/RDF/Value <a name="Carbon-RDF-Value"></a>




### Class Carbon.RDF.Value.Util

> Class with useful functions for manage RDF Values.




#### Methods

##### areEqual

```typescript 
static areEqual( value1:Carbon.RDF.Value.Class,  value2:Carbon.RDF.Value.Class ):boolean 
```

Returns true if the two Values are considered equal.

**Parameters**

- value1 
- value2 

##### getProperty

```typescript 
static getProperty( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any 
```

Returns the property searched, parsed in accordance to the RDF object it is.
Returns null if the property is not found or cannot be parsed.

**Parameters**

- expandedObject 
- propertyURI 
- pointerLibrary 

##### getPropertyPointer

```typescript 
static getPropertyPointer( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any 
```

Returns the property searched as a Pointer.
Returns null if the property is not found or cannot be parsed as a Pointer.

**Parameters**

- expandedObject 
- propertyURI 
- pointerLibrary 

##### getPropertyLiteral

```typescript 
static getPropertyLiteral( expandedObject:any,  propertyURI:string,  literalType:string ):any 
```

Returns the property searched as a javascript variable. The property must be an RDF Literal.
Returns null if the property is not found, the type provided not match with the type of the Literal, or cannot be parsed from a Literal.

**Parameters**

- expandedObject 
- propertyURI 
- literalType 

##### getPropertyList

```typescript 
static getPropertyList( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any 
```

Returns the property searched as an Array with every element parsed to its respective type of element.
Returns null if the property is not found or cannot be parsed.

**Parameters**

- expandedObject 
- propertyURI 
- pointerLibrary 

##### getPropertyPointerList

```typescript 
static getPropertyPointerList( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any 
```

Returns the property list searched as an Array of Pointers. It will be filtered no pointer values.
Returns null if the property is not found or is not a List.

**Parameters**

- expandedObject 
- propertyURI 
- pointerLibrary 

##### getPropertyLiteralList

```typescript 
static getPropertyLiteralList( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any 
```

Returns the property list searched as an Array of parsed Literals. It will be filtered no Literal values with the type specified.
Returns null if the property is not found or is not a List.

**Parameters**

- expandedObject 
- propertyURI 
- pointerLibrary 

##### getProperties

```typescript 
static getProperties( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any 
```

Returns the property searched as an Array with the parsed Literal, Pointer or List.
Returns null if the property is not found, or an empty array if cannot be parsed.

**Parameters**

- expandedObject 
- propertyURI 
- pointerLibrary 

##### getPropertyPointers

```typescript 
static getPropertyPointers( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any 
```

Returns the property searched as an Array with the parsed Pointer.
Returns null if the property is not found, or an empty array if the property cannot be parsed as a pointer.

**Parameters**

- expandedObject 
- propertyURI 
- pointerLibrary 

##### getPropertyURIs

```typescript 
static getPropertyURIs( expandedObject:any,  propertyURI:string ):any 
```

Returns the URIs of the property searched.
Returns null if the property is not found or an empty array if no URI was found.

**Parameters**

- expandedObject 
- propertyURI 

##### getPropertyLiterals

```typescript 
static getPropertyLiterals( expandedObject:any,  propertyURI:string,  literalType:string ):any 
```

Returns the property searched as an Array with the parsed Literal.
Returns null if the property is not found, or an empty array if cannot be parsed.

**Parameters**

- expandedObject 
- propertyURI 
- literalType 

##### getPropertyLanguageMap

```typescript 
static getPropertyLanguageMap( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any 
```

Returns an object associating the language with the parsed string literal.
Returns null if the property is not found, or an empty object if not is a property with language.

**Parameters**

- expandedObject 
- propertyURI 
- pointerLibrary 

##### getList

```typescript 
static getList( propertyValues:Array<any> ):Carbon.RDF.List.Class 
```

Returns the List object from the provided property of an expanded JSON-LD object.
Returns null if no List object is found.

**Parameters**

- propertyValues 

##### parseValue

```typescript 
static parseValue( propertyValue:Carbon.RDF.Value.Class,  pointerLibrary:Carbon.Pointer.Library ):any 
```

Returns the parsed object from an Literal, Node, or List.
Returns null if cannot be parsed

**Parameters**

- propertyValue 
- pointerLibrary 



## Carbon/Resource <a name="Carbon-Resource"></a>




### Class Carbon.Resource.Factory

> Factory class for Resource objects.




#### Methods

##### hasClassProperties

```typescript 
static hasClassProperties( resource:Object ):boolean 
```

Returns true if the object provided has the properties and functions of a Resource object

**Parameters**

- resource 

##### create

```typescript 
static create( id?:string,  types?:string[] ):Carbon.Resource.Class 
```

Create a Resource object with id and types if provided.

**Parameters**

- id 
- types 

##### createFrom

```typescript 
static createFrom( object:T extends Object,  id?:string,  types?:string[] ):T & Carbon.Resource.Class 
```

Create a Resource object with id and types if provided.

**Parameters**

- object 
- id 
- types 

##### decorate

```typescript 
static decorate( object:T extends Object ):T & Carbon.Resource.Class 
```

Decorates the object provided with the elements of a Resource object.

**Parameters**

- object 



## Carbon/SDKContext <a name="Carbon-SDKContext"></a>




### Class Carbon.SDKContext.Class

> Base class for every Context in the SDK.


#### Constructor

```typescript 
Class() 
```


#### Properties



#### Methods


##### getBaseURI

```typescript 
getBaseURI():string 
```

Returns the base URI of the context, witch for is an empty string for this context.

##### resolve

```typescript 
resolve( relativeURI:string ):string 
```

Returns URI provided resolved in this context, witch is the same URI provided.

**Parameters**

- relativeURI 

##### hasSetting

```typescript 
hasSetting( name:string ):boolean 
```

Returns true if the setting looked for is established in the context.

**Parameters**

- name 

##### getSetting

```typescript 
getSetting( name:string ):string 
```

Returns the value of the setting looked for.
			Returns `null` if no settign with the name specified exists.

**Parameters**

- name 

##### setSetting

```typescript 
setSetting( name:string,  value:any ): 
```

Set a setting in the the context.

**Parameters**

- name 
- value 

##### deleteSetting

```typescript 
deleteSetting( name:string ): 
```

Deletes the setting specified from the the context.

**Parameters**

- name 

##### hasObjectSchema

```typescript 
hasObjectSchema( type:string ):boolean 
```

Returns true if the is an ObjectSchema for the specified type.

**Parameters**

- type 

##### getObjectSchema

```typescript 
getObjectSchema( type?:string ):Carbon.ObjectSchema.DigestedObjectSchema 
```

Returns the ObjectSchema for the specified type or null if not exits.
			If no type specified the general object schema of the context is returned. This is an schema that applies for all the types.

**Parameters**

- type 

##### extendObjectSchema

```typescript 
extendObjectSchema( type:string,  objectSchema:Carbon.ObjectSchema.DigestedObjectSchema ): 
```

Extends an Schema for a specified type of Resource

**Parameters**

- type 
- objectSchema 

```typescript 
extendObjectSchema( objectSchema:Carbon.ObjectSchema.DigestedObjectSchema ): 
```

Extends the General Schema of the context.

**Parameters**

- objectSchema 

##### clearObjectSchema

```typescript 
clearObjectSchema( type?:string ): 
```

Remove the Schema of the type specified, if not provided empty the General Schema.

**Parameters**

- type 


## Carbon/SPARQL <a name="Carbon-SPARQL"></a>


### Reexports

		
| Export name | Original Location | 
| --- | --- |
| RawResultsRawResults | [Carbon/SPARQL/RawResults](#Carbon-SPARQL-RawResults) |
| RawResultsParserRawResultsParser | [Carbon/SPARQL/RawResultsParser](#Carbon-SPARQL-RawResultsParser) |
| ServiceService | [Carbon/SPARQL/Service](#Carbon-SPARQL-Service) |


## Carbon/SPARQL/RawResults <a name="Carbon-SPARQL-RawResults"></a>




### Class Carbon.SPARQL.RawResults

> Class where specifies the types a SPARQL query result can be



#### Properties

```typescript 
static URI:string 
```

```typescript 
static LITERAL:string 
```

```typescript 
static BNODE:string 
```


```typescript 
URI:string 
```

```typescript 
LITERAL:string 
```

```typescript 
BNODE:string 
```




> Factory class for RawResults objects




#### Methods

##### hasClassProperties

```typescript 
static hasClassProperties( value:Object ):boolean 
```

Returns true if the object provided contains the properties required to be a `Carbon.SPARQL.RawResult.Class` object

**Parameters**

- value 

##### is

```typescript 
static is( value:any ):boolean 
```

Returns true if the object provided is a `Carbon.SPARQL.RawResult.Class` object

**Parameters**

- value 



## Carbon/SPARQL/RawResultsParser <a name="Carbon-SPARQL-RawResultsParser"></a>




### Class Carbon.SPARQL.RawResultsParser.Class

> Class for parse SPARQL Query result to a `Carbon.SPARQL.RawResult.Class` object




#### Methods


##### parse

```typescript 
parse( input:string ):Promise<Carbon.SPARQL.RawResult.Class> 
```

Parse the SPARQL Query string result to a `Carbon.SPARQL.RawResult.Class` object

**Parameters**

- input 


## Carbon/SPARQL/Service <a name="Carbon-SPARQL-Service"></a>




### Class Carbon.SPARQL.Service.Class

> Executes SPARQL queries and updates




#### Methods

##### executeRawASKQuery

```typescript 
static executeRawASKQuery( url:string,  askQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]> 
```

Executes an ASK Query and returns a raw application/sparql-results+json object

**Parameters**

- url 
- askQuery 
- requestOptions 

##### executeASKQuery

```typescript 
static executeASKQuery( url:string,  askQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ boolean, Carbon.HTTP.Response.Class ]> 
```

Executes an ASK Query and returns a boolean

**Parameters**

- url 
- askQuery 
- requestOptions 

##### executeSELECTQuery

```typescript 
static executeSELECTQuery( url:string,  selectQuery:string,  pointerLibrary:Carbon.Pointer.Library,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.SELECTResults.Class, Carbon.HTTP.Response.Class ]> 
```

Executes a SELECT Query and parses the results

**Parameters**

- url 
- selectQuery 
- pointerLibrary 
- requestOptions 

##### executeRawSELECTQuery

```typescript 
static executeRawSELECTQuery( url:string,  selectQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]> 
```

Executes a SELECT Query and returns a raw application/sparql-results+json object

**Parameters**

- url 
- selectQuery 
- requestOptions 

##### executeRawCONSTRUCTQuery

```typescript 
static executeRawCONSTRUCTQuery( url:string,  constructQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ string, Carbon.HTTP.Response.Class ]> 
```

Executes a CONSTRUCT Query and returns a string with the resulting model

**Parameters**

- url 
- constructQuery 
- requestOptions 

##### executeRawDESCRIBEQuery

```typescript 
static executeRawDESCRIBEQuery( url:string,  describeQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ string, Carbon.HTTP.Response.Class ]> 
```

Executes a DESCRIBE Query and returns a string with the resulting model

**Parameters**

- url 
- describeQuery 
- requestOptions 



## Carbon/Utils <a name="Carbon-Utils"></a>

> The description of Carbon/Utils



### Class Carbon.Utils.O

> Utility functions related to strings.




#### Methods

##### areShallowlyEqual

```typescript 
static areShallowlyEqual( object1:object,  object2:object ):boolean 
```

Checks if an object has the same enumerable properties with the same values as another object.

**Parameters**

- object1 
- object2 




> Utility functions related to strings.




#### Methods

##### startsWith

```typescript 
static startsWith( string:string,  substring:string ):boolean 
```

Checks if a string starts with a substring.

**Parameters**

- string 
- substring 

##### endsWith

```typescript 
static endsWith( string:string,  substring:string ):boolean 
```

Checks if a string ends with a substring.

**Parameters**

- string 
- substring 

##### contains

```typescript 
static contains( string:string,  substring:string ):boolean 
```

Checks if a string contains a substring (in any part).

**Parameters**

- string 
- substring 




> Utility functions related to Arrays




#### Methods

##### from

```typescript 
static from( iterator:iterator ):array 
```

Collects the values of an ES6 iterator and returns an array.

**Parameters**

- iterator 

##### joinWithoutDuplicates

```typescript 
static joinWithoutDuplicates( array:array ):array 
```

Takes two or more arrays and joins them while removing duplicates

**Parameters**

- array 




> Utility functions related to ES6 Maps.




#### Methods

##### from

```typescript 
static from( object:object ):map 
```

Takes an object and creates a map from its properties.

**Parameters**

- object 




> Utility functions related to UUIDs




#### Methods

##### is

```typescript 
static is( uuid:string ):string 
```

Returns true if the string provided is a UUID (version 1 to 5).

**Parameters**

- uuid 

##### generate

```typescript 
static generate():string 
```

Generates a new, version 4, UUID.



## Carbon/settings <a name="Carbon-settings"></a>



