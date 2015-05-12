define(["require", "exports", './HTTP', './REST', 'es6-promise-polyfill'], function (require, exports, HTTP, REST, es6Promise) {
    es6Promise.polyfill();
    describe('REST', function () {
        beforeEach(function () {
            jasmine.Ajax.install();
        });
        afterEach(function () {
            jasmine.Ajax.uninstall();
        });
        it('is defined', function () {
            expect(REST).toBeDefined();
        });
        it('has method get( url, options ) which makes an AJAX GET request and returns a promise with the response', function (done) {
            expect(REST.get).toBeDefined();
            var failTest = function () {
                expect(true).toBe(false);
            };
            var testPromise = function (promise) {
                expect(promise).toBeDefined();
                expect(promise instanceof Promise).toBeTruthy();
            };
            var testHTTPResponse = function (response) {
                expect(response).not.toBeNull();
                expect(response instanceof HTTP.Response).toBeTruthy();
            };
            jasmine.Ajax.stubRequest('/200', null, 'GET').andReturn({
                status: 200,
                responseHeaders: [
                    { name: 'X-Custom-Header-1', value: 'Value 1' },
                    { name: 'X-Custom-Header-2', value: 'Value 2' },
                    { name: 'X-Custom-Header-3', value: 'Value 3' },
                    { name: 'X-Custom-Header-Multi', value: '1, 2, 3, 4, 5, 6, 7, 8' }
                ]
            });
            jasmine.Ajax.stubRequest('/404', null, 'GET').andReturn({
                status: 404
            });
            var promises = [], promise;
            promise = REST.get('/200');
            testPromise(promise);
            promises.push(promise.then(function (response) {
                testHTTPResponse(response);
                expect(response.status).toEqual(200);
                var headers = response.headers;
                expect(headers.hasKey('X-Custom-Header-1')).toBeTruthy();
                expect(headers.get('X-Custom-Header-1').values.length).toEqual(1);
                expect(headers.hasKey('X-Custom-Header-2')).toBeTruthy();
                expect(headers.get('X-Custom-Header-2').values.length).toEqual(1);
                expect(headers.hasKey('X-Custom-Header-3')).toBeTruthy();
                expect(headers.get('X-Custom-Header-3').values.length).toEqual(1);
                expect(headers.hasKey('X-Custom-Header-Multi')).toBeTruthy();
                expect(headers.get('X-Custom-Header-Multi').values.length).toEqual(8);
            }, failTest));
            promise = REST.get('/404');
            testPromise(promise);
            promises.push(promise.then(failTest, function (response) {
                testHTTPResponse(response);
                expect(response.status).toEqual(404);
                var headers = response.headers;
            }));
            Promise.all(promises).then(done, done);
        });
    });
});
//# sourceMappingURL=REST.spec.js.map