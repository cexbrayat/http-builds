import { HttpHeaders } from './headers';
/**
 * Type enumeration for the different kinds of {@link HttpEvent}.
 *
 * @experimental
 */
export declare enum HttpEventType {
    /**
     * The request was sent out over the wire.
     */
    Sent = 0,
    /**
     * An upload progress event was received.
     */
    UploadProgress = 1,
    /**
     * The response status code and headers were received.
     */
    ResponseHeader = 2,
    /**
     * A download progress event was received.
     */
    DownloadProgress = 3,
    /**
     * The full response including the body was received.
     */
    Response = 4,
    /**
     * A custom event from an interceptor or a backend.
     */
    User = 5,
}
/**
 * Base interface for progress events.
 *
 * @experimental
 */
export interface HttpProgressEvent {
    /**
     * Progress event type is either upload or download.
     */
    type: HttpEventType.DownloadProgress | HttpEventType.UploadProgress;
    /**
     * Number of bytes uploaded or downloaded.
     */
    loaded: number;
    /**
     * Total number of bytes to upload or download. Depending on the request or
     * response, this may not be computable and thus may not be present.
     */
    total?: number;
}
/**
 * A download progress event.
 *
 * @experimental
 */
export interface HttpDownloadProgressEvent extends HttpProgressEvent {
    type: HttpEventType.DownloadProgress;
    /**
     * The partial response body as downloaded so far.
     *
     * Only present if the responseType was `text`.
     */
    partialText?: string;
}
/**
 * An upload progress event.
 *
 * @experimental
 */
export interface HttpUploadProgressEvent extends HttpProgressEvent {
    type: HttpEventType.UploadProgress;
}
/**
 * An event indicating that the request was sent to the server. Useful
 * when a request may be retried multiple times, to distinguish between
 * retries on the final event stream.
 *
 * @experimental
 */
export interface HttpSentEvent {
    type: HttpEventType.Sent;
}
/**
 * A user-defined event.
 *
 * Grouping all custom events under this type ensures they will be handled
 * and forwarded by all implementations of interceptors.
 *
 * @experimental
 */
export interface HttpUserEvent<T> {
    type: HttpEventType.User;
}
/**
 * An error that represents a failed attempt to JSON.parse text coming back
 * from the server.
 *
 * It bundles the Error object with the actual response body that failed to parse.
 *
 * @experimental
 */
export interface HttpJsonParseError {
    error: Error;
    text: string;
}
/**
 * Union type for all possible events on the response stream.
 *
 * Typed according to the expected type of the response.
 *
 * @experimental
 */
export declare type HttpEvent<T> = HttpSentEvent | HttpHeaderResponse | HttpResponse<T> | HttpProgressEvent | HttpUserEvent<T>;
/**
 * Initialization hash for only those fields of the response which are available
 * before the body downloads.
 *
 * @experimental
 */
export interface HttpResponseHeaderInit {
    headers?: HttpHeaders;
    status?: number;
    statusText?: string;
    url?: string;
}
/**
 * Initialization hash for the full response, including a typed body.
 *
 * @experimental
 */
export interface HttpResponseInit<T> extends HttpResponseHeaderInit {
    body?: T;
}
/**
 * Initialization hash for an error response, including an untyped error.
 *
 * @experimental
 */
export interface HttpErrorResponseInit extends HttpResponseHeaderInit {
    error?: any;
}
/**
 * Base class for both {@link HttpResponse} and {@link HttpHeaderResponse}.
 *
 * @experimental
 */
export declare abstract class HttpResponseBase {
    /**
     * All response headers.
     */
    readonly headers: HttpHeaders;
    /**
     * Response status code.
     */
    readonly status: number;
    /**
     * Textual description of response status code.
     *
     * Do not depend on this.
     */
    readonly statusText: string;
    /**
     * URL of the resource retrieved, or null if not available.
     */
    readonly url: string | null;
    /**
     * Whether the status code falls in the 2xx range.
     */
    readonly ok: boolean;
    /**
     * Type of the response, narrowed to either the full response or the header.
     */
    readonly type: HttpEventType.Response | HttpEventType.ResponseHeader;
    /**
     * Super-constructor for all responses.
     *
     * The single parameter accepted is an initialization hash. Any properties
     * of the response passed there will override the default values.
     */
    constructor(init: HttpResponseHeaderInit, defaultStatus?: number, defaultStatusText?: string);
}
/**
 * A partial HTTP response which only includes the status and header data,
 * but no response body.
 *
 * {@link HttpHeaderResponse} is a {@link HttpEvent} available on the response
 * event stream, only when progress events are requested.
 *
 * @experimental
 */
export declare class HttpHeaderResponse extends HttpResponseBase {
    /**
     * Create a new {@link HttpHeaderResponse} with the given parameters.
     */
    constructor(init?: HttpResponseHeaderInit);
    readonly type: HttpEventType.ResponseHeader;
    /**
     * Copy this {@link HttpHeaderResponse}, overriding its contents with the
     * given parameter hash.
     */
    clone(update?: HttpResponseHeaderInit): HttpHeaderResponse;
}
/**
 * A full HTTP response, including a typed response body (which may be `null`
 * if one was not returned).
 *
 * {@link HttpResponse} is a {@link HttpEvent} available on the response event
 * stream.
 *
 * @experimental
 */
export declare class HttpResponse<T> extends HttpResponseBase {
    /**
     * The response body, or `null` if one was not returned.
     */
    readonly body: T | null;
    /**
     * Construct a new {@link HttpResponse}.
     */
    constructor(init?: HttpResponseInit<T>);
    readonly type: HttpEventType.Response;
    clone(): HttpResponse<T>;
    clone(update: HttpResponseHeaderInit): HttpResponse<T>;
    clone<V>(update: HttpResponseInit<V>): HttpResponse<V>;
}
/**
 * A response that represents an error or failure, either from a
 * non-successful HTTP status, an error while executing the request,
 * or some other failure which occurred during the parsing of the response.
 *
 * Any error returned on the {@link Observable} response stream will be
 * wrapped in an {@link HttpErrorResponse} to provide additional context about
 * the state of the HTTP layer when the error occurred. The error property
 * will contain either a wrapped Error object or the error response returned
 * from the server.
 *
 * @experimental
 */
export declare class HttpErrorResponse extends HttpResponseBase implements Error {
    readonly name: string;
    readonly message: string;
    readonly error: any | null;
    /**
     * Errors are never okay, even when the status code is in the 2xx success range.
     */
    readonly ok: boolean;
    constructor(init: HttpErrorResponseInit);
}
