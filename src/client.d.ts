/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HttpHeaders } from './client/headers';
import { HttpQueryEncoder, HttpUrlParams } from './client/url_params';
/**
 * @experimental
 */
export declare const Headers: typeof HttpHeaders;
export declare type Headers = HttpHeaders;
/**
 * @experimental
 */
export declare const URLSearchParams: typeof HttpUrlParams;
export declare type URLSearchParams = HttpUrlParams;
/**
 * @experimental
 */
export declare const QueryEncoder: typeof HttpQueryEncoder;
export declare type QueryEncoder = HttpQueryEncoder;
