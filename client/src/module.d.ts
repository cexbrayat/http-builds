import { HttpBackend, HttpHandler } from './backend';
import { HttpInterceptor } from './interceptor';
/**
 * Constructs a {@link HttpHandler} that applies a bunch of {@link HttpInterceptor}s
 * to a request before passing it to the given {@link HttpBackend}.
 *
 * Meant to be used as a factory function within {@link HttpClientModule}.
 *
 * @experimental
 */
export declare function interceptingHandler(backend: HttpBackend, interceptors?: HttpInterceptor[] | null): HttpHandler;
/**
 * Factory function that determines where to store JSONP callbacks.
 *
 * Ordinarily JSONP callbacks are stored on the `window` object, but this may not exist
 * in test environments. In that case, callbacks are stored on an anonymous object instead.
 *
 * @experimental
 */
export declare function jsonpCallbackMap(): Object;
/**
 * {@link NgModule} which provides the {@link HttpClient} and associated services.
 *
 * Interceptors can be added to the chain behind {@link HttpClient} by binding them
 * to the multiprovider for {@link HTTP_INTERCEPTORS}.
 *
 * @experimental
 */
export declare class HttpClientModule {
}
/**
 * {@link NgModule} which enables JSONP support in {@link HttpClient}.
 *
 * Without this module, {@link HttpClient#jsonp} requests will reach the backend
 * with method JSONP, where they'll be rejected.
 *
 * @experimental
 */
export declare class HttpClientJsonpModule {
}
