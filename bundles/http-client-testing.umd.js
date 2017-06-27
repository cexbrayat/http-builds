/**
 * @license Angular v4.2.2-350f3a8b49
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/http/client'), require('rxjs/Observable')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/http/client', 'rxjs/Observable'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.http = global.ng.http || {}, global.ng.http.client = global.ng.http.client || {}, global.ng.http.client.testing = global.ng.http.client.testing || {}),global.ng.http.client,global.Rx));
}(this, (function (exports,_angular_http_client,rxjs_Observable) { 'use strict';

/**
 * @license Angular v4.2.2-350f3a8b49
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
/**
 * Controller to be injected into tests, that allows for mocking and flushing
 * of requests.
 *
 * \@experimental
 * @abstract
 */
var HttpTestingController = (function () {
    function HttpTestingController() {
    }
    /**
     * Search for requests that match the given parameter, without any expectations.
     * @abstract
     * @param {?} match
     * @return {?}
     */
    HttpTestingController.prototype.match = function (match) { };
    /**
     * @abstract
     * @param {?} url
     * @return {?}
     */
    HttpTestingController.prototype.expectOne = function (url) { };
    /**
     * @abstract
     * @param {?} params
     * @return {?}
     */
    HttpTestingController.prototype.expectOne = function (params) { };
    /**
     * @abstract
     * @param {?} matchFn
     * @return {?}
     */
    HttpTestingController.prototype.expectOne = function (matchFn) { };
    /**
     * @abstract
     * @param {?} match
     * @return {?}
     */
    HttpTestingController.prototype.expectOne = function (match) { };
    /**
     * @abstract
     * @param {?} url
     * @return {?}
     */
    HttpTestingController.prototype.expectNone = function (url) { };
    /**
     * @abstract
     * @param {?} params
     * @return {?}
     */
    HttpTestingController.prototype.expectNone = function (params) { };
    /**
     * @abstract
     * @param {?} matchFn
     * @return {?}
     */
    HttpTestingController.prototype.expectNone = function (matchFn) { };
    /**
     * @abstract
     * @param {?} match
     * @return {?}
     */
    HttpTestingController.prototype.expectNone = function (match) { };
    /**
     * @abstract
     * @param {?=} opts
     * @return {?}
     */
    HttpTestingController.prototype.verify = function (opts) { };
    return HttpTestingController;
}());
/**
 * A mock requests that was received and is ready to be answered.
 *
 * This interface allows access to the underlying {\@link HttpRequest}, and allows
 * responding with {\@link HttpEvent}s or {\@link HttpErrorResponse}s.
 *
 * \@experimental
 */
var TestRequest = (function () {
    /**
     * @param {?} request
     * @param {?} observer
     */
    function TestRequest(request, observer) {
        this.request = request;
        this.observer = observer;
        /**
         * Whether the request was cancelled after it was sent.
         */
        this.cancelled = false;
    }
    /**
     * @param {?} body
     * @param {?=} opts
     * @return {?}
     */
    TestRequest.prototype.flush = function (body, opts) {
        if (opts === void 0) { opts = {}; }
        if (this.cancelled) {
            throw new Error("Cannot flush a cancelled request.");
        }
        var /** @type {?} */ url = this.request.url;
        var /** @type {?} */ headers = new _angular_http_client.HttpHeaders(opts.headers);
        body = _maybeConvertBody(this.request.responseType, body);
        var /** @type {?} */ statusText = opts.statusText;
        var /** @type {?} */ status = opts.status !== undefined ? opts.status : 200;
        if (opts.status === undefined) {
            if (body === null) {
                status = 204;
                statusText = statusText || 'No Content';
            }
            else {
                statusText = statusText || 'OK';
            }
        }
        if (statusText === undefined) {
            throw new Error('statusText is required when setting a custom status.');
        }
        var /** @type {?} */ res = { body: body, headers: headers, status: status, statusText: statusText, url: url };
        if (status >= 200 && status < 300) {
            this.observer.next(new _angular_http_client.HttpResponse(res));
            this.observer.complete();
        }
        else {
            this.observer.error(new _angular_http_client.HttpErrorResponse(res));
        }
    };
    /**
     * @param {?} error
     * @param {?=} opts
     * @return {?}
     */
    TestRequest.prototype.error = function (error, opts) {
        if (opts === void 0) { opts = {}; }
        if (this.cancelled) {
            throw new Error("Cannot return an error for a cancelled request.");
        }
        if (opts.status && opts.status >= 200 && opts.status < 300) {
            throw new Error("error() called with a successful status.");
        }
        this.observer.error(new _angular_http_client.HttpErrorResponse({
            error: error,
            headers: new _angular_http_client.HttpHeaders(opts.headers),
            status: opts.status || 0,
            statusText: opts.statusText || '',
            url: this.request.url,
        }));
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TestRequest.prototype.event = function (event) {
        if (this.cancelled) {
            throw new Error("Cannot send events to a cancelled request.");
        }
        this.observer.next(event);
    };
    return TestRequest;
}());
/**
 * Helper function to convert a response body to an ArrayBuffer.
 * @param {?} body
 * @return {?}
 */
function _toArrayBufferBody(body) {
    if (typeof ArrayBuffer === 'undefined') {
        throw new Error('ArrayBuffer responses are not supported on this platform.');
    }
    if (body instanceof ArrayBuffer) {
        return body;
    }
    throw new Error('Automatic conversion to ArrayBuffer is not supported for response type.');
}
/**
 * Helper function to convert a response body to a Blob.
 * @param {?} body
 * @return {?}
 */
function _toBlob(body) {
    if (typeof Blob === 'undefined') {
        throw new Error('Blob responses are not supported on this platform.');
    }
    if (body instanceof Blob) {
        return body;
    }
    if (ArrayBuffer && body instanceof ArrayBuffer) {
        return new Blob([body]);
    }
    throw new Error('Automatic conversion to Blob is not supported for response type.');
}
/**
 * Helper function to convert a response body to JSON data.
 * @param {?} body
 * @param {?=} format
 * @return {?}
 */
function _toJsonBody(body, format) {
    if (format === void 0) { format = 'JSON'; }
    if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) {
        throw new Error("Automatic conversion to " + format + " is not supported for ArrayBuffers.");
    }
    if (typeof Blob !== 'undefined' && body instanceof Blob) {
        throw new Error("Automatic conversion to " + format + " is not supported for Blobs.");
    }
    if (typeof body === 'string' || typeof body === 'number' || typeof body === 'object' ||
        Array.isArray(body)) {
        return body;
    }
    throw new Error("Automatic conversion to " + format + " is not supported for response type.");
}
/**
 * Helper function to convert a response body to a string.
 * @param {?} body
 * @return {?}
 */
function _toTextBody(body) {
    if (typeof body === 'string') {
        return body;
    }
    if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) {
        throw new Error('Automatic conversion to text is not supported for ArrayBuffers.');
    }
    if (typeof Blob !== 'undefined' && body instanceof Blob) {
        throw new Error('Automatic conversion to text is not supported for Blobs.');
    }
    return JSON.stringify(_toJsonBody(body, 'text'));
}
/**
 * Convert a response body to the requested type.
 * @param {?} responseType
 * @param {?} body
 * @return {?}
 */
function _maybeConvertBody(responseType, body) {
    switch (responseType) {
        case 'arraybuffer':
            if (body === null) {
                return null;
            }
            return _toArrayBufferBody(body);
        case 'blob':
            if (body === null) {
                return null;
            }
            return _toBlob(body);
        case 'json':
            if (body === null) {
                return 'null';
            }
            return _toJsonBody(body);
        case 'text':
            if (body === null) {
                return null;
            }
            return _toTextBody(body);
        default:
            throw new Error("Unsupported responseType: " + responseType);
    }
}
/**
 * A testing backend for {\@link HttpClient} which both acts as an {\@link HttpBackend}
 * and as the {\@link HttpTestingController}.
 *
 * {\@link HttpClientTestingBackend} works by keeping a list of all open requests.
 * As requests come in, they're added to the list. Users can assert that specific
 * requests were made and then flush them. In the end, a verify() method asserts
 * that no unexpected requests were made.
 *
 * \@experimental
 */
var HttpClientTestingBackend = (function () {
    function HttpClientTestingBackend() {
        /**
         * List of pending requests which have not yet been expected.
         */
        this.open = [];
    }
    /**
     * Handle an incoming request by queueing it in the list of open requests.
     * @param {?} req
     * @return {?}
     */
    HttpClientTestingBackend.prototype.handle = function (req) {
        var _this = this;
        return new rxjs_Observable.Observable(function (observer) {
            var /** @type {?} */ testReq = new TestRequest(req, observer);
            _this.open.push(testReq);
            observer.next({ type: _angular_http_client.HttpEventType.Sent });
            return function () { testReq.cancelled = true; };
        });
    };
    /**
     * Helper function to search for requests in the list of open requests.
     * @param {?} match
     * @return {?}
     */
    HttpClientTestingBackend.prototype._match = function (match) {
        if (typeof match === 'string') {
            return this.open.filter(function (testReq) { return testReq.request.url === match; });
        }
        else if (typeof match === 'function') {
            return this.open.filter(function (testReq) { return match(testReq.request); });
        }
        else {
            return this.open.filter(function (testReq) { return (!match.method || testReq.request.method === match.method.toUpperCase()) &&
                (!match.url || testReq.request.url === match.url); });
        }
    };
    /**
     * Search for requests in the list of open requests, and return all that match
     * without asserting anything about the number of matches.
     * @param {?} match
     * @return {?}
     */
    HttpClientTestingBackend.prototype.match = function (match) {
        var _this = this;
        var /** @type {?} */ results = this._match(match);
        results.forEach(function (result) {
            var /** @type {?} */ index = _this.open.indexOf(result);
            if (index !== -1) {
                _this.open.splice(index, 1);
            }
        });
        return results;
    };
    /**
     * Expect that a single outstanding request matches the given matcher, and return
     * it.
     *
     * Requests returned through this API will no longer be in the list of open requests,
     * and thus will not match twice.
     * @param {?} match
     * @return {?}
     */
    HttpClientTestingBackend.prototype.expectOne = function (match) {
        var /** @type {?} */ matches = this.match(match);
        if (matches.length > 1) {
            throw new Error("Expected one matching request, found " + matches.length + " requests.");
        }
        if (matches.length === 0) {
            throw new Error("Expected one matching request, found none.");
        }
        return matches[0];
    };
    /**
     * Expect that no outstanding requests match the given matcher, and throw an error
     * if any do.
     * @param {?} match
     * @return {?}
     */
    HttpClientTestingBackend.prototype.expectNone = function (match) {
        var /** @type {?} */ matches = this.match(match);
        if (matches.length > 0) {
            throw new Error("Expected zero matching requests, found " + matches.length + ".");
        }
    };
    /**
     * Validate that there are no outstanding requests.
     * @param {?=} opts
     * @return {?}
     */
    HttpClientTestingBackend.prototype.verify = function (opts) {
        if (opts === void 0) { opts = {}; }
        var /** @type {?} */ open = this.open;
        // It's possible that some requests may be cancelled, and this is expected.
        // The user can ask to ignore open requests which have been cancelled.
        if (opts.ignoreCancelled) {
            open = open.filter(function (testReq) { return !testReq.cancelled; });
        }
        if (open.length > 0) {
            // Show the URLs of open requests in the error, for convenience.
            var /** @type {?} */ urls = open.map(function (testReq) { return testReq.request.url.split('?')[0]; }).join(', ');
            throw new Error("Expected no open requests, found " + open.length + ": " + urls);
        }
    };
    return HttpClientTestingBackend;
}());

exports.HttpTestingController = HttpTestingController;
exports.HttpClientTestingBackend = HttpClientTestingBackend;
exports.TestRequest = TestRequest;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=http-client-testing.umd.js.map
