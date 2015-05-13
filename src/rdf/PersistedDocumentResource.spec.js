define(["require", "exports", './Resource', './DocumentResource', './PersistedDocumentResource', '../Utils'], function (require, exports, Resource, DocumentResource, PersistedDocumentResource, Utils) {
    describe('RDF', function () {
        describe('PersistedDocumentResource', function () {
            it('is defined', function () {
                expect(PersistedDocumentResource).toBeDefined();
            });
            describe('Class', function () {
                var persisted;
                beforeEach(function () {
                    var resource = Resource.Factory.create();
                    var documentResource = DocumentResource.Factory.from(resource);
                    persisted = PersistedDocumentResource.Factory.from(documentResource, null);
                });
                it('has method, isDirty(), that returns true when the resource has been modified.', function () {
                    expect(persisted.isDirty).toBeDefined();
                    expect(Utils.isFunction(persisted.isDirty)).toBe(true);
                    expect(persisted.isDirty()).toBe(false);
                    persisted.addProperty('http://example.org/title', 'My title');
                    expect(persisted.isDirty()).toBe(true);
                });
                it('has method, commit(), that commits the changes the resource has, using its parent.', function () {
                    expect(persisted.commit).toBeDefined();
                    expect(Utils.isFunction(persisted.commit)).toBe(true);
                });
                it('has method, delete(), that deletes the object itself, using its parent.', function () {
                    expect(persisted.delete).toBeDefined();
                    expect(Utils.isFunction(persisted.delete)).toBe(true);
                });
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
                    expect(Utils.hasProperty(persisted, '_dirty')).toBe(true);
                    expect(Utils.hasProperty(persisted, '_modifications')).toBe(true);
                    expect(Utils.hasProperty(persisted, '_parent')).toBe(true);
                    expect(Utils.hasFunction(persisted, '_clean')).toBe(true);
                    expect(Utils.hasFunction(persisted, 'isDirty')).toBe(true);
                    expect(Utils.hasFunction(persisted, 'commit')).toBe(true);
                    expect(Utils.hasFunction(persisted, 'delete')).toBe(true);
                });
            });
        });
    });
});
//# sourceMappingURL=PersistedDocumentResource.spec.js.map