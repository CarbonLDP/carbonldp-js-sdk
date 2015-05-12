define(["require", "exports", './Resource', './DocumentResource', './PersistedDocumentResource'], function (require, exports, Resource, DocumentResource, PersistedDocumentResource) {
    describe('RDF', function () {
        describe('PersistedDocumentResource', function () {
            it('is defined', function () {
                expect(PersistedDocumentResource).toBeDefined();
            });
            describe('Factory', function () {
                it('is defined', function () {
                    expect(PersistedDocumentResource.Factory).toBeDefined();
                });
                it('is defined', function () {
                    var resource = Resource.Factory.create();
                    var documentResource = DocumentResource.Factory.from(resource);
                    var persisted = PersistedDocumentResource.Factory.from(documentResource, null);
                    expect(persisted).toBeDefined();
                    expect(persisted).not.toBeNull();
                    expect(persisted).toEqual(resource);
                    persisted.addProperty('http://example.org/title', 'Awesome title');
                    expect(persisted._dirty).toBe;
                });
            });
        });
    });
});
//# sourceMappingURL=PersistedDocumentResource.spec.js.map