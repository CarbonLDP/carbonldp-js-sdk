"use strict";
var JasmineExtender_1 = require("./test/JasmineExtender");
var RDF = require("./RDF");
var Utils = require("./Utils");
var ObjectSchema = require("./ObjectSchema");
describe(JasmineExtender_1.module("Carbon/ObjectSchema"), function () {
    it(JasmineExtender_1.isDefined(), function () {
        expect(ObjectSchema).toBeDefined();
        expect(Utils.isObject(ObjectSchema)).toEqual(true);
    });
    describe(JasmineExtender_1.enumeration("Carbon.ObjectSchema.ContainerType", "Enum for the types a container can be."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(ObjectSchema.ContainerType).toBeDefined();
            expect(Utils.isObject(ObjectSchema.ContainerType)).toBe(true);
        });
        it(JasmineExtender_1.hasEnumeral("SET"), function () {
            expect(ObjectSchema.ContainerType.SET).toBeDefined();
        });
        it(JasmineExtender_1.hasEnumeral("LIST"), function () {
            expect(ObjectSchema.ContainerType.LIST).toBeDefined();
        });
        it(JasmineExtender_1.hasEnumeral("LANGUAGE"), function () {
            expect(ObjectSchema.ContainerType.LANGUAGE).toBeDefined();
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.ObjectSchema.DigestedObjectSchema", "Class of a standardized Schema."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(ObjectSchema.DigestedObjectSchema).toBeDefined();
            expect(Utils.isFunction(ObjectSchema.DigestedObjectSchema)).toBe(true);
        });
        var digestedSchema;
        beforeEach(function () {
            digestedSchema = new ObjectSchema.DigestedObjectSchema();
        });
        it(JasmineExtender_1.hasConstructor(), function () {
            expect(digestedSchema).toBeTruthy();
            expect(digestedSchema instanceof ObjectSchema.DigestedObjectSchema).toBe(true);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "base", "string", "This property is initialized with an empty string."), function () {
            expect(digestedSchema.base).toBeDefined();
            expect(Utils.isString(digestedSchema.base)).toBe(true);
            expect(digestedSchema.base).toBe("");
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "prefixes", "Map<string, Carbon.RDF.URI.Class>", "This property is initialized with an empty Map."), function () {
            expect(digestedSchema.prefixes).toBeDefined();
            expect(Utils.isMap(digestedSchema.prefixes)).toBe(true);
            expect(digestedSchema.prefixes.size).toBe(0);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "properties", "Map<string, Carbon.ObjectSchema.DigestedPropertyDefinition>", "This property is initialized with an empty Map."), function () {
            expect(digestedSchema.properties).toBeDefined();
            expect(Utils.isMap(digestedSchema.properties)).toBe(true);
            expect(digestedSchema.properties.size).toBe(0);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "prefixedURIs", "Map<string, Carbon.RDF.URI.Class[]>", "This property is initialized with an empty Map."), function () {
            expect(digestedSchema.prefixedURIs).toBeDefined();
            expect(Utils.isMap(digestedSchema.prefixedURIs)).toBe(true);
            expect(digestedSchema.prefixedURIs.size).toBe(0);
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.ObjectSchema.DigestedPropertyDefinition", "Class for standardized object properties in a Schema."), function () {
        it(JasmineExtender_1.isDefined(), function () {
            expect(ObjectSchema.DigestedPropertyDefinition).toBeDefined();
            expect(Utils.isFunction(ObjectSchema.DigestedPropertyDefinition)).toBe(true);
        });
        var digestedProperty;
        beforeEach(function () {
            digestedProperty = new ObjectSchema.DigestedPropertyDefinition();
        });
        it(JasmineExtender_1.hasConstructor(), function () {
            expect(digestedProperty).toBeTruthy();
            expect(digestedProperty instanceof ObjectSchema.DigestedPropertyDefinition).toBe(true);
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "uri", "Carbon.RDF.URI.Class", "This property is initialized with null."), function () {
            expect(digestedProperty.uri).toBeDefined();
            expect(digestedProperty.uri).toBeNull();
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "literal", "boolean", "This property is initialized with null."), function () {
            expect(digestedProperty.literal).toBeDefined();
            expect(digestedProperty.literal).toBeNull();
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "uri", "Carbon.RDF.URI.Class", "This property is initialized with null."), function () {
            expect(digestedProperty.uri).toBeDefined();
            expect(digestedProperty.uri).toBeNull();
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "literalType", "Carbon.RDF.URI.Class", "This property is initialized with null."), function () {
            expect(digestedProperty.literalType).toBeDefined();
            expect(digestedProperty.literalType).toBeNull();
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "language", "string", "This property is initialized with null."), function () {
            expect(digestedProperty.language).toBeDefined();
            expect(digestedProperty.language).toBeNull();
        });
        it(JasmineExtender_1.hasProperty(JasmineExtender_1.INSTANCE, "containerType", "Carbon.ObjectSchema.ContainerType", "This property is initialized with null."), function () {
            expect(digestedProperty.containerType).toBeDefined();
            expect(digestedProperty.containerType).toBeNull();
        });
    });
    describe(JasmineExtender_1.clazz("Carbon.ObjectSchema.Digester", "Class with options for standardize a JSON-LD Schema."), function () {
        describe(JasmineExtender_1.method(JasmineExtender_1.STATIC, "digestSchema"), function () {
            it(JasmineExtender_1.hasSignature("\n\t\t\t\t\tProcesses a schema to standardize it before using it.\n\t\t\t\t", [
                { name: "schema", type: "Carbon.ObjectSchema.Class" }
            ], { type: "Carbon.ObjectSchema.DigestedObjectSchema" }), function () {
                expect(ObjectSchema.Digester.digestSchema).toBeDefined();
                expect(Utils.isFunction(ObjectSchema.Digester.digestSchema)).toBeDefined();
                var schema = {
                    "skos": "http://www.w3.org/2004/02/skos/core#",
                    "dct": "http://purl.org/dc/terms/",
                    "xsd": "http://www.w3.org/2001/XMLSchema#",
                    "hasTopConcept": {
                        "@id": "skos:hasTopConcept",
                        "@type": "@id",
                        "@container": "@set",
                    },
                    "name": {
                        "@id": "dct:name",
                        "@type": "xsd:string",
                    },
                    "created": {
                        "@id": "dct:created",
                        "@type": "xsd:datetime",
                    },
                };
                var digestedSchema = ObjectSchema.Digester.digestSchema(schema);
                expect(digestedSchema.prefixes.size).toEqual(3);
                expect(digestedSchema.prefixes.has("skos")).toEqual(true);
                expect(digestedSchema.prefixes.get("skos") instanceof RDF.URI.Class).toEqual(true);
                expect(digestedSchema.prefixes.get("skos").toString()).toEqual("http://www.w3.org/2004/02/skos/core#");
                expect(digestedSchema.properties.size).toEqual(3);
                expect(digestedSchema.properties.has("hasTopConcept")).toEqual(true);
                expect(digestedSchema.properties.get("hasTopConcept") instanceof ObjectSchema.DigestedPropertyDefinition).toEqual(true);
                expect(digestedSchema.properties.get("hasTopConcept").literal).toEqual(false);
                expect(digestedSchema.properties.get("hasTopConcept").literalType).toEqual(null);
                expect(digestedSchema.properties.get("hasTopConcept").uri instanceof RDF.URI.Class).toEqual(true);
                expect(digestedSchema.properties.get("hasTopConcept").uri.toString()).toEqual("http://www.w3.org/2004/02/skos/core#hasTopConcept");
                expect(digestedSchema.properties.get("hasTopConcept").containerType).toEqual(ObjectSchema.ContainerType.SET);
                expect(digestedSchema.properties.get("hasTopConcept").language).toEqual(null);
                expect(digestedSchema.properties.has("name")).toEqual(true);
                expect(digestedSchema.properties.get("name") instanceof ObjectSchema.DigestedPropertyDefinition).toEqual(true);
                expect(digestedSchema.properties.get("name").literal).toEqual(true);
                expect(digestedSchema.properties.get("name").literalType instanceof RDF.URI.Class).toEqual(true);
                expect(digestedSchema.properties.get("name").literalType.toString()).toEqual("http://www.w3.org/2001/XMLSchema#string");
                expect(digestedSchema.properties.get("name").uri instanceof RDF.URI.Class).toEqual(true);
                expect(digestedSchema.properties.get("name").uri.toString()).toEqual("http://purl.org/dc/terms/name");
                expect(digestedSchema.properties.get("name").containerType).toEqual(null);
                expect(digestedSchema.properties.get("name").language).toEqual(null);
            });
            it(JasmineExtender_1.hasSignature("\n\t\t\t\t\tProcesses several schemas to standardize and combine them before using them.\n\t\t\t\t", [
                { name: "schemas", type: "Array<Carbon.ObjectSchema.Class>" }
            ], { type: "Carbon.ObjectSchema.DigestedObjectSchema" }), function () {
                expect(ObjectSchema.Digester.digestSchema).toBeDefined();
                expect(Utils.isFunction(ObjectSchema.Digester.digestSchema)).toBeDefined();
                var schemas = [
                    {
                        "skos": "http://www.w3.org/2004/02/skos/core#",
                        "dct": "http://purl.org/dc/terms/",
                        "xsd": "http://www.w3.org/2001/XMLSchema#",
                    },
                    {
                        "hasTopConcept": {
                            "@id": "skos:hasTopConcept",
                            "@type": "@id",
                            "@container": "@set",
                        },
                        "name": {
                            "@id": "dct:name",
                            "@type": "xsd:string",
                        },
                        "created": {
                            "@id": "dct:created",
                            "@type": "xsd:datetime",
                        },
                    },
                ];
                var digestedSchema = ObjectSchema.Digester.digestSchema(schemas);
                expect(digestedSchema.prefixes.size).toEqual(3);
                expect(digestedSchema.prefixes.has("skos")).toEqual(true);
                expect(digestedSchema.prefixes.get("skos") instanceof RDF.URI.Class).toEqual(true);
                expect(digestedSchema.prefixes.get("skos").toString()).toEqual("http://www.w3.org/2004/02/skos/core#");
                expect(digestedSchema.properties.size).toEqual(3);
                expect(digestedSchema.properties.has("hasTopConcept")).toEqual(true);
                expect(digestedSchema.properties.get("hasTopConcept") instanceof ObjectSchema.DigestedPropertyDefinition).toEqual(true);
                expect(digestedSchema.properties.get("hasTopConcept").literal).toEqual(false);
                expect(digestedSchema.properties.get("hasTopConcept").literalType).toEqual(null);
                expect(digestedSchema.properties.get("hasTopConcept").uri instanceof RDF.URI.Class).toEqual(true);
                expect(digestedSchema.properties.get("hasTopConcept").uri.toString()).toEqual("http://www.w3.org/2004/02/skos/core#hasTopConcept");
                expect(digestedSchema.properties.get("hasTopConcept").containerType).toEqual(ObjectSchema.ContainerType.SET);
                expect(digestedSchema.properties.get("hasTopConcept").language).toEqual(null);
                expect(digestedSchema.properties.has("name")).toEqual(true);
                expect(digestedSchema.properties.get("name") instanceof ObjectSchema.DigestedPropertyDefinition).toEqual(true);
                expect(digestedSchema.properties.get("name").literal).toEqual(true);
                expect(digestedSchema.properties.get("name").literalType instanceof RDF.URI.Class).toEqual(true);
                expect(digestedSchema.properties.get("name").literalType.toString()).toEqual("http://www.w3.org/2001/XMLSchema#string");
                expect(digestedSchema.properties.get("name").uri instanceof RDF.URI.Class).toEqual(true);
                expect(digestedSchema.properties.get("name").uri.toString()).toEqual("http://purl.org/dc/terms/name");
                expect(digestedSchema.properties.get("name").containerType).toEqual(null);
                expect(digestedSchema.properties.get("name").language).toEqual(null);
            });
        });
        it(JasmineExtender_1.hasMethod(JasmineExtender_1.STATIC, "combineDigestedObjectSchemas", "Combine several standardized schemas in one.", [
            { name: "digestedSchemas", type: "Carbon.ObjectSchema.DigestedObjectSchema[]" }
        ], { type: "Carbon.ObjectSchema.DigestedObjectSchema" }), function () {
            expect(ObjectSchema.Digester.digestSchema).toBeDefined();
            expect(Utils.isFunction(ObjectSchema.Digester.digestSchema)).toBeDefined();
            var schemas = [
                {
                    "skos": "http://www.w3.org/2004/02/skos/core#",
                    "hasTopConcept": {
                        "@id": "skos:hasTopConcept",
                        "@type": "@id",
                        "@container": "@set",
                    },
                },
                {
                    "dct": "http://purl.org/dc/terms/",
                    "xsd": "http://www.w3.org/2001/XMLSchema#",
                    "name": {
                        "@id": "dct:name",
                        "@type": "xsd:string",
                    },
                },
                {
                    "dct": "http://purl.org/dc/terms/",
                    "xsd": "http://www.w3.org/2001/XMLSchema#",
                    "name": {
                        "@id": "dct:name",
                        "@type": "xsd:string",
                    },
                    "created": {
                        "@id": "dct:created",
                        "@type": "xsd:datetime",
                    },
                },
            ];
            var digestedSchemas = [];
            for (var _i = 0, schemas_1 = schemas; _i < schemas_1.length; _i++) {
                var schema = schemas_1[_i];
                digestedSchemas.push(ObjectSchema.Digester.digestSchema(schema));
            }
            var digestedSchema = ObjectSchema.Digester.combineDigestedObjectSchemas(digestedSchemas);
            expect(digestedSchema.prefixes.size).toEqual(3);
            expect(digestedSchema.prefixes.has("skos")).toEqual(true);
            expect(digestedSchema.prefixes.get("skos") instanceof RDF.URI.Class).toEqual(true);
            expect(digestedSchema.prefixes.get("skos").toString()).toEqual("http://www.w3.org/2004/02/skos/core#");
            expect(digestedSchema.properties.size).toEqual(3);
            expect(digestedSchema.properties.has("hasTopConcept")).toEqual(true);
            expect(digestedSchema.properties.get("hasTopConcept") instanceof ObjectSchema.DigestedPropertyDefinition).toEqual(true);
            expect(digestedSchema.properties.get("hasTopConcept").literal).toEqual(false);
            expect(digestedSchema.properties.get("hasTopConcept").literalType).toEqual(null);
            expect(digestedSchema.properties.get("hasTopConcept").uri instanceof RDF.URI.Class).toEqual(true);
            expect(digestedSchema.properties.get("hasTopConcept").uri.toString()).toEqual("http://www.w3.org/2004/02/skos/core#hasTopConcept");
            expect(digestedSchema.properties.get("hasTopConcept").containerType).toEqual(ObjectSchema.ContainerType.SET);
            expect(digestedSchema.properties.get("hasTopConcept").language).toEqual(null);
            expect(digestedSchema.properties.has("name")).toEqual(true);
            expect(digestedSchema.properties.get("name") instanceof ObjectSchema.DigestedPropertyDefinition).toEqual(true);
            expect(digestedSchema.properties.get("name").literal).toEqual(true);
            expect(digestedSchema.properties.get("name").literalType instanceof RDF.URI.Class).toEqual(true);
            expect(digestedSchema.properties.get("name").literalType.toString()).toEqual("http://www.w3.org/2001/XMLSchema#string");
            expect(digestedSchema.properties.get("name").uri instanceof RDF.URI.Class).toEqual(true);
            expect(digestedSchema.properties.get("name").uri.toString()).toEqual("http://purl.org/dc/terms/name");
            expect(digestedSchema.properties.get("name").containerType).toEqual(null);
            expect(digestedSchema.properties.get("name").language).toEqual(null);
        });
    });
});
