# CarbonLDP SDK API description


## Carbon





### Class Carbon

> Principal class that contains all references for use the SDK.

#### Reexports

| Export name | Original Location |
| --- | --- |
| Carbon.Agent  | [Carbon/Agent](#Carbon/Agent) |
| Carbon.Agents  | [Carbon/Agents](#Carbon/Agents) |
| Carbon.App  | [Carbon/App](#Carbon/App) |
| Carbon.Apps  | [Carbon/Apps](#Carbon/Apps) |
| Carbon.Auth  | [Carbon/Auth](#Carbon/Auth) |
| Carbon.Document  | [Carbon/Document](#Carbon/Document) |
| Carbon.Documents  | [Carbon/Documents](#Carbon/Documents) |
| Carbon.Errors  | [Carbon/Errors](#Carbon/Errors) |
| Carbon.Fragment  | [Carbon/Fragment](#Carbon/Fragment) |
| Carbon.HTTP  | [Carbon/HTTP](#Carbon/HTTP) |
| Carbon.JSONLDConverter  | [Carbon/JSONLDConverter](#Carbon/JSONLDConverter) |
| Carbon.LDP  | [Carbon/LDP](#Carbon/LDP) |
| Carbon.NamedFragment  | [Carbon/NamedFragment](#Carbon/NamedFragment) |
| Carbon.NS  | [Carbon/NS](#Carbon/NS) |
| Carbon.ObjectSchema  | [Carbon/ObjectSchema](#Carbon/ObjectSchema) |
| Carbon.Persisted  | [Carbon/Persisted](#Carbon/Persisted) |
| Carbon.PersistedApp  | [Carbon/PersistedApp](#Carbon/PersistedApp) |
| Carbon.PersistedDocument  | [Carbon/PersistedDocument](#Carbon/PersistedDocument) |
| Carbon.PersistedFragment  | [Carbon/PersistedFragment](#Carbon/PersistedFragment) |
| Carbon.PersistedNamedFragment  | [Carbon/PersistedNamedFragment](#Carbon/PersistedNamedFragment) |
| Carbon.PersistedResource  | [Carbon/PersistedResource](#Carbon/PersistedResource) |
| Carbon.Pointer  | [Carbon/Pointer](#Carbon/Pointer) |
| Carbon.RDF  | [Carbon/RDF](#Carbon/RDF) |
| Carbon.Resource  | [Carbon/Resource](#Carbon/Resource) |
| Carbon.SDKContext  | [Carbon/SDKContext](#Carbon/SDKContext) |
| Carbon.SPARQL  | [Carbon/SPARQL](#Carbon/SPARQL) |
| Carbon.Utils  | [Carbon/Utils](#Carbon/Utils) |
##### Constructors

```typescript
Carbon( settings?:any )
```
		
**Parameters**
- settings 

##### Properties

```typescript
Carbon.version: string
```

 Returns the version of the SDK 


#### Instance

##### Properties

```typescript
Carbon.prototype.version: string
```

Returns the version of the SDK 

```typescript
Carbon.prototype.apps: Carbon.Apps.Class
```

Instance of the class `Carbon.Apps` in the context of the Carbon instance. 

##### Methods

###### resolve

```typescript
Carbon.prototype.resolve( uri:string ):string
```

Resolve the URI provided in the context of the instance, this information is provided in the settings object.  

**Parameters**
- uri 

###### getAPIDescription

```typescript
Carbon.prototype.getAPIDescription():Promise<Carbon.APIDescription.Class>
```

Returns the API description of the connected platform in the instance of Carbon  







## Carbon/APIDescription






## Carbon/AbstractContext





### Class Carbon.AbstractContext

> Abstract class for defining contexts

##### Constructors

```typescript
AbstractContext()
```
		


#### Instance

##### Properties

```typescript
AbstractContext.prototype.parentContext: The parent context provided in the constructor. If no context has provided, the property will be the singleton `Carbon.SDKContext.instance` of the class `Carbon.SDKContext.Class`.
```



##### Methods

###### resolve

```typescript
AbstractContext.prototype.resolve( relativeURI:string ):string
```

Abstract method which implementation must resolve the URI provided in the scope of the application.  

**Parameters**
- relativeURI 






## Carbon/Agents





### Class Carbon.Agents.Class

> Class for manage Agents of a determined context.

##### Constructors

```typescript
Class()
```
		





## Carbon/Agents/Agent





### Class Carbon.Agents.Agent.Factory

> Factory class for `Carbon.Agents.Agent.Class` objects


##### Methods

###### hasClassProperties

```typescript
Factory.hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties that defines a `Carbon.Agents.Agent.Class` object  

**Parameters**
- resource 

###### is

```typescript
Factory.is( object:Object ):boolean
```

Returns true if the object provided is considered as an `Carbon.Agents.Agent.Class` object  

**Parameters**
- object 

###### create

```typescript
Factory.create( name:string,  email:string ):Carbon.Agents.Agent.Class
```

Create a `Carbon.Agents.Agent.Class` object with the name and email specified.  

**Parameters**
- name 
- email 

###### createFrom

```typescript
Factory.createFrom( object:T extends Object ):T & Carbon.Agents.Agent.Class
```

Create a `Carbon.Agents.Agent.Class` object with the object provided.  

**Parameters**
- object 






## Carbon/App



### Reexports

| Export name | Original Location |
| --- | --- |
| App.App | [Carbon/App/Context](#Carbon/App/Context) |


### Class Carbon.App.Factory

> Factory class for `Carbon.App.Class` objects


##### Methods

###### hasClassProperties

```typescript
Factory.hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties that defines a `Carbon.App.Class` object  

**Parameters**
- resource 

###### is

```typescript
Factory.is( object:Object ):boolean
```

Returns true if the object provided is considered as an `Carbon.App.Class` object  

**Parameters**
- object 

###### create

```typescript
Factory.create( name:string ):Carbon.App.Class
```

Create a empty `Carbon.App.Class` object.  

**Parameters**
- name 

###### createFrom

```typescript
Factory.createFrom( object:T extends Object ):T & Carbon.App.Class
```

Create a `Carbon.App.Class` object with the object provided.  

**Parameters**
- object 






## Carbon/App/Context





### Class Carbon.App.Context

> Class that represents a Carbon Application. It centers the scope of several services (Carbon.Auth, Carbon.Resources, etc.) into the Application's scope.

##### Constructors

```typescript
Context( parentContext:Carbon.Context,  app:Carbon.App.Context )
```
		
**Parameters**
- parentContext 
- app 


#### Instance

##### Properties

```typescript
Context.prototype.agents: Carbon.Agents.Class
```

Instance of Agents class for manage the agents inside of an application. 

##### Methods

###### resolve

```typescript
Context.prototype.resolve( uri:string ):string
```

Resolve the URI provided in the scope of the application  

**Parameters**
- uri 






## Carbon/Apps





### Class Carbon.Apps.Class

> Class for obtaining Carbon Apps.

##### Constructors

```typescript
Class( context:Carbon.Context )
```
		
**Parameters**
- context : A context from where Carbon Apps can be obtained


#### Instance

##### Methods

###### getAllContexts

```typescript
Class.prototype.getAllContexts():Promise<Carbon.Apps.AppContext[]>
```

Obtains all the `Carbon.Apps.AppContext` objects of every app where the context of the Apps instance can reach.  


###### create

```typescript
Class.prototype.create( appDocument:Carbon.Apps.App.Class ):Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>
```

Persists an App Document in the server, generating a unique slug.
Returns a Pointer for the stored App Document, and the response of the call.  

**Parameters**
- appDocument 

```typescript
Class.prototype.create( slug:string,  appDocument:Carbon.Apps.App.Class ):Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>
```

Persists an App Document in the server using the slug specified.
Returns a Pointer for the stored App Document, and the response of the call.  

**Parameters**
- slug 
- appDocument 






## Carbon/Auth



### Reexports

| Export name | Original Location |
| --- | --- |
| Auth.AuthenticationToken | [Carbon.Auth.AuthenticationToken](#Carbon.Auth.AuthenticationToken) |
| Auth.Authenticator | [Carbon.Auth.Authenticator](#Carbon.Auth.Authenticator) |
| Auth.BasicAuthenticator | [Carbon.Auth.BasicAuthenticator](#Carbon.Auth.BasicAuthenticator) |
| Auth.Token | [Carbon.Auth.Token](#Carbon.Auth.Token) |
| Auth.TokenAuthenticator | [Carbon.Auth.TokenAuthenticator](#Carbon.Auth.TokenAuthenticator) |
| Auth.UsernameAndPasswordToken | [Carbon.Auth.UsernameAndPasswordToken](#Carbon.Auth.UsernameAndPasswordToken) |


### Class Carbon.Auth.Class

> Class for manage all the methods of authentication.

##### Constructors

```typescript
Class()
```
		


#### Instance

##### Methods

###### isAuthenticated

```typescript
Class.prototype.isAuthenticated( askParent?:boolean ):boolean
```

Returns true the user is authenticated.  

**Parameters**
- askParent 

###### authenticate

```typescript
Class.prototype.authenticate( username:string,  password:string ):Promise<Carbon.Auth.Credentials>
```

Authenticate the user with an `username` and `password`. Uses the `TOKEN` method for the authentication.  

**Parameters**
- username 
- password 

###### authenticateUsing

```typescript
Class.prototype.authenticateUsing( method:'BASIC',  username:string,  password:string ):Promise<Carbon.Auth.UsernameAndPasswordCredentials.Class>
```

Authenticates the user with Basic HTTP Authentication, witch uses encoded username and password.  

**Parameters**
- method 
- username 
- password 

```typescript
Class.prototype.authenticateUsing( method:'TOKEN',  username:string,  password:string ):Promise<Carbon.Auth.Token.Class>
```

Authenticates the user with username and password, and generates a JSON Web Token (JWT) credentials.  

**Parameters**
- method 
- username 
- password 

```typescript
Class.prototype.authenticateUsing( method:'TOKEN',  token:Carbon.Auth.Token.Class ):Promise<Carbon.Auth.Token.Class>
```

Authenticates the user with a JSON Web Token (JWT), i.e. the credentials generated by TokenAuthenticator.  

**Parameters**
- method 
- token 

###### addAuthentication

```typescript
Class.prototype.addAuthentication( options:Carbon.HTTP.Request.Options ):
```

Add the authentication header to a `Carbon.HTTP.Request.Options` object.  

**Parameters**
- options 

###### clearAuthentication

```typescript
Class.prototype.clearAuthentication():
```

Deletes the current authentication  







## Carbon/Auth/BasicAuthenticator





### Class Carbon.Auth.BasicAuthenticator.Class

> 
		Authenticates requests using Basic Authentication
	

##### Constructors

```typescript
Class()
```
		


#### Instance

##### Methods

###### isAuthenticated

```typescript
Class.prototype.isAuthenticated():boolean
```


			returns true if the instance contains stored credentials.
		  


###### authenticate

```typescript
Class.prototype.authenticate( authenticationToken:Carbon.Auth.UsernameAndPasswordToken ):Promise<void>
```


			Stores credentials to authenticate future requests.
		  

**Parameters**
- authenticationToken 

###### addAuthentication

```typescript
Class.prototype.addAuthentication( requestOptions:Carbon.HTTP.Request.Options ):Carbon.HTTP.Request.Options
```


			Adds the Basic authentication header to the passed request options object.
		  

**Parameters**
- requestOptions : Request options object to add Authentication headers.

###### clearAuthentication

```typescript
Class.prototype.clearAuthentication():
```


			Clears any saved credentials and restores the Authenticator to its initial state.
		  


###### supports

```typescript
Class.prototype.supports( authenticationToken:Carbon.Auth.AuthenticationToken ):boolean
```

Returns true if the Authenticator supports the AuthenticationToken.  

**Parameters**
- authenticationToken 






## Carbon/Auth/Token





### Class Carbon.Auth.Token.Factory




##### Methods

###### is

```typescript
Factory.is( value:any ):boolean
```

Duck tape tests if the value sent is a Token object  

**Parameters**
- value 

###### hasClassProperties

```typescript
Factory.hasClassProperties( object:Object ):boolean
```

Returns true if the object provided has the necessary information to be utilized as a object of type `Carbon.Auth.Token.Class`  

**Parameters**
- object 



#### Instance

##### Methods

###### decorate

```typescript
Factory.prototype.decorate( object:T extends Object ):Carbon.Auth.Token.Class
```

Adds any necessary data to the object provided to be utilized as a type `Carbon.Auth.Token.Class`  

**Parameters**
- object 

###### hasRDFClass

```typescript
Factory.prototype.hasRDFClass( pointer:Carbon.Pointer.Class ):boolean
```

Description  

**Parameters**
- pointer 

```typescript
Factory.prototype.hasRDFClass( expandedObject:Object ):boolean
```

Description  

**Parameters**
- expandedObject 






## Carbon/Auth/TokenAuthenticator





### Class Carbon.Auth.TokenAuthenticator.Class

> 
		Authenticates requests using Basic Authentication
	

##### Constructors

```typescript
Class( context:Carbon.Context )
```
		
**Parameters**
- context : The context where to authenticate the agent.


#### Instance

##### Methods

###### isAuthenticated

```typescript
Class.prototype.isAuthenticated():boolean
```


			returns true if the instance contains stored credentials.
		  


###### authenticate

```typescript
Class.prototype.authenticate( authenticationToken:Carbon.Auth.UsernameAndPasswordToken ):Promise<Carbon.Auth.Token.Class>
```

Stores credentials to authenticate future requests.  

**Parameters**
- authenticationToken 

```typescript
Class.prototype.authenticate( token:Carbon.Auth.Token.Class ):Promise<Carbon.Auth.Token.Class>
```

Stores credentials to authenticate future requests.  

**Parameters**
- token 

###### addAuthentication

```typescript
Class.prototype.addAuthentication( requestOptions:Carbon.HTTP.Request.Options ):Carbon.HTTP.Request.Options
```


			Adds the Basic authentication header to the passed request options object.
		  

**Parameters**
- requestOptions : Request options object to add Authentication headers.

###### clearAuthentication

```typescript
Class.prototype.clearAuthentication():
```


			Clears any saved credentials and restores the Authenticator to its initial state.
		  


###### supports

```typescript
Class.prototype.supports( authenticationToken:Carbon.Auth.AuthenticationToken ):boolean
```

Returns true if the Authenticator supports the AuthenticationToken.  

**Parameters**
- authenticationToken 






## Carbon/Auth/UsernameAndPasswordToken





### Class Carbon.Auth.UsernameAndPasswordToken.Class

> Wrapper for manage an Authentication Token in form of UserName/Password

##### Constructors

```typescript
Class( username:string,  password:string )
```
		
**Parameters**
- username 
- password 


#### Instance

##### Properties

```typescript
Class.prototype.username: string
```



```typescript
Class.prototype.password: string
```







## Carbon/Document





### Class Carbon.Document.Factory

> Factory class for Document objects.


##### Methods

###### hasClassProperties

```typescript
Factory.hasClassProperties( documentResource:Object ):boolean
```

Returns true if the object provided has the properties and functions of a Document object  

**Parameters**
- documentResource 

###### create

```typescript
Factory.create( uri:string ):Carbon.Document.Class
```

Creates an empty Document object which reference to the URI provided.  

**Parameters**
- uri 

```typescript
Factory.create():Carbon.Document.Class
```

Creates an empty Document object.  


###### createFrom

```typescript
Factory.createFrom( object:T extends Object,  uri:string ):Carbon.Document.Class
```

Creates a Document object from the object provided and will reference to the URI provided.  

**Parameters**
- object 
- uri 

```typescript
Factory.createFrom():Carbon.Document.Class
```

Creates a Document object from the object provided.  


###### decorate

```typescript
Factory.decorate( object:T extends Object ):T & Carbon.Document.Class
```

Adds the properties and method necessary for a Document object.  

**Parameters**
- object 






## Carbon/Documents






## Carbon/Errors



### Reexports

| Export name | Original Location |
| --- | --- |
| Errors.IDAlreadyInUseError | [Carbon/Errors/IDAlreadyInUseError](#Carbon/Errors/IDAlreadyInUseError) |
| Errors.IllegalActionError | [Carbon/Errors/IllegalActionError](#Carbon/Errors/IllegalActionError) |
| Errors.IllegalArgumentError | [Carbon/Errors/IllegalArgumentError](#Carbon/Errors/IllegalArgumentError) |
| Errors.IllegalStateError | [Carbon/Errors/IllegalStateError](#Carbon/Errors/IllegalStateError) |
| Errors.NotImplementedError | [Carbon/Errors/NotImplementedError](#Carbon/Errors/NotImplementedError) |



## Carbon/Errors/AbstractError





### Class Carbon.Errors.AbstractError



##### Constructors

```typescript
AbstractError( message:string )
```
		
**Parameters**
- message 


#### Instance

##### Properties

```typescript
AbstractError.prototype.name: string
```



```typescript
AbstractError.prototype.message: string
```



##### Methods

###### toString

```typescript
AbstractError.prototype.toString():string
```

Returns a string representation  







## Carbon/Errors/IDAlreadyInUseError





### Class Carbon.Errors.IDAlreadyInUseError

> Error class to indicates that an ID is already in use



#### Instance

##### Properties

```typescript
IDAlreadyInUseError.prototype.name: string
```







## Carbon/Errors/IllegalActionError





### Class Carbon.Errors.IllegalActionError

> Error class that indicates a illegal action



#### Instance

##### Properties

```typescript
IllegalActionError.prototype.name: string
```







## Carbon/Errors/IllegalArgumentError





### Class Carbon.Errors.IllegalArgumentError

> Error class that indicates an illegal argument was provided to in a function



#### Instance

##### Properties

```typescript
IllegalArgumentError.prototype.name: string
```







## Carbon/Errors/IllegalStateError





### Class Carbon.Errors.IllegalStateError

> Error class that can be thrown to show an illegal state, meaning an state that the application is not supposed to reach.

##### Constructors

```typescript
IllegalStateError( message?:string )
```
		
**Parameters**
- message 


#### Instance

##### Properties

```typescript
IllegalStateError.prototype.name: string
```



##### Methods

###### toString

```typescript
IllegalStateError.prototype.toString():string
```









## Carbon/Errors/NotImplementedError





### Class Carbon.Errors.NotImplementedError

> Error class that indicates a function that is still not implemented

##### Constructors

```typescript
NotImplementedError( message?:string )
```
		
**Parameters**
- message 


#### Instance

##### Properties

```typescript
NotImplementedError.prototype.name: string
```



##### Methods

###### toString

```typescript
NotImplementedError.prototype.toString():string
```









## Carbon/Fragment





### Class Carbon.Fragment.Factory

> Factory class for Fragment objects.


##### Methods

###### hasClassProperties

```typescript
Factory.hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties and functions of a Fragment object  

**Parameters**
- resource 

###### create

```typescript
Factory.create( id:string,  document:Carbon.Document.Class ):Carbon.Fragment.Class
```

Creates a Fragment with the ID provided for the document specified.  

**Parameters**
- id 
- document 

```typescript
Factory.create( document:Carbon.Document.Class ):Carbon.Fragment.Class
```

Create a Blank Node Fragment since no ID is provided for the specified document.  

**Parameters**
- document 

###### createFrom

```typescript
Factory.createFrom( object:T extends Object,  id:string,  document:Carbon.Document.Class ):T & Carbon.Fragment.Class
```

Creates a Fragment from an Object with the ID provided for the document specified.  

**Parameters**
- object 
- id 
- document 

```typescript
Factory.createFrom( object:T extends Object,  document:Carbon.Document.Class ):Carbon.Fragment.Class
```

Create a Blank Node Fragment since no ID is provided for the specified document.  

**Parameters**
- object 
- document 





### Class 

> Class with useful options for Fragment objects


##### Methods

###### generateID

```typescript
Carbon.Fragment.Util.generateID():
```

Returns an ID for a BlankNode using an universally unique identifier (UUID).  







## Carbon/HTTP



### Reexports

| Export name | Original Location |
| --- | --- |
| HTTP.Errors | [Carbon/HTTP/Errors](#Carbon/HTTP/Errors) |
| HTTP.Header | [Carbon/HTTP/Header](#Carbon/HTTP/Header) |
| HTTP.JSONParser | [Carbon/HTTP/JSONParser](#Carbon/HTTP/JSONParser) |
| HTTP.JSONLDParser | [Carbon/HTTP/JSONLDParser](#Carbon/HTTP/JSONLDParser) |
| HTTP.Method | [Carbon/HTTP/Method](#Carbon/HTTP/Method) |
| HTTP.Parser | [Carbon/HTTP/Parser](#Carbon/HTTP/Parser) |
| HTTP.Request | [Carbon/HTTP/Request](#Carbon/HTTP/Request) |
| HTTP.Response | [Carbon/HTTP/Response](#Carbon/HTTP/Response) |
| HTTP.StatusCode | [Carbon/HTTP/StatusCode](#Carbon/HTTP/StatusCode) |
| HTTP.StringParser | [Carbon/HTTP/StringParser](#Carbon/HTTP/StringParser) |



## Carbon/HTTP/Errors



### Reexports

| Export name | Original Location |
| --- | --- |
| Errors.Error | [Carbon/HTTP/Errors/HTTPError](#Carbon/HTTP/Errors/HTTPError) |
| Errors.BadRequestError | [Carbon/HTTP/Errors/client/BadRequestError](#Carbon/HTTP/Errors/client/BadRequestError) |
| Errors.ConflictError | [Carbon/HTTP/Errors/client/ConflictError](#Carbon/HTTP/Errors/client/ConflictError) |
| Errors.ForbiddenError | [Carbon/HTTP/Errors/client/ForbiddenError](#Carbon/HTTP/Errors/client/ForbiddenError) |
| Errors.MethodNotAllowedError | [Carbon/HTTP/Errors/client/MethodNotAllowedError](#Carbon/HTTP/Errors/client/MethodNotAllowedError) |
| Errors.NotAcceptableError | [Carbon/HTTP/Errors/client/NotAcceptableError](#Carbon/HTTP/Errors/client/NotAcceptableError) |
| Errors.NotFoundError | [Carbon/HTTP/Errors/client/NotFoundError](#Carbon/HTTP/Errors/client/NotFoundError) |
| Errors.PreconditionFailedError | [Carbon/HTTP/Errors/client/PreconditionFailedError](#Carbon/HTTP/Errors/client/PreconditionFailedError) |
| Errors.PreconditionRequiredError | [Carbon/HTTP/Errors/client/PreconditionRequiredError](#Carbon/HTTP/Errors/client/PreconditionRequiredError) |
| Errors.RequestEntityTooLargeError | [Carbon/HTTP/Errors/client/RequestEntityTooLargeError](#Carbon/HTTP/Errors/client/RequestEntityTooLargeError) |
| Errors.RequestHeaderFieldsTooLargeError | [Carbon/HTTP/Errors/client/RequestHeaderFieldsTooLargeError](#Carbon/HTTP/Errors/client/RequestHeaderFieldsTooLargeError) |
| Errors.RequestURITooLongError | [Carbon/HTTP/Errors/client/RequestURITooLongError](#Carbon/HTTP/Errors/client/RequestURITooLongError) |
| Errors.TooManyRequestsError | [Carbon/HTTP/Errors/client/TooManyRequestsError](#Carbon/HTTP/Errors/client/TooManyRequestsError) |
| Errors.UnauthorizedError | [Carbon/HTTP/Errors/client/UnauthorizedError](#Carbon/HTTP/Errors/client/UnauthorizedError) |
| Errors.UnsupportedMediaTypeError | [Carbon/HTTP/Errors/client/UnsupportedMediaTypeError](#Carbon/HTTP/Errors/client/UnsupportedMediaTypeError) |
| Errors.BadResponseError | [Carbon/HTTP/Errors/client/BadResponseError](#Carbon/HTTP/Errors/client/BadResponseError) |
| Errors.BadGatewayError | [Carbon/HTTP/Errors/client/BadGatewayError](#Carbon/HTTP/Errors/client/BadGatewayError) |
| Errors.GatewayTimeoutError | [Carbon/HTTP/Errors/client/GatewayTimeoutError](#Carbon/HTTP/Errors/client/GatewayTimeoutError) |
| Errors.HTTPVersionNotSupportedError | [Carbon/HTTP/Errors/client/HTTPVersionNotSupportedError](#Carbon/HTTP/Errors/client/HTTPVersionNotSupportedError) |
| Errors.InternalServerErrorError | [Carbon/HTTP/Errors/client/InternalServerErrorError](#Carbon/HTTP/Errors/client/InternalServerErrorError) |
| Errors.NotImplementedError | [Carbon/HTTP/Errors/client/NotImplementedError](#Carbon/HTTP/Errors/client/NotImplementedError) |
| Errors.ServiceUnavailableError | [Carbon/HTTP/Errors/client/ServiceUnavailableError](#Carbon/HTTP/Errors/client/ServiceUnavailableError) |
| Errors.UnknownError | [Carbon/HTTP/Errors/client/UnknownError](#Carbon/HTTP/Errors/client/UnknownError) |



## Carbon/HTTP/Errors/BadRequestError





### Class Carbon.HTTP.Errors.BadRequestError

> Error class that can be throw to indicate has been send a request that doesn

##### Constructors

```typescript
BadRequestError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
BadRequestError.statusCode: number
```




#### Instance

##### Properties

```typescript
BadRequestError.prototype.name: string
```



##### Methods

###### toString

```typescript
BadRequestError.prototype.toString():string
```









## Carbon/HTTP/Errors/ConflictError





### Class Carbon.HTTP.Errors.ConflictError

> Error class that can be throw to indicate that the request could not be processed because of conflict in the request, such as an ID conflict

##### Constructors

```typescript
ConflictError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
ConflictError.statusCode: number
```




#### Instance

##### Properties

```typescript
ConflictError.prototype.name: string
```



##### Methods

###### toString

```typescript
ConflictError.prototype.toString():string
```









## Carbon/HTTP/Errors/ForbiddenError





### Class Carbon.HTTP.Errors.client.ForbiddenError

> Error class that can be throw to indicate that the current user does not have permissions to fulfill the request

##### Constructors

```typescript
ForbiddenError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
ForbiddenError.statusCode: number
```




#### Instance

##### Properties

```typescript
ForbiddenError.prototype.name: string
```



##### Methods

###### toString

```typescript
ForbiddenError.prototype.toString():string
```









## Carbon/HTTP/Errors/HTTPError





### Class Carbon.HTTP.Errors.HTTPError

> Error class for define any type of HTTP Error occurred

##### Constructors

```typescript
HTTPError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
HTTPError.statusCode: number
```




#### Instance

##### Properties

```typescript
HTTPError.prototype.name: string
```



##### Methods

###### toString

```typescript
HTTPError.prototype.toString():string
```









## Carbon/HTTP/Errors/UnknownError





### Class Carbon.HTTP.Errors.UnknownError

> Error class that defines any error that can not be identified

##### Constructors

```typescript
UnknownError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
UnknownError.statusCode: number
```




#### Instance

##### Properties

```typescript
UnknownError.prototype.name: string
```



##### Methods

###### toString

```typescript
UnknownError.prototype.toString():string
```









## Carbon/HTTP/Errors/client/MethodNotAllowedError





### Class Carbon.HTTP.Errors.client.MethodNotAllowedError

> Error class that can be throw to indicate that the current user does not have the required permissions to fulfill the request

##### Constructors

```typescript
MethodNotAllowedError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
MethodNotAllowedError.statusCode: number
```




#### Instance

##### Properties

```typescript
MethodNotAllowedError.prototype.name: string
```



##### Methods

###### toString

```typescript
MethodNotAllowedError.prototype.toString():string
```









## Carbon/HTTP/Errors/client/NotAcceptableError





### Class Carbon.HTTP.Errors.client.NotAcceptableError

> Error class that can be throw to indicate that the server cannot respond with the accept-header specified in the request

##### Constructors

```typescript
NotAcceptableError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
NotAcceptableError.statusCode: number
```




#### Instance

##### Properties

```typescript
NotAcceptableError.prototype.name: string
```



##### Methods

###### toString

```typescript
NotAcceptableError.prototype.toString():string
```









## Carbon/HTTP/Errors/client/NotFoundError





### Class Carbon.HTTP.Errors.client.NotFoundError

> Error class that can be throw to indicate that the resource was not found

##### Constructors

```typescript
NotFoundError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
NotFoundError.statusCode: number
```




#### Instance

##### Properties

```typescript
NotFoundError.prototype.name: string
```



##### Methods

###### toString

```typescript
NotFoundError.prototype.toString():string
```









## Carbon/HTTP/Errors/client/PreconditionFailedError





### Class Carbon.HTTP.Errors.client.PreconditionFailedError

> Error class that can be throw to indicate that the precondition header was resolved to false

##### Constructors

```typescript
PreconditionFailedError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
PreconditionFailedError.statusCode: number
```




#### Instance

##### Properties

```typescript
PreconditionFailedError.prototype.name: string
```



##### Methods

###### toString

```typescript
PreconditionFailedError.prototype.toString():string
```









## Carbon/HTTP/Errors/client/PreconditionRequiredError





### Class Carbon.HTTP.Errors.client.PreconditionRequiredError

> Error class that can be throw to indicate that the request is missing a precondition header

##### Constructors

```typescript
PreconditionRequiredError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
PreconditionRequiredError.statusCode: number
```




#### Instance

##### Properties

```typescript
PreconditionRequiredError.prototype.name: string
```



##### Methods

###### toString

```typescript
PreconditionRequiredError.prototype.toString():string
```









## Carbon/HTTP/Errors/client/RequestEntityTooLargeError





### Class Carbon.HTTP.Errors.client.RequestEntityTooLargeError

> Error class that can be throw to indicate that the request entity is larger than the server is able to process

##### Constructors

```typescript
RequestEntityTooLargeError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
RequestEntityTooLargeError.statusCode: number
```




#### Instance

##### Properties

```typescript
RequestEntityTooLargeError.prototype.name: string
```



##### Methods

###### toString

```typescript
RequestEntityTooLargeError.prototype.toString():string
```









## Carbon/HTTP/Errors/client/RequestHeaderFieldsTooLargeError





### Class Carbon.HTTP.Errors.client.RequestHeaderFieldsTooLargeError

> Error class that can be throw to indicate that the server is no able to process the request because its header fields are too large

##### Constructors

```typescript
RequestHeaderFieldsTooLargeError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
RequestHeaderFieldsTooLargeError.statusCode: number
```




#### Instance

##### Properties

```typescript
RequestHeaderFieldsTooLargeError.prototype.name: string
```



##### Methods

###### toString

```typescript
RequestHeaderFieldsTooLargeError.prototype.toString():string
```









## Carbon/HTTP/Errors/client/RequestURITooLongError





### Class Carbon.HTTP.Errors.client.RequestURITooLongError

> Error class that can be throw to indicate that the server is no able to process the request because its URI is too long

##### Constructors

```typescript
RequestURITooLongError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
RequestURITooLongError.statusCode: number
```




#### Instance

##### Properties

```typescript
RequestURITooLongError.prototype.name: string
```



##### Methods

###### toString

```typescript
RequestURITooLongError.prototype.toString():string
```









## Carbon/HTTP/Errors/client/TooManyRequestsError





### Class Carbon.HTTP.Errors.client.TooManyRequestsError

> Error class that can be throw to indicate that the current user has sent too many request in a given amount of time

##### Constructors

```typescript
TooManyRequestsError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
TooManyRequestsError.statusCode: number
```




#### Instance

##### Properties

```typescript
TooManyRequestsError.prototype.name: string
```



##### Methods

###### toString

```typescript
TooManyRequestsError.prototype.toString():string
```









## Carbon/HTTP/Errors/client/UnauthorizedError





### Class Carbon.HTTP.Errors.client.UnauthorizedError

> Error class that can be throw to indicate that authentication is required or has failed

##### Constructors

```typescript
UnauthorizedError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
UnauthorizedError.statusCode: number
```




#### Instance

##### Properties

```typescript
UnauthorizedError.prototype.name: string
```



##### Methods

###### toString

```typescript
UnauthorizedError.prototype.toString():string
```









## Carbon/HTTP/Errors/client/UnsupportedMediaTypeError





### Class Carbon.HTTP.Errors.client.UnsupportedMediaTypeError

> Error class that can be throw to indicate that the request has a media-type not supported by the server

##### Constructors

```typescript
UnsupportedMediaTypeError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
UnsupportedMediaTypeError.statusCode: number
```




#### Instance

##### Properties

```typescript
UnsupportedMediaTypeError.prototype.name: string
```



##### Methods

###### toString

```typescript
UnsupportedMediaTypeError.prototype.toString():string
```









## Carbon/HTTP/Errors/server/BadGatewayError





### Class Carbon.HTTP.Errors.server.BadGatewayError

> Error class that can be throw to indicate that the server was acting as a gateway or proxy and received an invalid response from the upstream server

##### Constructors

```typescript
BadGatewayError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
BadGatewayError.statusCode: number
```




#### Instance

##### Properties

```typescript
BadGatewayError.prototype.name: string
```



##### Methods

###### toString

```typescript
BadGatewayError.prototype.toString():string
```









## Carbon/HTTP/Errors/server/BadResponseError





### Class Carbon.HTTP.Errors.server.BadResponseError

> Error class that can be throw to indicate that the response obtained can not is note the expected or cannot be interpreted

##### Constructors

```typescript
BadResponseError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
BadResponseError.statusCode: number
```




#### Instance

##### Properties

```typescript
BadResponseError.prototype.name: string
```



##### Methods

###### toString

```typescript
BadResponseError.prototype.toString():string
```









## Carbon/HTTP/Errors/server/GatewayTimeoutError





### Class Carbon.HTTP.Errors.server.GatewayTimeoutError

> Error class that can be throw to indicate that the server, while acting as a gateway or proxy, did not receive a timely response from the upstream server

##### Constructors

```typescript
GatewayTimeoutError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
GatewayTimeoutError.statusCode: number
```




#### Instance

##### Properties

```typescript
GatewayTimeoutError.prototype.name: string
```



##### Methods

###### toString

```typescript
GatewayTimeoutError.prototype.toString():string
```









## Carbon/HTTP/Errors/server/HTTPVersionNotSupportedError





### Class Carbon.HTTP.Errors.server.HTTPVersionNotSupportedError

> Error class that can be throw to indicate that the server does not support the HTTP protocol version used in the request

##### Constructors

```typescript
HTTPVersionNotSupportedError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
HTTPVersionNotSupportedError.statusCode: number
```




#### Instance

##### Properties

```typescript
HTTPVersionNotSupportedError.prototype.name: string
```



##### Methods

###### toString

```typescript
HTTPVersionNotSupportedError.prototype.toString():string
```









## Carbon/HTTP/Errors/server/InternalServerErrorError





### Class Carbon.HTTP.Errors.server.InternalServerErrorError

> Error class that can be throw to indicate that the server encountered an unexpected condition. This generic error is given when no more specific message is suitable

##### Constructors

```typescript
InternalServerErrorError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
InternalServerErrorError.statusCode: number
```




#### Instance

##### Properties

```typescript
InternalServerErrorError.prototype.name: string
```



##### Methods

###### toString

```typescript
InternalServerErrorError.prototype.toString():string
```









## Carbon/HTTP/Errors/server/NotImplementedError





### Class Carbon.HTTP.Errors.server.NotImplementedError

> Error class that can be throw to indicate that the server does not have the ability to fulfill the request yet

##### Constructors

```typescript
NotImplementedError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
NotImplementedError.statusCode: number
```




#### Instance

##### Properties

```typescript
NotImplementedError.prototype.name: string
```



##### Methods

###### toString

```typescript
NotImplementedError.prototype.toString():string
```









## Carbon/HTTP/Errors/server/ServiceUnavailableError





### Class Carbon.HTTP.Errors.server.ServiceUnavailableError

> Error class that can be throw to indicate that the server is currently unavailable (because it is overloaded or down for maintenance)

##### Constructors

```typescript
ServiceUnavailableError( message:string,  response:Carbon.HTTP.Response )
```
		
**Parameters**
- message 
- response 

##### Properties

```typescript
ServiceUnavailableError.statusCode: number
```




#### Instance

##### Properties

```typescript
ServiceUnavailableError.prototype.name: string
```



##### Methods

###### toString

```typescript
ServiceUnavailableError.prototype.toString():string
```









## Carbon/HTTP/Header





### Class Carbon.HTTP.Header.Value

> Class wrapper for a string value of a HTTP header

##### Constructors

```typescript
Value( value:string )
```
		
**Parameters**
- value 


#### Instance

##### Methods

###### toString

```typescript
Value.prototype.toString():string
```








### Class 

> Class for have better management of the values in a HTTP header

##### Constructors

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


#### Instance

##### Properties

```typescript
Carbon.HTTP.Header.Class.prototype.values: Array <Carbon.HTTP.Header.Value>
```

Array that contains each value of the header 

##### Methods

###### toString

```typescript
Carbon.HTTP.Header.Class.prototype.toString():
```

string  






### Class 

> Class with useful options for manage headers


##### Methods

###### parseHeaders

```typescript
Carbon.HTTP.Header.Util.parseHeaders( headersString:string ):Map <string, Carbon.HTTP.Header.Class>
```

Returns an Map object, witch relates the all header-names with a `Carbon.HTTP.Header.Class` containing their values  

**Parameters**
- headersString 






## Carbon/HTTP/JSONLDParser





### Class Carbon.HTTP.JSONLDParser.Class

> Class wrapper for native `JSON.parse` using `Promise` pattern



#### Instance

##### Methods

###### parse

```typescript
Class.prototype.parse( body:string ):Promise <Object>
```



**Parameters**
- body : A JSON string to parse






## Carbon/HTTP/JSONParser





### Class Carbon.HTTP.JSONParser.Class

> Class wrapper for native `JSON.parse` using `Promise` pattern



#### Instance

##### Methods

###### parse

```typescript
Class.prototype.parse( body:string ):Promise <Object>
```



**Parameters**
- body : A JSON string to parse






## Carbon/HTTP/Method






## Carbon/HTTP/Request





### Class Carbon.HTTP.Request.Service

> Class that have functions to manage HTTP requests


##### Methods

###### send

```typescript
Service.send( url:string,  body:string,  options:object ):Promise<Carbon.HTTP.Response>
```

Generic send method, to be used by the others methods in the class  

**Parameters**
- url 
- body 
- options 

###### head

```typescript
Service.head( url:string,  options?:object ):Promise<Carbon.HTTP.Response>
```



**Parameters**
- url 
- options 

###### options

```typescript
Service.options( url:string,  options?:object ):Promise<Carbon.HTTP.Response>
```



**Parameters**
- url 
- options 

###### get

```typescript
Service.get( url:string,  options?:object ):Promise<Carbon.HTTP.Response>
```

Simple get request  

**Parameters**
- url 
- options 

```typescript
Service.get( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<[Object, Carbon.HTTP.Response]>
```

Get request with specified parser  

**Parameters**
- url 
- options 
- parser 

###### post

```typescript
Service.post( url:string,  body:string,  options?:object ):Promise<Carbon.HTTP.Response>
```

Simple post request  

**Parameters**
- url 
- body 
- options 

```typescript
Service.post( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response>
```

Post request with specified parser  

**Parameters**
- url 
- options 
- parser 

###### put

```typescript
Service.put( url:string,  body:string,  options?:object ):Promise<Carbon.HTTP.Response>
```

Simple put request  

**Parameters**
- url 
- body 
- options 

```typescript
Service.put( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response>
```

Put request with specified parser  

**Parameters**
- url 
- options 
- parser 

###### patch

```typescript
Service.patch( url:string,  body:string,  options?:object ):Promise<Carbon.HTTP.Response>
```

Simple patch request  

**Parameters**
- url 
- body 
- options 

```typescript
Service.patch( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response>
```

Patch request with specified parser  

**Parameters**
- url 
- options 
- parser 

###### delete

```typescript
Service.delete( url:string,  body:string,  options?:object ):Promise<Carbon.HTTP.Response>
```

Simple delete request  

**Parameters**
- url 
- body 
- options 

```typescript
Service.delete( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response>
```

Delete request with specified parser  

**Parameters**
- url 
- options 
- parser 

```typescript
Service.delete( url:string,  options?:object ):Promise<Carbon.HTTP.Response>
```

Simple delete request  

**Parameters**
- url 
- options 

```typescript
Service.delete( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response>
```

Delete request with specified parser  

**Parameters**
- url 
- options 
- parser 





### Class 

> Useful functions for manage the options object of a request


##### Methods

###### getHeader

```typescript
Carbon.HTTP.Request.Util.getHeader( headerName:string,  requestOptions:Object,  initialize?:boolean ):Carbon.HTTP.Header.Class
```

Returns the header object of a header-name inside an options object request. Returns `undefined` if the header not exists. If `initialize` flag is provided with true, a empty header will be created even if it already exits  

**Parameters**
- headerName 
- requestOptions 
- initialize 

###### setAcceptHeader

```typescript
Carbon.HTTP.Request.Util.setAcceptHeader( accept:string,  requestOptions:Object ):Object
```

Set an Accept header in an options object request  

**Parameters**
- accept 
- requestOptions 

###### setContentTypeHeader

```typescript
Carbon.HTTP.Request.Util.setContentTypeHeader( contentType:string,  requestOptions:Object ):Object
```

Set an Content-Type header in an options object request  

**Parameters**
- contentType 
- requestOptions 

###### setIfMatchHeader

```typescript
Carbon.HTTP.Request.Util.setIfMatchHeader( etag:string,  requestOptions:Object ):Object
```

Set a If-Match header in an options object request  

**Parameters**
- etag 
- requestOptions 

###### setPreferredInteractionModel

```typescript
Carbon.HTTP.Request.Util.setPreferredInteractionModel( interactionModelURI:string,  requestOptions:Object ):Object
```

Set a Prefer header with `rel=interaction-model` in an options object request  

**Parameters**
- interactionModelURI 
- requestOptions 

###### setSlug

```typescript
Carbon.HTTP.Request.Util.setSlug( slug:string,  requestOptions:Object ):Object
```

Set a Slug header in an options object request  

**Parameters**
- slug 
- requestOptions 

###### setContainerRetrievalPreferences

```typescript
Carbon.HTTP.Request.Util.setContainerRetrievalPreferences( preference:Carbon.HTTP.Request.ContainerRetrievalPreferences,  requestOptions:Carbon.HTTP.Request.Options ):Object
```

Set a Prefer header with `return=representation` in an options object request  

**Parameters**
- preference 
- requestOptions 






## Carbon/HTTP/Response





### Class Carbon.HTTP.Response.Class

> Class that represents an HTTP Response

##### Constructors

```typescript
Class( request:XMLHttpRequest )
```
		
**Parameters**
- request 


#### Instance

##### Properties

```typescript
Class.prototype.status: number
```

The status code returned by the request 

```typescript
Class.prototype.data: string
```

The body returned by the request 

```typescript
Class.prototype.headers: Map<string, Carbon.HTTP.Header.Class>
```

A map object containing the headers returned by the request 

```typescript
Class.prototype.request: XMLHttpRequest
```

The XMLHttpRequest object that was provided in the constructor 

##### Methods

###### getHeader

```typescript
Class.prototype.getHeader( name:string ):Carbon.HTTP.Header.Class
```

Return the Header object referred by the name provided.  

**Parameters**
- name 





### Class 

> Class with useful methods to use with a `Carbon.HTTP.Response.Class` object


##### Methods

###### getETag

```typescript
Carbon.HTTP.Response.Util.getETag( response:Carbon.HTTP.Response.Class ):string
```

Return the ETag string header of a `Carbon.HTTP.Response.Class` object. Returns null if no ETag exists  

**Parameters**
- response 






## Carbon/HTTP/StatusCode






## Carbon/HTTP/StringParser





### Class Carbon.HTTP.StringParser.Class

> Parses a Carbon.HTTP.Response.Class and returns a String



#### Instance

##### Methods

###### parse

```typescript
Class.prototype.parse( body:Carbon.HTTP.Response.Class ):Promise<string>
```

Gets a string and returns a promise with the same string  

**Parameters**
- body 






## Carbon/JSONLDConverter





### Class Carbon.JSONLDConverter.Class








## Carbon/LDP



### Reexports

| Export name | Original Location |
| --- | --- |
| LDP.AccessPoint | [Carbon/LDP/AccessPoint](#Carbon/LDP/AccessPoint) |
| LDP.BasicContainer | [Carbon/LDP/BasicContainer](#Carbon/LDP/BasicContainer) |
| LDP.Container | [Carbon/LDP/Container](#Carbon/LDP/Container) |
| LDP.PersistedContainer | [Carbon/LDP/PersistedContainer](#Carbon/LDP/PersistedContainer) |
| LDP.RDFSource | [Carbon/LDP/RDFSource](#Carbon/LDP/RDFSource) |



## Carbon/LDP/AccessPoint





### Class Carbon.LDP.AccessPoint.Factory

> Factory class for AccessPoint objects


##### Methods

###### hasClassProperties

```typescript
Factory.hasClassProperties( resource:Object ):boolean
```

Returns true if the object has the properties to be defined as a AccessPoint  

**Parameters**
- resource 






## Carbon/LDP/BasicContainer





### Class Carbon.LDP.BasicContainer.Factory

> Factory class for LDP BasicContainer objects






## Carbon/LDP/Container





### Class Carbon.LDP.Container.Factory

> Factory class for LDP Container objects


##### Methods

###### hasClassProperties

```typescript
Factory.hasClassProperties( resource:Carbon.RDF.Node.Class ):boolean
```

Returns true if the object has the properties to be defined as a LDP Container  

**Parameters**
- resource 

###### hasRDFClass

```typescript
Factory.hasRDFClass( pointer:Carbon.Pointer.Class ):boolean
```

Returns true if the Pointer provided is an LDP Container.  

**Parameters**
- pointer 

```typescript
Factory.hasRDFClass( expandedObject:Object ):boolean
```

Returns true if the Object provided is an LDP Container.  

**Parameters**
- expandedObject 






## Carbon/LDP/PersistedContainer





### Class Carbon.LDP.PersistedContainer.Factory

> Factory class for LDP PersistedContainer objects


##### Methods

###### hasClassProperties

```typescript
Factory.hasClassProperties( document:Carbon.Document.Class ):boolean
```

Returns true if the object has the properties to be defined as a PersistedContainer  

**Parameters**
- document 

###### decorate

```typescript
Factory.decorate( persistedDocument:T extends Carbon.PersistedDocument.Class ):T & Carbon.LDP.PersistedContainer.Class
```

Returns the PersistedDocuments decorated as a PersistedContainer  

**Parameters**
- persistedDocument 






## Carbon/LDP/RDFSource





### Class Carbon.LDP.RDFSource.Factory

> Factory class for RDFSource objects






## Carbon/NS



### Reexports

| Export name | Original Location |
| --- | --- |
| NS.C | [Carbon/NS/C](#Carbon/NS/C) |
| NS.CP | [Carbon/NS/CP](#Carbon/NS/CP) |
| NS.CS | [Carbon/NS/CS](#Carbon/NS/CS) |
| NS.LDP | [Carbon/NS/LDP](#Carbon/NS/LDP) |
| NS.RDF | [Carbon/NS/RDF](#Carbon/NS/RDF) |
| NS.XSD | [Carbon/NS/XSD](#Carbon/NS/XSD) |
| NS.VCARD | [Carbon/NS/VCARD](#Carbon/NS/VCARD) |



## Carbon/NS/C





### Class Carbon.NS.C.Class

> Class that contains objects defined by the Carbon Platform


##### Properties

```typescript
Class.AccessPoint: string
```



```typescript
Class.API: string
```



```typescript
Class.NonReadableMembershipResourceTriples: string
```



```typescript
Class.PreferContainmentResources: string
```



```typescript
Class.PreferContainmentTriples: string
```



```typescript
Class.PreferMembershipResources: string
```



```typescript
Class.PreferMembershipTriples: string
```



```typescript
Class.VolatileResource: string
```






### Class 

> Class that contains predicates defined by the Carbon Platform


##### Properties

```typescript
Carbon.NS.C.Predicate.accessPoint: string
```



```typescript
Carbon.NS.C.Predicate.buildDate: string
```



```typescript
Carbon.NS.C.Predicate.created: string
```



```typescript
Carbon.NS.C.Predicate.modified: string
```



```typescript
Carbon.NS.C.Predicate.version: string
```







## Carbon/NS/CP





### Class Carbon.NS.CP.Predicate

> Class that contains predicates defined by Carbon Patch


##### Properties

```typescript
Predicate.ADD_ACTION: string
```



```typescript
Predicate.SET_ACTION: string
```



```typescript
Predicate.DELETE_ACTION: string
```







## Carbon/NS/CS





### Class Carbon.NS.CS.Class

> Class that contains objects defined by Carbon Security


##### Properties

```typescript
Class.Application: string
```



```typescript
Class.Token: string
```



```typescript
Class.AllOrigins: string
```






### Class 

> Class that contains predicates defined by Carbon Security


##### Properties

```typescript
Carbon.NS.CS.Predicate.name: string
```



```typescript
Carbon.NS.CS.Predicate.allowsOrigin: string
```



```typescript
Carbon.NS.CS.Predicate.rootContainer: string
```



```typescript
Carbon.NS.CS.Predicate.tokenKey: string
```



```typescript
Carbon.NS.CS.Predicate.expirationTime: string
```



```typescript
Carbon.NS.CS.Predicate.password: string
```







## Carbon/NS/LDP





### Class Carbon.NS.LDP.Class

> Class that contains objects defined in the W3C Linked Data Platform (LDP) vocabulary


##### Properties

```typescript
Class.Resource: string
```



```typescript
Class.RDFSource: string
```



```typescript
Class.Container: string
```



```typescript
Class.BasicContainer: string
```



```typescript
Class.DirectContainer: string
```



```typescript
Class.IndirectContainer: string
```



```typescript
Class.NonRDFSource: string
```



```typescript
Class.MemberSubject: string
```



```typescript
Class.PreferContainment: string
```



```typescript
Class.PreferMembership: string
```



```typescript
Class.PreferEmptyContainer: string
```



```typescript
Class.PreferMinimalContainer: string
```



```typescript
Class.Page: string
```



```typescript
Class.PageSortCriterion: string
```



```typescript
Class.Ascending: string
```



```typescript
Class.Descending: string
```






### Class 

> Class that contains predicates defined in the W3C Linked Data Platform (LDP) vocabulary


##### Properties

```typescript
Carbon.NS.LDP.Predicate.contains: string
```



```typescript
Carbon.NS.LDP.Predicate.member: string
```



```typescript
Carbon.NS.LDP.Predicate.hasMemberRelation: string
```



```typescript
Carbon.NS.LDP.Predicate.isMemberOfRelation: string
```



```typescript
Carbon.NS.LDP.Predicate.membershipResource: string
```



```typescript
Carbon.NS.LDP.Predicate.insertedContentRelation: string
```



```typescript
Carbon.NS.LDP.Predicate.constrainedBy: string
```



```typescript
Carbon.NS.LDP.Predicate.pageSortCriteria: string
```



```typescript
Carbon.NS.LDP.Predicate.pageSortOrder: string
```



```typescript
Carbon.NS.LDP.Predicate.pageSortCollation: string
```



```typescript
Carbon.NS.LDP.Predicate.pageSequence: string
```







## Carbon/NS/RDF





### Class Carbon.NS.RDF.Predicate

> Class that contains predicates defined in the RDF Syntax Specification


##### Properties

```typescript
Predicate.type: string
```







## Carbon/NS/VCARD





### Class Carbon.NS.VCARD.Predicate

> Class that contains some predicates defined in the vCard Ontology Specification


##### Properties

```typescript
Predicate.email: string
```







## Carbon/NS/XSD





### Class Carbon.NS.XSD.DataType

> DataType that contains data-types defined in the XML Schema Definition Language (XSD)


##### Properties

```typescript
DataType.date: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#date: string
```



```typescript
DataType.dateTime: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#dateTime: string
```



```typescript
DataType.duration: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#duration: string
```



```typescript
DataType.gDay: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#gDay: string
```



```typescript
DataType.gMonth: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#gMonth: string
```



```typescript
DataType.gMonthDay: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#gMonthDay: string
```



```typescript
DataType.gYear: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#gYear: string
```



```typescript
DataType.gYearMonth: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#gYearMonth: string
```



```typescript
DataType.time: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#time: string
```



```typescript
DataType.byte: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#byte: string
```



```typescript
DataType.decimal: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#decimal: string
```



```typescript
DataType.int: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#int: string
```



```typescript
DataType.integer: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#integer: string
```



```typescript
DataType.long: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#long: string
```



```typescript
DataType.negativeInteger: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#negativeInteger: string
```



```typescript
DataType.nonNegativeInteger: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#nonNegativeInteger: string
```



```typescript
DataType.nonPositiveInteger: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#nonPositiveInteger: string
```



```typescript
DataType.positiveInteger: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#positiveInteger: string
```



```typescript
DataType.short: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#short: string
```



```typescript
DataType.unsignedLong: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#unsignedLong: string
```



```typescript
DataType.unsignedInt: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#unsignedInt: string
```



```typescript
DataType.unsignedShort: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#unsignedShort: string
```



```typescript
DataType.unsignedByte: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#unsignedByte: string
```



```typescript
DataType.double: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#double: string
```



```typescript
DataType.float: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#float: string
```



```typescript
DataType.boolean: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#boolean: string
```



```typescript
DataType.string: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#string: string
```



```typescript
DataType.object: string
```



```typescript
DataType.http://www.w3.org/2001/XMLSchema#object: string
```







## Carbon/NamedFragment





### Class Carbon.NamedFragment.Factory

> Factory class for NamedFragment objects.


##### Methods

###### hasClassProperties

```typescript
Factory.hasClassProperties( resource:Carbon.Fragment.Class ):boolean
```

Returns true if the object provided has the properties and functions of a NamedFragment object  

**Parameters**
- resource 

###### create

```typescript
Factory.create( slug:string,  document:Carbon.Document.Class ):Carbon.NamedFragment.Class
```

Creates a NamedFragment with the Slug provided for the document specified.  

**Parameters**
- slug 
- document 

###### createFrom

```typescript
Factory.createFrom( object:T extends Object,  slug:string,  document:Carbon.Document.Class ):T & Carbon.NamedFragment.Class
```

Creates a NamedFragment from an Object with the Slug provided for the document specified.  

**Parameters**
- object 
- slug 
- document 






## Carbon/ObjectSchema





### Class Carbon.ObjectSchema.DigestedObjectSchema

> Class of a standardized Schema.

##### Constructors

```typescript
DigestedObjectSchema()
```
		


#### Instance

##### Properties

```typescript
DigestedObjectSchema.prototype.base: string
```

This property is initialized with an empty string. 

```typescript
DigestedObjectSchema.prototype.prefixes: Map<string, Carbon.RDF.URI.Class>
```

This property is initialized with an empty Map. 

```typescript
DigestedObjectSchema.prototype.properties: Map<string, Carbon.ObjectSchema.DigestedPropertyDefinition>
```

This property is initialized with an empty Map. 

```typescript
DigestedObjectSchema.prototype.prefixedURIs: Map<string, Carbon.RDF.URI.Class[]>
```

This property is initialized with an empty Map. 




### Class 

> Class for standardized object properties in a Schema.

##### Constructors

```typescript
Carbon.ObjectSchema.DigestedPropertyDefinition()
```
		


#### Instance

##### Properties

```typescript
Carbon.ObjectSchema.DigestedPropertyDefinition.prototype.uri: Carbon.RDF.URI.Class
```

This property is initialized with null. 

```typescript
Carbon.ObjectSchema.DigestedPropertyDefinition.prototype.literal: boolean
```

This property is initialized with null. 

```typescript
Carbon.ObjectSchema.DigestedPropertyDefinition.prototype.literalType: Carbon.RDF.URI.Class
```

This property is initialized with null. 

```typescript
Carbon.ObjectSchema.DigestedPropertyDefinition.prototype.language: string
```

This property is initialized with null. 

```typescript
Carbon.ObjectSchema.DigestedPropertyDefinition.prototype.containerType: Carbon.ObjectSchema.ContainerType
```

This property is initialized with null. 




### Class 

> Class with options for standardize a JSON-LD Schema.


##### Methods

###### combineDigestedObjectSchemas

```typescript
Carbon.ObjectSchema.Digester.combineDigestedObjectSchemas( digestedSchemas:Carbon.ObjectSchema.DigestedObjectSchema[] ):Carbon.ObjectSchema.DigestedObjectSchema
```

Combine several standardized schemas in one.  

**Parameters**
- digestedSchemas 






## Carbon/PersistedApp





### Class Carbon.PersistedApp.Factory

> Factory class for `Carbon.PersistedApp.Class` objects


##### Methods

###### hasClassProperties

```typescript
Factory.hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties that defines a `Carbon.PersistedApp.Class` object  

**Parameters**
- resource 

###### is

```typescript
Factory.is( object:Object ):boolean
```

Returns true if the object provided is considered as an `Carbon.PersistedApp.Class` object  

**Parameters**
- object 






## Carbon/PersistedDocument





### Class Carbon.PersistedDocument.Factory

> Factory class for PersistedDocument objects.


##### Methods

###### hasClassProperties

```typescript
Factory.hasClassProperties( document:Carbon.Document.Class ):boolean
```

Returns true if the Document provided has the properties and functions of a PersistedDocument object  

**Parameters**
- document 

###### is

```typescript
Factory.is( object:Object ):boolean
```

Returns true if the element provided is a PersistedDocument object.  

**Parameters**
- object 

###### create

```typescript
Factory.create( uri:string,  documents:Carbon.Documents ):Carbon.PersistedDocument.Class
```

Creates an empty PersistedDocument object with the URI provided and contained by the Documents object specified.  

**Parameters**
- uri 
- documents 

###### createFrom

```typescript
Factory.createFrom( object:T extends Object,  uri:string ):Carbon.PersistedDocument.Class
```

Creates a PersistedDocument object from the object and URI provided, with the Documents object specified as container.  

**Parameters**
- object 
- uri 

###### decorate

```typescript
Factory.decorate( object:T extends Object,  documents:Carbon.Documents ):T & Carbon.PersistedDocument.Class
```

Adds the properties and methods necessary for a PersistedDocument object.  

**Parameters**
- object 
- documents 






## Carbon/Pointer





### Class Carbon.Pointer.Factory

> Factory class for Pointer objects.


##### Methods

###### hasClassProperties

```typescript
Factory.hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties and functions of a Pointer object  

**Parameters**
- resource 

###### is

```typescript
Factory.is( value:any ):boolean
```

Returns true if the value provided is a Pinter object.  

**Parameters**
- value 

###### create

```typescript
Factory.create( id?:string ):Carbon.Pointer.Class
```

Create a Pointer object with id if provided.  

**Parameters**
- id 

###### decorate

```typescript
Factory.decorate( object:T extends Object ):T & Carbon.Pointer.Class
```

Decorates the object provided with the elements of a Pointer object.  

**Parameters**
- object 






## Carbon/RDF



### Reexports

| Export name | Original Location |
| --- | --- |
| RDF.Literal | [Carbon/RDF/Literal](#Carbon/RDF/Literal) |
| RDF.Document | [Carbon/RDF/Document](#Carbon/RDF/Document) |
| RDF.List | [Carbon/RDF/List](#Carbon/RDF/List) |
| RDF.Node | [Carbon/RDF/Node](#Carbon/RDF/Node) |
| RDF.URI | [Carbon/RDF/URI](#Carbon/RDF/URI) |
| RDF.Value | [Carbon/RDF/Value](#Carbon/RDF/Value) |



## Carbon/RDF/Document





### Class Carbon.RDF.Document.Factory

> Class Factory to manage creation and management of RDFDocument objects


##### Methods

###### is

```typescript
Factory.is( object:Object ):boolean
```

Returns true if the object is an RDFDocument object  

**Parameters**
- object 

###### create

```typescript
Factory.create( resources:Carbon.RDF.RDFNode.Class[],  uri?:string ):Carbon.RDF.RDFDocument.Class
```

Return an RDFDocument object created with the parameters provided  

**Parameters**
- resources 
- uri 





### Class 

> Class with useful functions for manage RDF Documents


##### Methods

###### getBNodeResources

```typescript
Carbon.RDF.Document.Util.getBNodeResources( document:Carbon.RDF.Document.Class ):Carbon.RDF.RDFNode.Class[]
```

Returns all the resources that refers to blank nodes from a document.
Throw an `Carbon.Errors.IllegalArgumentError` if the object is not RDF like  

**Parameters**
- document 





### Class 

> Async class for parse a JSON-LD string to an array of RDFDocuments



#### Instance

##### Methods

###### parse

```typescript
Carbon.RDF.Document.Parser.prototype.parse( input:string ):Promise<any>
```

Parse the a JSON-LD string to an array of RDFDocuments  

**Parameters**
- input 






## Carbon/RDF/List





### Class Carbon.RDF.List.Factory

> Class Factory to manage creation and management of List objects


##### Methods

###### is

```typescript
Factory.is( value:any ):boolean
```

Returns true if the object provided can be called a RDF List  

**Parameters**
- value 






## Carbon/RDF/Literal



### Reexports

| Export name | Original Location |
| --- | --- |
| Literal.serializer | [Carbon/RDF/Literal/Serializers](#Carbon/RDF/Literal/Serializers) |


### Class Carbon.RDF.Literal.Factory

> Class Factory to manage creation and management of Literal objects.


##### Methods

###### from

```typescript
Factory.from():
```

Convert the value provided to a Literal object.  


###### parse

```typescript
Factory.parse( literal:Carbon.RDF.Literal.Class ):any
```

Parse the Literal object to the respective JavaScript type.
Returns null if cannot be parsed.  

**Parameters**
- literal 

###### is

```typescript
Factory.is( value:any ):boolean
```

Returns true if the object provided can be called a RDF Literal  

**Parameters**
- value 

###### hasType

```typescript
Factory.hasType( value:Carbon.RDF.Literal.Class,  type:string ):boolean
```

Returns true if the Literal has the type indicated  

**Parameters**
- value 
- type 





### Class 

> Class with useful functions for manage RDF Literals


##### Methods

###### areEqual

```typescript
Carbon.RDF.Literal.Util.areEqual( literal1:Carbon.RDF.Literal.Class,  literal2:Carbon.RDF.Literal.Class ):boolean
```

Returns true if two Literals are equal  

**Parameters**
- literal1 
- literal2 






## Carbon/RDF/Literal/Serializers



### Reexports

| Export name | Original Location |
| --- | --- |
| Serializers.XSD | [Carbon/RDF/Literal/Serializers/XSD](#Carbon/RDF/Literal/Serializers/XSD) |



## Carbon/RDF/Literal/Serializers/XSD





### Class Carbon.RDF.Literal.Serializes.XSD.DateSerializer

> Class that can serialize a Date object into a string literal with format `YYY-MM-DD`Instead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.dateSerializer`



#### Instance

##### Methods

###### serialize

```typescript
DateSerializer.prototype.serialize( value:any ):string
```

Returns the string with format `YYY-MM-DD`, of the Date object  

**Parameters**
- value 





### Class 

> Class that can serialize a Date object into a string ISO literalInstead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.dateTimeSerializer`



#### Instance

##### Methods

###### serialize

```typescript
Carbon.RDF.Literal.Serializes.XSD.DateTimeSerializer.prototype.serialize( value:any ):string
```

Returns the simplified extended ISO format (ISO 8601) of the Date object  

**Parameters**
- value 





### Class 

> Class that can serialize a Date object into a literal string with format `HH:mm:ss.sssZ`Instead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.timeSerializer`



#### Instance

##### Methods

###### serialize

```typescript
Carbon.RDF.Literal.Serializes.XSD.TimeSerializer.prototype.serialize( value:any ):string
```

Returns a string representing the Date object with format `HH:mm:ss.sssZ`  

**Parameters**
- value 





### Class 

> Class that can serialize any Number value to a string literal of an integerInstead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.integerSerializer`



#### Instance

##### Methods

###### serialize

```typescript
Carbon.RDF.Literal.Serializes.XSD.IntegerSerializer.prototype.serialize( value:any ):string
```

Returns a string representing a integer from the Number provided  

**Parameters**
- value 





### Class 

> Class that can serialize any Number value to a string literal of an unsigned integerInstead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.unsignedIntegerSerializer`



#### Instance

##### Methods

###### serialize

```typescript
Carbon.RDF.Literal.Serializes.XSD.UnsignedIntegerSerializer.prototype.serialize( value:any ):string
```

Returns a string representing an unsigned integer from the Number provided  

**Parameters**
- value 





### Class 

> Class that can serialize any Number value to a string literal of floatInstead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.floatSerializer`



#### Instance

##### Methods

###### serialize

```typescript
Carbon.RDF.Literal.Serializes.XSD.FloatSerializer.prototype.serialize( value:any ):string
```

Returns a string representing a float from the Number provided  

**Parameters**
- value 





### Class 

> Class that can serialize any variable to a string literal representation its truth valueInstead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.booleanSerializer`



#### Instance

##### Methods

###### serialize

```typescript
Carbon.RDF.Literal.Serializes.XSD.BooleanSerializer.prototype.serialize( value:any ):string
```

Returns a string representing the truth value from the variable provided  

**Parameters**
- value 





### Class 

> Class that can serialize any variable to a string literal representation its truth valueInstead of instantiate this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.stringSerializer`



#### Instance

##### Methods

###### serialize

```typescript
Carbon.RDF.Literal.Serializes.XSD.StringSerializer.prototype.serialize( value:any ):string
```

Returns a string representing the truth value from the variable provided  

**Parameters**
- value 






## Carbon/RDF/RDFNode





### Class Carbon.RDF.RDFNode.Factory

> Class Factory to manage creation and management of RDFNode objects


##### Methods

###### is

```typescript
Factory.is( object:Object ):boolean
```

Returns true when an object can be called an RDFNode  

**Parameters**
- object 

###### create

```typescript
Factory.create( uri:string ):Carbon.RDF.RDFNode.Class
```

Create a RDFNode object providing an URI string  

**Parameters**
- uri 





### Class 

> Class with useful functions for manage RDFNode objects


##### Methods

###### areEqual

```typescript
Carbon.RDF.RDFNode.Util.areEqual( node1:Carbon.RDF.RDFDocument.Class,  node2:Carbon.RDF.RDFDocument.Class ):boolean
```

Returns true if the objects represent the same resource  

**Parameters**
- node1 
- node2 

###### getPropertyURI

```typescript
Carbon.RDF.RDFNode.Util.getPropertyURI( node:Carbon.RDF.RDFNode.Class,  predicate:string ):string
```

Returns the URI from a property resource in the RDFNode object.
Returns null if the property not exists or the URI is not found  

**Parameters**
- node 
- predicate 






## Carbon/RDF/URI





### Class Carbon.RDF.URI.Class

> Wrapper for an URI string value

##### Constructors

```typescript
Class( stringValue:string )
```
		
**Parameters**
- stringValue : The string that represents an URI


#### Instance

##### Methods

###### toString

```typescript
Class.prototype.toString():string
```

Returns a string that represents the URI of the class  






### Class 

> CLass with useful functions for managing URI's


##### Methods

###### hasFragment

```typescript
Carbon.RDF.URI.Util.hasFragment( uri:string ):boolean
```

Returns true if the URI provided contains a fragment  

**Parameters**
- uri 

###### hasProtocol

```typescript
Carbon.RDF.URI.Util.hasProtocol( uri:string ):boolean
```

Returns true if the URI provided has a protocol  

**Parameters**
- uri 

###### isAbsolute

```typescript
Carbon.RDF.URI.Util.isAbsolute( uri:string ):boolean
```

Returns true if the URI provided is absolute  

**Parameters**
- uri 

###### isRelative

```typescript
Carbon.RDF.URI.Util.isRelative( uri:string ):boolean
```

Returns true if the URI provided is relative  

**Parameters**
- uri 

###### isBNodeID

```typescript
Carbon.RDF.URI.Util.isBNodeID( uri:string ):boolean
```

Returns true if the URI provided reference to a Blank Node  

**Parameters**
- uri 

###### isPrefixed

```typescript
Carbon.RDF.URI.Util.isPrefixed( uri:string ):boolean
```

Returns true if the URI provided has a prefix  

**Parameters**
- uri 

###### isFragmentOf

```typescript
Carbon.RDF.URI.Util.isFragmentOf( fragmentURI:string,  uri:string ):boolean
```

Returns true if the first URI is a fragment od the second URI provided  

**Parameters**
- fragmentURI 
- uri 

###### isBaseOf

```typescript
Carbon.RDF.URI.Util.isBaseOf( baseURI:string,  uri:string ):boolean
```

Return true if the first URI is parent of the second URI provided  

**Parameters**
- baseURI 
- uri 

###### getRelativeURI

```typescript
Carbon.RDF.URI.Util.getRelativeURI( absoluteURI:string,  base:string ):string
```

Returns the relative URI from a base URI provided  

**Parameters**
- absoluteURI 
- base 

###### getDocumentURI

```typescript
Carbon.RDF.URI.Util.getDocumentURI( uri:string ):
```

Returns the URI that just reference to the Document of the URI provided  

**Parameters**
- uri 

###### getFragment

```typescript
Carbon.RDF.URI.Util.getFragment( uri:string ):string
```

Returns the name of the fragment in the URI provided. If no fragment exists in the URI, null will be returned  

**Parameters**
- uri 

###### getSlug

```typescript
Carbon.RDF.URI.Util.getSlug( uri:string ):string
```

Returns the slug of the URI. It takes an ending slash as part as the slug.  

**Parameters**
- uri 

###### resolve

```typescript
Carbon.RDF.URI.Util.resolve( parentURI:string,  childURI:string ):string
```

Return a URI formed from a parent URI and a relative child URI  

**Parameters**
- parentURI 
- childURI 

###### removeProtocol

```typescript
Carbon.RDF.URI.Util.removeProtocol( uri:string ):string
```

Removes the protocol of the URI provided  

**Parameters**
- uri 

###### prefix

```typescript
Carbon.RDF.URI.Util.prefix( uri:string,  prefix:string,  prefixURI:string ):string
```

Replace a base of a URI with the prefix provided. If the prefix can not be resolved, the URI provided will be returned  

**Parameters**
- uri 
- prefix 
- prefixURI 

```typescript
Carbon.RDF.URI.Util.prefix( uri:string,  objectSchema:Carbon.ObjectSchema.DigestedObjectSchema ):string
```

Replace the base of a URI with a prefix in accordance with the ObjectSchema provided. If the prefix can not be resolved, the URI provided will be returned  

**Parameters**
- uri 
- objectSchema 






## Carbon/RDF/Value





### Class Carbon.RDF.Value.Util

> Class with useful functions for manage RDF Values.


##### Methods

###### areEqual

```typescript
Util.areEqual( value1:Carbon.RDF.Value.Class,  value2:Carbon.RDF.Value.Class ):boolean
```

Returns true if the two Values are considered equal.  

**Parameters**
- value1 
- value2 

###### getProperty

```typescript
Util.getProperty( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property searched, parsed in accordance to the RDF object it is.
Returns null if the property is not found or cannot be parsed.  

**Parameters**
- expandedObject 
- propertyURI 
- pointerLibrary 

###### getPropertyPointer

```typescript
Util.getPropertyPointer( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property searched as a Pointer.
Returns null if the property is not found or cannot be parsed as a Pointer.  

**Parameters**
- expandedObject 
- propertyURI 
- pointerLibrary 

###### getPropertyLiteral

```typescript
Util.getPropertyLiteral( expandedObject:any,  propertyURI:string,  literalType:string ):any
```

Returns the property searched as a javascript variable. The property must be an RDF Literal.
Returns null if the property is not found, the type provided not match with the type of the Literal, or cannot be parsed from a Literal.  

**Parameters**
- expandedObject 
- propertyURI 
- literalType 

###### getPropertyList

```typescript
Util.getPropertyList( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property searched as an Array with every element parsed to its respective type of element.
Returns null if the property is not found or cannot be parsed.  

**Parameters**
- expandedObject 
- propertyURI 
- pointerLibrary 

###### getPropertyPointerList

```typescript
Util.getPropertyPointerList( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property list searched as an Array of Pointers. It will be filtered no pointer values.
Returns null if the property is not found or is not a List.  

**Parameters**
- expandedObject 
- propertyURI 
- pointerLibrary 

###### getPropertyLiteralList

```typescript
Util.getPropertyLiteralList( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property list searched as an Array of parsed Literals. It will be filtered no Literal values with the type specified.
Returns null if the property is not found or is not a List.  

**Parameters**
- expandedObject 
- propertyURI 
- pointerLibrary 

###### getProperties

```typescript
Util.getProperties( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property searched as an Array with the parsed Literal, Pointer or List.
Returns null if the property is not found, or an empty array if cannot be parsed.  

**Parameters**
- expandedObject 
- propertyURI 
- pointerLibrary 

###### getPropertyPointers

```typescript
Util.getPropertyPointers( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property searched as an Array with the parsed Pointer.
Returns null if the property is not found, or an empty array if the property cannot be parsed as a pointer.  

**Parameters**
- expandedObject 
- propertyURI 
- pointerLibrary 

###### getPropertyURIs

```typescript
Util.getPropertyURIs( expandedObject:any,  propertyURI:string ):any
```

Returns the URIs of the property searched.
Returns null if the property is not found or an empty array if no URI was found.  

**Parameters**
- expandedObject 
- propertyURI 

###### getPropertyLiterals

```typescript
Util.getPropertyLiterals( expandedObject:any,  propertyURI:string,  literalType:string ):any
```

Returns the property searched as an Array with the parsed Literal.
Returns null if the property is not found, or an empty array if cannot be parsed.  

**Parameters**
- expandedObject 
- propertyURI 
- literalType 

###### getPropertyLanguageMap

```typescript
Util.getPropertyLanguageMap( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns an object associating the language with the parsed string literal.
Returns null if the property is not found, or an empty object if not is a property with language.  

**Parameters**
- expandedObject 
- propertyURI 
- pointerLibrary 

###### getList

```typescript
Util.getList( propertyValues:Array<any> ):Carbon.RDF.List.Class
```

Returns the List object from the provided property of an expanded JSON-LD object.
Returns null if no List object is found.  

**Parameters**
- propertyValues 

###### parseValue

```typescript
Util.parseValue( propertyValue:Carbon.RDF.Value.Class,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the parsed object from an Literal, Node, or List.
Returns null if cannot be parsed  

**Parameters**
- propertyValue 
- pointerLibrary 






## Carbon/Resource





### Class Carbon.Resource.Factory

> Factory class for Resource objects.


##### Methods

###### hasClassProperties

```typescript
Factory.hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties and functions of a Resource object  

**Parameters**
- resource 

###### create

```typescript
Factory.create( id?:string,  types?:string[] ):Carbon.Resource.Class
```

Create a Resource object with id and types if provided.  

**Parameters**
- id 
- types 

###### createFrom

```typescript
Factory.createFrom( object:T extends Object,  id?:string,  types?:string[] ):T & Carbon.Resource.Class
```

Create a Resource object with id and types if provided.  

**Parameters**
- object 
- id 
- types 

###### decorate

```typescript
Factory.decorate( object:T extends Object ):T & Carbon.Resource.Class
```

Decorates the object provided with the elements of a Resource object.  

**Parameters**
- object 






## Carbon/SDKContext





### Class Carbon.SDKContext.Class

> Base class for every Context in the SDK.

##### Constructors

```typescript
Class()
```
		


#### Instance

##### Properties

```typescript
Class.prototype.auth: Carbon.Auth.Class
```

Instance of Auth class for manage all the authentications in the context. 

```typescript
Class.prototype.documents: Carbon.Documents
```

Instance of Documents class for manage all the documents in the context. 

```typescript
Class.prototype.parentContext: Carbon.Context
```

Accessor for the parent context of the context. It is null since SDKContext.Class its the base of all context. 

##### Methods

###### getBaseURI

```typescript
Class.prototype.getBaseURI():string
```

Returns the base URI of the context, witch for is an empty string for this context.  


###### resolve

```typescript
Class.prototype.resolve( relativeURI:string ):string
```

Returns URI provided resolved in this context, witch is the same URI provided.  

**Parameters**
- relativeURI 

###### hasSetting

```typescript
Class.prototype.hasSetting( name:string ):boolean
```

Returns true if the setting looked for is established in the context.  

**Parameters**
- name 

###### getSetting

```typescript
Class.prototype.getSetting( name:string ):string
```

Returns the value of the setting looked for.
			Returns `null` if no settign with the name specified exists.  

**Parameters**
- name 

###### setSetting

```typescript
Class.prototype.setSetting( name:string,  value:any ):
```

Set a setting in the the context.  

**Parameters**
- name 
- value 

###### deleteSetting

```typescript
Class.prototype.deleteSetting( name:string ):
```

Deletes the setting specified from the the context.  

**Parameters**
- name 

###### hasObjectSchema

```typescript
Class.prototype.hasObjectSchema( type:string ):boolean
```

Returns true if the is an ObjectSchema for the specified type.  

**Parameters**
- type 

###### getObjectSchema

```typescript
Class.prototype.getObjectSchema( type?:string ):Carbon.ObjectSchema.DigestedObjectSchema
```

Returns the ObjectSchema for the specified type or null if not exits.
			If no type specified the general object schema of the context is returned. This is an schema that applies for all the types.  

**Parameters**
- type 

###### extendObjectSchema

```typescript
Class.prototype.extendObjectSchema( type:string,  objectSchema:Carbon.ObjectSchema.DigestedObjectSchema ):
```

Extends an Schema for a specified type of Resource  

**Parameters**
- type 
- objectSchema 

```typescript
Class.prototype.extendObjectSchema( objectSchema:Carbon.ObjectSchema.DigestedObjectSchema ):
```

Extends the General Schema of the context.  

**Parameters**
- objectSchema 

###### clearObjectSchema

```typescript
Class.prototype.clearObjectSchema( type?:string ):
```

Remove the Schema of the type specified, if not provided empty the General Schema.  

**Parameters**
- type 






## Carbon/SPARQL



### Reexports

| Export name | Original Location |
| --- | --- |
| SPARQL.RawResultsRawResults | [Carbon/SPARQL/RawResults](#Carbon/SPARQL/RawResults) |
| SPARQL.RawResultsParserRawResultsParser | [Carbon/SPARQL/RawResultsParser](#Carbon/SPARQL/RawResultsParser) |
| SPARQL.ServiceService | [Carbon/SPARQL/Service](#Carbon/SPARQL/Service) |



## Carbon/SPARQL/RawResults





### Class Carbon.SPARQL.RawResults

> Class where specifies the types a SPARQL query result can be


##### Properties

```typescript
RawResults.URI: string
```



```typescript
RawResults.LITERAL: string
```



```typescript
RawResults.BNODE: string
```






### Class 

> Factory class for RawResults objects


##### Methods

###### hasClassProperties

```typescript
Carbon.SPARQL.RawResults.Factory.hasClassProperties( value:Object ):boolean
```

Returns true if the object provided contains the properties required to be a `Carbon.SPARQL.RawResult.Class` object  

**Parameters**
- value 

###### is

```typescript
Carbon.SPARQL.RawResults.Factory.is( value:any ):boolean
```

Returns true if the object provided is a `Carbon.SPARQL.RawResult.Class` object  

**Parameters**
- value 






## Carbon/SPARQL/RawResultsParser





### Class Carbon.SPARQL.RawResultsParser.Class

> Class for parse SPARQL Query result to a `Carbon.SPARQL.RawResult.Class` object



#### Instance

##### Methods

###### parse

```typescript
Class.prototype.parse( input:string ):Promise<Carbon.SPARQL.RawResult.Class>
```

Parse the SPARQL Query string result to a `Carbon.SPARQL.RawResult.Class` object  

**Parameters**
- input 






## Carbon/SPARQL/Service





### Class Carbon.SPARQL.Service.Class

> Executes SPARQL queries and updates


##### Methods

###### executeRawASKQuery

```typescript
Class.executeRawASKQuery( url:string,  askQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes an ASK Query and returns a raw application/sparql-results+json object  

**Parameters**
- url 
- askQuery 
- requestOptions 

###### executeASKQuery

```typescript
Class.executeASKQuery( url:string,  askQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ boolean, Carbon.HTTP.Response.Class ]>
```

Executes an ASK Query and returns a boolean  

**Parameters**
- url 
- askQuery 
- requestOptions 

###### executeSELECTQuery

```typescript
Class.executeSELECTQuery( url:string,  selectQuery:string,  pointerLibrary:Carbon.Pointer.Library,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.SELECTResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes a SELECT Query and parses the results  

**Parameters**
- url 
- selectQuery 
- pointerLibrary 
- requestOptions 

###### executeRawSELECTQuery

```typescript
Class.executeRawSELECTQuery( url:string,  selectQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes a SELECT Query and returns a raw application/sparql-results+json object  

**Parameters**
- url 
- selectQuery 
- requestOptions 

###### executeRawCONSTRUCTQuery

```typescript
Class.executeRawCONSTRUCTQuery( url:string,  constructQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ string, Carbon.HTTP.Response.Class ]>
```

Executes a CONSTRUCT Query and returns a string with the resulting model  

**Parameters**
- url 
- constructQuery 
- requestOptions 

###### executeRawDESCRIBEQuery

```typescript
Class.executeRawDESCRIBEQuery( url:string,  describeQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ string, Carbon.HTTP.Response.Class ]>
```

Executes a DESCRIBE Query and returns a string with the resulting model  

**Parameters**
- url 
- describeQuery 
- requestOptions 






## Carbon/Utils

> The description of Carbon/Utils



### Class Carbon.Utils.O

> Utility functions related to strings.


##### Methods

###### areShallowlyEqual

```typescript
O.areShallowlyEqual( object1:object,  object2:object ):boolean
```

Checks if an object has the same enumerable properties with the same values as another object.  

**Parameters**
- object1 
- object2 





### Class 

> Utility functions related to strings.


##### Methods

###### startsWith

```typescript
Carbon.Utils.S.startsWith( string:string,  substring:string ):boolean
```

Checks if a string starts with a substring.  

**Parameters**
- string 
- substring 

###### endsWith

```typescript
Carbon.Utils.S.endsWith( string:string,  substring:string ):boolean
```

Checks if a string ends with a substring.  

**Parameters**
- string 
- substring 

###### contains

```typescript
Carbon.Utils.S.contains( string:string,  substring:string ):boolean
```

Checks if a string contains a substring (in any part).  

**Parameters**
- string 
- substring 





### Class 

> Utility functions related to Arrays


##### Methods

###### from

```typescript
Carbon.Utils.A.from( iterator:iterator ):array
```

Collects the values of an ES6 iterator and returns an array.  

**Parameters**
- iterator 

###### joinWithoutDuplicates

```typescript
Carbon.Utils.A.joinWithoutDuplicates( array:array ):array
```

Takes two or more arrays and joins them while removing duplicates  

**Parameters**
- array 





### Class 

> Utility functions related to ES6 Maps.


##### Methods

###### from

```typescript
Carbon.Utils.M.from( object:object ):map
```

Takes an object and creates a map from its properties.  

**Parameters**
- object 





### Class 

> Utility functions related to UUIDs


##### Methods

###### is

```typescript
Carbon.Utils.UUID.is( uuid:string ):string
```

Returns true if the string provided is a UUID (version 1 to 5).  

**Parameters**
- uuid 

###### generate

```typescript
Carbon.Utils.UUID.generate():string
```

Generates a new, version 4, UUID.  







## Carbon/settings





