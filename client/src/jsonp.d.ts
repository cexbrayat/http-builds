import { Observable } from 'rxjs/Observable';
import { HttpBackend, HttpHandler } from './backend';
import { HttpRequest } from './request';
import { HttpEvent } from './response';
export declare const JSONP_HOME = "__ng__jsonp__";
export declare const JSONP_ERR_NO_CALLBACK = "JSONP injected script did not invoke callback.";
export declare const JSONP_ERR_WRONG_METHOD = "JSONP requests must use JSONP request method.";
export declare const JSONP_ERR_WRONG_RESPONSE_TYPE = "JSONP requests must use Json response type.";
/**
 * DI token/abstract type representing a map of JSONP callbacks.
 *
 * In the browser, this should always be the `window` object.
 */
export declare abstract class JsonpCallbackMap {
    [key: string]: (data: any) => void;
}
/**
 * {@link HttpBackend} that only processes {@link HttpRequest} with the JSONP method,
 * by performing JSONP style requests.
 */
export declare class JsonpClientBackend implements HttpBackend {
    private callbackMap;
    private document;
    constructor(callbackMap: JsonpCallbackMap, document: any);
    /**
     * Get the name of the next callback method, by incrementing the global `nextRequestId`.
     */
    private nextCallback();
    /**
     * Process a JSONP request and return an event stream of the results.
     */
    handle(req: HttpRequest<never>): Observable<HttpEvent<any>>;
}
/**
 * An {@Link HttpInterceptor} which identifies requests with the method JSONP and
 * shifts them to the {@link JsonpClientBackend}.
 */
export declare class JsonpInterceptor {
    private jsonp;
    constructor(jsonp: JsonpClientBackend);
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
