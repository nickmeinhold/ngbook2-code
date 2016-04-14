import {provide} from 'angular2/core';
import {
  it,
  describe,
  expect,
  inject,
  injectAsync,
  afterEach,
  beforeEachProviders,
  TestComponentBuilder,
} from 'angular2/testing';
import {MockBackend} from 'angular2/http/testing';
import {
  Http,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  RequestMethod,
} from 'angular2/http';

import { MoreHTTPRequests } from '../app/ts/components/MoreHTTPRequests';

beforeEachProviders(() => {
  return [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backend, defaultOptions);
    }, deps: [MockBackend, BaseRequestOptions]}),
  ]
});

describe('MoreHTTPRequests', () => {
  it('performs a POST',
    injectAsync([TestComponentBuilder, MockBackend], (tcb, backend) => {
      return tcb.createAsync(MoreHTTPRequests).then((fixture) => {
        let comp = fixture.debugElement.componentInstance;

        backend.connections.subscribe(c => {
          expect(c.request.url).toBe('http://jsonplaceholder.typicode.com/posts');
          expect(c.request.method).toBe(RequestMethod.Post);
          c.mockRespond(new Response(<any>{body: '{"response": "OK"}'}));
        });

        comp.makePost();
        expect(comp.data).toEqual({'response': 'OK'});
      });
    })
  );

  it('performs a DELETE',
    injectAsync([TestComponentBuilder, MockBackend], (tcb, backend) => {
      return tcb.createAsync(MoreHTTPRequests).then((fixture) => {
        let comp = fixture.debugElement.componentInstance;

        backend.connections.subscribe(c => {
          expect(c.request.url).toBe('http://jsonplaceholder.typicode.com/posts/1');
          expect(c.request.method).toBe(RequestMethod.Delete);
          c.mockRespond(new Response(<any>{body: '{"response": "OK"}'}));
        });

        comp.makeDelete();
        expect(comp.data).toEqual({'response': 'OK'});
      });
    })
  );

  it('sends correct headers',
    injectAsync([TestComponentBuilder, MockBackend], (tcb, backend) => {
      return tcb.createAsync(MoreHTTPRequests).then((fixture) => {
        let comp = fixture.debugElement.componentInstance;

        backend.connections.subscribe(c => {
          expect(c.request.url).toBe('http://jsonplaceholder.typicode.com/posts/1');
          expect(c.request.headers.has('X-API-TOKEN')).toBeTruthy();
          expect(c.request.headers.get('X-API-TOKEN')).toEqual('ng-book');
          c.mockRespond(new Response(<any>{body: '{"response": "OK"}'}));
        });

        comp.makeHeaders();
        expect(comp.data).toEqual({'response': 'OK'});
      });
    })
  );
});
