# Carbon LDP JavaScript SDK API Reference

- `[C]` [Carbon](#Carbon)
- `[C]` [Carbon.AbstractContext.Class](#Carbon-AbstractContext-Class)
- `[I]` [Carbon.AccessPoint.Class](#Carbon-AccessPoint-Class)
- `[I]` [Carbon.AccessPoint.DocumentClass](#Carbon-AccessPoint-DocumentClass)
- `[C]` [Carbon.AccessPoint.Factory](#Carbon-AccessPoint-Factory)
- `[I]` [Carbon.APIDescription.Class](#Carbon-APIDescription-Class)
- `[C]` [Carbon.App.Agents.Class](#Carbon-App-Agents-Class)
- `[C]` [Carbon.App.Auth.Class](#Carbon-App-Auth-Class)
- `[I]` [Carbon.App.Class](#Carbon-App-Class)
- `[C]` [Carbon.App.Context](#Carbon-App-Context)
- `[C]` [Carbon.App.Factory](#Carbon-App-Factory)
- `[I]` [Carbon.App.PersistedAgent.Class](#Carbon-App-PersistedAgent-Class)
- `[I]` [Carbon.App.PersistedRole.Class](#Carbon-App-PersistedRole-Class)
- `[I]` [Carbon.App.PersistedRole.Class](#Carbon-App-PersistedRole-Class)
- `[C]` [Carbon.App.PersistedRole.Factory](#Carbon-App-PersistedRole-Factory)
- `[I]` [Carbon.App.Role.Class](#Carbon-App-Role-Class)
- `[C]` [Carbon.App.Role.Factory](#Carbon-App-Role-Factory)
- `[C]` [Carbon.App.Roles.Class](#Carbon-App-Roles-Class)
- `[C]` [Carbon.Apps.Class](#Carbon-Apps-Class)
- `[I]` [Carbon.Auth.ACE.Class](#Carbon-Auth-ACE-Class)
- `[I]` [Carbon.Auth.ACL.Class](#Carbon-Auth-ACL-Class)
- `[C]` [Carbon.Auth.ACL.Factory](#Carbon-Auth-ACL-Factory)
- `[I]` [Carbon.Auth.Agent.Class](#Carbon-Auth-Agent-Class)
- `[C]` [Carbon.Auth.Agent.Factory](#Carbon-Auth-Agent-Factory)
- `[C]` [Carbon.Auth.Agents.Class](#Carbon-Auth-Agents-Class)
- `[I]` [Carbon.Auth.AuthenticationToken.Class](#Carbon-Auth-AuthenticationToken-Class)
- `[I]` [Carbon.Auth.Authenticator.Class](#Carbon-Auth-Authenticator-Class)
- `[C]` [Carbon.Auth.BasicAuthenticator.Class](#Carbon-Auth-BasicAuthenticator-Class)
- `[C]` [Carbon.Auth.Class](#Carbon-Auth-Class)
- `[I]` [Carbon.Auth.Credentials.Class](#Carbon-Auth-Credentials-Class)
- `[I]` [Carbon.Auth.PersistedACE.Class](#Carbon-Auth-PersistedACE-Class)
- `[I]` [Carbon.Auth.PersistedACL.Class](#Carbon-Auth-PersistedACL-Class)
- `[C]` [Carbon.Auth.PersistedACL.Factory](#Carbon-Auth-PersistedACL-Factory)
- `[I]` [Carbon.Auth.PersistedAgent.Class](#Carbon-Auth-PersistedAgent-Class)
- `[C]` [Carbon.Auth.PersistedAgent.Factory](#Carbon-Auth-PersistedAgent-Factory)
- `[C]` [Carbon.Auth.PersistedRole.Factory](#Carbon-Auth-PersistedRole-Factory)
- `[I]` [Carbon.Auth.Role.Class](#Carbon-Auth-Role-Class)
- `[C]` [Carbon.Auth.Role.Factory](#Carbon-Auth-Role-Factory)
- `[C]` [Carbon.Auth.Roles.Class](#Carbon-Auth-Roles-Class)
- `[I]` [Carbon.Auth.Ticket.Class](#Carbon-Auth-Ticket-Class)
- `[C]` [Carbon.Auth.Ticket.Factory](#Carbon-Auth-Ticket-Factory)
- `[I]` [Carbon.Auth.Token.Class](#Carbon-Auth-Token-Class)
- `[C]` [Carbon.Auth.Token.Factory](#Carbon-Auth-Token-Factory)
- `[C]` [Carbon.Auth.TokenAuthenticator.Class](#Carbon-Auth-TokenAuthenticator-Class)
- `[C]` [Carbon.Auth.UsernameAndPasswordCredentials.Class](#Carbon-Auth-UsernameAndPasswordCredentials-Class)
- `[C]` [Carbon.Auth.UsernameAndPasswordToken.Class](#Carbon-Auth-UsernameAndPasswordToken-Class)
- `[I]` [Carbon.BlankNode.Class](#Carbon-BlankNode-Class)
- `[C]` [Carbon.BlankNode.Factory](#Carbon-BlankNode-Factory)
- `[I]` [Carbon.Context.Class](#Carbon-Context-Class)
- `[C]` [Carbon.DirectContainer.Factory](#Carbon-DirectContainer-Factory)
- `[I]` [Carbon.Document.Class](#Carbon-Document-Class)
- `[C]` [Carbon.Document.Factory](#Carbon-Document-Factory)
- `[C]` [Carbon.Documents.Class](#Carbon-Documents-Class)
- `[C]` [Carbon.Errors.AbstractError](#Carbon-Errors-AbstractError)
- `[C]` [Carbon.Errors.IDAlreadyInUseError](#Carbon-Errors-IDAlreadyInUseError)
- `[C]` [Carbon.Errors.IllegalActionError](#Carbon-Errors-IllegalActionError)
- `[C]` [Carbon.Errors.IllegalArgumentError](#Carbon-Errors-IllegalArgumentError)
- `[C]` [Carbon.Errors.IllegalStateError](#Carbon-Errors-IllegalStateError)
- `[C]` [Carbon.Errors.InvalidJSONLDSyntaxError](#Carbon-Errors-InvalidJSONLDSyntaxError)
- `[C]` [Carbon.Errors.NotImplementedError](#Carbon-Errors-NotImplementedError)
- `[I]` [Carbon.Fragment.Class](#Carbon-Fragment-Class)
- `[C]` [Carbon.Fragment.Factory](#Carbon-Fragment-Factory)
- `[I]` [Carbon.FreeResources.Class](#Carbon-FreeResources-Class)
- `[C]` [Carbon.FreeResources.Factory](#Carbon-FreeResources-Factory)
- `[C]` [Carbon.HTTP.Errors.BadGatewayError](#Carbon-HTTP-Errors-BadGatewayError)
- `[C]` [Carbon.HTTP.Errors.BadRequestError](#Carbon-HTTP-Errors-BadRequestError)
- `[C]` [Carbon.HTTP.Errors.BadResponseError](#Carbon-HTTP-Errors-BadResponseError)
- `[C]` [Carbon.HTTP.Errors.ConflictError](#Carbon-HTTP-Errors-ConflictError)
- `[C]` [Carbon.HTTP.Errors.ForbiddenError](#Carbon-HTTP-Errors-ForbiddenError)
- `[C]` [Carbon.HTTP.Errors.GatewayTimeoutError](#Carbon-HTTP-Errors-GatewayTimeoutError)
- `[C]` [Carbon.HTTP.Errors.HTTPError](#Carbon-HTTP-Errors-HTTPError)
- `[C]` [Carbon.HTTP.Errors.HTTPVersionNotSupportedError](#Carbon-HTTP-Errors-HTTPVersionNotSupportedError)
- `[C]` [Carbon.HTTP.Errors.InternalServerErrorError](#Carbon-HTTP-Errors-InternalServerErrorError)
- `[C]` [Carbon.HTTP.Errors.MethodNotAllowedError](#Carbon-HTTP-Errors-MethodNotAllowedError)
- `[C]` [Carbon.HTTP.Errors.NotAcceptableError](#Carbon-HTTP-Errors-NotAcceptableError)
- `[C]` [Carbon.HTTP.Errors.NotFoundError](#Carbon-HTTP-Errors-NotFoundError)
- `[C]` [Carbon.HTTP.Errors.NotImplementedError](#Carbon-HTTP-Errors-NotImplementedError)
- `[C]` [Carbon.HTTP.Errors.PreconditionFailedError](#Carbon-HTTP-Errors-PreconditionFailedError)
- `[C]` [Carbon.HTTP.Errors.PreconditionRequiredError](#Carbon-HTTP-Errors-PreconditionRequiredError)
- `[C]` [Carbon.HTTP.Errors.RequestEntityTooLargeError](#Carbon-HTTP-Errors-RequestEntityTooLargeError)
- `[C]` [Carbon.HTTP.Errors.RequestHeaderFieldsTooLargeError](#Carbon-HTTP-Errors-RequestHeaderFieldsTooLargeError)
- `[C]` [Carbon.HTTP.Errors.RequestURITooLongError](#Carbon-HTTP-Errors-RequestURITooLongError)
- `[C]` [Carbon.HTTP.Errors.ServiceUnavailableError](#Carbon-HTTP-Errors-ServiceUnavailableError)
- `[C]` [Carbon.HTTP.Errors.TooManyRequestsError](#Carbon-HTTP-Errors-TooManyRequestsError)
- `[C]` [Carbon.HTTP.Errors.UnauthorizedError](#Carbon-HTTP-Errors-UnauthorizedError)
- `[C]` [Carbon.HTTP.Errors.UnknownError](#Carbon-HTTP-Errors-UnknownError)
- `[C]` [Carbon.HTTP.Errors.UnsupportedMediaTypeError](#Carbon-HTTP-Errors-UnsupportedMediaTypeError)
- `[C]` [Carbon.HTTP.Header.Class](#Carbon-HTTP-Header-Class)
- `[C]` [Carbon.HTTP.Header.Util](#Carbon-HTTP-Header-Util)
- `[C]` [Carbon.HTTP.Header.Value](#Carbon-HTTP-Header-Value)
- `[C]` [Carbon.HTTP.JSONLDParser.Class](#Carbon-HTTP-JSONLDParser-Class)
- `[C]` [Carbon.HTTP.JSONParser.Class](#Carbon-HTTP-JSONParser-Class)
- `[I]` [Carbon.HTTP.Request.ContainerRetrievalPreferences](#Carbon-HTTP-Request-ContainerRetrievalPreferences)
- `[I]` [Carbon.HTTP.Request.Options](#Carbon-HTTP-Request-Options)
- `[C]` [Carbon.HTTP.Request.Service](#Carbon-HTTP-Request-Service)
- `[C]` [Carbon.HTTP.Request.Util](#Carbon-HTTP-Request-Util)
- `[C]` [Carbon.HTTP.Response.Class](#Carbon-HTTP-Response-Class)
- `[C]` [Carbon.HTTP.Response.Util](#Carbon-HTTP-Response-Util)
- `[C]` [Carbon.HTTP.StringParser.Class](#Carbon-HTTP-StringParser-Class)
- `[C]` [Carbon.IndirectContainer.Factory](#Carbon-IndirectContainer-Factory)
- `[C]` [Carbon.JSONLD.Converter.Class](#Carbon-JSONLD-Converter-Class)
- `[C]` [Carbon.JSONLD.Processor.Class](#Carbon-JSONLD-Processor-Class)
- `[I]` [Carbon.LDP.AddMemberAction.Class](#Carbon-LDP-AddMemberAction-Class)
- `[C]` [Carbon.LDP.AddMemberAction.Factory](#Carbon-LDP-AddMemberAction-Factory)
- `[I]` [Carbon.LDP.DirectContainer.Class](#Carbon-LDP-DirectContainer-Class)
- `[I]` [Carbon.LDP.Error.Class](#Carbon-LDP-Error-Class)
- `[I]` [Carbon.LDP.ErrorResponse.Class](#Carbon-LDP-ErrorResponse-Class)
- `[C]` [Carbon.LDP.ErrorResponse.Parser](#Carbon-LDP-ErrorResponse-Parser)
- `[C]` [Carbon.LDP.ErrorResponse.Util](#Carbon-LDP-ErrorResponse-Util)
- `[I]` [Carbon.LDP.IndirectContainer.Class](#Carbon-LDP-IndirectContainer-Class)
- `[I]` [Carbon.LDP.RemoveMemberAction.Class](#Carbon-LDP-RemoveMemberAction-Class)
- `[C]` [Carbon.LDP.RemoveMemberAction.Factory](#Carbon-LDP-RemoveMemberAction-Factory)
- `[I]` [Carbon.LDP.ResourceMetadata.Class](#Carbon-LDP-ResourceMetadata-Class)
- `[C]` [Carbon.LDP.ResourceMetadata.Factory](#Carbon-LDP-ResourceMetadata-Factory)
- `[I]` [Carbon.LDP.ResponseMetadata.Class](#Carbon-LDP-ResponseMetadata-Class)
- `[C]` [Carbon.LDP.ResponseMetadata.Factory](#Carbon-LDP-ResponseMetadata-Factory)
- `[I]` [Carbon.LDP.VolatileResource.Class](#Carbon-LDP-VolatileResource-Class)
- `[C]` [Carbon.LDP.VolatileResource.Factory](#Carbon-LDP-VolatileResource-Factory)
- `[I]` [Carbon.NamedFragment.Class](#Carbon-NamedFragment-Class)
- `[C]` [Carbon.NamedFragment.Factory](#Carbon-NamedFragment-Factory)
- `[C]` [Carbon.NS.C.Class](#Carbon-NS-C-Class)
- `[C]` [Carbon.NS.C.Predicate](#Carbon-NS-C-Predicate)
- `[C]` [Carbon.NS.CP.Predicate](#Carbon-NS-CP-Predicate)
- `[C]` [Carbon.NS.CS.Class](#Carbon-NS-CS-Class)
- `[C]` [Carbon.NS.CS.Predicate](#Carbon-NS-CS-Predicate)
- `[C]` [Carbon.NS.LDP.Class](#Carbon-NS-LDP-Class)
- `[C]` [Carbon.NS.LDP.Predicate](#Carbon-NS-LDP-Predicate)
- `[C]` [Carbon.NS.RDF.Predicate](#Carbon-NS-RDF-Predicate)
- `[C]` [Carbon.NS.VCARD.Predicate](#Carbon-NS-VCARD-Predicate)
- `[C]` [Carbon.NS.XSD.DataType](#Carbon-NS-XSD-DataType)
- `[I]` [Carbon.ObjectSchema.Class](#Carbon-ObjectSchema-Class)
- `[C]` [Carbon.ObjectSchema.DigestedObjectSchema](#Carbon-ObjectSchema-DigestedObjectSchema)
- `[C]` [Carbon.ObjectSchema.DigestedPropertyDefinition](#Carbon-ObjectSchema-DigestedPropertyDefinition)
- `[C]` [Carbon.ObjectSchema.Digester](#Carbon-ObjectSchema-Digester)
- `[I]` [Carbon.ObjectSchema.PropertyDefinition](#Carbon-ObjectSchema-PropertyDefinition)
- `[C]` [Carbon.ObjectSchema.Utils](#Carbon-ObjectSchema-Utils)
- `[I]` [Carbon.PersistedAccessPoint.Class](#Carbon-PersistedAccessPoint-Class)
- `[I]` [Carbon.PersistedApp.Class](#Carbon-PersistedApp-Class)
- `[C]` [Carbon.PersistedApp.Factory](#Carbon-PersistedApp-Factory)
- `[I]` [Carbon.PersistedBlankNode.Class](#Carbon-PersistedBlankNode-Class)
- `[I]` [Carbon.PersistedDocument.Class](#Carbon-PersistedDocument-Class)
- `[C]` [Carbon.PersistedDocument.Factory](#Carbon-PersistedDocument-Factory)
- `[I]` [Carbon.PersistedFragment.Class](#Carbon-PersistedFragment-Class)
- `[C]` [Carbon.PersistedFragment.Factory](#Carbon-PersistedFragment-Factory)
- `[I]` [Carbon.PersistedNamedFragment.Class](#Carbon-PersistedNamedFragment-Class)
- `[C]` [Carbon.PersistedNamedFragment.Factory](#Carbon-PersistedNamedFragment-Factory)
- `[I]` [Carbon.PersistedProtectedDocument.Class](#Carbon-PersistedProtectedDocument-Class)
- `[C]` [Carbon.PersistedProtectedDocument.Factory](#Carbon-PersistedProtectedDocument-Factory)
- `[I]` [Carbon.PersistedResource.Class](#Carbon-PersistedResource-Class)
- `[C]` [Carbon.PersistedResource.Factory](#Carbon-PersistedResource-Factory)
- `[C]` [Carbon.Platform.Agents.Class](#Carbon-Platform-Agents-Class)
- `[C]` [Carbon.Platform.Auth.Class](#Carbon-Platform-Auth-Class)
- `[I]` [Carbon.Platform.PersistedAgent.Class](#Carbon-Platform-PersistedAgent-Class)
- `[I]` [Carbon.Pointer.Class](#Carbon-Pointer-Class)
- `[C]` [Carbon.Pointer.Factory](#Carbon-Pointer-Factory)
- `[I]` [Carbon.Pointer.Library](#Carbon-Pointer-Library)
- `[C]` [Carbon.Pointer.Util](#Carbon-Pointer-Util)
- `[I]` [Carbon.Pointer.Validator](#Carbon-Pointer-Validator)
- `[I]` [Carbon.ProtectedDocument.Class](#Carbon-ProtectedDocument-Class)
- `[I]` [Carbon.RDF.Document.Class](#Carbon-RDF-Document-Class)
- `[C]` [Carbon.RDF.Document.Factory](#Carbon-RDF-Document-Factory)
- `[C]` [Carbon.RDF.Document.Parser](#Carbon-RDF-Document-Parser)
- `[C]` [Carbon.RDF.Document.Util](#Carbon-RDF-Document-Util)
- `[I]` [Carbon.RDF.List.Class](#Carbon-RDF-List-Class)
- `[C]` [Carbon.RDF.List.Factory](#Carbon-RDF-List-Factory)
- `[I]` [Carbon.RDF.Literal.Class](#Carbon-RDF-Literal-Class)
- `[C]` [Carbon.RDF.Literal.Factory](#Carbon-RDF-Literal-Factory)
- `[I]` [Carbon.RDF.Literal.Serializer.Class](#Carbon-RDF-Literal-Serializer-Class)
- `[C]` [Carbon.RDF.Literal.Serializes.XSD.BooleanSerializer](#Carbon-RDF-Literal-Serializes-XSD-BooleanSerializer)
- `[C]` [Carbon.RDF.Literal.Serializes.XSD.DateSerializer](#Carbon-RDF-Literal-Serializes-XSD-DateSerializer)
- `[C]` [Carbon.RDF.Literal.Serializes.XSD.DateTimeSerializer](#Carbon-RDF-Literal-Serializes-XSD-DateTimeSerializer)
- `[C]` [Carbon.RDF.Literal.Serializes.XSD.FloatSerializer](#Carbon-RDF-Literal-Serializes-XSD-FloatSerializer)
- `[C]` [Carbon.RDF.Literal.Serializes.XSD.IntegerSerializer](#Carbon-RDF-Literal-Serializes-XSD-IntegerSerializer)
- `[C]` [Carbon.RDF.Literal.Serializes.XSD.StringSerializer](#Carbon-RDF-Literal-Serializes-XSD-StringSerializer)
- `[C]` [Carbon.RDF.Literal.Serializes.XSD.TimeSerializer](#Carbon-RDF-Literal-Serializes-XSD-TimeSerializer)
- `[C]` [Carbon.RDF.Literal.Serializes.XSD.UnsignedIntegerSerializer](#Carbon-RDF-Literal-Serializes-XSD-UnsignedIntegerSerializer)
- `[I]` [Carbon.RDF.Node.Class](#Carbon-RDF-Node-Class)
- `[C]` [Carbon.RDF.Node.Factory](#Carbon-RDF-Node-Factory)
- `[C]` [Carbon.RDF.Node.Util](#Carbon-RDF-Node-Util)
- `[C]` [Carbon.RDF.URI.Class](#Carbon-RDF-URI-Class)
- `[C]` [Carbon.RDF.URI.Util](#Carbon-RDF-URI-Util)
- `[I]` [Carbon.RDF.Value.Class](#Carbon-RDF-Value-Class)
- `[C]` [Carbon.RDF.Value.Util](#Carbon-RDF-Value-Util)
- `[I]` [Carbon.RDFRepresentation.Class](#Carbon-RDFRepresentation-Class)
- `[C]` [Carbon.RDFRepresentation.Factory](#Carbon-RDFRepresentation-Factory)
- `[I]` [Carbon.Resource.Class](#Carbon-Resource-Class)
- `[C]` [Carbon.Resource.Factory](#Carbon-Resource-Factory)
- `[I]` [Carbon.RetrievalPreferences.Class](#Carbon-RetrievalPreferences-Class)
- `[C]` [Carbon.RetrievalPreferences.Factory](#Carbon-RetrievalPreferences-Factory)
- `[I]` [Carbon.RetrievalPreferences.OrderByProperty](#Carbon-RetrievalPreferences-OrderByProperty)
- `[C]` [Carbon.RetrievalPreferences.Util](#Carbon-RetrievalPreferences-Util)
- `[C]` [Carbon.SDKContext.Class](#Carbon-SDKContext-Class)
- `[I]` [Carbon.Settings.Class](#Carbon-Settings-Class)
- `[C]` [Carbon.SPARQL.RawResults](#Carbon-SPARQL-RawResults)
- `[I]` [Carbon.SPARQL.RawResults.BindingObject](#Carbon-SPARQL-RawResults-BindingObject)
- `[I]` [Carbon.SPARQL.RawResults.BindingProperty](#Carbon-SPARQL-RawResults-BindingProperty)
- `[I]` [Carbon.SPARQL.RawResults.Class](#Carbon-SPARQL-RawResults-Class)
- `[C]` [Carbon.SPARQL.RawResults.Factory](#Carbon-SPARQL-RawResults-Factory)
- `[C]` [Carbon.SPARQL.RawResultsParser](#Carbon-SPARQL-RawResultsParser)
- `[I]` [Carbon.SPARQL.SELECTResults.BindingObject](#Carbon-SPARQL-SELECTResults-BindingObject)
- `[I]` [Carbon.SPARQL.SELECTResults.Class](#Carbon-SPARQL-SELECTResults-Class)
- `[C]` [Carbon.SPARQL.Service.Class](#Carbon-SPARQL-Service-Class)
- `[C]` [Carbon.Utils.A](#Carbon-Utils-A)
- `[C]` [Carbon.Utils.M](#Carbon-Utils-M)
- `[C]` [Carbon.Utils.O](#Carbon-Utils-O)
- `[C]` [Carbon.Utils.S](#Carbon-Utils-S)
- `[C]` [Carbon.Utils.UUID](#Carbon-Utils-UUID)


## <a name="Module-Carbon"/>Module Carbon







### <a name="Carbon"/>Class Carbon

**Extends:** [Carbon.AbstractContext](#Carbon-AbstractContext)

> The main class of the SDK, which contains all the references of the modules used in the the SDK.

#### <a name="Carbon-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| AccessPoint | [Carbon/AccessPoint](#Module-Carbon-AccessPoint) |
| App | [Carbon/App](#Module-Carbon-App) |
| Apps | [Carbon/Apps](#Module-Carbon-Apps) |
| Auth | [Carbon/Auth](#Module-Carbon-Auth) |
| Document | [Carbon/Document](#Module-Carbon-Document) |
| Documents | [Carbon/Documents](#Module-Carbon-Documents) |
| Errors | [Carbon/Errors](#Module-Carbon-Errors) |
| Fragment | [Carbon/Fragment](#Module-Carbon-Fragment) |
| HTTP | [Carbon/HTTP](#Module-Carbon-HTTP) |
| JSONLD | [Carbon/JSONLD](#Module-Carbon-JSONLD) |
| LDP | [Carbon/LDP](#Module-Carbon-LDP) |
| NamedFragment | [Carbon/NamedFragment](#Module-Carbon-NamedFragment) |
| NS | [Carbon/NS](#Module-Carbon-NS) |
| ObjectSchema | [Carbon/ObjectSchema](#Module-Carbon-ObjectSchema) |
| PersistedApp | [Carbon/PersistedApp](#Module-Carbon-PersistedApp) |
| PersistedDocument | [Carbon/PersistedDocument](#Module-Carbon-PersistedDocument) |
| PersistedFragment | [Carbon/PersistedFragment](#Module-Carbon-PersistedFragment) |
| PersistedNamedFragment | [Carbon/PersistedNamedFragment](#Module-Carbon-PersistedNamedFragment) |
| PersistedResource | [Carbon/PersistedResource](#Module-Carbon-PersistedResource) |
| Platform | [Carbon/Platform](#Module-Carbon-Platform) |
| Pointer | [Carbon/Pointer](#Module-Carbon-Pointer) |
| RDF | [Carbon/RDF](#Module-Carbon-RDF) |
| Resource | [Carbon/Resource](#Module-Carbon-Resource) |
| SDKContext | [Carbon/SDKContext](#Module-Carbon-SDKContext) |
| Settings | [Carbon/Settings](#Module-Carbon-Settings) |
| SPARQL | [Carbon/SPARQL](#Module-Carbon-SPARQL) |
| Utils | [Carbon/Utils](#Module-Carbon-Utils) |

#### <a name="Carbon-Constructor"/>Constructor
```typescript 
Carbon( settings?:Carbon.Settings.Class )
```


*Parameters*

- settings


#### <a name="Carbon-Properties"/>Properties
```typescript 
static version:string 
```

Returns the version of the SDK.




```typescript 
apps:Carbon.Apps.Class 
```

Instance of the class `Carbon.Apps` in the context of the instanced Carbon class.

--

```typescript 
auth:Carbon.Platform.Auth.Class 
```

Instance of `Carbon.Platform.Auth.Class` class for manage the auth inside of the platform.

--

```typescript 
version:string 
```

Returns the version of the SDK.




#### <a name="Carbon-Methods"/>Methods

##### getAPIDescription
```typescript 
getAPIDescription():Promise<Carbon.APIDescription.Class>
```

Returns the API description of the related CarbonLDP Platform.


--

##### resolve
```typescript 
resolve( uri:string ):string
```

Resolve the URI provided in the scope of the CarbonLDP Platform.

*Parameters*

- uri






## <a name="Module-Carbon-App-PersistedAgent"/>Module Carbon.App.PersistedAgent


**Default export:** [Carbon.App.PersistedAgent.Class](#Carbon-App-PersistedAgent-Class)





### <a name="Carbon-App-PersistedAgent-Class"/>Interface Carbon.App.PersistedAgent.Class

**Extends:** [Carbon.Auth.PersistedAgent.Class](#Carbon-Auth-PersistedAgent-Class)

> Specific interface that represents the persisted agents from an application.



## <a name="Module-Carbon-Platform-PersistedAgent"/>Module Carbon.Platform.PersistedAgent


**Default export:** [Carbon.Platform.PersistedAgent.Class](#Carbon-Platform-PersistedAgent-Class)





### <a name="Carbon-Platform-PersistedAgent-Class"/>Interface Carbon.Platform.PersistedAgent.Class

**Extends:** [Carbon.Auth.PersistedAgent.Class](#Carbon-Auth-PersistedAgent-Class)

> Interface that specify an persisted agent in platform context i.e. Carbon context.

#### <a name="Carbon-Platform-PersistedAgent-Class-Properties"/>Properties
```typescript 
platformRoles?:Carbon.Pointer.Class[] 
```

A array of pointer that contains the specific platform roles the current agent have.





## <a name="Module-Carbon-APIDescription"/>Module Carbon/APIDescription


**Default export:** [Carbon.APIDescription.Class](#Carbon-APIDescription-Class)



### <a name="Carbon-APIDescription-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-APIDescription-Class"/>Interface Carbon.APIDescription.Class


> Interface that represents a requested API description of the Carbon LDP Platform configured.

#### <a name="Carbon-APIDescription-Class-Properties"/>Properties
```typescript 
buildDate:Date 
```

The last time the platform was built.

--

```typescript 
version:string 
```

The version of the Carbon LDP Platform configured.





## <a name="Module-Carbon-AbstractContext"/>Module Carbon/AbstractContext


**Default export:** [Carbon.AbstractContext.Class](#Carbon-AbstractContext-Class)





### <a name="Carbon-AbstractContext-Class"/>Class Carbon.AbstractContext.Class

**Extends:** [Carbon.SDKContext.Class](#Carbon-SDKContext-Class)

> Abstract class for defining contexts.


#### <a name="Carbon-AbstractContext-Class-Constructor"/>Constructor
```typescript 
Class()
```



#### <a name="Carbon-AbstractContext-Class-Properties"/>Properties

```typescript 
parentContext:Carbon.Context.Class 
```

The parent context provided in the constructor. If no context was provided, this property will be the singleton `Carbon.SDKContext.instance` of the class `Carbon.SDKContext.Class`.




#### <a name="Carbon-AbstractContext-Class-Methods"/>Methods

##### resolve
```typescript 
resolve( relativeURI:string ):string
```

Abstract method that returns an absolute URI in accordance to the context scope from the relative URI provided.

*Parameters*

- relativeURI






## <a name="Module-Carbon-AccessPoint"/>Module Carbon/AccessPoint


**Default export:** [Carbon.AccessPoint.Class](#Carbon-AccessPoint-Class)



### <a name="Carbon-AccessPoint-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```







### <a name="Carbon-AccessPoint-Class"/>Interface Carbon.AccessPoint.Class


> Interface that represents the basic properties to construct an `Carbon.AccessPoint.DocumentClass`.

#### <a name="Carbon-AccessPoint-Class-Properties"/>Properties
```typescript 
hasMemberRelation:string | Carbon.Pointer.Class 
```

The string URI or pointer URI that represents the member relation that the access point will manage.

--

```typescript 
insertedContentRelation?:string | Carbon.Pointer.Class 
```

The string URI or pointer URI that represents the inserted content relation of the access point.

--

```typescript 
isMemberOfRelation?:string | Carbon.Pointer.Class 
```

The string URI or pointer URI that represents the inverted relation that the access point will create.





### <a name="Carbon-AccessPoint-DocumentClass"/>Interface Carbon.AccessPoint.DocumentClass

**Extends:** [Carbon.LDP.DirectContainer.Class](#Carbon-LDP-DirectContainer-Class)

> Interface that represents the document of an in-memory access point.

#### <a name="Carbon-AccessPoint-DocumentClass-Properties"/>Properties
```typescript 
hasMemberRelation:Carbon.Pointer.Class 
```

Pointer that represents the member relation that the access point will manage.

--

```typescript 
insertedContentRelation?:Carbon.Pointer.Class 
```

Pointer that represents the inserted content relation of the access point.

--

```typescript 
isMemberOfRelation?:Carbon.Pointer.Class 
```

Pointer that represents the inverted relation that the access point will create.





### <a name="Carbon-AccessPoint-Factory"/>Class Carbon.AccessPoint.Factory


> Factory class for `Carbon.AccessPoint.Class` objects.




#### <a name="Carbon-AccessPoint-Factory-Methods"/>Methods
##### create
```typescript 
static create( membershipResource:Carbon.Pointer.Class,  hasMemberRelation:string | Carbon.Pointer.Class,  isMemberOfRelation?:string | Carbon.Pointer.Class ):Carbon.AccessPoint.Class
```

Creates a `Carbon.AccessPoint.Class` object with the parameters specified.

*Parameters*

- membershipResource: A Pointer to the parent of the AccessPoint.
- hasMemberRelation: A URI or Pointer to the property in the parent resource managed by the AccessPoint.
- isMemberOfRelation: A URI or Pointer to the property managed in the members added by the AccessPoint.


--

##### createFrom
```typescript 
static createFrom<T extends Object>( object:T,  membershipResource:Carbon.Pointer.Class,  hasMemberRelation:string | Carbon.Pointer.Class,  isMemberOfRelation?:string | Carbon.Pointer.Class ):T & Carbon.AccessPoint.Class
```

Creates a `Carbon.AccessPoint.Class` object from the object and parameters specified.

*Parameters*

- object: Object that will be converted into an AccessPoint.
- membershipResource: A Pointer to the parent of the AccessPoint.
- hasMemberRelation: A URI or Pointer to the property in the parent resource managed by the AccessPoint.
- isMemberOfRelation: A URI or Pointer to the property managed in the members added by the AccessPoint.







## <a name="Module-Carbon-App"/>Module Carbon/App


**Default export:** [Carbon.App.Class](#Carbon-App-Class)

#### <a name="Carbon-App-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| Context | [Carbon/App/Context](#Module-Carbon-App-Context) |
| Role | [Carbon/App/Role](#Module-Carbon-App-Role) |
| Roles | [Carbon/App/Roles](#Module-Carbon-App-Roles) |


### <a name="Carbon-App-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-App-Class"/>Interface Carbon.App.Class


> Interface that represents a Carbon LDP Platform application.

#### <a name="Carbon-App-Class-Properties"/>Properties
```typescript 
allowsOrigin?:(string | Carbon.Pointer.Class)[] 
```

An array of string URIs or Pointers that refers to the origins allowed to connect to the application. An special URI that allows everyone to connect is at `Carbon.NS.CS.Class.AllOrigins` which translates to `https://carbonldp.com/ns/v1/security#AllOrigins`.

--

```typescript 
description?:string 
```

A brief description of the current application.

--

```typescript 
name:string 
```

The name of the current application.





### <a name="Carbon-App-Factory"/>Class Carbon.App.Factory


> Factory class for `Carbon.App.Class` objects.




#### <a name="Carbon-App-Factory-Methods"/>Methods
##### create
```typescript 
static create( name:string,  description?:string ):Carbon.App.Class
```

Creates a `Carbon.App.Class` object with the parameters specified.

*Parameters*

- name: Name of the app to be created.
- description: Description of the app to be created.


--

##### createFrom
```typescript 
static createFrom<T extends Object>( object:T,  name:string,  description?:string ):T & Carbon.App.Class
```

Creates a `Carbon.App.Class` object from the object and parameters specified.

*Parameters*

- object: Object that will be converted into aa App.
- name: Name of the app to be created.
- description: Description of the app to be created.


--

##### hasClassProperties
```typescript 
static hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties that defines a `Carbon.App.Class` object

*Parameters*

- resource


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.App.Class` object

*Parameters*

- object







## <a name="Module-Carbon-App-Agents"/>Module Carbon/App/Agents


**Default export:** [Carbon.App.Agents.Class](#Carbon-App-Agents-Class)





### <a name="Carbon-App-Agents-Class"/>Class Carbon.App.Agents.Class

**Extends:** [Carbon.Auth.Agents.Class](#Carbon-Auth-Agents-Class)

> Class for manage Agents of an application context.


#### <a name="Carbon-App-Agents-Class-Constructor"/>Constructor
```typescript 
Class( context:Carbon.App.Context.Class )
```


*Parameters*

- context: The application context where to manage its Agents.



#### <a name="Carbon-App-Agents-Class-Methods"/>Methods

##### get
```typescript 
get( agentURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.App.PersistedAgent.Class, Carbon.HTTP.Response.Class ]>
```

Retrieves the application agent specified from the current application context.

*Parameters*

- agentURI: The URI of the application agent to retrieve.
- requestOptions: Customizable options for the request.






## <a name="Module-Carbon-App-Auth"/>Module Carbon/App/Auth


**Default export:** [Carbon.App.Auth.Class](#Carbon-App-Auth-Class)





### <a name="Carbon-App-Auth-Class"/>Class Carbon.App.Auth.Class


> Implementation of `Carbon.Auth.Class` abstract class, that will manage the authentication and authorization specific of a Application Context.


#### <a name="Carbon-App-Auth-Class-Constructor"/>Constructor
```typescript 
Class( appContext:Carbon.App.Context )
```


*Parameters*

- appContext: Instance of the application context to manage its authentications and authorizations.


#### <a name="Carbon-App-Auth-Class-Properties"/>Properties

```typescript 
roles:Carbon.App.Roles.Class 
```

Instance of `Carbon.App.Roles.Class`, for managing the roles of the current context.






## <a name="Module-Carbon-App-Context"/>Module Carbon/App/Context


**Default export:** [Carbon.App.Context.Class](#Carbon-App-Context-Class)





### <a name="Carbon-App-Context"/>Class Carbon.App.Context

**Extends:** [Carbon.AbstractContext](#Carbon-AbstractContext)

> Class that represents de scope of a CarbonLDP Application.


#### <a name="Carbon-App-Context-Constructor"/>Constructor
```typescript 
Context( parentContext:Carbon.Context.Class,  app:Carbon.App.Context )
```


*Parameters*

- parentContext
- app


#### <a name="Carbon-App-Context-Properties"/>Properties

```typescript 
app:Carbon.App.Class 
```

The Document that represents the CarbonLDP Application.

--

```typescript 
auth:Carbon.App.Auth.Class 
```

Instance of `Carbon.App.Auth.Class` class for manage the auth inside of an application.




#### <a name="Carbon-App-Context-Methods"/>Methods

##### resolve
```typescript 
resolve( uri:string ):string
```

Resolve the URI provided in the scope of the application.

*Parameters*

- uri






## <a name="Module-Carbon-App-PersistedRole"/>Module Carbon/App/PersistedRole


**Default export:** [Carbon.App.PersistedRole.Class](#Carbon-App-PersistedRole-Class)





### <a name="Carbon-App-PersistedRole-Class"/>Interface Carbon.App.PersistedRole.Class

**Extends:** [Carbon.Auth.PersistedRole.Class](#Carbon-Auth-PersistedRole-Class)

> Specific interface that represents a persisted role of an application.

#### <a name="Carbon-App-PersistedRole-Class-Properties"/>Properties
```typescript 
_roles:Carbon.App.Roles.Class 
```

(Internal) Instance of the AppRoles class that manage the current role.

--

```typescript 
childRole?:Carbon.Pointer.Class[] 
```

An array of pointer that references to all the children of the current role.

--

```typescript 
parentRole?:Carbon.Pointer.Class 
```

Reference to the parent of the current role.





### <a name="Carbon-App-PersistedRole-Factory"/>Class Carbon.App.PersistedRole.Factory


> Factory class for `Carbon.App.PersistedRole.Class` objects




#### <a name="Carbon-App-PersistedRole-Factory-Methods"/>Methods
##### decorate
```typescript 
static decorate<T extends Carbon.PersistedDocument.Class>( object:T ):T & Carbon.App.PersistedRole.Class
```

Decorates the object provided with the methods and properties of a `Carbon.App.PersistedRole.Class` object.

*Parameters*

- object


--

##### hasClassProperties
```typescript 
static hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties that defines a `Carbon.App.PersistedRole.Class` object

*Parameters*

- resource


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.App.PersistedRole.Class` object

*Parameters*

- object







## <a name="Module-Carbon-App-Roles"/>Module Carbon/App/Roles


**Default export:** [Carbon.App.Roles.Class](#Carbon-App-Roles-Class)





### <a name="Carbon-App-Roles-Class"/>Class Carbon.App.Roles.Class

**Extends:** [Carbon.Auth.Roles](#Carbon-Auth-Roles)

> Class for manage roles of an application.


#### <a name="Carbon-App-Roles-Class-Constructor"/>Constructor
```typescript 
Class( appContext:Carbon.App.Context )
```


*Parameters*

- appContext



#### <a name="Carbon-App-Roles-Class-Methods"/>Methods

##### createChild
```typescript 
createChild( parentRole:string | Carbon.Pointer.Class,  role:Carbon.App.Roles.Class,  slug?:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Pointer.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class] ]>
```

Persists the AppRole provided with the slug, if specified, as a childRole of the parentRole specified.
Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.

*Parameters*

- parentRole: The role that will be assigned as the parent of the role that wants to persist.
- role: The appRole that wants to persist.
- slug: The slug where the role will be persisted.
- requestOptions: The slug where the role will be persisted.

```typescript 
createChild( parentRole:string | Carbon.Pointer.Class,  role:Carbon.App.Roles.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Pointer.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class] ]>
```

Persists the AppRole provided as a childRole of the parentRole specified.
Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.

*Parameters*

- parentRole: The role that will be assigned as the parent of the role that wants to persist.
- role: The appRole that wants to persist.
- requestOptions: The slug where the role will be persisted.


--

##### get
```typescript 
get( roleURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Retrieves a role from the current context.

*Parameters*

- roleURI: The URI of the app role to retrieve.
- requestOptions






## <a name="Module-Carbon-Apps"/>Module Carbon/Apps


**Default export:** [Carbon.Apps.Class](#Carbon-Apps-Class)





### <a name="Carbon-Apps-Class"/>Class Carbon.Apps.Class


> Class for managing Carbon Apps.


#### <a name="Carbon-Apps-Class-Constructor"/>Constructor
```typescript 
Class( context:Carbon.Context.Class )
```


*Parameters*

- context: A context from where Carbon Apps can be administrated.



#### <a name="Carbon-Apps-Class-Methods"/>Methods

##### create
```typescript 
create( appDocument:Carbon.App.Class,  slug:string ):Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>
```

Persists a `Carbon.App.Class` object using the slug specified.
Returns a Promise with a Pointer to the stored App, and the response of the request.

*Parameters*

- appDocument: App document that will be persisted.
- slug: Slug that will be used for the URI of the new app.


--

##### delete
```typescript 
delete( appURI:string,  requestOptions:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Deletes the app specified.

*Parameters*

- appURI: The URI of the app to be deleted.
- requestOptions


--

##### getAllContexts
```typescript 
getAllContexts():Promise<Carbon.App.Context[]>
```

Retrieves an array of `Carbon.App.Context` objects, of every app the current user have access to.


--

##### getContext
```typescript 
getContext( uri:string ):Promise<Carbon.App.Context>
```

Retrieves a `Carbon.App.Context` object from the specified app's URI.

*Parameters*

- uri: URI of the app to retrieve and create its context.

```typescript 
getContext( pointer:Carbon.Pointer.Class ):Promise<Carbon.App.Context>
```

Retrieves a `Carbon.App.Context` object from the specified app's Pointer.

*Parameters*

- pointer: Pointer of the app to retrieve and create its context.






## <a name="Module-Carbon-Apps-Role"/>Module Carbon/Apps/Role


**Default export:** [Carbon.App.Role.Class](#Carbon-App-Role-Class)



### <a name="Carbon-Apps-Role-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-App-Role-Class"/>Interface Carbon.App.Role.Class

**Extends:** [Carbon.Auth.Role.Class](#Carbon-Auth-Role-Class)

> Specific interface that represents an in memory role for an application.



### <a name="Carbon-App-Role-Factory"/>Class Carbon.App.Role.Factory


> Factory class for `Carbon.App.Role.Class` objects




#### <a name="Carbon-App-Role-Factory-Methods"/>Methods
##### create
```typescript 
static create( name:string,  email:string ):Carbon.App.Role.Class
```

Create a `Carbon.App.Role.Class` object with the name and email specified.

*Parameters*

- name
- email


--

##### createFrom
```typescript 
static createFrom( object:T extends Object ):T & Carbon.App.Role.Class
```

Create a `Carbon.App.Role.Class` object with the object provided.

*Parameters*

- object


--

##### hasClassProperties
```typescript 
static hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties that defines a `Carbon.App.Role.Class` object

*Parameters*

- resource


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.App.Role.Class` object

*Parameters*

- object







## <a name="Module-Carbon-Auth"/>Module Carbon/Auth


**Default export:** [Carbon.Auth.Class](#Carbon-Auth-Class)

#### <a name="Carbon-Auth-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| ACE | [Carbon.Auth.ACE](#Module-Carbon-Auth-ACE) |
| ACL | [Carbon.Auth.ACL](#Module-Carbon-Auth-ACL) |
| Agent | [Carbon.Auth.Agent](#Module-Carbon-Auth-Agent) |
| Agents | [Carbon.Auth.Agents](#Module-Carbon-Auth-Agents) |
| AuthenticationToken | [Carbon.Auth.AuthenticationToken](#Module-Carbon-Auth-AuthenticationToken) |
| Authenticator | [Carbon.Auth.Authenticator](#Module-Carbon-Auth-Authenticator) |
| BasicAuthenticator | [Carbon.Auth.BasicAuthenticator](#Module-Carbon-Auth-BasicAuthenticator) |
| PersistedACE | [Carbon.Auth.PersistedACE](#Module-Carbon-Auth-PersistedACE) |
| PersistedACL | [Carbon.Auth.PersistedACL](#Module-Carbon-Auth-PersistedACL) |
| PersistedAgent | [Carbon.Auth.PersistedAgent](#Module-Carbon-Auth-PersistedAgent) |
| Role | [Carbon.Auth.Role](#Module-Carbon-Auth-Role) |
| Roles | [Carbon.Auth.Roles](#Module-Carbon-Auth-Roles) |
| Ticket | [Carbon.Auth.Ticket](#Module-Carbon-Auth-Ticket) |
| Token | [Carbon.Auth.Token](#Module-Carbon-Auth-Token) |
| TokenAuthenticator | [Carbon.Auth.TokenAuthenticator](#Module-Carbon-Auth-TokenAuthenticator) |
| UsernameAndPasswordToken | [Carbon.Auth.UsernameAndPasswordToken](#Module-Carbon-Auth-UsernameAndPasswordToken) |

### <a name="Carbon-Auth-Enums"/>Enums

#### <a name"Method />Method
> Enum with the methods of authentication supported by CarbonLDP.

| Name | Description | 
| --- | --- |
| BASIC | HTTP Basic authentication sending the `username` and `password` in every call. |
| TOKEN | Authentication with `username` and `password` generating a token that will be sent in every call. |



### <a name="Carbon-Auth-Class"/>Class Carbon.Auth.Class


> Abstract class that manages authentications and authorizations of a context.


#### <a name="Carbon-Auth-Class-Constructor"/>Constructor
```typescript 
Class( context:Carbon.Context.Class )
```


*Parameters*

- context


#### <a name="Carbon-Auth-Class-Properties"/>Properties

```typescript 
agents:Carbon.Auth.Agents.Class 
```

Instance of `Carbon.Auth.Agents.Class` that helps you manage the agents of the current context.

--

```typescript 
authenticatedAgent:Carbon.Auth.PersistedAgent.Class 
```

The agent of the user that has been authenticated. If no authentication exists in the current context, it will ask to it's parent context.
Returns `null` if the user it not authenticated.

--

```typescript 
roles:Carbon.Auth.Roles.Class 
```

Instance of a implementation of the `Carbon.Auth.Roles.Class` abstract class, that help managing the roles of the current context.
In this class the property is set to `null`, and implementations of this class set it to their respective role model using a valid instance of `Carbon.Auth.Roles.Class`.




#### <a name="Carbon-Auth-Class-Methods"/>Methods

##### addAuthentication
```typescript 
addAuthentication( options:Carbon.HTTP.Request.Options ):void
```

Adds the authentication header to a `Carbon.HTTP.Request.Options` object.

*Parameters*

- options


--

##### authenticate
```typescript 
authenticate( username:string,  password:string ):Promise<Carbon.Auth.Token.Class>
```

Authenticate the user with a `username` and `password`. Uses the `TOKEN` method for the authentication.

*Parameters*

- username
- password


--

##### authenticateUsing
```typescript 
authenticateUsing( method:'BASIC',  username:string,  password:string ):Promise<Carbon.Auth.UsernameAndPasswordCredentials.Class>
```

Authenticates the user with Basic HTTP Authentication, which uses an encoded string with username and password in every request.

*Parameters*

- method
- username
- password

```typescript 
authenticateUsing( method:'TOKEN',  username:string,  password:string ):Promise<Carbon.Auth.Token.Class>
```

Authenticates the user with a username and password, and generates a JSON Web Token (JWT) credential that will be used in every request.

*Parameters*

- method
- username
- password

```typescript 
authenticateUsing( method:'TOKEN',  token:Carbon.Auth.Token.Class ):Promise<Carbon.Auth.Token.Class>
```

Authenticates the user with a `Carbon.Auth.Token.Class`, which contains a JSON Web Token (JWT) that will be used in every request.

*Parameters*

- method
- token


--

##### clearAuthentication
```typescript 
clearAuthentication():void
```

Deletes the authentication of the current instance.


--

##### createTicket
```typescript 
createTicket( uri:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Auth.Ticket.Class, Carbon.HTTP.Response.Class ]>
```

Retrieves an authentication ticket for the URI specified.

*Parameters*

- uri: The URI to get an authentication ticket for.
- requestOptions


--

##### getAuthenticatedURL
```typescript 
getAuthenticatedURL( uri:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<string>
```

Returns a Promise with a one time use only authenticated URI.

*Parameters*

- uri: The URI to generate an authenticated URI for.
- requestOptions


--

##### isAuthenticated
```typescript 
isAuthenticated( askParent?:boolean ):boolean
```

Returns true if the user is authenticated.

*Parameters*

- askParent






## <a name="Module-Carbon-Auth-ACE"/>Module Carbon/Auth/ACE


**Default export:** [Carbon.Auth.Credentials.Class](#Carbon-Auth-Credentials-Class)





### <a name="Carbon-Auth-PersistedACE-Class"/>Interface Carbon.Auth.PersistedACE.Class

**Extends:** [Carbon.Auth.ACE.Class](#Carbon-Auth-ACE-Class), [Carbon.PersistedFragment.Class](#Carbon-PersistedFragment-Class)

> Interface that represents a persisted Access Control Entry (ACE) of a persisted Access Control List (ACL).

#### <a name="Carbon-Auth-PersistedACE-Class-Properties"/>Properties
```typescript 
document:Carbon.Auth.PersistedACL.Class 
```

Reference to the persisted ACL where the current ACE belongs.





## <a name="Module-Carbon-Auth-ACL"/>Module Carbon/Auth/ACL


**Default export:** [Carbon.Auth.ACL.Class](#Carbon-Auth-ACL-Class)



### <a name="Carbon-Auth-ACL-Properties"/>Properties
```typescript 
static RDF_Class:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-Auth-ACL-Class"/>Interface Carbon.Auth.ACL.Class

**Extends:** [Carbon.Document.Class](#Carbon-Document-Class)

> Interface that represents an in-memory Access Control List (ACL).

#### <a name="Carbon-Auth-ACL-Class-Properties"/>Properties
```typescript 
accessTo:Carbon.Pointer.Class 
```

Reference to the document the ACL belongs.

--

```typescript 
entries?:Carbon.Auth.ACE.Class[] 
```

Array of ACEs that only grants or denies permissions of the document the ACL belongs.

--

```typescript 
inheritableEntries?:Carbon.Auth.ACE.Class[] 
```

Array of ACEs that grants or denies permissions of the document's children the ACL belongs.




#### <a name="Carbon-Auth-ACL-Class-Methods"/>Methods
##### _parsePointer
```typescript 
_parsePointer( element:string | Carbon.Pointer.Class ):Carbon.Pointer.Class
```

(Internal) Function that parse string URIs to pointers.

*Parameters*

- element: The URI string o pointer to convert into pointer.


--

##### configureChildInheritance
```typescript 
configureChildInheritance( granting:boolean,  subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Configures the permission specified to the subject provided either granting or denying it for the children of the document related to the ACL.

*Parameters*

- granting: Boolean to indicate if the permission will be granted o denied.
- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permission: The permission that will be granted to the subject specified.

```typescript 
configureChildInheritance( granting:boolean,  subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Configure several permissions to the subject provided either granting or denying them for the children of the document related to the ACL.

*Parameters*

- granting: Boolean to indicate if the permission will be granted o denied.
- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permissions: The permissions that will be granted to the subject specified.

```typescript 
configureChildInheritance( granting:boolean,  subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Configure the permission specified to the every subject provided either granting or denying it for the children of the document related to the ACL.

*Parameters*

- granting: Boolean to indicate if the permission will be granted o denied.
- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permission: The permission that will be granted to the every subject.

```typescript 
configureChildInheritance( granting:boolean,  subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Configure several permissions to the every subject provided either granting or denying them for the children of the document related to the ACL.

*Parameters*

- granting: Boolean to indicate if the permission will be granted o denied.
- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permissions: The permissions that will be granted to the every subject.


--

##### denies
```typescript 
denies( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):boolean
```

Returns true if the subject has a configuration where it denies the permission specified for the document related to de ACL.
Returns `null` if no configuration of the subject and permission exists in the ACL.

*Parameters*

- subject: The subject to look for its configuration.
- permission: The permission to check if it has a granting configuration.


--

##### deny
```typescript 
deny( subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Grant the permission specified to the subject provided for the document related to the ACL.

*Parameters*

- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permission: The permission that will be granted to the subject specified.

```typescript 
deny( subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Grant several permissions to the subject provided for the document related to the ACL.

*Parameters*

- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permissions: The permissions that will be granted to the subject specified.

```typescript 
deny( subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Grant the permission specified to the every subject provided for the document related to the ACL.

*Parameters*

- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permission: The permission that will be granted to the every subject.

```typescript 
deny( subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Grant several permissions to the every subject provided for the document related to the ACL.

*Parameters*

- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permissions: The permissions that will be granted to the every subject.


--

##### getChildInheritance
```typescript 
getChildInheritance( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):boolean
```

Returns if grants or denies a configuration of the subject and the permission specified for the children of document related to de ACL.
Returns `null` if no configuration of the subject and permission exists in the ACL.

*Parameters*

- subject: The subject to look for its configuration.
- permission: The permission to check if it has a granting configuration.


--

##### grant
```typescript 
grant( subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Grant the permission specified to the subject provided for the document related to the ACL.

*Parameters*

- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permission: The permission that will be granted to the subject specified.

```typescript 
grant( subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Grant several permissions to the subject provided for the document related to the ACL.

*Parameters*

- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permissions: The permissions that will be granted to the subject specified.

```typescript 
grant( subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Grant the permission specified to the every subject provided for the document related to the ACL.

*Parameters*

- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permission: The permission that will be granted to the every subject.

```typescript 
grant( subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Grant several permissions to the every subject provided for the document related to the ACL.

*Parameters*

- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permissions: The permissions that will be granted to the every subject.


--

##### grants
```typescript 
grants( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):boolean
```

Returns true if the subject has a configuration where it grants the permission specified for the document related to de ACL.
Returns `null` if no configuration of the subject and permission exists in the ACL.

*Parameters*

- subject: The subject to look for its configuration.
- permission: The permission to check if it has a granting configuration.


--

##### remove
```typescript 
remove( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Remove the configuration of a permission from a subject for the document related to the ACL.

*Parameters*

- subject: The subject from will be removed the permission.
- permission: The permission to remove from the subject configuration.

```typescript 
remove( subject:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Remove the configuration of several permissions from a subject for the document related to the ACL.

*Parameters*

- subject: The subject from will removed the permission.
- permissions: The permissions to remove from the subject configuration.


--

##### removeChildInheritance
```typescript 
removeChildInheritance( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Remove the configuration of a permission from a subject for the children of the document related to the ACL.

*Parameters*

- subject: The subject from will be removed the permission.
- permission: The permission to remove from the subject configuration.





### <a name="Carbon-Auth-ACL-Factory"/>Class Carbon.Auth.ACL.Factory


> Factory class for `Carbon.Auth.ACL.Class` objects.




#### <a name="Carbon-Auth-ACL-Factory-Methods"/>Methods
##### decorate
```typescript 
static decorate<T extends Object>( object:T ):T & Carbon.Auth.ACl.Class
```

Decorate the object with the methods o a `Carbon.Auth.ACL.Class` object.

*Parameters*

- object: The object to decorate.


--

##### hasClassProperties
```typescript 
static hasClassProperties( object:Object ):boolean
```

Return true if the object provided has the properties and methods of a `Carbon.Auth.ACL.Class` object.

*Parameters*

- object: The object to analise.






#### <a name="Carbon-Auth-ACL-Factory-Decorated-Object"/>Decorated Object
**Interfaces:** [Carbon.Auth.ACL.Class](#Carbon-Auth-ACL-Class)

> Object decorated for the Carbon.Auth.ACL.Factory.decorate method.


##### <a name="Carbon-Auth-ACL-Factory-Decorated-Object-Methods"/>Methods
##### configureChildInheritance
```typescript 
configureChildInheritance( granting:boolean,  subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Configures the permission specified to the subject provided either granting or denying it for the children of the document related to the ACL.

*Parameters*

- granting: Boolean to indicate if the permission will be granted o denied.
- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permission: The permission that will be granted to the subject specified.

```typescript 
configureChildInheritance( granting:boolean,  subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Configure several permissions to the subject provided either granting or denying them for the children of the document related to the ACL.

*Parameters*

- granting: Boolean to indicate if the permission will be granted o denied.
- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permissions: The permissions that will be granted to the subject specified.

```typescript 
configureChildInheritance( granting:boolean,  subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Configure the permission specified to the every subject provided either granting or denying it for the children of the document related to the ACL.

*Parameters*

- granting: Boolean to indicate if the permission will be granted o denied.
- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permission: The permission that will be granted to the every subject.

```typescript 
configureChildInheritance( granting:boolean,  subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Configure several permissions to the every subject provided either granting or denying them for the children of the document related to the ACL.

*Parameters*

- granting: Boolean to indicate if the permission will be granted o denied.
- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permissions: The permissions that will be granted to the every subject.


--

##### denies
```typescript 
denies( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):boolean
```

Returns true if the subject has a configuration where it denies the permission specified for the document related to de ACL.
Returns `null` if no configuration of the subject and permission exists in the ACL.

*Parameters*

- subject: The subject to look for its configuration.
- permission: The permission to check if it has a granting configuration.


--

##### deny
```typescript 
deny( subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Grant the permission specified to the subject provided for the document related to the ACL.

*Parameters*

- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permission: The permission that will be granted to the subject specified.

```typescript 
deny( subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Grant several permissions to the subject provided for the document related to the ACL.

*Parameters*

- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permissions: The permissions that will be granted to the subject specified.

```typescript 
deny( subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Grant the permission specified to the every subject provided for the document related to the ACL.

*Parameters*

- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permission: The permission that will be granted to the every subject.

```typescript 
deny( subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Grant several permissions to the every subject provided for the document related to the ACL.

*Parameters*

- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permissions: The permissions that will be granted to the every subject.


--

##### getChildInheritance
```typescript 
getChildInheritance( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):boolean
```

Returns if grants or denies a configuration of the subject and the permission specified for the children of document related to de ACL.
Returns `null` if no configuration of the subject and permission exists in the ACL.

*Parameters*

- subject: The subject to look for its configuration.
- permission: The permission to check if it has a granting configuration.


--

##### grant
```typescript 
grant( subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Grant the permission specified to the subject provided for the document related to the ACL.

*Parameters*

- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permission: The permission that will be granted to the subject specified.

```typescript 
grant( subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Grant several permissions to the subject provided for the document related to the ACL.

*Parameters*

- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permissions: The permissions that will be granted to the subject specified.

```typescript 
grant( subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Grant the permission specified to the every subject provided for the document related to the ACL.

*Parameters*

- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permission: The permission that will be granted to the every subject.

```typescript 
grant( subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Grant several permissions to the every subject provided for the document related to the ACL.

*Parameters*

- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permissions: The permissions that will be granted to the every subject.


--

##### grants
```typescript 
grants( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):boolean
```

Returns true if the subject has a configuration where it grants the permission specified for the document related to de ACL.
Returns `null` if no configuration of the subject and permission exists in the ACL.

*Parameters*

- subject: The subject to look for its configuration.
- permission: The permission to check if it has a granting configuration.


--

##### remove
```typescript 
remove( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Remove the configuration of a permission from a subject for the document related to the ACL.

*Parameters*

- subject: The subject from will be removed the permission.
- permission: The permission to remove from the subject configuration.

```typescript 
remove( subject:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Remove the configuration of several permissions from a subject for the document related to the ACL.

*Parameters*

- subject: The subject from will removed the permission.
- permissions: The permissions to remove from the subject configuration.


--

##### removeChildInheritance
```typescript 
removeChildInheritance( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Remove the configuration of a permission from a subject for the children of the document related to the ACL.

*Parameters*

- subject: The subject from will be removed the permission.
- permission: The permission to remove from the subject configuration.

```typescript 
removeChildInheritance( subject:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Remove the configuration of several permissions from a subject for the children of the document related to the ACL.

*Parameters*

- subject: The subject from will removed the permission.
- permissions: The permissions to remove from the subject configuration.





## <a name="Module-Carbon-Auth-Agent"/>Module Carbon/Auth/Agent


**Default export:** [Carbon.Auth.Agent.Class](#Carbon-Auth-Agent-Class)



### <a name="Carbon-Auth-Agent-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-Auth-Agent-Class"/>Interface Carbon.Auth.Agent.Class

**Extends:** [Carbon.Document.Class](#Carbon-Document-Class)

> Interface that represents an in-memory Agent of any Context.

#### <a name="Carbon-Auth-Agent-Class-Properties"/>Properties
```typescript 
email:string 
```

The email of the agent.

--

```typescript 
name:string 
```

The name of the agent.

--

```typescript 
password:string 
```

The password of the agent.





### <a name="Carbon-Auth-Agent-Factory"/>Class Carbon.Auth.Agent.Factory


> Factory class for `Carbon.Auth.Agent.Class` objects.




#### <a name="Carbon-Auth-Agent-Factory-Methods"/>Methods
##### create
```typescript 
static create( name:string,  email:string,  password:string ):Carbon.Auth.Agent.Class
```

Creates a `Carbon.Auth.Agent.Class` object with the name and email specified.

*Parameters*

- name: Name of the agent to be created.
- email: Email of the agent to be created.
- password: Password of the agent to be created.


--

##### createFrom
```typescript 
static createFrom<T extends Object>( object:T,  name:string,  email:string,  password:string ):T & Carbon.Auth.Agent.Class
```

Creates a `Carbon.Auth.Agent.Class` object from the object and parameters specified.

*Parameters*

- object: Object that will be converted into an Agent.
- name: Name of the agent to be created.
- email: Email of the agent to be created.
- password: Password of the agent to be created.


--

##### hasClassProperties
```typescript 
static hasClassProperties( object:Object ):boolean
```

Returns true if the object provided has the properties that defines a `Carbon.Auth.Agent.Class` object.

*Parameters*

- object


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.Auth.Agent.Class` object.

*Parameters*

- object







## <a name="Module-Carbon-Auth-Agents"/>Module Carbon/Auth/Agents


**Default export:** [Carbon.Auth.Agents.Class](#Carbon-Auth-Agents-Class)





### <a name="Carbon-Auth-Agents-Class"/>Class Carbon.Auth.Agents.Class


> Abstract class for manage Agents of a determined context.


#### <a name="Carbon-Auth-Agents-Class-Constructor"/>Constructor
```typescript 
Class( context:Carbon.Context.Class )
```


*Parameters*

- context: The context where to manage its Agents.



#### <a name="Carbon-Auth-Agents-Class-Methods"/>Methods

##### delete
```typescript 
delete( agentURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Auth.PersistedAgent.Class, Carbon.HTTP.Response.Class ]>
```

Deletes the agent specified.

*Parameters*

- agentURI: The URI of the agent to be deleted.
- requestOptions


--

##### disable
```typescript 
disable( agentURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Auth.PersistedAgent.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>
```

Deactivate the account of the agent specified.

*Parameters*

- agentURI: The URI of the agent to be deactivated.
- requestOptions


--

##### enable
```typescript 
enable( agentURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Auth.PersistedAgent.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>
```

Activate the account of the agent specified.

*Parameters*

- agentURI: The URI of the agent to be activated.
- requestOptions


--

##### get
```typescript 
get( agentURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Auth.PersistedAgent.Class, Carbon.HTTP.Response.Class ]>
```

Retrieves the agent specified from the current context.

*Parameters*

- agentURI: The URI of the agent to retrieve.
- requestOptions


--

##### register
```typescript 
register( agentDocument:Carbon.Auth.Agent.Class,  slug?:string ):Promise<Carbon.Pointer.Class, Carbon.HTTP.Response.Class>
```

Persists a `Carbon.Auth.Agent.Class` object using the slug specified.
Returns a Promise with a Pointer to the stored Agent, and the response of the request.

*Parameters*

- agentDocument
- slug






## <a name="Module-Carbon-Auth-AuthenticationToken"/>Module Carbon/Auth/AuthenticationToken


**Default export:** [Carbon.Auth.AuthenticationToken.Class](#Carbon-Auth-AuthenticationToken-Class)





### <a name="Carbon-Auth-AuthenticationToken-Class"/>Interface Carbon.Auth.AuthenticationToken.Class


> Interface that represents the base of an authentication token.



## <a name="Module-Carbon-Auth-Authenticator"/>Module Carbon/Auth/Authenticator


**Default export:** [Carbon.Auth.Authenticator.Class](#Carbon-Auth-Authenticator-Class)





### <a name="Carbon-Auth-Authenticator-Class"/>Interface Carbon.Auth.Authenticator.Class


> Interface that represents the base of an authentication token.


#### <a name="Carbon-Auth-Authenticator-Class-Methods"/>Methods
##### addAuthentication
```typescript 
addAuthentication( requestOptions:Carbon.HTTP.Request.Options ):Carbon.HTTP.Request.Options
```

If the authenticator is authenticated, it adds an authentication header in the request options object provided.

*Parameters*

- requestOptions: The request options object where to add the authentication header.


--

##### authenticate
```typescript 
authenticate( authenticationToken:T ):Promise<Carbon.Auth.Credentials.Class>
```

Performs an authentication and stores the credentials for future use.

*Parameters*

- authenticationToken: The token that will be used to perform the authentication.


--

##### clearAuthentication
```typescript 
clearAuthentication():void
```

Removes the stored credentials of any.


--

##### isAuthenticated
```typescript 
isAuthenticated():boolean
```

Returns if its authenticated by checking the stored credentials within.





## <a name="Module-Carbon-Auth-BasicAuthenticator"/>Module Carbon/Auth/BasicAuthenticator


**Default export:** [Carbon.Auth.BasicAuthenticator.Class](#Carbon-Auth-BasicAuthenticator-Class)





### <a name="Carbon-Auth-BasicAuthenticator-Class"/>Class Carbon.Auth.BasicAuthenticator.Class

**Implements:** [Carbon.Auth.Authenticator.Class](#Carbon-Auth-Authenticator-Class)&lt;[Carbon.Auth.UsernameAndPasswordToken.Class](#Carbon-Auth-UsernameAndPasswordToken-Class)&gt;

> Authenticates requests using HTTP Basic Authentication.


#### <a name="Carbon-Auth-BasicAuthenticator-Class-Constructor"/>Constructor
```typescript 
Class()
```




#### <a name="Carbon-Auth-BasicAuthenticator-Class-Methods"/>Methods

##### addAuthentication
```typescript 
addAuthentication( requestOptions:Carbon.HTTP.Request.Options ):Carbon.HTTP.Request.Options
```

Adds the Basic authentication header to the passed request options object.
The `Carbon.HTTP.Request.Options` provided is returned without modifications if it already has an authentication header.

*Parameters*

- requestOptions: Request options object to add Authentication headers.


--

##### authenticate
```typescript 
authenticate( authenticationToken:Carbon.Auth.UsernameAndPasswordToken ):Promise< Carbon.Auth.UsernameAndPasswordCredentials.Class >
```

Stores credentials to authenticate future requests.

*Parameters*

- authenticationToken


--

##### clearAuthentication
```typescript 
clearAuthentication():void
```

Clears any saved credentials and restores the Authenticator to its initial state.


--

##### isAuthenticated
```typescript 
isAuthenticated():boolean
```

Returns true if the instance contains stored credentials.






## <a name="Module-Carbon-Auth-Credentials"/>Module Carbon/Auth/Credentials


**Default export:** [Carbon.Auth.Credentials.Class](#Carbon-Auth-Credentials-Class)





### <a name="Carbon-Auth-Credentials-Class"/>Interface Carbon.Auth.Credentials.Class


> Interface that represents the base of a credentials object.



## <a name="Module-Carbon-Auth-PersistedACL"/>Module Carbon/Auth/PersistedACL


**Default export:** [Carbon.Auth.PersistedACL.Class](#Carbon-Auth-PersistedACL-Class)





### <a name="Carbon-Auth-PersistedACL-Class"/>Interface Carbon.Auth.PersistedACL.Class

**Extends:** [Carbon.PersistedDocument.Class](#Carbon-PersistedDocument-Class)

> Interface that represents a persisted Access Control List (ACL).

#### <a name="Carbon-Auth-PersistedACL-Class-Properties"/>Properties
```typescript 
accessTo:Carbon.Pointer.Class 
```

Reference to the document the ACL belongs.

--

```typescript 
entries?:Carbon.Auth.PersistedACE.Class[] 
```

Array of persisted ACEs that only grants or denies permissions of the document the ACL belongs.

--

```typescript 
inheritableEntries?:Carbon.Auth.PersistedACE.Class[] 
```

Array of persisted ACEs that grants or denies permissions of the document's children the ACL belongs.




#### <a name="Carbon-Auth-PersistedACL-Class-Methods"/>Methods
##### _parsePointer
```typescript 
_parsePointer( element:string | Carbon.Pointer.Class ):Carbon.Pointer.Class
```

(Internal) Function that parse string URIs to pointers.

*Parameters*

- element: The URI string o pointer to convert into pointer.


--

##### configureChildInheritance
```typescript 
configureChildInheritance( granting:boolean,  subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Configures the permission specified to the subject provided either granting or denying it for the children of the document related to the ACL.

*Parameters*

- granting: Boolean to indicate if the permission will be granted o denied.
- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permission: The permission that will be granted to the subject specified.

```typescript 
configureChildInheritance( granting:boolean,  subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Configure several permissions to the subject provided either granting or denying them for the children of the document related to the ACL.

*Parameters*

- granting: Boolean to indicate if the permission will be granted o denied.
- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permissions: The permissions that will be granted to the subject specified.

```typescript 
configureChildInheritance( granting:boolean,  subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Configure the permission specified to the every subject provided either granting or denying it for the children of the document related to the ACL.

*Parameters*

- granting: Boolean to indicate if the permission will be granted o denied.
- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permission: The permission that will be granted to the every subject.

```typescript 
configureChildInheritance( granting:boolean,  subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Configure several permissions to the every subject provided either granting or denying them for the children of the document related to the ACL.

*Parameters*

- granting: Boolean to indicate if the permission will be granted o denied.
- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permissions: The permissions that will be granted to the every subject.


--

##### denies
```typescript 
denies( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):boolean
```

Returns true if the subject has a configuration where it denies the permission specified for the document related to de ACL.
Returns `null` if no configuration of the subject and permission exists in the ACL.

*Parameters*

- subject: The subject to look for its configuration.
- permission: The permission to check if it has a granting configuration.


--

##### deny
```typescript 
deny( subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Grant the permission specified to the subject provided for the document related to the ACL.

*Parameters*

- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permission: The permission that will be granted to the subject specified.

```typescript 
deny( subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Grant several permissions to the subject provided for the document related to the ACL.

*Parameters*

- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permissions: The permissions that will be granted to the subject specified.

```typescript 
deny( subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Grant the permission specified to the every subject provided for the document related to the ACL.

*Parameters*

- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permission: The permission that will be granted to the every subject.

```typescript 
deny( subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Grant several permissions to the every subject provided for the document related to the ACL.

*Parameters*

- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permissions: The permissions that will be granted to the every subject.


--

##### getChildInheritance
```typescript 
getChildInheritance( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):boolean
```

Returns if grants or denies a configuration of the subject and the permission specified for the children of document related to de ACL.
Returns `null` if no configuration of the subject and permission exists in the ACL.

*Parameters*

- subject: The subject to look for its configuration.
- permission: The permission to check if it has a granting configuration.


--

##### grant
```typescript 
grant( subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Grant the permission specified to the subject provided for the document related to the ACL.

*Parameters*

- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permission: The permission that will be granted to the subject specified.

```typescript 
grant( subject:string | Carbon.Pointer.Class,  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Grant several permissions to the subject provided for the document related to the ACL.

*Parameters*

- subject: The subject which will be assigned the permission specified.
- subjectClass: The type of subject provided.
- permissions: The permissions that will be granted to the subject specified.

```typescript 
grant( subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Grant the permission specified to the every subject provided for the document related to the ACL.

*Parameters*

- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permission: The permission that will be granted to the every subject.

```typescript 
grant( subjects:(string | Carbon.Pointer.Class)[],  subjectClass:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Grant several permissions to the every subject provided for the document related to the ACL.

*Parameters*

- subjects: The subjects which will be assigned the every permissions specified.
- subjectClass: The type of subjects provided.
- permissions: The permissions that will be granted to the every subject.


--

##### grants
```typescript 
grants( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):boolean
```

Returns true if the subject has a configuration where it grants the permission specified for the document related to de ACL.
Returns `null` if no configuration of the subject and permission exists in the ACL.

*Parameters*

- subject: The subject to look for its configuration.
- permission: The permission to check if it has a granting configuration.


--

##### remove
```typescript 
remove( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Remove the configuration of a permission from a subject for the document related to the ACL.

*Parameters*

- subject: The subject from will be removed the permission.
- permission: The permission to remove from the subject configuration.

```typescript 
remove( subject:string | Carbon.Pointer.Class,  permissions:(string | Carbon.Pointer.Class)[] ):void
```

Remove the configuration of several permissions from a subject for the document related to the ACL.

*Parameters*

- subject: The subject from will removed the permission.
- permissions: The permissions to remove from the subject configuration.


--

##### removeChildInheritance
```typescript 
removeChildInheritance( subject:string | Carbon.Pointer.Class,  permission:string | Carbon.Pointer.Class ):void
```

Remove the configuration of a permission from a subject for the children of the document related to the ACL.

*Parameters*

- subject: The subject from will be removed the permission.
- permission: The permission to remove from the subject configuration.





### <a name="Carbon-Auth-PersistedACL-Factory"/>Class Carbon.Auth.PersistedACL.Factory


> Factory class for `Carbon.Auth.PersistedACL.Class` objects.




#### <a name="Carbon-Auth-PersistedACL-Factory-Methods"/>Methods
##### decorate
```typescript 
static decorate<T extends Carbon.PersistedDocument.Class>( document:T ):T & Carbon.Auth.PersistedACL.Class
```

Decorate the object with the properties and methods of a `Carbon.Auth.PersistedACL.Class` object.

*Parameters*

- document: The persisted document to decorate.


--

##### hasClassProperties
```typescript 
static hasClassProperties( object:Object ):boolean
```

Return true if the object provided has the properties and methods of a `Carbon.Auth.PersistedACL.Class` object.

*Parameters*

- object: The object to analise.







## <a name="Module-Carbon-Auth-PersistedAgent"/>Module Carbon/Auth/PersistedAgent


**Default export:** [Carbon.Auth.PersistedAgent.Class](#Carbon-Auth-PersistedAgent-Class)





### <a name="Carbon-Auth-PersistedAgent-Class"/>Interface Carbon.Auth.PersistedAgent.Class

**Extends:** [Carbon.PersistedProtectedDocument.Class](#Carbon-PersistedProtectedDocument-Class)

> Interface that represents the base of a persisted Agent in any context.

#### <a name="Carbon-Auth-PersistedAgent-Class-Properties"/>Properties
```typescript 
email:string 
```

The email of he current Agent.

--

```typescript 
enabled:boolean 
```

Flag that indicates if the current agent has been activated o not.

--

```typescript 
name:string 
```

The name of he current Agent.

--

```typescript 
password?:string 
```

Property that represents the password of the agent. This property is not retrieved but you can change the current password by setting a new one here and saving it.




#### <a name="Carbon-Auth-PersistedAgent-Class-Methods"/>Methods
##### enable
```typescript 
enable():Promise<[ Carbon.Auth.PersistedAgent.Class Carbon.HTTP.Response.Class ]>
```

Activate the account of the agent.


--

##### 




### <a name="Carbon-Auth-PersistedAgent-Factory"/>Class Carbon.Auth.PersistedAgent.Factory


> Factory class for `Carbon.Auth.PersistedAgent.Class` objects.




#### <a name="Carbon-Auth-PersistedAgent-Factory-Methods"/>Methods
##### decorate
```typescript 
static decorate<T extends Carbon.PersistedDocument.Class>( object:T ):T & Carbon.Auth.PersistedAgent.Class
```

Decorates the object provided with the properties and methods of a `Carbon.Auth.PersistedAgent.Class` object.

*Parameters*

- object: The object to decorate.


--

##### hasClassProperties
```typescript 
static hasClassProperties( object:Object ):boolean
```

Returns true if the object provided has the properties of a `Carbon.Auth.PersistedAgent.Class` object.

*Parameters*

- object


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.Auth.PersistedAgent.Class` object.

*Parameters*

- object






#### <a name="Carbon-Auth-PersistedAgent-Factory-Decorated-Object"/>Decorated Object
**Interfaces:** [Carbon.Auth.PersistedAgent.Class](#Carbon-Auth-PersistedAgent-Class)

> Object decorated by the `Carbon.Auth.PersistedAgent.Factory.decorate()` function.


##### <a name="Carbon-Auth-PersistedAgent-Factory-Decorated-Object-Methods"/>Methods
##### disable
```typescript 
disable():Promise<[ Carbon.Auth.PersistedAgent.Class Carbon.HTTP.Response.Class ]>
```

Deactivate the account of the agent.


--

##### enable
```typescript 
enable():Promise<[ Carbon.Auth.PersistedAgent.Class Carbon.HTTP.Response.Class ]>
```

Activate the account of the agent.





## <a name="Module-Carbon-Auth-PersistedRole"/>Module Carbon/Auth/PersistedRole







### <a name="Carbon-App-PersistedRole-Class"/>Interface Carbon.App.PersistedRole.Class

**Extends:** [Carbon.Auth.PersistedRole.Class](#Carbon-Auth-PersistedRole-Class)

> Specific interface that represents a persisted role of an application.

#### <a name="Carbon-App-PersistedRole-Class-Properties"/>Properties
```typescript 
_roles:Carbon.Auth.Roles.Class 
```

(Internal) Instance of an implementation of the Roles abstract class that manage the current role.

--

```typescript 
agents?:Carbon.Pointer.Class[] 
```

An array of pointers that references to all the agents that have the current role.

--

```typescript 
name?:string 
```

A name that describes the current role.




#### <a name="Carbon-App-PersistedRole-Class-Methods"/>Methods
##### addAgent
```typescript 
addAgent( agent:string | Carbon.Pointer.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Makes a relation in the role towards the agents specified.

*Parameters*

- agent: The agents that wants to add to the role.
- requestOptions


--

##### addAgents
```typescript 
addAgents( agents:(string | Carbon.Pointer.Class)[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Makes a relation in the role towards the agents specified.

*Parameters*

- agents: An array with strings or Pointers that refers to the agents that wants to add to the role.
- requestOptions


--

##### createChild
```typescript 
createChild<T extends Carbon.Auth.Roles.Class>( role:T,  slug?:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Persists a new role with the slug specified as a child of the current role.

*Parameters*

- role: The role to be persisted.
- slug: The slug that will be used in the child role URI.
- requestOptions: Customizable options for the request.

```typescript 
createChild<T extends Carbon.Auth.Roles.Class>( role:T,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Persists a new role as a child of the current one.

*Parameters*

- role: The role to be persisted.
- requestOptions: Customizable options for the request.


--

##### getAgents
```typescript 
getAgents( requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Retrieves an array of resolved pointers for all the agents of the role.

*Parameters*

- requestOptions

```typescript 
getAgents( retrievalPreferences?:Carbon.RetrievalPreferences.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Retrieves an array of resolved pointers for the agents of the role, in accordance of the retrievalPreferences provided.

*Parameters*

- retrievalPreferences: An object that specify the retrieval preferences for the request.
- requestOptions


--

##### listAgents
```typescript 
listAgents( requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Retrieves an array of unresolved pointers for all the agents of the role.

*Parameters*

- requestOptions


--

##### removeAgent
```typescript 
removeAgent( agent:string | Carbon.Pointer.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Removes the relation in the role towards the agents specified.

*Parameters*

- agent: The agents that wants to be removed from the role.
- requestOptions


--

##### removeAgents
```typescript 
removeAgents( agents:(string | Carbon.Pointer.Class)[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Remove the relation in the role towards the agents specified.

*Parameters*

- agents: An array with strings or Pointers that refers to the agents that wants to be removed from the role.
- requestOptions





### <a name="Carbon-Auth-PersistedRole-Factory"/>Class Carbon.Auth.PersistedRole.Factory


> Factory class for `Carbon.Auth.PersistedRole.Class` objects




#### <a name="Carbon-Auth-PersistedRole-Factory-Methods"/>Methods
##### decorate
```typescript 
static decorate<T extends Carbon.PersistedDocument.Class>( object:T ):T & Carbon.Auth.PersistedRole.Class
```

Decorates the object provided with the methods and properties of a `Carbon.Auth.PersistedRole.Class` object.

*Parameters*

- object


--

##### hasClassProperties
```typescript 
static hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties that defines a `Carbon.Auth.PersistedRole.Class` object

*Parameters*

- resource


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.Auth.PersistedRole.Class` object

*Parameters*

- object






#### <a name="Carbon-Auth-PersistedRole-Factory-Decorated-Object"/>Decorated Object
**Interfaces:** [Carbon.Auth.PersistedRole.Class](#Carbon-Auth-PersistedRole-Class)

> Object decorated by the `Carbon.Auth.PersistedRole.Factory.decorate()` function.


##### <a name="Carbon-Auth-PersistedRole-Factory-Decorated-Object-Methods"/>Methods
##### addAgent
```typescript 
addAgent( agent:string | Carbon.Pointer.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Makes a relation in the role towards the agents specified.

*Parameters*

- agent: The agents that wants to add to the role.
- requestOptions


--

##### addAgents
```typescript 
addAgents( agents:(string | Carbon.Pointer.Class)[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Makes a relation in the role towards the agents specified.

*Parameters*

- agents: An array with strings or Pointers that refers to the agents that wants to add to the role.
- requestOptions


--

##### createChild
```typescript 
createChild<T extends Carbon.Auth.Roles.Class>( role:T,  slug?:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Persists a new role with the slug specified as a child of the current role.

*Parameters*

- role: The role to be persisted.
- slug: The slug that will be used in the child role URI.
- requestOptions: Customizable options for the request.

```typescript 
createChild<T extends Carbon.Auth.Roles.Class>( role:T,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Persists a new role as a child of the current one.

*Parameters*

- role: The role to be persisted.
- requestOptions: Customizable options for the request.


--

##### getAgents
```typescript 
getAgents( requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Retrieves an array of resolved pointers for all the agents of the role.

*Parameters*

- requestOptions

```typescript 
getAgents( retrievalPreferences?:Carbon.RetrievalPreferences.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Retrieves an array of resolved pointers for the agents of the role, in accordance of the retrievalPreferences provided.

*Parameters*

- retrievalPreferences: An object that specify the retrieval preferences for the request.
- requestOptions


--

##### listAgents
```typescript 
listAgents( requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Retrieves an array of unresolved pointers for all the agents of the role.

*Parameters*

- requestOptions


--

##### removeAgent
```typescript 
removeAgent( agent:string | Carbon.Pointer.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Removes the relation in the role towards the agents specified.

*Parameters*

- agent: The agents that wants to be removed from the role.
- requestOptions


--

##### removeAgents
```typescript 
removeAgents( agents:(string | Carbon.Pointer.Class)[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Remove the relation in the role towards the agents specified.

*Parameters*

- agents: An array with strings or Pointers that refers to the agents that wants to be removed from the role.
- requestOptions





## <a name="Module-Carbon-Auth-Role"/>Module Carbon/Auth/Role


**Default export:** [Carbon.Auth.Role.Class](#Carbon-Auth-Role-Class)



### <a name="Carbon-Auth-Role-Properties"/>Properties
```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-Auth-Role-Class"/>Interface Carbon.Auth.Role.Class

**Extends:** [Carbon.Document.Class](#Carbon-Document-Class)

> Specific interface that represents the base of an in-memory role for any context.

#### <a name="Carbon-Auth-Role-Class-Properties"/>Properties
```typescript 
name:string 
```

A descriptive name for the role.





### <a name="Carbon-Auth-Role-Factory"/>Class Carbon.Auth.Role.Factory


> Factory class for `Carbon.Auth.Role.Class` objects




#### <a name="Carbon-Auth-Role-Factory-Methods"/>Methods
##### create
```typescript 
static create( name:string ):Carbon.Auth.Role.Class
```

Create a `Carbon.Auth.Role.Class` object with the name specified.

*Parameters*

- name: The name of the role to create.


--

##### createFrom
```typescript 
static createFrom( object:T extends Object ):T & Carbon.Auth.Role.Class
```

Create a `Carbon.Auth.Role.Class` object with the object provided.

*Parameters*

- object


--

##### hasClassProperties
```typescript 
static hasClassProperties( object:Object ):boolean
```

Returns true if the object provided has the properties that defines a `Carbon.Auth.Role.Class` object

*Parameters*

- object


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.Auth.Role.Class` object

*Parameters*

- object







## <a name="Module-Carbon-Auth-Roles"/>Module Carbon/Auth/Roles


**Default export:** [Carbon.Auth.Roles.Class](#Carbon-Auth-Roles-Class)





### <a name="Carbon-Auth-Roles-Class"/>Class Carbon.Auth.Roles.Class


> Class for manage roles of an application.


#### <a name="Carbon-Auth-Roles-Class-Constructor"/>Constructor
```typescript 
Class( context:Carbon.Context.Class )
```


*Parameters*

- context



#### <a name="Carbon-Auth-Roles-Class-Methods"/>Methods

##### addAgent
```typescript 
addAgent( roleURI:string,  agent:string | Carbon.Pointer.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Makes a relation in the role specified towards the agent provided.

*Parameters*

- roleURI: The URI of the role where to add the agent.
- agent: The agent that wants to add to the role.
- requestOptions


--

##### addAgents
```typescript 
addAgents( roleURI:string,  agents:(string | Carbon.Pointer.Class)[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Makes a relation in the role specified towards the agents specified.

*Parameters*

- roleURI: The URI of the role where to add agents.
- agents: An array with strings or Pointers that refers to the agents that wants to add to the role.
- requestOptions


--

##### createChild
```typescript 
createChild<T extends Carbon.Auth.Roles.Class>( parentRole:string | Carbon.Pointer.Class,  role:T,  slug?:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Persists the Role provided with the slug, if specified, as a childRole of the parentRole specified.
Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.

*Parameters*

- parentRole: The role that will be assigned as the parent of the role that wants to persist.
- role: The appRole that wants to persist.
- slug: The slug where the role will be persisted.
- requestOptions: The slug where the role will be persisted.

```typescript 
createChild<T extends Carbon.Auth.Roles.Class>( parentRole:string | Carbon.Pointer.Class,  role:T,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.Auth.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Persists the Role provided as a childRole of the parentRole specified.
Returns a Promise with a Pointer for the stored role; and a tuple of two responses, the first one is the response of the creation, and the second one is the response of the creation of the relation parent-child of the roles.

*Parameters*

- parentRole: The role that will be assigned as the parent of the role that wants to persist.
- role: The appRole that wants to persist.
- requestOptions: The slug where the role will be persisted.


--

##### get
```typescript 
get<T>( roleURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedRole.Class, Carbon.HTTP.Response.Class ]>
```

Retrieves a role from the current context.

*Parameters*

- roleURI: The URI of the role to retrieve.
- requestOptions


--

##### getAgents
```typescript 
getAgents<T>( roleURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>
```

Retrieves an array of resolved pointers for all the agents of the specified role.

*Parameters*

- roleURI: The URI of the role to look for its agents.
- requestOptions

```typescript 
getAgents<T>( roleURI:string,  retrievalPreferences?:Carbon.RetrievalPreferences.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>
```

Retrieves an array of resolved pointers for the agents of the role, in accordance of the retrievalPreferences provided.

*Parameters*

- roleURI: The URI of the role to look for its agents.
- retrievalPreferences: An object that specify the retrieval preferences for the request.
- requestOptions


--

##### listAgents
```typescript 
listAgents( roleURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.PersistedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Retrieves an array of unresolved pointers for all the agents of the specified role.

*Parameters*

- roleURI: The URI of the role to look for its agents.
- requestOptions


--

##### removeAgent
```typescript 
removeAgent( roleURI:string,  agent:string | Carbon.Pointer.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Removes the relation in the role specified towards the agent provided.

*Parameters*

- roleURI: The URI of the role from where to remove the agent.
- agent: The agent that wants to be removed from the role.
- requestOptions


--

##### removeAgents
```typescript 
removeAgents( roleURI:string,  agents:(string | Carbon.Pointer.Class)[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Remove the relation in the role specified towards the agents specified.

*Parameters*

- roleURI: The URI of the role from where to remove the agents.
- agents: An array with strings or Pointers that refers to the agents to be removed from the role.
- requestOptions






## <a name="Module-Carbon-Auth-Ticket"/>Module Carbon/Auth/Ticket


**Default export:** [Carbon.Auth.Ticket.Class](#Carbon-Auth-Ticket-Class)



### <a name="Carbon-Auth-Ticket-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-Auth-Ticket-Class"/>Interface Carbon.Auth.Ticket.Class

**Extends:** [Carbon.Resource.Class](#Carbon-Resource-Class)

> Interface that represents an authentication ticket.

#### <a name="Carbon-Auth-Ticket-Class-Properties"/>Properties
```typescript 
expirationTime:Date 
```

The time when the ticket will expire.

--

```typescript 
forURI:Carbon.Pointer.Class 
```

Pointer that relates the document that the authentication ticket only works for.

--

```typescript 
ticketKey:string 
```

The value to provide as the authentication ticket in a request.





### <a name="Carbon-Auth-Ticket-Factory"/>Class Carbon.Auth.Ticket.Factory


> Factory class for `Carbon.Auth.Ticket.Class` objects.




#### <a name="Carbon-Auth-Ticket-Factory-Methods"/>Methods
##### create
```typescript 
static create( uri:string ):Carbon.Auth.Ticket.Class
```

Creates and returns a `Carbon.Auth.Ticket.Class` object for the specified URI.

*Parameters*

- uri: The URI to get an authentication ticket for.







## <a name="Module-Carbon-Auth-Token"/>Module Carbon/Auth/Token


**Default export:** [Carbon.Auth.Ticket.Class](#Carbon-Auth-Ticket-Class)



### <a name="Carbon-Auth-Token-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-Auth-Token-Class"/>Interface Carbon.Auth.Token.Class

**Extends:** [Carbon.Resource.Class](#Carbon-Resource-Class), [Carbon.Auth.Credentials.Class](#Carbon-Auth-Credentials-Class)

> Interface that represents an authentication token for every context.

#### <a name="Carbon-Auth-Token-Class-Properties"/>Properties
```typescript 
agent:Carbon.Auth.PersistedAgent.Class 
```

Agent that has been requested the token, and which authentication the token represents.

--

```typescript 
expirationTime:Date 
```

The time when the token will expire.

--

```typescript 
key:string 
```

The value to provide as the authentication token in the headers of a a request.





### <a name="Carbon-Auth-Token-Factory"/>Class Carbon.Auth.Token.Factory


> Factory class for `Carbon.Auth.Token.Class` objects.



#### <a name="Carbon-Auth-Token-Factory-Properties"/>Properties
```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```






#### <a name="Carbon-Auth-Token-Factory-Methods"/>Methods
##### is
```typescript 
static is( value:any ):boolean
```

Returns true if the object provided is considered a `Carbon.Auth.Token.Class` object.

*Parameters*

- value


--

##### hasClassProperties
```typescript 
static hasClassProperties( object:Object ):boolean
```

Returns true if the object provided has the properties of a `Carbon.Auth.Token.Class` object.

*Parameters*

- object





##### decorate
```typescript 
decorate<T extends Object>( object:T ):T & Carbon.Auth.Token.Class
```

Decorates the object provided with the properties and methods of a `Carbon.Auth.Token.Class` object.

*Parameters*

- object






## <a name="Module-Carbon-Auth-TokenAuthenticator"/>Module Carbon/Auth/TokenAuthenticator


**Default export:** [Carbon.Auth.TokenAuthenticator.Class](#Carbon-Auth-TokenAuthenticator-Class)





### <a name="Carbon-Auth-TokenAuthenticator-Class"/>Class Carbon.Auth.TokenAuthenticator.Class

**Implements:** [Carbon.Auth.Authenticator.Class](#Carbon-Auth-Authenticator-Class)&lt;[Carbon.Auth.UsernameAndPasswordToken.Class](#Carbon-Auth-UsernameAndPasswordToken-Class)&gt;

> Authenticates requests using JSON Web Token (JWT) Authentication.


#### <a name="Carbon-Auth-TokenAuthenticator-Class-Constructor"/>Constructor
```typescript 
Class( context:Carbon.Context.Class )
```


*Parameters*

- context: The context where to authenticate the agent.



#### <a name="Carbon-Auth-TokenAuthenticator-Class-Methods"/>Methods

##### addAuthentication
```typescript 
addAuthentication( requestOptions:Carbon.HTTP.Request.Options ):Carbon.HTTP.Request.Options
```

Adds the Token Authentication header to the passed request options object.
The `Carbon.HTTP.Request.Options` provided is returned without modifications if it already has an authentication header.

*Parameters*

- requestOptions: Request options object to add Authentication headers.


--

##### authenticate
```typescript 
authenticate( authenticationToken:Carbon.Auth.UsernameAndPasswordToken ):Promise<Carbon.Auth.Token.Class>
```

Stores credentials to authenticate future requests.

*Parameters*

- authenticationToken

```typescript 
authenticate( token:Carbon.Auth.Token.Class ):Promise<Carbon.Auth.Token.Class>
```

Stores credentials to authenticate future requests.

*Parameters*

- token


--

##### clearAuthentication
```typescript 
clearAuthentication():void
```


Clears any saved credentials and restores the Authenticator to its initial state.



--

##### isAuthenticated
```typescript 
isAuthenticated():boolean
```

Returns true if the instance contains stored credentials.






## <a name="Module-Carbon-Auth-UsernameAndPasswordCredentials"/>Module Carbon/Auth/UsernameAndPasswordCredentials


**Default export:** [Carbon.Auth.UsernameAndPasswordCredentials.Class](#Carbon-Auth-UsernameAndPasswordCredentials-Class)





### <a name="Carbon-Auth-UsernameAndPasswordCredentials-Class"/>Class Carbon.Auth.UsernameAndPasswordCredentials.Class

**Implements:** [Carbon.Auth.Credentials.Class](#Carbon-Auth-Credentials-Class)

> Wrapper to manage Authentication Credentials in form of Username/Password.


#### <a name="Carbon-Auth-UsernameAndPasswordCredentials-Class-Constructor"/>Constructor
```typescript 
Class( username:string,  password:string )
```


*Parameters*

- username
- password


#### <a name="Carbon-Auth-UsernameAndPasswordCredentials-Class-Properties"/>Properties

```typescript 
password:string 
```


--

```typescript 
username:string 
```







## <a name="Module-Carbon-Auth-UsernameAndPasswordToken"/>Module Carbon/Auth/UsernameAndPasswordToken


**Default export:** [Carbon.Auth.UsernameAndPasswordToken.Class](#Carbon-Auth-UsernameAndPasswordToken-Class)





### <a name="Carbon-Auth-UsernameAndPasswordToken-Class"/>Class Carbon.Auth.UsernameAndPasswordToken.Class

**Implements:** [Carbon.Auth.AuthenticationToken.Class](#Carbon-Auth-AuthenticationToken-Class)

> Wrapper to manage an Authentication Token in form of Username/Password.


#### <a name="Carbon-Auth-UsernameAndPasswordToken-Class-Constructor"/>Constructor
```typescript 
Class( username:string,  password:string )
```


*Parameters*

- username
- password


#### <a name="Carbon-Auth-UsernameAndPasswordToken-Class-Properties"/>Properties

```typescript 
password:string 
```


--

```typescript 
username:string 
```







## <a name="Module-Carbon-BlankNode"/>Module Carbon/BlankNode


**Default export:** [Carbon.BlankNode.Class](#Carbon-BlankNode-Class)



### <a name="Carbon-BlankNode-Properties"/>Properties
```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-BlankNode-Class"/>Interface Carbon.BlankNode.Class


> Interface that represents the basic data of a blank node.

#### <a name="Carbon-BlankNode-Class-Properties"/>Properties
```typescript 
bNodeIdentifier:string 
```

A UUID identifier for the blank node.





### <a name="Carbon-BlankNode-Factory"/>Class Carbon.BlankNode.Factory


> Factory class for `Carbon.BlankNode.Class` objects.




#### <a name="Carbon-BlankNode-Factory-Methods"/>Methods
##### createFrom
```typescript 
static createFrom<T extends Object>( object:T extends Object,  id:string,  document:Carbon.Document.Class ):T & Carbon.BlankNode.Class
```

Creates a `Carbon.BlankNode.Class` object from the object and parameters specified.

*Parameters*

- object: Object to be converted into a `Carbon.BlankNode.Class`.
- id: The ID of the of the BlankNode to create. If no ID is provided, one will be created.
- document: The `Carbon.Document.Class` object where the fragment is part of.

```typescript 
static createFrom<T extends Object>( object:T extends Object,  document:Carbon.Document.Class ):T & Carbon.BlankNode.Class
```

Creates a `Carbon.BlankNode.Class` object from the object and parameters specified.

*Parameters*

- object: Object to be converted into a `Carbon.BlankNode.Class`.
- document: The `Carbon.Document.Class` object where the fragment is part of.


--

##### decorate
```typescript 
static decorate( object:T extends Object,  bNodeIdentifier?:string ):T & Carbon.BlankNode.Class
```

Decorates the object provided with the properties and methods of a Carbon.FreeResources.Class object.

*Parameters*

- object: The object to be decorated.
- bNodeIdentifier: The identifier to be added to the decorated BlankNode.







## <a name="Module-Carbon-Context"/>Module Carbon/Context


**Default export:** [Carbon.Context.Class](#Carbon-Context-Class)





### <a name="Carbon-Context-Class"/>Interface Carbon.Context.Class


> Interface that every context in the SDK implements.

#### <a name="Carbon-Context-Class-Properties"/>Properties
```typescript 
auth:Carbon.Auth.Class 
```

The authentication and authorization class of the context.

--

```typescript 
documents:Carbon.Documents.Class 
```

The documents class of the context.

--

```typescript 
parentContext:Carbon.Context.Class 
```

The parent context of the current context. It will be `null` when the context has no parent.




#### <a name="Carbon-Context-Class-Methods"/>Methods
##### clearObjectSchema
```typescript 
clearObjectSchema( type?:string ):void
```

Remove the schema of the type specified, or the general schema if no type is provided.

*Parameters*

- type: The URI of the type to remove its schema.


--

##### deleteSetting
```typescript 
deleteSetting( name:string ):void
```

Deletes the setting specified by the name provided from the current context.

*Parameters*

- name: Name of the setting to delete.


--

##### extendObjectSchema
```typescript 
extendObjectSchema( type:string,  objectSchema:Carbon.ObjectSchema.DigestedObjectSchema ):void
```

Extends the schema for a specified type of Resource.
If a schema for the type exists in the parent context, this is duplicated for the actual context, but only the first time this schema is extended.

*Parameters*

- type: The URI of the type to extends its schema.
- objectSchema: The new schema that will extends the previous one.

```typescript 
extendObjectSchema( objectSchema:Carbon.ObjectSchema.DigestedObjectSchema ):void
```

Extends the general schema of the current context.
If a general schema exists in the parent context, this is duplicated for the current context, but only the first time the schema is extended.

*Parameters*

- objectSchema: The new schema that will extends the previous one.


--

##### getBaseURI
```typescript 
getBaseURI():string
```

Returns the base URI of the current context.


--

##### getObjectSchema
```typescript 
getObjectSchema( type?:string ):Carbon.ObjectSchema.DigestedObjectSchema
```

Returns the ObjectSchema for the specified type. If no type is specified, the general object schema of the context should be returned.

*Parameters*

- type: The URI of the type to look for its schema.


--

##### getSetting
```typescript 
getSetting( name:string ):any
```

Returns the value of the setting looked for.

*Parameters*

- name: Name of the setting to look for.


--

##### hasObjectSchema
```typescript 
hasObjectSchema( type:string ):boolean
```

Returns true if there is an ObjectSchema for the specified type.

*Parameters*

- type: The URI of the type to look for its schema.


--

##### hasSetting
```typescript 
hasSetting( name:string ):boolean
```

Returns if the context contains the provided setting.

*Parameters*

- name: Name of the setting to look for.


--

##### resolve
```typescript 
resolve( relativeURI:string ):string
```

Resolves the relative URI provided in accordance to the base URI of the context.

*Parameters*

- relativeURI: The relative URI to be resolved.


--

##### setSetting
```typescript 
setSetting( name:string,  value:any ):void
```

Set a setting in the current context.

*Parameters*

- name: Name of the setting to look for.
- value: The value to store as the setting specified.





## <a name="Module-Carbon-Document"/>Module Carbon/Document


**Default export:** [Carbon.Document.Class](#Carbon-Document-Class)



### <a name="Carbon-Document-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-Document-Class"/>Interface Carbon.Document.Class


> Interface that represents an in-memory Carbon LDP Document.

#### <a name="Carbon-Document-Class-Properties"/>Properties
```typescript 
_fragmentsIndex:Map<string, Carbon.Fragment.Class> 
```

Map that stores the fragments (named fragments and blank nodes) of the Document.

--

```typescript 
defaultInteractionModel?:Carbon.Pointer.Class 
```

A Pointer URI representing the default interaction model of the document when persisted.

--

```typescript 
hasMemberRelation?:Carbon.Pointer.Class 
```

A Pointer with the inverted relation the document will have.

--

```typescript 
isMemberOfRelation?:Carbon.Pointer.Class 
```

A Pointer with the member of relation of the document.




#### <a name="Carbon-Document-Class-Methods"/>Methods
##### _normalize
```typescript 
_normalize():void
```

Search over the document for normal objects to convert into fragments, and unused fragments to eliminate.


--

##### _removeFragment
```typescript 
_removeFragment( fragment:Carbon.Fragment.Class ):void
```

Remove the fragment referenced by the `Carbon.Fragment.Class` provided from the Document.

*Parameters*

- fragment

```typescript 
_removeFragment( slug:string ):void
```

Remove the fragment referenced by the Slug provided from the Document.

*Parameters*

- slug


--

##### createFragment
```typescript 
createFragment<T>( object:T,  slug:string ):T & Carbon.Fragment.Class
```

Creates a `Carbon.NamedFragment.Class` from the object provided and the slug specified.
If the slug has the form of a BlankNode ID, a `Carbon.Fragment.Class` is created instead.

*Parameters*

- object
- slug

```typescript 
createFragment<T>( object:Object ):T & Carbon.Fragment.Class
```

Creates a `Carbon.Fragment.Class` from the object provided, since no slug is specified.

*Parameters*

- object

```typescript 
createFragment( slug:string ):Carbon.Fragment.Class
```

Creates an empty `Carbon.NamedFragment.Class` with the slug specified.
If the slug has the form of a BlankNode ID, a `Carbon.Fragment.Class` is created instead.

*Parameters*

- slug

```typescript 
createFragment():Carbon.Fragment.Class
```

Creates an empty `Carbon.Fragment.Class`, since no slug is provided.


--

##### createNamedFragment
```typescript 
createNamedFragment( slug:string ):Carbon.NamedFragment.Class
```

Creates a `Carbon.NamedFragment.Class` with the slug provided.
If the slug has the form of a BlankNode ID, an Error is thrown.

*Parameters*

- slug

```typescript 
createNamedFragment<T>( object:T,  slug:string ):T & Carbon.NamedFragment.Class
```

Creates a `Carbon.NamedFragment.Class` from the object provided and the slug specified.
If the slug has the form of a BlankNode ID, an Error is thrown.

*Parameters*

- object
- slug


--

##### getFragment
```typescript 
getFragment<T>( id:string ):T & Carbon.Fragment.Class
```

Returns the fragment referenced by the ID provided.
Returns `null` if no fragment exists in the Document.

*Parameters*

- id


--

##### getFragments
```typescript 
getFragments():Carbon.Fragment.Class[]
```

Returns an array with all the fragments in the Document.


--

##### getNamedFragment
```typescript 
getNamedFragment<T>( id:string ):T & Carbon.Fragment.Class
```

Returns the fragment referenced by the ID provided.
Returns `null` if no fragment exists in the Document.

*Parameters*

- id


--

##### getPointer
```typescript 
getPointer( id:string ):boolean
```

Returns the pointer referenced by the URI provided. If no pointer exists, one is created and then returned.
Returns `null` if the URI is outside the scope of the Document.

*Parameters*

- id


--

##### hasFragment
```typescript 
hasFragment( id:string ):boolean
```

Returns true if the Document has the fragment referenced by the ID provided.

*Parameters*

- id


--

##### hasPointer
```typescript 
hasPointer( id:string ):boolean
```

Returns true if the Document has a pointer referenced by the URI provided.

*Parameters*

- id


--

##### inScope
```typescript 
inScope( pointer:Carbon.Pointer.Class ):boolean
```

Returns true if the pointer provided is inside the scope of the Document.

*Parameters*

- pointer

```typescript 
inScope( id:string ):boolean
```

Returns true if the URI provided is inside the scope of the Document.

*Parameters*

- id


--

##### removeNamedFragment
```typescript 
removeNamedFragment( fragment:Carbon.NamedFragment.Class ):void
```

Remove the maned fragment referenced by the `Carbon.NamedFragment.Class` provided from the Document.

*Parameters*

- fragment

```typescript 
removeNamedFragment( slug:string ):void
```

Remove the named fragment referenced by the Slug provided from the Document.

*Parameters*

- slug


--

##### toJSON
```typescript 
toJSON( objectSchemaResolver:Carbon.ObjectSchema.Resolver,  jsonLDConverter:Carbon.JSONLDConverter.Class ):string
```

Returns a JSON string from the Document using an ObjectSchema and a JSONLDConverter.

*Parameters*

- objectSchemaResolver
- jsonLDConverter

```typescript 
toJSON( objectSchemaResolver:Carbon.ObjectSchema.Resolver ):string
```

Returns a JSON string from the Document using an ObjectSchema

*Parameters*

- objectSchemaResolver

```typescript 
toJSON():string
```

Returns a JSON string from the Document using the default ObjectSchema.





### <a name="Carbon-Document-Factory"/>Class Carbon.Document.Factory


> Factory class for `Carbon.Document.Class` objects.




#### <a name="Carbon-Document-Factory-Methods"/>Methods
##### create
```typescript 
static create():Carbon.Document.Class
```

Creates a `Carbon.Document.Class` object.


--

##### createFrom
```typescript 
static createFrom<T extends Object>( object:T ):T & Carbon.Document.Class
```

Creates a `Carbon.Document.Class` object from the object provided.

*Parameters*

- object: Object to be converted into a Document.


--

##### decorate
```typescript 
static decorate<T extends Object>( object:T ):T & Carbon.Document.Class
```

Decorates the object provided with the properties and methods of a `Carbon.Document.Class` object.

*Parameters*

- object: Object to be decorated.


--

##### hasClassProperties
```typescript 
static hasClassProperties( documentResource:Object ):boolean
```

Returns true if the object provided has the properties and methods of a `Carbon.Document.Class` object.

*Parameters*

- documentResource


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.Document.Class` object.

*Parameters*

- object






#### <a name="Carbon-Document-Factory-Decorated-Object"/>Decorated Object
**Interfaces:** [Carbon.Document.Class](#Carbon-Document-Class)

> Object decorated by the `Carbon.Document.Factory.decorate()` function.

##### <a name="Carbon-Document-Factory-Decorated-Object-Properties"/>Properties
```typescript 
_fragmentsIndex:Map<string, Carbon.Fragment.Class> 
```

Map that stores the fragments (named fragments and blank nodes) of the Document.




##### <a name="Carbon-Document-Factory-Decorated-Object-Methods"/>Methods
##### _normalize
```typescript 
_normalize():void
```

Search over the document for normal objects to convert into fragments, and unused fragments to eliminate.


--

##### _removeFragment
```typescript 
_removeFragment( fragment:Carbon.Fragment.Class ):void
```

Remove the fragment referenced by the `Carbon.Fragment.Class` provided from the Document.

*Parameters*

- fragment

```typescript 
_removeFragment( slug:string ):void
```

Remove the fragment referenced by the Slug provided from the Document.

*Parameters*

- slug


--

##### createFragment
```typescript 
createFragment<T>( object:T,  slug:string ):T & Carbon.Fragment.Class
```

Creates a `Carbon.NamedFragment.Class` from the object provided and the slug specified.
If the slug has the form of a BlankNode ID, a `Carbon.Fragment.Class` is created instead.

*Parameters*

- object
- slug

```typescript 
createFragment<T>( object:Object ):T & Carbon.Fragment.Class
```

Creates a `Carbon.Fragment.Class` from the object provided, since no slug is specified.

*Parameters*

- object

```typescript 
createFragment( slug:string ):Carbon.Fragment.Class
```

Creates an empty `Carbon.NamedFragment.Class` with the slug specified.
If the slug has the form of a BlankNode ID, a `Carbon.Fragment.Class` is created instead.

*Parameters*

- slug

```typescript 
createFragment():Carbon.Fragment.Class
```

Creates an empty `Carbon.Fragment.Class`, since no slug is provided.


--

##### createNamedFragment
```typescript 
createNamedFragment( slug:string ):Carbon.NamedFragment.Class
```

Creates a `Carbon.NamedFragment.Class` with the slug provided.
If the slug has the form of a BlankNode ID, an Error is thrown.

*Parameters*

- slug

```typescript 
createNamedFragment<T>( object:T,  slug:string ):T & Carbon.NamedFragment.Class
```

Creates a `Carbon.NamedFragment.Class` from the object provided and the slug specified.
If the slug has the form of a BlankNode ID, an Error is thrown.

*Parameters*

- object
- slug


--

##### getFragment
```typescript 
getFragment<T>( id:string ):T & Carbon.Fragment.Class
```

Returns the fragment referenced by the ID provided.
Returns `null` if no fragment exists in the Document.

*Parameters*

- id


--

##### getFragments
```typescript 
getFragments():Carbon.Fragment.Class[]
```

Returns an array with all the fragments in the Document.


--

##### getNamedFragment
```typescript 
getNamedFragment<T>( id:string ):T & Carbon.Fragment.Class
```

Returns the fragment referenced by the ID provided.
Returns `null` if no fragment exists in the Document.

*Parameters*

- id


--

##### getPointer
```typescript 
getPointer( id:string ):boolean
```

Returns the pointer referenced by the URI provided. If no pointer exists, one is created and then returned.
Returns `null` if the URI is outside the scope of the Document.

*Parameters*

- id


--

##### hasFragment
```typescript 
hasFragment( id:string ):boolean
```

Returns true if the Document has the fragment referenced by the ID provided.

*Parameters*

- id


--

##### hasPointer
```typescript 
hasPointer( id:string ):boolean
```

Returns true if the Document has a pointer referenced by the URI provided.

*Parameters*

- id


--

##### inScope
```typescript 
inScope( pointer:Carbon.Pointer.Class ):boolean
```

Returns true if the pointer provided is inside the scope of the Document.

*Parameters*

- pointer

```typescript 
inScope( id:string ):boolean
```

Returns true if the URI provided is inside the scope of the Document.

*Parameters*

- id


--

##### removeNamedFragment
```typescript 
removeNamedFragment( fragment:Carbon.NamedFragment.Class ):void
```

Remove the maned fragment referenced by the `Carbon.NamedFragment.Class` provided from the Document.

*Parameters*

- fragment

```typescript 
removeNamedFragment( slug:string ):void
```

Remove the named fragment referenced by the Slug provided from the Document.

*Parameters*

- slug


--

##### toJSON
```typescript 
toJSON( objectSchemaResolver:Carbon.ObjectSchema.Resolver,  jsonLDConverter:Carbon.JSONLDConverter.Class ):string
```

Returns a JSON string from the Document using an ObjectSchema and a JSONLDConverter.

*Parameters*

- objectSchemaResolver
- jsonLDConverter

```typescript 
toJSON( objectSchemaResolver:Carbon.ObjectSchema.Resolver ):string
```

Returns a JSON string from the Document using an ObjectSchema

*Parameters*

- objectSchemaResolver

```typescript 
toJSON():string
```

Returns a JSON string from the Document using the default ObjectSchema.





## <a name="Module-Carbon-Documents"/>Module Carbon/Documents







### <a name="Carbon-Documents-Class"/>Class Carbon.Documents.Class

**Implements:** [Carbon.Pointer.Library](#Carbon-Pointer-Library), [Carbon.Pointer.Validator](#Carbon-Pointer-Validator), [Carbon.ObjectSchema.Resolver](#Carbon-ObjectSchema-Resolver)

> Class that contains methods for retrieving, saving and updating documents from the CarbonLDP server.


#### <a name="Carbon-Documents-Class-Constructor"/>Constructor
```typescript 
Class( context?:Carbon.Context.Class )
```


*Parameters*

- context: The context where the documents instance will live. If no context is provided, calling its methods with relative URIs will throw an error, since there will be no form to resolve them.


#### <a name="Carbon-Documents-Class-Properties"/>Properties

```typescript 
jsonldConverter:Carbon.JSONLD.Converter.Class 
```

Instance of `Carbon.JSONLD.Converter.Class` that is used to compact retrieved documents and to expand documents to persist. This property is not writable.




#### <a name="Carbon-Documents-Class-Methods"/>Methods

##### addMember
```typescript 
addMember( documentURI:string,  member:Carbon.Pointer.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Add a member relation to the resource Pointer in the document container specified.

*Parameters*

- documentURI: URI of the document container where the member will be added.
- member: Pointer object that references the resource to add as a member.
- requestOptions: Customizable options for the request.

```typescript 
addMember( documentURI:string,  memberURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Add a member relation to the resource URI in the document container specified.

*Parameters*

- documentURI: URI of the document container where the member will be added.
- memberURI: URI of the resource to add as a member.
- requestOptions: Customizable options for the request.


--

##### addMembers
```typescript 
addMembers( documentURI:string,  members:(Carbon.Pointer.Class | string)[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Add a member relation to every resource URI or Pointer provided in the document container specified.

*Parameters*

- documentURI: URI of the document container where the members will be added.
- members: Array of URIs or Pointers to add as members.
- requestOptions: Customizable options for the request.


--

##### createAccessPoint
```typescript 
createAccessPoint<T>( documentURI:string,  accessPoint:T & Carbon.AccessPoint.Class,  slug?:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedAccessPoint.Class, Carbon.HTTP.Response.Class ]>
```

Persists an AccessPoint in the document specified.

*Parameters*

- documentURI: URI of the document where to create a new access point.
- accessPoint: AccessPoint Document to persist.
- slug: Slug that will be used for the URI of the new access point.
- requestOptions: Customizable options for the request.

```typescript 
createAccessPoint<T>( documentURI:string,  accessPoint:T & Carbon.AccessPoint.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedAccessPoint.Class, Carbon.HTTP.Response.Class ]>
```

Persists an AccessPoint in the document specified.

*Parameters*

- documentURI: URI of the document where to create a new access point.
- accessPoint: AccessPoint Document to persist.
- requestOptions: Customizable options for the request.


--

##### createAccessPoints
```typescript 
createAccessPoints<T>( documentURI:string,  accessPoints:T & Carbon.AccessPoint.Class,  slugs?:string[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedAccessPoint.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Persists multiple access points objects for the specified document.

*Parameters*

- documentURI: URI of the document where to create the new access points.
- accessPoints: Array with the access points to persist.
- slugs: Array with the slugs that corresponds to each object in `accessPoints` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform.
- requestOptions: Customizable options for the request.

```typescript 
createAccessPoints<T>( documentURI:string,  accessPoints:T & Carbon.AccessPoint.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedAccessPoint.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Persists multiple access points objects for the specified document.

*Parameters*

- documentURI: URI of the document where to create the new access points.
- accessPoints: Array with the access points to persist.
- requestOptions: Customizable options for the request.


--

##### createChild
```typescript 
createChild<T>( parentURI:string,  childObject:T,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Persists JavaScript object as a child document for the respective parent source.

*Parameters*

- parentURI: URI of the document where to create a new child.
- childObject: A normal JavaScript object that will be converted and persisted as a new child document.
- requestOptions: Customizable options for the request.

```typescript 
createChild<T>( parentURI:string,  childObject:T,  slug?:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Persists JavaScript object as a child document for the respective parent source.

*Parameters*

- parentURI: URI of the document where to create a new child.
- childObject: A normal JavaScript object that will be converted and persisted as a new child document.
- slug: Slug that will be used for the URI of the new child.
- requestOptions: Customizable options for the request.


--

##### createChildAndRetrieve
```typescript 
createChildAndRetrieve<T>( parentURI:string,  childObject:T,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>
```

Persists JavaScript object as a child document for the respective parent source and retrieves tha updated data from the server.

*Parameters*

- parentURI: URI of the document where to create a new child.
- childObject:  A normal JavaScript object that will be converted and persisted as a new child document.
- requestOptions: Customizable options for the request.

```typescript 
createChildAndRetrieve<T>( parentURI:string,  childObject:T,  slug?:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>
```

Persists JavaScript object as a child document for the respective parent source and retrieves tha updated data from the server.

*Parameters*

- parentURI: URI of the document where to create a new child.
- childObject:  A normal JavaScript object that will be converted and persisted as a new child document.
- slug: Slug that will be used for the URI of the new child.
- requestOptions: Customizable options for the request.


--

##### createChildren
```typescript 
createChildren<T>( parentURI:string,  childrenObjects:T[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Persists multiple JavaScript objects as children of the parent document.

*Parameters*

- parentURI: URI of the document where to create a new child.
- childrenObjects: An array with the objects to be converted and persisted as new children of the parent document.
- requestOptions: Customizable options for every the request.

```typescript 
createChildren<T>( parentURI:string,  childrenObjects:T[],  slugs?:string[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Persists multiple JavaScript objects as children of the parent document.

*Parameters*

- parentURI: URI of the document where to create a new child.
- childrenObjects: An array with the objects to be converted and persisted as new children of the parent document.
- slugs: Array with the slugs that corresponds to each object in `childrenObjects`, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform.
- requestOptions: Customizable options for every the request.


--

##### createChildrenAndRetrieve
```typescript 
createChildrenAndRetrieve<T>( parentURI:string,  childrenObjects:T[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], [ Carbon.HTTP.Response.Class[], Carbon.HTTP.Response.Class[] ] ]>
```

Persists multiple JavaScript objects as children of the parent document and retrieves tha updated data from the server.

*Parameters*

- parentURI: URI of the document where to create a new child.
- childrenObjects: An array with the objects to be converted and persisted as new children of the parent document.
- requestOptions: Customizable options for every the request.

```typescript 
createChildrenAndRetrieve<T>( parentURI:string,  childrenObjects:T[],  slugs?:string[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], [ Carbon.HTTP.Response.Class[], Carbon.HTTP.Response.Class[] ] ]>
```

Persists multiple JavaScript objects as children of the parent document and retrieves tha updated data from the server.

*Parameters*

- parentURI: URI of the document where to create a new child.
- childrenObjects: An array with the objects to be converted and persisted as new children of the parent document.
- slugs: Array with the slugs that corresponds to each object in `childrenObjects`, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform.
- requestOptions: Customizable options for every the request.


--

##### delete
```typescript 
delete( documentURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Delete the resource from the CarbonLDP server referred by the URI provided.

*Parameters*

- documentURI: The resource to delete from the CarbonLDP server.
- requestOptions: Customizable options for the request.


--

##### executeRawASKQuery
```typescript 
executeRawASKQuery( documentURI:string,  askQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes an ASK query on a document and returns a raw application/sparql-results+json object.

*Parameters*

- documentURI: URI of the document that works as a SPARQL endpoint where to execute the SPARQL query.
- askQuery: ASK query to execute in the selected endpoint.
- requestOptions: Customizable options for the request.


--

##### executeRawCONSTRUCTQuery
```typescript 
executeRawCONSTRUCTQuery( documentURI:string,  constructQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ string, Carbon.HTTP.Response.Class ]>
```

Executes a CONSTRUCT query on a document and returns a string with the resulting model.

*Parameters*

- documentURI: URI of the document that works as a SPARQL endpoint where to execute the SPARQL query.
- constructQuery: CONSTRUCT query to execute in the selected endpoint.
- requestOptions: Customizable options for the request.


--

##### executeRawDESCRIBEQuery
```typescript 
executeRawDESCRIBEQuery( documentURI:string,  describeQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ string, Carbon.HTTP.Response.Class ]>
```

Executes a DESCRIBE query and returns a string with the resulting model.

*Parameters*

- documentURI: URI of the document that works as a SPARQL endpoint where to execute the SPARQL query.
- describeQuery: DESCRIBE query to execute in the selected endpoint.
- requestOptions: Customizable options for the request.


--

##### executeRawSELECTQuery
```typescript 
executeRawSELECTQuery( documentURI:string,  selectQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes a SELECT query on a document and returns a raw application/sparql-results+json object.

*Parameters*

- documentURI: URI of the document that works as a SPARQL endpoint where to execute the SPARQL query.
- selectQuery: SELECT query to execute in the selected endpoint.
- requestOptions: Customizable options for the request.


--

##### executeUPDATE
```typescript 
executeUPDATE( documentURI:string,  update:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Executes a DESCRIBE query and returns a string with the resulting model.

*Parameters*

- documentURI: URI of the document that works as a SPARQL endpoint where to execute the SPARQL query.
- update: UPDATE query to execute in the selected endpoint.
- requestOptions: Customizable options for the request.


--

##### exists
```typescript 
exists( documentURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ boolean, Carbon.HTTP.Response.Class ]>
```

Retrieves a boolean indicating if the resource exists or not in the CarbonLDP server.

*Parameters*

- documentURI: The URI to verify if it exists.
- requestOptions: Customizable options for the request.


--

##### get
```typescript 
get<T>( uri:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedDocument.Class, HTTP.Response.Class ]>
```

Retrieves the Carbon Document referred by the URI specified from the CarbonLDP server.

*Parameters*

- uri: The URI of the document to retrieve.
- requestOptions: Customizable options for the request.


--

##### getChildren
```typescript 
getChildren<T>( parentURI:string,  retrievalPreferences?:Carbon.RetrievalPreferences.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>
```

Retrieves an array of resolved persisted documents that refers all children of the container specified, or a part of them in accordance to the retrieval preferences specified.

*Parameters*

- parentURI: URI of the document from where to look for its children.
- retrievalPreferences: An object that specify the retrieval preferences for the request.
- requestOptions: Customizable options for the request.

```typescript 
getChildren<T>( parentURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>
```

Retrieves an array of resolved persisted documents that refers all children of the container specified.

*Parameters*

- parentURI: URI of the document from where to look for its children.
- requestOptions: Customizable options for the request.


--

##### getDownloadURL
```typescript 
getDownloadURL( documentURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Add to the URI provided the necessary properties for a single download request.

*Parameters*

- documentURI: The URI of the document that will be converted in a single download request.
- requestOptions


--

##### getMembers
```typescript 
getMembers<T>( uri:string,  includeNonReadable?:boolean,  retrievalPreferences?:Carbon.RetrievalPreferences.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>
```

Retrieves all the members of a document and their contents, or a part of them in accordance to the retrieval preferences specified.

*Parameters*

- uri: URI of the document from where to look for its members.
- includeNonReadable: Specify if the response should include the Non Readable resources. By default this is set to `true`.
- retrievalPreferences: An object to specify the retrieval preferences for the request.
- requestOptions: Customizable options for the request.

```typescript 
getMembers<T>( uri:string,  includeNonReadable?:boolean,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>
```

Retrieves all the members of a document and their contents.

*Parameters*

- uri: URI of the document from where to look for its members.
- includeNonReadable: Specify if the response should include the Non Readable resources. By default this is set to `true`.
- requestOptions: Customizable options for the request.

```typescript 
getMembers<T>( uri:string,  retrievalPreferences?:Carbon.RetrievalPreferences.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>
```

Retrieves all the members of a document and their content, or a part of them in accordance to the retrieval preferences specified.

*Parameters*

- uri: URI of the document from where to look for its members.
- retrievalPreferences: An object to specify the retrieval preferences for the request.
- requestOptions: Customizable options for the request.

```typescript 
getMembers<T>( uri:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>
```

Retrieves all the members of a document and their contents.

*Parameters*

- uri: URI of the document from where to look for its members.
- requestOptions: Customizable options for the request.


--

##### getPointer
```typescript 
getPointer( id:string ):boolean
```

Returns the pointer referenced by the URI provided. If no pointer exists, one is created and then returned.
Returns `null` if the URI is outside the scope of the Documents instance.

*Parameters*

- id: URI to look for.


--

##### hasPointer
```typescript 
hasPointer( id:string ):boolean
```

Returns true if the Documents instance has a pointer referenced by the URI provided.

*Parameters*

- id: URI to look for.


--

##### inScope
```typescript 
inScope( pointer:Carbon.Pointer.Class ):boolean
```

Returns true if the pointer provided is inside the scope of the Documents instance.

*Parameters*

- pointer: Pointer to evaluate.

```typescript 
inScope( id:string ):boolean
```

Returns true if the URI provided is inside the scope of the Documents instance.

*Parameters*

- id: URI to evaluate.


--

##### listChildren
```typescript 
listChildren( parentURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response ]>
```

Retrieves an array of unresolved persisted documents that refers to the children of the container specified.

*Parameters*

- parentURI: URI of the document container where to look for its children.
- requestOptions: Customizable options for the request.


--

##### listMembers
```typescript 
listMembers( uri:string,  includeNonReadable?:boolean,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response.Class ]>
```

Retrieves all the members of a document without resolving them.

*Parameters*

- uri: URI of the document from where to look for its members.
- includeNonReadable: Specify if the response should include the Non Readable resources. By default this is set to `true`.
- requestOptions: Customizable options for the request.

```typescript 
listMembers( uri:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response.Class ]>
```

Retrieves all the members of a document without resolving them.

*Parameters*

- uri: URI of the document from where to look for its members.
- requestOptions: Customizable options for the request.


--

##### refresh
```typescript 
refresh<T>( persistedDocument:T & Carbon.PersistedDocument.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedDocument.Class, Carbon.HTTP.Response ]>
```

Update the specified document with the data of the CarbonLDP server, if a newest version exists.

*Parameters*

- persistedDocument: The persisted document to update.
- requestOptions: Customizable options for the request.


--

##### removeAllMembers
```typescript 
removeAllMembers( documentURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Remove all the member relations from the document container specified.

*Parameters*

- documentURI: URI of the document container where the members will be removed.
- requestOptions: Customizable options for the request.


--

##### removeMember
```typescript 
removeMember( documentURI:string,  member:Carbon.Pointer.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Remove the member relation between the Pointer and the resource container specified.

*Parameters*

- documentURI: URI of the resource container from where the member will be removed.
- member: Pointer object that references the resource to remove as a member.
- requestOptions: Customizable options for the request.

```typescript 
removeMember( documentURI:string,  memberURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Remove the member relation between the resource URI and the resource container specified.

*Parameters*

- documentURI: URI of the resource container from where the member will be removed.
- memberURI: URI of the resource to remove as a member.
- requestOptions: Customizable options for the request.


--

##### removeMembers
```typescript 
removeMembers( documentURI:string,  members:(Carbon.Pointer.Class | string)[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Remove the member relation to every specified resource URI or Pointer form the document container specified.

*Parameters*

- documentURI: URI of the document container where the members will be removed.
- members: Array of URIs or Pointers to remove as members
- requestOptions: Customizable options for the request.


--

##### save
```typescript 
save<T>( persistedDocument:T & Carbon.PersistedDocument.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Update the data of the document provided in the server.

*Parameters*

- persistedDocument: The persisted document with the data to update in the server.
- requestOptions: Customisable options for the request.


--

##### saveAndRefresh
```typescript 
saveAndRefresh<T>( persistedDocument:T & Carbon.PersistedDocument.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedDocument.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>
```

Save and refresh the PersistedDocument specified.

*Parameters*

- persistedDocument: The persistedDocument to save and refresh.
- requestOptions: Customizable options for the request.


--

##### upload
```typescript 
upload( parentURI:string,  data:Blob,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>
```

Upload binary data, creating a child for the parent specified. This signature only works in a web browser.

*Parameters*

- parentURI: URI of the document where to upload the new binary data child.
- data: Blob of the binary data to upload.
- requestOptions: Customizable options for the request.

```typescript 
upload( parentURI:string,  data:Blob,  slug?:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>
```

Upload binary data, creating a child for the parent specified. This signature only works in a web browser.

*Parameters*

- parentURI: URI of the document where to upload the new binary data child.
- data: Blob of the binary data to upload.
- slug: Slug that will be used for the URI of the new binary child.
- requestOptions: Customizable options for the request.

```typescript 
upload( parentURI:string,  data:Buffer,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>
```

Upload binary data, creating a child for the parent specified. This signature only works in Node.js.

*Parameters*

- parentURI: URI of the document where to upload the new binary data child.
- data: Buffer of the binary data to upload.
- requestOptions: Customizable options for the request.

```typescript 
upload( parentURI:string,  data:Buffer,  slug?:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>
```

Upload binary data, creating a child for the parent specified. This signature only works in Node.js.

*Parameters*

- parentURI: URI of the document where to upload the new binary data child.
- data: Buffer of the binary data to upload.
- slug: Slug that will be used fot he URI of the new binary child.
- requestOptions: Customizable options for the request.






## <a name="Module-Carbon-Errors"/>Module Carbon/Errors



#### <a name="Carbon-Errors-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| IDAlreadyInUseError | [Carbon/Errors/IDAlreadyInUseError](#Module-Carbon-Errors-IDAlreadyInUseError) |
| IllegalActionError | [Carbon/Errors/IllegalActionError](#Module-Carbon-Errors-IllegalActionError) |
| IllegalArgumentError | [Carbon/Errors/IllegalArgumentError](#Module-Carbon-Errors-IllegalArgumentError) |
| IllegalStateError | [Carbon/Errors/IllegalStateError](#Module-Carbon-Errors-IllegalStateError) |
| InvalidJSONLDSyntaxError | [Carbon/Errors/InvalidJSONLDSyntaxError](#Module-Carbon-Errors-InvalidJSONLDSyntaxError) |
| NotImplementedError | [Carbon/Errors/NotImplementedError](#Module-Carbon-Errors-NotImplementedError) |




## <a name="Module-Carbon-Errors-AbstractError"/>Module Carbon/Errors/AbstractError







### <a name="Carbon-Errors-AbstractError"/>Class Carbon.Errors.AbstractError


> Class that works as template for the custom errors in the SDK.


#### <a name="Carbon-Errors-AbstractError-Constructor"/>Constructor
```typescript 
AbstractError( message:string )
```


*Parameters*

- message


#### <a name="Carbon-Errors-AbstractError-Properties"/>Properties

```typescript 
message:string 
```


--

```typescript 
name:string 
```





#### <a name="Carbon-Errors-AbstractError-Methods"/>Methods

##### toString
```typescript 
toString():string
```

Returns a string representation of the error.






## <a name="Module-Carbon-Errors-IDAlreadyInUseError"/>Module Carbon/Errors/IDAlreadyInUseError







### <a name="Carbon-Errors-IDAlreadyInUseError"/>Class Carbon.Errors.IDAlreadyInUseError

**Extends:** [Carbon.Errors.AbstractError](#Carbon-Errors-AbstractError)

> Error class to indicate that an identifier (ID) is already in use.



#### <a name="Carbon-Errors-IDAlreadyInUseError-Properties"/>Properties

```typescript 
name:string 
```







## <a name="Module-Carbon-Errors-IllegalActionError"/>Module Carbon/Errors/IllegalActionError







### <a name="Carbon-Errors-IllegalActionError"/>Class Carbon.Errors.IllegalActionError

**Extends:** [Carbon.Errors.AbstractError](#Carbon-Errors-AbstractError)

> Error class to indicate that an action not allowed was attempted.



#### <a name="Carbon-Errors-IllegalActionError-Properties"/>Properties

```typescript 
name:string 
```







## <a name="Module-Carbon-Errors-IllegalArgumentError"/>Module Carbon/Errors/IllegalArgumentError







### <a name="Carbon-Errors-IllegalArgumentError"/>Class Carbon.Errors.IllegalArgumentError

**Extends:** [Carbon.Errors.AbstractError](#Carbon-Errors-AbstractError)

> Error class to indicate that a different argument than the expected was provided.



#### <a name="Carbon-Errors-IllegalArgumentError-Properties"/>Properties

```typescript 
name:string 
```







## <a name="Module-Carbon-Errors-IllegalStateError"/>Module Carbon/Errors/IllegalStateError







### <a name="Carbon-Errors-IllegalStateError"/>Class Carbon.Errors.IllegalStateError

**Extends:** [Carbon.Errors.AbstractError](#Carbon-Errors-AbstractError)

> Error class to indicate that a task can't be completed because of the lack of pre-required configuration or execution of previous tasks.


#### <a name="Carbon-Errors-IllegalStateError-Constructor"/>Constructor
```typescript 
IllegalStateError( message?:string )
```


*Parameters*

- message


#### <a name="Carbon-Errors-IllegalStateError-Properties"/>Properties

```typescript 
name:string 
```





#### <a name="Carbon-Errors-IllegalStateError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-Errors-InvalidJSONLDSyntaxError"/>Module Carbon/Errors/InvalidJSONLDSyntaxError







### <a name="Carbon-Errors-InvalidJSONLDSyntaxError"/>Class Carbon.Errors.InvalidJSONLDSyntaxError

**Extends:** [Carbon.Errors.AbstractError](#Carbon-Errors-AbstractError)

> Error class to indicate that there an invalid syntax in a JSON-LD object.



#### <a name="Carbon-Errors-InvalidJSONLDSyntaxError-Properties"/>Properties

```typescript 
name:string 
```







## <a name="Module-Carbon-Errors-NotImplementedError"/>Module Carbon/Errors/NotImplementedError







### <a name="Carbon-Errors-NotImplementedError"/>Class Carbon.Errors.NotImplementedError

**Extends:** [Carbon.Errors.AbstractError](#Carbon-Errors-AbstractError)

> Error class to indicate that an action is not yet implemented.


#### <a name="Carbon-Errors-NotImplementedError-Constructor"/>Constructor
```typescript 
NotImplementedError( message?:string )
```


*Parameters*

- message


#### <a name="Carbon-Errors-NotImplementedError-Properties"/>Properties

```typescript 
name:string 
```





#### <a name="Carbon-Errors-NotImplementedError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-Fragment"/>Module Carbon/Fragment


**Default export:** [Carbon.Fragment.Class](#Carbon-Fragment-Class)





### <a name="Carbon-Fragment-Class"/>Interface Carbon.Fragment.Class


> Interface that an in-memory fragment of a document.

#### <a name="Carbon-Fragment-Class-Properties"/>Properties
```typescript 
document:Carbon.Document.Class 
```

The document the fragment belongs to.





### <a name="Carbon-Fragment-Factory"/>Class Carbon.Fragment.Factory


> Factory class for `Carbon.Fragment.Class` objects.




#### <a name="Carbon-Fragment-Factory-Methods"/>Methods
##### create
```typescript 
static create( id:string,  document:Carbon.Document.Class ):Carbon.Fragment.Class
```

Creates a Fragment with the ID provided.

*Parameters*

- id: The ID of the fragment to create.
- document: The document that the fragment will be part of.

```typescript 
static create( document:Carbon.Document.Class ):Carbon.Fragment.Class
```

Creates a BlankNode since no ID is provided.

*Parameters*

- document: The document that the fragment will be part of.


--

##### createFrom
```typescript 
static createFrom<T extends Object>( object:T,  id:string,  document:Carbon.Document.Class ):T & Carbon.Fragment.Class
```

Creates a Fragment from an Object with the ID provided.

*Parameters*

- object: Object that will be converted to a fragment.
- id: The ID that will be assigned to the fragment.
- document: The document that the fragment will be part of.

```typescript 
static createFrom<T extends Object>( object:T,  document:Carbon.Document.Class ):T & Carbon.Fragment.Class
```

Creates a BlankNode since no ID is provided.

*Parameters*

- object: Object that will be converted to a fragment.
- document: The document that the fragment will be part of.


--

##### hasClassProperties
```typescript 
static hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties and methods of a `Class.Fragment.Class` object.

*Parameters*

- resource







## <a name="Module-Carbon-FreeResources"/>Module Carbon/FreeResources


**Default export:** [Carbon.FreeResources.Class](#Carbon-FreeResources-Class)





### <a name="Carbon-FreeResources-Class"/>Interface Carbon.FreeResources.Class

**Extends:** [Carbon.Pointer.Library](#Carbon-Pointer-Library), [Carbon.Pointer.Validator](#Carbon-Pointer-Validator)

> Interface that represents a set of free resources.

#### <a name="Carbon-FreeResources-Class-Properties"/>Properties
```typescript 
_documents:Private property that contains the Documents class where the object scope is in. 
```

Carbon.Documents.Class

--

```typescript 
_resourcesIndex:Private property that contains the references of every free resource in a map form. 
```

Map<string, Carbon.Resource.Class>




#### <a name="Carbon-FreeResources-Class-Methods"/>Methods
##### createResource
```typescript 
createResource( id?:string ):Carbon.Resource.Class
```

Creates and returns a new free resource. Throw an Error if no valid ID if provided or if it's already in use.

*Parameters*

- id: The ID of the resource to create. It should be an ID as a BlankNode.


--

##### createResourceFrom
```typescript 
createResourceFrom<T>( object:T,  id?:string ):Carbon.Resource.Class
```

Create and returns a new free resource from an object. Throw an Error if no valid id is provided or if it is already in use.

*Parameters*

- object: The object to be used as the new resource.
- id: The ID of the resource to create. It should be an ID as a BlankNode.


--

##### getPointer
```typescript 
getPointer( id:string ):Carbon.Pointer.Class
```

Returns the pointer referred by the ID specified, or creates one if no pointer exists in the scope.

*Parameters*

- id: The ID of the pointer sought for or the one to create.


--

##### getResource
```typescript 
getResource( id:string ):Carbon.Resource.Class
```

Returns the resource referred by the ID provided. If no resource exists with the ID specified, `null` is returned.

*Parameters*

- id: The ID of the resource to sought for.


--

##### getResources
```typescript 
getResources():Carbon.Resource.Class[]
```

Returns an array with all the resources inside the FreeResources object.


--

##### hasResource
```typescript 
hasResource( id:string ):boolean
```

Returns true if a resource with the ID specified exists.

*Parameters*

- id: The ID of the resource to sought for.


--

##### toJSON
```typescript 
toJSON():string
```

Converts the resources contained in the current `Carbon.FreeResources.Class` object to a JSON string.





### <a name="Carbon-FreeResources-Factory"/>Class Carbon.FreeResources.Factory


> Factory class for `Carbon.FreeResources.Class` objects.




#### <a name="Carbon-FreeResources-Factory-Methods"/>Methods
##### create
```typescript 
static create( documents:Carbon.Documents.Class ):Carbon.FreeResources.Class
```

Creates a empty `Carbon.FreeResources.Class` object.

*Parameters*

- documents: A `Carbon.Documents.Class` object where the FreeResources scope is in.


--

##### createFrom
```typescript 
static createFrom<T extends Object>( object:T,  documents:Carbon.Documents.Class ):T & Carbon.FreeResources.Class
```

Creates a `Carbon.FreeResources.Class` object from the plain object provided.

*Parameters*

- object: The object that wants be converted in a `Carbon.FreeResources.Class`.
- documents: A `Carbon.Documents.Class` object where the FreeResource scope is in.


--

##### decorate
```typescript 
static decorate<T extends Object>( object:T ):T & Carbon.FreeResources.Class
```

Decorates the object provided with the properties and methods of a `Carbon.FreeResources.Class` object.

*Parameters*

- object


--

##### hasClassProperties
```typescript 
static hasClassProperties( object:Object ):boolean
```

Returns true if the object provided has the properties and methods of a `Carbon.FreeResources.Class` object.

*Parameters*

- object: Object to evaluate.






#### <a name="Carbon-FreeResources-Factory-Decorated-Object"/>Decorated Object
**Interfaces:** [Carbon.FreeResources.Class](#Carbon-FreeResources-Class)

> Object decorated by the `Carbon.FreeResources.Factory.decorate()` method.

##### <a name="Carbon-FreeResources-Factory-Decorated-Object-Properties"/>Properties
```typescript 
_documents:Private property that contains the Documents class where the object scope is in. 
```

Carbon.Documents.Class

--

```typescript 
_resourcesIndex:Private property that contains the references of every free resource in a map form. 
```

Map<string, Carbon.Resource.Class>




##### <a name="Carbon-FreeResources-Factory-Decorated-Object-Methods"/>Methods
##### createResource
```typescript 
createResource( id?:string ):Carbon.Resource.Class
```

Creates and returns a new free resource. Throw an Error if no valid ID if provided or if it's already in use.

*Parameters*

- id: The ID of the resource to create. It should be an ID as a BlankNode.


--

##### createResourceFrom
```typescript 
createResourceFrom<T>( object:T,  id?:string ):Carbon.Resource.Class
```

Create and returns a new free resource from an object. Throw an Error if no valid id is provided or if it is already in use.

*Parameters*

- object: The object to be used as the new resource.
- id: The ID of the resource to create. It should be an ID as a BlankNode.


--

##### getPointer
```typescript 
getPointer( id:string ):Carbon.Pointer.Class
```

Returns the pointer referred by the ID specified, or creates one if no pointer exists in the scope.

*Parameters*

- id: The ID of the pointer sought for or the one to create.


--

##### getResource
```typescript 
getResource( id:string ):Carbon.Resource.Class
```

Returns the resource referred by the ID provided. If no resource exists with the ID specified, `null` is returned.

*Parameters*

- id: The ID of the resource to sought for.


--

##### getResources
```typescript 
getResources():Carbon.Resource.Class[]
```

Returns an array with all the resources inside the FreeResources object.


--

##### hasPointer
```typescript 
hasPointer():boolean
```

Returns true if a pointer exists in the scope of the FreeResources object and its parents.


--

##### hasResource
```typescript 
hasResource( id:string ):boolean
```

Returns true if a resource with the ID specified exists.

*Parameters*

- id: The ID of the resource to sought for.


--

##### inScope
```typescript 
inScope( id:string ):boolean
```

Returns true if the the ID provided is in the scope of the object.

*Parameters*

- id: The ID to evaluate if is in the scope.

```typescript 
inScope( pointer:Carbon.Pointer.Class ):boolean
```

Returns true if the the Pointer provided can be in the scope of the object.

*Parameters*

- pointer: Pointer to be evaluated if can be in the scope.


--

##### toJSON
```typescript 
toJSON():string
```

Converts the resources contained in the current `Carbon.FreeResources.Class` object to a JSON string.





## <a name="Module-Carbon-HTTP"/>Module Carbon/HTTP



#### <a name="Carbon-HTTP-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| Errors | [Carbon/HTTP/Errors](#Module-Carbon-HTTP-Errors) |
| Header | [Carbon/HTTP/Header](#Module-Carbon-HTTP-Header) |
| JSONParser | [Carbon/HTTP/JSONParser](#Module-Carbon-HTTP-JSONParser) |
| Method | [Carbon/HTTP/Method](#Module-Carbon-HTTP-Method) |
| Parser | [Carbon/HTTP/Parser](#Module-Carbon-HTTP-Parser) |
| Request | [Carbon/HTTP/Request](#Module-Carbon-HTTP-Request) |
| Response | [Carbon/HTTP/Response](#Module-Carbon-HTTP-Response) |
| StatusCode | [Carbon/HTTP/StatusCode](#Module-Carbon-HTTP-StatusCode) |
| StringParser | [Carbon/HTTP/StringParser](#Module-Carbon-HTTP-StringParser) |




## <a name="Module-Carbon-HTTP-Errors"/>Module Carbon/HTTP/Errors



#### <a name="Carbon-HTTP-Errors-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| BadGatewayError | [Carbon/HTTP/Errors/client/BadGatewayError](#Module-Carbon-HTTP-Errors-client-BadGatewayError) |
| BadRequestError | [Carbon/HTTP/Errors/client/BadRequestError](#Module-Carbon-HTTP-Errors-client-BadRequestError) |
| BadResponseError | [Carbon/HTTP/Errors/client/BadResponseError](#Module-Carbon-HTTP-Errors-client-BadResponseError) |
| ConflictError | [Carbon/HTTP/Errors/client/ConflictError](#Module-Carbon-HTTP-Errors-client-ConflictError) |
| Error | [Carbon/HTTP/Errors/HTTPError](#Module-Carbon-HTTP-Errors-HTTPError) |
| ForbiddenError | [Carbon/HTTP/Errors/client/ForbiddenError](#Module-Carbon-HTTP-Errors-client-ForbiddenError) |
| GatewayTimeoutError | [Carbon/HTTP/Errors/client/GatewayTimeoutError](#Module-Carbon-HTTP-Errors-client-GatewayTimeoutError) |
| HTTPVersionNotSupportedError | [Carbon/HTTP/Errors/client/HTTPVersionNotSupportedError](#Module-Carbon-HTTP-Errors-client-HTTPVersionNotSupportedError) |
| InternalServerErrorError | [Carbon/HTTP/Errors/client/InternalServerErrorError](#Module-Carbon-HTTP-Errors-client-InternalServerErrorError) |
| MethodNotAllowedError | [Carbon/HTTP/Errors/client/MethodNotAllowedError](#Module-Carbon-HTTP-Errors-client-MethodNotAllowedError) |
| NotAcceptableError | [Carbon/HTTP/Errors/client/NotAcceptableError](#Module-Carbon-HTTP-Errors-client-NotAcceptableError) |
| NotFoundError | [Carbon/HTTP/Errors/client/NotFoundError](#Module-Carbon-HTTP-Errors-client-NotFoundError) |
| NotImplementedError | [Carbon/HTTP/Errors/client/NotImplementedError](#Module-Carbon-HTTP-Errors-client-NotImplementedError) |
| PreconditionFailedError | [Carbon/HTTP/Errors/client/PreconditionFailedError](#Module-Carbon-HTTP-Errors-client-PreconditionFailedError) |
| PreconditionRequiredError | [Carbon/HTTP/Errors/client/PreconditionRequiredError](#Module-Carbon-HTTP-Errors-client-PreconditionRequiredError) |
| RequestEntityTooLargeError | [Carbon/HTTP/Errors/client/RequestEntityTooLargeError](#Module-Carbon-HTTP-Errors-client-RequestEntityTooLargeError) |
| RequestHeaderFieldsTooLargeError | [Carbon/HTTP/Errors/client/RequestHeaderFieldsTooLargeError](#Module-Carbon-HTTP-Errors-client-RequestHeaderFieldsTooLargeError) |
| RequestURITooLongError | [Carbon/HTTP/Errors/client/RequestURITooLongError](#Module-Carbon-HTTP-Errors-client-RequestURITooLongError) |
| ServiceUnavailableError | [Carbon/HTTP/Errors/client/ServiceUnavailableError](#Module-Carbon-HTTP-Errors-client-ServiceUnavailableError) |
| TooManyRequestsError | [Carbon/HTTP/Errors/client/TooManyRequestsError](#Module-Carbon-HTTP-Errors-client-TooManyRequestsError) |
| UnauthorizedError | [Carbon/HTTP/Errors/client/UnauthorizedError](#Module-Carbon-HTTP-Errors-client-UnauthorizedError) |
| UnknownError | [Carbon/HTTP/Errors/client/UnknownError](#Module-Carbon-HTTP-Errors-client-UnknownError) |
| UnsupportedMediaTypeError | [Carbon/HTTP/Errors/client/UnsupportedMediaTypeError](#Module-Carbon-HTTP-Errors-client-UnsupportedMediaTypeError) |


### <a name="Carbon-HTTP-Errors-Properties"/>Properties
```typescript 
static client:Array <Carbon.HTTP.Error.HTTPError> 
```

Array that contains all the error classes that represents the errors induced by the client.

--

```typescript 
static server:Array <Carbon.HTTP.Error.HTTPError> 
```

Array that contains all the error classes that represents the errors caused by the server.

--

```typescript 
static statusCodeMap:Map <number, Carbon.HTTP.Error.HTTPError> 
```

Map where all the HTTP Status Codes used in the SDK are assigned to their specific error class.






## <a name="Module-Carbon-HTTP-Errors-HTTPError"/>Module Carbon/HTTP/Errors/HTTPError







### <a name="Carbon-HTTP-Errors-HTTPError"/>Class Carbon.HTTP.Errors.HTTPError

**Extends:** [Carbon.Errors.AbstractError](#Carbon-Errors-AbstractError)

> Generic error class that defines any type of HTTP Error used in the SDK.


#### <a name="Carbon-HTTP-Errors-HTTPError-Constructor"/>Constructor
```typescript 
HTTPError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-HTTPError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
errors:Carbon.LDP.Error[] 
```


--

```typescript 
name:string 
```


--

```typescript 
requestID:string 
```


--

```typescript 
response:number 
```





#### <a name="Carbon-HTTP-Errors-HTTPError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-UnknownError"/>Module Carbon/HTTP/Errors/UnknownError







### <a name="Carbon-HTTP-Errors-UnknownError"/>Class Carbon.HTTP.Errors.UnknownError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class that defines any error that could not be identified.


#### <a name="Carbon-HTTP-Errors-UnknownError-Constructor"/>Constructor
```typescript 
UnknownError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-UnknownError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-UnknownError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-BadRequestError"/>Module Carbon/HTTP/Errors/client/BadRequestError







### <a name="Carbon-HTTP-Errors-BadRequestError"/>Class Carbon.HTTP.Errors.BadRequestError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that a malformed request has been sent.


#### <a name="Carbon-HTTP-Errors-BadRequestError-Constructor"/>Constructor
```typescript 
BadRequestError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-BadRequestError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-BadRequestError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-ConflictError"/>Module Carbon/HTTP/Errors/client/ConflictError







### <a name="Carbon-HTTP-Errors-ConflictError"/>Class Carbon.HTTP.Errors.ConflictError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the request could not be processed because of a conflict, such as an ID conflict.


#### <a name="Carbon-HTTP-Errors-ConflictError-Constructor"/>Constructor
```typescript 
ConflictError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-ConflictError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-ConflictError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-ForbiddenError"/>Module Carbon/HTTP/Errors/client/ForbiddenError







### <a name="Carbon-HTTP-Errors-ForbiddenError"/>Class Carbon.HTTP.Errors.ForbiddenError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the current user doesn't have permissions to fulfill the request.


#### <a name="Carbon-HTTP-Errors-ForbiddenError-Constructor"/>Constructor
```typescript 
ForbiddenError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-ForbiddenError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-ForbiddenError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-MethodNotAllowedError"/>Module Carbon/HTTP/Errors/client/MethodNotAllowedError







### <a name="Carbon-HTTP-Errors-MethodNotAllowedError"/>Class Carbon.HTTP.Errors.MethodNotAllowedError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the method used in the request is not allowed for that URI.


#### <a name="Carbon-HTTP-Errors-MethodNotAllowedError-Constructor"/>Constructor
```typescript 
MethodNotAllowedError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-MethodNotAllowedError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-MethodNotAllowedError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-NotAcceptableError"/>Module Carbon/HTTP/Errors/client/NotAcceptableError







### <a name="Carbon-HTTP-Errors-NotAcceptableError"/>Class Carbon.HTTP.Errors.NotAcceptableError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the server cannot respond with the data type specified by the accept header of the request.


#### <a name="Carbon-HTTP-Errors-NotAcceptableError-Constructor"/>Constructor
```typescript 
NotAcceptableError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-NotAcceptableError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-NotAcceptableError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-NotFoundError"/>Module Carbon/HTTP/Errors/client/NotFoundError







### <a name="Carbon-HTTP-Errors-NotFoundError"/>Class Carbon.HTTP.Errors.NotFoundError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the resource was not found.


#### <a name="Carbon-HTTP-Errors-NotFoundError-Constructor"/>Constructor
```typescript 
NotFoundError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-NotFoundError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-NotFoundError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-PreconditionFailedError"/>Module Carbon/HTTP/Errors/client/PreconditionFailedError







### <a name="Carbon-HTTP-Errors-PreconditionFailedError"/>Class Carbon.HTTP.Errors.PreconditionFailedError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the precondition header was resolved to false.


#### <a name="Carbon-HTTP-Errors-PreconditionFailedError-Constructor"/>Constructor
```typescript 
PreconditionFailedError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-PreconditionFailedError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-PreconditionFailedError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-PreconditionRequiredError"/>Module Carbon/HTTP/Errors/client/PreconditionRequiredError







### <a name="Carbon-HTTP-Errors-PreconditionRequiredError"/>Class Carbon.HTTP.Errors.PreconditionRequiredError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the request is missing a precondition header.


#### <a name="Carbon-HTTP-Errors-PreconditionRequiredError-Constructor"/>Constructor
```typescript 
PreconditionRequiredError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-PreconditionRequiredError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-PreconditionRequiredError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-RequestEntityTooLargeError"/>Module Carbon/HTTP/Errors/client/RequestEntityTooLargeError







### <a name="Carbon-HTTP-Errors-RequestEntityTooLargeError"/>Class Carbon.HTTP.Errors.RequestEntityTooLargeError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the request entity is larger than the server is able to process.


#### <a name="Carbon-HTTP-Errors-RequestEntityTooLargeError-Constructor"/>Constructor
```typescript 
RequestEntityTooLargeError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-RequestEntityTooLargeError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-RequestEntityTooLargeError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-RequestHeaderFieldsTooLargeError"/>Module Carbon/HTTP/Errors/client/RequestHeaderFieldsTooLargeError







### <a name="Carbon-HTTP-Errors-RequestHeaderFieldsTooLargeError"/>Class Carbon.HTTP.Errors.RequestHeaderFieldsTooLargeError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the server is not able to process the request because its header fields are too large.


#### <a name="Carbon-HTTP-Errors-RequestHeaderFieldsTooLargeError-Constructor"/>Constructor
```typescript 
RequestHeaderFieldsTooLargeError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-RequestHeaderFieldsTooLargeError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-RequestHeaderFieldsTooLargeError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-RequestURITooLongError"/>Module Carbon/HTTP/Errors/client/RequestURITooLongError







### <a name="Carbon-HTTP-Errors-RequestURITooLongError"/>Class Carbon.HTTP.Errors.RequestURITooLongError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the server is not able to process the request because the URI is too long.


#### <a name="Carbon-HTTP-Errors-RequestURITooLongError-Constructor"/>Constructor
```typescript 
RequestURITooLongError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-RequestURITooLongError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-RequestURITooLongError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-TooManyRequestsError"/>Module Carbon/HTTP/Errors/client/TooManyRequestsError







### <a name="Carbon-HTTP-Errors-TooManyRequestsError"/>Class Carbon.HTTP.Errors.TooManyRequestsError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the current user has sent too many request in a given amount of time.


#### <a name="Carbon-HTTP-Errors-TooManyRequestsError-Constructor"/>Constructor
```typescript 
TooManyRequestsError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-TooManyRequestsError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-TooManyRequestsError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-UnauthorizedError"/>Module Carbon/HTTP/Errors/client/UnauthorizedError







### <a name="Carbon-HTTP-Errors-UnauthorizedError"/>Class Carbon.HTTP.Errors.UnauthorizedError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that authentication is required or has failed.


#### <a name="Carbon-HTTP-Errors-UnauthorizedError-Constructor"/>Constructor
```typescript 
UnauthorizedError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-UnauthorizedError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-UnauthorizedError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-client-UnsupportedMediaTypeError"/>Module Carbon/HTTP/Errors/client/UnsupportedMediaTypeError







### <a name="Carbon-HTTP-Errors-UnsupportedMediaTypeError"/>Class Carbon.HTTP.Errors.UnsupportedMediaTypeError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the request has a media-type not supported by the server.


#### <a name="Carbon-HTTP-Errors-UnsupportedMediaTypeError-Constructor"/>Constructor
```typescript 
UnsupportedMediaTypeError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-UnsupportedMediaTypeError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-UnsupportedMediaTypeError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-server-BadGatewayError"/>Module Carbon/HTTP/Errors/server/BadGatewayError







### <a name="Carbon-HTTP-Errors-BadGatewayError"/>Class Carbon.HTTP.Errors.BadGatewayError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the server was acting as a gateway or proxy and received an invalid response from the upstream server.


#### <a name="Carbon-HTTP-Errors-BadGatewayError-Constructor"/>Constructor
```typescript 
BadGatewayError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-BadGatewayError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-BadGatewayError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-server-BadResponseError"/>Module Carbon/HTTP/Errors/server/BadResponseError







### <a name="Carbon-HTTP-Errors-BadResponseError"/>Class Carbon.HTTP.Errors.BadResponseError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the response obtained isn't the expected or can't be interpreted.


#### <a name="Carbon-HTTP-Errors-BadResponseError-Constructor"/>Constructor
```typescript 
BadResponseError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-BadResponseError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-BadResponseError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-server-GatewayTimeoutError"/>Module Carbon/HTTP/Errors/server/GatewayTimeoutError







### <a name="Carbon-HTTP-Errors-GatewayTimeoutError"/>Class Carbon.HTTP.Errors.GatewayTimeoutError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.


#### <a name="Carbon-HTTP-Errors-GatewayTimeoutError-Constructor"/>Constructor
```typescript 
GatewayTimeoutError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-GatewayTimeoutError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-GatewayTimeoutError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-server-HTTPVersionNotSupportedError"/>Module Carbon/HTTP/Errors/server/HTTPVersionNotSupportedError







### <a name="Carbon-HTTP-Errors-HTTPVersionNotSupportedError"/>Class Carbon.HTTP.Errors.HTTPVersionNotSupportedError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the server doesn't support the HTTP protocol version used in the request.


#### <a name="Carbon-HTTP-Errors-HTTPVersionNotSupportedError-Constructor"/>Constructor
```typescript 
HTTPVersionNotSupportedError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-HTTPVersionNotSupportedError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-HTTPVersionNotSupportedError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-server-InternalServerErrorError"/>Module Carbon/HTTP/Errors/server/InternalServerErrorError







### <a name="Carbon-HTTP-Errors-InternalServerErrorError"/>Class Carbon.HTTP.Errors.InternalServerErrorError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the server encountered an unexpected condition. This generic error is given when no other specific error is suitable.


#### <a name="Carbon-HTTP-Errors-InternalServerErrorError-Constructor"/>Constructor
```typescript 
InternalServerErrorError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-InternalServerErrorError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-InternalServerErrorError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-server-NotImplementedError"/>Module Carbon/HTTP/Errors/server/NotImplementedError







### <a name="Carbon-HTTP-Errors-NotImplementedError"/>Class Carbon.HTTP.Errors.NotImplementedError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the server doesn't have the ability to fulfill the request yet.


#### <a name="Carbon-HTTP-Errors-NotImplementedError-Constructor"/>Constructor
```typescript 
NotImplementedError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-NotImplementedError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-NotImplementedError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Errors-server-ServiceUnavailableError"/>Module Carbon/HTTP/Errors/server/ServiceUnavailableError







### <a name="Carbon-HTTP-Errors-ServiceUnavailableError"/>Class Carbon.HTTP.Errors.ServiceUnavailableError

**Extends:** [Carbon.Errors.HTTPError](#Carbon-Errors-HTTPError)

> Error class to indicate that the server is currently unavailable (because it's overloaded or down for maintenance).


#### <a name="Carbon-HTTP-Errors-ServiceUnavailableError-Constructor"/>Constructor
```typescript 
ServiceUnavailableError( message:string,  response:Carbon.HTTP.Response )
```


*Parameters*

- message
- response


#### <a name="Carbon-HTTP-Errors-ServiceUnavailableError-Properties"/>Properties
```typescript 
static statusCode:number 
```





```typescript 
name:string 
```





#### <a name="Carbon-HTTP-Errors-ServiceUnavailableError-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-Header"/>Module Carbon/HTTP/Header


**Default export:** [Carbon.HTTP.Header.Class](#Carbon-HTTP-Header-Class)





### <a name="Carbon-HTTP-Header-Class"/>Class Carbon.HTTP.Header.Class


> Class to manage the values in an HTTP header.


#### <a name="Carbon-HTTP-Header-Class-Constructor"/>Constructor
```typescript 
Class( values:Array <Carbon.HTTP.Header.Value> ):void
```


*Parameters*

- values

```typescript 
Class( value:string ):void
```


*Parameters*

- value


#### <a name="Carbon-HTTP-Header-Class-Properties"/>Properties

```typescript 
values:Array <Carbon.HTTP.Header.Value> 
```

Array that contains each value of the header.




#### <a name="Carbon-HTTP-Header-Class-Methods"/>Methods

##### toString
```typescript 
toString():void
```

string






### <a name="Carbon-HTTP-Header-Util"/>Class Carbon.HTTP.Header.Util


> Class with useful functions to manage headers.




#### <a name="Carbon-HTTP-Header-Util-Methods"/>Methods
##### parseHeaders
```typescript 
static parseHeaders( headersString:string ):Map <string, Carbon.HTTP.Header.Class>
```

Returns a Map object which relates all header names with a `Carbon.HTTP.Header.Class` object containing their values.

*Parameters*

- headersString







### <a name="Carbon-HTTP-Header-Value"/>Class Carbon.HTTP.Header.Value


> Wrapper class for a value of an HTTP header.


#### <a name="Carbon-HTTP-Header-Value-Constructor"/>Constructor
```typescript 
Value( value:string )
```


*Parameters*

- value



#### <a name="Carbon-HTTP-Header-Value-Methods"/>Methods

##### toString
```typescript 
toString():string
```







## <a name="Module-Carbon-HTTP-JSONLDParser"/>Module Carbon/HTTP/JSONLDParser


**Default export:** [Carbon.HTTP.JSONLDParser.Class](#Carbon-HTTP-JSONLDParser-Class)





### <a name="Carbon-HTTP-JSONLDParser-Class"/>Class Carbon.HTTP.JSONLDParser.Class

**Implements:** [Carbon.HTTP.Parser.Class](#Carbon-HTTP-Parser-Class)&lt;Object[]&gt;

> Class to parse strings to valid JSONLD objects.




#### <a name="Carbon-HTTP-JSONLDParser-Class-Methods"/>Methods

##### parse
```typescript 
parse( body:string ):Promise<Object[]>
```

Parse the string provided using the `Carbon.JSONLD.Process.Class#expand()` method.

*Parameters*

- body: A JSON-LD string to parse.






## <a name="Module-Carbon-HTTP-JSONParser"/>Module Carbon/HTTP/JSONParser


**Default export:** [Carbon.HTTP.JSONParser.Class](#Carbon-HTTP-JSONParser-Class)





### <a name="Carbon-HTTP-JSONParser-Class"/>Class Carbon.HTTP.JSONParser.Class

**Implements:** [Carbon.HTTP.Parser.Class](#Carbon-HTTP-Parser-Class)&lt;Object&gt;

> Wrapper class for the native `JSON.parse()` function using the `Promise` pattern.




#### <a name="Carbon-HTTP-JSONParser-Class-Methods"/>Methods

##### parse
```typescript 
parse( body:string ):Promise <Object>
```


*Parameters*

- body: A JSON string to parse.






## <a name="Module-Carbon-HTTP-Method"/>Module Carbon/HTTP/Method




### <a name="Carbon-HTTP-Method-Enums"/>Enums

#### <a name"Method />Method
> Enum with the HTTP/1.1 methods.

| Name | Description | 
| --- | --- |
| OPTIONS | Enum that identifies the OPTIONS HTTP/1.1 method, which allows the client to determine the options and/or requirements associated with a resource, or the capabilities of a server, without implying a resource action or initiating a resource retrieval. |
| HEAD | Enum that identifies the HEAD HTTP/1.1 method, which returns only the headers of a GET HTTP request. |
| GET | Enum that identifies the GET HTTP/1.1 method, which returns whatever information is identified by the request URI. |
| POST | Enum that identifies the POST HTTP/1.1 method, which requests to the server to create a new entity. |
| PUT | Enum that identifies the PUT HTTP/1.1 method, which allows you to replace an entirely entity, or to send a signal to a resource. |
| PATCH | Enum that identifies the PATCH HTTP/1.1 method, which allows you to update specified fields of an entity. |
| DELETE | Enum that identifies the DELETE HTTP/1.1 method, which allows you to request the deletion of a resource identified by the request URI. |



## <a name="Module-Carbon-HTTP-Parser"/>Module Carbon/HTTP/Parser


**Default export:** [Carbon.Auth.ACE.Class](#Carbon-Auth-ACE-Class)





### <a name="Carbon-Auth-ACE-Class"/>Interface Carbon.Auth.ACE.Class


> Interface that represents an Access Control Entry (ACE) of an Access Control List (ACL).


#### <a name="Carbon-Auth-ACE-Class-Methods"/>Methods
##### parse
```typescript 
parse( body:string ):Promise<T>
```

Method that parse the provided string to an specified T element.

*Parameters*

- body: The string to parse.





## <a name="Module-Carbon-HTTP-Request"/>Module Carbon/HTTP/Request







### <a name="Carbon-HTTP-Request-ContainerRetrievalPreferences"/>Interface Carbon.HTTP.Request.ContainerRetrievalPreferences


> Object used at `Carbon.HTTP.Request.Util.setContainerRetrievalPreferences()` method, which specifies the behaviour of the of the requested document as a ldp:container.

#### <a name="Carbon-HTTP-Request-ContainerRetrievalPreferences-Properties"/>Properties
```typescript 
include?:string[] 
```

Prefer URIs that indicates some specific information should be returned in the request's response.

--

```typescript 
omit?:string[] 
```

Prefer URIs that indicates some specific information should NOT be included in the request's response.





### <a name="Carbon-HTTP-Request-Options"/>Interface Carbon.HTTP.Request.Options


> Customizable options that can change the behaviour of the request.

#### <a name="Carbon-HTTP-Request-Options-Properties"/>Properties
```typescript 
headers?:Map<string, Carbon.HTTP.Header.Class> 
```

Map that contains the references to the headers to include in the request.

--

```typescript 
sendCredentialsOnCORS?:boolean 
```

Flag that enables Cross-Origin Resource Sharing (CORS).





### <a name="Carbon-HTTP-Request-Service"/>Class Carbon.HTTP.Request.Service


> Class with functions to easily manage HTTP requests.




#### <a name="Carbon-HTTP-Request-Service-Methods"/>Methods
##### delete
```typescript 
static delete( url:string,  body:string,  options?:object ):Promise<Carbon.HTTP.Response>
```

Simple delete request.

*Parameters*

- url
- body
- options

```typescript 
static delete( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response>
```

Delete request with specified response parser.

*Parameters*

- url
- options
- parser

```typescript 
static delete( url:string,  options?:object ):Promise<Carbon.HTTP.Response>
```

Simple delete request.

*Parameters*

- url
- options

```typescript 
static delete( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response>
```

Delete request with specified response parser.

*Parameters*

- url
- options
- parser


--

##### get
```typescript 
static get( url:string,  options?:object ):Promise<Carbon.HTTP.Response>
```

Simple get request.

*Parameters*

- url
- options

```typescript 
static get( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<[Object, Carbon.HTTP.Response]>
```

Get request with specified response parser.

*Parameters*

- url
- options
- parser


--

##### head
```typescript 
static head( url:string,  options?:object ):Promise<Carbon.HTTP.Response>
```


*Parameters*

- url
- options


--

##### options
```typescript 
static options( url:string,  options?:object ):Promise<Carbon.HTTP.Response>
```


*Parameters*

- url
- options


--

##### patch
```typescript 
static patch( url:string,  body:string,  options?:object ):Promise<Carbon.HTTP.Response>
```

Simple patch request.

*Parameters*

- url
- body
- options

```typescript 
static patch( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response>
```

Patch request with specified response parser.

*Parameters*

- url
- options
- parser


--

##### post
```typescript 
static post( url:string,  body:string,  options?:object ):Promise<Carbon.HTTP.Response>
```

Simple post request.

*Parameters*

- url
- body
- options

```typescript 
static post( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response>
```

Post request with specified response parser.

*Parameters*

- url
- options
- parser


--

##### put
```typescript 
static put( url:string,  body:string,  options?:object ):Promise<Carbon.HTTP.Response>
```

Simple put request.

*Parameters*

- url
- body
- options

```typescript 
static put( url:string,  options?:object,  parser?:Carbon.HTTP.Parser<T> ):Promise<Carbon.HTTP.Response>
```

Put request with specified response parser.

*Parameters*

- url
- options
- parser


--

##### send
```typescript 
static send( url:string,  body:string,  options:object ):Promise<Carbon.HTTP.Response>
```

Generic send method, to be used by the others methods in the class.

*Parameters*

- url
- body
- options







### <a name="Carbon-HTTP-Request-Util"/>Class Carbon.HTTP.Request.Util


> Class with useful functions to manage the options object of a request.




#### <a name="Carbon-HTTP-Request-Util-Methods"/>Methods
##### getHeader
```typescript 
static getHeader( headerName:string,  requestOptions:Object,  initialize?:boolean ):Carbon.HTTP.Header.Class
```

Returns the header object of a header-name inside an options object request. Returns `undefined` if the header doesn't exists. If `initialize` flag is provided with true, an empty header will be created even if it already exits.

*Parameters*

- headerName
- requestOptions
- initialize


--

##### isOptions
```typescript 
static isOptions( object:Object ):boolean
```

Returns `true` if the object provided has at least a property of a `Carbon.HTTP.Request.Option` object.

*Parameters*

- object: The object to evaluate.


--

##### setAcceptHeader
```typescript 
static setAcceptHeader( accept:string,  requestOptions:Object ):Object
```

Set an Accept header in an options object request.

*Parameters*

- accept
- requestOptions


--

##### setContainerRetrievalPreferences
```typescript 
static setContainerRetrievalPreferences( preference:Carbon.HTTP.Request.ContainerRetrievalPreferences,  requestOptions:Carbon.HTTP.Request.Options,  returnRepresentation?:boolean ):Object
```

Set a Prefer header with `return=representation` in an options object request.

*Parameters*

- preference
- requestOptions
- returnRepresentation: If set to true, add `return=representation;` before include and/or omit. Default value is set to `true`.


--

##### setContentTypeHeader
```typescript 
static setContentTypeHeader( contentType:string,  requestOptions:Object ):Object
```

Set a Content-Type header in an options object request.

*Parameters*

- contentType
- requestOptions


--

##### setIfMatchHeader
```typescript 
static setIfMatchHeader( etag:string,  requestOptions:Object ):Object
```

Set an If-Match header in an options object request.

*Parameters*

- etag
- requestOptions


--

##### setPreferredInteractionModel
```typescript 
static setPreferredInteractionModel( interactionModelURI:string,  requestOptions:Object ):Object
```

Set a Prefer header with `rel=interaction-model` in an options object request.

*Parameters*

- interactionModelURI
- requestOptions


--

##### setSlug
```typescript 
static setSlug( slug:string,  requestOptions:Object ):Object
```

Set a Slug header in an options object request.

*Parameters*

- slug
- requestOptions







## <a name="Module-Carbon-HTTP-Response"/>Module Carbon/HTTP/Response


**Default export:** [Carbon.HTTP.Response.Class](#Carbon-HTTP-Response-Class)





### <a name="Carbon-HTTP-Response-Class"/>Class Carbon.HTTP.Response.Class


> Class that represents an HTTP Response.


#### <a name="Carbon-HTTP-Response-Class-Constructor"/>Constructor
```typescript 
Class( request:XMLHttpRequest ):void
```

Signature that only works in a web browser.

*Parameters*

- request

```typescript 
Class( request:ClientRequest,  data:string,  response:IncomingMessage ):void
```

Signature that only works in Node.js.

*Parameters*

- request
- data
- response


#### <a name="Carbon-HTTP-Response-Class-Properties"/>Properties

```typescript 
data:string 
```

The raw body returned by the request.

--

```typescript 
headers:Map<string, Carbon.HTTP.Header.Class> 
```

A map object containing the headers returned by the request.

--

```typescript 
request:XMLHttpRequest | ClientRequest 
```

The XMLHttpRequest object that was provided in the constructor when working in a Browser, or the ClientRequest object when working with Node.js.

--

```typescript 
status:number 
```

The status code returned by the request.




#### <a name="Carbon-HTTP-Response-Class-Methods"/>Methods

##### getHeader
```typescript 
getHeader( name:string ):Carbon.HTTP.Header.Class
```

Return the Header object referred by the name specified.

*Parameters*

- name






### <a name="Carbon-HTTP-Response-Util"/>Class Carbon.HTTP.Response.Util


> Class with useful functions to manage `Carbon.HTTP.Response.Class` objects.




#### <a name="Carbon-HTTP-Response-Util-Methods"/>Methods
##### getETag
```typescript 
static getETag( response:Carbon.HTTP.Response.Class ):string
```

Return the ETag header of a `Carbon.HTTP.Response.Class` object. Returns null if no ETag exists.

*Parameters*

- response







## <a name="Module-Carbon-HTTP-StatusCode"/>Module Carbon/HTTP/StatusCode




### <a name="Carbon-HTTP-StatusCode-Enums"/>Enums

#### <a name"Method />Method
> Enum with the HTTP/1.1 status codes.

| Name | Description | 
| --- | --- |
| CONTINUE | Enum that identifies the HTTP/1.1 100 status code. |
| OK | Enum that identifies the HTTP/1.1 200 status code. |
| CREATED | Enum that identifies the HTTP/1.1 201 status code. |
| ACCEPTED | Enum that identifies the HTTP/1.1 202 status code. |
| NON_AUTHORITATIVE_INFORMATION | Enum that identifies the HTTP/1.1 203 status code. |
| NO_CONTENT | Enum that identifies the HTTP/1.1 204 status code. |
| RESET_CONTENT | Enum that identifies the HTTP/1.1 205 status code. |
| PARTIAL_CONTENT | Enum that identifies the HTTP/1.1 206 status code. |
| MULTIPLE_CHOICES | Enum that identifies the HTTP/1.1 300 status code. |
| MOVED_PERMANENTLY | Enum that identifies the HTTP/1.1 301 status code. |
| FOUND | Enum that identifies the HTTP/1.1 302 status code. |
| SEE_OTHER | Enum that identifies the HTTP/1.1 303 status code. |
| NOT_MODIFIED | Enum that identifies the HTTP/1.1 304 status code. |
| USE_PROXY | Enum that identifies the HTTP/1.1 305 status code. |
| TEMPORARY_REDIRECT | Enum that identifies the HTTP/1.1 307 status code. |
| BAD_REQUEST | Enum that identifies the HTTP/1.1 400 status code. |
| UNAUTHORIZED | Enum that identifies the HTTP/1.1 401 status code. |
| PAYMENT_REQUIRED | Enum that identifies the HTTP/1.1 402 status code. |
| FORBIDDEN | Enum that identifies the HTTP/1.1 403 status code. |
| NOT_FOUND | Enum that identifies the HTTP/1.1 404 status code. |
| METHOD_NOT_ALLOWED | Enum that identifies the HTTP/1.1 405 status code. |
| NOT_ACCEPTABLE | Enum that identifies the HTTP/1.1 406 status code. |
| PROXY_AUTHENTICATION_REQUIRED | Enum that identifies the HTTP/1.1 407 status code. |
| REQUEST_TIME_OUT | Enum that identifies the HTTP/1.1 408 status code. |
| CONFLICT | Enum that identifies the HTTP/1.1 409 status code. |
| GONE | Enum that identifies the HTTP/1.1 410 status code. |
| LENGTH_REQUIRED | Enum that identifies the HTTP/1.1 411 status code. |
| PRECONDITION_FAILED | Enum that identifies the HTTP/1.1 412 status code. |
| REQUEST_ENTITY_TOO_LARGE | Enum that identifies the HTTP/1.1 413 status code. |
| REQUEST_URI_TOO_LARGE | Enum that identifies the HTTP/1.1 414 status code. |
| UNSUPPORTED_MEDIA_TYPE | Enum that identifies the HTTP/1.1 415 status code. |
| REQUESTED_RANGE_NOT_SATISFIABLE | Enum that identifies the HTTP/1.1 416 status code. |
| EXPECTATION_FAILED | Enum that identifies the HTTP/1.1 417 status code. |
| INTERNAL_SERVER_ERROR | Enum that identifies the HTTP/1.1 500 status code. |
| NOT_IMPLEMENTED | Enum that identifies the HTTP/1.1 501 status code. |
| BAD_GATEWAY | Enum that identifies the HTTP/1.1 502 status code. |
| SERVICE_UNAVAILABLE | Enum that identifies the HTTP/1.1 503 status code. |
| GATEWAY_TIME_OUT | Enum that identifies the HTTP/1.1 504 status code. |
| HTTP_VERSION_NOT_SUPPORTED | Enum that identifies the HTTP/1.1 505 status code. |



## <a name="Module-Carbon-HTTP-StringParser"/>Module Carbon/HTTP/StringParser


**Default export:** [Carbon.HTTP.StringParser.Class](#Carbon-HTTP-StringParser-Class)





### <a name="Carbon-HTTP-StringParser-Class"/>Class Carbon.HTTP.StringParser.Class

**Implements:** [Carbon.HTTP.Parser.Class](#Carbon-HTTP-Parser-Class)&lt;string&gt;

> Parses a `Carbon.HTTP.Response.Class` and returns a string.




#### <a name="Carbon-HTTP-StringParser-Class-Methods"/>Methods

##### parse
```typescript 
parse( body:Carbon.HTTP.Response.Class ):Promise<string>
```

Gets a string and returns a Promise with the same string.

*Parameters*

- body






## <a name="Module-Carbon-JSONLD"/>Module Carbon/JSONLD



#### <a name="Carbon-JSONLD-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| Converter | [Carbon/JSONLD/Converter](#Module-Carbon-JSONLD-Converter) |
| Parser | [Carbon/JSONLD/Parser](#Module-Carbon-JSONLD-Parser) |
| Processor | [Carbon/JSONLD/Processor](#Module-Carbon-JSONLD-Processor) |




## <a name="Module-Carbon-JSONLD-Converter"/>Module Carbon/JSONLD/Converter


**Default export:** [Carbon.JSONLD.Converter.Class](#Carbon-JSONLD-Converter-Class)





### <a name="Carbon-JSONLD-Converter-Class"/>Class Carbon.JSONLD.Converter.Class


> Class that have methods for convert expanded JSON-LD objects to compacted Carbon SDK Resources and vice versa.


#### <a name="Carbon-JSONLD-Converter-Class-Constructor"/>Constructor
```typescript 
Class( literalSerializers?:Map<string, Carbon.RDF.Literal.Serializer> )
```


*Parameters*

- literalSerializers: A Map object with the data type serializers that the converter will only be able to handle.


#### <a name="Carbon-JSONLD-Converter-Class-Properties"/>Properties

```typescript 
literalSerializers:Map<string, Carbon.RDF.Literal.Serializer> 
```

A Map object with data-type/serializer pairs for stringify the data of a SDK Resource when expanding it.




#### <a name="Carbon-JSONLD-Converter-Class-Methods"/>Methods

##### compact
```typescript 
compact( expandedObject:Object,  targetObject:Object,  digestedSchema:Carbon.ObjectSchema.DigestedObjectSchema,  pointerLibrary:Carbon.Pointer.Library ):Object
```

Assign the data of the expanded JSON-LD object, to the target object in a friendly mode, ie. without the JSON-LD Syntax Tokens and parsed values, in accordance to the schema provided.

*Parameters*

- expandedObject: The JSON-LD object to compact.
- targetObject: The target object where will be added the data of the expanded object.
- digestedSchema: The schema that describes how compact the expanded object.
- pointerLibrary: An object from where one can obtain pointers to SDK Resources.


--

##### expand
```typescript 
expand( compactedObject:Object,  digestedSchema:Carbon.ObjectSchema.DigestedObjectSchema ):Object
```

Creates a expanded JSON-LD object from the compacted object in accordance to the schema provided.

*Parameters*

- compactedObject: The compacted object to generate its expanded JSON-LD object.
- digestedSchema: The schema that describes how construct the expanded object.






## <a name="Module-Carbon-JSONLD-Processor"/>Module Carbon/JSONLD/Processor


**Default export:** [Carbon.JSONLD.Processor.Class](#Carbon-JSONLD-Processor-Class)





### <a name="Carbon-JSONLD-Processor-Class"/>Class Carbon.JSONLD.Processor.Class


> Class that contains methods that can process JSON-LD objects.




#### <a name="Carbon-JSONLD-Processor-Class-Methods"/>Methods
##### expand
```typescript 
static expand( input:Object ):Promise<Array<Object>>
```

Static method that expand a compacted JSON-LD object.

*Parameters*

- input: The compacted JSON-LD object to expand.







## <a name="Module-Carbon-LDP"/>Module Carbon/LDP



#### <a name="Carbon-LDP-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| AddMemberAction | [Carbon/LDP/AddMemberAction](#Module-Carbon-LDP-AddMemberAction) |
| DirectContainer | [Carbon/LDP/DirectContainer](#Module-Carbon-LDP-DirectContainer) |
| Error | [Carbon/LDP/Error](#Module-Carbon-LDP-Error) |
| ErrorResponse | [Carbon/LDP/ErrorResponse](#Module-Carbon-LDP-ErrorResponse) |
| IndirectContainer | [Carbon/LDP/IndirectContainer](#Module-Carbon-LDP-IndirectContainer) |
| RemoveMemberAction | [Carbon/LDP/RemoveMemberAction](#Module-Carbon-LDP-RemoveMemberAction) |
| ResourceMetadata | [Carbon/LDP/ResourceMetadata](#Module-Carbon-LDP-ResourceMetadata) |
| ResponseMetadata | [Carbon/LDP/ResponseMetadata](#Module-Carbon-LDP-ResponseMetadata) |




## <a name="Module-Carbon-LDP-AddMemberAction"/>Module Carbon/LDP/AddMemberAction


**Default export:** [Carbon.LDP.AddMemberAction.Class](#Carbon-LDP-AddMemberAction-Class)



### <a name="Carbon-LDP-AddMemberAction-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-LDP-AddMemberAction-Class"/>Interface Carbon.LDP.AddMemberAction.Class

**Extends:** [Carbon.Fragment.Class](#Carbon-Fragment-Class)

> Interface that represents an object to be sent in a request that add members to a container.

#### <a name="Carbon-LDP-AddMemberAction-Class-Properties"/>Properties
```typescript 
targetMembers:Carbon.Pointer.Class[] 
```

Array with the members to be added to the container.





### <a name="Carbon-LDP-AddMemberAction-Factory"/>Class Carbon.LDP.AddMemberAction.Factory


> Factory class for `Carbon.LDP.AddMemberAction.Class` objects.




#### <a name="Carbon-LDP-AddMemberAction-Factory-Methods"/>Methods
##### createDocument
```typescript 
static createDocument( targetMembers:Carbon.Pointer.Class[] ):Carbon.Document.Class
```

Creates and returns a `Carbon.Document.Class` object with a `Carbon.LDP.AddMemberAction.Class` fragment for the specified targetMembers.

*Parameters*

- targetMembers: The target members to add in a `addMember` request.


--

##### hasClassProperties
```typescript 
static hasClassProperties( resource:Carbon.RDF.Node.Class ):boolean
```

Returns true if the object has the properties of a `Carbon.LDP.AddMemberAction.Class` object.

*Parameters*

- resource







## <a name="Module-Carbon-LDP-DirectContainer"/>Module Carbon/LDP/DirectContainer


**Default export:** [Carbon.LDP.DirectContainer.Class](#Carbon-LDP-DirectContainer-Class)



### <a name="Carbon-LDP-DirectContainer-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```







### <a name="Carbon-LDP-DirectContainer-Class"/>Interface Carbon.LDP.DirectContainer.Class

**Extends:** [Carbon.Document.Class](#Carbon-Document-Class)

> Interface that represents an `ldp:DirectContainer`.

#### <a name="Carbon-LDP-DirectContainer-Class-Properties"/>Properties
```typescript 
membershipResource:Carbon.Pointer.Class 
```

Pointer that references the document that the direct container belongs to.





### <a name="Carbon-DirectContainer-Factory"/>Class Carbon.DirectContainer.Factory


> Factory class for `Carbon.LDP.DirectContainer.Class` objects.




#### <a name="Carbon-DirectContainer-Factory-Methods"/>Methods
##### create
```typescript 
static create( membershipResource:Carbon.Pointer.Class,  hasMemberRelation:string | Carbon.Pointer.Class,  isMemberOfRelation?:string | Carbon.Pointer.Class ):Carbon.LDP.DirectContainer.Class
```

Creates a `Carbon.LDP.DirectContainer.Class` object with the parameters specified.

*Parameters*

- membershipResource
- hasMemberRelation
- isMemberOfRelation


--

##### createFrom
```typescript 
static createFrom<T extends Object>( object:T,  membershipResource:Carbon.Pointer.Class,  hasMemberRelation:string | Carbon.Pointer.Class,  isMemberOfRelation?:string | Carbon.Pointer.Class ):T & Carbon.LDP.DirectContainer.Class
```

Creates a `Carbon.LDP.DirectContainer.Class` object with the object provided and the parameters specified.

*Parameters*

- object
- membershipResource
- hasMemberRelation
- isMemberOfRelation


--

##### hasClassProperties
```typescript 
static hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties of a `Carbon.LDP.DirectContainer.Class` object.

*Parameters*

- resource: Object to evaluate.


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.LDP.DirectContainer.Class` object.

*Parameters*

- object: Object to evaluate.







## <a name="Module-Carbon-LDP-Error"/>Module Carbon/LDP/Error


**Default export:** [Carbon.LDP.Error.Class](#Carbon-LDP-Error-Class)



### <a name="Carbon-LDP-Error-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-LDP-Error-Class"/>Interface Carbon.LDP.Error.Class

**Extends:** [Carbon.Resource.Class](#Carbon-Resource-Class)

> Interface that represents an error occurred in the server.

#### <a name="Carbon-LDP-Error-Class-Properties"/>Properties
```typescript 
carbonCode:string 
```

An specific code that indicates the type of carbon error the current object is.

--

```typescript 
message:string 
```

Message that explains the error occurred in the server.





## <a name="Module-Carbon-LDP-ErrorResponse"/>Module Carbon/LDP/ErrorResponse


**Default export:** [Carbon.LDP.ErrorResponse.Class](#Carbon-LDP-ErrorResponse-Class)



### <a name="Carbon-LDP-ErrorResponse-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-LDP-ErrorResponse-Class"/>Interface Carbon.LDP.ErrorResponse.Class

**Extends:** [Carbon.Resource.Class](#Carbon-Resource-Class)

> Interface that its used to represents part of an error (or multiple of them) thrown by the server.

#### <a name="Carbon-LDP-ErrorResponse-Class-Properties"/>Properties
```typescript 
errors:Carbon.LDP.Error.Class[] 
```

Array that list the error occurred in the server.

--

```typescript 
requestID:string 
```

An ID that identifies the request which cause the error.

--

```typescript 
statusCode:number 
```

The HTTP status code that represents all the errors occurred.





### <a name="Carbon-LDP-ErrorResponse-Parser"/>Class Carbon.LDP.ErrorResponse.Parser

**Implements:** [Carbon.HTTP.Parser.Class](#Carbon-HTTP-Parser-Class)&lt;[Carbon.LDP.ErrorResponse.Class](#Carbon-LDP-ErrorResponse-Class)&gt;

> Parser class for `Carbon.LDP.ErrorResponse.Class` objects.




#### <a name="Carbon-LDP-ErrorResponse-Parser-Methods"/>Methods
##### parse
```typescript 
static parse( data:string,  object:Object ):Promise<Carbon.LDP.ErrorResponse.Class>
```

Parse the string data provided and create an `Carbon.LDP.ResponseError.Class` object.

*Parameters*

- data: The json-ld string, which represents an error response from a Carbon server.
- object: The object to use as a base when parsing the ErrorResponse object







### <a name="Carbon-LDP-ErrorResponse-Util"/>Class Carbon.LDP.ErrorResponse.Util


> Useful functions for managing `Carbon.LDP.ErrorResponse.Class` objects.




#### <a name="Carbon-LDP-ErrorResponse-Util-Methods"/>Methods
##### getMessage
```typescript 
static getMessage( errorResponse:Carbon.LDP.ErrorResponse.Class ):string
```

Returns a string with the message of all the errors in the ErrorResponse.

*Parameters*

- errorResponse: The ErrorResponse object to obtain the message from.







## <a name="Module-Carbon-LDP-IndirectContainer"/>Module Carbon/LDP/IndirectContainer


**Default export:** [Carbon.LDP.IndirectContainer.Class](#Carbon-LDP-IndirectContainer-Class)



### <a name="Carbon-LDP-IndirectContainer-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```







### <a name="Carbon-LDP-IndirectContainer-Class"/>Interface Carbon.LDP.IndirectContainer.Class

**Extends:** [Carbon.DirectContainer.Class](#Carbon-DirectContainer-Class)

> Interface that represents an `ldp:IndirectContainer`.

#### <a name="Carbon-LDP-IndirectContainer-Class-Properties"/>Properties
```typescript 
insertedContentRelation:Carbon.Pointer.Class 
```

Pointer that refers the inserted content relation for the indirect container.





### <a name="Carbon-IndirectContainer-Factory"/>Class Carbon.IndirectContainer.Factory


> Factory class for `Carbon.LDP.IndirectContainer.Class` objects.




#### <a name="Carbon-IndirectContainer-Factory-Methods"/>Methods
##### hasClassProperties
```typescript 
static hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties of a `Carbon.LDP.IndirectContainer.Class` object.

*Parameters*

- resource







## <a name="Module-Carbon-LDP-PersistedBlankNode"/>Module Carbon/LDP/PersistedBlankNode


**Default export:** [Carbon.PersistedBlankNode.Class](#Carbon-PersistedBlankNode-Class)





### <a name="Carbon-PersistedBlankNode-Class"/>Interface Carbon.PersistedBlankNode.Class

**Extends:** [Carbon.PersistedFragment.Class](#Carbon-PersistedFragment-Class)

> Interface that represents a persisted blank node of a persisted document.

#### <a name="Carbon-PersistedBlankNode-Class-Properties"/>Properties
```typescript 
bNodeIdentifier:string 
```

A UUID identifier for the blank node.





## <a name="Module-Carbon-LDP-RemoveMemberAction"/>Module Carbon/LDP/RemoveMemberAction


**Default export:** [Carbon.LDP.RemoveMemberAction.Class](#Carbon-LDP-RemoveMemberAction-Class)



### <a name="Carbon-LDP-RemoveMemberAction-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-LDP-RemoveMemberAction-Class"/>Interface Carbon.LDP.RemoveMemberAction.Class

**Extends:** [Carbon.Fragment.Class](#Carbon-Fragment-Class)

> Interface that represents an object to be sent in a request that removes specific members to a container.

#### <a name="Carbon-LDP-RemoveMemberAction-Class-Properties"/>Properties
```typescript 
targetMembers:Carbon.Pointer.Class[] 
```

Array with the members to be removed from the container.





### <a name="Carbon-LDP-RemoveMemberAction-Factory"/>Class Carbon.LDP.RemoveMemberAction.Factory


> Factory class for `Carbon.LDP.RemoveMemberAction.Class` objects.




#### <a name="Carbon-LDP-RemoveMemberAction-Factory-Methods"/>Methods
##### createDocument
```typescript 
static createDocument( targetMembers:Carbon.Pointer.Class ):Carbon.Document.Class
```

Creates and returns a `Carbon.Document.Class` object with a `Carbon.LDP.RemoveMemberAction.Class` fragment for the specified targetMembers.

*Parameters*

- targetMembers: The target members of the remove action.


--

##### hasClassProperties
```typescript 
static hasClassProperties( resource:Carbon.RDF.Node.Class ):boolean
```

Returns true if the object has the properties of a `Carbon.LDP.RemoveMemberAction.Class` object.

*Parameters*

- resource







## <a name="Module-Carbon-LDP-ResourceMetadata"/>Module Carbon/LDP/ResourceMetadata


**Default export:** [Carbon.LDP.ResourceMetadata.Class](#Carbon-LDP-ResourceMetadata-Class)



### <a name="Carbon-LDP-ResourceMetadata-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-LDP-ResourceMetadata-Class"/>Interface Carbon.LDP.ResourceMetadata.Class

**Extends:** [Carbon.LDP.VolatileResource.Class](#Carbon-LDP-VolatileResource-Class)

> Interface that represents a free node resource that contains dynamic information about an specific resource.

#### <a name="Carbon-LDP-ResourceMetadata-Class-Properties"/>Properties
```typescript 
eTag:string 
```

The ETag of the resource the metadata refers to.

--

```typescript 
resource:Carbon.Pointer.Class 
```

Reference to the resource the metadata information refers to.





### <a name="Carbon-LDP-ResourceMetadata-Factory"/>Class Carbon.LDP.ResourceMetadata.Factory


> Factory class for `Carbon.LDP.ResourceMetadata.Class` objects.




#### <a name="Carbon-LDP-ResourceMetadata-Factory-Methods"/>Methods
##### hasClassProperties
```typescript 
static hasClassProperties( object:Object ):boolean
```

Return true if the object provided has the properties of a `Carbon.LDP.ResourceMetadata.Class` object.

*Parameters*

- object: Object to check.


--

##### hasRDFClass
```typescript 
static hasRDFClass( object:Object ):boolean
```

Return true if the object provided have the RDF_CLASS of a ResourceMetadata, either if it's a Carbon Resource or an RDF object.

*Parameters*

- object: Object to check.


--

##### is
```typescript 
static is( object:Object ):boolean
```

Return true if the object provided is considered a `Carbon.LDP.ResourceMetadata.Class` object.

*Parameters*

- object: Object to check.







## <a name="Module-Carbon-LDP-ResponseMetadata"/>Module Carbon/LDP/ResponseMetadata


**Default export:** [Carbon.LDP.ResponseMetadata.Class](#Carbon-LDP-ResponseMetadata-Class)



### <a name="Carbon-LDP-ResponseMetadata-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-LDP-ResponseMetadata-Class"/>Interface Carbon.LDP.ResponseMetadata.Class

**Extends:** [Carbon.LDP.VolatileResource.Class](#Carbon-LDP-VolatileResource-Class)

> Interface that represents the main resource of a set of metadata resources, which references everyone resource related to an specific dynamic response of tha server.

#### <a name="Carbon-LDP-ResponseMetadata-Class-Properties"/>Properties
```typescript 
resourcesMetadata:Carbon.LDP.ResourceMetadata.Class[] 
```

An array with all the metadata resources of the dynamic response.





### <a name="Carbon-LDP-ResponseMetadata-Factory"/>Class Carbon.LDP.ResponseMetadata.Factory


> Factory class for `Carbon.LDP.ResponseMetadata.Class` objects.




#### <a name="Carbon-LDP-ResponseMetadata-Factory-Methods"/>Methods
##### hasClassProperties
```typescript 
static hasClassProperties( object:Object ):boolean
```

Return true if the object provided has the properties of a `Carbon.LDP.ResponseMetadata.Class` object.

*Parameters*

- object: Object to check.


--

##### hasRDFClass
```typescript 
static hasRDFClass( object:Object ):boolean
```

Return true if the object provided have the RDF_CLASS of a ResponseMetadata, either if it's a Carbon Resource or an RDF object.

*Parameters*

- object: Object to check.


--

##### is
```typescript 
static is( object:Object ):boolean
```

Return true if the object provided is considered a `Carbon.LDP.ResponseMetadata.Class` object.

*Parameters*

- object: Object to check







## <a name="Module-Carbon-LDP-VolatileResource"/>Module Carbon/LDP/VolatileResource


**Default export:** [Carbon.LDP.VolatileResource.Class](#Carbon-LDP-VolatileResource-Class)



### <a name="Carbon-LDP-VolatileResource-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```







### <a name="Carbon-LDP-VolatileResource-Class"/>Interface Carbon.LDP.VolatileResource.Class

**Extends:** [Carbon.Resource.Class](#Carbon-Resource-Class)

> Interface that represents a free resource, i.e. a dynamic generated resource that does not have a persisted form.



### <a name="Carbon-LDP-VolatileResource-Factory"/>Class Carbon.LDP.VolatileResource.Factory


> Factory class for `Carbon.LDP.VolatileResource.Class` objects.




#### <a name="Carbon-LDP-VolatileResource-Factory-Methods"/>Methods
##### hasRDFClass
```typescript 
static hasRDFClass( object:Object ):boolean
```

Return true if the object provided have the RDF_CLASS of a VolatileResource, either if it's a Carbon Resource or an RDF object.

*Parameters*

- object: Object to check.


--

##### is
```typescript 
static is( object:Object ):boolean
```

Return true if the object provided is considered a `Carbon.LDP.VolatileResource.Class` object.

*Parameters*

- object: Object to check.







## <a name="Module-Carbon-NS"/>Module Carbon/NS



#### <a name="Carbon-NS-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| C | [Carbon/NS/C](#Module-Carbon-NS-C) |
| CP | [Carbon/NS/CP](#Module-Carbon-NS-CP) |
| CS | [Carbon/NS/CS](#Module-Carbon-NS-CS) |
| LDP | [Carbon/NS/LDP](#Module-Carbon-NS-LDP) |
| RDF | [Carbon/NS/RDF](#Module-Carbon-NS-RDF) |
| VCARD | [Carbon/NS/VCARD](#Module-Carbon-NS-VCARD) |
| XSD | [Carbon/NS/XSD](#Module-Carbon-NS-XSD) |




## <a name="Module-Carbon-NS-C"/>Module Carbon/NS/C





### <a name="Carbon-NS-C-Properties"/>Properties
```typescript 
static namespace:string 
```







### <a name="Carbon-NS-C-Class"/>Class Carbon.NS.C.Class


> Class that contains classes defined by the Carbon Platform.



#### <a name="Carbon-NS-C-Class-Properties"/>Properties
```typescript 
static API:string 
```


--

```typescript 
static AccessPoint:string 
```


--

```typescript 
static AddMemberAction:string 
```


--

```typescript 
static Document:string 
```


--

```typescript 
static Error:string 
```


--

```typescript 
static ErrorResponse:string 
```


--

```typescript 
static NonReadableMembershipResourceTriples:string 
```


--

```typescript 
static PreferContainer:string 
```


--

```typescript 
static PreferContainmentResources:string 
```


--

```typescript 
static PreferContainmentTriples:string 
```


--

```typescript 
static PreferMembershipResources:string 
```


--

```typescript 
static PreferMembershipTriples:string 
```


--

```typescript 
static RDFRepresentation:string 
```


--

```typescript 
static RemoveMemberAction:string 
```


--

```typescript 
static ResourceMetadata:string 
```


--

```typescript 
static ResponseMetadata:string 
```


--

```typescript 
static VolatileResource:string 
```








### <a name="Carbon-NS-C-Predicate"/>Class Carbon.NS.C.Predicate


> Class that contains predicates defined by the Carbon Platform.



#### <a name="Carbon-NS-C-Predicate-Properties"/>Properties
```typescript 
static accessPoint:string 
```


--

```typescript 
static appRoleMap:string 
```


--

```typescript 
static bNodeIdentifier:string 
```


--

```typescript 
static buildDate:string 
```


--

```typescript 
static carbonCode:string 
```


--

```typescript 
static created:string 
```


--

```typescript 
static defaultInteractionModel:string 
```


--

```typescript 
static eTag:string 
```


--

```typescript 
static entry:string 
```


--

```typescript 
static error:string 
```


--

```typescript 
static httpStatusCode:string 
```


--

```typescript 
static key:string 
```


--

```typescript 
static mediaType:string 
```


--

```typescript 
static message:string 
```


--

```typescript 
static modified:string 
```


--

```typescript 
static requestID:string 
```


--

```typescript 
static resource:string 
```


--

```typescript 
static resourceMetadata:string 
```


--

```typescript 
static size:string 
```


--

```typescript 
static targetMember:string 
```


--

```typescript 
static version:string 
```








## <a name="Module-Carbon-NS-CP"/>Module Carbon/NS/CP





### <a name="Carbon-NS-CP-Properties"/>Properties
```typescript 
static namespace:string 
```







### <a name="Carbon-NS-CP-Predicate"/>Class Carbon.NS.CP.Predicate


> Class that contains predicates defined by Carbon Patch.



#### <a name="Carbon-NS-CP-Predicate-Properties"/>Properties
```typescript 
static ADD_ACTION:string 
```


--

```typescript 
static DELETE_ACTION:string 
```


--

```typescript 
static SET_ACTION:string 
```








## <a name="Module-Carbon-NS-CS"/>Module Carbon/NS/CS





### <a name="Carbon-NS-CS-Properties"/>Properties
```typescript 
static namespace:string 
```







### <a name="Carbon-NS-CS-Class"/>Class Carbon.NS.CS.Class


> Class that contains classes defined by Carbon Security.



#### <a name="Carbon-NS-CS-Class-Properties"/>Properties
```typescript 
static AccessControlEntry:string 
```


--

```typescript 
static AccessControlList:string 
```


--

```typescript 
static AddMember:string 
```


--

```typescript 
static Agent:string 
```


--

```typescript 
static AllOrigins:string 
```


--

```typescript 
static AppRole:string 
```


--

```typescript 
static Application:string 
```


--

```typescript 
static CreateAccessPoint:string 
```


--

```typescript 
static CreateChild:string 
```


--

```typescript 
static Delete:string 
```


--

```typescript 
static Download:string 
```


--

```typescript 
static Extend:string 
```


--

```typescript 
static ManageSecurity:string 
```


--

```typescript 
static PlatformRole:string 
```


--

```typescript 
static ProtectedDocument:string 
```


--

```typescript 
static Read:string 
```


--

```typescript 
static RemoveMember:string 
```


--

```typescript 
static Ticket:string 
```


--

```typescript 
static Token:string 
```


--

```typescript 
static Update:string 
```


--

```typescript 
static Upload:string 
```








### <a name="Carbon-NS-CS-Predicate"/>Class Carbon.NS.CS.Predicate


> Class that contains predicates defined by Carbon Security.



#### <a name="Carbon-NS-CS-Predicate-Properties"/>Properties
```typescript 
static accessControlEntry:string 
```


--

```typescript 
static accessControlList:string 
```


--

```typescript 
static accessTo:string 
```


--

```typescript 
static agent:string 
```


--

```typescript 
static allowsOrigin:string 
```


--

```typescript 
static childRole:string 
```


--

```typescript 
static credentialsOf:string 
```


--

```typescript 
static description:string 
```


--

```typescript 
static enabled:string 
```


--

```typescript 
static expirationTime:string 
```


--

```typescript 
static forIRI:string 
```


--

```typescript 
static granting:string 
```


--

```typescript 
static inheritableEntry:string 
```


--

```typescript 
static namae:string 
```


--

```typescript 
static parentRole:string 
```


--

```typescript 
static password:string 
```


--

```typescript 
static permission:string 
```


--

```typescript 
static platformRole:string 
```


--

```typescript 
static rootContainer:string 
```


--

```typescript 
static subject:string 
```


--

```typescript 
static subjectClass:string 
```


--

```typescript 
static ticketKey:string 
```


--

```typescript 
static tokenKey:string 
```








## <a name="Module-Carbon-NS-LDP"/>Module Carbon/NS/LDP





### <a name="Carbon-NS-LDP-Properties"/>Properties
```typescript 
static namespace:string 
```







### <a name="Carbon-NS-LDP-Class"/>Class Carbon.NS.LDP.Class


> Class that contains classes defined in the W3C Linked Data Platform (LDP) vocabulary.



#### <a name="Carbon-NS-LDP-Class-Properties"/>Properties
```typescript 
static Ascending:string 
```


--

```typescript 
static BasicContainer:string 
```


--

```typescript 
static Container:string 
```


--

```typescript 
static Descending:string 
```


--

```typescript 
static DirectContainer:string 
```


--

```typescript 
static IndirectContainer:string 
```


--

```typescript 
static MemberSubject:string 
```


--

```typescript 
static NonRDFSource:string 
```


--

```typescript 
static Page:string 
```


--

```typescript 
static PageSortCriterion:string 
```


--

```typescript 
static PreferContainment:string 
```


--

```typescript 
static PreferEmptyContainer:string 
```


--

```typescript 
static PreferMembership:string 
```


--

```typescript 
static PreferMinimalContainer:string 
```


--

```typescript 
static RDFSource:string 
```


--

```typescript 
static Resource:string 
```








### <a name="Carbon-NS-LDP-Predicate"/>Class Carbon.NS.LDP.Predicate


> Class that contains predicates defined in the W3C Linked Data Platform (LDP) vocabulary.



#### <a name="Carbon-NS-LDP-Predicate-Properties"/>Properties
```typescript 
static constrainedBy:string 
```


--

```typescript 
static contains:string 
```


--

```typescript 
static hasMemberRelation:string 
```


--

```typescript 
static insertedContentRelation:string 
```


--

```typescript 
static isMemberOfRelation:string 
```


--

```typescript 
static member:string 
```


--

```typescript 
static membershipResource:string 
```


--

```typescript 
static pageSequence:string 
```


--

```typescript 
static pageSortCollation:string 
```


--

```typescript 
static pageSortCriteria:string 
```


--

```typescript 
static pageSortOrder:string 
```








## <a name="Module-Carbon-NS-RDF"/>Module Carbon/NS/RDF





### <a name="Carbon-NS-RDF-Properties"/>Properties
```typescript 
static namespace:string 
```







### <a name="Carbon-NS-RDF-Predicate"/>Class Carbon.NS.RDF.Predicate


> Class that contains predicates defined in the RDF Syntax Specification.



#### <a name="Carbon-NS-RDF-Predicate-Properties"/>Properties
```typescript 
static type:string 
```








## <a name="Module-Carbon-NS-VCARD"/>Module Carbon/NS/VCARD





### <a name="Carbon-NS-VCARD-Properties"/>Properties
```typescript 
static namespace:string 
```







### <a name="Carbon-NS-VCARD-Predicate"/>Class Carbon.NS.VCARD.Predicate


> Class that contains some predicates defined in the vCard Ontology Specification.



#### <a name="Carbon-NS-VCARD-Predicate-Properties"/>Properties
```typescript 
static email:string 
```








## <a name="Module-Carbon-NS-XSD"/>Module Carbon/NS/XSD





### <a name="Carbon-NS-XSD-Properties"/>Properties
```typescript 
static namespace:string 
```







### <a name="Carbon-NS-XSD-DataType"/>Class Carbon.NS.XSD.DataType


> DataType that contains data-types defined in the XML Schema Definition Language (XSD).



#### <a name="Carbon-NS-XSD-DataType-Properties"/>Properties
```typescript 
static boolean:string 
```


--

```typescript 
static byte:string 
```


--

```typescript 
static date:string 
```


--

```typescript 
static dateTime:string 
```


--

```typescript 
static decimal:string 
```


--

```typescript 
static double:string 
```


--

```typescript 
static duration:string 
```


--

```typescript 
static float:string 
```


--

```typescript 
static gDay:string 
```


--

```typescript 
static gMonth:string 
```


--

```typescript 
static gMonthDay:string 
```


--

```typescript 
static gYear:string 
```


--

```typescript 
static gYearMonth:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#boolean:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#byte:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#date:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#dateTime:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#decimal:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#double:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#duration:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#float:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#gDay:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#gMonth:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#gMonthDay:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#gYear:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#gYearMonth:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#int:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#integer:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#long:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#negativeInteger:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#nonNegativeInteger:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#nonPositiveInteger:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#object:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#positiveInteger:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#short:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#string:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#time:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#unsignedByte:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#unsignedInt:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#unsignedLong:string 
```


--

```typescript 
static http://www.w3.org/2001/XMLSchema#unsignedShort:string 
```


--

```typescript 
static int:string 
```


--

```typescript 
static integer:string 
```


--

```typescript 
static long:string 
```


--

```typescript 
static negativeInteger:string 
```


--

```typescript 
static nonNegativeInteger:string 
```


--

```typescript 
static nonPositiveInteger:string 
```


--

```typescript 
static object:string 
```


--

```typescript 
static positiveInteger:string 
```


--

```typescript 
static short:string 
```


--

```typescript 
static string:string 
```


--

```typescript 
static time:string 
```


--

```typescript 
static unsignedByte:string 
```


--

```typescript 
static unsignedInt:string 
```


--

```typescript 
static unsignedLong:string 
```


--

```typescript 
static unsignedShort:string 
```








## <a name="Module-Carbon-NamedFragment"/>Module Carbon/NamedFragment


**Default export:** [Carbon.NamedFragment.Class](#Carbon-NamedFragment-Class)





### <a name="Carbon-NamedFragment-Class"/>Interface Carbon.NamedFragment.Class

**Extends:** [Carbon.Fragment.Class](#Carbon-Fragment-Class)

> Interface that represents a named fragment from a Carbon LDP document.

#### <a name="Carbon-NamedFragment-Class-Properties"/>Properties
```typescript 
slug:string 
```

The slug of the current named fragment.





### <a name="Carbon-NamedFragment-Factory"/>Class Carbon.NamedFragment.Factory


> Factory class for `Carbon.NamedFragment.Class` objects.




#### <a name="Carbon-NamedFragment-Factory-Methods"/>Methods
##### create
```typescript 
static create( slug:string,  document:Carbon.Document.Class ):Carbon.NamedFragment.Class
```

Creates a NamedFragment with the slug provided

*Parameters*

- slug: The slug that will identify the NamedFragment.
- document: The document that the NamedFragment will be part of.


--

##### createFrom
```typescript 
static createFrom<T extends Object>( object:T,  slug:string,  document:Carbon.Document.Class ):T & Carbon.NamedFragment.Class
```

Creates a NamedFragment from an Object with the slug provided.

*Parameters*

- object: Object that will be converted to a NamedFragment.
- slug: The slug that will identify the NamedFragment.
- document: The document that the NamedFragment will be part of.


--

##### hasClassProperties
```typescript 
static hasClassProperties( resource:Carbon.Fragment.Class ):boolean
```

Returns true if the object provided has the properties and methods of a `Carbon.NamedFragment.Class` object.

*Parameters*

- resource







## <a name="Module-Carbon-ObjectSchema"/>Module Carbon/ObjectSchema


**Default export:** [Carbon.ObjectSchema.Class](#Carbon-ObjectSchema-Class)


### <a name="Carbon-ObjectSchema-Enums"/>Enums

#### <a name"ContainerType />ContainerType
> Enum for the types that a container can be.

| Name | Description | 
| --- | --- |
| SET |  |
| LIST |  |
| LANGUAGE |  |



### <a name="Carbon-ObjectSchema-Class"/>Interface Carbon.ObjectSchema.Class


> Interface that represents an schema based in the [JSONLD contexts](https://www.w3.org/TR/json-ld/#the-context). This is used to convert from the JSONLD stored in the server to the Documents used in the SDK and vice versa.

#### <a name="Carbon-ObjectSchema-Class-Properties"/>Properties
```typescript 
@base?:string 
```

An absolute URI that is used to resolve relative URIs. If it's set to `null`, will invalidate a previous `@base` value.

--

```typescript 
@index?:Object 
```

[Not Supported] This element is ignored.

--

```typescript 
@language?:string 
```

The default language of the string properties.

--

```typescript 
@reverse?:Object 
```

[Not Supported] This element is ignored.

--

```typescript 
@vocab?:string 
```

An absolute URI that is used to as the common prefix for all the relative properties. If it's set to `null`, will invalidate a previous `@vocab` value.

--

```typescript 
[ name:string ]:(string | Carbon.ObjectSchema.PropertyDefinition) 
```

This index can be interpreted in two forms:
- As a prefix: When the value is as string. The name is taken a a prefix and the string value must be an absolute URI.
- As a property: When the value is of type `Carbon.ObjectSchema.PropertyDefinition`. The name is taken as the name of the property.





### <a name="Carbon-ObjectSchema-PropertyDefinition"/>Interface Carbon.ObjectSchema.PropertyDefinition


> Interface that defines the property of a schema.

#### <a name="Carbon-ObjectSchema-PropertyDefinition-Properties"/>Properties
```typescript 
@container?:string 
```

If the property is multiple it can be of tree types:
- `@set`: An unsorted array of elements.
- `@list`: An sorted array of elements
- `@language`: An string property with multiple languages.

--

```typescript 
@id?:string 
```

The absolute URI of the property in the JSONLD which is mapped to the key name where this definition was referred.

--

```typescript 
@language?:string 
```

The language of the property.

--

```typescript 
@type?:string 
```

If the property is a literal, this specifies its XSD type.





### <a name="Carbon-ObjectSchema-DigestedObjectSchema"/>Class Carbon.ObjectSchema.DigestedObjectSchema


> Class of a standardized Schema that is used for the SDK for compact and expand JSON-LD objects and Carbon Resources.


#### <a name="Carbon-ObjectSchema-DigestedObjectSchema-Constructor"/>Constructor
```typescript 
DigestedObjectSchema()
```



#### <a name="Carbon-ObjectSchema-DigestedObjectSchema-Properties"/>Properties

```typescript 
base:string 
```

The base URI of the schema.

--

```typescript 
language:string 
```

The default language of the string properties.

--

```typescript 
prefixedURIs:Map<string, Carbon.RDF.URI.Class[]> 
```

Map with the prefixed URIs used in the schema for an easy access to its absolute URI.

--

```typescript 
prefixes:Map<string, Carbon.RDF.URI.Class> 
```

Map that contains the prefixes of absolutes URIs.

--

```typescript 
properties:Map<string, Carbon.ObjectSchema.DigestedPropertyDefinition> 
```

Map that contains the definitions of the properties in the schema.

--

```typescript 
vocab:string 
```

URI that will be used to resolve properties URIs that aren't defined in the schema.






### <a name="Carbon-ObjectSchema-DigestedPropertyDefinition"/>Class Carbon.ObjectSchema.DigestedPropertyDefinition


> Class for standardized object properties of a schema.


#### <a name="Carbon-ObjectSchema-DigestedPropertyDefinition-Constructor"/>Constructor
```typescript 
DigestedPropertyDefinition()
```



#### <a name="Carbon-ObjectSchema-DigestedPropertyDefinition-Properties"/>Properties

```typescript 
containerType:Carbon.ObjectSchema.ContainerType 
```

The type of container the property is. It's `null` if the property is no container type.

--

```typescript 
language:string 
```

The language the property is in.

--

```typescript 
literal:boolean 
```

Indicates if the property is a literal or not.

--

```typescript 
literalType:Carbon.RDF.URI.Class 
```

The type of literal the property is. It's `null` if the property is not a literal.

--

```typescript 
uri:Carbon.RDF.URI.Class 
```

The absolute URI that represents the property






### <a name="Carbon-ObjectSchema-Digester"/>Class Carbon.ObjectSchema.Digester


> Class with functions to standardize a JSON-LD Context Schema.




#### <a name="Carbon-ObjectSchema-Digester-Methods"/>Methods
##### combineDigestedObjectSchemas
```typescript 
static combineDigestedObjectSchemas( digestedSchemas:Carbon.ObjectSchema.DigestedObjectSchema[] ):Carbon.ObjectSchema.DigestedObjectSchema
```

Combine several standardized schemas into one.

*Parameters*

- digestedSchemas


--

##### digestSchema
```typescript 
static digestSchema( schema:Carbon.ObjectSchema.Class ):Carbon.ObjectSchema.DigestedObjectSchema
```

Processes a schema to standardize it before using it.

*Parameters*

- schema

```typescript 
static digestSchema( schemas:Array<Carbon.ObjectSchema.Class> ):Carbon.ObjectSchema.DigestedObjectSchema
```

Processes several schemas to standardize and combine them before using them.

*Parameters*

- schemas







### <a name="Carbon-ObjectSchema-Utils"/>Class Carbon.ObjectSchema.Utils


> Class with useful functions that use schemas.




#### <a name="Carbon-ObjectSchema-Utils-Methods"/>Methods
##### resolveURI
```typescript 
static resolveURI( uri:string,  schema:Carbon.ObjectSchema.DigestedObjectSchema ):string
```

Resolves a prefixed URI, or relative URI with the vocab in the schema provided.

*Parameters*

- uri: The URI to ve resolved.
- schema: The schema where to find the prefixes or the default vocabulary to utilize.







## <a name="Module-Carbon-PersistedAccessPoint"/>Module Carbon/PersistedAccessPoint


**Default export:** [Carbon.PersistedAccessPoint.Class](#Carbon-PersistedAccessPoint-Class)





### <a name="Carbon-PersistedAccessPoint-Class"/>Interface Carbon.PersistedAccessPoint.Class

**Extends:** [Carbon.AccessPoint.Class](#Carbon-AccessPoint-Class), [Carbon.PersistedProtectedDocument.Class](#Carbon-PersistedProtectedDocument-Class)

> Interface that represents a persisted Carbon LDP AccessPoint.

#### <a name="Carbon-PersistedAccessPoint-Class-Properties"/>Properties
```typescript 
hasMemberRelation:Carbon.Pointer.Class 
```

The member relation of the access point manages.

--

```typescript 
insertedContentRelation:Carbon.Pointer.Class 
```

The inserted content relation of the access point.

--

```typescript 
isMemberOfRelation:Carbon.Pointer.Class 
```

The inverted relation of the access point.

--

```typescript 
membershipResource:Carbon.Pointer.Class 
```

The membership resource the access point belongs to.





## <a name="Module-Carbon-PersistedApp"/>Module Carbon/PersistedApp


**Default export:** [Carbon.PersistedApp.Class](#Carbon-PersistedApp-Class)





### <a name="Carbon-PersistedApp-Class"/>Interface Carbon.PersistedApp.Class

**Extends:** [Carbon.PersistedProtectedDocument.Class](#Carbon-PersistedProtectedDocument-Class)

> Interface that represents a persisted Carbon LDP Application.

#### <a name="Carbon-PersistedApp-Class-Properties"/>Properties
```typescript 
allowsOrigin?:(string | Carbon.Pointer.Class)[] 
```

An array of string URIs or Pointers that refers to the origins allowed to connect to the application. An special URI that allows everyone to connect is at `Carbon.NS.CS.Class.AllOrigins` which translates to `https://carbonldp.com/ns/v1/security#AllOrigins`.

--

```typescript 
description?:string 
```

A brief description of the current application.

--

```typescript 
name:string 
```

The name of the current application.

--

```typescript 
rooContainer:Carbon.Pointer.Class 
```

The reference to the root container where the current data of the application lives on.





### <a name="Carbon-PersistedApp-Factory"/>Class Carbon.PersistedApp.Factory


> Factory class for `Carbon.PersistedApp.Class` objects.




#### <a name="Carbon-PersistedApp-Factory-Methods"/>Methods
##### hasClassProperties
```typescript 
static hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties of a `Carbon.PersistedApp.Class` object.

*Parameters*

- resource


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.PersistedApp.Class` object.

*Parameters*

- object







## <a name="Module-Carbon-PersistedDocument"/>Module Carbon/PersistedDocument


**Default export:** [Carbon.PersistedDocument.Class](#Carbon-PersistedDocument-Class)





### <a name="Carbon-PersistedDocument-Class"/>Interface Carbon.PersistedDocument.Class

**Extends:** [Carbon.PersistedResource.Class](#Carbon-PersistedResource-Class), [Carbon.Document.Class](#Carbon-Document-Class)

> Interface that represents a persisted blank node of a persisted document.

#### <a name="Carbon-PersistedDocument-Class-Properties"/>Properties
```typescript 
_documents:Carbon.Documents.Class 
```

The Documents instance to which the document belongs.

--

```typescript 
_etag:string 
```

The ETag (entity tag) of the persisted document.

--

```typescript 
_fragmentsIndex:Map<string, Carbon.PersistedFragment.Class> 
```

Map that stores the persisted fragments (named fragments and blank nodes) of the document.

--

```typescript 
_savedFragments:Carbon.PersistedFragment.Class[] 
```

Array with a copy of every fragment that that is currently persisted in the server.

--

```typescript 
accessPoints?:Carbon.Pointer.Class[] 
```

Array with the access points of the document.

--

```typescript 
contains?:Carbon.Pointer.Class 
```

Array with the children of the document.

--

```typescript 
created?:Date 
```

The time when the document was persisted.

--

```typescript 
defaultInteractionModel?:Carbon.Pointer.Class 
```

A Pointer representing the default interaction model of the document.

--

```typescript 
hasMemberRelation?:Carbon.Pointer.Class 
```

A Pointer with the inverted relation the document.

--

```typescript 
isMemberOfRelation?:Carbon.Pointer.Class 
```

A Pointer with the member of relation of the document.

--

```typescript 
modified?:Date 
```

The last time the document was saved.




#### <a name="Carbon-PersistedDocument-Class-Methods"/>Methods
##### _syncSavedFragments
```typescript 
_syncSavedFragments():void
```

Set all the current fragments in the document as fragments that are saved in the server.


--

##### addMember
```typescript 
addMember( member:Carbon.Pointer.Class ):Promise<Carbon.HTTP.Response.Class>
```

Adds the specified resource Pointer as a member of the document.

*Parameters*

- member: Pointer object that references the resource to add as a member.

```typescript 
addMember( memberURI:string ):Promise<Carbon.HTTP.Response.Class>
```

Adds the specified resource URI as a member of the document.

*Parameters*

- memberURI: URI of the resource to add as a member.


--

##### addMembers
```typescript 
addMembers( members:(Carbon.Pointer.Class | string)[] ):Promise<Carbon.HTTP.Response.Class>
```

Adds the specified resources as members of the document.

*Parameters*

- members: Array of URIs or Pointers to add as members.


--

##### createAccessPoint
```typescript 
createAccessPoint<T>( accessPoint:T & Carbon.AccessPoint.Class,  slug?:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedAccessPoint.Class, Carbon.HTTP.Response ]>
```

Create an AccessPoint for the document with the slug specified.

*Parameters*

- accessPoint: AccessPoint Document to persist.
- slug: Slug that will be used for the URI of the new access point.
- requestOptions: Customisable options for the request.

```typescript 
createAccessPoint<T>( accessPoint:T & Carbon.AccessPoint.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedAccessPoint.Class, Carbon.HTTP.Response ]>
```

Create an AccessPoint for the document.

*Parameters*

- accessPoint: AccessPoint Document to persist.
- requestOptions: Customizable options for the request.


--

##### createAccessPoints
```typescript 
createAccessPoints<T>( accessPoints:(T & Carbon.AccessPoint.Class)[],  slugs:string[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedAccessPoint.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Create multiple access points for the current document with the slug specified.

*Parameters*

- accessPoints: The access points to persist.
- slugs: Array with the slugs that corresponds to each object in `accessPoints` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform.
- requestOptions: Customisable options for the request.

```typescript 
createAccessPoints<T>( accessPoints:(T & Carbon.AccessPoint.Class)[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedAccessPoint.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Create multiple access points for the current document.

*Parameters*

- accessPoints: The access points to persist.
- requestOptions: Customizable options for the request.


--

##### createChild
```typescript 
createChild<T>( object:T,  slug:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Persists a document with the slug specified as a child of the current document.

*Parameters*

- object: The object from where create the child. If it's a non `Carbon.Document.Class` object, it's transformed into one.
- slug: The slug that will be used in the child URI.
- requestOptions: Customizable options for the request.

```typescript 
createChild<T>( object:T,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Persists a document as a child of the current document.

*Parameters*

- object: The object from where create the child. If it's a non `Carbon.Document.Class` object, it's transformed into one.
- requestOptions: Customizable options for the request.

```typescript 
createChild( slug:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Creates an persists an empty child for the current document with the slug provided.

*Parameters*

- slug: The slug that will be used in the child URI.
- requestOptions: Customizable options for the request.

```typescript 
createChild( requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Creates and persists an empty child fot he current document.

*Parameters*

- requestOptions: Customizable options for the request.


--

##### createChildAndRetrieve
```typescript 
createChildAndRetrieve<T>( object:T,  slug:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>
```

Create a child for the document and retrieves the updated data from the server.

*Parameters*

- object: The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one.
- slug: The slug name for the children URI.
- requestOptions: Customizable options for the request.

```typescript 
createChildAndRetrieve<T>( object:T,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>
```

Create a child for the document and retrieves the updated data from the server.

*Parameters*

- object: The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one.
- requestOptions: Customizable options for the request.

```typescript 
createChildAndRetrieve( slug:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>
```

Create a child for the document and retrieves the updated data from the server.

*Parameters*

- slug: The slug name for the children URI.
- requestOptions: Customizable options for the request.

```typescript 
createChildAndRetrieve( requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>
```

Create a child for the document and retrieves the updated data from the server.

*Parameters*

- requestOptions: Customizable options for the request.


--

##### createChildren
```typescript 
createChildren<T>( objects:T[],  slugs:string[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Persists multiple JavaScript objects as children of the current document.

*Parameters*

- objects: An array with the objects to be persisted as the new children.
- slugs: Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform.
- requestOptions: Customizable options for every the request.

```typescript 
createChildren<T>( objects:T[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Persists multiple JavaScript objects as children of the current document.

*Parameters*

- objects: An array with the objects to be persisted as the new children.
- requestOptions: Customizable options for every the request.


--

##### createChildrenAndRetrieve
```typescript 
createChildrenAndRetrieve<T>( objects:T[],  slugs:string[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Persists multiple JavaScript objects as children of the current document and retrieves tha updated data from the server.

*Parameters*

- objects: An array with the objects to be persisted as the new children.
- slugs: Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform.
- requestOptions: Customizable options for every the request.

```typescript 
createChildrenAndRetrieve<T>( objects:T[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Persists multiple JavaScript objects as children of the current document and retrieves tha updated data from the server.

*Parameters*

- objects: An array with the objects to be persisted as the new children.
- requestOptions: Customizable options for every the request.


--

##### createFragment
```typescript 
createFragment<T extends Object>( object:T,  slug:string ):T & Carbon.PersistedFragment.Class
```

Creates a PersistedFragment from the object provided and the slug specified.

*Parameters*

- object
- slug

```typescript 
createFragment<T extends Object>( object:T ):T & Carbon.PersistedFragment.Class
```

Creates a PersistedBlankNode from the object provided, sing no slug was specified.

*Parameters*

- object

```typescript 
createFragment( slug:string ):Carbon.PersistedFragment.Class
```

Creates a PersistedFragment with the slug provided.

*Parameters*

- slug

```typescript 
createFragment():Carbon.PersistedFragment.Class
```

Creates a PersistedBlankNode, since no slug is provided


--

##### createNamedFragment
```typescript 
createNamedFragment( slug:string ):Carbon.PersistedNamedFragment.Class
```

Creates a PersistedNamedFragment with the slug provided

*Parameters*

- slug

```typescript 
createNamedFragment<T>( object:T,  slug:string ):T & Carbon.PersistedNamedFragment.Class
```

Creates a PersistedNamedFragment from the object provided and the slug specified.

*Parameters*

- object
- slug


--

##### delete
```typescript 
delete():Promise<Carbon.HTTP.Response.Class>
```

Remove the data in the server referred by the id of the persisted document.


--

##### executeASKQuery
```typescript 
executeASKQuery( askQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ boolean, Carbon.HTTP.Response.Class ]>
```

Executes an ASK query in the document and returns a boolean of the result.

*Parameters*

- askQuery
- requestOptions: Customizable options for the request.


--

##### executeRawASKQuery
```typescript 
executeRawASKQuery( askQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes an ASK query in the document and returns a raw application/sparql-results+json object.

*Parameters*

- askQuery
- requestOptions: Customizable options for the request.


--

##### executeRawCONSTRUCTQuery
```typescript 
executeRawCONSTRUCTQuery( constructQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ string, Carbon.HTTP.Response.Class ]>
```

Executes a CONSTRUCT query in the document and returns a string with the resulting model.

*Parameters*

- constructQuery
- requestOptions: Customizable options for the request.


--

##### executeRawDESCRIBEQuery
```typescript 
executeRawDESCRIBEQuery( constructQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ string, Carbon.HTTP.Response.Class ]>
```

Executes a DESCRIBE query in the document and returns a string with the resulting model.

*Parameters*

- constructQuery
- requestOptions: Customizable options for the request.


--

##### executeRawSELECTQuery
```typescript 
executeRawSELECTQuery( selectQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes a SELECT query in the document and returns a raw application/sparql-results+json object.

*Parameters*

- selectQuery
- requestOptions: Customizable options for the request.


--

##### executeSELECTQuery
```typescript 
executeSELECTQuery( selectQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.SELECTResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes a SELECT query in the document and returns the results as a `Carbon.SPARQL.SELECTResults.Class` object.

*Parameters*

- selectQuery
- requestOptions: Customizable options for the request.


--

##### executeUPDATE
```typescript 
executeUPDATE( updateQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Executes an UPDATE query.

*Parameters*

- updateQuery: UPDATE query to execute in the selected endpoint.
- requestOptions: Customizable options for the request.


--

##### getChildren
```typescript 
getChildren<T>( retrievalPreferences?:Carbon.RetrievalPreferences.Class ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response ]>
```

Retrieves an array of resolved persisted documents that refers to the children of the current document, in accordance to the retrieval preferences specified.

*Parameters*

- retrievalPreferences


--

##### getDownloadURL
```typescript 
getDownloadURL():Promise<Carbon.HTTP.Response.Class>
```

Returns the URI of the current document with the properties necessarily for a single download request.


--

##### getMembers
```typescript 
getMembers<T>( includeNonReadable?:boolean,  retrievalPreferences?:Carbon.RetrievalPreferences.Class ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>
```

Retrieves an array of resolved persisted documents that refers to the members of the current document, in accordance to the retrieval preferences specified.

*Parameters*

- includeNonReadable: By default this option is set to `true`.
- retrievalPreferences

```typescript 
getMembers<T>( retrievalPreferences?:Carbon.RetrievalPreferences.Class ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>
```

Retrieves an array of resolved persisted documents that refers to the members of the current document, including the non readable elements, in accordance to the retrieval preferences specified.

*Parameters*

- retrievalPreferences


--

##### listChildren
```typescript 
listChildren():Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response ]>
```

Retrieves an array of unresolved persisted documents that refers to the children of the current document.


--

##### listMembers
```typescript 
listMembers( includeNonReadable?:boolean ):Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response.Class ]>
```

Retrieves an array of unresolved persisted documents that refers to the members of the current document.

*Parameters*

- includeNonReadable: By default this option is set to `true`.


--

##### refresh
```typescript 
refresh<T>():Promise<[ T & Carbon.PersistedDocument.Class, Carbon.HTTP.Response.Class]>
```

Sync the persisted document with the data in the server.


--

##### removeAllMembers
```typescript 
removeAllMembers():Promise<Carbon.HTTP.Response.Class>
```

Remove the specified resources URI or Pointers as members of the current document.


--

##### removeMember
```typescript 
removeMember( member:Carbon.Pointer.Class ):Promise<Carbon.HTTP.Response.Class>
```

Remove the specified resource Pointer as a member of the current document.

*Parameters*

- member: Pointer object that references the resource to remove as a member.

```typescript 
removeMember( memberURI:string ):Promise<Carbon.HTTP.Response.Class>
```

Remove the specified resource URI as a member of the current document.

*Parameters*

- memberURI: URI of the resource to remove as a member.


--

##### removeMembers
```typescript 
removeMembers( members:(Carbon.Pointer.Class | string)[] ):Promise<Carbon.HTTP.Response.Class>
```

Remove the specified resources URI or Pointers as members of the current document.

*Parameters*

- members: Array of URIs or Pointers to remove as members


--

##### save
```typescript 
save<T>():Promise<[ T & Carbon.PersistedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Save the persisted document to the server.


--

##### saveAndRefresh
```typescript 
saveAndRefresh<T>():Promise<[ T & Carbon.PersistedDocument.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>
```

Save and refresh the persisted document.


--

##### upload
```typescript 
upload( data:Blob,  slug:string ):Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>
```

Upload a File to the server as a child of the current document with the slug specified. This signature only works in a web browser.

*Parameters*

- data: Binary data to store in the server.
- slug: The slug that will be used in the URI of the data.

```typescript 
upload( data:Blob ):Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>
```

Upload a File to the server as a child of the current document. This signature only works in a web browser.

*Parameters*

- data: Binary data to store in the server.

```typescript 
upload( data:Buffer,  slug:string ):Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>
```

Upload a File to the server as a child of the current document with the slug specified. This signature only works with Node.js.

*Parameters*

- data: Binary data to store in the server. The Buffer only works in Node.js.
- slug: The slug that will be used in the URI of the data.

```typescript 
upload( data:Buffer ):Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>
```

Upload a File to the server as a child of the current document. This signature only works with Node.js.

*Parameters*

- data: Binary data to store in the server. The Buffer only works in Node.js.





### <a name="Carbon-PersistedDocument-Factory"/>Class Carbon.PersistedDocument.Factory


> Factory class for `Carbon.PersistedDocument.Class` objects.




#### <a name="Carbon-PersistedDocument-Factory-Methods"/>Methods
##### create
```typescript 
static create( uri:string,  documents:Carbon.Documents.Class ):Carbon.PersistedDocument.Class
```

Creates an empty `Carbon.PersistedDocument.Class` object with the URI provided.

*Parameters*

- uri
- documents: The Documents instance to which the persisted document belongs.


--

##### createFrom
```typescript 
static createFrom<T extends Object>( object:T,  uri:string,  documents:Carbon.Documents.Class ):T & Carbon.PersistedDocument.Class
```

Creates a PersistedDocument object from the object and URI provided.

*Parameters*

- object
- uri
- documents: The Documents instance to which the persisted document belongs.


--

##### decorate
```typescript 
static decorate<T extends Object>( object:T,  documents:Carbon.Documents.Class ):T & Carbon.PersistedDocument.Class
```

Decorates the object provided with the properties and methods of a `Carbon.PersistedDocument.Class` object.

*Parameters*

- object
- documents: The Documents instance to which the persisted document belongs.


--

##### hasClassProperties
```typescript 
static hasClassProperties( document:Carbon.Document.Class ):boolean
```

Returns true if the Document provided has the properties and methods of a `Carbon.PersistedDocument.Class` object.

*Parameters*

- document


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the element provided is considered a `Carbon.PersistedDocument.Class` object.

*Parameters*

- object






#### <a name="Carbon-PersistedDocument-Factory-Decorated-Object"/>Decorated Object
**Interfaces:** [Carbon.PersistedDocument.Class](#Carbon-PersistedDocument-Class)

> Object decorated by the `Carbon.PersistedDocument.Factory.decorate()` function.

##### <a name="Carbon-PersistedDocument-Factory-Decorated-Object-Properties"/>Properties
```typescript 
_documents:Carbon.Documents.Class 
```

The Documents instance to which the document belongs.

--

```typescript 
_etag:string 
```

The ETag (entity tag) of the persisted document.




##### <a name="Carbon-PersistedDocument-Factory-Decorated-Object-Methods"/>Methods
##### addMember
```typescript 
addMember( member:Carbon.Pointer.Class ):Promise<Carbon.HTTP.Response.Class>
```

Adds the specified resource Pointer as a member of the document.

*Parameters*

- member: Pointer object that references the resource to add as a member.

```typescript 
addMember( memberURI:string ):Promise<Carbon.HTTP.Response.Class>
```

Adds the specified resource URI as a member of the document.

*Parameters*

- memberURI: URI of the resource to add as a member.


--

##### addMembers
```typescript 
addMembers( members:(Carbon.Pointer.Class | string)[] ):Promise<Carbon.HTTP.Response.Class>
```

Adds the specified resources as members of the document.

*Parameters*

- members: Array of URIs or Pointers to add as members.


--

##### addType
```typescript 
addType( type:string ):void
```

Adds a type to the Document. Relative and prefixed types are resolved before the operation.

*Parameters*

- type: The type to be added.


--

##### createAccessPoint
```typescript 
createAccessPoint<T>( accessPoint:T & Carbon.AccessPoint.Class,  slug?:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedAccessPoint.Class, Carbon.HTTP.Response ]>
```

Create an AccessPoint for the document with the slug specified.

*Parameters*

- accessPoint: AccessPoint Document to persist.
- slug: Slug that will be used for the URI of the new access point.
- requestOptions: Customisable options for the request.

```typescript 
createAccessPoint<T>( accessPoint:T & Carbon.AccessPoint.Class,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedAccessPoint.Class, Carbon.HTTP.Response ]>
```

Create an AccessPoint for the document.

*Parameters*

- accessPoint: AccessPoint Document to persist.
- requestOptions: Customizable options for the request.


--

##### createAccessPoints
```typescript 
createAccessPoints<T>( accessPoints:(T & Carbon.AccessPoint.Class)[],  slugs:string[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedAccessPoint.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Create multiple access points for the current document with the slug specified.

*Parameters*

- accessPoints: The access points to persist.
- slugs: Array with the slugs that corresponds to each object in `accessPoints` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform.
- requestOptions: Customisable options for the request.

```typescript 
createAccessPoints<T>( accessPoints:(T & Carbon.AccessPoint.Class)[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedAccessPoint.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Create multiple access points for the current document.

*Parameters*

- accessPoints: The access points to persist.
- requestOptions: Customizable options for the request.


--

##### createChild
```typescript 
createChild<T>( object:T,  slug:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Persists a document with the slug specified as a child of the current document.

*Parameters*

- object: The object from where create the child. If it's a non `Carbon.Document.Class` object, it's transformed into one.
- slug: The slug that will be used in the child URI.
- requestOptions: Customizable options for the request.

```typescript 
createChild<T>( object:T,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Persists a document as a child of the current document.

*Parameters*

- object: The object from where create the child. If it's a non `Carbon.Document.Class` object, it's transformed into one.
- requestOptions: Customizable options for the request.

```typescript 
createChild( slug:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Creates an persists an empty child for the current document with the slug provided.

*Parameters*

- slug: The slug that will be used in the child URI.
- requestOptions: Customizable options for the request.

```typescript 
createChild( requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.PersistedProtectedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Creates and persists an empty child fot he current document.

*Parameters*

- requestOptions: Customizable options for the request.


--

##### createChildAndRetrieve
```typescript 
createChildAndRetrieve<T>( object:T,  slug:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>
```

Create a child for the document and retrieves the updated data from the server.

*Parameters*

- object: The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one.
- slug: The slug name for the children URI.
- requestOptions: Customizable options for the request.

```typescript 
createChildAndRetrieve<T>( object:T,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ T & Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>
```

Create a child for the document and retrieves the updated data from the server.

*Parameters*

- object: The object from where create the child. If it's a non `Carbon.Document.Class` object, it is transformed into one.
- requestOptions: Customizable options for the request.

```typescript 
createChildAndRetrieve( slug:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>
```

Create a child for the document and retrieves the updated data from the server.

*Parameters*

- slug: The slug name for the children URI.
- requestOptions: Customizable options for the request.

```typescript 
createChildAndRetrieve( requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.PersistedProtectedDocument.Class, [ Carbon.HTTP.Response.Class, Carbon.HTTP.Response.Class ] ]>
```

Create a child for the document and retrieves the updated data from the server.

*Parameters*

- requestOptions: Customizable options for the request.


--

##### createChildren
```typescript 
createChildren<T>( objects:T[],  slugs:string[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Persists multiple JavaScript objects as children of the current document.

*Parameters*

- objects: An array with the objects to be persisted as the new children.
- slugs: Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform.
- requestOptions: Customizable options for every the request.

```typescript 
createChildren<T>( objects:T[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Persists multiple JavaScript objects as children of the current document.

*Parameters*

- objects: An array with the objects to be persisted as the new children.
- requestOptions: Customizable options for every the request.


--

##### createChildrenAndRetrieve
```typescript 
createChildrenAndRetrieve<T>( objects:T[],  slugs:string[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Persists multiple JavaScript objects as children of the current document and retrieves tha updated data from the server.

*Parameters*

- objects: An array with the objects to be persisted as the new children.
- slugs: Array with the slugs that corresponds to each object in `object` parameter, in the order in which they were defined. If an element in the array is undefined or null, the slug will be generated by the platform.
- requestOptions: Customizable options for every the request.

```typescript 
createChildrenAndRetrieve<T>( objects:T[],  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ (T & Carbon.PersistedProtectedDocument.Class)[], Carbon.HTTP.Response.Class[] ]>
```

Persists multiple JavaScript objects as children of the current document and retrieves tha updated data from the server.

*Parameters*

- objects: An array with the objects to be persisted as the new children.
- requestOptions: Customizable options for every the request.


--

##### createFragment
```typescript 
createFragment<T>( object:T,  slug:string ):T & Carbon.PersistedFragment.Class
```

Creates a PersistedFragment from the object provided and the slug specified.

*Parameters*

- object
- slug

```typescript 
createFragment<T>( object:T ):T & Carbon.PersistedFragment.Class
```

Creates a PersistedBlankNode from the object provided, sing no slug was specified.

*Parameters*

- object

```typescript 
createFragment( slug:string ):Carbon.PersistedFragment.Class
```

Creates a PersistedFragment with the slug provided.

*Parameters*

- slug

```typescript 
createFragment():Carbon.PersistedFragment.Class
```

Creates a PersistedBlankNode, since no slug is provided


--

##### createNamedFragment
```typescript 
createNamedFragment( slug:string ):Carbon.PersistedNamedFragment.Class
```

Creates a PersistedNamedFragment with the slug provided

*Parameters*

- slug

```typescript 
createNamedFragment<T>( object:T,  slug:string ):T & Carbon.PersistedNamedFragment.Class
```

Creates a PersistedNamedFragment from the object provided and the slug specified.

*Parameters*

- object
- slug


--

##### delete
```typescript 
delete():Promise<Carbon.HTTP.Response.Class>
```

Remove the data in the server referred by the id of the persisted document.


--

##### executeASKQuery
```typescript 
executeASKQuery( askQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ boolean, Carbon.HTTP.Response.Class ]>
```

Executes an ASK query in the document and returns a boolean of the result.

*Parameters*

- askQuery
- requestOptions: Customizable options for the request.


--

##### executeRawASKQuery
```typescript 
executeRawASKQuery( askQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes an ASK query in the document and returns a raw application/sparql-results+json object.

*Parameters*

- askQuery
- requestOptions: Customizable options for the request.


--

##### executeRawCONSTRUCTQuery
```typescript 
executeRawCONSTRUCTQuery( constructQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ string, Carbon.HTTP.Response.Class ]>
```

Executes a CONSTRUCT query in the document and returns a string with the resulting model.

*Parameters*

- constructQuery
- requestOptions: Customizable options for the request.


--

##### executeRawDESCRIBEQuery
```typescript 
executeRawDESCRIBEQuery( constructQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ string, Carbon.HTTP.Response.Class ]>
```

Executes a DESCRIBE query in the document and returns a string with the resulting model.

*Parameters*

- constructQuery
- requestOptions: Customizable options for the request.


--

##### executeRawSELECTQuery
```typescript 
executeRawSELECTQuery( selectQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes a SELECT query in the document and returns a raw application/sparql-results+json object.

*Parameters*

- selectQuery
- requestOptions: Customizable options for the request.


--

##### executeSELECTQuery
```typescript 
executeSELECTQuery( selectQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.SELECTResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes a SELECT query in the document and returns the results as a `Carbon.SPARQL.SELECTResults.Class` object.

*Parameters*

- selectQuery
- requestOptions: Customizable options for the request.


--

##### executeUPDATE
```typescript 
executeUPDATE( updateQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Executes an UPDATE query.

*Parameters*

- updateQuery: UPDATE query to execute in the selected endpoint.
- requestOptions: Customizable options for the request.


--

##### getChildren
```typescript 
getChildren<T>( retrievalPreferences?:Carbon.RetrievalPreferences.Class ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response ]>
```

Retrieves an array of resolved persisted documents that refers to the children of the current document, in accordance to the retrieval preferences specified.

*Parameters*

- retrievalPreferences


--

##### getDownloadURL
```typescript 
getDownloadURL():Promise<Carbon.HTTP.Response.Class>
```

Returns the URI of the current document with the properties necessarily for a single download request.


--

##### getMembers
```typescript 
getMembers<T>( includeNonReadable?:boolean,  retrievalPreferences?:Carbon.RetrievalPreferences.Class ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>
```

Retrieves an array of resolved persisted documents that refers to the members of the current document, in accordance to the retrieval preferences specified.

*Parameters*

- includeNonReadable: By default this option is set to `true`.
- retrievalPreferences

```typescript 
getMembers<T>( retrievalPreferences?:Carbon.RetrievalPreferences.Class ):Promise<[ (T & Carbon.PersistedDocument.Class)[], Carbon.HTTP.Response.Class ]>
```

Retrieves an array of resolved persisted documents that refers to the members of the current document, including the non readable elements, in accordance to the retrieval preferences specified.

*Parameters*

- retrievalPreferences


--

##### getPointer
```typescript 
getPointer( id:string ):boolean
```

Returns the pointer referenced by the URI provided. If none exists, an empty pointer is created.
Returns null if the URI is not inside the scope of the persisted document.

*Parameters*

- id


--

##### hasPointer
```typescript 
hasPointer( id:string ):boolean
```

Returns true if the persisted document object has a pointer referenced by the URI provided.

*Parameters*

- id


--

##### hasType
```typescript 
hasType( type:string ):void
```

Returns true if the Document contains the type specified. Relative and prefixed types are resolved before the operation.

*Parameters*

- type: The type to look for.


--

##### inScope
```typescript 
inScope( pointer:Carbon.Pointer.Class ):boolean
```

Returns true if the pointer provided is in the scope of the persisted document.

*Parameters*

- pointer

```typescript 
inScope( id:string ):boolean
```

Returns true if the URI provided is in the scope of the persisted document.

*Parameters*

- id


--

##### listChildren
```typescript 
listChildren():Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response ]>
```

Retrieves an array of unresolved persisted documents that refers to the children of the current document.


--

##### listMembers
```typescript 
listMembers( includeNonReadable?:boolean ):Promise<[ Carbon.PersistedDocument.Class[], Carbon.HTTP.Response.Class ]>
```

Retrieves an array of unresolved persisted documents that refers to the members of the current document.

*Parameters*

- includeNonReadable: By default this option is set to `true`.


--

##### refresh
```typescript 
refresh<T>():Promise<[ T & Carbon.PersistedDocument.Class, Carbon.HTTP.Response.Class]>
```

Sync the persisted document with the data in the server.


--

##### removeAllMembers
```typescript 
removeAllMembers():Promise<Carbon.HTTP.Response.Class>
```

Remove the specified resources URI or Pointers as members of the current document.


--

##### removeMember
```typescript 
removeMember( member:Carbon.Pointer.Class ):Promise<Carbon.HTTP.Response.Class>
```

Remove the specified resource Pointer as a member of the current document.

*Parameters*

- member: Pointer object that references the resource to remove as a member.

```typescript 
removeMember( memberURI:string ):Promise<Carbon.HTTP.Response.Class>
```

Remove the specified resource URI as a member of the current document.

*Parameters*

- memberURI: URI of the resource to remove as a member.


--

##### removeMembers
```typescript 
removeMembers( members:(Carbon.Pointer.Class | string)[] ):Promise<Carbon.HTTP.Response.Class>
```

Remove the specified resources URI or Pointers as members of the current document.

*Parameters*

- members: Array of URIs or Pointers to remove as members


--

##### removeType
```typescript 
removeType( type:string ):void
```

Remove the type specified from the Document. Relative and prefixed types are resolved before the operation.

*Parameters*

- type: The type to be removed.


--

##### save
```typescript 
save<T>():Promise<[ T & Carbon.PersistedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Save the persisted document to the server.


--

##### saveAndRefresh
```typescript 
saveAndRefresh<T>():Promise<[ T & Carbon.PersistedDocument.Class, [ HTTP.Response.Class, HTTP.Response.Class ] ]>
```

Save and refresh the persisted document.


--

##### upload
```typescript 
upload( data:Blob,  slug:string ):Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>
```

Upload a File to the server as a child of the current document with the slug specified. This signature only works in a web browser.

*Parameters*

- data: Binary data to store in the server.
- slug: The slug that will be used in the URI of the data.

```typescript 
upload( data:Blob ):Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>
```

Upload a File to the server as a child of the current document. This signature only works in a web browser.

*Parameters*

- data: Binary data to store in the server.

```typescript 
upload( data:Buffer,  slug:string ):Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>
```

Upload a File to the server as a child of the current document with the slug specified. This signature only works with Node.js.

*Parameters*

- data: Binary data to store in the server. The Buffer only works in Node.js.
- slug: The slug that will be used in the URI of the data.

```typescript 
upload( data:Buffer ):Promise<[ Carbon.Pointer.Class, Carbon.HTTP.Response.Class ]>
```

Upload a File to the server as a child of the current document. This signature only works with Node.js.

*Parameters*

- data: Binary data to store in the server. The Buffer only works in Node.js.





## <a name="Module-Carbon-PersistedFragment"/>Module Carbon/PersistedFragment


**Default export:** [Carbon.PersistedFragment.Class](#Carbon-PersistedFragment-Class)





### <a name="Carbon-PersistedFragment-Class"/>Interface Carbon.PersistedFragment.Class

**Extends:** [Carbon.PersistedResource.Class](#Carbon-PersistedResource-Class), [Carbon.Fragment.Class](#Carbon-Fragment-Class)

> Interface that represents a persisted fragment of a persisted document.

#### <a name="Carbon-PersistedFragment-Class-Properties"/>Properties
```typescript 
document:Carbon.PersistedDocument.Class 
```

A reference to the persisted document the current fragment belongs to.





### <a name="Carbon-PersistedFragment-Factory"/>Class Carbon.PersistedFragment.Factory


> Factory class for `Carbon.PersistedFragment.Class` objects.




#### <a name="Carbon-PersistedFragment-Factory-Methods"/>Methods
##### decorate
```typescript 
static decorate( fragment:T extends Carbon.Fragment.Class,  snapshot?:Object ):void
```

Decorates the object provided with the properties and methods of a `Carbon.PersistedFragment.Class` object.

*Parameters*

- fragment: The Fragment object to convert into a persisted one.
- snapshot: A shallow copy of the fragment, which will be used to track its changes.






#### <a name="Carbon-PersistedFragment-Factory-Decorated-Object"/>Decorated Object
**Interfaces:** [Carbon.PersistedFragment.Class](#Carbon-PersistedFragment-Class)

> Object decorated by the `Carbon.PersistedFragment.Factory.decorate()` function.


##### <a name="Carbon-PersistedFragment-Factory-Decorated-Object-Methods"/>Methods
##### addType
```typescript 
addType( type:string ):void
```

Adds a type to the PersistedFragment. Relative and prefixed types are resolved before the operation.

*Parameters*

- type: The type to be added.


--

##### hasType
```typescript 
hasType( type:string ):void
```

Returns true if the PersistedFragment contains the type specified. Relative and prefixed types are resolved before the operation.

*Parameters*

- type: The type to look for.


--

##### removeType
```typescript 
removeType( type:string ):void
```

Remove the type specified from the PersistedFragment. Relative and prefixed types are resolved before the operation.

*Parameters*

- type: The type to be removed.





## <a name="Module-Carbon-PersistedNamedFragment"/>Module Carbon/PersistedNamedFragment


**Default export:** [Carbon.PersistedNamedFragment.Class](#Carbon-PersistedNamedFragment-Class)





### <a name="Carbon-PersistedNamedFragment-Class"/>Interface Carbon.PersistedNamedFragment.Class

**Extends:** [Carbon.PersistedFragment.Class](#Carbon-PersistedFragment-Class), [Carbon.NamedFragment.Class](#Carbon-NamedFragment-Class)

> Interface that represents a persisted named fragment of a persisted document.

#### <a name="Carbon-PersistedNamedFragment-Class-Properties"/>Properties
```typescript 
document:Carbon.PersistedDocument.Class 
```

A reference to the persisted document the current named fragment belongs to.





### <a name="Carbon-PersistedNamedFragment-Factory"/>Class Carbon.PersistedNamedFragment.Factory


> Factory class for `Carbon.PersistedNamedFragment.Class` objects.




#### <a name="Carbon-PersistedNamedFragment-Factory-Methods"/>Methods
##### decorate
```typescript 
static decorate( fragment:T extends Carbon.NamedFragment.Class,  snapshot?:Object ):void
```

Decorates the object provided with the properties and methods of a `Carbon.PersistedNamedFragment.Class` object.

*Parameters*

- fragment: The NamedFragment object to convert into a persisted one.
- snapshot: A shallow copy of the fragment, which will be used to track its changes.







## <a name="Module-Carbon-PersistedProtectedDocument"/>Module Carbon/PersistedProtectedDocument


**Default export:** [Carbon.PersistedProtectedDocument.Class](#Carbon-PersistedProtectedDocument-Class)





### <a name="Carbon-PersistedProtectedDocument-Class"/>Interface Carbon.PersistedProtectedDocument.Class

**Extends:** [Carbon.PersistedDocument.Class](#Carbon-PersistedDocument-Class)

> Interface that represents a persisted protected document.

#### <a name="Carbon-PersistedProtectedDocument-Class-Properties"/>Properties
```typescript 
accessControlList?:Carbon.Pointer.Class 
```

A reference to the ACL of the document.




#### <a name="Carbon-PersistedProtectedDocument-Class-Methods"/>Methods
##### getACL
```typescript 
getACL( requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Auth.PersistedACL.Class, Carbon.HTTP.Response.Class ]>
```

Obtains and resolve the ACL of the actual document.

*Parameters*

- requestOptions:  Customizable options for the request.





### <a name="Carbon-PersistedProtectedDocument-Factory"/>Class Carbon.PersistedProtectedDocument.Factory


> Factory class for `Carbon.PersistedProtectedDocument.Class` objects.




#### <a name="Carbon-PersistedProtectedDocument-Factory-Methods"/>Methods
##### decorate
```typescript 
static decorate<T extends Carbon.PersistedDocument.Class>( document:T ):T & Carbon.PersistedProtectedDocument.Class
```

Decorate the object with the properties and methods of a `Carbon.PersistedProtectedDocument.Class` object.

*Parameters*

- document: The persisted document to decorate.


--

##### hasClassProperties
```typescript 
static hasClassProperties( object:Object ):boolean
```

Returns true if the object provided contains the properties and methods of a `Carbon.PersistedProtectedDocument.Class` object.

*Parameters*

- object: The object to check.


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.PersistedProtectedDocument.Class` object.

*Parameters*

- object: The object to check.






#### <a name="Carbon-PersistedProtectedDocument-Factory-Decorated-Object"/>Decorated Object
**Interfaces:** [Carbon.PersistedProtectedDocument.Class](#Carbon-PersistedProtectedDocument-Class)

> The object decorated by `Carbon.PersistedProtectedDocument.Factory.decorate()` method.


##### <a name="Carbon-PersistedProtectedDocument-Factory-Decorated-Object-Methods"/>Methods
##### getACL
```typescript 
getACL( requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Auth.PersistedACL.Class, Carbon.HTTP.Response.Class ]>
```

Obtains and resolve the ACL of the actual document.

*Parameters*

- requestOptions:  Customizable options for the request.





## <a name="Module-Carbon-PersistedResource"/>Module Carbon/PersistedResource


**Default export:** [Carbon.PersistedResource.Class](#Carbon-PersistedResource-Class)





### <a name="Carbon-PersistedResource-Class"/>Interface Carbon.PersistedResource.Class


> Interface that represents any persisted resource in the SDK.

#### <a name="Carbon-PersistedResource-Class-Properties"/>Properties
```typescript 
_snapshot:Object 
```

The shallow copy of the resource, which is used to track the changes on the resource.




#### <a name="Carbon-PersistedResource-Class-Methods"/>Methods
##### _syncSnapshot
```typescript 
_syncSnapshot():void
```

Updates the snapshot with the data of the resource.


--

##### isDirty
```typescript 
isDirty():void
```

Returns true if the resource presents differences from its snapshot.


--

##### revert
```typescript 
revert():void
```

Revert the changes made to the resource into the state of the snapshot.





### <a name="Carbon-PersistedResource-Factory"/>Class Carbon.PersistedResource.Factory


> Factory class for `Carbon.PersistedResource.Class` objects.




#### <a name="Carbon-PersistedResource-Factory-Methods"/>Methods
##### decorate
```typescript 
static decorate( fragment:T extends Object,  snapshot?:Object ):void
```

Decorates the object provided with the properties and methods of a `Carbon.PersistedResource.Class` object.

*Parameters*

- fragment: The object to convert into a persisted resource one.
- snapshot: A shallow copy of the resource, which will be used to track its changes.


--

##### hasClassProperties
```typescript 
static hasClassProperties( object:Object ):boolean
```

Returns true if the object provided has the properties and methods of a `Carbon.PersistedResource.Class` object.

*Parameters*

- object






#### <a name="Carbon-PersistedResource-Factory-Decorated-Object"/>Decorated Object
**Interfaces:** [Carbon.PersistedResource.Class](#Carbon-PersistedResource-Class)

> Object decorated by the `Carbon.PersistedResource.Factory.decorate()` function.

##### <a name="Carbon-PersistedResource-Factory-Decorated-Object-Properties"/>Properties
```typescript 
_snapshot:Object 
```

The shallow copy of the resource, which is used to track the changes on the resource.




##### <a name="Carbon-PersistedResource-Factory-Decorated-Object-Methods"/>Methods
##### _syncSnapshot
```typescript 
_syncSnapshot():void
```

Updates the snapshot with the data of the resource.


--

##### isDirty
```typescript 
isDirty():void
```

Returns true if the resource presents differences from its snapshot.


--

##### revert
```typescript 
revert():void
```

Revert the changes made to the resource into the state of the snapshot.





## <a name="Module-Carbon-Platform"/>Module Carbon/Platform



#### <a name="Carbon-Platform-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| Agents | [Carbon/Platform/Agents](#Module-Carbon-Platform-Agents) |
| Auth | [Carbon/Platform/Auth](#Module-Carbon-Platform-Auth) |
| PersistedAgent | [Carbon/Platform/PersistedAgent](#Module-Carbon-Platform-PersistedAgent) |




## <a name="Module-Carbon-Platform-Agents"/>Module Carbon/Platform/Agents


**Default export:** [Carbon.Platform.Agents.Class](#Carbon-Platform-Agents-Class)





### <a name="Carbon-Platform-Agents-Class"/>Class Carbon.Platform.Agents.Class

**Extends:** [Carbon.Auth.Agents.Class](#Carbon-Auth-Agents-Class)

> Class for manage Agents of an platform context.


#### <a name="Carbon-Platform-Agents-Class-Constructor"/>Constructor
```typescript 
Class( context:Carbon )
```


*Parameters*

- context: The platform context where to manage its Agents.



#### <a name="Carbon-Platform-Agents-Class-Methods"/>Methods

##### get
```typescript 
get( agentURI:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.Platform.PersistedAgent.Class, Carbon.HTTP.Response.Class ]>
```

Retrieves the platform agent specified from the current platform context.

*Parameters*

- agentURI: The URI of the platform agent to retrieve.
- requestOptions






## <a name="Module-Carbon-Platform-Auth"/>Module Carbon/Platform/Auth


**Default export:** [Carbon.Platform.Auth.Class](#Carbon-Platform-Auth-Class)





### <a name="Carbon-Platform-Auth-Class"/>Class Carbon.Platform.Auth.Class


> Implementation of `Carbon.Auth.Class` abstract class, that will manage the authentication and authorization specific of a Platform Context.


#### <a name="Carbon-Platform-Auth-Class-Constructor"/>Constructor
```typescript 
Class( context:Carbon.Platform.Context )
```


*Parameters*

- context


#### <a name="Carbon-Platform-Auth-Class-Properties"/>Properties

```typescript 
roles:Carbon.Platform.Roles.Class 
```

Instance of `Carbon.Platform.Roles.Class`, for managing the roles of the current context.






## <a name="Module-Carbon-Pointer"/>Module Carbon/Pointer


**Default export:** [Carbon.Pointer.Class](#Carbon-Pointer-Class)





### <a name="Carbon-Pointer-Class"/>Interface Carbon.Pointer.Class


> Interface that represents any element that can be referenced by an URI.

#### <a name="Carbon-Pointer-Class-Properties"/>Properties
```typescript 
_id:string 
```

Private variable for the URI that identifies the pointer.

--

```typescript 
_resolved:boolean 
```

Private variable that indicates if the pointer has been resolved.

--

```typescript 
id:string 
```

Accessor for the _id variable.




#### <a name="Carbon-Pointer-Class-Methods"/>Methods
##### isResolved
```typescript 
isResolved():boolean
```

Returns true if the pointer has been resolved. It checks the `_resolved` property.


--

##### resolve
```typescript 
resolve<T>():Promise<[ T & Carbon.PersistedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Resolves the pointer. This function throw an Error if it has no been configured by another decorator.





### <a name="Carbon-Pointer-Library"/>Interface Carbon.Pointer.Library


> Interface that represents resources that can manage pointers.


#### <a name="Carbon-Pointer-Library-Methods"/>Methods
##### getPointer
```typescript 
getPointer( id:string ):boolean
```

Returns the pointer referenced by the URI provided. If none exists, an empty pointer should be created.

*Parameters*

- id


--

##### hasPointer
```typescript 
hasPointer( id:string ):boolean
```

Returns true if the object that implements this interface has a pointer referenced by the URI provided.

*Parameters*

- id





### <a name="Carbon-Pointer-Validator"/>Interface Carbon.Pointer.Validator


> Interface that represents resources that can validate pointers.


#### <a name="Carbon-Pointer-Validator-Methods"/>Methods
##### inScope
```typescript 
inScope( pointer:Carbon.Pointer.Class ):boolean
```

Returns true if the pointer provided is in the scope of the object that implements this interface.

*Parameters*

- pointer

```typescript 
inScope( id:string ):boolean
```

Returns true if the URI provided is in the scope of the object that implements this interface.

*Parameters*

- id





### <a name="Carbon-Pointer-Factory"/>Class Carbon.Pointer.Factory


> Factory class for `Carbon.Pointer.Class` objects.




#### <a name="Carbon-Pointer-Factory-Methods"/>Methods
##### create
```typescript 
static create( id?:string ):Carbon.Pointer.Class
```

Creates a Pointer object with the ID provided.

*Parameters*

- id


--

##### createFrom
```typescript 
static createFrom<T extends Object>( object:T,  id?:string ):T & Carbon.Pointer.Class
```

Create a Pointer from the object provided with id if provided.

*Parameters*

- object
- id


--

##### decorate
```typescript 
static decorate<T extends Object>( object:T ):T & Carbon.Pointer.Class
```

Decorates the object provided with the properties and methods of a `Carbon.Pointer.Class` object.

*Parameters*

- object


--

##### hasClassProperties
```typescript 
static hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties and methods of a `Carbon.Pointer.Class` object.

*Parameters*

- resource


--

##### is
```typescript 
static is( value:any ):boolean
```

Returns true if the value provided is considered a `Carbon.Pointer.Class` object.

*Parameters*

- value






#### <a name="Carbon-Pointer-Factory-Decorated-Object"/>Decorated Object
**Interfaces:** [Carbon.Pointer.Class](#Carbon-Pointer-Class)

> Object decorated by the `Carbon.Pointer.Factory.decorate()` function.

##### <a name="Carbon-Pointer-Factory-Decorated-Object-Properties"/>Properties
```typescript 
_id:string 
```

Private variable for the URI that identifies the pointer.

--

```typescript 
_resolved:boolean 
```

Private variable that indicates if the pointer has been resolved.

--

```typescript 
id:string 
```

Accessor for the _id variable.




##### <a name="Carbon-Pointer-Factory-Decorated-Object-Methods"/>Methods
##### isResolved
```typescript 
isResolved():boolean
```

Returns true if the pointer has been resolved. It checks the `_resolved` property.


--

##### resolve
```typescript 
resolve<T>():Promise<[ T & Carbon.PersistedDocument.Class, Carbon.HTTP.Response.Class ]>
```

Resolves the pointer. This function throw an Error if it has no been configured by another decorator.





### <a name="Carbon-Pointer-Util"/>Class Carbon.Pointer.Util


> Class with useful functions to manage `Carbon.Pointer.Class` objects.




#### <a name="Carbon-Pointer-Util-Methods"/>Methods
##### getIDs
```typescript 
static getIDs( pointers:Carbon.Pointer.Class[] ):string[]
```

Extracts the IDs of all the pointers provided.

*Parameters*

- pointers: The array of Pointers to obtain their IDs.


--

##### resolveAll
```typescript 
static resolveAll( pointers:Carbon.Pointer.Class[] ):Promise<[ Carbon.Pointer.Class[], Carbon.HTTP.Response.Class[] ]>
```

Calls the `resolve()` method of every pointer, and returns a single Promise with the results of every call.

*Parameters*

- pointers: The array of Pointers to resolve.







## <a name="Module-Carbon-ProtectedDocument"/>Module Carbon/ProtectedDocument


**Default export:** [Carbon.ProtectedDocument.Class](#Carbon-ProtectedDocument-Class)



### <a name="Carbon-ProtectedDocument-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-ProtectedDocument-Class"/>Interface Carbon.ProtectedDocument.Class

**Extends:** [Carbon.Document.Class](#Carbon-Document-Class)

> Interface that represents a persisted blank node of a persisted document.



## <a name="Module-Carbon-RDF"/>Module Carbon/RDF



#### <a name="Carbon-RDF-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| Document | [Carbon/RDF/Document](#Module-Carbon-RDF-Document) |
| List | [Carbon/RDF/List](#Module-Carbon-RDF-List) |
| Literal | [Carbon/RDF/Literal](#Module-Carbon-RDF-Literal) |
| Node | [Carbon/RDF/Node](#Module-Carbon-RDF-Node) |
| URI | [Carbon/RDF/URI](#Module-Carbon-RDF-URI) |
| Value | [Carbon/RDF/Value](#Module-Carbon-RDF-Value) |




## <a name="Module-Carbon-RDF-Document"/>Module Carbon/RDF/Document


**Default export:** [Carbon.RDF.Document.Class](#Carbon-RDF-Document-Class)





### <a name="Carbon-RDF-Document-Class"/>Interface Carbon.RDF.Document.Class


> Interface that represents an `rdf:Document`.

#### <a name="Carbon-RDF-Document-Class-Properties"/>Properties
```typescript 
@graph:Carbon.RDF.Node.Class[] 
```

The graph content of the current document.

--

```typescript 
@id?:string 
```

The ID URI of the current document.





### <a name="Carbon-RDF-Document-Factory"/>Class Carbon.RDF.Document.Factory


> Factory class for `Carbon.RDF.Document.Class` objects.




#### <a name="Carbon-RDF-Document-Factory-Methods"/>Methods
##### create
```typescript 
static create( resources:Carbon.RDF.Node.Class[],  uri?:string ):Carbon.RDF.Document.Class
```

Returns a `Carbon.RDF.Document.Class` object created with the parameters provided.

*Parameters*

- resources
- uri


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object is a `Carbon.RDF.Document.Class` object.

*Parameters*

- object







### <a name="Carbon-RDF-Document-Parser"/>Class Carbon.RDF.Document.Parser


> Class to parse a JSON-LD string to an array of RDFDocuments.




#### <a name="Carbon-RDF-Document-Parser-Methods"/>Methods

##### parse
```typescript 
parse( input:string ):Promise<any>
```

Parse the a JSON-LD string to an array of RDFDocuments.

*Parameters*

- input






### <a name="Carbon-RDF-Document-Util"/>Class Carbon.RDF.Document.Util


> Class with useful functions to manage `Carbon.RDF.Document.Class` objects.




#### <a name="Carbon-RDF-Document-Util-Methods"/>Methods
##### getBNodeResources
```typescript 
static getBNodeResources( document:Carbon.RDF.Document.Class ):Carbon.RDF.Node.Class[]
```

Returns all the resources that refers to the blank nodes from a document.

*Parameters*

- document


--

##### getDocumentResources
```typescript 
static getDocumentResources( document:Carbon.RDF.Document.Class ):Carbon.RDF.Node.Class[]
```

Returns all the resources that refers to documents from a document.

*Parameters*

- document

```typescript 
static getDocumentResources( document:Carbon.RDF.Node.Class[] ):Carbon.RDF.Node.Class[]
```

Returns all the resources that refers to documents from an array of resources.

*Parameters*

- document


--

##### getDocuments
```typescript 
static getDocuments( objects:Object[] ):Carbon.RDF.Document.Class[]
```

Returns the objects that represents a RDF Document of an array of RDF like objects.

*Parameters*

- objects

```typescript 
static getDocuments( object:Object ):Carbon.RDF.Document.Class[]
```

Returns an array of with the object provided, if it is an RDF Document.

*Parameters*

- object


--

##### getFragmentResources
```typescript 
static getFragmentResources( document:Carbon.RDF.Document.Class,  documentResource?:Carbon.RDF.Node.Class ):Carbon.RDF.Node.Class[]
```

Returns all the resources that refers to fragments from a document. If documentResource is provided, it will return the fragments of the specified document.

*Parameters*

- document
- documentResource

```typescript 
static getFragmentResources( document:Carbon.RDF.Document.Class,  documentResourceURI?:string ):Carbon.RDF.Node.Class[]
```

Returns all the resources that refers to fragments from a document. If documentResourceURI is provided, it will return the fragments of the specified URI.

*Parameters*

- document
- documentResourceURI

```typescript 
static getFragmentResources( document:Carbon.RDF.Document.Class,  documentResource?:Carbon.RDF.Node.Class ):Carbon.RDF.Node.Class[]
```

Returns all the resources that refers to fragments from an array of resources. If documentResource is provided, it will return the fragments of the specified document.

*Parameters*

- document
- documentResource

```typescript 
static getFragmentResources( document:Carbon.RDF.Document.Class,  documentResourceURI?:string ):Carbon.RDF.Node.Class[]
```

Returns all the resources that refers to fragments from a document. If documentResourceURI is provided, it will return the fragments of the specified URI.

*Parameters*

- document
- documentResourceURI


--

##### getResources
```typescript 
static getResources( objects:Object[] ):Carbon.RDF.Node.Class
```

Returns all the resources that not are RDF Documents from the array of RDF like objects provided.

*Parameters*

- objects

```typescript 
static getResources( object:Object ):Carbon.RDF.Node.Class
```

Returns all the resources that not are RDF Documents from the RDF like object provided.

*Parameters*

- object







## <a name="Module-Carbon-RDF-List"/>Module Carbon/RDF/List


**Default export:** [Carbon.RDF.List.Class](#Carbon-RDF-List-Class)





### <a name="Carbon-RDF-List-Class"/>Interface Carbon.RDF.List.Class


> Interface that represents an `rdf:List`.

#### <a name="Carbon-RDF-List-Class-Properties"/>Properties
```typescript 
@list:Carbon.RDF.Value.Class[] 
```

Array if the elements in the list.





### <a name="Carbon-RDF-List-Factory"/>Class Carbon.RDF.List.Factory


> Factory class for `Carbon.RDF.List.Class` objects.




#### <a name="Carbon-RDF-List-Factory-Methods"/>Methods
##### is
```typescript 
static is( value:any ):boolean
```

Returns true if the object provided is considered a `Carbon.RDF.List.Class` object.

*Parameters*

- value







## <a name="Module-Carbon-RDF-Literal"/>Module Carbon/RDF/Literal


**Default export:** [Carbon.RDF.Literal.Class](#Carbon-RDF-Literal-Class)

#### <a name="Carbon-RDF-Literal-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| Serializer | [Carbon/RDF/Literal/Serializer](#Module-Carbon-RDF-Literal-Serializer) |
| Serializers | [Carbon/RDF/Literal/Serializers](#Module-Carbon-RDF-Literal-Serializers) |




### <a name="Carbon-RDF-Literal-Class"/>Interface Carbon.RDF.Literal.Class


> Interface that represents an `rdf:Literal`.

#### <a name="Carbon-RDF-Literal-Class-Properties"/>Properties
```typescript 
@type?:string 
```

The URI of the XSD type of the literal.

--

```typescript 
@value:string 
```

The actual string value if the literal.





### <a name="Carbon-RDF-Literal-Factory"/>Class Carbon.RDF.Literal.Factory


> Factory class for `Carbon.RDF.Literal.Class` objects.




#### <a name="Carbon-RDF-Literal-Factory-Methods"/>Methods
##### from
```typescript 
static from():void
```

Convert the value provided to a `Carbon.RDF.Literal.Class` object.


--

##### hasType
```typescript 
static hasType( value:Carbon.RDF.Literal.Class,  type:string ):boolean
```

Returns true if the Literal has the type specified.

*Parameters*

- value
- type


--

##### is
```typescript 
static is( value:any ):boolean
```

Returns true if the object provided is considered a `Carbon.RDF.Literal.Class` object.

*Parameters*

- value


--

##### parse
```typescript 
static parse( literal:Carbon.RDF.Literal.Class ):any
```

Parse the Literal object to the respective JavaScript type.
Returns `null` if the Literal can't be parsed.

*Parameters*

- literal







## <a name="Module-Carbon-RDF-Literal-Serializer"/>Module Carbon/RDF/Literal/Serializer


**Default export:** [Carbon.RDF.Literal.Serializer.Class](#Carbon-RDF-Literal-Serializer-Class)





### <a name="Carbon-RDF-Literal-Serializer-Class"/>Interface Carbon.RDF.Literal.Serializer.Class

**Extends:** [Carbon.Resource.Class](#Carbon-Resource-Class)

> Interface that serializer classes must implement.


#### <a name="Carbon-RDF-Literal-Serializer-Class-Methods"/>Methods
##### serialize
```typescript 
serialize( value:any ):string
```

Method that serialize the provided element into a string value.

*Parameters*

- value: Value to be serialized.





## <a name="Module-Carbon-RDF-Literal-Serializers"/>Module Carbon/RDF/Literal/Serializers



#### <a name="Carbon-RDF-Literal-Serializers-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| XSD | [Carbon/RDF/Literal/Serializers/XSD](#Module-Carbon-RDF-Literal-Serializers-XSD) |




## <a name="Module-Carbon-RDF-Literal-Serializers-XSD"/>Module Carbon/RDF/Literal/Serializers/XSD





### <a name="Carbon-RDF-Literal-Serializers-XSD-Properties"/>Properties
```typescript 
static booleanSerializer:Carbon.RDF.Literal.Serializes.XSD.BooleanSerializer 
```

The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.BooleanSerializer`

--

```typescript 
static dateSerializer:Carbon.RDF.Literal.Serializes.XSD.DateSerializer 
```

The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.DateSerializer`.

--

```typescript 
static dateTimeSerializer:Carbon.RDF.Literal.Serializes.XSD.DateTimeSerializer 
```

The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.DateTimeSerializer`.

--

```typescript 
static floatSerializer:Carbon.RDF.Literal.Serializes.XSD.FloatSerializer 
```

The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.FloatSerializer`.

--

```typescript 
static integerSerializer:Carbon.RDF.Literal.Serializes.XSD.IntegerSerializer 
```

The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.IntegerSerializer`.

--

```typescript 
static stringSerializer:Carbon.RDF.Literal.Serializes.XSD.StringSerializer 
```

The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.StringSerializer`.

--

```typescript 
static timeSerializer:Carbon.RDF.Literal.Serializes.XSD.TimeSerializer 
```

The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.TimeSerializer`.

--

```typescript 
static unsignedIntegerSerializer:Carbon.RDF.Literal.Serializes.XSD.UnsignedIntegerSerializer 
```

The already exposed instance of the class `Carbon.RDF.Literal.Serializes.XSD.UnsignedIntegerSerializer`.






### <a name="Carbon-RDF-Literal-Serializes-XSD-BooleanSerializer"/>Class Carbon.RDF.Literal.Serializes.XSD.BooleanSerializer


> Class that can serialize any variable to a string literal representation its truth value.
Instead of instantiating this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.booleanSerializer`.




#### <a name="Carbon-RDF-Literal-Serializes-XSD-BooleanSerializer-Methods"/>Methods

##### serialize
```typescript 
serialize( value:any ):string
```

Returns a string representing the truth value from the variable provided.

*Parameters*

- value






### <a name="Carbon-RDF-Literal-Serializes-XSD-DateSerializer"/>Class Carbon.RDF.Literal.Serializes.XSD.DateSerializer


> Class that can serialize a Date object into a string literal with format `YYYY-MM-DD`.
Instead of instantiating this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.dateSerializer`.




#### <a name="Carbon-RDF-Literal-Serializes-XSD-DateSerializer-Methods"/>Methods

##### serialize
```typescript 
serialize( value:any ):string
```

Returns the string with format `YYYY-MM-DD`, of the Date object

*Parameters*

- value






### <a name="Carbon-RDF-Literal-Serializes-XSD-DateTimeSerializer"/>Class Carbon.RDF.Literal.Serializes.XSD.DateTimeSerializer


> Class that can serialize a Date object into a string ISO literal.
Instead of instantiating this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.dateTimeSerializer`.




#### <a name="Carbon-RDF-Literal-Serializes-XSD-DateTimeSerializer-Methods"/>Methods

##### serialize
```typescript 
serialize( value:any ):string
```

Returns the simplified extended ISO format (ISO 8601) of the Date object.

*Parameters*

- value






### <a name="Carbon-RDF-Literal-Serializes-XSD-FloatSerializer"/>Class Carbon.RDF.Literal.Serializes.XSD.FloatSerializer


> Class that can serialize any Number value to a string literal of float.
Instead of instantiating this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.floatSerializer`.




#### <a name="Carbon-RDF-Literal-Serializes-XSD-FloatSerializer-Methods"/>Methods

##### serialize
```typescript 
serialize( value:any ):string
```

Returns a string representing a float from the Number provided.

*Parameters*

- value






### <a name="Carbon-RDF-Literal-Serializes-XSD-IntegerSerializer"/>Class Carbon.RDF.Literal.Serializes.XSD.IntegerSerializer


> Class that can serialize any Number value to a string literal of an integer.
Instead of instantiating this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.integerSerializer`.




#### <a name="Carbon-RDF-Literal-Serializes-XSD-IntegerSerializer-Methods"/>Methods

##### serialize
```typescript 
serialize( value:any ):string
```

Returns a string representing a integer from the Number provided.

*Parameters*

- value






### <a name="Carbon-RDF-Literal-Serializes-XSD-StringSerializer"/>Class Carbon.RDF.Literal.Serializes.XSD.StringSerializer


> Class that can serialize any variable to a string literal representation its truth value.
Instead of instantiating this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.stringSerializer`.




#### <a name="Carbon-RDF-Literal-Serializes-XSD-StringSerializer-Methods"/>Methods

##### serialize
```typescript 
serialize( value:any ):string
```

Returns a string representing the truth value from the variable provided.

*Parameters*

- value






### <a name="Carbon-RDF-Literal-Serializes-XSD-TimeSerializer"/>Class Carbon.RDF.Literal.Serializes.XSD.TimeSerializer


> Class that can serialize a Date object into a literal string with format `HH:mm:ss.sssZ`.
Instead of instantiating this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.timeSerializer`.




#### <a name="Carbon-RDF-Literal-Serializes-XSD-TimeSerializer-Methods"/>Methods

##### serialize
```typescript 
serialize( value:any ):string
```

Returns a string representing the Date object with format `HH:mm:ss.sssZ`.

*Parameters*

- value






### <a name="Carbon-RDF-Literal-Serializes-XSD-UnsignedIntegerSerializer"/>Class Carbon.RDF.Literal.Serializes.XSD.UnsignedIntegerSerializer


> Class that can serialize any Number value to a string literal of an unsigned integer.
Instead of instantiating this class, use the already exposed instance `Carbon.RDF.Literal.Serializes.XSD.unsignedIntegerSerializer`.




#### <a name="Carbon-RDF-Literal-Serializes-XSD-UnsignedIntegerSerializer-Methods"/>Methods

##### serialize
```typescript 
serialize( value:any ):string
```

Returns a string representing an unsigned integer from the Number provided.

*Parameters*

- value






## <a name="Module-Carbon-RDF-Node"/>Module Carbon/RDF/Node


**Default export:** [Carbon.RDF.Node.Class](#Carbon-RDF-Node-Class)





### <a name="Carbon-RDF-Node-Class"/>Interface Carbon.RDF.Node.Class


> Interface that represents an `rdf:Node`.

#### <a name="Carbon-RDF-Node-Class-Properties"/>Properties
```typescript 
@id:string 
```

The ID URI of the current node.





### <a name="Carbon-RDF-Node-Factory"/>Class Carbon.RDF.Node.Factory


> Factory class for `Carbon.RDF.Node.Class` objects.




#### <a name="Carbon-RDF-Node-Factory-Methods"/>Methods
##### create
```typescript 
static create( uri:string ):Carbon.RDF.Node.Class
```

Creates a `Carbon.RDF.Node.Class` object with the URI provided.

*Parameters*

- uri


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.RDF.Node.Class` object.

*Parameters*

- object







### <a name="Carbon-RDF-Node-Util"/>Class Carbon.RDF.Node.Util


> Class with useful functions to manage `Carbon.RDF.Node.Class` objects.




#### <a name="Carbon-RDF-Node-Util-Methods"/>Methods
##### areEqual
```typescript 
static areEqual( node1:Carbon.RDF.Document.Class,  node2:Carbon.RDF.Document.Class ):boolean
```

Returns true if the objects represent the same resource.

*Parameters*

- node1
- node2


--

##### getFreeNodes
```typescript 
static getFreeNodes( object:T extends Object ):Carbon.RDF.Node.Class[]
```

Returns an array with the nodes that are neither a Document nor are contained inside a one.

*Parameters*

- object: The object to evaluate for its free nodes.


--

##### getList
```typescript 
static getList( propertyValues:Array<any> ):Carbon.RDF.List.Class
```

Returns the List object from the provided property of an expanded JSON-LD object.
Returns null if no List object is found.

*Parameters*

- propertyValues


--

##### getProperties
```typescript 
static getProperties( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property searched as an Array with the parsed Literal, Pointer or List.
Returns null if the property is not found, or an empty array if it cannot be parsed.

*Parameters*

- expandedObject
- propertyURI
- pointerLibrary


--

##### getProperty
```typescript 
static getProperty( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property searched, parsed in accordance to the RDF object it is.
Returns null if the property is not found or cannot be parsed.

*Parameters*

- expandedObject
- propertyURI
- pointerLibrary


--

##### getPropertyLanguageMap
```typescript 
static getPropertyLanguageMap( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns an object associating the language with the parsed string literal.
Returns null if the property is not found, or an empty object if it is not a property with language.

*Parameters*

- expandedObject
- propertyURI
- pointerLibrary


--

##### getPropertyList
```typescript 
static getPropertyList( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property searched as an Array with every element parsed to its respective type of element.
Returns null if the property is not found or cannot be parsed.

*Parameters*

- expandedObject
- propertyURI
- pointerLibrary


--

##### getPropertyLiteral
```typescript 
static getPropertyLiteral( expandedObject:any,  propertyURI:string,  literalType:string ):any
```

Returns the property searched as a javascript variable. The property must be an RDF Literal.
Returns null if the property is not found, the type provided not match with the type of the Literal, or cannot be parsed from a Literal.

*Parameters*

- expandedObject
- propertyURI
- literalType


--

##### getPropertyLiteralList
```typescript 
static getPropertyLiteralList( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property list searched as an Array of parsed Literals. It will be filtered no Literal values with the type specified.
Returns null if the property is not found or is not a List.

*Parameters*

- expandedObject
- propertyURI
- pointerLibrary


--

##### getPropertyLiterals
```typescript 
static getPropertyLiterals( expandedObject:any,  propertyURI:string,  literalType:string ):any
```

Returns the property searched as an Array with the parsed Literal.
Returns null if the property is not found, or an empty array if it cannot be parsed.

*Parameters*

- expandedObject
- propertyURI
- literalType


--

##### getPropertyPointer
```typescript 
static getPropertyPointer( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property searched as a Pointer.
Returns null if the property is not found or cannot be parsed as a Pointer.

*Parameters*

- expandedObject
- propertyURI
- pointerLibrary


--

##### getPropertyPointerList
```typescript 
static getPropertyPointerList( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property list searched as an Array of Pointers. It will be filtered no pointer values.
Returns null if the property is not found or is not a List.

*Parameters*

- expandedObject
- propertyURI
- pointerLibrary


--

##### getPropertyPointers
```typescript 
static getPropertyPointers( expandedObject:any,  propertyURI:string,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the property searched as an Array with the parsed Pointer.
Returns an empty array if the property is not found, or the property cannot be parsed as a pointer.

*Parameters*

- expandedObject
- propertyURI
- pointerLibrary


--

##### getPropertyURI
```typescript 
static getPropertyURI( node:Carbon.RDF.Node.Class,  predicate:string ):string
```

Returns the URI from a property resource in the Node object.
Returns `null` if the property doesn't exists or the URI is not found.

*Parameters*

- node
- predicate


--

##### getPropertyURIs
```typescript 
static getPropertyURIs( expandedObject:any,  propertyURI:string ):any
```

Returns the URIs of the property searched.
Returns null if the property is not found or an empty array if no URI was found.

*Parameters*

- expandedObject
- propertyURI


--

##### getTypes
```typescript 
static getTypes( object:Object ):string[]
```

Returns an array with the types of the Node provided.

*Parameters*

- object: The Node to evaluate.


--

##### hasType
```typescript 
static hasType( object:Object,  type:string ):boolean
```

Returns true if the Node provided has the specified type.

*Parameters*

- object: The Node to evaluate.
- type: The type to look for it existence.







## <a name="Module-Carbon-RDF-URI"/>Module Carbon/RDF/URI


**Default export:** [Carbon.RDF.URI.Class](#Carbon-RDF-URI-Class)





### <a name="Carbon-RDF-URI-Class"/>Class Carbon.RDF.URI.Class


> Wrapper class for a URI string value.


#### <a name="Carbon-RDF-URI-Class-Constructor"/>Constructor
```typescript 
Class( stringValue:string )
```


*Parameters*

- stringValue: The string that represents the URI.


#### <a name="Carbon-RDF-URI-Class-Properties"/>Properties

```typescript 
stringValue:string 
```

The string value of the URI object.




#### <a name="Carbon-RDF-URI-Class-Methods"/>Methods

##### toString
```typescript 
toString():string
```

Returns a string that represents the URI of the class.






### <a name="Carbon-RDF-URI-Util"/>Class Carbon.RDF.URI.Util


> Class with useful functions to manage URI strings.




#### <a name="Carbon-RDF-URI-Util-Methods"/>Methods
##### generateBNodeID
```typescript 
static generateBNodeID():void
```

Returns an ID for a BlankNode using an universally unique identifier (UUID).


--

##### getDocumentURI
```typescript 
static getDocumentURI( uri:string ):void
```

Returns the URI that just reference to the Document of the URI provided.

*Parameters*

- uri


--

##### getFragment
```typescript 
static getFragment( uri:string ):string
```

Returns the name of the fragment in the URI provided. If no fragment exists in the URI, null will be returned.

*Parameters*

- uri


--

##### getParameters
```typescript 
static getParameters( uri:string ):Map<string, string | string[]>
```

Returns the query parameters of the URI provided in form of a Map.

*Parameters*

- uri


--

##### getRelativeURI
```typescript 
static getRelativeURI( absoluteURI:string,  base:string ):string
```

Returns the relative URI from a base URI provided.

*Parameters*

- absoluteURI
- base


--

##### getSlug
```typescript 
static getSlug( uri:string ):string
```

Returns the slug of the URI. It takes an ending slash as part as the slug.

*Parameters*

- uri


--

##### hasFragment
```typescript 
static hasFragment( uri:string ):boolean
```

Returns true if the URI provided contains a fragment.

*Parameters*

- uri


--

##### hasProtocol
```typescript 
static hasProtocol( uri:string ):boolean
```

Returns true if the URI provided has a protocol.

*Parameters*

- uri


--

##### hasQuery
```typescript 
static hasQuery( uri:string ):boolean
```

Returns true if the URI provided contains query parameters.

*Parameters*

- uri


--

##### isAbsolute
```typescript 
static isAbsolute( uri:string ):boolean
```

Returns true if the URI provided is absolute.

*Parameters*

- uri


--

##### isBNodeID
```typescript 
static isBNodeID( uri:string ):boolean
```

Returns true if the URI provided reference to a BlankNode.

*Parameters*

- uri


--

##### isBaseOf
```typescript 
static isBaseOf( baseURI:string,  uri:string ):boolean
```

Return true if the first URI is parent of the second URI provided.

*Parameters*

- baseURI
- uri


--

##### isFragmentOf
```typescript 
static isFragmentOf( fragmentURI:string,  uri:string ):boolean
```

Returns true if the first URI is a fragment od the second URI provided.

*Parameters*

- fragmentURI
- uri


--

##### isPrefixed
```typescript 
static isPrefixed( uri:string ):boolean
```

Returns true if the URI provided has a prefix.

*Parameters*

- uri


--

##### isRelative
```typescript 
static isRelative( uri:string ):boolean
```

Returns true if the URI provided is relative.

*Parameters*

- uri


--

##### prefix
```typescript 
static prefix( uri:string,  prefix:string,  prefixURI:string ):string
```

Replace a base of a URI with the prefix provided. If the prefix can not be resolved, the URI provided will be returned.

*Parameters*

- uri
- prefix
- prefixURI

```typescript 
static prefix( uri:string,  objectSchema:Carbon.ObjectSchema.DigestedObjectSchema ):string
```

Replace the base of a URI with a prefix in accordance with the ObjectSchema provided. If the prefix can not be resolved, the URI provided will be returned.

*Parameters*

- uri
- objectSchema


--

##### removeProtocol
```typescript 
static removeProtocol( uri:string ):string
```

Removes the protocol of the URI provided

*Parameters*

- uri


--

##### resolve
```typescript 
static resolve( parentURI:string,  childURI:string ):string
```

Return a URI formed from a parent URI and a relative child URI.

*Parameters*

- parentURI
- childURI







## <a name="Module-Carbon-RDF-Value"/>Module Carbon/RDF/Value


**Default export:** [Carbon.RDF.Value.Class](#Carbon-RDF-Value-Class)





### <a name="Carbon-RDF-Value-Class"/>Interface Carbon.RDF.Value.Class


> Interface that represents an `rdf:Value`.

#### <a name="Carbon-RDF-Value-Class-Properties"/>Properties
```typescript 
@id?:string 
```

The ID URI of the current value.

--

```typescript 
@type?:string 
```

The URI if the XSD type of the possible value.

--

```typescript 
@value?:string 
```

The possible string value if the current object value.





### <a name="Carbon-RDF-Value-Util"/>Class Carbon.RDF.Value.Util


> Class with useful functions to manage `Carbon.RDF.Value.Class` objects.




#### <a name="Carbon-RDF-Value-Util-Methods"/>Methods
##### parseValue
```typescript 
static parseValue( propertyValue:Carbon.RDF.Value.Class,  pointerLibrary:Carbon.Pointer.Library ):any
```

Returns the parsed object from an Literal, Node, or List.
Returns null if it cannot be parsed

*Parameters*

- propertyValue
- pointerLibrary







## <a name="Module-Carbon-RDFRepresentation"/>Module Carbon/RDFRepresentation


**Default export:** [Carbon.RDFRepresentation.Class](#Carbon-RDFRepresentation-Class)



### <a name="Carbon-RDFRepresentation-Properties"/>Properties
```typescript 
static RDF_CLASS:string 
```


--

```typescript 
static SCHEMA:Carbon.ObjectSchema.Class 
```







### <a name="Carbon-RDFRepresentation-Class"/>Interface Carbon.RDFRepresentation.Class

**Extends:** [Carbon.PersistedFragment.Class](#Carbon-PersistedFragment-Class)

> Interface that represents a persisted NonRDFDocument.

#### <a name="Carbon-RDFRepresentation-Class-Properties"/>Properties
```typescript 
mediaType:string 
```

The media type of the NonRDFDocument the current document represents.

--

```typescript 
size:number 
```

The number of bytes the NonRDFDocument have.





### <a name="Carbon-RDFRepresentation-Factory"/>Class Carbon.RDFRepresentation.Factory


> Factory class for `Carbon.RDFRepresentation.Class` objects.




#### <a name="Carbon-RDFRepresentation-Factory-Methods"/>Methods
##### hasClassProperties
```typescript 
static hasClassProperties( resource:Object ):boolean
```

Returns true if the object provided has the properties of a `Carbon.RDFRepresentation.Class` object.

*Parameters*

- resource


--

##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.RDFRepresentation.Class` object.

*Parameters*

- object







## <a name="Module-Carbon-Resource"/>Module Carbon/Resource


**Default export:** [Carbon.Resource.Class](#Carbon-Resource-Class)





### <a name="Carbon-Resource-Class"/>Interface Carbon.Resource.Class

**Extends:** [Carbon.Pointer.Class](#Carbon-Pointer-Class)

> Interface that represents a persisted blank node of a persisted document.

#### <a name="Carbon-Resource-Class-Properties"/>Properties
```typescript 
types:string 
```

An array with the types of the resource.




#### <a name="Carbon-Resource-Class-Methods"/>Methods
##### addType
```typescript 
addType( type:string ):void
```

Adds a type to the current resource.

*Parameters*

- type: The type to be added.


--

##### hasType
```typescript 
hasType( type:string ):void
```

Returns true if the current resource contains the type specified.

*Parameters*

- type: The type to look for.


--

##### removeType
```typescript 
removeType( type:string ):void
```

Remove the type specified from the current resource.

*Parameters*

- type: The type to be removed.





### <a name="Carbon-Resource-Factory"/>Class Carbon.Resource.Factory


> Factory class for `Carbon.Resource.Class` objects.




#### <a name="Carbon-Resource-Factory-Methods"/>Methods
##### create
```typescript 
static create( id?:string,  types?:string[] ):Carbon.Resource.Class
```

Creates a Resource object with the id and types provided.

*Parameters*

- id
- types


--

##### createFrom
```typescript 
static createFrom<T extends Object>( object:T,  id?:string,  types?:string[] ):T & Carbon.Resource.Class
```

Creates a Resource object with the id and types provided.

*Parameters*

- object
- id
- types


--

##### decorate
```typescript 
static decorate<T extends Object>( object:T ):T & Carbon.Resource.Class
```

Decorates the object provided with the properties and methods of a `Carbon.Resource.Class` object.

*Parameters*

- object


--

##### hasClassProperties
```typescript 
static hasClassProperties( object:Object ):boolean
```

Returns true if the object provided has the properties of a `Carbon.Resource.Class` object.

*Parameters*

- object


--

##### is
```typescript 
static is( resource:Object ):boolean
```

Returns true if the object provided is considered a `Carbon.Resource.Class` object.

*Parameters*

- resource






#### <a name="Carbon-Resource-Factory-Decorated-Object"/>Decorated Object
**Interfaces:** [Carbon.Resource.Class](#Carbon-Resource-Class)

> Object decorated by the `Carbon.Resource.Factory.decorate()` function.


##### <a name="Carbon-Resource-Factory-Decorated-Object-Methods"/>Methods
##### addType
```typescript 
addType( type:string ):void
```

Adds a type to the Resource.

*Parameters*

- type: The type to be added.


--

##### hasType
```typescript 
hasType( type:string ):void
```

Returns true if the Resource contains the type specified.

*Parameters*

- type: The type to look for.


--

##### removeType
```typescript 
removeType( type:string ):void
```

Remove the type specified from the Resource.

*Parameters*

- type: The type to be removed.





## <a name="Module-Carbon-RetrievalPreferences"/>Module Carbon/RetrievalPreferences


**Default export:** [Carbon.RetrievalPreferences.Class](#Carbon-RetrievalPreferences-Class)





### <a name="Carbon-RetrievalPreferences-Class"/>Interface Carbon.RetrievalPreferences.Class


> Interface that represents the preferences that the server can manage when requesting members or children from a document.

#### <a name="Carbon-RetrievalPreferences-Class-Properties"/>Properties
```typescript 
limit?:number 
```

A positive number that indicates the total of element that will be retrieved.

--

```typescript 
offset?:number 
```

If it is non-negative, the elements will be retrieved starring from the offset provided. If offset is negative, the elements retrieved will be that ones that start from that far the last element to the end.

--

```typescript 
orderBy?:Carbon.RetrievalPreferences.OrderByProperty[] 
```

An array of objects that specifies the order of how the platform choose the members or children to retrieve. This not implies the returned elements should be in that order.





### <a name="Carbon-RetrievalPreferences-OrderByProperty"/>Interface Carbon.RetrievalPreferences.OrderByProperty


> Interface that represents the order preferences by a certain property.

#### <a name="Carbon-RetrievalPreferences-OrderByProperty-Properties"/>Properties
```typescript 
@id:string 
```

The URI of the property. This URI can also be prefixed or a relative one.

--

```typescript 
@language?:string 
```

If the property has multiple languages, this elements helps to choose which language will be the one to be used.

--

```typescript 
@type?:"numeric" | "string" | "boolean" | "dateTime" 
```

The type of property it is. The types actually supported are: `numeric`, `string`, `boolean` and `dateTime`.





### <a name="Carbon-RetrievalPreferences-Factory"/>Class Carbon.RetrievalPreferences.Factory


> Factory class for `Carbon.RetrievalPreferences.Class` objects.




#### <a name="Carbon-RetrievalPreferences-Factory-Methods"/>Methods
##### is
```typescript 
static is( object:Object ):boolean
```

Returns true if the object provided has the properties of a `Carbon.RetrievalPreferences.Class` object.

*Parameters*

- object: The object to check.







### <a name="Carbon-RetrievalPreferences-Util"/>Class Carbon.RetrievalPreferences.Util


> Class with useful functions to manage `Carbon.RetrievalPreferences.Class` objects.




#### <a name="Carbon-RetrievalPreferences-Util-Methods"/>Methods
##### stringifyRetrievalPreferences
```typescript 
static stringifyRetrievalPreferences( retrievalPreferences:Carbon.RetrievalPreferences.Class ):string
```

Convert the `Carbon.RetrievalPreferences.Class` object to a URL query string.

*Parameters*

- retrievalPreferences: The preferences to stringify.







## <a name="Module-Carbon-SDKContext"/>Module Carbon/SDKContext


**Default export:** [Carbon.SDKContext.instance](#Carbon-SDKContext-instance)



### <a name="Carbon-SDKContext-Properties"/>Properties
```typescript 
static instance:Carbon.SDKContext.Class 
```

Instance of `Carbon.SDKContext.Class` that is used as the root parent in every context.






### <a name="Carbon-SDKContext-Class"/>Class Carbon.SDKContext.Class

**Implements:** [Carbon.Context.Class](#Carbon-Context-Class)

> Base class of every Context in the SDK.


#### <a name="Carbon-SDKContext-Class-Constructor"/>Constructor
```typescript 
Class()
```



#### <a name="Carbon-SDKContext-Class-Properties"/>Properties

```typescript 
auth:Carbon.Auth.Class 
```

Instance of an implementation of the `Carbon.Auth.Class` class to manage authentications and authorizations in the context.
In an instance of the SDKContext this property is set to `null`, and its children contexts must instantiate a valid implementation of the `Carbon.Auth.Class` abstract class.

--

```typescript 
documents:Carbon.Documents.Class 
```

Instance of `Carbon.Documents.Class` class to manage all the documents in the context.

--

```typescript 
parentContext:Carbon.Context.Class 
```

Parent context of the current context. For an instance of `Carbon.SDKContext.Class`, this is set to null since it is the root parent of every context in the SDK.




#### <a name="Carbon-SDKContext-Class-Methods"/>Methods

##### clearObjectSchema
```typescript 
clearObjectSchema( type?:string ):void
```

Remove the schema of the type specified, or the general schema if no type is provided.

*Parameters*

- type: The URI of the type to remove its schema.


--

##### deleteSetting
```typescript 
deleteSetting( name:string ):void
```

Deletes the setting specified by the name provided from the current context.

*Parameters*

- name: Name of the setting to delete.


--

##### extendObjectSchema
```typescript 
extendObjectSchema( type:string,  objectSchema:Carbon.ObjectSchema.DigestedObjectSchema ):void
```

Extends the schema for a specified type of Resource.
If a schema for the type exists in the parent context, this is duplicated for the actual context, but only the first time this schema is extended.

*Parameters*

- type: The URI of the type to extends its schema.
- objectSchema: The new schema that will extends the previous one.

```typescript 
extendObjectSchema( objectSchema:Carbon.ObjectSchema.DigestedObjectSchema ):void
```

Extends the general schema of the current context.
If a general schema exists in the parent context, this is duplicated for the current context, but only the first time the schema is extended.

*Parameters*

- objectSchema: The new schema that will extends the previous one.


--

##### getBaseURI
```typescript 
getBaseURI():string
```

Returns the base URI of the context. For an instance of `Carbon.SDKContext.Class`, this is an empty string.


--

##### getObjectSchema
```typescript 
getObjectSchema( type?:string ):Carbon.ObjectSchema.DigestedObjectSchema
```

Returns the ObjectSchema for the specified type. If no type is specified, the general object schema of the context is returned.

*Parameters*

- type: The URI of the type to look for its schema.


--

##### getSetting
```typescript 
getSetting( name:string ):any
```

Returns the value of the setting looked for.

*Parameters*

- name: Name of the setting to look for.


--

##### hasObjectSchema
```typescript 
hasObjectSchema( type:string ):boolean
```

Returns true if there is an ObjectSchema for the specified type.

*Parameters*

- type: The URI of the type to look for its schema.


--

##### hasSetting
```typescript 
hasSetting( name:string ):boolean
```

Returns true if the setting sought for has been assign.

*Parameters*

- name: Name of the setting to look for.


--

##### resolve
```typescript 
resolve( relativeURI:string ):string
```

Returns the resolved relative URI specified, in accordance with the scope of the context.

*Parameters*

- relativeURI


--

##### setSetting
```typescript 
setSetting( name:string,  value:any ):void
```

Set a setting in the current context.

*Parameters*

- name: Name of the setting to look for.
- value: The value to store as the setting specified.






## <a name="Module-Carbon-SPARQL"/>Module Carbon/SPARQL



#### <a name="Carbon-SPARQL-Reexports" />Reexports 
| Export name | Original Location | 
| --- | --- |
| RawResultsParserRawResultsParser | [Carbon/SPARQL/RawResultsParser](#Module-Carbon-SPARQL-RawResultsParser) |
| RawResultsRawResults | [Carbon/SPARQL/RawResults](#Module-Carbon-SPARQL-RawResults) |
| SELECTResults | [Carbon/SPARQL/SELECTResults](#Module-Carbon-SPARQL-SELECTResults) |
| Service | [Carbon/SPARQL/Service](#Module-Carbon-SPARQL-Service) |




## <a name="Module-Carbon-SPARQL-RawResults"/>Module Carbon/SPARQL/RawResults


**Default export:** [Carbon.SPARQL.RawResults.Class](#Carbon-SPARQL-RawResults-Class)





### <a name="Carbon-SPARQL-RawResults-BindingObject"/>Interface Carbon.SPARQL.RawResults.BindingObject


> Interface that represents the raw response of a SPARQL query.

#### <a name="Carbon-SPARQL-RawResults-BindingObject-Properties"/>Properties
```typescript 
[ name:string ]:Carbon.SPARQL.RawResults.BindingProperty 
```

An entry of every `vars` requested as the `name` variable, containing the binding property with its value.





### <a name="Carbon-SPARQL-RawResults-BindingProperty"/>Interface Carbon.SPARQL.RawResults.BindingProperty


> Interface that represents every entry of a `Carbon.SPARQL.RawResults.BindingObject`.

#### <a name="Carbon-SPARQL-RawResults-BindingProperty-Properties"/>Properties
```typescript 
datatype?:string 
```

The URI of the type of the binding property. This is only present when the property is of type `literal`.

--

```typescript 
type:string 
```

The type of binding property, it could be `uri`, `literal` or `bnode`.

--

```typescript 
value:string 
```

The string value of binding property.

--

```typescript 
xml:lang?:string 
```

If the property is a `literal` and of data type `xsd:string`, this property indicates if it has an specific language.





### <a name="Carbon-SPARQL-RawResults-Class"/>Interface Carbon.SPARQL.RawResults.Class


> Interface that represents the raw response of a SPARQL query.

#### <a name="Carbon-SPARQL-RawResults-Class-Properties"/>Properties
```typescript 
boolean?:boolean 
```

The result of an `ASK` query.

--

```typescript 
head:{ "vars"?:string[], "links"?:string[] } 
```

Contains an array `vars` with the possible elements inside the results bindings properties. Can also contains an array `link`, that contains URI to further information about the results.

--

```typescript 
results?:{ "bindings":Carbon.SPARQL.RawResults.BindingObject[] } 
```

The results of a `SELECT` query.





### <a name="Carbon-SPARQL-RawResults"/>Class Carbon.SPARQL.RawResults


> Class that specifies the result types of a SPARQL query.



#### <a name="Carbon-SPARQL-RawResults-Properties"/>Properties
```typescript 
static BNODE:string 
```


--

```typescript 
static LITERAL:string 
```


--

```typescript 
static URI:string 
```








### <a name="Carbon-SPARQL-RawResults-Factory"/>Class Carbon.SPARQL.RawResults.Factory


> Factory class for `Carbon.SPARQL.RawResults.Class` objects.




#### <a name="Carbon-SPARQL-RawResults-Factory-Methods"/>Methods
##### hasClassProperties
```typescript 
static hasClassProperties( value:Object ):boolean
```

Returns true if the object provided has the properties of a `Carbon.SPARQL.RawResult.Class` object.

*Parameters*

- value


--

##### is
```typescript 
static is( value:any ):boolean
```

Returns true if the object provided is considered a `Carbon.SPARQL.RawResult.Class` object.

*Parameters*

- value







## <a name="Module-Carbon-SPARQL-RawResultsParser"/>Module Carbon/SPARQL/RawResultsParser


**Default export:** [Carbon.SPARQL.RawResultParser.Class](#Carbon-SPARQL-RawResultParser-Class)





### <a name="Carbon-SPARQL-RawResultsParser"/>Class Carbon.SPARQL.RawResultsParser

**Implements:** [Carbon.HTTP.Parser.Class](#Carbon-HTTP-Parser-Class)&lt;[Carbon.SPARQL.RawResults.Class](#Carbon-SPARQL-RawResults-Class)&gt;

> Class to parse SPARQL Query result to a `Carbon.SPARQL.RawResult.Class` object.




#### <a name="Carbon-SPARQL-RawResultsParser-Methods"/>Methods

##### parse
```typescript 
parse( input:string ):Promise<Carbon.SPARQL.RawResult.Class>
```

Parse the SPARQL Query string result to a `Carbon.SPARQL.RawResult.Class` object.

*Parameters*

- input






## <a name="Module-Carbon-SPARQL-SELECTResults"/>Module Carbon/SPARQL/SELECTResults


**Default export:** [Carbon.SPARQL.SELECTResults.Class](#Carbon-SPARQL-SELECTResults-Class)





### <a name="Carbon-SPARQL-SELECTResults-BindingObject"/>Interface Carbon.SPARQL.SELECTResults.BindingObject


> Interface that represents an entry of a element asked for in the SELECT query.

#### <a name="Carbon-SPARQL-SELECTResults-BindingObject-Properties"/>Properties
```typescript 
[ binding:string ]:any 
```

An entry peer every `vars` selected for, which contains the parsed value requested. This elements can be from every literal type (`String`, `Number`, `Date`, etc.), to a `Carbon.Pointer.Class` if it is an URI.





### <a name="Carbon-SPARQL-SELECTResults-Class"/>Interface Carbon.SPARQL.SELECTResults.Class


> Interface that represents a parsed response of a SELECT SPARQL query.

#### <a name="Carbon-SPARQL-SELECTResults-Class-Properties"/>Properties
```typescript 
bindings:Carbon.SPARQL.SELECTResult.BindingObject[] 
```

Array with the entries of the parsed elements asked in the query.

--

```typescript 
vars:string[] 
```

Array of strings that contains the names of the elements asked in the query.





## <a name="Module-Carbon-SPARQL-Service"/>Module Carbon/SPARQL/Service


**Default export:** [Carbon.SPARQL.Service.Class](#Carbon-SPARQL-Service-Class)





### <a name="Carbon-SPARQL-Service-Class"/>Class Carbon.SPARQL.Service.Class


> Executes SPARQL queries and updates.




#### <a name="Carbon-SPARQL-Service-Class-Methods"/>Methods
##### executeASKQuery
```typescript 
static executeASKQuery( url:string,  askQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ boolean, Carbon.HTTP.Response.Class ]>
```

Executes an ASK Query and returns a boolean.

*Parameters*

- url
- askQuery
- requestOptions


--

##### executeRawASKQuery
```typescript 
static executeRawASKQuery( url:string,  askQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes an ASK Query and returns a raw application/sparql-results+json object.

*Parameters*

- url
- askQuery
- requestOptions


--

##### executeRawCONSTRUCTQuery
```typescript 
static executeRawCONSTRUCTQuery( url:string,  constructQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ string, Carbon.HTTP.Response.Class ]>
```

Executes a CONSTRUCT Query and returns a string with the resulting model.

*Parameters*

- url
- constructQuery
- requestOptions


--

##### executeRawDESCRIBEQuery
```typescript 
static executeRawDESCRIBEQuery( url:string,  describeQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ string, Carbon.HTTP.Response.Class ]>
```

Executes a DESCRIBE Query and returns a string with the resulting model.

*Parameters*

- url
- describeQuery
- requestOptions


--

##### executeRawSELECTQuery
```typescript 
static executeRawSELECTQuery( url:string,  selectQuery:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.RawResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes a SELECT Query and returns a raw application/sparql-results+json object.

*Parameters*

- url
- selectQuery
- requestOptions


--

##### executeSELECTQuery
```typescript 
static executeSELECTQuery( url:string,  selectQuery:string,  pointerLibrary:Carbon.Pointer.Library,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<[ Carbon.SPARQL.SELECTResults.Class, Carbon.HTTP.Response.Class ]>
```

Executes a SELECT Query and parses the results.

*Parameters*

- url
- selectQuery
- pointerLibrary
- requestOptions


--

##### executeUPDATE
```typescript 
static executeUPDATE( url:string,  update:string,  requestOptions?:Carbon.HTTP.Request.Options ):Promise<Carbon.HTTP.Response.Class>
```

Executes an UPDATE query.

*Parameters*

- url
- update
- requestOptions







## <a name="Module-Carbon-Settings"/>Module Carbon/Settings


**Default export:** [Carbon.settings](#Carbon-settings)
> 
A object of type `Carbon.settings.CarbonSettings`, which is the default settings of a Carbon instance:
* domain: `"carbonldp.com"`
* http.ssl: `true`
* auth.method: `Carbon.Auth.Method.TOKEN`
* platform.container: `"platform/"`
* platform.apps.container: `"apps/"`
* platform.agents.container: `"agents/"`
* platform.roles.container: `"roles/"`
* vocabulary: `"vocabulary/#"`






### <a name="Carbon-Settings-Class"/>Interface Carbon.Settings.Class


> Interface that represents the possible settings used by the SDK.

#### <a name="Carbon-Settings-Class-Properties"/>Properties
```typescript 
auth.method?:Carbon.Auth.Method 
```

(Not supported) Indicates the default method of authentication to use.

--

```typescript 
domain?:string 
```

The domain of the Carbon LDP server to be used.

--

```typescript 
http.ssl?:boolean 
```

Indicates if the server uses secure HTTP (HTTPS) or not.

--

```typescript 
platform.agents.container?:string 
```

Relative URI to any context, that indicates the slug of the agents container.

--

```typescript 
platform.apps.container?:string 
```

Relative URI that indicates the slug of the apps container.

--

```typescript 
platform.container?:string 
```

URI relative to the domain that indicates the slug of the platform container.

--

```typescript 
platform.roles.container?:string 
```

Relative URI to any context, that indicates the slug of the roles container.

--

```typescript 
vocabulary?:string 
```

URI to be used as the default vocabulary. If a relative one is provided, the URI will be resolved by the context were it has been requested.





## <a name="Module-Carbon-Utils"/>Module Carbon/Utils

> Class with useful functions used in the SDK.





### <a name="Carbon-Utils-Methods"/>Methods
##### extend
```typescript 
static extend( target:Object,  ...objects:Objects[] ):void
```

Extends the target object’s properties with the properties of the objects provided.

*Parameters*

- target: The object to extend.
- ...objects: Every parameter left from where to extract the properties to be added.


--

##### forEachOwnProperty
```typescript 
static forEachOwnProperty( object:Object,  action:( name:string, value:any ) => boolean ):void
```

Executes an action for each own property of the object.

*Parameters*

- object: The object to iterate over its properties.
- action: A function that will be called for every property own property in the object. The loop will break if the action function returns `false`.


--

##### hasFunction
```typescript 
static hasFunction( object:Object,  name:string ):boolean
```

Checks if the object has a property with that name and if it that property is a function.

*Parameters*

- object
- name


--

##### hasProperty
```typescript 
static hasProperty( object:Object,  name:string ):boolean
```

Checks if the object has a property with that name.

*Parameters*

- object
- name


--

##### hasPropertyDefined
```typescript 
static hasPropertyDefined( object:Object,  name:string ):boolean
```

Checks if an object has a property defined under that name (even if its value is undefined).

*Parameters*

- object
- name


--

##### isArray
```typescript 
static isArray( value:any ):boolean
```

Checks if the value passed is an array.

*Parameters*

- value


--

##### isBoolean
```typescript 
static isBoolean( value:any ):boolean
```

Checks if the value passed is a boolean.

*Parameters*

- value


--

##### isDate
```typescript 
static isDate( value:any ):boolean
```

Checks if the value passed is a Date object.

*Parameters*

- value


--

##### isDefined
```typescript 
static isDefined( value:any ):boolean
```

Checks if the value passed is defined.

*Parameters*

- value


--

##### isDouble
```typescript 
static isDouble( value:any ):boolean
```

Checks if the value passed is a double.

*Parameters*

- value


--

##### isFunction
```typescript 
static isFunction( value:any ):boolean
```

Checks if the value passed is a function.

*Parameters*

- value


--

##### isInteger
```typescript 
static isInteger( value:any ):boolean
```

Checks if the value passed is an integer.

*Parameters*

- value


--

##### isMap
```typescript 
static isMap( value:any ):boolean
```

Checks if the value passed is an ES6 Map.

*Parameters*

- value


--

##### isNull
```typescript 
static isNull( value:any ):boolean
```

Checks if the value passed is null.

*Parameters*

- value


--

##### isNumber
```typescript 
static isNumber( value:any ):boolean
```

Checks if the value passed is a number.

*Parameters*

- value


--

##### isObject
```typescript 
static isObject( value:any ):boolean
```

Checks if the value passed is an object (doesn't include null).

*Parameters*

- value


--

##### isString
```typescript 
static isString( value:any ):boolean
```

Checks if the value passed is a string.

*Parameters*

- value


--

##### parseBoolean
```typescript 
static parseBoolean( value:string ):boolean
```

Parses a string into a boolean.

*Parameters*

- value






### <a name="Carbon-Utils-A"/>Class Carbon.Utils.A


> Utility functions related to Arrays.




#### <a name="Carbon-Utils-A-Methods"/>Methods
##### from
```typescript 
static from( iterator:iterator ):array
```

Collects the values of an ES6 iterator and returns an array.

*Parameters*

- iterator


--

##### indexOf
```typescript 
static indexOf<T, W>( array:Array<T>,  searchedElement:W,  comparator?:( element:T, searchedElement:W ) => boolean ):boolean
```

Returns the index of a element searched in an array with a custom comparator function.
If the element was not found `-1` is returned

*Parameters*

- array: The array were to search the element.
- searchedElement: The element searched
- comparator: The function that must compare if the two elements provided are de same.


--

##### joinWithoutDuplicates
```typescript 
static joinWithoutDuplicates( ...arrays:Array<Array<T>> ):Array<T>
```

Takes two or more arrays and joins them while removing duplicates.

*Parameters*

- ...arrays: Every array parameter to merge.







### <a name="Carbon-Utils-M"/>Class Carbon.Utils.M


> Utility functions related to ES6 Maps.




#### <a name="Carbon-Utils-M-Methods"/>Methods
##### extend
```typescript 
static extend( toExtend:Map<K, V>,  ...extenders:Map<K, V>[] ):Map<K, V>
```

Adds to a target Map all the entries of the subsequents Maps provided. If entries with the same key exists between Maps, the entry's value of the first Map provided is preserved.

*Parameters*

- toExtend: Target Map to extend.
- ...extenders: Every other Map parameter, from which the entries to be added to the target Map will be taken.


--

##### from
```typescript 
static from( object:Object ):map
```

Takes an object and creates a map from its properties.

*Parameters*

- object







### <a name="Carbon-Utils-O"/>Class Carbon.Utils.O


> Utility functions related to objects.




#### <a name="Carbon-Utils-O-Methods"/>Methods
##### areEqual
```typescript 
static areEqual( object1:Object,  object2:Object,  config?:{arrays?:boolean, objects?:boolean},  ignore?:{[ key:string ]:boolean} ):boolean
```

Makes a shallow or deep comparison, between all the enumerable properties of the provided objects, depending of the configuration specified.

*Parameters*

- object1: First object to compare.
- object2: Second object to compare.
- config: Object that indicates if the arrays or the objects must have a deep comparison or not. By default the comparison is shallow.
- ignore: Object that indicates there is any property to ignore.


--

##### areShallowlyEqual
```typescript 
static areShallowlyEqual( object1:Object,  object2:Object ):boolean
```

Checks if an object has the same enumerable properties with the same values as another object.

*Parameters*

- object1: First object to compare.
- object2: Second object to compare.


--

##### clone
```typescript 
static clone<T extends Object>( object:T,  config?:{arrays?:boolean, objects?:boolean},  ignore?:{[ key:string ]:boolean} ):T
```

Makes a shallow or deep clone of the object provided depending of the configuration specified.

*Parameters*

- object: The object to copy.
- config: Object that indicates if the arrays or objects must be copied or not. By default, arrays and objects will not be deep copied.
- ignore: Object that indicates there is any property to ignore.


--

##### extend
```typescript 
static extend<T extends Object, W extends Object>( target:T,  source:W,  config?:{arrays?:boolean, objects?:boolean},  ignore?:{[ key:string ]:boolean} ):T & W
```

Extends the target element making a shallow or deep copy of the properties in the source object, depending of the configuration specified.

*Parameters*

- target: The object to extend.
- source: The object to copy.
- config: Object that indicates if the arrays or objects must be copied or not. By default, arrays and objects will not be deep copied.
- ignore: Object that indicates there is any property to ignore.







### <a name="Carbon-Utils-S"/>Class Carbon.Utils.S


> Utility functions related to strings.




#### <a name="Carbon-Utils-S-Methods"/>Methods
##### contains
```typescript 
static contains( string:string,  substring:string ):boolean
```

Checks if a string contains a substring (in any part).

*Parameters*

- string
- substring


--

##### endsWith
```typescript 
static endsWith( string:string,  substring:string ):boolean
```

Checks if a string ends with a substring.

*Parameters*

- string
- substring


--

##### startsWith
```typescript 
static startsWith( string:string,  substring:string ):boolean
```

Checks if a string starts with a substring.

*Parameters*

- string
- substring







### <a name="Carbon-Utils-UUID"/>Class Carbon.Utils.UUID


> Utility functions related to UUIDs.




#### <a name="Carbon-Utils-UUID-Methods"/>Methods
##### generate
```typescript 
static generate():string
```

Generates a new, version 4, UUID.


--

##### is
```typescript 
static is( uuid:string ):string
```

Returns true if the string provided is a UUID (version 1 to 5).

*Parameters*

- uuid






