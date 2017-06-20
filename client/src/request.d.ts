/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HttpHeaders } from './headers';
/**
 * Represents an HTTP request body when serialized for the server.
 */
export declare type HttpSerializedBody = ArrayBuffer | Blob | FormData | string;
/**
 * A subset of the allowed values for `XMLHttpRequest.responseType` supported by
 * {@link HttpClient}.
 */
export declare type HttpResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';
/**
 * A type capturing HTTP methods which don't take request bodies.
 */
export declare type HttpNoBodyMethod = 'DELETE' | 'GET' | 'HEAD' | 'JSONP' | 'OPTIONS';
/**
 * A type capturing HTTP methods which do take request bodies.
 */
export declare type HttpBodyMethod = 'POST' | 'PUT' | 'PATCH';
/**
 * A type representing all (known) HTTP methods.
 */
export declare type HttpMethod = HttpBodyMethod | HttpNoBodyMethod;
/**
 * Construction interface for {@link HttpRequest}s.
 *
 * All values are optional and will override default values if provided.
 */
export interface HttpRequestInit {
    headers?: HttpHeaders;
    reportProgress?: boolean;
    responseType?: HttpResponseType;
    withCredentials?: boolean;
}
/**
 * Cloning interface for {@link HttpRequestClone}.
 *
 * All values are optional and will be cloned from the base request if not
 * provided.
 */
export interface HttpRequestClone<T> extends HttpRequestInit {
    body?: T | null;
    method?: HttpMethod | string;
    url?: string;
    setHeaders?: {
        [name: string]: string | string[];
    };
}
/**
 * An outgoing HTTP request with an optional typed body.
 *
 * {@link HttpRequest} represents an outgoing request, including URL, method,
 * headers, body, and other request configuration options. Instances should be
 * assumed to be immutable. To modify a {@link HttpRequest}, the {@link HttpRequest#clone}
 * method should be used.
 */
export declare class HttpRequest<T> {
    readonly url: string;
    /**
     * The request body, or `null` if one isn't set.
     *
     * Bodies are not enforced to be immutable, as they can include a reference to any
     * user-defined data type. However, interceptors should take care to preserve
     * idempotence by treating them as such.
     */
    readonly body: T | null;
    /**
     * Outgoing headers for this request.
     */
    readonly headers: HttpHeaders;
    /**
     * Whether this request should be made in a way that exposes progress events.
     *
     * Progress events are expensive (change detection runs on each event) and so
     * they should only be requested if the consumer intends to monitor them.
     */
    readonly reportProgress: boolean;
    /**
     * Whether this request should be sent with outgoing credentials (cookies).
     */
    readonly withCredentials: boolean;
    /**
     * The expected response type of the server.
     *
     * This is used to parse the response appropriately before returning it to
     * the requestee.
     */
    readonly responseType: HttpResponseType;
    /**
     * The outgoing HTTP request method.
     */
    readonly method: string;
    constructor(url: string);
    constructor(url: string, method: HttpNoBodyMethod, init?: HttpRequestInit);
    constructor(url: string, method: HttpBodyMethod, body: T | null, init?: HttpRequestInit);
    constructor(url: string, method: HttpMethod | string, body: T | null, init?: HttpRequestInit);
    /**
     * Transform the free-form body into a serialized format suitable for
     * transmission to the server.
     */
    serializeBody(): HttpSerializedBody | null;
    /**
     * Examine the body and attempt to infer an appropriate MIME type
     * for it.
     *
     * If no such type can be inferred, this method will return `null`.
     */
    detectContentTypeHeader(): string | null;
    clone(): HttpRequest<T>;
    clone(update: HttpRequestInit): HttpRequest<T>;
    clone<V>(update: HttpRequestClone<V>): HttpRequest<V>;
}
