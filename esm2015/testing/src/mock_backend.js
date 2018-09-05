/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable } from '@angular/core';
import { ReadyState, Request } from '@angular/http';
import { ReplaySubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
/**
 *
 * Mock Connection to represent a {\@link Connection} for tests.
 *
 * @deprecated see https://angular.io/guide/http
 */
export class MockConnection {
    /**
     * @param {?} req
     */
    constructor(req) {
        this.response = /** @type {?} */ (new ReplaySubject(1).pipe(take(1)));
        this.readyState = ReadyState.Open;
        this.request = req;
    }
    /**
     * Sends a mock response to the connection. This response is the value that is emitted to the
     * {\@link EventEmitter} returned by {\@link Http}.
     *
     * ### Example
     *
     * ```
     * var connection;
     * backend.connections.subscribe(c => connection = c);
     * http.request('data.json').subscribe(res => console.log(res.text()));
     * connection.mockRespond(new Response(new ResponseOptions({ body: 'fake response' }))); //logs
     * 'fake response'
     * ```
     *
     * @param {?} res
     * @return {?}
     */
    mockRespond(res) {
        if (this.readyState === ReadyState.Done || this.readyState === ReadyState.Cancelled) {
            throw new Error('Connection has already been resolved');
        }
        this.readyState = ReadyState.Done;
        this.response.next(res);
        this.response.complete();
    }
    /**
     * Not yet implemented!
     *
     * Sends the provided {\@link Response} to the `downloadObserver` of the `Request`
     * associated with this connection.
     * @param {?} res
     * @return {?}
     */
    mockDownload(res) {
        // this.request.downloadObserver.onNext(res);
        // if (res.bytesLoaded === res.totalBytes) {
        //   this.request.downloadObserver.onCompleted();
        // }
    }
    /**
     * Emits the provided error object as an error to the {\@link Response} {\@link EventEmitter}
     * returned
     * from {\@link Http}.
     *
     * ### Example
     *
     * ```
     * var connection;
     * backend.connections.subscribe(c => connection = c);
     * http.request('data.json').subscribe(res => res, err => console.log(err)));
     * connection.mockError(new Error('error'));
     * ```
     *
     * @param {?=} err
     * @return {?}
     */
    mockError(err) {
        // Matches ResourceLoader semantics
        this.readyState = ReadyState.Done;
        this.response.error(err);
    }
}
if (false) {
    /**
     * Describes the state of the connection, based on `XMLHttpRequest.readyState`, but with
     * additional states. For example, state 5 indicates an aborted connection.
     * @type {?}
     */
    MockConnection.prototype.readyState;
    /**
     * {\@link Request} instance used to create the connection.
     * @type {?}
     */
    MockConnection.prototype.request;
    /**
     * {\@link EventEmitter} of {\@link Response}. Can be subscribed to in order to be notified when a
     * response is available.
     * @type {?}
     */
    MockConnection.prototype.response;
}
/**
 * A mock backend for testing the {\@link Http} service.
 *
 * This class can be injected in tests, and should be used to override providers
 * to other backends, such as {\@link XHRBackend}.
 *
 * ### Example
 *
 * ```
 * import {Injectable, Injector} from '\@angular/core';
 * import {async, fakeAsync, tick} from '\@angular/core/testing';
 * import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '\@angular/http';
 * import {Response, ResponseOptions} from '\@angular/http';
 * import {MockBackend, MockConnection} from '\@angular/http/testing';
 *
 * const HERO_ONE = 'HeroNrOne';
 * const HERO_TWO = 'WillBeAlwaysTheSecond';
 *
 * \@Injectable()
 * class HeroService {
 *   constructor(private http: Http) {}
 *
 *   getHeroes(): Promise<String[]> {
 *     return this.http.get('myservices.de/api/heroes')
 *         .toPromise()
 *         .then(response => response.json().data)
 *         .catch(e => this.handleError(e));
 *   }
 *
 *   private handleError(error: any): Promise<any> {
 *     console.error('An error occurred', error);
 *     return Promise.reject(error.message || error);
 *   }
 * }
 *
 * describe('MockBackend HeroService Example', () => {
 *   beforeEach(() => {
 *     this.injector = Injector.create([
 *       {provide: ConnectionBackend, useClass: MockBackend},
 *       {provide: RequestOptions, useClass: BaseRequestOptions},
 *       Http,
 *       HeroService,
 *     ]);
 *     this.heroService = this.injector.get(HeroService);
 *     this.backend = this.injector.get(ConnectionBackend) as MockBackend;
 *     this.backend.connections.subscribe((connection: any) => this.lastConnection = connection);
 *   });
 *
 *   it('getHeroes() should query current service url', () => {
 *     this.heroService.getHeroes();
 *     expect(this.lastConnection).toBeDefined('no http service connection at all?');
 *     expect(this.lastConnection.request.url).toMatch(/api\/heroes$/, 'url invalid');
 *   });
 *
 *   it('getHeroes() should return some heroes', fakeAsync(() => {
 *        let result: String[];
 *        this.heroService.getHeroes().then((heroes: String[]) => result = heroes);
 *        this.lastConnection.mockRespond(new Response(new ResponseOptions({
 *          body: JSON.stringify({data: [HERO_ONE, HERO_TWO]}),
 *        })));
 *        tick();
 *        expect(result.length).toEqual(2, 'should contain given amount of heroes');
 *        expect(result[0]).toEqual(HERO_ONE, ' HERO_ONE should be the first hero');
 *        expect(result[1]).toEqual(HERO_TWO, ' HERO_TWO should be the second hero');
 *      }));
 *
 *   it('getHeroes() while server is down', fakeAsync(() => {
 *        let result: String[];
 *        let catchedError: any;
 *        this.heroService.getHeroes()
 *            .then((heroes: String[]) => result = heroes)
 *            .catch((error: any) => catchedError = error);
 *        this.lastConnection.mockError(new Response(new ResponseOptions({
 *          status: 404,
 *          statusText: 'URL not Found',
 *        })));
 *        tick();
 *        expect(result).toBeUndefined();
 *        expect(catchedError).toBeDefined();
 *      }));
 * });
 * ```
 *
 * This method only exists in the mock implementation, not in real Backends.
 *
 * @deprecated see https://angular.io/guide/http
 */
export class MockBackend {
    constructor() {
        this.connectionsArray = [];
        this.connections = new Subject();
        this.connections.subscribe((connection) => this.connectionsArray.push(connection));
        this.pendingConnections = new Subject();
    }
    /**
     * Checks all connections, and raises an exception if any connection has not received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     * @return {?}
     */
    verifyNoPendingRequests() {
        /** @type {?} */
        let pending = 0;
        this.pendingConnections.subscribe((c) => pending++);
        if (pending > 0)
            throw new Error(`${pending} pending connections to be resolved`);
    }
    /**
     * Can be used in conjunction with `verifyNoPendingRequests` to resolve any not-yet-resolve
     * connections, if it's expected that there are connections that have not yet received a response.
     *
     * This method only exists in the mock implementation, not in real Backends.
     * @return {?}
     */
    resolveAllConnections() { this.connections.subscribe((c) => c.readyState = 4); }
    /**
     * Creates a new {\@link MockConnection}. This is equivalent to calling `new
     * MockConnection()`, except that it also will emit the new `Connection` to the `connections`
     * emitter of this `MockBackend` instance. This method will usually only be used by tests
     * against the framework itself, not by end-users.
     * @param {?} req
     * @return {?}
     */
    createConnection(req) {
        if (!req || !(req instanceof Request)) {
            throw new Error(`createConnection requires an instance of Request, got ${req}`);
        }
        /** @type {?} */
        const connection = new MockConnection(req);
        this.connections.next(connection);
        return connection;
    }
}
MockBackend.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MockBackend.ctorParameters = () => [];
if (false) {
    /**
     * {\@link EventEmitter}
     * of {\@link MockConnection} instances that have been created by this backend. Can be subscribed
     * to in order to respond to connections.
     *
     * ### Example
     *
     * ```
     * import {Injector} from '\@angular/core';
     * import {fakeAsync, tick} from '\@angular/core/testing';
     * import {BaseRequestOptions, ConnectionBackend, Http, RequestOptions} from '\@angular/http';
     * import {Response, ResponseOptions} from '\@angular/http';
     * import {MockBackend, MockConnection} from '\@angular/http/testing';
     *
     * it('should get a response', fakeAsync(() => {
     *      let connection:
     *          MockConnection;  // this will be set when a new connection is emitted from the
     *                           // backend.
     *      let text: string;    // this will be set from mock response
     *      let injector = Injector.create([
     *        {provide: ConnectionBackend, useClass: MockBackend},
     *        {provide: RequestOptions, useClass: BaseRequestOptions},
     *        Http,
     *      ]);
     *      let backend = injector.get(ConnectionBackend);
     *      let http = injector.get(Http);
     *      backend.connections.subscribe((c: MockConnection) => connection = c);
     *      http.request('something.json').toPromise().then((res: any) => text = res.text());
     *      connection.mockRespond(new Response(new ResponseOptions({body: 'Something'})));
     *      tick();
     *      expect(text).toBe('Something');
     *    }));
     * ```
     *
     * This property only exists in the mock implementation, not in real Backends.
     * @type {?}
     */
    MockBackend.prototype.connections;
    /**
     * An array representation of `connections`. This array will be updated with each connection that
     * is created by this backend.
     *
     * This property only exists in the mock implementation, not in real Backends.
     * @type {?}
     */
    MockBackend.prototype.connectionsArray;
    /**
     * {\@link EventEmitter} of {\@link MockConnection} instances that haven't yet been resolved (i.e.
     * with a `readyState`
     * less than 4). Used internally to verify that no connections are pending via the
     * `verifyNoPendingRequests` method.
     *
     * This property only exists in the mock implementation, not in real Backends.
     * @type {?}
     */
    MockBackend.prototype.pendingConnections;
}
//# sourceMappingURL=mock_backend.js.map