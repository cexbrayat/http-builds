import { HttpEvent, HttpHeaders, HttpRequest } from '@angular/http/client';
import { Observer } from 'rxjs/Observer';
/**
 * Type of all possible mock response bodies.
 */
export declare type TestResponseBody = ArrayBuffer | Blob | string | number | Object | (string | number | Object | null)[];
/**
 * Options to the flush() interface for responding to requests.
 *
 * @experimental
 */
export interface FlushOptions {
    /**
     * A set of response headers to include.
     */
    headers?: HttpHeaders | {
        [name: string]: string | string[];
    };
    /**
     * HTTP status code of the response (defaults to 200).
     */
    status?: number;
    /**
     * HTTP status text of the response (defaults to 'OK').
     */
    statusText?: string;
}
/**
 * A mock requests that was received and is ready to be answered.
 *
 * This interface allows access to the underlying {@link HttpRequest}, and allows
 * responding with {@link HttpEvent}s or {@link HttpErrorResponse}s.
 *
 * @experimental
 */
export declare class TestRequest {
    request: HttpRequest<any>;
    private observer;
    /**
     * Whether the request was cancelled after it was sent.
     */
    cancelled: boolean;
    constructor(request: HttpRequest<any>, observer: Observer<HttpEvent<any>>);
    flush(body: TestResponseBody | null, opts?: FlushOptions): void;
    error(error: ErrorEvent, opts?: FlushOptions): void;
    event(event: HttpEvent<any>): void;
}
