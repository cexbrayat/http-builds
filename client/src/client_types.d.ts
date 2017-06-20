/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HttpHeaders } from './headers';
import { HttpResponseType } from './request';
export declare type HttpObserve = 'body' | 'events' | 'response';
export interface HttpMethodOptions {
    headers?: HttpHeaders;
    observe?: HttpObserve;
    responseType?: HttpResponseType;
    withCredentials?: boolean;
}
export interface zHttpMethodOptionsObserveArrayBufferEvents extends HttpMethodOptions {
    observe: 'events';
    responseType: 'arraybuffer';
}
export interface zHttpMethodOptionsObserveBlobEvents extends HttpMethodOptions {
    observe: 'events';
    responseType: 'blob';
}
export interface zHttpMethodOptionsObserveTextEvents extends HttpMethodOptions {
    observe: 'events';
    responseType: 'text';
}
export interface zHttpMethodOptionsObserveEvents extends HttpMethodOptions {
    observe: 'events';
}
export interface zHttpMethodOptionsObserveArrayBufferResponse extends HttpMethodOptions {
    observe: 'response';
    responseType: 'arraybuffer';
}
export interface zHttpMethodOptionsObserveBlobResponse extends HttpMethodOptions {
    observe: 'response';
    responseType: 'blob';
}
export interface zHttpMethodOptionsObserveTextResponse extends HttpMethodOptions {
    observe: 'response';
    responseType: 'text';
}
export interface zHttpMethodOptionsObserveResponse extends HttpMethodOptions {
    observe: 'response';
}
export interface zHttpMethodOptionsObserveArrayBufferBody extends HttpMethodOptions {
    observe?: 'body';
    responseType: 'arraybuffer';
}
export interface zHttpMethodOptionsObserveBlobBody extends HttpMethodOptions {
    observe?: 'body';
    responseType: 'blob';
}
export interface zHttpMethodOptionsObserveTextBody extends HttpMethodOptions {
    observe?: 'body';
    responseType: 'text';
}
export interface zHttpRequestBodyOptions<T> {
    body?: T | null;
}
export interface HttpRequestOptions<T> extends HttpMethodOptions, zHttpRequestBodyOptions<T> {
}
export interface zHttpRequestOptionsObserveArrayBufferEvents<T> extends zHttpMethodOptionsObserveArrayBufferEvents, zHttpRequestBodyOptions<T> {
}
export interface zHttpRequestOptionsObserveBlobEvents<T> extends zHttpMethodOptionsObserveBlobEvents, zHttpRequestBodyOptions<T> {
}
export interface zHttpRequestOptionsObserveTextEvents<T> extends zHttpMethodOptionsObserveTextEvents, zHttpRequestBodyOptions<T> {
}
export interface zHttpRequestOptionsObserveEvents<T> extends zHttpMethodOptionsObserveEvents, zHttpRequestBodyOptions<T> {
}
export interface zHttpRequestOptionsObserveArrayBufferResponse<T> extends zHttpMethodOptionsObserveArrayBufferResponse, zHttpRequestBodyOptions<T> {
}
export interface zHttpRequestOptionsObserveBlobResponse<T> extends zHttpMethodOptionsObserveBlobResponse, zHttpRequestBodyOptions<T> {
}
export interface zHttpRequestOptionsObserveTextResponse<T> extends zHttpMethodOptionsObserveTextResponse, zHttpRequestBodyOptions<T> {
}
export interface zHttpRequestOptionsObserveResponse<T> extends zHttpMethodOptionsObserveResponse, zHttpRequestBodyOptions<T> {
}
export interface zHttpRequestOptionsObserveArrayBufferBody<T> extends zHttpMethodOptionsObserveArrayBufferBody, zHttpRequestBodyOptions<T> {
}
export interface zHttpRequestOptionsObserveBlobBody<T> extends zHttpMethodOptionsObserveBlobBody, zHttpRequestBodyOptions<T> {
}
export interface zHttpRequestOptionsObserveTextBody<T> extends zHttpMethodOptionsObserveTextBody, zHttpRequestBodyOptions<T> {
}
export interface HttpJsonpOptions {
    observe: HttpObserve;
}
