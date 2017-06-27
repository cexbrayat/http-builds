/**
 * @license Angular v4.2.2-350f3a8b49
 * (c) 2010-2017 Google, Inc. https://angular.io/
 * License: MIT
 */
import { HttpErrorResponse, HttpEventType, HttpHeaders, HttpResponse } from '@angular/http/client';
import { Observable } from 'rxjs/Observable';

/**
 * Controller to be injected into tests, that allows for mocking and flushing
 * of requests.
 *
 * \@experimental
 * @abstract
 */
class HttpTestingController {
    /**
     * Search for requests that match the given parameter, without any expectations.
     * @abstract
     * @param {?} match
     * @return {?}
     */
    match(match) { }
    /**
     * @abstract
     * @param {?} url
     * @return {?}
     */
    expectOne(url) { }
    /**
     * @abstract
     * @param {?} params
     * @return {?}
     */
    expectOne(params) { }
    /**
     * @abstract
     * @param {?} matchFn
     * @return {?}
     */
    expectOne(matchFn) { }
    /**
     * @abstract
     * @param {?} match
     * @return {?}
     */
    expectOne(match) { }
    /**
     * @abstract
     * @param {?} url
     * @return {?}
     */
    expectNone(url) { }
    /**
     * @abstract
     * @param {?} params
     * @return {?}
     */
    expectNone(params) { }
    /**
     * @abstract
     * @param {?} matchFn
     * @return {?}
     */
    expectNone(matchFn) { }
    /**
     * @abstract
     * @param {?} match
     * @return {?}
     */
    expectNone(match) { }
    /**
     * @abstract
     * @param {?=} opts
     * @return {?}
     */
    verify(opts) { }
}

/**
 * A mock requests that was received and is ready to be answered.
 *
 * This interface allows access to the underlying {\@link HttpRequest}, and allows
 * responding with {\@link HttpEvent}s or {\@link HttpErrorResponse}s.
 *
 * \@experimental
 */
class TestRequest {
    /**
     * @param {?} request
     * @param {?} observer
     */
    constructor(request, observer) {
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
    flush(body, opts = {}) {
        if (this.cancelled) {
            throw new Error(`Cannot flush a cancelled request.`);
        }
        const /** @type {?} */ url = this.request.url;
        const /** @type {?} */ headers = new HttpHeaders(opts.headers);
        body = _maybeConvertBody(this.request.responseType, body);
        let /** @type {?} */ statusText = opts.statusText;
        let /** @type {?} */ status = opts.status !== undefined ? opts.status : 200;
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
        const /** @type {?} */ res = { body, headers, status, statusText, url };
        if (status >= 200 && status < 300) {
            this.observer.next(new HttpResponse(res));
            this.observer.complete();
        }
        else {
            this.observer.error(new HttpErrorResponse(res));
        }
    }
    /**
     * @param {?} error
     * @param {?=} opts
     * @return {?}
     */
    error(error, opts = {}) {
        if (this.cancelled) {
            throw new Error(`Cannot return an error for a cancelled request.`);
        }
        if (opts.status && opts.status >= 200 && opts.status < 300) {
            throw new Error(`error() called with a successful status.`);
        }
        this.observer.error(new HttpErrorResponse({
            error,
            headers: new HttpHeaders(opts.headers),
            status: opts.status || 0,
            statusText: opts.statusText || '',
            url: this.request.url,
        }));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    event(event) {
        if (this.cancelled) {
            throw new Error(`Cannot send events to a cancelled request.`);
        }
        this.observer.next(event);
    }
}
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
function _toJsonBody(body, format = 'JSON') {
    if (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer) {
        throw new Error(`Automatic conversion to ${format} is not supported for ArrayBuffers.`);
    }
    if (typeof Blob !== 'undefined' && body instanceof Blob) {
        throw new Error(`Automatic conversion to ${format} is not supported for Blobs.`);
    }
    if (typeof body === 'string' || typeof body === 'number' || typeof body === 'object' ||
        Array.isArray(body)) {
        return body;
    }
    throw new Error(`Automatic conversion to ${format} is not supported for response type.`);
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
            throw new Error(`Unsupported responseType: ${responseType}`);
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
class HttpClientTestingBackend {
    constructor() {
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
    handle(req) {
        return new Observable((observer) => {
            const /** @type {?} */ testReq = new TestRequest(req, observer);
            this.open.push(testReq);
            observer.next({ type: HttpEventType.Sent });
            return () => { testReq.cancelled = true; };
        });
    }
    /**
     * Helper function to search for requests in the list of open requests.
     * @param {?} match
     * @return {?}
     */
    _match(match) {
        if (typeof match === 'string') {
            return this.open.filter(testReq => testReq.request.url === match);
        }
        else if (typeof match === 'function') {
            return this.open.filter(testReq => match(testReq.request));
        }
        else {
            return this.open.filter(testReq => (!match.method || testReq.request.method === match.method.toUpperCase()) &&
                (!match.url || testReq.request.url === match.url));
        }
    }
    /**
     * Search for requests in the list of open requests, and return all that match
     * without asserting anything about the number of matches.
     * @param {?} match
     * @return {?}
     */
    match(match) {
        const /** @type {?} */ results = this._match(match);
        results.forEach(result => {
            const /** @type {?} */ index = this.open.indexOf(result);
            if (index !== -1) {
                this.open.splice(index, 1);
            }
        });
        return results;
    }
    /**
     * Expect that a single outstanding request matches the given matcher, and return
     * it.
     *
     * Requests returned through this API will no longer be in the list of open requests,
     * and thus will not match twice.
     * @param {?} match
     * @return {?}
     */
    expectOne(match) {
        const /** @type {?} */ matches = this.match(match);
        if (matches.length > 1) {
            throw new Error(`Expected one matching request, found ${matches.length} requests.`);
        }
        if (matches.length === 0) {
            throw new Error(`Expected one matching request, found none.`);
        }
        return matches[0];
    }
    /**
     * Expect that no outstanding requests match the given matcher, and throw an error
     * if any do.
     * @param {?} match
     * @return {?}
     */
    expectNone(match) {
        const /** @type {?} */ matches = this.match(match);
        if (matches.length > 0) {
            throw new Error(`Expected zero matching requests, found ${matches.length}.`);
        }
    }
    /**
     * Validate that there are no outstanding requests.
     * @param {?=} opts
     * @return {?}
     */
    verify(opts = {}) {
        let /** @type {?} */ open = this.open;
        // It's possible that some requests may be cancelled, and this is expected.
        // The user can ask to ignore open requests which have been cancelled.
        if (opts.ignoreCancelled) {
            open = open.filter(testReq => !testReq.cancelled);
        }
        if (open.length > 0) {
            // Show the URLs of open requests in the error, for convenience.
            const /** @type {?} */ urls = open.map(testReq => testReq.request.url.split('?')[0]).join(', ');
            throw new Error(`Expected no open requests, found ${open.length}: ${urls}`);
        }
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { HttpTestingController, HttpClientTestingBackend, TestRequest };
//# sourceMappingURL=testing.js.map
