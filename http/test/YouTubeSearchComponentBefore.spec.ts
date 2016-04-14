import {provide} from 'angular2/core';
import {
  it,
  describe,
  expect,
  inject,
  fakeAsync,
  tick,
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

import {
  YOUTUBE_API_KEY,
  YOUTUBE_API_URL,
  YouTubeService
} from '../app/ts/components/YouTubeSearchComponent';

describe('MoreHTTPRequests (before)', () => {
  beforeEachProviders(() => {
    return [
      YouTubeService,
      BaseRequestOptions,
      MockBackend,
      provide(YOUTUBE_API_KEY, {useValue: 'YOUTUBE_API_KEY'}),
      provide(YOUTUBE_API_URL, {useValue: 'YOUTUBE_API_URL'}),
      provide(Http, {useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
        return new Http(backend, defaultOptions);
      }, deps: [MockBackend, BaseRequestOptions]}),
    ]
  });

  describe('search', () => {
    it('parses YouTube response',
      inject([YouTubeService, MockBackend], fakeAsync((service, backend) => {
        var res;

        backend.connections.subscribe(c => {
          c.mockRespond(new Response(<any>{
            body: `
            {
              "items": [
                {
                  "id": { "videoId": "VIDEO_ID" },
                  "snippet": {
                    "title": "TITLE",
                    "description": "DESCRIPTION",
                    "thumbnails": {
                      "high": { "url": "THUMBNAIL_URL" }
                    }
                  }
                }
              ]
            }
            `
          }));
        });

        service.search('hey').subscribe(_res => {
          res = _res;
        });
        tick();

        let video = res[0];
        expect(video.id).toEqual('VIDEO_ID');
        expect(video.title).toEqual('TITLE');
        expect(video.description).toEqual('DESCRIPTION');
        expect(video.thumbnailUrl).toEqual('THUMBNAIL_URL');
      }))
    )
  });
});
